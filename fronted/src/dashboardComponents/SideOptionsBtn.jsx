import { Icons } from "../../svg/Icons";
// import { handlers } from "../eventhandllers/sideBtnEventHandllers";

const SideOptionsBtn = ({ menuItems, setrole,handlers }) => {
  return (
    <>
      <button
        className={`w-[95%] h-[35px] px-2    hover:bg-slate-100 font-extrabold  rounded flex justify-start items-center gap-5`}
        style={{ color: menuItems?.iconclr }}

        {...{
          [menuItems?.event]: () => handlers[menuItems?.action](setrole),
        }}
      >
        <Icons
          icon={menuItems?.iconname}
          color={menuItems?.iconclr}
          scale={menuItems?.scale}
        />{" "}
        {menuItems?.name}
      </button>
    </>
  );
};

export default SideOptionsBtn;
