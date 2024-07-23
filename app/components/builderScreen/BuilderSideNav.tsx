import React, { useState } from "react";
import {
    CallChatSvg,
    DataFabric,
    HomeSvg,
    ProcessFabric,
    QuestionSvg,
    SecurityFabric,
    ShopSvg,
    UserFabric,
} from "../../constants/svgApplications";
import { Button } from "react-aria-components";
import TorusAvatar from "../Avatar";

const BuilderSideNav = () => {
    const [fillIndex, setFillIndex] = useState(0);
    const actionIcons = [HomeSvg, DataFabric, UserFabric, ProcessFabric, SecurityFabric, ShopSvg, QuestionSvg, CallChatSvg];
    const iconColors = ["#006FEE", "#0736C4", "#03A9F4", "#13CC78", "#FFBE00", "#006FEE", "#006FEE", "#006FEE"];

    return (
        <aside
            aria-label="Sidebar"
            className="w-10 h-[95%] mt-5 flex ml-5 flex-col items-center justify-between bg-white border border-[#000000]/15 rounded-md"
        >
            <section className="flex flex-col justify-center items-center">
                <section
                    aria-label="Actions"
                    className="w-12 flex flex-col items-center justify-center gap-1 mt-3"
                >
                    {actionIcons.map((Icon, index) => (
                        <Button
                            key={index}
                            className={`${index === 4 ? "border-b border-b-black/35" : ""} p-2 focus:outline-none ${index === fillIndex ? "border-l-2 border-l-[#0736C4]" : ""}`}
                            onPress={() => setFillIndex(index)}
                        >
                            <Icon
                                key={index}
                                fill={index === fillIndex ? `${iconColors[index]}` : "black"}
                            />
                        </Button>
                    ))}
                </section>
            </section>

            <Button className={`outline-none mr-1 mb-2`}>
                <TorusAvatar radius="full" size="lg" />
            </Button>
        </aside>
    );
};

export default BuilderSideNav;