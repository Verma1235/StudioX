import { Icons } from "../../svg/Icons";
const Header = ({toggleSideBtn}) => {
  return (
    <>
      <div className="h-[50px] w-[100%] bg-inherit px-4 py-1 flex justify-start items-center shadow">
        <div className="cursor-pointer" onClick={toggleSideBtn}>
          <Icons icon="menuBtn" color="black" />
        </div>
      </div>
    </>
  );
};

export default Header;
