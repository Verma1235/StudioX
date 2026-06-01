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

const navigatorHandellers = (data, callback) => {
    if (data?.action) {
        switch (data?.action) {
            case 1:
                Toast("Successfully Navigate into Home Page", 's', 3000, 6);
                callback({
                    message: "Successfully navigate into home screen."
                })
                break;
            case 2:
                Toast("This fetures is not publised, under development !!", 's', 3000, 6);
                callback({
                    message: "Unable to toggle side menu || this fetures is under devlopment mode."
                })
                break;
            case 3:
                Toast("Successfully navigate into Login/signup page.", 's', 3000, '0');
                callback({
                    message: "Successfully navigate into login/signup page."
                })
                break;
            case 3:
                Toast("Successfully navigate into Dashboard.", 's', 3000, 1);
                callback({
                    message: "Successfully navigate into Dashboard."
                })
                break;
            default:
                callback({
                    message: "No any tasks found to do? or no such type of tasks i found "
                })
                break;
        }

    } else {
        callback({
            message: "I am Unable to perform your tasks because i haven't provided any particular tasks || please tell me clearly what you want to do ?",
        })
    }
}

export { logiResHandler, logoutResHandeler, settingsHandeller, tokenHandeller, navigatorHandellers };