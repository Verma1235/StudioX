import { io } from "socket.io-client";
// alert(`${import.meta.env.BACKEND_AI_AGENT_URL}`);
const socket = io("https://studiox-ai-backend.onrender.com");
// const socket = io("http://localhost:5500");


export default socket;