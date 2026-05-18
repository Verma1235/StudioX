import { Icons } from "../../svg/Icons";
import { FaTimes } from "react-icons/fa";
const FloatContainer = ({ children ,FloatContainerState,toggleFloatContainer}) => {
  return (
    <>
      {/* FULL SCREEN OVERLAY */}
      <div
        className="
          fixed
          inset-0
          z-[5000]
          bg-black/50
          backdrop-blur-md
          flex
          items-center
          justify-center
          p-2
          sm:p-4
          md:p-6
          xl:p-8
        "
      >
        {/* MODAL CONTAINER */}
        <div
          className="
            relative
            w-full
            h-full
            max-w-[1600px]
            max-h-[950px]
            rounded-[32px]
            overflow-hidden
            border
            border-white/10
            bg-gradient-to-br
            from-[#050505f5]
            via-[#140b16f4]
            to-[#5e3158ee]
            shadow-[0_20px_80px_rgba(0,0,0,0.55)]
            flex
            flex-col
          "
        >
          {/* TOP GLOW */}
          <div
            className="
              absolute
              top-[-120px]
              right-[-120px]
              w-[350px]
              h-[350px]
              rounded-full
              bg-pink-500/10
              blur-[100px]
              pointer-events-none
            "
          />

          {/* SIDE GLOW */}
          <div
            className="
              absolute
              bottom-[-150px]
              left-[-100px]
              w-[300px]
              h-[300px]
              rounded-full
              bg-purple-500/10
              blur-[100px]
              pointer-events-none
            "
          />

          {/* HEADER */}
          <div
            className="
              relative
              z-10
              h-[78px]
              min-h-[78px]
              px-5
              md:px-8
              border-b
              border-white/10
              flex
              items-center
              justify-between
              bg-white/[0.02]
              backdrop-blur-md
            "
          >
            {/* TITLE */}
            <div>
              <h2
                className="
                  text-white
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
                StudioX {FloatContainerState?.target}
              </h2>

              <p
                className="
                  text-white/35
                  text-xs
                  tracking-[4px]
                  uppercase
                  mt-1
                "
              >
                Cinematic Dashboard Panel
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/[0.05]
                border
                border-white/10
                flex
                items-center
                justify-center
                hover:bg-white/[0.08]
                hover:scale-105
                transition-all
                duration-300
                text-2xl
                text-white
              "
              onClick={()=>{
                toggleFloatContainer("");
              }}
            >
            <FaTimes/>
            </button>
          </div>

          {/* BODY */}
          <div
            className="
              relative
              z-10
              flex-1
              overflow-y-auto
              px-1
              md:p-4
              xl:p-6
              scrollbar-thin
              scrollbar-thumb-white/10
              scrollbar-track-transparent
            "
          >
            {children || (
              <div
                className="
                  w-full
                  h-full
                  min-h-[500px]
                  rounded-[28px]
                  border
                  border-white/5
                  bg-white/[0.03]
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  text-white/50
                  text-2xl
                  font-medium
                "
              >
                Full Screen Modal Content
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { FloatContainer };
