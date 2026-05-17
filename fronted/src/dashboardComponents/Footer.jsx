import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="
            mt-20
            border-t
            border-white/10
            bg-gradient-to-r
            from-[#000000cc]
            to-[#78406999]
            backdrop-blur-md
            
          "
    >
      <div
        className="
              px-6
              md:px-16
              py-10
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-6
            "
      >
        <div>
          <h2 className="text-3xl font-bold text-white">StudioX</h2>

          <p className="text-white/60 mt-2">
            Luxury Cinematic Photography Experience
          </p>
          <p className="text-white/60 mt-2">
            &copy; copyright 2026 || Developer Dinesh Verma || Powered by TechQv
            Team
          </p>
        </div>

        {/* SOCIAL */}
        <div className="flex gap-6 text-xl text-white">
          <FaInstagram className="cursor-pointer hover:text-pink-300 transition" />

          <FaFacebook className="cursor-pointer hover:text-blue-300 transition" />

          <FaTwitter className="cursor-pointer hover:text-cyan-300 transition" />

          <FaEnvelope className="cursor-pointer hover:text-yellow-300 transition" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
