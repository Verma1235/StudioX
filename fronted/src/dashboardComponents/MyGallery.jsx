import { dev_pic } from "../img/img";
const MyGallery = () => {
  return (
    <>
      <div className="w-[100%] h-fit  py-2 rounded">
        <div className="bg-[#eb8ff5b6] py-2 px-3 w-[100%] sm:w-fit rounded">
          Recent (100) Photos
        </div>

        <div className="px-2 py-2 grid grid-cols-[repeat(4,1fr)] sm:grid-cols-[repeat(5,1fr)] md:grid-cols-[repeat(10,1fr)] xl:grid-cols[repeat(15,1fr)] gap-x-1 gap-y-1 ">
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
          <img src={dev_pic} className=" rounded" />
        </div>
      </div>
    </>
  );
};

export default MyGallery;
