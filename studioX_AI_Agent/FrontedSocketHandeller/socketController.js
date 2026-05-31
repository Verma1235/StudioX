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

    navigateInto = async (data = 1) => {
        return new Promise((resolve) => {
            try {
                this.socket.emit("navigator", { action: Number(data) }, (callback) => {
                    resolve(callback?.message || "Unable to perform task !! incompleted !!")
                });
            } catch (error) {
                resolve("Navigation faild!");

            }
        });
    }
}

export default socketController;