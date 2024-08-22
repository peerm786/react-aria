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
    LogScreenIcon,
    ConnectSupportIcon,
    TickIcon
} from "../../constants/svgApplications";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import TorusAvatar from "../Avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { deleteAllCookies, getCookie } from "../../../lib/utils/cookiemgmt";
import { toggleDarkMode } from "../../../lib/Store/Reducers/MainSlice";
import { BiMoon, BiSun } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import TorusDialog from "../torusComponents/torusdialogmodal";
import Settings from "../settings";

const BuilderSideNav = () => {
    const [fillIndex, setFillIndex] = useState(6);
    const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
    const dispatch = useDispatch();
    const router = useRouter();
    const UserName = getCookie("loginId");
    const UserEmail = getCookie("email")

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
            className="w-[3.59vw] h-[89.07vh] mt-[1.46vw] flex ml-[0.87vw] flex-col items-center justify-between bg-white border border-[#000000]/15 rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
        >
            <section className="flex flex-col w-full">
                <section
                    aria-label="Actions"
                    className="flex flex-col w-full items-center justify-center mt-[0.29vw] dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
                >
                    {actionIcons.map(({ Icon, route }, index) => (
                        <Button
                            key={index}
                            className={`${index === 6 ? "border-b border-b-black/35 dark:border-b-white/35" : ""} p-[0.58vw] items-center justify-center focus:outline-none ${index === fillIndex ? "flex border-l-2 border-l-[#0736C4] w-full" : ""}`}
                            onPress={() => handleRoutes(index, route)}
                        >
                            <Icon
                                isOpacityNeeded={index === fillIndex ? false : true}
                                width="1.25vw"
                                height="1.25vw"
                                key={index}
                                fill={index === fillIndex ? `#0736C4` : isDarkMode ? "white" : "black"}
                            />
                        </Button>
                    ))}
                </section>
            </section>
            <div className="flex flex-col items-center justify-center">
                <Button onPress={handleDarkModeToggle} className="p-[0.58vw] focus:outline-none">
                    {isDarkMode ? (
                        <BiSun
                            color={"#A59E92"}
                            size={18}
                            className="dark:text-white text-black/70"
                        />
                    ) : (
                        <BiMoon
                            color={"#A59E92"}
                            size={18}
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
                        className={`outline-none mr-[0.29vw] mb-[0.29vw]`}
                    >
                        <TorusAvatar radius="full" size="lg" />
                    </Button>
                    <Popover placement="right" className="ml-3">
                        <Dialog className="flex bg-transparent focus:outline-none">
                            {({ close }) => (
                                <div className="bg-white mb-7 rounded-md border border-black/15 w-[12.5vw] h-[22.7vh]">
                                    <div className="flex flex-col h-[7.4vh]">
                                        <div className="flex items-center p-1 gap-2">
                                            <div>
                                                <TorusAvatar radius="full" size="lg" />
                                            </div>
                                            <div className="flex flex-col text-[0.72vw] leading-[1.85vh] gap-1">
                                                <p className="font-medium">{UserName.charAt(0).toUpperCase() + UserName.slice(1)}</p>
                                                <p className="text-black/50">{UserEmail}</p>
                                            </div>
                                        </div>
                                        <p className="flex justify-center mr-6 text-[0.5vw] leading-[1.85vh]">VIEW PROFILE</p>
                                    </div>
                                    <hr className="w-full my-1.5 bg-[#F2F4F7]" />
                                    <div className="ml-1.5">
                                        <p className="flex w-[11.8vw] items-center gap-2 bg-[#F4F5FA] pl-2.5 py-1.5 rounded-md text-[0.72vw] leading-[1.85vh]"><TickIcon />Change Your Status</p>
                                    </div>
                                    <hr className="w-full my-2 bg-[#F2F4F7]" />
                                    <div className="flex flex-col gap-3">
                                        <p className="flex items-center pl-4 gap-2 text-[0.72vw] leading-[1.85vh]"><ConnectSupportIcon />Connect Support</p>
                                        <Button className={`flex pl-4 items-center gap-2 text-[0.72vw] leading-[1.85vh] outline-none`} onPress={() => handleLogout(close)}>
                                            <LogoutSvg fill={isDarkMode ? "white" : "black"} />Log out
                                        </Button>
                                    </div>
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
