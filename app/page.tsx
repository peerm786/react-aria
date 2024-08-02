"use client";
import { useEffect, useState } from "react";
import { Button, Input, Tab, TabList, Tabs } from "react-aria-components";
import { Separator } from "react-aria-components";
import FabricSelector from "./components/Tab";
import MenuItemAccordian from "./components/builderScreen/MenuItemAccordian";
import { AxiosService } from "../lib/utils/axiosService";
import { toast } from "react-toastify";
import DropDown from "./components/multiDropdownnew";
import { useDarkMode } from "../lib/utils/useDarkmode";
import { IoToggleSharp } from "react-icons/io5";
import { ColumnIcon, HistoryIcon, PushandPullIcon, SearchIcon } from "./constants/svgApplications";
import { TreeNode } from "./constants/MenuItemTree";
import BuilderTopNav from "./components/builderScreen/BuilderTopNav";
import BuilderSideNav from "./components/builderScreen/BuilderSideNav";
import ProcessLogs from "./components/torusComponents/processLog";
import { FilterIcon } from "./components/torusComponents/SVG_Application";
import ExceptionLog from "./components/torusComponents/ExceptionLog";
import Artifactdetails from "./components/landingScreen/artifactdetails";
import ProgressButton from "./components/progressbar";

const page = () => {
  const [selectedAssemblerButton, setSelectedAssemblerButton] = useState(true);
  const [selectedLogsButton, setSelectedLogsButton] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<string>("");
  const [selectAppGroup, setSelectAppGroup] = useState<string>("");
  const [selectApp, setSelectApp] = useState<string>("");
  const [tenantList, setTenantList] = useState<string[]>([]);
  const [appGrpList, setAppGrpList] = useState<string[]>([]);
  const [appList, setAppList] = useState<string[]>([]);
  const [menuItemData, setMenuItemData] = useState<TreeNode[]>([]);
  const [versionList, setVersionList] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [logsTabList, setLogTabList] = useState<"exception" | "log" | any>("log")
  const [searchValue, setSearchValue] = useState<string>("");
  const allProcessLogColumns = [
    "jobName",
    "version",
    "fabric",
    "jobType",
    "status",
    "node",
    "time",
  ];
  const allExceptionLogColumns = [
    "key",
    "version",
    "timeStamp",
    "errorCode",
  ]
  const [visibleColumns, setVisibleColumns] = useState<any>(allProcessLogColumns);
  const [showNodeData, setShowNodeData] = useState<null | any>(null)
  const [isLoading, setLoading] = useState(true)


  const handleBuildButtonSelect = () => {
    setSelectedAssemblerButton(true);
    setSelectedLogsButton(false);
  };

  const handleHistoryButtonSelect = () => {
    setSelectedLogsButton(true);
    setSelectedAssemblerButton(false);
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
    if (logsTabList == "exception") {
      setVisibleColumns(allExceptionLogColumns);
    } else if (logsTabList == "log") {
      setVisibleColumns(allProcessLogColumns);
    }
  }, []);


  const getAssemblerVersion = async (app: string) => {
    try {
      const res = await AxiosService.get(
        `/tp/getAssemblerVersion?key=TGA:ARK:RELEASE:${selectedTenant}:${selectAppGroup}:${app}`
      );

      if (res.status == 200) {
        setVersionList(res.data);
      }
    } catch (err) {
      setVersionList([]);
    }
  };

  const getAssemblerData = async (version: string) => {
    try {
      const res = await AxiosService.get(
        `/tp/getAssemblerData?key=TGA:ARK:RELEASE:${selectedTenant}:${selectAppGroup}:${selectApp}:${version}`
      );
      if (res.status == 200) {
        setMenuItemData(res.data);
      } else {
        setMenuItemData([]);
      }
    } catch (error) {
      setMenuItemData([]);
    }
  };

  const handleSaveBuild = async () => {
    try {
      const res = await AxiosService.post("/tp/saveAssemblerData", {
        key: `TGA:ARK:RELEASE:${selectedTenant}:${selectAppGroup}:${selectApp}`,
        data: menuItemData,
      });
      if (res.status == 201) {
        toast.success("Build saved successfully");
      }
    } catch (error) {
      toast.error("Error saving build");
    }
  };

  const handleUpdateBuild = async () => {
    try {
      const res = await AxiosService.post("/tp/updateAssemblerData", {
        key: `TGA:ARK:RELEASE:${selectedTenant}:${selectAppGroup}:${selectApp}:${selectedVersion}`,
        data: menuItemData,
      });
      if (res.status == 201) {
        toast.success("Build saved successfully");
      }
    } catch (error) {
      toast.error("Error saving build");
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoading(false)
    }
  }, [])

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center"><ProgressButton isIndeterminate size={"xl"} /> </div>
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <BuilderTopNav showNodeData={showNodeData} setShowNodeData={setShowNodeData} />
      <div className="flex justify-between bg-[#F4F5FA] w-full h-[92%]">
        <BuilderSideNav />
        {showNodeData ?
          <div className="flex flex-col w-[94%] h-[95%] mt-5 mr-3 rounded-md">
            <Artifactdetails nodeData={showNodeData} />
          </div>
          :
          <div className="flex flex-col w-[94%] h-[95%] border border-black/15 bg-white mt-5 overflow-y-hidden dark:bg-[#161616] rounded-md mr-3 scrollbar-hide">
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-5 pt-2 pl-4">
                <Button
                  className={`${selectedAssemblerButton ? "font-semibold" : ""
                    } flex text-sm items-center gap-3 rounded-lg border-none outline-none dark:text-white`}
                  onPress={handleBuildButtonSelect}
                >
                  <PushandPullIcon
                    fill={isDarkMode ? "white" : "black"}
                  />
                  Assembler
                </Button>
                <Button
                  className={`${selectedLogsButton ? "font-semibold" : ""
                    } flex text-sm items-center gap-3 rounded-lg border-none outline-none dark:text-white`}
                  onPress={handleHistoryButtonSelect}
                >
                  {" "}
                  <HistoryIcon fill={isDarkMode ? "white" : "black"} />
                  Logs Hub
                </Button>
              </div>
              {selectedAssemblerButton &&
                <div className="flex pt-2 pr-3 gap-2 items-center">
                  <Button
                    onPress={handleUpdateBuild}
                    isDisabled={!selectedVersion}
                    className={`text-[12px] rounded-md border-none text-[#4CAF50] disabled:cursor-not-allowed bg-[#4CAF50]/15 px-5 py-2 outline-none`}
                  >
                    Update
                  </Button>
                  <Button
                    onPress={handleSaveBuild}
                    isDisabled={!selectApp}
                    className={`text-[12px] rounded-md border-none text-[#0736C4] disabled:cursor-not-allowed bg-[#0736C4]/15 px-5 py-2 outline-none`}
                  >
                    Save
                  </Button>
                  <Button
                    className={"text-[12px] rounded-md border-none text-white disabled:cursor-not-allowed bg-[#0736C4] px-5 py-2 outline-none"}
                  >
                    Build
                  </Button>
                </div>
              }
              {
                selectedLogsButton &&
                <div className="flex gap-2 items-center">
                  <div className="flex w-full gap-2 items-center pt-2">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center p-2 h-7 w-7">
                        <SearchIcon />
                      </span>
                      <Input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search"
                        className={`w- p-1 focus:outline-none focus:border-blue-400 border pl-6 text-sm font-medium rounded-md`}
                      />
                    </div>
                    <DropDown
                      classNames={{
                        popover: "w-[200px]",
                        triggerButton: "w-[100px] h-[30px] border border-black/15 rounded-lg bg-[#F4F5FA]",
                      }}
                      triggerButton={
                        <div className="flex text-xs font-medium items-center gap-2">
                          <ColumnIcon /> Columns
                        </div>
                      }
                      items={logsTabList == "exception" ? allExceptionLogColumns : allProcessLogColumns}
                      selectedKeys={visibleColumns}
                      setSelectedKeys={setVisibleColumns}
                      multiple
                      displaySelectedKeys={false}
                    />
                    <DropDown
                      classNames={{
                        popover: "w-[200px]",
                        triggerButton: "w-[90px] h-[30px] border border-black/15 rounded-lg bg-[#F4F5FA]",
                      }}
                      triggerButton={
                        <div className="flex text-xs font-medium items-center gap-2">
                          <FilterIcon /> Filter
                        </div>
                      }
                      items={logsTabList == "exception" ? allExceptionLogColumns : allProcessLogColumns}
                      selectedKeys={visibleColumns}
                      setSelectedKeys={setVisibleColumns}
                      multiple
                      displaySelectedKeys={false}
                    />
                  </div>
                  <div>
                    <Tabs className={"pt-2 pr-2"} selectedKey={logsTabList} onSelectionChange={setLogTabList}>
                      <TabList className="flex w-full p-1 gap-2 bg-[#F4F5FA] items-center text-nowrap rounded-md">
                        <Tab id="log" className={`p-2 outline-none text-xs rounded-md font-semibold cursor-pointer ${logsTabList === 'log' ? 'bg-white' : ''}`}>
                          Log Details
                        </Tab>
                        <Tab id="exception" className={`p-2 outline-none text-xs rounded-md font-semibold cursor-pointer ${logsTabList === 'exception' ? 'bg-white' : ''}`}>
                          Exception Details
                        </Tab>
                      </TabList>
                    </Tabs>
                  </div>
                </div>
              }
            </div>
            <div className="pt-2">
              <Separator className="dark:border-[#212121]" />
            </div>
            {selectedAssemblerButton &&
              <div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex outline-none gap-5 pl-4">
                    <DropDown
                      isDarkMode={isDarkMode}
                      triggerButton="Tenant"
                      selectedKeys={selectedTenant}
                      setSelectedKeys={handleTenantselect}
                      items={tenantList}
                      classNames={{
                        triggerButton:
                          `min-w-40 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-sm justify-between",
                      }}
                    />

                    <DropDown
                      isDarkMode={isDarkMode}
                      triggerButton="AppGroup"
                      selectedKeys={selectAppGroup}
                      setSelectedKeys={handleAppGroupselect}
                      items={appGrpList}
                      classNames={{
                        triggerButton: `${selectedTenant
                          ? "min-w-40 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          : "backdrop-blur-3xl min-w-40 rounded-lg text-sm mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          }`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-sm justify-between",
                      }}
                    />

                    <DropDown
                      isDarkMode={isDarkMode}
                      triggerButton="App"
                      selectedKeys={selectApp}
                      setSelectedKeys={handleAppselect}
                      items={appList}
                      classNames={{
                        triggerButton: `${selectAppGroup
                          ? "min-w-40 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          : "backdrop-blur-3xl min-w-40 rounded-lg text-sm mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          }`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-sm justify-between",
                      }}
                    />

                    <DropDown
                      isDarkMode={isDarkMode}
                      triggerButton="version"
                      selectedKeys={selectedVersion}
                      setSelectedKeys={handleVersionselect}
                      items={versionList}
                      classNames={{
                        triggerButton: `${selectApp
                          ? "min-w-20 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          : "backdrop-blur-3xl min-w-20 rounded-lg text-sm mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          }`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-sm justify-between",
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-end mr-3 mt-2">
                    <Button
                      className={
                        "bg-[#FFF6F6] dark:bg-[#EF4444]/15 text-sm font-semibold outline-none rounded-md text-[#EF4444] px-5 py-1"
                      }
                    >
                      Clear
                    </Button>
                    <Button
                      className={
                        "bg-[#F1F1F1] dark:bg-[#0F0F0F] dark:text-white text-sm font-medium outline-none rounded-md text-black px-3 py-1"
                      }
                    >
                      Clear All
                    </Button>
                    <IoToggleSharp
                      size={25}
                      onClick={toggleDarkMode}
                      className="dark:text-white text-black/70"
                    />
                  </div>
                </div>
                <div>
                  <Separator className="mt-2 dark:border-[#212121]" />
                </div>
                <div className="flex w-full h-full">
                  <div className="w-[25%] pt-3 pl-4 rounded-lg">
                    <FabricSelector
                      tenant={selectedTenant}
                      appGrp={selectAppGroup}
                      app={selectApp}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                  <div className="w-[75%] pt-3 pr-2">
                    <MenuItemAccordian
                      data={menuItemData}
                      setData={setMenuItemData}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>
            }
            {selectedLogsButton &&
              <div className="w-full h-full">
                {logsTabList == "log" ? (
                  <ProcessLogs visibleColumns={visibleColumns} searchValue={searchValue} setShowNodeData={setShowNodeData} showNodeData={showNodeData} />
                ) : (logsTabList == "exception" && (
                  <ExceptionLog visibleColumns={visibleColumns} searchValue={searchValue} />
                ))
                }
              </div>
            }
          </div>}
      </div>
    </div>
  )
}

export default page;
