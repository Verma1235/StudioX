import { isEmpty, validateEmail, validatePassword } from "../helper/validetors.js";
import ApiController from "../API/ApiControllers.js";
import NewSocketConnection from "../socket/socketconnection.js";

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
    console.log("At Login Function: ", data?.socket);
    const api = new ApiController(data?.socket);

    console.log(data?.email);
    console.log(data?.password);
    if (isEmpty(data?.email) || isEmpty(data?.password)) return "Correct email and password required";
    if (!validateEmail(data?.email)) return "This is not the valid email id";
    if (!validatePassword(data?.password)) return "Password is not correct !! please enter correct more than 6 digits password !!";

    const response = await api.postRequest('/login', { email: data?.email, password: data?.password, rememberme: false, });
    console.log("RESPONSE1: ", response);
    const response2 = await api.socketController(response);
    console.log("RESPONSE2: ", response2);
    return { backend_status: response?.success, fronted_status: !!response2, message: response?.success ? "Token generated successfully" : response?.message, };
}

export { getWeatherDetails, toggleLight, dbuserquery, loginintoaccount };



















