import React, { useState } from "react";
import {
    CallChatSvg,
    HomeSvg,
    LogoutSvg,
    QuestionSvg,
    ShopSvg,
    ThemeIcon,
    TorusLogo,
} from "../constants/svgApplications";
import { Button } from "react-aria-components";

const Sidebar = () => {
    const [fillIndex, setFillIndex] = useState(0);
    const actionIcons = [HomeSvg, ShopSvg, QuestionSvg, CallChatSvg];

    return (
        <aside
            aria-label="Sidebar"
            className="w-12 flex flex-col items-center justify-between h-screen bg-white border"
        >
            <section className="flex flex-col justify-center items-center gap-4">
                <section aria-label="Logo" className="p-2 mt-2">
                    <TorusLogo />
                </section>
                <section
                    aria-label="Actions"
                    className="w-12 flex flex-col items-center justify-center gap-3 mt-3"
                >
                    {actionIcons.map((Icon, index) => (
                        <Button key={index} className={`p-2 focus:outline-none ${fillIndex === index ? "bg-[#0736C4] rounded" : ""}`} onPress={() => setFillIndex(index)}>
                            <Icon key={index} fill={fillIndex === index ? "white" : "black"} />
                        </Button>
                    ))}
                </section>
            </section>
            <section
                aria-label="Theme and Logout"
                className="w-full flex flex-col gap-3 justify-center items-center mb-3"
            >
                <Button className={`p-2 focus:outline-none text-white`}>
                    <ThemeIcon />
                </Button>
                <Button className={`p-2 focus:outline-none text-white`}>
                    <LogoutSvg />
                </Button>
            </section>
        </aside>
    );
};

export default Sidebar;

