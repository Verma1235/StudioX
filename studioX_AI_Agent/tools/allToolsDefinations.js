
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
    {
        functionName: "logout",
        inputParameters: {
            action: "logout"
        },
        description:
            "this function required action='logout' as arrgument and return true or false, if return true then logout sucess other wise if observation false then logout unsuccessfull.",
        return: "boolean"
    },
    {
        functionName: "getTokenAndAuthUser",
        inputParameters: {
            action: "getTokenAndAuthUser"
        },
        description:
            "This function runs before login or logout. It checks whether the user's authentication token is valid. If the token is valid, the user is already logged in and should not be asked to log in again. If the token is expired, invalid, or unavailable, the user is not logged in and should be asked for their email and password. The result of this verification determines whether login or logout actions are permitted.",
        return: "object"
    },

];

export { functionDescription };