import {CardView} from "../cardComponents/CardView";
import {cardData} from "../dummydata/cardData"
const CardArea = () => {
  return (
    <>
      <div className="w-[100%] h-fit p-2">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
            {cardData.map((DATA, index) => (
              <CardView
                key={index}
                DATA={DATA}
                // handlePopUpToggle={handlePopUpToggle}
              />
            ))}
          </div>
        
        </div>
    </>
  );
};

export default CardArea;
