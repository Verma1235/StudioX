import { Icons } from "../../svg/Icons";
const Header = ({ toggleSideBtn }) => {
  return (
    <>
      <div className="h-[50px] w-[100%] bg-inherit px-4 py-1 flex justify-between items-center shadow">
        <div className="cursor-pointer" onClick={toggleSideBtn}>
          <Icons icon="menuBtn" color="black" />
        </div>
        <div className="flex justify-start items-center gap-[10px] md:gap-[18px]">
          <div className="flex justify-start items-center">
            <Icons icon="bell" color="black" scale={1.2} />
            <sup className="rounded-full bg-red-500 text-red-900 font-semibold">
              0
            </sup>
          </div>
          <div className="cursor-pointer " onClick={toggleSideBtn}>
            <Icons icon="usercircle" color="black" scale={1.2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
