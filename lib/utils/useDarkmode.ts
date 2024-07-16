"use client";
import { useState } from "react";
import { deleteCookie, setCookie } from "./cookiemgmt";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark");
      deleteCookie("isDarkMode");
    } else {
      document.body.classList.add("dark");
      setCookie("isDarkMode", "true");
    }
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
}
