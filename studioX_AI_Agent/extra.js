// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// const MODEL = process.env.MODEL || "gemini-1.5-flash";

// const messages = [
//     {
//         role: "system",
//         parts: [{ text: SYSTEM_PROMPT }]
//     }
// ];

// Retry wrapper for Gemini API
// async function generateWithRetry(payload, retries = 3, time = 2000,) {

//     for (let attempt = 1; attempt <= retries; attempt++) {

//         try {

//             const response = await ai.models.generateContent(payload);

//             return response;

//         } catch (error) {

//             console.error(
//                 `API Attempt ${attempt} Failed:`,
//                 error.message
//             );

//             // Last retry → throw error
//             if (attempt === retries) {
//                 throw error;
//             }

//             // Wait before retry
//             await new Promise((resolve) =>
//                 setTimeout(resolve, time)
//             );
//         }
//     }
// }

// Convert string boolean safely
// function parseInput(input) {

//     if (input === "true") return true;

//     if (input === "false") return false;

//     return input;
// }

// Main agent
// async function startAiAgent() {

//     while (true) {

//         const query = readLineSync.question("\n>> ");

//         if (query.trim().toLowerCase() === "exit") {

//             console.log("Agent stopped.");

//             process.exit(0);
//         }

//         const cleanedQuery = query.trim();

//         // Temporary reasoning memory
//         let tempMessages = [];

//         // Store only user query in permanent memory
//         messages.push({
//             role: "user",
//             parts: [
//                 {
//                     text: JSON.stringify({
//                         type: "user",
//                         user: cleanedQuery
//                     })
//                 }
//             ]
//         });

//         let runningAgentLoop = true;

//         let stepCounter = 0;

//         const MAX_STEPS =
//             Number(process.env.TOTAL_INTRACTION_STEPS) || 15;

//         while (runningAgentLoop) {

//             try {

//                 stepCounter++;

//                 // Infinite loop protection
//                 if (stepCounter > MAX_STEPS) {

//                     console.log(
//                         "Agent stopped: Max reasoning steps reached."
//                     );

//                     break;
//                 }

//                 const chatResponse = await generateWithRetry({

//                     model: MODEL,

//                     // Combine permanent + temporary memory
//                     contents: [
//                         ...messages,
//                         ...tempMessages
//                     ],

//                     config: {

//                         maxOutputTokens: 200,

//                         temperature: 0,

//                         stopSequences: ["\n\n"],

//                         responseMimeType:
//                             "application/json",

//                         responseSchema:
//                             agentResponseSchema
//                     }

//                 },
//                     process.env.MAX_RETRY_ATTEMPT,
//                     process.env.MAX_TIME_WAIT_AT_EACH_RETRY
//                 );

//                 const rawText = chatResponse.text;

//                 // Empty response protection
//                 if (!rawText) {

//                     throw new Error(
//                         "Empty model response"
//                     );
//                 }

//                 let agentStep;

//                 try {

//                     agentStep = JSON.parse(
//                         extractJson(rawText)
//                     );

//                 } catch (jsonError) {

//                     console.error(
//                         "Invalid JSON returned by model:"
//                     );

//                     console.log(rawText);

//                     break;
//                 }

//                 console.log(
//                     `[Agent State: ${agentStep.type.toUpperCase()}]`,
//                     JSON.stringify(agentStep, null, 2)
//                 );

//                 // =========================
//                 // PLAN
//                 // =========================
//                 if (agentStep.type === "plan") {

//                     tempMessages.push({
//                         role: "model",
//                         parts: [
//                             {
//                                 text: JSON.stringify(
//                                     agentStep
//                                 )
//                             }
//                         ]
//                     });

//                     continue;
//                 }

//                 // =========================
//                 // ACTION
//                 // =========================
//                 else if (agentStep.type === "action") {

//                     tempMessages.push({
//                         role: "model",
//                         parts: [
//                             {
//                                 text: JSON.stringify(
//                                     agentStep
//                                 )
//                             }
//                         ]
//                     });

//                     const fn =
//                         tools[agentStep.function];

//                     if (!fn) {

//                         console.error(
//                             `Unknown tool requested: ${agentStep.function}`
//                         );

//                         break;
//                     }

//                     let observationResult;

//                     try {

//                         observationResult =
//                             await fn(
//                                 extrnalparseInput(
//                                     agentStep.input
//                                 ) || {}
//                             );

//                     } catch (toolError) {

//                         console.error(
//                             "Tool Execution Failed:",
//                             toolError.message
//                         );

//                         observationResult =
//                             "Tool execution failed";
//                     }

//                     const observationPayload = {
//                         type: "observation",
//                         observation:
//                             observationResult
//                     };

//                     console.log(
//                         `[System Tool Observation]`,
//                         JSON.stringify(
//                             observationPayload,
//                             null,
//                             2
//                         )
//                     );

//                     // Store observation in temporary memory
//                     tempMessages.push({
//                         role: "user",
//                         parts: [
//                             {
//                                 text: JSON.stringify(
//                                     observationPayload
//                                 )
//                             }
//                         ]
//                     });

//                     // Prevent runaway memory growth
//                     if (tempMessages.length > 20) {

//                         tempMessages =
//                             tempMessages.slice(-20);
//                     }

//                     continue;
//                 }

//                 // =========================
//                 // FINAL OUTPUT
//                 // =========================
//                 else if (
//                     agentStep.type === "output"
//                 ) {

//                     console.log(
//                         `\nFinal Answer: ${agentStep.output}`
//                     );

//                     // Store only final answer permanently
//                     messages.push({
//                         role: "model",
//                         parts: [
//                             {
//                                 text: JSON.stringify(
//                                     agentStep
//                                 )
//                             }
//                         ]
//                     });

//                     // Clear temporary reasoning memory
//                     tempMessages = [];

//                     runningAgentLoop = false;
//                 }

//                 // =========================
//                 // UNKNOWN TYPE
//                 // =========================
//                 else {

//                     console.log(
//                         "Unknown agent response type."
//                     );

//                     runningAgentLoop = false;
//                 }

//             } catch (error) {

//                 console.error(
//                     "\nAgent execution failed:",
//                     error.message
//                 );

//                 // Network Errors
//                 if (
//                     error.message.includes(
//                         "fetch failed"
//                     ) ||
//                     error.message.includes(
//                         "ECONNABORTED"
//                     )
//                 ) {

//                     console.log(
//                         "Network issue detected. Please check internet connection."
//                     );
//                 }

//                 // Gemini Internal Errors
//                 else if (
//                     error.message.includes("500")
//                 ) {

//                     console.log(
//                         "Gemini internal server error. Retrying may fix it."
//                     );
//                 }

//                 runningAgentLoop = false;
//             }
//         }
//     }
// }