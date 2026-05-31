import { getWeatherDetails, toggleLight, dbuserquery ,loginintoaccount,logout,getTokenAndAuthUser,navigateInto,tasks} from "../functions/predefinedFunction.js";
const tools = {
    "getWeatherDetails": getWeatherDetails,
    "toggleLight": toggleLight,
    "dbuserquery": dbuserquery,
    "loginintoaccount":loginintoaccount,
    "logout":logout,
    "getTokenAndAuthUser":getTokenAndAuthUser,
    "navigateInto":navigateInto,
    "tasks":tasks,
}

export { tools };