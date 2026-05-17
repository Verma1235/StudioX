import BodyTemplates from "../generalComponents/BodyTemplates";
import { useState } from "react";
const User = ({ setrole,toggleFloatContainer }) => {

  return (
    <>
  
      <BodyTemplates setrole={setrole} toggleFloatContainer={toggleFloatContainer} />
    </>
  );
};

export default User;
