import axios from "axios";
import { Toast } from "../ToastContainer";

class FormController {
  constructor(state, setState, initialState) { // Added initialState here
    this.values = state;
    this.setState = setState;
    this.initialState = initialState; // Store it to use for resetting
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

handleSubmit = async (url, e, options = {}) => {
  const { setrole } = options;

  if (e) e.preventDefault();

  const requestOptions = {
    method: "POST",
    url: url,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    data: this.values,
  };

  try {
    const response = await axios.request(requestOptions);

    if (response?.data?.success === false) {
      Toast(response?.data?.message, "w", 5000);
      return response.data;
    }

    if (response?.data?.token) {
      localStorage.setItem("token", response.data.token);

      Toast("Login Successfully", "s", 5000);

      if (setrole) {
        setrole(1);
      }
    }

    if (response?.data?.id) {
      Toast(
        `Account created successfully with userId: ${response?.data?.id}`,
        "s",
        5000
      );
    }

    if (response?.data?.success || response?.status === 200) {
      this.setState(this.initialState);
    }

    return response.data;
  } catch (error) {
    Toast(error.response?.data?.message || "Internal issue", "d", 5000);
    throw error.response?.data;
  }
};
}

export default FormController;