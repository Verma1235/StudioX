import CardArea from "../dashboardComponents/CardArea";
import MyGallery from "../dashboardComponents/MyGallery";
import LiveNotification from "./Notification/LiveActivity"
const MainContentArea = () => {
  return (
    <>
      <div className="fixed h-[calc(100%-50px)] w-screen  z-[1] top-[50px] left-0 px-2 py-1 flex flex-col gap-y-2 overflow-y-scroll ">
        <div
          className={`w-[100%] h-fit grid   sm:grid-cols-[65%_35%]  md:grid-cols-[55%_45%]   gap-x-1 gap-y-2`}>
          <CardArea />
          <LiveNotification/>
        </div>
          <div
          className={`w-[100%] h-fit`}>
          <MyGallery />
        </div>
      </div>
    </>
  );
};

export default MainContentArea;
