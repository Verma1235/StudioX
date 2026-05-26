
const functionDescription = [
    {
        functionName: "getWeatherDetails",
        inputParameters: {
            city: "string",
            unit: "string (optional)"
        },
        description: "Gets current weather details of a city and returns the current temperature and weather information.",
        return: "string"
    },

    {
        functionName: "toggleLight",
        inputParameters: {
            mode: "boolean"
        },
        description: "Turns the light ON or OFF based on boolean input. true = ON, false = OFF.",
        return: "boolean"
    },

    {
        functionName: "dbuserquery",
        inputParameters: {
            name: "string",
            email: "string (optional)",
            phone: "string (optional)"
        },
        description:
            "Queries the database using user details and returns complete user information as a string.",
        return: "string"
    },
    {
        functionName: "loginintoaccount",
        inputParameters: {
            email: "string",
            password: "string"
        },
        description:
            "this function required email and password to login into StudioX account, if login succefully into account then return it true other wise false.",
        return: "boolean"
    },

];

export { functionDescription };