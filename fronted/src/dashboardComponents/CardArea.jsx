import { CardView } from "../cardComponents/CardView";
import { defaultCardData, useCardData } from "../cards/cardData";
const CardArea = () => {
  const { cardData, userData } = useCardData();
  return (
    <>
      <div className="w-[100%] h-fit p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
          {cardData.map((DATA, index) => (
              <CardView key={index}  DATA={DATA} total={userData[`${DATA?.name}`]} blocked={userData[`BLOCKED_${DATA?.name}`]} />
            ))}
        </div>
      </div>
    </>
  );
};

export default CardArea;
