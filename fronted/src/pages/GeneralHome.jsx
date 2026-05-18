import { useState } from "react";
import { motion } from "framer-motion";

import Headers from "../dashboardComponents/Header";
import Sidemenu from "../dashboardComponents/Sidemenu";
import Footer from "../dashboardComponents/Footer";
import { dev_pic, cemra_pic, handshak } from "../img/img";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaCamera,
  FaMapMarkerAlt,
  FaRegClock,
  FaEnvelope,
  FaArrowRight,
  FaFilm,
  FaMagic,
  FaBookOpen,
  FaBolt,
} from "react-icons/fa";

const GeneralHome = ({ setrole,toggleFloatContainer }) => {
  const [sidemenuflag, setSideMenuFlag] = useState(false);

  function toggleSideBtn() {
    setSideMenuFlag(!sidemenuflag);
  }

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-gradient-to-br
        from-[#000000]
        via-[#1a0f1f]
        to-[#784069]
        text-white
      "
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          opacity-20
          blur-[2px]
          scale-1
        "
        style={{
          backgroundImage: `url(${cemra_pic})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-3xl animate-float" />

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-3xl animate-floatSlow" />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <Headers toggleSideBtn={toggleSideBtn}toggleFloatContainer={toggleFloatContainer} />

        {/* SIDEMENU */}
        <Sidemenu sidemenuflag={sidemenuflag} setrole={setrole} toggleFloatContainer={toggleFloatContainer} />

        {/* =========================
            HERO SECTION
        ========================= */}
        <section
          className="
            min-h-screen
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            px-6
            md:px-16
            py-12
            gap-16
          "
        >
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <div
              className="
                inline-flex
                items-center
                gap-3
                px-5
                py-2
                rounded-full
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                mb-8
              "
            >
              <FaCamera className="text-pink-300" />

              <span className="text-sm tracking-wide">
                Premium Wedding Photography
              </span>
            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-bold
                leading-tight
              "
            >
              StudioX —
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-pink-300
                  via-white
                  to-purple-300
                  bg-clip-text
                  text-transparent
                "
              >
                Capture Timeless Memories
              </span>
            </h1>

            <p
              className="
                mt-8
                text-lg
                text-white/70
                leading-relaxed
                max-w-xl
              "
            >
              Luxury wedding and cinematic photography experiences crafted with
              emotions, elegance, and unforgettable storytelling.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">
              <button
                className="
                  px-7
                  py-4
                  rounded-2xl
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-md
                  hover:bg-white/20
                  transition-all
                  duration-300
                "
              >
                Explore Gallery
              </button>

              <button
                className="
                  px-7
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#784069]
                  to-[#d37bcf]
                  hover:opacity-90
                  transition-all
                  duration-300
                  flex
                  items-center
                  gap-3
                "
              >
                Book Session
                <FaArrowRight />
              </button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div
              className="
                relative
                w-[320px]
                h-[420px]
                md:w-[380px]
                md:h-[520px]
                rounded-[35px]
                overflow-hidden
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
              "
            >
              <img
                src={handshak}
                alt="preview"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* FLOATING CARD */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  p-5
                  rounded-3xl
                  bg-black/30
                  border
                  border-white/10
                  backdrop-blur-md
                "
              >
                <p className="text-white/60 text-sm">Featured Collection</p>

                <h3 className="text-2xl font-semibold mt-1">Wedding Stories</h3>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* =========================
            STUDIO DETAILS
        ========================= */}
        <section className="px-6 md:px-16 py-24">
          <div className="mb-14">
            <p className="text-pink-300 uppercase tracking-[4px] text-sm">
              Studio Details
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Crafted With Passion & Luxury
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCamera />,
                title: "Experience",
                value: "15+ Years",
                desc: "Professional cinematic storytelling.",
              },

              {
                icon: <FaMapMarkerAlt />,
                title: "Location",
                value: "Paris, France",
                desc: "Luxury destination wedding shoots.",
              },

              {
                icon: <FaRegClock />,
                title: "Availability",
                value: "24/7 Booking",
                desc: "Flexible premium booking available.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-[35px]
                  bg-white/5
                  border
                  border-white/10
                  backdrop-blur-md
                  p-8
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#784069]
                    to-[#d37bcf]
                    flex
                    items-center
                    justify-center
                    text-2xl
                    mb-6
                  "
                >
                  {item.icon}
                </div>

                <h3 className="text-3xl font-bold">{item.value}</h3>

                <p className="text-pink-300 mt-2">{item.title}</p>

                <p className="mt-5 text-white/65">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================
            ALBUM SECTION
        ========================= */}
        <section className="px-6 md:px-16 py-24">
          <div className="mb-14">
            <p className="text-pink-300 uppercase tracking-[4px] text-sm">
              Premium Albums
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Cinematic Wedding Collections
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{
                  y: -8,
                }}
                className="
                  relative
                  group
                  rounded-[35px]
                  overflow-hidden
                  border
                  border-white/10
                  bg-white/5
                "
              >
                <div className="h-[420px] overflow-hidden">
                  <img
                    src={dev_pic}
                    alt="album"
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-700
                    "
                  />
                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-pink-300 text-sm uppercase tracking-[3px]">
                    Wedding Collection
                  </p>

                  <h3 className="text-3xl font-bold mt-2">Royal Love Story</h3>

                  <button
                    className="
                      mt-5
                      px-5
                      py-3
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/10
                      backdrop-blur-md
                    "
                  >
                    View Album
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================
            OWNER SECTION
        ========================= */}
        <section className="px-6 md:px-16 py-24 flex flex-col gap-3">
          <div
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-md
              overflow-hidden
              grid
              lg:grid-cols-2
              gap-10
              p-1
              md:p-14
            "
          >
            {/* IMAGE */}
            <div className="relative">
              <div
                className="
                  h-[500px]
                  rounded-[35px]
                  overflow-hidden
                  border
                  border-white/10
                "
              >
                <img
                  src={dev_pic}
                  alt="owner"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* FLOATING CARD */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    rounded-3xl
                    bg-black/30
                    border
                    border-white/10
                    backdrop-blur-md
                    p-5
                  "
                >
                  <p className="text-white/60 text-sm">Founder/Developer</p>

                  <h3 className="text-2xl font-semibold mt-1">
                    Dinesh kumar Verma
                  </h3>
                </motion.div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center px-4 py-2">
              <p className="text-pink-300 uppercase tracking-[4px] text-sm">
                Meet The Founder/Developer
              </p>

              <h2 className="text-5xl font-bold mt-4">
                Capturing Emotions Through Cinematic Art
              </h2>

              <p className="mt-8 text-white/70 leading-[2]">
                Every wedding is a timeless story. Our mission is to create
                cinematic memories filled with emotions, elegance, and
                storytelling.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  {
                    number: "500+",
                    label: "Events",
                  },

                  {
                    number: "15+",
                    label: "Years",
                  },

                  {
                    number: "4.9★",
                    label: "Rating",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      py-5 
                      px-1
                      text-center
                      overflow-hidden
                    "
                  >
                    <h3 className="text-3xl font-bold">{item.number}</h3>

                    <p className="text-white/50 mt-2 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="
              rounded-[40px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-md
              overflow-hidden
              grid
              lg:grid-cols-2
              gap-10
              p-1
              md:p-14
            "
          >
            {/* IMAGE */}
            <div className="relative">
              <div
                className="
                  h-[500px]
                  rounded-[35px]
                  overflow-hidden
                  border
                  border-white/10
                "
              >
                <img
                  src={dev_pic}
                  alt="owner"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* FLOATING CARD */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    rounded-3xl
                    bg-black/30
                    border
                    border-white/10
                    backdrop-blur-md
                    p-5
                  "
                >
                  <p className="text-white/60 text-sm">Founder/Developer</p>

                  <h3 className="text-2xl font-semibold mt-1">
                    Dinesh kumar Verma
                  </h3>
                </motion.div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center px-4 py-2">
              <p className="text-pink-300 uppercase tracking-[4px] text-sm">
                Meet The Founder/Developer
              </p>

              <h2 className="text-5xl font-bold mt-4">
                Capturing Emotions Through Cinematic Art
              </h2>

              <p className="mt-8 text-white/70 leading-[2]">
                Every wedding is a timeless story. Our mission is to create
                cinematic memories filled with emotions, elegance, and
                storytelling.
              </p>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                {[
                  {
                    number: "500+",
                    label: "Events",
                  },

                  {
                    number: "15+",
                    label: "Years",
                  },

                  {
                    number: "4.9★",
                    label: "Rating",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      py-5 
                      px-1
                      text-center
                      overflow-hidden
                    "
                  >
                    <h3 className="text-3xl font-bold">{item.number}</h3>

                    <p className="text-white/50 mt-2 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            WHY CHOOSE US
        ========================= */}
        <section className="px-6 md:px-16 py-24">
          <div className="mb-14">
            <p className="text-pink-300 uppercase tracking-[4px] text-sm">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Luxury Cinematic Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaFilm />,
                description:
                  "  Premium cinematic storytelling with luxury visuals.",
                title: "Cinematic Editing",
              },
              {
                icon: <FaMagic />,
                description:
                  "  Premium cinematic storytelling with luxury visuals.",
                title: "AI Enhancement",
              },
              {
                icon: <FaBookOpen />,
                description:
                  "  Premium cinematic storytelling with luxury visuals.",
                title: "Luxury Albums",
              },
              {
                icon: <FaBolt />,
                description:
                  "  Premium cinematic storytelling with luxury visuals.",
                title: "Fast Delivery",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-[30px]
                  bg-white/5
                  border
                  border-white/10
                  p-8
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#784069]
                    to-[#d37bcf]
                    mb-6
                   text-2xl
                    flex justify-center items-center
                  "
                >
                  {feature?.icon}
                </div>

                <h3 className="text-2xl font-semibold">{feature?.title}</h3>

                <p className="mt-4 text-white/60">{feature?.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================
            TESTIMONIAL SECTION
        ========================= */}
        <section className="px-6 md:px-16 py-24">
          <div className="mb-14">
            <p className="text-pink-300 uppercase tracking-[4px] text-sm">
              Testimonials
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Loved By Couples Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophia & Liam",
                review:
                  "StudioX transformed our wedding into a cinematic masterpiece.",
              },

              {
                name: "Emma Watson",
                review: "Luxury experience and breathtaking cinematic quality.",
              },

              {
                name: "Noah Williams",
                review:
                  "Professional team with unforgettable storytelling skills.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-[35px]
                  border
                  border-white/10
                  bg-white/5
                  p-8
                "
              >
                <div className="flex gap-1 text-pink-300 text-xl mb-6">
                  ★★★★★
                </div>

                <p className="text-white/70 leading-[2]">"{item.review}"</p>

                <div className="mt-8">
                  <h4 className="text-2xl font-semibold">{item.name}</h4>

                  <p className="text-white/50 mt-1">Verified Client</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================
            FOOTER
        ========================= */}
      <Footer/>
      </div>
    </div>
  );
};

export default GeneralHome;
