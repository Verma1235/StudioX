import { Icons } from "../../svg/Icons";
import { logout } from "../dashboardComponents/stateController/logoutController";

const Sidemenu = ({ sidemenuflag, setrole }) => {
  return (
    <>
      <div
        className={`bg-inherit h-[calc(100%-50px)] w-[250px] z-[100] ${sidemenuflag ? "translate-x-[-250px] xl:translate-x-[-350px]" : "translate-x-0"}  xl:w-[350px]  mt-1 transition-all duration-500 ease-in-out fixed left-0 backdrop-blur-[1.5px] rounded shadow flex flex-col justify-start items-center py-2 gap-2`}
      >
        {/* <Icons icon="menuBtn" color="black"/> */}
        <button
          className="w-[95%] h-[40px] p-2 bg-[#00ffc34d] text-pink-950  hover:text-white font-semibold hover:bg-gray-700 rounded "
          onClick={() => {
            logout(setrole);
          }}
        >
          {" "}
          Logout{" "}
        </button>
        z
        <button
          className="w-[95%] h-[40px] p-2 bg-[#b7ff004d] text-pink-950  hover:text-white font-semibold hover:bg-gray-700 rounded "
          onClick={() => {
            alert("working ");
          }}
        >
          Dashboard
        </button>
      </div>
    </>
  );
};

export default Sidemenu;
