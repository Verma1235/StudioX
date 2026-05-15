import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {
  const [cData, setCData] = useState({});

  useEffect(() => {
    // Define the async function INSIDE the effect
    const loadData = async () => {
      try {
        // Use import.meta.env for Vite
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_DATA_URL}/`,
        );

        console.log("data get:", result.data);

        // Set the state to the actual data array/object
        setCData(result.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    loadData();
  }, []); // Runs once on mount

  return cData;
};

const svgIconsName = [
  "users",
  "dashboard",
  "ticket",
  "blocked",
  "x",
  "AI",
  "send",
  "verified",
  "leftToggle",
  "rightToggle",
  "menuBtn",
];

export { useUserData, svgIconsName };
