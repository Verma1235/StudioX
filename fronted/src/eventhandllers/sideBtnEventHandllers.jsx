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
    name: "Logi/Signup",
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
    login: (setrole) => {
      let res = confirm("Are you sure? Go to login window !!");
      if (!res) {
        return;
      }
      setrole(0);
    },
    dashboard: () => alert("Dashboard"),
    settings: () => alert("Settings"),
    logout: (setrole) => Logout(setrole),
    about: () => alert("About"),
    myprofile: () => alert("My profile"),
  };

  return { menuItems, handlers };
};
