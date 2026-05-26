// import {Type} from "@google/genai";
// const agentResponseSchema = {
//     type: Type.OBJECT,
//     properties: {
//         type: {
//             type: Type.STRING,
//             description: "The execution state step identifier: must be either 'plan', 'action', or 'output'."
//         },
//         plan: { type: Type.STRING, description: "Detailed thought process detailing what you want to do next." },
//         function: { type: Type.STRING, description: "Name of the local function tool to execute. Provide this ONLY when type is 'action'." },
//         input: { type: Type.STRING, description: "The arguments string payload for the function. Provide this ONLY when type is 'action'." },
//         output: { type: Type.STRING, description: "The final answer response text for the user. Provide this ONLY when type is 'output'." }
//     },
//     required: ["type"]
// };

// export {agentResponseSchema};


import { Type } from "@google/genai";

const agentResponseSchema = {
    type: Type.OBJECT,

    properties: {

        type: {
            type: Type.STRING,
            enum: [
                "plan",
                "action",
                "observation",
                "output"
            ]
        },

        plan: {
            type: Type.STRING,
            description:
                "Short next-step planning text."
        },

        function: {
            type: Type.STRING,
            description:
                "Tool name to execute."
        },


        input: {
            anyOf: [
                { type: Type.STRING },
                { type: Type.BOOLEAN },
                { type: Type.NUMBER }
            ],
            description:
                "Tool input argument."
        },

        observation: {
            type: Type.STRING,
            description:
                "Tool execution result."
        },

        output: {
            type: Type.STRING,
            description:
                "Final user-facing answer."
        }
    },

    required: ["type"],

    additionalProperties: false
};

export { agentResponseSchema };