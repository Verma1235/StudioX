import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Camera, ArrowRight } from "lucide-react";
// Using react-icons for brand-specific logos
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { Toast } from "../dashboardComponents/ToastContainer";
import FormController from "../dashboardComponents/FormHandeller/FormHandeller";
const Login_signup = ({setrole}) => {
  const [isLogin, setIsLogin] = useState(true);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const formTransition = {
    initial: { opacity: 0, x: isLogin ? -20 : 20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: isLogin ? 20 : -20, scale: 0.95 },
    transition: { duration: 0.4, ease: "easeInOut" },
  };
  // Toast("Please fill all fields", "s", 5000);

  // ################################## form handellers ###########################################
  let logininitialState = {
    email: "",
    password: "",
    rememberme: false,
  };
  const [logindata, setlogindata] = useState(logininitialState);

  const form1 = new FormController(logindata, setlogindata, logininitialState);

  let signupinitialState = {
    NAME: "",
    EMAIL: "",
    PASS: "",
    CONFPASS: "",
  };
  const [signupdata, setsignupdata] = useState(signupinitialState);

  const form2 = new FormController(
    signupdata,
    setsignupdata,
    signupinitialState,
  );

  // ####################################################### form handeller end ################################################

  return (
    <div className="fixed inset-0 h-screen w-screen bg-gradient-to-r from-[#ff9169bf] to-[#e04ef3bb] flex justify-center items-center p-4 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[1000px] h-auto bg-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/30 flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT SECTION: Brand Showcase */}
        <div className="hidden md:flex relative w-1/2 overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
            alt="Photography Studio"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10 p-12 flex flex-col h-full justify-end text-white"
          >
            <div className="mb-6 bg-white/20 w-fit p-4 rounded-2xl backdrop-blur-xl border border-white/40 shadow-xl">
              <Camera size={36} className="text-white" />
            </div>
            <h1 className="text-6xl font-black mb-3 tracking-tighter">
              StudioX
            </h1>
            <p className="text-2xl font-light text-orange-200 mb-4 italic">
              Capture Every Beautiful Moment
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-sm font-medium">
              Join our community of visual storytellers. Professional equipment,
              stunning locations, and cinematic results.
            </p>
          </motion.div>

          {/* Decorative Glow */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
        </div>

        {/* RIGHT SECTION: Auth Forms */}
        <div className="w-full md:w-1/2 h-full flex flex-col p-8 md:p-14 justify-center">
          {/* Header & Switcher */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <div className="h-1 w-12 bg-white rounded-full" />
            </div>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-semibold text-white/90 hover:text-white transition-all bg-white/10 px-4 py-2 rounded-full border border-white/20"
            >
              {isLogin ? "Register Account" : "Back to Login"}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={formTransition}
              className="space-y-5"
            >
              {/* FOR LOGIN FORM */}

              {isLogin && (
                <>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50"
                      size={20}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                      name="email"
                      onChange={form1.handleChange}
                      value={form1.values.email}
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50"
                      size={20}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                      name="password"
                      onChange={form1.handleChange}
                      value={form1.values.password}
                    />
                  </div>
                </>
              )}

              {/* ############# */}
              {/* FOR SIGNUP FORM */}
              {!isLogin && (
                <>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2  text-black/50"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-pink-950 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                      name="NAME"
                      onChange={form2.handleChange}
                      value={form2.values.NAME}
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50"
                      size={20}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                      name="EMAIL"
                      onChange={form2.handleChange}
                      value={form2.values.EMAIL}
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50"
                      size={20}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                      name="PASS"
                      onChange={form2.handleChange}
                      value={form2.values.PASS}
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50"
                      size={20}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                      name="CONFPASS"
                      onChange={form2.handleChange}
                      value={form2.values.CONFPASS}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl shadow-xl flex justify-center items-center gap-3 hover:bg-orange-50 transition-all text-lg mt-4"
                    onClick={async (e) => {
                      const data = await form2.handleSubmit(
                        `${import.meta.env.VITE_BACKEND_DATA_URL}/signup`,
                        e,
                      );

                      console.log(data);
                    }}
                  >
                    {"Create Account"}
                    <ArrowRight size={20} />
                  </motion.button>
                </>
              )}

              {isLogin && (
                <>
                  <div className="flex items-center justify-between text-sm text-white/70 px-1">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/20 bg-transparent accent-orange-500"
                        name="rememberme"
                        checked={form1.values.rememberme} // Use 'checked' instead of 'value'
                        onChange={form1.handleChange}
                      />
                      Remember me
                    </label>
                    <a
                      href="#"
                      className="hover:text-white hover:underline underline-offset-4"
                    >
                      Forgot?
                    </a>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl shadow-xl flex justify-center items-center gap-3 hover:bg-orange-50 transition-all text-lg mt-4"
                    onClick={async (e) => {
                      await form1.handleSubmit(
                        `${import.meta.env.VITE_BACKEND_DATA_URL}/login`,
                        e,{setrole}
                      );
                    }}
                  >
                    {"Sign In"}
                    <ArrowRight size={20} />
                  </motion.button>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Social Auth */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-transparent px-4 text-white/40 font-bold">
                Or connect with
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <SocialButton
              icon={<FcGoogle size={24} />}
              color="hover:bg-white/20"
            />
            <SocialButton
              icon={<FaFacebook size={24} className="text-[#1877F2]" />}
              color="hover:bg-[#1877F2]/50"
            />
            <SocialButton
              icon={<FaInstagram size={24} className="text-[#E4405F]" />}
              color="hover:bg-[#E4405F]/30 text-white"
            />
            <SocialButton
              icon={<FaGithub size={24} className="text-white" />}
              color="hover:bg-gray-900"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SocialButton = ({ icon, color }) => (
  <motion.button
    whileHover={{ scale: 1.1, y: -4 }}
    whileTap={{ scale: 0.9 }}
    className={`w-[50px] flex justify-center items-center py-3  rounded-lg bg-white/5 border border-white/10 text-white transition-all duration-300 backdrop-blur-md shadow-lg ${color}`}
  >
    {icon}
  </motion.button>
);

export default Login_signup;
