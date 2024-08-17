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
    AssemblerScreenIcon,
    LogoutSvg,
    BellIcon,
    SettingsIcon,
    LogScreenIcon
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
import TorusDialog from "../torusdialogmodal";
import Settings from "../settings";

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
        { Icon: LogScreenIcon },
        { Icon: AssemblerScreenIcon, route: "/" },
        { Icon: ShopSvg },
        { Icon: QuestionSvg },
        { Icon: CallChatSvg }
    ];

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

    return (
        <aside
            aria-label="Sidebar"
            className="w-[3.59vw] h-[89.07vh] mt-5 flex ml-3 flex-col items-center justify-between bg-white border border-[#000000]/15 rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
        >
            <section className="flex flex-col w-full">
                <section
                    aria-label="Actions"
                    className="flex flex-col w-full items-center justify-center mt-1 dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
                >
                    {actionIcons.map(({ Icon, route }, index) => (
                        <Button
                            key={index}
                            className={`${index === 6 ? "border-b border-b-black/35 dark:border-b-white/35" : ""} p-2 items-center justify-center focus:outline-none ${index === fillIndex ? "flex border-l-2 border-l-[#0736C4] w-full" : ""}`}
                            onPress={() => handleRoutes(index, route)}
                        >
                            <Icon
                                width="1.25vw"
                                height="1.25vw"
                                key={index}
                                fill={index === fillIndex ? `#0736C4` : isDarkMode ? "white" : "black"}
                            />
                        </Button>
                    ))}
                </section>
            </section>
            <div className="flex flex-col justify-center">
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

                <Button className="outline-none dark:text-[#FFFFFF]" >
                    <BellIcon fill={isDarkMode ? "white" : "black"} />
                </Button>
                <TorusDialog
                    classNames={{
                        dialogClassName: "focus:outline-none bg-white border rounded ",
                    }}
                    triggerElement={
                        <Button className="outline-none mb-[0.29vw]" >
                            <SettingsIcon fill={isDarkMode ? "white" : "black"} />
                        </Button>
                    }
                >
                    <Settings />
                </TorusDialog>
                <DialogTrigger>
                    <Button
                        className={`outline-none mr-1 mb-2`}
                    >
                        <TorusAvatar
                            radius="full"
                            size="lg"
                        />
                    </Button>
                    <Popover placement="right top">
                        <Dialog className="bg-white focus:outline-none rounded-lg dark:bg-[#161616]">
                            {({ close }) => (
                                <div className="flex flex-col p-2 gap-2 border border-black/15 rounded-lg dark:bg-[#0F0F0F] dark:text-white dark:border-white/15">
                                    <Button className={`outline-none`} onPress={() => handleLogout(close)}>
                                        <LogoutSvg fill={isDarkMode ? "white" : "black"} />
                                    </Button>
                                </div>
                            )}
                        </Dialog>
                    </Popover>
                </DialogTrigger>
            </div>
        </aside>
    );
};

export default BuilderSideNav;
