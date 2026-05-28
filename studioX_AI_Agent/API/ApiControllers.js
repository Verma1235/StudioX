import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class ApiController {
    constructor(socket, baseURL = `${process.env.BACKEND_URL}`) {
        this.baseURL = baseURL;
        this.socket = socket || {};
    }

    getHeader() {
        return {
            Accept: "*/*",
            "Content-Type": "application/json",
        }
    }
    
    // =========================================
    // Get Request 
    // =========================================
    getRequest = async (endpoint) => {
        try {
            const response = await axios.request({
                method: "GET",
                url: `${this.baseURL}${endpoint}`,
                headers: this.getHeader(),
            });

            return response.data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    // =========================================
    // POST Request
    // =========================================
    postRequest = async (endpoint, data = {}) => {
        try {
            const response = await axios.request({
                method: "POST",
                url: `${this.baseURL}${endpoint}`,
                headers: this.getHeader(),
                data,
            })

            return response?.data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    // =========================================
    // put method/ request 
    // =========================================
    putRequest = async (endpoint, data = {}) => {
        try {
            const response = await axios.request({
                method: "PUT",
                url: `${this.baseURL}${endpoint}`,
                headers: this.getHeader(),
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
            const rersponse = await axios.request({
                method: "DELETE",
                url: `${this.baseURL}${endpoint}`,
                headers: this.getHeader(),
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
                this.socket.emit("login", data, (callbackRes) => {});

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