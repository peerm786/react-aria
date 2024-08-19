"use client";
import { Input, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import type { TabPanelProps, TabProps } from "react-aria-components";
import React, { useEffect, useState } from "react";
import {
  DataFabric,
  ProcessFabric,
  SearchIcon,
  SecurityFabric,
  UserFabric,
} from "../constants/svgApplications";
import { AxiosService } from "../../lib/utils/axiosService";
import { toast } from "react-toastify";
import TorusToast from "./torusComponents/torusToast";
import { RootState } from "../../lib/Store/store";
import { useSelector } from "react-redux";

interface BuilderProps {
  tenant: string;
  appGrp: string;
  app: string;
  isDarkMode: boolean;
}

function FabricSelector({ tenant, appGrp, app }: any) {
  const [selectedTab, setSelectedTab] = useState("df");
  const [modelKeys, setModelKeys] = useState<any[]>([]);
  const [wordLength, setWordLength] = useState(0);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const [searchValue, setSearchValue] = useState<string>("");

  const tabs = [
    {
      id: "df",
      label: "DataFabric",
      icon: <DataFabric width="1.34vw" height="1.34vw" />,
      iconDefault: (
        <DataFabric
          width="1.34vw"
          height="1.34vw"
          fill={isDarkMode ? "white" : "black"}
          isOpacityNeeded = {true}
        />
      ),
    },
    {
      id: "uf",
      label: "UserFabric",
      icon: <UserFabric width="1.34vw" height="1.34vw" />,
      iconDefault: (
        <UserFabric
          width="1.34vw"
          height="1.34vw"
          fill={isDarkMode ? "white" : "black"}
          isOpacityNeeded = {true}
        />
      ),
    },
    {
      id: "pf",
      label: "ProcessFabric",
      icon: <ProcessFabric width="1.34vw" height="1.34vw" />,
      iconDefault: (
        <ProcessFabric
          width="1.34vw"
          height="1.34vw"
          fill={isDarkMode ? "white" : "black"}
          isOpacityNeeded = {true}
        />
      ),
    },
    {
      id: "sf",
      label: "SecurityFabric",
      icon: <SecurityFabric width="1.34vw" height="1.34vw" />,
      iconDefault: (
        <SecurityFabric
          width="1.34vw"
          height="1.34vw"
          fill={isDarkMode ? "white" : "black"}
          isOpacityNeeded = {true}
        />
      ),
    },
  ];

  const getAllApplicationList = async (fabric: string) => {
    if (tenant && appGrp && app) {
      const key = `${tenant}:${appGrp}:${app}`;
      const res = await AxiosService.post("/tp/getAllKeys", {
        keyPrefix: `TGA:ABK${fabric}:BUILD:${tenant}:${app}`,
      });

      if (res.status == 201) {
        if (res.data.data) {
          const allKeys = [...res.data.data];
          const data = allKeys
            .map((item: string) => {
              const parts = item.split(":");
              parts.pop();
              if (parts.length == 7) {
                return parts.join(":");
              }
            })
            .filter((ele) => ele != undefined);

          const newSet = new Set(data);
          setModelKeys(
            (Array.from(newSet) as string[]).map((key: string) => ({
              key: key,
              label: key.replace(
                `TGA:ABK${fabric}:BUILD:${tenant}:${app}:`,
                ""
              ),
            }))
          );
          // setModelKeys([...new Set(data)]);
        } else {
          setModelKeys([]);
          toast(
            <TorusToast
              setWordLength={setWordLength}
              wordLength={wordLength}
            />,
            {
              type: "error",
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: true,
              title: "Error Fetching ModelKeys",
              text: `There is no ModelKey found for the application`,
              closeButton: false,
            } as any
          );
        }
      } else {
        setModelKeys([]);
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Error Fetching ModelKeys",
            text: `Please select valid application`,
            closeButton: false,
          } as any
        );
      }
    } else {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching ModelKeys",
          text: `Please select valid application`,
          closeButton: false,
        } as any
      );
    }
  };

  useEffect(() => {
    if (app) getAllApplicationList(selectedTab.toUpperCase());
  }, [app]);

  const handleTabChange = (id: any) => {
    setSelectedTab(id);
    getAllApplicationList(id.toUpperCase());
  };

  const handleDragKey = (e: React.DragEvent<HTMLDivElement>, content: any) => {
    e.dataTransfer.setData("key", JSON.stringify({ [selectedTab]: content }));
  };

  return (
    <div className="flex flex-col w-[85%] h-screen">
      <Tabs
        className={"h-[69.52vh] dark:bg-[#0F0F0F] bg-[#F4F5FA] rounded-lg"}
        onSelectionChange={handleTabChange}
      >
        <TabList
          aria-label="Feeds"
          className="flex w-[95%] bg-[#FFFFFF] dark:bg-[#161616] dark:text-white rounded-lg p-[0.29vw] ml-[0.58vw] mt-[0.58vw]"
        >
          {tabs.map(({ id, label, icon, iconDefault }) => (
            <MyTab key={id} id={id} label={label}>
              {selectedTab === id ? icon : iconDefault}
            </MyTab>
          ))}
        </TabList>
        <div className="relative mt-[0.87vw] ml-[0.58vw]">
          <span className="absolute inset-y-0 left-0 flex items-center p-[0.58vw] h-[2.04vw] w-[2.04vw] ">
            <SearchIcon
              width="0.83vw"
              height="0.83vw"
              fill={isDarkMode ? "white" : "black"}
            />
          </span>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Artifacts"
            className={`w-[92%] bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white text-[0.72vw] leading-[2.22vh] p-[0.29vw] focus:outline-none focus:border-blue-400 border border-black/15 pl-[1.75vw] rounded-md dark:border-[#212121]`}
          />
        </div>
        <div className="h-[85%] overflow-y-auto">
          {modelKeys
            .filter((key: any) =>
              key.label.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((key: any, index: number) => (
              <MyTabPanel key={index} id={selectedTab}>
                <div
                  draggable
                  onDragStart={(e) => handleDragKey(e, key.key)}
                  className="w-[90%] bg-white dark:bg-[#161616] border border-black/20 dark:border-[#212121] dark:text-white p-[0.29vw] ml-[0.58vw] text-[0.83vw] leading-[2.22vh] rounded-md"
                >
                  {key.label}
                </div>
              </MyTabPanel>
            ))}
        </div>
      </Tabs>
    </div>
  );
}

function MyTab({ id, children, label }: TabProps & { label: string }) {
  return (
    <Tab
      id={id}
      className={({ isSelected }) => `
        w-full flex items-center justify-center text-[0.72vw] leading-[1.48vh] font-medium cursor-pointer
        ${
          isSelected
            ? "bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white transition duration-300 ease-in-out rounded-lg outline-none p-[0.29vw]"
            : ""
        }
      `}
    >
      {({ isSelected }) => (
        <>
          {children}
          {isSelected && <span className="ml-[0.58vw]">{label}</span>}
        </>
      )}
    </Tab>
  );
}

function MyTabPanel(props: TabPanelProps) {
  return <TabPanel {...props} className="mt-[0.58vw]" />;
}

export default FabricSelector;
