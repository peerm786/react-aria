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
    LogDetailIcon
} from "../../constants/svgApplications";
import { Button } from "react-aria-components";
import TorusAvatar from "../Avatar";
import { useRouter } from "next/navigation";

const BuilderSideNav = () => {
    const [fillIndex, setFillIndex] = useState(5);
    const router = useRouter()
    const actionIcons = [
        { Icon: HomeSvg, route: "/torus" },
        { Icon: DataFabric },
        { Icon: UserFabric },
        { Icon: ProcessFabric },
        { Icon: SecurityFabric },
        { Icon: LogDetailIcon, route: "/" },
        { Icon: ShopSvg },
        { Icon: QuestionSvg },
        { Icon: CallChatSvg }
    ];
    const iconColors = ["#006FEE", "#0736C4", "#03A9F4", "#13CC78", "#FFBE00", "#0736C4", "#006FEE", "#006FEE", "#006FEE"];

    const handleRoutes = (index: number, route: string | undefined) => {
        if (route) {
            router.push(route);
        }
        setFillIndex(index);
    }

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
                    {actionIcons.map(({ Icon, route }, index) => (
                        <Button
                            key={index}
                            className={`${index === 5 ? "border-b border-b-black/35" : ""} p-2 focus:outline-none ${index === fillIndex ? "border-l-2 border-l-[#0736C4]" : ""}`}
                            onPress={() => handleRoutes(index, route)}
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