import { Icons } from "../../svg/Icons";

const Header = ({ toggleSideBtn }) => {
  return (
    <>
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-50

          h-[72px]
          w-full

          px-4
          md:px-8

          flex
          items-center
          justify-between

          border-b
          border-white/10

          bg-gradient-to-r
          from-[#000000d1]
          via-[#1b1020d8]
          to-[#784069c9]

          backdrop-blur-xl

          shadow-[0_8px_30px_rgba(0,0,0,0.25)]

          transition-all
          duration-300
        "
      >
        {/* BACKGROUND GLOW */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-pink-500/5
            via-transparent
            to-purple-500/10

            pointer-events-none
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10

            flex
            items-center
            justify-between

            w-full
          "
        >
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">
            {/* MENU BUTTON */}
            <button
              onClick={toggleSideBtn}
              className="
                w-11
                h-11

                rounded-2xl

                bg-white/5
                border
                border-white/10

                backdrop-blur-md

                flex
                items-center
                justify-center

                hover:bg-white/10
                hover:scale-105

                transition-all
                duration-300
              "
            >
              <Icons icon="menuBtn" color="white" />
            </button>

            {/* LOGO */}
            <div className="hidden sm:block">
              <h1
                className="
                  text-2xl
                  font-bold

                  bg-gradient-to-r
                  from-white
                  via-pink-200
                  to-purple-300

                  bg-clip-text
                  text-transparent
                "
              >
                StudioX
              </h1>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[4px]
                  text-white/40
                "
              >
                Cinematic Photography
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4 md:gap-5">
            {/* NOTIFICATION */}
            <div
              className="
                relative

                w-11
                h-11

                rounded-2xl

                bg-white/5
                border
                border-white/10

                backdrop-blur-md

                flex
                items-center
                justify-center

                hover:bg-white/10
                hover:scale-105

                transition-all
                duration-300

                cursor-pointer
              "
            >
              <Icons icon="bell" color="white" scale={1.15} />

              {/* NOTIFICATION BADGE */}
              <span
                className="
                  absolute
                  top-1
                  right-1

                  w-5
                  h-5

                  rounded-full

                  bg-gradient-to-r
                  from-pink-500
                  to-red-500

                  text-[10px]
                  font-bold
                  text-white

                  flex
                  items-center
                  justify-center

                  shadow-lg
                "
              >
                0
              </span>
            </div>

            {/* USER PROFILE */}
            <button
              onClick={toggleSideBtn}
              className="
                w-11
                h-11

                rounded-2xl

                bg-gradient-to-br
                from-[#784069]
                to-[#c06cbf]

                flex
                items-center
                justify-center

                shadow-[0_8px_25px_rgba(120,64,105,0.4)]

                hover:scale-105
                hover:opacity-90

                transition-all
                duration-300
              "
            >
              <Icons icon="usercircle" color="white" scale={1.15} />
            </button>
          </div>
        </div>
      </header>

      {/* HEADER SPACING */}
      <div className="h-[72px]" />
    </>
  );
};

export default Header;
