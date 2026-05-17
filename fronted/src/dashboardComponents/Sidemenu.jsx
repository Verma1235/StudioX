// Sidemenu.jsx

import { Icons } from "../../svg/Icons";
import SideOptionsBtn from "./SideOptionsBtn";
import { useMenuItems } from "../eventhandllers/sideBtnEventHandllers";

const Sidemenu = ({ sidemenuflag, setrole,toggleSideBtn,toggleFloatContainer}) => {
  const { menuItems, handlers } = useMenuItems();

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          top-[72px]
          left-0
          z-40

          h-[calc(100vh-72px)]
          w-[280px]
          xl:w-[340px]

          transition-all
          duration-500
          ease-in-out
          ${sidemenuflag ? "translate-x-[-100%]" : "translate-x-0"}
          px-3
          py-4
          flex
          flex-col
          gap-3
          border-r
          border-white/10
          bg-gradient-to-b
          from-[#070707ef]
          via-[#140b16f2]
          to-[#321526ef]
          backdrop-blur-md
          shadow-[0_10px_40px_rgba(0,0,0,0.45)]
        `}
        style={{
          transform: `${
            sidemenuflag ? "translate-x-[-100%]" : "translate-x-0"
          }`,
        }}
      >
        {/* TOP GLOW */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0

            h-[200px]

            bg-gradient-to-b
            from-pink-500/10
            to-transparent

            pointer-events-none
          "
        />

        {/* LOGO SECTION */}
        <div
          className="
            relative
            z-10

            w-full

            px-3
            pb-5
            mb-2

            border-b
            border-white/10
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                w-12
                h-12

                rounded-2xl

                bg-gradient-to-br
                from-pink-500
                to-purple-600

                flex
                items-center
                justify-center

                shadow-[0_10px_30px_rgba(192,108,191,0.35)]
              "
            >
              <Icons icon="AI" color="white" scale={1.2} />
            </div>

            <div>
              <h2
                className="
                  text-white
                  text-xl
                  font-bold
                  tracking-wide
                "
              >
                StudioX
              </h2>

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[3px]
                  text-white/40
                "
              >
                Creative Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* MENU ITEMS */}
        <div
          className="
            relative
            z-10

            flex
            flex-col
            gap-2

            w-full
          "
        >
          {menuItems.map((val, key) => {
            return (
              <SideOptionsBtn
                key={key}
                menuItems={val}
                setrole={setrole}
                handlers={handlers}
                toggleSideBtn={toggleSideBtn}
                toggleFloatContainer={toggleFloatContainer}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidemenu;
