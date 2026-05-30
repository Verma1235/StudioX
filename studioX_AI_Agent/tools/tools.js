import { getWeatherDetails, toggleLight, dbuserquery ,loginintoaccount,logout,getTokenAndAuthUser} from "../functions/predefinedFunction.js";
const tools = {
    "getWeatherDetails": getWeatherDetails,
    "toggleLight": toggleLight,
    "dbuserquery": dbuserquery,
    "loginintoaccount":loginintoaccount,
    "logout":logout,
    "getTokenAndAuthUser":getTokenAndAuthUser,
}

export { tools };