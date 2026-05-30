import { Toast } from "../dashboardComponents/ToastContainer";

const logiResHandler = (data, callback) => {
    if (!data?.token) {
        Toast(data?.message || "Login faild !! Retry Login manually by entring credientials.", "i", 3000, 6);
        callback(false);
    }

    if (data?.token) {
        localStorage.setItem('token', data?.token);
        Toast(data?.message || "Login successfully ", 's', 4000, 1)
        callback(true);
    }

}
const logoutResHandeler = (data, callback) => {
    localStorage.removeItem("token");

    Toast("Logout successfully !! ", 's', 4000, 6);
    callback({
        status: true,
    })
}
const settingsHandeller = (data, callback) => {

}


const tokenHandeller = (data, callback) => {
    Toast("Ai agent request to get token", 'i');
    const token1 = localStorage.getItem("token") || "gsdfgdgdfgdfgfhffghgf.jkfkdghdfjghduighdjk342.3425324hgvhgvgvhgj";
    callback({
        token: token1,
    })
}

export { logiResHandler, logoutResHandeler, settingsHandeller, tokenHandeller };