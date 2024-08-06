// "use client";
// import { useEffect, useState } from "react";
// import { deleteCookie, getCookie, setCookie } from "./cookiemgmt";

// export function useDarkMode() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     if (getCookie("isDarkMode") === "true") {
//       document.body.classList.add("dark");
//       setIsDarkMode(true);
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     if (isDarkMode) {
//       document.body.classList.remove("dark");
//       deleteCookie("isDarkMode");
//     } else {
//       document.body.classList.add("dark");
//       setCookie("isDarkMode", "true");
//     }
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   return { isDarkMode, toggleDarkMode };
// }
