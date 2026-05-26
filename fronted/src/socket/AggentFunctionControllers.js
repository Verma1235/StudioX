import FormController from "../dashboardComponents/FormHandeller/FormHandeller";
import socket from "./socket";
import { isEmpty } from "../helpers/validetors";
const AggentFunctionControllers = () => {

    let logininitialState = {
        email: "",
        password: "",
        rememberme: false,
    };
    const [logindata, setlogindata] = useState(logininitialState);

    const form1 = new FormController(logindata, setlogindata, logininitialState);

    socket.on("login", async (data, callback) => {
        if (!data) {
            return false;
        }
        if (isEmpty(data?.email)) {
            return false;
        }
        if (isEmpty(data?.password)) {
            return false;
        }

        form1.setValues({ email: data?.email, password: data?.password });

        const res = await form1.handleSubmit(`%${import.meta.env.VITE_BACKEND_DATA_URL}/login`)


    })

    return;
}

