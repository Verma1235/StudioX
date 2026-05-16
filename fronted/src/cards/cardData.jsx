import { useState, useEffect } from "react";
import ApiController from "../apidata/ApiController";

const defaultCardData = [
  {
    cardid: 1,
    name: "CLIENTS",
    icon: "users",
    iconClr: "purple",
    iconBg: "pink",
    text: "basic information",
    event: "users",
    eventname: "onClick",
    db_table: "users",
  },
  {
    cardid: 8,
    name: "ADMINS",
    icon: "dashboard",
    iconClr: "blue",
    iconBg: "#a6eefda6",
    text: "basic information",
    event: "dashboard",
    eventname: "onClick",
    db_table: "users",
  },
  {
    cardid: 9,
    name: "EMPLOYEES",
    icon: "ticket",
    iconClr: "blue",
    iconBg: "#a6eefda6",
    text: "basic information",
    event: "ticket",
    eventname: "onClick",
    db_table: "users",
  },
  {
    cardid: 10,
    name: "USERS",
    icon: "blocked",
    iconClr: "red",
    iconBg: "#a6eefda6",
    text: "basic information",
    event: "blocked",
    eventname: "onClick",
    db_table: "users",
  },
  {
    cardid: 11,
    name: "COADMINS",
    icon: "blocked",
    iconClr: "purple",
    iconBg: "#a6eefda6",
    text: "basic information",
    event: "blocked",
    eventname: "onClick",
    db_table: "users",
  },
  {
    cardid: 13,
    name: "DEVELOPERS",
    icon: "users",
    iconClr: "purple",
    iconBg: "white",
    text: "no info. yet",
    event: "",
    eventname: "onClick",
    db_table: "users",
  },
];
const api = new ApiController();
const defaultuserData = [
  {
    CLIENTS: 0,
    ACTIVE_CLIENTS: 0,
    BLOCKED_CLIENTS: 0,
    USERS: 0,
    EMPLOYEES: 0,
    ADMINS: 0,
    COADMINS: 0,
    DEVELOPERS: 0,
    BLOCKED_USERS: 0,
    BLOCKED_EMPLOYEES: 0,
    BLOCKED_ADMINS: 0,
    BLOCKED_COADMINS: 0,
    BLOCKED_DEVELOPERS: 0,
  },
];
const useCardData = () => {
  const [cardData, setCardData] = useState(defaultCardData);
  const [userData, setUserData] = useState(defaultuserData[0]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await api.getRequest("/cardData");
        console.log(response);
        setCardData(response?.carddata || defaultCardData);
        setUserData(response?.data?.[0] || defaultuserData[0]);
      } catch (error) {
        console.log(error);
        setCardData(defaultCardData);
      }
    };
    fetchCardData();
  }, []);
  return { cardData, userData };
};

export { defaultCardData, useCardData };
