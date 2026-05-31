import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class ApiController {
    constructor(socket, baseURL = `${process.env.BACKEND_URL}`) {
        this.baseURL = baseURL;
        this.socket = socket || {};
    }

    getToken = async () => {
        return new Promise((resolve) => {
            this.socket.emit("getToken", {}, (callback) => {
                resolve(callback?.token || "");
            });
        });

    };

    async getHeader(flag = false) {

        const token = (!!flag ? await this.getToken() : "");
        return {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        };
    }

    // =========================================
    // Get Request 
    // =========================================
    // Here flag control to get request to get token from fronted
    getRequest = async (endpoint, flag = false) => {
        try {
            const header = await this.getHeader(flag);
            const response = await axios.request({
                method: "GET",
                url: `${this.baseURL}${endpoint}`,
                headers: header,
            });

            return response.data;

        } catch (error) {

            console.log(error?.request?.data);

            return error;
        }
    }

    // =========================================
    // POST Request
    // =========================================
    postRequest = async (endpoint, data = {}, flag = false) => {
        try {
            const header = await this.getHeader(flag);

            const response = await axios.request({
                method: "POST",
                url: `${this.baseURL}${endpoint}`,
                headers: header,
                data,
            })

            return response?.data;

        } catch (error) {
            console.log(error);
            return "Error occours !! Task not completed !!";
        }
    }
    // =========================================
    // put method/ request 
    // =========================================
    putRequest = async (endpoint, data = {}, flag = false) => {
        try {
            const header = await this.getHeader(flag);
            const response = await axios.request({
                method: "PUT",
                url: `${this.baseURL}${endpoint}`,
                headers: header,
                data,
            });
            return error;

        } catch (error) {
            throw error;

        }
    }
    // ============================================
    // DELETE RERQUEST
    // ============================================
    deleteRequest = async (endpoint) => {
        try {
            const header = await this.getHeader();
            const rersponse = await axios.request({
                method: "DELETE",
                url: `${this.baseURL}${endpoint}`,
                headers: header,
            })

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    socketController = async (data = {}) => {

        if (!data) {
            console.log("NO data Provided to take action");
            return false;
        }
        console.log("SOCKET:", this?.socket);
        console.log("ACTION:", data?.action);

        switch (data?.action) {
            case 1:
                this.socket.emit("login", data, (callbackRes) => { });

                return true;
                break;
            case 2:
                this.socket.emit("signup", data, (callbackRes) => {
                    return callbackRes || false;
                })
                return true;
                break;
            default:
                console.log("No any case matched with the provided data", data);
                return false;
        }

    }


}
export default ApiController;