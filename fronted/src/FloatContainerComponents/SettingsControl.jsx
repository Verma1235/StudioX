import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApiController from "../apidata/ApiController";
import { Toast } from "../dashboardComponents/ToastContainer";
import {
  FaUserShield,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaShieldAlt,
  FaComments,
} from "react-icons/fa";

const SettingsControl = () => {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState("auth");

  // API initial database response tracking fallback data
  const databasePayload = {
    success: true,
    message: "settings fetched successfully from database ",
    data: [
      {
        settings_id: 1,
        login: 0,
        logout: 0,
        signup: 0,
        user_login: 0,
        employee_login: 0,
        admin_login: 0,
        coadmin_login: 0,
        developer_login: 0,
        warning_msg: 0,
        sms_allow: 0,
        notificaton_allow: 0,
        socketio_connection: 0,
      },
    ],
  };

  // State initialization extracting directly from your "data[0]" structure
  const [settings, setSettings] = useState(databasePayload.data[0]);

  // Fetch application status rules on load
  useEffect(() => {
    try {
      const api = new ApiController();
      const fetchSettings = async () => {
        const data = await api.getRequest("/settings");
        if (!data || !data.data || data.data.length === 0) {
          setSettings(databasePayload.data[0]);
          Toast("Error occurred in fetching settings !!", "i", 2000);
          return;
        }
        setSettings(data.data[0]);
        console.log("Loaded Settings:", data.data[0]);
      };
      fetchSettings();
    } catch (error) {
      console.error(error);
      Toast("Error occurred in Studiox global settings handle", "w", 3000);
    }
  }, []);

  // Handler to toggle switch fields seamlessly between 0 and 1
  const handleToggle = (fieldName) => {
    setSettings((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] === 1 ? 0 : 1,
    }));
  };

  // Handle Form Submission via In-Place PUT request
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop native page reload routing
    console.log("Sending Updated Settings Array:", settings);

    try {
      const api = new ApiController();
      // CLEAN FIX: Dispatches payload securely via putRequest channel
      const updatesetting = async () => {
        const response = await api.putRequest("/saveSettings", settings);
         
        if (!response) {
          Toast("Error in saving settings", "i", 2000);
          return;
        }
        console.log(response)
        Toast(response?.message || "Successfully updated settings !!", "s", 2000);
      };
      updatesetting();
      
    } catch (error) {
      console.error("Submission Error:", error);
      Toast("Unexpected error in saving settings !!", "e", 3000);
    }
  };

  // Framer Motion Animation Settings
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const menuItems = [
    { id: "auth", label: "Authentication Systems", icon: <FaShieldAlt /> },
    { id: "roles", label: "Portal Access Roles", icon: <FaUserShield /> },
    { id: "comms", label: "Alerts & Notifications", icon: <FaComments /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-1">
      {/* SECTION HEADER */}
      <div className="mb-10">
        <p className="text-pink-300 uppercase tracking-[4px] text-sm">
          System Control Panel
        </p>
        {/* <h2 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          Database Global Rules
        </h2> */}
      </div>

      {/* MAIN CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* LEFT MENU - TABS CONTAINER */}
        <div className="lg:col-span-1 flex flex-col gap-3 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300
                ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-[#784069] to-[#d37bcf] text-white shadow-lg shadow-pink-500/20"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT - GLASSMORPHIC FORM PANEL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          key={activeTab}
          className="lg:col-span-3 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-10 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle Decorative Inner Light Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* TAB 1: AUTHENTICATION CONFIGURATION */}
            {activeTab === "auth" && (
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-pink-300">
                  <FaShieldAlt className="text-pink-300 text-xl" /> Gatekeeper
                  Actions
                </h3>

                {[
                  {
                    id: "login",
                    label: "Master Login Gateway",
                    desc: "Allow overall user authentication actions globally.",
                  },
                  {
                    id: "logout",
                    label: "Master Logout Routing",
                    desc: "Allow execution parameters for ending active sessions.",
                  },
                  {
                    id: "signup",
                    label: "Public New Registrations",
                    desc: "Enable or restrict public visitors from building new profiles.",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-white/90">
                        {field.label}
                      </h4>
                      <p className="text-sm text-white/50 mt-1">{field.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(field.id)}
                      className="text-4xl transition-colors duration-200 text-pink-400 focus:outline-none"
                    >
                      {settings[field.id] === 1 ? (
                        <FaToggleOn />
                      ) : (
                        <FaToggleOff className="text-white/30" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: PORTAL ROLES LOGINS */}
            {activeTab === "roles" && (
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-pink-300">
                  <FaUserShield className="text-pink-300 text-xl" /> Specific
                  Identity Routing
                </h3>

                {[
                  { id: "user_login", label: "Client/User Access" },
                  { id: "employee_login", label: "Employee Team Access" },
                  { id: "admin_login", label: "Master Admin Entrance" },
                  { id: "coadmin_login", label: "Co-Admin Assistance Gateway" },
                  {
                    id: "developer_login",
                    label: "Developer Configuration Root",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-white/90">
                        {field.label}
                      </h4>
                      <p className="text-sm text-white/50 mt-1">
                        Status database rule flag parameter settings state.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(field.id)}
                      className="text-4xl transition-colors duration-200 text-pink-400 focus:outline-none"
                    >
                      {settings[field.id] === 1 ? (
                        <FaToggleOn />
                      ) : (
                        <FaToggleOff className="text-white/30" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: ALERTS & REAL-TIME CONNECTIONS */}
            {activeTab === "comms" && (
              <div className="space-y-5">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-pink-300">
                  <FaComments className="text-pink-300 text-xl" /> Communication
                  Engines
                </h3>

                {[
                  {
                    id: "sms_allow",
                    label: "SMS Transaction Gateway",
                    desc: "Allow sending text messages directly to devices via standard API pipeline.",
                  },
                  {
                    id: "notificaton_allow",
                    label: "Global Push Notifications",
                    desc: "Dispatch real-time UI/UX app notification bubbles over layouts.",
                  },
                  {
                    id: "socketio_connection",
                    label: "Socket.io WebSockets Engine",
                    desc: "Maintains alive low-latency persistent handshake loops for chats.",
                  },
                  {
                    id: "warning_msg",
                    label: "System Threat & Warning Alerts",
                    desc: "Broadcast immediate layout restrictions or server warning messages.",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-medium text-white/90">
                        {field.label}
                      </h4>
                      <p className="text-sm text-white/50 mt-1">{field.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggle(field.id)}
                      className="text-4xl transition-colors duration-200 text-pink-400 focus:outline-none"
                    >
                      {settings[field.id] === 1 ? (
                        <FaToggleOn />
                      ) : (
                        <FaToggleOff className="text-white/30" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* FORM FOOTER ACTION BAR */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setSettings(databasePayload.data[0])}
                className="px-6 py-3.5 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                Reset
              </button>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#784069] to-[#d37bcf] text-sm font-semibold tracking-wide text-white hover:opacity-90 active:scale-95 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-pink-500/10"
              >
                <FaSave />
                Update
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsControl;
