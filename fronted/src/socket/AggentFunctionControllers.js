import { useMemo, useEffect, useState } from "react";
import socket from "./socket";
import { isEmpty } from "../helpers/validetors";
import { logiResHandler, logoutResHandeler, settingsHandeller, tokenHandeller,navigatorHandellers } from "./generalSocketControlFunctions";
const AggentFunctionControllers = () => {

    useEffect(() => {



        socket.on("login", logiResHandler);
        socket.on("logout", logoutResHandeler);
        socket.on("settingsUpdates", settingsHandeller);
        socket.on("getToken", tokenHandeller);
        socket.on("navigator",navigatorHandellers);

        return () => {
            socket.off("login", loginHandler);
            socket.off("logout", logoutResHandeler);
            socket.off("settingsUpdates", settingsHandeller);
            socket.off("getToken", tokenHandeller);
            socket.off("navigator",navigatorHandellers);
        };

    }, []);

    return null;
};

export default AggentFunctionControllers;