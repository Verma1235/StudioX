import { isEmpty, validateEmail, validatePassword } from "../helper/validetors.js";
import ApiController from "../API/ApiControllers.js";
import NewSocketConnection from "../socket/socketconnection.js";
import socketController from "../FrontedSocketHandeller/socketController.js"
function getWeatherDetails({ city = '' }) {
    const cleanCity = city.trim().toLowerCase();
    if (cleanCity === 'saradhu') return '45°C';
    if (cleanCity === 'tandwa') return '35°C';
    if (cleanCity === 'hazaribagh') return '40°C';
    if (cleanCity === 'delhi') return '33°C';
    if (cleanCity === 'jharkhand') return '41°C';
    if (cleanCity === 'ramgarh') return '55°C';
    if (cleanCity === 'soparam') return '35°C';
    if (cleanCity === 'pakistan') return '100°C';
    return 'Weather details not found for this city.';
}

function toggleLight(mode = false) {
    if (mode) {
        return true;
    } else {
        return false;
    }
}

function dbuserquery({ name = "dinesh" }) {
    const name1 = name.trim().toLowerCase();
    if (name1 === 'dinesh') return "Dinesh verma is the full stack developer and founder of StudioX ";
    if (name1 === 'deepak') return "Deepak verma is the brother of Dinesh verma";
    if (name1 === 'aditya') return "Dinesh verma is the full stack developer";
    return 'user details not found !';
}

async function loginintoaccount(data) {
    // console.log("At Login Function: ", data?.socket);
    const api = new ApiController(data?.socket);

    // console.log(data?.email);
    // console.log(data?.password);
    if (isEmpty(data?.email) || isEmpty(data?.password)) return "Correct email and password required";
    if (!validateEmail(data?.email)) return "This is not the valid email id";
    if (!validatePassword(data?.password)) return "Password is not correct !! please enter correct more than 6 digits password !!";

    const response = await api.postRequest('/login', { email: data?.email, password: data?.password, rememberme: false, });
    console.log("RESPONSE1: ", response);
    const response2 = await api.socketController(response);
    console.log("RESPONSE2: ", response2);
    return { backend_status: response?.success, fronted_status: !!response2, message: response?.success ? "Token generated successfully" : response?.message, };
}


async function logout(data) {
    const socketAgent = new socketController(data?.socket);
    const response = await socketAgent.logout();
    console.log("LOGOUT RESPONSE ", response);
    return response;
}

async function getTokenAndAuthUser(data) {
    const api = new ApiController(data?.socket);
    const res = await api.getRequest("/token", true);

    console.log("RESPONSE OF TOKEN AUTH: ", res);

    return res.message;

}

async function navigateInto(data) {
    const socketAgent = new socketController(data?.socket);
    const response = await socketAgent.navigateInto(Number(data?.target));
    // console.log("Navigation res: ",response);
    return response || "Unable to perform tasks";
}

async function tasks(data) {
    if (!data?.target) {
        console.log("TASKS DATA: ", data)
        return -1;
    }
    return new Promise((resolve) => {
        const typeofTarget = typeof data?.target;
        if (typeofTarget.toLowerCase() != 'string') {
            resolve("Not valid input provided || please provide string. word that you want to perform tasks");
        }
        const target = data.target.toLowerCase().trim();
        const intents = [
            {
                id: 1,
                keywords: [
                    "home",
                    "homepage",
                    "home page",
                    "landing page",
                    "main page",
                    "main screen",
                    "home screen",
                    "start page",
                ],
            },
            {
                id: 2,
                keywords: [
                    "side menu",
                    "sidebar",
                    "menu",
                    "navigation menu",
                    "nav menu",
                    "drawer",
                    "hamburger menu",
                    "left menu",
                    "side panel",
                ],
            },
            {
                id: 3,
                keywords: [
                    // Login
                    "login",
                    "log in",
                    "signin",
                    "sign in",
                    "login page",
                    "sign in page",
                    "authentication",
                    "authenticate",
                    "user login",
                    "member login",
                    "account login",
                    "access account",
                    "open login",
                    "go to login",
                    "take me to login",
                    "show login screen",
                    "login screen",
                    "open sign in",
                    "enter account",
                    "log into account",

                    // Signup / Register
                    "signup",
                    "sign up",
                    "register",
                    "registration",
                    "register account",
                    "create account",
                    "new account",
                    "create new account",
                    "join",
                    "join now",
                    "open signup",
                    "open sign up",
                    "go to signup",
                    "go to sign up",
                    "signup page",
                    "sign up page",
                    "registration page",
                    "register page",
                    "show signup screen",
                    "signup screen",
                    "create profile",
                    "make account",
                    "open registration",

                    // Natural language variations
                    "i want to login",
                    "let me login",
                    "log me in",
                    "sign me in",
                    "access my account",
                    "already have an account",
                    "existing user",
                    "i want to signup",
                    "i want to register",
                    "create my account",
                    "sign me up",
                    "register me",
                    "new user",
                    "i don't have an account",
                    "take me to registration",
                    "make a new account"
                ],
            }
        ];

        for (const intent of intents) {
            if (intent.keywords.some(keyword => target.includes(keyword))) {
                resolve(intent.id);
            }
        }

        resolve(-1);

    });

}


export { getWeatherDetails, toggleLight, dbuserquery, loginintoaccount, logout, getTokenAndAuthUser, navigateInto, tasks };



















