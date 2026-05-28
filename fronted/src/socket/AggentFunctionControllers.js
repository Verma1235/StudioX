import { useMemo, useEffect, useState } from "react";
import socket from "./socket";
import { isEmpty } from "../helpers/validetors";
import { Toast } from "../dashboardComponents/ToastContainer";
const AggentFunctionControllers = () => {

    useEffect(() => {
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

        socket.on("login", logiResHandler);

        return () => {
            socket.off("login", loginHandler);
        };

    }, []);

    return null;
};

export default AggentFunctionControllers;