import { useState } from "react";

import Headers from "../dashboardComponents/Header";
import Sidemenu from "../dashboardComponents/Sidemenu";
import MainContentArea from "../dashboardComponents/MainContentArea";
import { MessageContainer } from "../dashboardComponents/MessageContainer";
const BodyTemplates = ({setrole}) => {
  const [sidemenuflag, setSideMenuFlag] = useState(1);
  const [messageContainer,setmessageContainer]=useState(false);

  function toggleSideBtn() {
    setSideMenuFlag(!sidemenuflag);
  }

   function toggleMsgCont() {
    setmessageContainer(!messageContainer);
  }

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-screen  bg-gradient-to-r from-[#ff9169bf] to-[#e04ef3bb]  flex justify-center items-start md:items-center">
        <div className="h-[100vh] w-[100%] bg-[#ffffff22] rounded-xl shadow-lg shadow-red-400/50 overflow-hidden ">
          <Headers toggleSideBtn={toggleSideBtn} />
          <Sidemenu sidemenuflag={sidemenuflag} setrole={setrole}/>
          <MainContentArea />
        </div>
      </div>

      {messageContainer && (<MessageContainer />)}
    </>
  );
};

export default BodyTemplates;
