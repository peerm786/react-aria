import React, { useState } from "react";
import {
    BellIcon,
    CallChatSvg,
    HomeSvg,
    QuestionSvg,
    SettingsIcon,
    ShopSvg,
} from "../constants/svgApplications";
import { Button } from "react-aria-components";
import TorusAvatar from "./Avatar";

const Sidebar = () => {
    const [fillIndex, setFillIndex] = useState(0);
    const actionIcons = [HomeSvg, ShopSvg, QuestionSvg, CallChatSvg];

    return (
        <aside
            aria-label="Sidebar"
            className="w-10 flex  ml-5 flex-col items-center justify-between h-full bg-white border rounded-md"
        >
            <section className="flex flex-col justify-center items-center">
                <section
                    aria-label="Actions"
                    className="w-12 flex flex-col items-center justify-center gap-3 mt-3"
                >
                    {actionIcons.map((Icon, index) => (
                        <Button key={index} className={`p-2 focus:outline-none`} onPress={() => setFillIndex(index)}>
                            <Icon key={index} fill={index === fillIndex ? "#0736C4" : "black"} />
                        </Button>
                    ))}
                </section>
            </section>
            <section
                aria-label="Theme and Logout"
                className="w-full flex flex-col justify-center items-center mb-3"
            >
                <Button className={`outline-none`}>
                    <BellIcon />
                </Button>
                <Button className={`outline-none mb-2`}>
                    <SettingsIcon />
                </Button>
                <Button className={`outline-none mr-1`}>
                    <TorusAvatar radius="full" size="lg" />
                </Button>
            </section>
        </aside>
    );
};

export default Sidebar;

