import { Icons } from "../../svg/Icons";

const CardView = ({ DATA ,handlePopUpToggle}) => {
  const percentage =
    Number(DATA.data.percentage).toFixed(1) >= 100
      ? 100
      : Number(DATA.data.percentage).toFixed(1);
  const color = DATA?.iconClr || "#00d5ff";

  return (
    <>
      <div
        className={`w-[270px] h-[160px] sm:w-[200px] sm:h-[120px] bg-gradient-to-r from-[#bcf27e51] to-[#85e8b27f]  rounded-2xl flex overflow-hidden px-2 shadow-lg border border-[${DATA.iconClr}]/60 transition-transform duration-300 hover:scale-108 hover:z-50 hover:bg-amber-200 lg:scale-90 xl:scale-100`}
      >
        {/* Left Side: Icon and Stats */}
        <div className="w-3/5 h-full p-3 flex flex-col justify-between">
          <div
            className={`w-10 h-10 bg-[${DATA?.iconBg||"#00d5ff"}] rounded-lg flex items-center justify-center`}
          >
            <Icons icon={DATA?.icon} color={DATA?.iconClr||"#00d5ff"} />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-slate-900 leading-none">
              {DATA.data.total >= 1000 ? DATA.data.total : DATA.data.total}
            </h2>
            <div className="text-sm text-amber-900 font-mono mt-1">
              {DATA.name}
            </div>
          </div>
        </div>

        {/* Right Side: Options and Progress */}
        <div className="w-2/5 h-full flex flex-col">
          {/* Dots Icon Container */}
          <div className="w-full h-[30%] flex justify-end items-center pr-1 ">
            <svg
            onClick={handlePopUpToggle}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer opacity-70 hover:opacity-100"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </div>

          {/* Progress Ring Container */}
          <div className="w-full h-[50%] flex items-center justify-center relative  ">
            {/* Percentage Text: Centered perfectly regardless of size */}
            <span className="absolute z-10 text-[12px] font-bold text-slate-800">
              {percentage}%
            </span>

            {/* The Animated Ring */}
            <div
              className="w-[60px] h-[60px] rounded-full"
              style={{
                background: `conic-gradient(${color} ${percentage}%, #e2e8f0 0)`,
                WebkitMask:
                  "radial-gradient(farthest-side, transparent 75%, white 0)",
                mask: "radial-gradient(farthest-side, transparent 75%, white 0)",
                filter: `drop-shadow(0 0 5px ${color}80)`,
                transition: `all 0.5s ease-in-out`,
              }}
            />
          </div>
          <div className="w-full h-[20%] text-center ">
            <div className="flex items-center justify-center  gap-y-0 h-full w-full">
              <div className={`font-bold text-[10px] p-2 text-[${DATA.iconClr}] leading-none`}>
               {DATA.data.active}/{DATA.data.total >= 1000 ? DATA.data.total : DATA.data.total}
              </div>
              <div className={`text-[10px] text-[${DATA.iconBg}] font-mono mt-1`}>Active</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardView };
