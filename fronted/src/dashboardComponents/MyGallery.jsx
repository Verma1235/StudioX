import { dev_pic } from "../img/img";

const MyGallery = () => {
  const images = Array(24).fill(dev_pic);

  return (
    <>
      <div
        className="
          w-full

          rounded-3xl

          p-5

          border
          border-white/10

          bg-gradient-to-b
          from-white/[0.04]
          to-white/[0.02]

          backdrop-blur-md
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2
              className="
                text-white
                text-2xl
                font-bold
              "
            >
              Recent Gallery
            </h2>

            <p
              className="
                text-white/40
                text-sm
                mt-1
              "
            >
              100 recently processed photos
            </p>
          </div>

          <button
            className="
              px-4
              py-2

              rounded-2xl

              bg-white/[0.04]

              border
              border-white/10

              text-white/70
              text-sm

              hover:bg-white/[0.08]

              transition-all
              duration-300
            "
          >
            View All
          </button>

        </div>

        {/* GRID */}
        <div
          className="
            grid

            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            2xl:grid-cols-7

            gap-4
          "
        >

          {images.map((img, index) => (
            <div
              key={index}
              className="
                group

                relative

                overflow-hidden

                rounded-2xl

                aspect-square

                border
                border-white/5

                bg-white/[0.03]
              "
            >

              <img
                src={img}
                alt="gallery"
                className="
                  w-full
                  h-full

                  object-cover

                  transition-all
                  duration-500

                  group-hover:scale-110
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/60
                  via-transparent
                  to-transparent

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-300
                "
              />

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default MyGallery;