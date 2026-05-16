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
import {
  tokenValidator,
  checktoken,
} from "../src/dashboardComponents/stateController/tokenValidator";
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
  const [status, setStatus] = useState({ role:assignRole[7]  });

  function setrole(roleindex) {
    setStatus({ role: assignRole[roleindex] });
  }
  //  update status
  useEffect(() => {
    setrole(7);
    checktoken(setrole);
  }, []);

  return (
    <>
      <ToastContainer />

      {console.log(status)}
      {status?.role == assignRole[0] && <LOGIN_SIGNUP_PAGE setrole={setrole} />}
      {status?.role == assignRole[1] && <USER setrole={setrole} />}
      {status?.role == assignRole[2] && <ADMIN />}
      {status?.role == assignRole[3] && <COADMIN />}
      {status?.role == assignRole[4] && <DEVELOPER />}
      {status?.role == assignRole[5] && <EMPLOYEE />}
      {status?.role == assignRole[6] && <GENERAlPAGE />}
      {status?.role == assignRole[7] && <ProcessingScreen />}
    </>
  );
}

export default App;
