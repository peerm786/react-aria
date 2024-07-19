"use client";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { Separator } from "react-aria-components";
import FabricSelector from "./components/Tab";
import MenuItemAccordian from "./components/MenuItemAccordian";
import { AxiosService } from "../lib/utils/axiosService";
import { toast } from "react-toastify";
import DropDown from "./components/multiDropdownnew";
import { useDarkMode } from "../lib/utils/useDarkmode";
import { IoToggleSharp } from "react-icons/io5";
import { HistoryIcon, PushandPullIcon } from "./constants/svgApplications";
import { getCookie } from "../lib/utils/cookiemgmt";
import { menuItems, TreeNode } from "./constants/MenuItemTree";

const page = () => {
  const [selectedBuildButton, setSelectedBuildButton] = useState(true);
  const [selectedHistoryButton, setSelectedHistoryButton] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<string>("");
  const [selectAppGroup, setSelectAppGroup] = useState<string>("");
  const [selectApp, setSelectApp] = useState<string>("");
  const [tenantList, setTenantList] = useState<string[]>([]);
  const [appGrpList, setAppGrpList] = useState<string[]>([]);
  const [appList, setAppList] = useState<string[]>([]);
  const { toggleDarkMode } = useDarkMode();
  const [menuItemData, setMenuItemData] = useState<TreeNode[]>([]);
  const [versionList , setVersionList] = useState<string[]>([]);
  const [selectedVersion , setSelectedVersion] = useState<string>("");

  const handleBuildButtonSelect = () => {
    setSelectedBuildButton(true);
    setSelectedHistoryButton(false);
  };

  const handleHistoryButtonSelect = () => {
    setSelectedHistoryButton(true);
    setSelectedBuildButton(false);
  };

  const handleTenantselect = (e: any) => {
    setAppGrpList([]);
    setSelectedTenant(e);
    setSelectAppGroup("");
    setSelectApp("");
    setSelectedVersion("")
    setVersionList([])
    fetchAppGroup(e);
  };

  const handleAppGroupselect = (e: any) => {
    setAppList([]);
    setVersionList([]);
    setSelectedVersion("")
    setSelectAppGroup(e);
    setSelectApp("");
    fetchApp(selectedTenant, e);
  };
  const handleAppselect = (e: any) => {
    setSelectedVersion("")
    setSelectApp(e);
    getAssemblerVersion(e)
  };
  const handleVersionselect = (e: any) => {
    setSelectedVersion(e);
    getAssemblerData(e)
  };

  const fetchTenants = async () => {
    try {
      const res = await AxiosService.get("/tp/getClientTenant?type=c");
      if (res.status == 200) {
        setTenantList(res.data as string[]);
      }
    } catch (error) {
      toast.error("Error fetching tenants");
    }
  };

  const fetchAppGroup = async (tenant: string) => {
    try {
      const res = await AxiosService.get(
        `/tp/getappgrouplist?tenant=${tenant}`
      );
      if (res.status == 200) {
        setAppGrpList(res.data);
      }
    } catch (error) {
      toast.error("Error fetching Appgrp");
    }
  };

  const fetchApp = async (tenant: string, appGroup: string) => {
    try {
      const res = await AxiosService.get(
        `/tp/getapplist?tenant=${tenant}&appGroup=${appGroup}`
      );
      if (res.status == 200) {
        setAppList(res.data);
      }
    } catch (error) {
      toast.error("Error fetching Appgrp");
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const getAssemblerVersion = async (app:string) => {
    try {
      const res = await AxiosService.get(
        `/tp/getAssemblerVersion?key=${selectedTenant}:${selectAppGroup}:${app}:ABK`
      );

      if (res.status == 200) {
        setVersionList(res.data);
      }
    } catch (err) {
      setVersionList([]);
    }
  };

  const getAssemblerData = async (version : string) => {
    try {
      const res = await AxiosService.get(
        `/tp/getAssemblerData?key=${selectedTenant}:${selectAppGroup}:${selectApp}:ABK:${version}`
      );
      if(res.status == 200){
        setMenuItemData(res.data);
      }else{
        setMenuItemData([]);
      }
      
    } catch (error) {
      
    }
  }

  const handleSaveBuild = async () => {
    try {
      const res = await AxiosService.post("/tp/saveAssemblerData", {
        key: `${selectedTenant}:${selectAppGroup}:${selectApp}:ABK`,
        data: menuItemData,
      });
      if(res.status == 201){
        toast.success("Build saved successfully");
      }
    } catch (error) {
      toast.error("Error saving build");
    }
    
  };

  const handleUpdateBuild = async() => {
    try {
      const res = await AxiosService.post("/tp/updateAssemblerData", {
        key: `${selectedTenant}:${selectAppGroup}:${selectApp}:ABK:${selectedVersion}`,
        data: menuItemData,
      })
      if(res.status == 201){
        toast.success("Build saved successfully");
      }
    } catch (error) {
      toast.error("Error saving build");
    }
  
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-y-hidden dark:bg-[#161616]">
      <div className="flex w-full justify-between">
        <div className="flex gap-5 pt-2 pl-4">
          <Button
            className={`${
              selectedBuildButton ? "font-semibold" : ""
            } flex text-sm items-center gap-3 rounded-lg border-none outline-none dark:text-white`}
            onPress={handleBuildButtonSelect}
          >
            <PushandPullIcon
              fill={getCookie("isDarkMode") ? "white" : "black"}
            />
            Push to Build
          </Button>
          <Button
            className={`${
              selectedHistoryButton ? "font-semibold" : ""
            } flex text-sm items-center gap-3 rounded-lg border-none outline-none dark:text-white`}
            onPress={handleHistoryButtonSelect}
          >
            {" "}
            <HistoryIcon fill={getCookie("isDarkMode") ? "white" : "black"} />
            History
          </Button>
        </div>
        <div className="flex pt-2 pr-3 gap-2 items-center">
        <Button
            onPress={handleUpdateBuild}
            isDisabled={!selectedVersion}
            className={`text-[12px] rounded-md border-none text-white disabled:cursor-not-allowed bg-[#0736C4] px-3 py-1 outline-none`}
          >
            Update
          </Button>
          <Button
            onPress={handleSaveBuild}
            isDisabled={!selectApp}
            className={`text-[12px] rounded-md border-none text-white disabled:cursor-not-allowed bg-[#0736C4] px-3 py-1 outline-none`}
          >
            Save
          </Button>
          <IoToggleSharp
            size={25}
            onClick={toggleDarkMode}
            className="dark:text-white text-black/70"
          />
          <Button
            className={
              "text-[12px] rounded-md border-none text-white bg-[#0736C4] px-3 py-1 outline-none"
            }
          >
            Build
          </Button>
        </div>
      </div>
      <div className="pt-2">
        <Separator className="dark:border-[#212121]" />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex outline-none gap-5 pl-4">
          <DropDown
            triggerButton="Tenant"
            selectedKeys={selectedTenant}
            setSelectedKeys={handleTenantselect}
            items={tenantList}
            classNames={{
              triggerButton:
                "min-w-60 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white",
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />

          <DropDown
            triggerButton="AppGroup"
            selectedKeys={selectAppGroup}
            setSelectedKeys={handleAppGroupselect}
            items={appGrpList}
            classNames={{
              triggerButton: `${
                selectedTenant
                  ? "min-w-60 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                  : "backdrop-blur-3xl min-w-60 rounded-lg text-sm mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
              }`,
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />

          <DropDown
            triggerButton="App"
            selectedKeys={selectApp}
            setSelectedKeys={handleAppselect}
            items={appList}
            classNames={{
              triggerButton: `${
                selectAppGroup
                  ? "min-w-60 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                  : "backdrop-blur-3xl min-w-60 rounded-lg text-sm mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
              }`,
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />

          <DropDown
            triggerButton="version"
            selectedKeys={selectedVersion}
            setSelectedKeys={handleVersionselect}
            items={versionList}
            classNames={{
              triggerButton: `${
                selectApp
                  ? "min-w-20 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                  : "backdrop-blur-3xl min-w-20 rounded-lg text-sm mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
              }`,
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            className={
              "bg-[#FFF6F6] dark:bg-[#EF4444]/15 text-sm font-semibold outline-none rounded-md text-[#EF4444] px-5 mt-3"
            }
          >
            Clear
          </Button>
          <Button
            className={
              "bg-[#F1F1F1] dark:bg-[#0F0F0F] dark:text-white text-sm font-medium outline-none rounded-md text-black px-3 mt-3 mr-2"
            }
          >
            Clear All
          </Button>
        </div>
      </div>
      <div>
        <Separator className="mt-2 dark:border-[#212121]" />
      </div>
      <div className="flex w-full h-full gap-3">
        <div className="w-[25%] pt-3 pl-4 rounded-lg">
          <FabricSelector
            tenant={selectedTenant}
            appGrp={selectAppGroup}
            app={selectApp}
          />
        </div>
        <div className="w-[75%] pt-3 pr-2">
          <MenuItemAccordian data={menuItemData} setData={setMenuItemData} />
        </div>
      </div>
    </div>
  );
};

export default page;
