// SideOptionsBtn.jsx

import { Icons } from "../../svg/Icons";

const SideOptionsBtn = ({
  menuItems,
  setrole,
  handlers,
  toggleSideBtn,
  toggleFloatContainer
}) => {
  return (
    <>
      <button
        className="
          group

          relative

          w-full
          h-[58px]

          px-4

          rounded-2xl

          overflow-hidden

          flex
          items-center
          gap-4

          border
          border-white/5

          bg-white/[0.03]

          hover:bg-white/[0.06]
          hover:border-white/10

          transition-all
          duration-300

          hover:scale-[1.01]
          hover:-translate-y-[1px]
        "
        {...{
          [menuItems?.event]: () =>
            handlers[menuItems?.action](toggleSideBtn, setrole,toggleFloatContainer),
        }}
      >

        {/* HOVER GLOW */}
        <div
          className="
            absolute
            inset-0

            opacity-0
            group-hover:opacity-100

            transition-opacity
            duration-300

            bg-gradient-to-r
            from-pink-500/10
            via-purple-500/5
            to-transparent
          "
        />

        {/* ICON */}
        <div
          className="
            relative
            z-10

            w-10
            h-10

            rounded-xl

            bg-white/[0.05]

            flex
            items-center
            justify-center

            border
            border-white/5

            group-hover:bg-white/[0.08]

            transition-all
            duration-300
          "
        >
          <Icons
            icon={menuItems?.iconname}
            color={menuItems?.iconclr || "white"}
            scale={menuItems?.scale || 1}
          />
        </div>

        {/* TEXT */}
        <div
          className="
            relative
            z-10

            flex
            flex-col
            items-start
          "
        >
          <span
            className="
              text-white
              font-semibold
              text-sm
              tracking-wide
            "
          >
            {menuItems?.name}
          </span>

          <span
            className="
              text-white/35
              text-[11px]
            "
          >
            Dashboard Section
          </span>
        </div>

      </button>
    </>
  );
};

export default SideOptionsBtn;