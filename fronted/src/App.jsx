import { useState, useEffect } from "react";
import LOGIN_SIGNUP_PAGE from "./pages/LoginSignup";
import USER from "./pages/Users";
import ADMIN from "./pages/Admin";
import COADMIN from "./pages/Coadmin";
import DEVELOPER from "./pages/Developer";
import EMPLOYEE from "./pages/Employee";
import GENERAlPAGE from "./pages/GeneralHome";
// import { useUserData } from "./apidata/userdata";
import ToastContainer from "./dashboardComponents/ToastContainer";
import ProcessingScreen from "./pages/ProcessingScreen";
import { FloatContainer } from "./dashboardComponents/FloatContainer";
import {
  tokenValidator,
  checktoken,
} from "../src/dashboardComponents/stateController/tokenValidator";
import SettingsControl from "./FloatContainerComponents/SettingsControl";
import ResetPassword from "./FloatContainerComponents/ForgotPassword";
import StudioxAiAgent from "./AI/StudioxAiAgent2";
import AggentFunctionControllers from "./socket/AggentFunctionControllers";
const assignRole = [
  "LOGIN_SIGNUP",
  "USER",
  "ADMIN",
  "COADMIN",
  "DEVELOPER",
  "EMPLOYEE",
  "GENERALHOME",
  "ProcessingScreen",
];

function App() {
  // switching role
  const [status, setStatus] = useState({ role: assignRole[7] });
  const [processingWindow, setProcessingWindow] = useState(false);
  const [FloatContainerState, setFloatContainerState] = useState({
    status: false,
    target: "blank",
  });
  function toggleProcessingWindow(val = !processingWindow) {
    setProcessingWindow(val);
  }
  function setrole(roleindex) {
    setStatus({ role: assignRole[roleindex] });
  }
  function toggleFloatContainer(value = "") {
    let status = FloatContainerState.status;
    setFloatContainerState({
      status: !status,
      target: value,
    });
    console.log(FloatContainerState);
  }

  //  update status
  useEffect(() => {
    

    setrole(7);
    checktoken(setrole, toggleProcessingWindow);
  }, []);

  return (
    <>
      <ToastContainer setrole={setrole} />
      {processingWindow && (
        <div className="fixed inset-0 bg-[#050505]/50 flex items-center justify-center overflow-hidden z-[5001]">
          <div className="relative flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                style={{
                  animation: `snakeMove 1s ${i * 0.12}s infinite ease-in-out`,
                }}
              />
            ))}
          </div>

          <style>
            {`
          @keyframes snakeMove {
            0%, 100% {
              transform: translateY(0px) scale(0.8);
              opacity: 0.4;
            }
            50% {
              transform: translateY(-18px) scale(1.4);
              opacity: 1;
            }
          }
        `}
          </style>
        </div>
      )}

      {console.log(status)}
      {status?.role == assignRole[0] && (
        <LOGIN_SIGNUP_PAGE
          setrole={setrole}
          toggleFloatContainer={toggleFloatContainer}
          toggleProcessingWindow={toggleProcessingWindow}
        />
      )}
      {status?.role == assignRole[1] && (
        <USER setrole={setrole} toggleFloatContainer={toggleFloatContainer} />
      )}
      {status?.role == assignRole[2] && <ADMIN />}
      {status?.role == assignRole[3] && <COADMIN />}
      {status?.role == assignRole[4] && <DEVELOPER />}
      {status?.role == assignRole[5] && <EMPLOYEE />}
      {status?.role == assignRole[6] && (
        <GENERAlPAGE
          setrole={setrole}
          toggleFloatContainer={toggleFloatContainer}
        />
      )}
      {status?.role == assignRole[7] && <ProcessingScreen />}

      {FloatContainerState.status && (
        <FloatContainer
          FloatContainerState={FloatContainerState}
          toggleFloatContainer={toggleFloatContainer}
        >
          {FloatContainerState.target == "Settings" && <SettingsControl />}
          {FloatContainerState.target == "forgot" && (
            <ResetPassword toggleProcessingWindow={toggleProcessingWindow} />
          )}
        </FloatContainer>
      )}
      {/* <SocketApp /> */}
      <StudioxAiAgent />
      <AggentFunctionControllers />
    </>
  );
}

export default App;
