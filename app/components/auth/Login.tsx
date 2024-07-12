"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "react-aria-components";
import LoginForm from "./loginform";
import { LandingPageLogo } from "../../constants/svgApplications";
import DashBoardImage from "../../constants/Dashboard.jpg";
import { useDarkMode } from "../../../lib/utils/useDarkmode";

const Login = () => {
  const [page, setPage] = useState(1);
  const [Change, setChange] = useState(false);
  const { isDarkMode } = useDarkMode();

  const pageColors = ["#0736C4", "#00BFFF", "#13CC78", "#FFBE00"];

  useEffect(() => {
    if (!Change) {
      const interval = setInterval(() => {
        setPage((prev) =>
          prev >= Object.keys(pageColors).length ? 1 : prev + 1
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [Change]);

  const handleDotClick = (pageNumber: number) => {
    setPage(pageNumber);
    setChange(true);
    setTimeout(() => setChange(false), 2000);
  };
  const toggleDarkMode = () => {


    document.body.classList.toggle('dark');
  };

  return (
    <div className="flex justify-between w-full h-screen overflow-hidden">
      <div
        className={`flex flex-col justify-between w-[70%] h-[100%] dark:bg-slate-400 `}
        style={{ backgroundColor: pageColors[page - 1] }}
      >
        <div className="flex flex-col mt-[8%] ml-[10%] ">
          <h2 className="text-2xl text-white flex gap-1 mb-5">
            {" "}
            <LandingPageLogo /> TORUS
          </h2>
          <p className="text-2xl font-bold text-white mb-3 ">
            Track & Analyze <br /> with Dashboard
          </p>

          <p className="text-white  text-sm ">
            Dashboard view allows you to observe, assign, and monitor data.
          </p>
          <div className="text-white first:ml-0">
            {Object.keys(pageColors).map((key, index) => (
              <Button
                key={key}
                onPress={() => handleDotClick(parseInt(key))}
                className={`${index != 0 && "ml-3"
                  } bg-white focus:outline-none mt-5 rounded h-1 ${page - 1 === parseInt(key) ? " w-6 " : " w-1 "
                  }`}
              />
            ))}
          </div>
        </div>
        <Image
          className="w-[90%] h-[58vh] object-left-bottom bg-transparent ml-auto rounded-tl-[3.7%]  "
          src={DashBoardImage}
          alt="Dashboard"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center ">
        <LoginForm />
      </div>
      {/* <Button
        onPress={toggleDarkMode}
        className={`mt-4 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      >

      </Button> */}
    </div>
  );
};

export default Login;
