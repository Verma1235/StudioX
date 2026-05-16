import axios from "axios";
import { Toast } from "../dashboardComponents/ToastContainer";

class ApiController {
  constructor(baseURL = `${import.meta.env.VITE_BACKEND_DATA_URL}/api`) {
    this.baseURL = baseURL;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getHeaders() {
    return {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }

  // =========================
  // GET METHOD
  // =========================
  getRequest = async (endpoint) => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${this.baseURL}${endpoint}`,
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      Toast(error?.response?.data?.message || "GET request failed", "d", 5000);
      console.log(error);
      throw error;
    }
  };

  // =========================
  // POST METHOD
  // =========================
  postRequest = async (endpoint, data = {}) => {
    try {
      const response = await axios.request({
        method: "POST",
        url: `${this.baseURL}${endpoint}`,
        headers: this.getHeaders(),
        data,
      });

      return response.data;
    } catch (error) {
      Toast(error?.response?.data?.message || "POST request failed", "d", 5000);

      throw error;
    }
  };

  // =========================
  // PUT METHOD
  // =========================
  putRequest = async (endpoint, data = {}) => {
    try {
      const response = await axios.request({
        method: "PUT",
        url: `${this.baseURL}${endpoint}`,
        headers: this.getHeaders(),
        data,
      });

      return response.data;
    } catch (error) {
      Toast(error?.response?.data?.message || "PUT request failed", "d", 5000);

      throw error;
    }
  };

  // =========================
  // DELETE METHOD
  // =========================
  deleteRequest = async (endpoint) => {
    try {
      const response = await axios.request({
        method: "DELETE",
        url: `${this.baseURL}${endpoint}`,
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      Toast(
        error?.response?.data?.message || "DELETE request failed",
        "d",
        5000,
      );

      throw error;
    }
  };
}

export default ApiController;
