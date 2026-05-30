import ApiController from "../API/ApiControllers.js";
class socketController {
    constructor(socket, api) {
        this.socket = socket || {};
        this.api = api || new ApiController(socket);
    }

    logout = async () => {
        return new Promise((resolve) => {
            this.socket.emit("logout", { message: "AI Aggent trigger to logout Account !!" }, (callback) => {
                resolve(callback?.status || false);
            });
        });

    }

    getToken = async () => {
        return new Promise((resolve) => {
            this.socket.emit("getToken", {}, (callback) => {
                resolve(callback?.token || "No token found");
            })
        })

    }

    validateToken = async () => {
        // const res=await 
    }
}

export default socketController;