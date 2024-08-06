import React, { useEffect, useState } from "react";
import {
    CallChatSvg,
    DataFabric,
    HomeSvg,
    ProcessFabric,
    QuestionSvg,
    SecurityFabric,
    ShopSvg,
    UserFabric,
    LogDetailIcon,
    LogoutSvg
} from "../../constants/svgApplications";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import TorusAvatar from "../Avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { deleteAllCookies } from "../../../lib/utils/cookiemgmt";
import { toggleDarkMode } from "../../../lib/Store/Reducers/MainSlice";

import { BiMoon, BiSun } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";

const BuilderSideNav = () => {
    const [fillIndex, setFillIndex] = useState(5);
    const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
    const dispatch = useDispatch();
    const router = useRouter();


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
    };

    const handleLogout = (close: any) => {
        signOut();
        deleteAllCookies();
        router.push("/login");
    };

    const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode(!isDarkMode));
    };

    // useEffect(() => {
    //     if (isDarkMode) {
    //         document.body.classList.add("dark");
    //     } else {
    //         document.body.classList.remove("dark");
    //     }
    // }, [isDarkMode]);

    return (
        <aside
            aria-label="Sidebar"
            className="w-12 h-[95%] mt-5 flex ml-3 flex-col items-center justify-between bg-white border border-[#000000]/15 rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
        >
            <section className="flex flex-col w-full">
                <section
                    aria-label="Actions"
                    className="flex flex-col w-full items-center justify-center gap-1 mt-3 dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
                >
                    {actionIcons.map(({ Icon, route }, index) => (
                        <Button
                            key={index}
                            className={`${index === 5 ? "border-b border-b-black/35" : ""} p-2 items-center justify-center focus:outline-none ${index === fillIndex ? "flex border-l-2 border-l-[#0736C4] w-full" : ""}`}
                            onPress={() => handleRoutes(index, route)}
                        >
                            <Icon
                                key={index}
                                fill={index === fillIndex ? `${iconColors[index]}` : isDarkMode ? "white" : "black"}
                            />
                        </Button>
                    ))}
                </section>
            </section>
            <Button onPress={handleDarkModeToggle} className="p-2 focus:outline-none">
                {isDarkMode ? (
                    <BiSun
                        color={"#A59E92"}
                        size={25}
                        className="dark:text-white text-black/70"
                    />
                ) : (
                    <BiMoon
                        color={"#A59E92"}
                        size={25}
                        className="dark:text-white text-black/70"
                    />
                )}
            </Button>

            <DialogTrigger>
                <Button
                    className={`outline-none mr-1 mb-2`}
                >
                    <TorusAvatar radius="full" size="lg" />
                </Button>

                <Popover placement="right top">
                    <Dialog className="border bg-white focus:outline-none rounded-lg dark:bg-[#161616] dark:text-white">
                        {({ close }) => (
                            <div className="flex flex-col p-1 gap-2 dark:bg-[#161616] dark:text-white">
                                <Button className={`outline-none `} onPress={() => handleLogout(close)}>
                                    <LogoutSvg fill={isDarkMode ? "white" : "black"} />
                                </Button>
                            </div>
                        )}
                    </Dialog>
                </Popover>
            </DialogTrigger>
        </aside>
    );
};

export default BuilderSideNav;
