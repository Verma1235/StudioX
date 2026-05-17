import { Icons } from "../../../svg/Icons";

const LiveActivity = () => {
  const activity = [
    {
      name: "Camera #12",
      status: "Motion Detected",
      time: "2 sec ago",
    },
    {
      name: "Lobby Entrance",
      status: "Face Recognized",
      time: "1 min ago",
    },
    {
      name: "Parking Zone",
      status: "Vehicle Detected",
      time: "4 min ago",
    },
  ];

  return (
    <>
      <div
        className="
          w-full

          min-h-[450px]
          max-h-[650px]

          overflow-y-auto

          rounded-3xl

          p-5

          border
          border-white/10

          bg-gradient-to-b
          from-white/[0.05]
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
                text-xl
                font-bold
              "
            >
              Live Activity
            </h2>

            <p
              className="
                text-white/40
                text-sm
                mt-1
              "
            >
              Real-time monitoring system
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2

              text-green-400
              text-sm
            "
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Active
          </div>

        </div>

        {/* ACTIVITIES */}
        <div className="flex flex-col gap-4">

          {activity.map((item, index) => (
            <div
              key={index}
              className="
                group

                flex
                items-center
                justify-between

                p-4

                rounded-2xl

                border
                border-white/5

                bg-white/[0.03]

                hover:bg-white/[0.05]

                transition-all
                duration-300
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-12
                    h-12

                    rounded-2xl

                    bg-gradient-to-br
                    from-pink-500
                    to-purple-600

                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icons icon="bell" color="white" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-white/40 text-sm">
                    {item.status}
                  </p>
                </div>

              </div>

              <div className="text-white/30 text-xs">
                {item.time}
              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
};

export default LiveActivity;