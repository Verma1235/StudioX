import { useEffect, useState } from "react";
import { Logout } from "../dashboardComponents/stateController/logoutController";
import ApiController from "../apidata/ApiController";

const svgIconsName = {
  users: "users",
  dashboard: "dashboard",
  ticket: "ticket",
  blocked: "blocked",
  x: "x",
  AI: "AI",
  send: "send",
  verified: "verified",
  leftToggle: "leftToggle",
  rightToggle: "rightToggle",
  menuBtn: "menuBtn",
  power: "power",
  about: "about",
  setting: "setting",
  current: "current",
  privacy: "privacy",
  tool: "tool",
  users2: "users2",
  bell: "bell",
};

const defaultMenuItems = [
  {
    optionid: 1,
    name: "Login/Signup",
    event: "onClick",
    action: "login",
    iconname: svgIconsName["users"],
    iconclr: "green",
    scale: 0.8,
  },
  {
    optionid: 2,
    name: "About us",
    event: "onClick",
    action: "about",
    iconname: svgIconsName["about"],
    iconclr: "blue",
    scale: 0.8,
  },
  {
    action: "home",
    event: "onClick",
    iconclr: "orange",
    iconname: "home",
    name: "Home",
    optionid: 3,
    role: "user",
    scale: 0.8,
    show: 2,
  },
];

const api = new ApiController();

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState(defaultMenuItems);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await api.getRequest("/alloptions");

        console.log(data);

        setMenuItems(data.data);
      } catch (err) {
        console.log(err);
        setMenuItems(defaultMenuItems);
      }
    };

    fetchOptions();
  }, []);

  const handlers = {
    login: (toggleSideBtn, setrole, toggleFloatContainer) => {
      setrole(0);
      toggleSideBtn();
    },
    dashboard: (toggleSideBtn, setrole, toggleFloatContainer) => {
      setrole(1);
      toggleSideBtn();
    },
    setting: (toggleSideBtn, setrole, toggleFloatContainer) => {
      toggleFloatContainer("Settings");
    },
    logout: (toggleSideBtn, setrole, toggleFloatContainer) => {
      Logout(setrole);
      toggleSideBtn();
    },
    about: (toggleSideBtn, setrole, toggleFloatContainer) => {
      toggleFloatContainer("About us");
    },
    myprofile: (toggleSideBtn, setrole, toggleFloatContainer) => {
      toggleFloatContainer("My Profile");
    },
    home: (toggleSideBtn, setrole, toggleFloatContainer) => {
      setrole(6);
      toggleSideBtn();
    },
  };

  return { menuItems, handlers };
};
