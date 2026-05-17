import { Icons } from "../../svg/Icons";

const CardView = ({ DATA, total, blocked, handlePopUpToggle }) => {
  const active = Number(total) - Number(blocked);

  const percentage =
    Number(total) > 0
      ? (
          ((Number(total) - Number(blocked || 0)) * 100) /
          Number(total)
        ).toFixed(1)
      : "0.0";

  const color = DATA?.iconClr || "#00d5ff";

  return (
    <>
      <div
        className={`
          group
          relative
          w-full
          min-h-[190px]
          rounded-3xl
          overflow-hidden
          border
          border-white/10
          bg-gradient-to-br
          from-white/[0.08]
          to-white/[0.03]
          backdrop-blur-2xl
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          p-5
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-white/20
        `}
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-0
            right-0
            w-[120px]
            h-[120px]
            rounded-full
            blur-3xl
            opacity-20
            pointer-events-none"
          style={{
            background: color,
          }}
        >
          {" "}
        </div>

        {/* TOP */}
        <div className="flex items-start justify-between">
          {/* ICON */}
          <div
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              border
              border-white/10
              backdrop-blur-xl
            "
            style={{
              background: DATA?.iconBg || color,
            }}
          >
            <Icons
              icon={DATA?.icon}
              color={DATA?.iconClr || "#fff"}
              scale={1.2}
            />
          </div>

          {/* MENU */}
          <button
            onClick={handlePopUpToggle}
            data-cardid={DATA?.cardid}
            className="
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              bg-white/[0.04]
              hover:bg-white/[0.08]
              transition-all
              duration-300
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>

        {/* CENTER */}
        <div className="mt-6">
          <h2
            className="
              text-4xl
              font-bold
              text-white
              leading-none
            "
          >
            {total}
          </h2>

          <p
            className="
              text-white/50
              mt-2
              text-sm
              tracking-wide
            "
          >
            {DATA.name}
          </p>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 flex items-center justify-between">
          {/* ACTIVE */}
          <div>
            <div
              className="
                text-white
                font-semibold
                text-sm
              "
            >
              {active} Active
            </div>

            <div
              className="
                text-white/35
                text-xs
                mt-1
              "
            >
              Performance Status
            </div>
          </div>

          {/* PROGRESS RING */}
          <div className="relative">
            <span
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                text-[11px]
                font-bold
                text-white
              "
            >
              {percentage}%
            </span>

            <div
              className="
                w-[70px]
                h-[70px]
                rounded-full
              "
              style={{
                background: `conic-gradient(${color} ${percentage}%, rgba(255,255,255,0.08) 0)`,

                WebkitMask:
                  "radial-gradient(farthest-side, transparent 74%, white 0)",

                mask: "radial-gradient(farthest-side, transparent 74%, white 0)",

                filter: `drop-shadow(0 0 10px ${color}80)`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { CardView };
