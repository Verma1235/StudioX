import dotenv from "dotenv";
import { tools } from "./tools/tools.js";
import { SYSTEM_PROMPT } from "./Schema/SystemSchema.js";
import { GoogleGenAI } from "@google/genai";
import { agentResponseSchema } from "./Schema/agentResponseSchema.js";
import extrnalparseInput from "./helper/objectextractorFromString.js";
import extractJson from "./helper/jsonextractor.js";
import { isEmpty } from "./helper/validetors.js";

dotenv.config();

const MODEL = process.env.MODEL || "gemini-2.0-flash";

class StudioXAIAgent {
  constructor(
    socket,
    email = "",
    permission = "",
    prevMessage = "",
    apiKey = process.env.GEMINI_API_KEY
  ) {
    this.socket = socket || {};
    this.email = email;
    this.permission = permission;
    this.prevMessage = prevMessage;
    this.apiKey = apiKey;

    this.ai = new GoogleGenAI({
      apiKey: this.apiKey,
    });

    this.messages = [
      {
        role: "system",
        parts: [{ text: SYSTEM_PROMPT }],
      },
    ];
  }

  /**
   * Safe wrapper around the model generation API with auto-retry logic
   */
  generateWithRetry = async (payload, retries = 5, time = 4000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await this.ai.models.generateContent(payload);
        return response;
      } catch (error) {
        console.error(`API Attempt ${attempt} Failed:`, error.message);

        if (attempt === retries) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, Number(time)));
      }
    }
  };

  /**
   * Primary Agent Loop handling Planning, Tool Calling, and Final Outputs
   */
  startAiAgent = async (data = "") => {
    console.log("Stage 1 :", data);

    if (isEmpty(data) || !data.trim()) {
      this.socket.emit(
        "messageFromServer",
        "I am your StudioX AI Agent !! Ask me to do something !!"
      );
      return;
    }

    const query = data.trim();
    console.log("User query: ", query);

    if (query.toLowerCase() === "exit") {
      console.log("Agent stopped.");
      process.exit(0);
    }

    // Temporary reasoning memory for intermediate tool steps
    let tempMessages = [];

    // Save permanent user memory
    this.messages.push({
      role: "user",
      parts: [
        {
          text: JSON.stringify({
            type: "user",
            user: query,
          }),
        },
      ],
    });

    let runningAgentLoop = true;
    let stepCounter = 0;
    const MAX_STEPS = Number(process.env.TOTAL_INTRACTION_STEPS) || 15;

    while (runningAgentLoop) {
      try {
        stepCounter++;

        // Infinite loop protection
        if (stepCounter > MAX_STEPS) {
          console.log("Agent stopped: Max reasoning steps reached.");
          break;
        }

        const chatResponse = await this.generateWithRetry(
          {
            model: MODEL,
            contents: [...this.messages, ...tempMessages],
            config: {
              maxOutputTokens: 1500,
              temperature: 0,
              stopSequences: ["\n\n"],
              responseMimeType: "application/json",
              responseSchema: agentResponseSchema,
            },
          },
          Number(process.env.MAX_RETRY_ATTEMPT) || 3,
          Number(process.env.MAX_TIME_WAIT_AT_EACH_RETRY) || 4000
        );

        // Extract text safely from response object/method
        const rawText =
          typeof chatResponse.text === "function"
            ? await chatResponse.text()
            : chatResponse.text;

        if (!rawText) {
          throw new Error("Empty model response");
        }

        let agentStep;
        try {
          agentStep = JSON.parse(extractJson(rawText));
        } catch (jsonError) {
          console.error("Invalid JSON returned by model:");
          console.log(rawText);
          break;
        }

        console.log(
          `[Agent State: ${agentStep.type?.toUpperCase()}]`,
          JSON.stringify(agentStep, null, 2)
        );

        // ==========================================
        // CASE: PLAN
        // ==========================================
        if (agentStep.type === "plan") {+
          tempMessages.push({
            role: "model",
            parts: [{ text: JSON.stringify(agentStep) }],
          });
          continue;
        }

        // ==========================================
        // CASE: ACTION (Tool Execution)
        // ==========================================
        else if (agentStep.type === "action") {
          tempMessages.push({
            role: "model",
            parts: [{ text: JSON.stringify(agentStep) }],
          });

          const fn = tools[agentStep.function];

          if (!fn) {
            console.error(`Unknown tool requested: ${agentStep.function}`);
            break;
          }

          let observationResult;
          try {
            observationResult = await fn(
              extrnalparseInput(agentStep.input) || {}
            );
          } catch (toolError) {
            console.error("Tool Execution Failed:", toolError.message);
            observationResult = "Tool execution failed";
          }

          const observationPayload = {
            type: "observation",
            observation: observationResult,
          };

          console.log(
            `[System Tool Observation]`,
            JSON.stringify(observationPayload, null, 2)
          );

          tempMessages.push({
            role: "user",
            parts: [{ text: JSON.stringify(observationPayload) }],
          });

          // Prevent intermediate step memory explosion
          if (tempMessages.length > 20) {
            tempMessages = tempMessages.slice(-20);
          }

          continue;
        }

        // ==========================================
        // CASE: FINAL OUTPUT
        // ==========================================
        else if (agentStep.type === "output") {
          console.log(`\nFinal Answer: ${agentStep.output}`);
          this.socket.emit("messageFromServer", agentStep?.output);

          // Save final structure back to permanent chat memory
          this.messages.push({
            role: "model",
            parts: [{ text: JSON.stringify(agentStep) }],
          });

          // Prevent permanent memory explosion
          if (this.messages.length > 20) {
            this.messages = this.messages.slice(-20);
          }

          // Reset temporary reasoning block and exit loop
          tempMessages = [];
          runningAgentLoop = false;
        }

        // ==========================================
        // CASE: UNKNOWN TYPE
        // ==========================================
        else {
          console.log("Unknown agent response type.");
          this.socket.emit(
            "messageFromServer",
            "Unknown error occurred on the server side!"
          );
          runningAgentLoop = false;
        }
      } catch (error) {
        this.socket.emit(
          "messageFromServer",
          "⚠️ AI Server Error! Attempting internal recoveries or limit thresholds met."
        );

        console.error("\nAgent execution failed:", error.message);

        if (
          error.message.includes("fetch failed") ||
          error.message.includes("ECONNABORTED")
        ) {
          console.log("Network issue detected. Please check your internet connection.");
        } else if (error.message.includes("500")) {
          console.log("Gemini internal server error. Retrying may fix it.");
        }

        runningAgentLoop = false;
      }
    }
  };
}

export default StudioXAIAgent;