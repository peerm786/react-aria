import React from "react";
import { Button, Separator } from "react-aria-components";
import { Avatars, Debugger, Preview, BuilderShareIcon, TorusLogo } from "../../constants/svgApplications";

const BuilderTopNav = () => {
    return (
        <nav
            aria-label="Navbar"
            className="w-full h-[8%] flex flex-col justify-center items-center border border-[#000000]/15"
        >
            <div className="flex w-full h-full justify-between items-center">
                <div className="flex">
                    <TorusLogo />
                    <h2 className="font-semibold">TORUS</h2>
                </div>
                <div className="flex h-full gap-3 items-center">
                    <Avatars />
                    <div className="flex h-8">
                        <Separator className="border border-black/35" orientation="vertical" />
                    </div>
                    <div className="flex">
                        <Debugger />
                        <Preview />
                        <BuilderShareIcon />
                    </div>
                    <div className="flex h-8">
                        <Separator className="border border-black/35" orientation="vertical" />
                    </div>
                    <Button className={"mr-2 px-4 py-1 bg-[#0736C4] rounded-md text-white text-sm font-medium outline-none"}>Publish</Button>
                </div>
            </div>
            <Separator />
        </nav>
    );
};

export default BuilderTopNav;