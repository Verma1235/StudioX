import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApiController from "../apidata/ApiController";
import { Toast } from "../dashboardComponents/ToastContainer";
import { FaUserShield, FaSave, FaShieldAlt, FaComments } from "react-icons/fa";

const SettingsControl = () => {
  const [activeTab, setActiveTab] = useState("auth");

  const databasePayload = {
    success: true,
    message: "settings fetched successfully from database",
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

  const [settings, setSettings] = useState(databasePayload.data[0]);

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
      };

      fetchSettings();
    } catch (error) {
      console.error(error);
      Toast("Error occurred in Studiox global settings handle", "w", 3000);
    }
  }, []);

  const handleToggle = (fieldName) => {
    setSettings((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] === 1 ? 0 : 1,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const api = new ApiController();

      const updateSetting = async () => {
        const response = await api.putRequest("/saveSettings", settings);

        if (!response) {
          Toast("Error in saving settings", "i", 2000);
          return;
        }

        Toast(
          response?.message || "Successfully updated settings !!",
          "s",
          2000,
        );
      };

      updateSetting();
    } catch (error) {
      console.error(error);
      Toast("Unexpected error in saving settings !!", "e", 3000);
    }
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const menuItems = [
    {
      id: "auth",
      label: "Authentication",
      icon: <FaShieldAlt />,
    },
    {
      id: "roles",
      label: "Access Roles",
      icon: <FaUserShield />,
    },
    {
      id: "comms",
      label: "Notifications",
      icon: <FaComments />,
    },
  ];

  const SettingRow = ({ title, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex-1 pr-4">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h4>

        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
          enabled ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-700"
        }`}
      >
        <span
          className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        >
          {enabled && (
            <svg
              className="h-3 w-3 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </span>
      </button>
    </div>
  );

  const authFields = [
    {
      id: "login",
      label: "Master Login Gateway",
      desc: "Enable or disable all login actions globally.",
    },
    {
      id: "logout",
      label: "Master Logout Routing",
      desc: "Allow users to terminate active sessions.",
    },
    {
      id: "signup",
      label: "Public Registration",
      desc: "Allow new users to create accounts.",
    },
  ];

  const roleFields = [
    {
      id: "user_login",
      label: "Client / User Access",
    },
    {
      id: "employee_login",
      label: "Employee Access",
    },
    {
      id: "admin_login",
      label: "Admin Access",
    },
    {
      id: "coadmin_login",
      label: "Co-Admin Access",
    },
    {
      id: "developer_login",
      label: "Developer Access",
    },
  ];

  const communicationFields = [
    {
      id: "sms_allow",
      label: "SMS Gateway",
      desc: "Enable SMS notifications and alerts.",
    },
    {
      id: "notificaton_allow",
      label: "Push Notifications",
      desc: "Enable application push notifications.",
    },
    {
      id: "socketio_connection",
      label: "Socket.io Connection",
      desc: "Enable real-time communication channels.",
    },
    {
      id: "warning_msg",
      label: "Warning Alerts",
      desc: "Display system-wide warnings and notices.",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-6 ">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          System Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage authentication, access permissions, and communication settings.
        </p>
      </div> */}

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-violet-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {activeTab === "auth" && "Authentication Settings"}

                {activeTab === "roles" && "Access Role Management"}

                {activeTab === "comms" && "Notifications & Communication"}
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Configure application behavior and access controls.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6">
              {activeTab === "auth" &&
                authFields.map((field) => (
                  <SettingRow
                    key={field.id}
                    title={field.label}
                    description={field.desc}
                    enabled={settings[field.id] === 1}
                    onToggle={() => handleToggle(field.id)}
                  />
                ))}

              {activeTab === "roles" &&
                roleFields.map((field) => (
                  <SettingRow
                    key={field.id}
                    title={field.label}
                    description="Control login access for this role."
                    enabled={settings[field.id] === 1}
                    onToggle={() => handleToggle(field.id)}
                  />
                ))}

              {activeTab === "comms" &&
                communicationFields.map((field) => (
                  <SettingRow
                    key={field.id}
                    title={field.label}
                    description={field.desc}
                    enabled={settings[field.id] === 1}
                    onToggle={() => handleToggle(field.id)}
                  />
                ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setSettings(databasePayload.data[0])}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Reset
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
              >
                <FaSave />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsControl;
