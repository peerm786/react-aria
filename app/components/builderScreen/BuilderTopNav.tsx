import React from "react";
import { Button, Separator } from "react-aria-components";
import { Avatars, Debugger, Preview, BuilderShareIcon, TorusLogo, BackwardIcon } from "../../constants/svgApplications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";

const BuilderTopNav = ({ showNodeData, setShowNodeData }: any) => {
    const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode)

    return (
        <nav
            aria-label="Navbar"
            className="w-full h-[6.38vh] bg-white flex flex-col justify-center items-center border border-[#000000]/15 dark:bg-[#1D1D1D] dark:text-[#FFFFFF] transition-colors duration-700 ease-in-out"
        >
            <div className="flex w-full h-full justify-between items-center">
                <div className="flex gap-[1.17vw]">
                    <div className="flex items-center dark:bg-[#1D1D1D] dark:text-[#FFFFFF]">
                        <TorusLogo />
                        <h2 className="text-[1.25vw] leading-[2.66vh] font-medium">TORUS</h2>
                    </div>
                    {showNodeData ? <div>
                        <Button className={"outline-none "} onPress={() => setShowNodeData(null)}><BackwardIcon fill={isDarkMode ? "white" : "black"} /></Button>
                    </div> : null}
                </div>
                <div className="flex h-full gap-[0.87vw] items-center">
                    <Avatars />
                    <div className="flex h-[2.34vw]">
                        <Separator className="border border-black/35" orientation="vertical" />
                    </div>
                    <div className="flex ">
                        <Debugger fill={isDarkMode ? "white" : "black"} />
                        <Preview fill={isDarkMode ? "white" : "black"} />
                        <BuilderShareIcon fill={isDarkMode ? "white" : "black"} />
                    </div>
                    <div className="flex h-[2.34vw]">
                        <Separator className="border border-black/35" orientation="vertical" />
                    </div>
                    <Button className={"mr-[0.58vw] px-[1.46vw] py-[0.5vw] bg-[#0736C4] rounded-md text-white text-[0.72vw] leading-[2.22vh] font-medium outline-none"}>Publish</Button>
                </div>
            </div>
            <Separator />
        </nav>
    );
};

export default BuilderTopNav;