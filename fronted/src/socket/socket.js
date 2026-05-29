import { io } from "socket.io-client";
const socket = io(`${import.meta.env.BACKEND_AI_URL}`);
// const socket = io("http://localhost:5500");


export default socket;