import axios from "axios";
import { Toast } from "../ToastContainer";
import ApiController from "../../apidata/ApiController";

class FormController {
  constructor(
    state,
    setState,
    initialState,
    baseURL = `${import.meta.env.VITE_BACKEND_DATA_URL}`,
  ) {
    // Added initialState here
    this.values = state;
    this.setState = setState;
    this.initialState = initialState; // Store it to use for resetting
    // this.setState(initialState);
    this.api = new ApiController(baseURL);
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  setValues(values) {
    this.setState((prev) => ({
      ...prev,
      ...values,
    }));
  }
  sendOTP = async () => {
    try {
      const res = await this.api.postRequest("/sendotp", {
        email: this.values?.email,
      });
      if (res?.success == false) {
        Toast(res?.message || "verification code sending error !!", "w", 3000);
        return false;
      }
      if (res?.success == true) {
        Toast(
          res?.message || "Successfully verification send to your email id ",
          "i",
          5000,
        );
        return true;
      }
    } catch (error) {
      // Toast("Error occours while sending otp ", "i", 5000);
      console.log(error);
      return false;
    }
  };

  verifyOTP = async () => {
    try {
      const res = await this.api.postRequest("/verifyotp", {
        OTP: this.values?.otp,
      });
      if (res?.success == false) {
        Toast(res?.message || "wrong verification code !!", "w", 3000);
        return false;
      }
      if (res?.success == true) {
        Toast(res?.message || "Successfully code  verified !!", "i", 5000);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  comparePassword = () => {
    try {
      if (this.values.newpassword !== this.values.confirmPass) {
        Toast("Confirm Password does not match with new Password !!");
        return false;
      }

      return true;
    } catch (error) {
      console.log("ERROR:", error);
      return false;
    }
  };

  validatePassword = (password) => {
    if (!password) return false;

    // At least 6 chars, one letter, one number, one special char
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    return pattern.test(password);
  };

  verifyPassword = () => {
    try {
      const flag = this.validatePassword(this.values.newPassword);
      if (!flag) {
        Toast(
          "Password must contain at least 6 characters, one letter, one number and one special character",
          "i",
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log("ERROR:", error);
      return false;
    }
  };

  handleSubmit = async (url, e, options = {}) => {
    const { setrole } = options;

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
        return true;
      }

      if (response?.data?.id) {
        Toast(
          `Account created successfully with userId: ${response?.data?.id}`,
          "s",
          5000,
        );
        return true;
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

  handelPassChangeSubmit = async () => {
    try {
      if (!this.verifyPassword()) {
        return false;
      }

      const res = await this.api.postRequest("/changepassword", this.values);

      if (res?.success === false) {
        Toast(res?.message || "Password Updation Error!", "w", 4000);
        return false;
      }

      if (res?.success === true) {
        Toast(res?.message || "Password Updated Successfully", "s", 5000);

        this.setState(this.initialState);

        return true;
      }
    } catch (err) {
      Toast(err?.data || "Something went wrong !!", "w", 3000);

      return false;
    }
  };
}

export default FormController;
