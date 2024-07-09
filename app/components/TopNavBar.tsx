import React from "react";
import { Input } from "react-aria-components";
import { BellIcon, SearchIcon } from "../constants/svgApplications";

const Topbar = () => {
    return (
        <nav
            aria-label="Navbar"
            className="flex w-full p-4"
        >
            <div className="flex w-[50%] justify-between">
                <h2 className="font-semibold">TORUS</h2>
                <div className="relative ">
                    <span className="absolute inset-y-0 left-0 flex items-center p-2 h-7 w-7">
                        <SearchIcon />
                    </span>
                    <Input
                        placeholder="Search"
                        className={`w-[180%] p-1 focus:outline-none focus:border-blue-400 border pl-6 text-sm font-medium rounded-sm`}
                    />
                </div>
            </div>
            <div className="flex w-[50%] justify-end">
                <BellIcon />
            </div>
        </nav>
    );
};

export default Topbar;