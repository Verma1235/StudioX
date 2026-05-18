import { useState } from "react";

import Headers from "../dashboardComponents/Header";
import Sidemenu from "../dashboardComponents/Sidemenu";
import MainContentArea from "../dashboardComponents/MainContentArea";
import { FloatContainer } from "../dashboardComponents/FloatContainer";
const BodyTemplates = ({ setrole,toggleFloatContainer }) => {
  const [sidemenuflag, setSideMenuFlag] = useState(true);


  function toggleSideBtn() {
    setSideMenuFlag(!sidemenuflag);
  }



  return (
    <>
    
    
      <div className="fixed left-0 top-0 h-screen w-screen  bg-gradient-to-r from-[#ff9169bf] to-[#e04ef3bb]  flex justify-center items-start md:items-center">
        <div className="h-[100vh] w-[100%] bg-[#ffffff22] rounded-xl shadow-lg shadow-red-400/50 overflow-hidden ">
          <Headers toggleSideBtn={toggleSideBtn} toggleFloatContainer={toggleFloatContainer} />
          <Sidemenu
            sidemenuflag={sidemenuflag}
            setrole={setrole}
            toggleSideBtn={toggleSideBtn}
            toggleFloatContainer={toggleFloatContainer}
          />
          <MainContentArea toggleFloatContainer={toggleFloatContainer} />
        </div>
      </div>

  
    </>
  );
};

export default BodyTemplates;
