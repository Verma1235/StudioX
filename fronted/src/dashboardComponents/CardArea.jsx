import { CardView } from "../cardComponents/CardView";
import { useCardData } from "../cards/cardData";

const CardArea = () => {
  const { cardData, userData } = useCardData();

  return (
    <>
      <div className="w-full p-4">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2
              className="
                text-white
                text-2xl
                font-bold
                tracking-wide
              "
            >
              Dashboard Analytics
            </h2>

            <p
              className="
                text-white/40
                text-sm
                mt-1
              "
            >
              Real-time platform overview
            </p>
          </div>

          <div
            className="
              px-4
              py-2

              rounded-2xl

              bg-white/[0.04]
              border
              border-white/10

              text-white/60
              text-sm
            "
          >
            Updated Now
          </div>

        </div>

        {/* CARDS */}
        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4

            gap-5
          "
        >
          {cardData.map((DATA, index) => (
            <CardView
              key={index}
              DATA={DATA}
              total={userData[`${DATA?.name}`]}
              blocked={userData[`BLOCKED_${DATA?.name}`]}
            />
          ))}
        </div>

      </div>
    </>
  );
};

export default CardArea;