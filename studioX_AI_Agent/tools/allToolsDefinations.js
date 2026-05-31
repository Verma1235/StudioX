
const functionDescription = [
    {
        functionName: "getWeatherDetails",
        input: {
            city: "string",
            unit: "string (optional)"
        },
        description: "Gets current weather details of a city and returns the current temperature and weather information.",
        return: "string"
    },

    {
        functionName: "toggleLight",
        input: {
            mode: "boolean"
        },
        description: "Turns the light ON or OFF based on boolean input. true = ON, false = OFF.",
        return: "boolean"
    },

    {
        functionName: "dbuserquery",
        input: {
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
        input: {
            email: "string",
            password: "string"
        },
        description:
            "this function required email and password to login into StudioX account, if login succefully into account then return it true other wise false.",
        return: "boolean"
    },
    {
        functionName: "logout",
        input: {
            action: "logout"
        },
        description:
            "this function required action='logout' as arrgument and return true or false, if return true then logout sucess other wise if observation false then logout unsuccessfull.",
        return: "boolean"
    },
    {
        functionName: "getTokenAndAuthUser",
        input: {
            action: "getTokenAndAuthUser"
        },
        description:
            "This function runs before login or logout. It checks whether the user's authentication token is valid. If the token is valid, the user is already logged in and should not be asked to log in again. If the token is expired, invalid, or unavailable, the user is not logged in and should be asked for their email and password. The result of this verification determines whether login or logout actions are permitted.",
        return: "object"
    },
    {
        functionName: "navigateInto",
        input: {
            target:
                "MANDATORY: Use the exact numeric value returned by the most recent tasks() observation. Never modify, decrement, increment, convert, or guess the value. If tasks() returns 3 then navigateInto target must be exactly 3."
        },
        description:
            "This function should be called after the tasks function. The tasks function returns an index number, which is used as the target parameter to navigate to the selected task and perform the required actions.",
        return: "String",
    }, {
        functionName: "tasks",
        input: {
            target: "The user's query, command, or navigation request. This can include page names, screen names, menu names, buttons, or natural language instructions such as 'go to home', 'open login page', 'show signup screen', or 'open side menu'. in contains only single word. strictly contains only string",
        },
        description:
            "Analyzes the user's query and determines the intended navigation target or task. The function supports multiple keywords, synonyms, and natural language variations for screens such as Home, Login, Signup/Register, Side Menu, Dashboard, and other application sections. It returns the corresponding task index number, which can be passed to the navigateInto function to navigate to the selected screen or perform the required action.",
        return:
            "Number - Returns the matched task index number. Returns -1 if no matching task or screen is found."
    }
];

export { functionDescription };