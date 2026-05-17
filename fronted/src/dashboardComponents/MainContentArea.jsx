import CardArea from "../dashboardComponents/CardArea";
import MyGallery from "../dashboardComponents/MyGallery";
import LiveNotification from "./Notification/LiveActivity";
import Footer from "../dashboardComponents/Footer";
const MainContentArea = () => {
  return (
    <>
      {/* MAIN CONTENT WRAPPER */}
      <main
        className="
          fixed
          top-[72px]
          left-0

          z-[1]

          h-[calc(100vh-72px)]
          w-full

          overflow-y-auto
          overflow-x-hidden

          px-3
          md:px-5
          xl:px-6

          py-4

          bg-gradient-to-br
          from-[#050505]
          via-[#10080f]
          to-[#1b0d18]

          scrollbar-thin
          scrollbar-thumb-white/10
          scrollbar-track-transparent
        "
      >
        {/* BACKGROUND GLOW */}
        <div
          className="
            pointer-events-none

            fixed
            top-0
            right-0

            w-[500px]
            h-[500px]

            rounded-full

            bg-purple-500/10

            blur-[120px]

            z-0
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10

            flex
            flex-col

            gap-5
          "
        >
          {/* TOP GRID */}
          <section
            className="
              grid

              grid-cols-1
              lg:grid-cols-[1.2fr_0.8fr]

              gap-5

              items-start
            "
          >
            {/* LEFT SIDE */}
            <div
              className="
                rounded-3xl

                border
                border-white/5

                bg-white/[0.02]

                backdrop-blur-xl

                shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                overflow-hidden
              "
            >
              <CardArea />
            </div>

            {/* RIGHT SIDE */}
            <div
              className="
                rounded-3xl

                border
                border-white/5

                bg-white/[0.02]

                backdrop-blur-xl

                shadow-[0_10px_40px_rgba(0,0,0,0.35)]

                overflow-hidden
              "
            >
              <LiveNotification />
            </div>
          </section>

          {/* GALLERY SECTION */}
          <section
            className="
              rounded-3xl

              border
              border-white/5

              bg-white/[0.02]

              backdrop-blur-xl

              shadow-[0_10px_40px_rgba(0,0,0,0.35)]

              overflow-hidden
            "
          >
            <MyGallery />
          </section>
        </div>
           <Footer />
      </main>
   
    </>
  );
};

export default MainContentArea;
