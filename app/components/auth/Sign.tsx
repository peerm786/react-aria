"use client";
import React from "react";
import Image from "next/image";
import DashBoard from "../../constants/image.png";
import DarkModeDashboard from "../../constants/darkDashboard.png";
import { useDarkMode } from "../../../lib/utils/useDarkmode";
import LoginForm from "../../components/auth/startpage"
import { IoIosArrowForward } from "react-icons/io";
import { IoToggleSharp } from "react-icons/io5";
import { getCookie } from "../../../lib/utils/cookiemgmt";

const Login = () => {

    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className="flex justify-between w-full h-screen bg-[#F4F4F6] overflow-hidden  dark:bg-[#171717] transition-colors duration-700 ease">

            <div className="w-[30%] flex items-center justify-center  ">
                <LoginForm
                    isDarkMode={isDarkMode}
                />
            </div>
            <div
                className={`flex flex-col justify-between w-[66%] h-[100%] `}>
                <div className="flex flex-col mt-[5%]  ">

                    <div className="flex items-center justify-between mr-8">

                        <p className="text-2xl font-bold text-blue-500 dark:text-white mb-3">What's new</p>
                        <p className="text-blue-400  dark:text-white text-sm flex items-center">
                            View all changes
                            <IoIosArrowForward className="ml-1" />
                        </p>
                    </div>
                    <IoToggleSharp onClick={toggleDarkMode} className="dark:text-white" />

                    <p className="text-black dark:text-white text-2xl  font-bold  ">
                        Discover the New Torus 9
                    </p>
                    <p className="text-sm mt-4 dark:text-[#FFFFFF] ">
                        Experience the all new Torus9 with an enhanced UI Intuitive appflow,newscreens
                        a refreshed home and our newbrand new marketplace and templates Log in into
                        Explore the nextlevel of productivity and innovations
                    </p>

                </div>
                <Image
                    className="w-[100%] h-[65vh] mr-auto rounded-tl-[3.5%]  "
                    src={isDarkMode ? DarkModeDashboard : DashBoard}
                    alt="bankmaster"
                />
            </div>
        </div>
    );
};

export default Login;
