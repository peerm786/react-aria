import React, { useState } from "react";
import {
  BellIcon,
  CallChatSvg,
  HomeSvg,
  LogDetailIcon,
  QuestionSvg,
  SettingsIcon,
  ShopSvg,
} from "../../constants/svgApplications";
import { Button } from "react-aria-components";
import TorusAvatar from "../Avatar";
import TorusDialog from "../torusdialogmodal";
import Settings from "../settings";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [fillIndex, setFillIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const actionIcons = [
    { Icon: HomeSvg, route: "/torus" },
    { Icon: ShopSvg },
    { Icon: QuestionSvg },
    { Icon: CallChatSvg },
    { Icon: LogDetailIcon, route: "/" }
  ];
  const router = useRouter();

  const handleRoutes = (index: number, route: string | undefined) => {
    if (route) {
      router.push(route);
    }
    setFillIndex(index);
  }

  return (
    <aside
      aria-label="Sidebar"
      className="w-10 flex ml-5 flex-col items-center justify-between h-full bg-white border border-[#000000]/15 rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
    >
      <section className="flex flex-col justify-center items-center dark:text-[#FFFFFF]">
        <section
          aria-label="Actions"
          className="w-12 flex flex-col items-center justify-center gap-3 mt-3 dark:bg-[#1D1D1D] dark:text-[#FFFFFF]"
        >
          {actionIcons.map(({ Icon, route }, index) => (
            <Button
              key={index}
              className="p-2 focus:outline-none "
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
        className="w-full flex flex-col justify-center items-center mb-3 "
      >
        <Button className="outline-none dark:text-[#FFFFFF]" >
          <BellIcon fill={isDarkMode ? "white" : "black"} />
        </Button>
        <TorusDialog
          classNames={{
            dialogClassName: "focus:outline-none bg-white border rounded ",
          }}
          triggerElement={
            <Button className="outline-none mb-2  " >
              <SettingsIcon fill={isDarkMode ? "white" : "black"} />
            </Button>
          }
        >
          <Settings />
        </TorusDialog>
        <Button className="outline-none mr-1 dark:text-[#FFFFFF]">
          <TorusAvatar radius="full" size="lg" />
        </Button>
      </section>
    </aside>
  );
};

export default Sidebar;
