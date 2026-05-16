import { Icons } from "../../svg/Icons";
import SideOptionsBtn from "./SideOptionsBtn";
import {useMenuItems} from "../eventhandllers/sideBtnEventHandllers"


const Sidemenu = ({ sidemenuflag, setrole }) => {
    const { menuItems, handlers } = useMenuItems();
  return (
    <>
      <div
        className={`bg-inherit h-[calc(100%-50px)] w-[250px] z-[100] ${sidemenuflag ? "translate-x-[-250px] xl:translate-x-[-350px]" : "translate-x-0"}  xl:w-[350px]  mt-1 transition-all duration-500 ease-in-out fixed left-0 backdrop-blur-[2.5px] rounded shadow flex flex-col justify-start items-center py-2 gap-2`}
      >
        {/* <Icons icon="menuBtn" color="black"/> */}

      {menuItems.map((val,key)=>{
       return <SideOptionsBtn key={key} menuItems={val} setrole={setrole} handlers={handlers} />
      })}


      </div>
    </>
  );
};

export default Sidemenu;
