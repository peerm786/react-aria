import React, { useState } from "react";
import {
  BellIcon,
  CallChatSvg,
  HomeSvg,
  AssemblerScreenIcon,
  LogScreenIcon,
  LogoutSvg,
  QuestionSvg,
  SettingsIcon,
  ShopSvg,
} from "../../constants/svgApplications";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import TorusAvatar from "../Avatar";
import TorusDialog from "../torusComponents/torusdialogmodal";
import Settings from "../settings";
import { useRouter } from "next/navigation";
import { BiMoon, BiSun } from "react-icons/bi";
import { toggleDarkMode } from "../../../lib/Store/Reducers/MainSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import { signOut } from "next-auth/react";
import { deleteAllCookies } from "../../../lib/utils/cookiemgmt";

const Sidebar = () => {
  const [fillIndex, setFillIndex] = useState(0);

  const actionIcons = [
    { Icon: HomeSvg, route: "/torus" },
    { Icon: ShopSvg },
    { Icon: QuestionSvg },
    { Icon: CallChatSvg },
    { Icon : LogScreenIcon},
    { Icon: AssemblerScreenIcon, route: "/" }
  ];
  const router = useRouter();
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const dispatch = useDispatch();

  const handleRoutes = (index: number, route: string | undefined) => {
    if (route) {
      router.push(route);
    }
    setFillIndex(index);
  }
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode(!isDarkMode));
  };
  const handleLogout = (close: any) => {
    signOut();
    deleteAllCookies();
    router.push("/login");
  };

  return (
    <aside
      aria-label="Sidebar"
      className="w-[3.59vw] flex ml-[1.46vw] flex-col items-center justify-between h-full bg-white border border-[#000000]/15 rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
    >
      <section className="flex flex-col justify-center items-center dark:text-[#FFFFFF]">
        <section
          aria-label="Actions"
          className="w-[3.5vw] flex flex-col items-center justify-center gap-[0.29vw] mt-[0.29vw] dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
        >
          {actionIcons.map(({ Icon, route }, index) => (
            <Button
              key={index}
              className="p-[0.58vw] focus:outline-none "
              onPress={() => handleRoutes(index, route)}
            >
              <Icon
                key={index}
                fill={
                  index === fillIndex
                    ? "#0736C4" : isDarkMode ? "#FFFFFF" : "black"
                }
              />
            </Button>
          ))}
        </section>
      </section>

      <section
        aria-label="Theme and Logout"
        className="w-full flex flex-col justify-center items-center mb-[0.58vw]"
      >
        <Button onPress={handleDarkModeToggle} className="p-[0.58vw] focus:outline-none">
          {isDarkMode ? (
            <BiSun
              color={"#A59E92"}
              size={20}
              className="dark:text-white text-black/70"
            />
          ) : (
            <BiMoon
              color={"#A59E92"}
              size={20}
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
          <Popover placement="right top">
            <Dialog className="bg-white focus:outline-none rounded-lg dark:bg-[#161616]">
              {({ close }) => (
                <div className="flex flex-col p-[0.58vw] gap-[0.58vw] border border-black/15 rounded-lg dark:bg-[#0F0F0F] dark:text-white dark:border-white/15">
                  <Button className={`outline-none`} onPress={() => handleLogout(close)}>
                    <LogoutSvg fill={isDarkMode ? "white" : "black"} />
                  </Button>
                </div>
              )}
            </Dialog>
          </Popover>
        </DialogTrigger>
      </section>
    </aside>
  );
};

export default Sidebar;
