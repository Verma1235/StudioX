import dotenv from "dotenv";
import readLineSync from "readline-sync";
import { tools } from "./tools/tools.js";
import { SYSTEM_PROMPT } from "./Schema/SystemSchema.js";
import { GoogleGenAI } from "@google/genai";
import { agentResponseSchema } from "./Schema/agentResponseSchema.js";
import extrnalparseInput from "./helper/objectextractorFromString.js";
import extractJson from "./helper/jsonextractor.js";
import { isEmpty } from "./helper/validetors.js"
dotenv.config();

const MODEL = process.env.MODEL || "gemma-4-26b-a4b-it";

class StudioXAIAgent {
    constructor(socket,
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
            apiKey: this.apiKey
        });

        this.messages = [
            {
                role: "system",
                parts: [{ text: SYSTEM_PROMPT }]
            }
        ];
    }

    generateWithRetry = async (
        payload,
        retries = 3,
        time = 2000
    ) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response =
                    await this.ai.models.generateContent(payload);

                return response;
            } catch (error) {
                console.error(
                    `API Attempt ${attempt} Failed:`,
                    error.message
                );

                if (attempt === retries) {
                    throw error;
                }

                await new Promise((resolve) =>
                    setTimeout(resolve, Number(time))
                );
            }
        }
    };

    parseInput(input) {
        if (input === "true") return true;
        if (input === "false") return false;
        return input;
    }


    // async askUserQuery(message = "Ask anything") {
    //     console.log("Stage 2")

    //     return new Promise((resolve, reject) => {

    //         this.socket.emit(
    //             "AiResponse",
    //             {
    //                 type: "system",
    //                 message
    //             },
    //             (userquery) => {

    //                 if (!userquery) {
    //                     return reject(
    //                         new Error("No response from user")
    //                     );
    //                 }

    //                 resolve(userquery);
    //             }
    //         );

    //     });
    // }

    startAiAgent = async (data = '') => {
        console.log("Stage 1 :", data);

        if (!isEmpty(data)) {

            const query = data;

            console.log("User query: ", query)
            if (query.trim().toLowerCase() === "exit") {
                console.log("Agent stopped.");
                process.exit(0);
            }

            const cleanedQuery = query.trim();

            // Temporary reasoning memory
          const  tempMessages = [];

            // Permanent memory
            this.messages.push({
                role: "user",
                parts: [
                    {
                        text: JSON.stringify({
                            type: "user",
                            user: cleanedQuery
                        })
                    }
                ]
            });

            let runningAgentLoop = true;

            let stepCounter = 0;

            const MAX_STEPS =
                Number(process.env.TOTAL_INTRACTION_STEPS) || 15;

            while (runningAgentLoop) {
                try {
                    stepCounter++;

                    // Infinite loop protection
                    if (stepCounter > MAX_STEPS) {
                        console.log(
                            "Agent stopped: Max reasoning steps reached."
                        );
                        break;
                    }

                    const chatResponse =
                        await this.generateWithRetry(
                            {
                                model: MODEL,

                                contents: [
                                    ...this.messages,
                                    ...tempMessages
                                ],

                                config: {
                                    maxOutputTokens: 200,

                                    temperature: 0,

                                    stopSequences: ["\n\n"],

                                    responseMimeType:
                                        "application/json",

                                    responseSchema:
                                        agentResponseSchema
                                }
                            },
                            Number(
                                process.env.MAX_RETRY_ATTEMPT
                            ) || 3,
                            Number(
                                process.env
                                    .MAX_TIME_WAIT_AT_EACH_RETRY
                            ) || 2000
                        );

                    // Gemini SDK response text
                    const rawText =
                        typeof chatResponse.text === "function"
                            ? chatResponse.text()
                            : chatResponse.text;

                    if (!rawText) {
                        throw new Error(
                            "Empty model response"
                        );
                    }

                    let agentStep;

                    try {
                        agentStep = JSON.parse(
                            extractJson(rawText)
                        );
                    } catch (jsonError) {
                        console.error(
                            "Invalid JSON returned by model:"
                        );

                        console.log(rawText);

                        break;
                    }

                    console.log(
                        `[Agent State: ${agentStep.type?.toUpperCase()}]`,
                        JSON.stringify(agentStep, null, 2)
                    );

                    // =========================
                    // PLAN
                    // =========================
                    if (agentStep.type === "plan") {
                        tempMessages.push({
                            role: "model",
                            parts: [
                                {
                                    text: JSON.stringify(
                                        agentStep
                                    )
                                }
                            ]
                        });

                        continue;
                    }

                    // =========================
                    // ACTION
                    // =========================
                    else if (agentStep.type === "action") {
                        tempMessages.push({
                            role: "model",
                            parts: [
                                {
                                    text: JSON.stringify(
                                        agentStep
                                    )
                                }
                            ]
                        });

                        const fn =
                            tools[agentStep.function];

                        if (!fn) {
                            console.error(
                                `Unknown tool requested: ${agentStep.function}`
                            );

                            break;
                        }

                        let observationResult;

                        try {
                            observationResult =
                                await fn(
                                    extrnalparseInput(
                                        agentStep.input
                                    ) || {}
                                );
                        } catch (toolError) {
                            console.error(
                                "Tool Execution Failed:",
                                toolError.message
                            );

                            observationResult =
                                "Tool execution failed";
                        }

                        const observationPayload = {
                            type: "observation",
                            observation:
                                observationResult
                        };

                        console.log(
                            `[System Tool Observation]`,
                            JSON.stringify(
                                observationPayload,
                                null,
                                2
                            )
                        );

                        tempMessages.push({
                            role: "user",
                            parts: [
                                {
                                    text: JSON.stringify(
                                        observationPayload
                                    )
                                }
                            ]
                        });

                        // Prevent memory explosion
                        if (tempMessages.length > 20) {
                            tempMessages =
                                tempMessages.slice(-20);
                        }

                        continue;
                    }

                    // =========================
                    // FINAL OUTPUT
                    // =========================
                    else if (
                        agentStep.type === "output"
                    ) {
                        console.log(
                            `\nFinal Answer: ${agentStep.output}`
                        );
                        this.socket.emit("messageFromServer", agentStep?.output);

                        // this.socket.emit("AiResponse", agentStep, (res) => {
                        //     console.log(`Response from client:`, res);
                        // })

                        // FIXED: this.messages
                        this.messages.push({
                            role: "model",
                            parts: [
                                {
                                    text: JSON.stringify(
                                        agentStep
                                    )
                                }
                            ]
                        });

                        tempMessages = [];

                        runningAgentLoop = false;
                    }

                    // =========================
                    // UNKNOWN TYPE
                    // =========================
                    else {
                        console.log(
                            "Unknown agent response type."
                        );
                        this.socket.emit("messageFromServer", "Unknown eror occurs at server side !");
                        runningAgentLoop = false;
                    }
                } catch (error) {
                    this.socket.emit("messageFromServer", "API Error !! please wait i am trying to solve internal errors || i think you hit maximum limit per minutes !");

                    console.error(
                        "\nAgent execution failed:",
                        error.message
                    );

                    // Network Errors
                    if (
                        error.message.includes(
                            "fetch failed"
                        ) ||
                        error.message.includes(
                            "ECONNABORTED"
                        )
                    ) {
                        console.log(
                            "Network issue detected. Please check internet connection."
                        );
                    }

                    // Gemini Internal Errors
                    else if (
                        error.message.includes("500")
                    ) {
                        console.log(
                            "Gemini internal server error. Retrying may fix it."
                        );
                    }

                    runningAgentLoop = false;
                }
            }

        } else {
            this.socket.emit("messageFromServer", "I am your StudioX AI Agent !! Ask me to do somthing !!")
        }
    }


};


export default StudioXAIAgent;