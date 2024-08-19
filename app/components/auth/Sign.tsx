"use client";
import React from "react";
import Image from "next/image";
import DashBoard from "../../constants/image.png";
import DarkModeDashboard from "../../constants/darkDashboard.png";
import LoginForm from "../../components/auth/startpage";
import { ArrowForward } from "../../constants/svgApplications";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";

const Login = () => {
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);

  return (
    <div className="flex justify-between w-full h-screen bg-[#F4F4F6] overflow-hidden  dark:bg-[#171717] transition-colors duration-700 ease">
      <div className="w-[30%] flex items-center justify-center  ">
        <LoginForm />
      </div>
      <div
        className={`flex flex-col justify-between w-[66%] h-[100%] pt-[3vw] gap-[2vw]`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mr-8">
            <div className="flex gap-1 items-center">
              <span className="w-[.46vw] h-[.46vw] rounded-full bg-[#0736C4]"></span>
              <p className="text-[0.93vw] leading-[2vh] font-bold text-[#0736C4] dark:text-white">
                What&apos;s New
              </p>
            </div>
            <p className="flex items-center text-[#0736C4] dark:text-white text-[0.72vw] font-medium leading-[1.5vh]">
              View all changes <ArrowForward />
            </p>
          </div>

          <p className="flex pt-3 dark:text-white text-[1.8vw] font-bold leading-[3.92vh]">
            Discover the New Torus 9
          </p>
          <p className="text-[0.93vw] leading-[2.31vh] w-[75%] mt-4 text-black/50 dark:text-[#FFFFFF]/50">
            Experience the all new Torus9 with an enhanced UI Intuitive
            appflow,newscreens a refreshed home and our newbrand new marketplace
            and templates Log in into Explore the nextlevel of productivity and
            innovations
          </p>
        </div>
        <Image
          className="w-[100%] mr-auto rounded-tl-[3.5%]  "
          src={isDarkMode ? DarkModeDashboard : DashBoard}
          alt="bankmaster"
        />
      </div>
    </div>
  );
};

export default Login;
