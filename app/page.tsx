"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Input,
  Popover,
  Tab,
  TabList,
  Tabs,
} from "react-aria-components";
import { Separator } from "react-aria-components";
import FabricSelector from "./components/Tab";
import MenuItemAccordian from "./components/builderScreen/MenuItemAccordian";
import { AxiosService } from "../lib/utils/axiosService";
import { toast } from "react-toastify";
import DropDown from "./components/multiDropdownnew";
import {
  ColumnIcon,
  LogHubIcon,
  AssemblerIcon,
  SearchIcon,
  FilterIcon
} from "./constants/svgApplications";
import { menuItems, TreeNode } from "./constants/MenuItemTree";
import BuilderTopNav from "./components/builderScreen/BuilderTopNav";
import BuilderSideNav from "./components/builderScreen/BuilderSideNav";
import ProcessLogs from "./components/torusComponents/processLog";
import ExceptionLog from "./components/torusComponents/ExceptionLog";
import Artifactdetails from "./components/landingScreen/artifactdetails";
import ProgressButton from "./components/progressbar";
import TorusToast from "./components/torusComponents/torusToast";
import { useSelector } from "react-redux";
import { RootState } from "../lib/Store/store";

const page = () => {
  const [selectedAssemblerButton, setSelectedAssemblerButton] = useState(true);
  const [selectedLogsButton, setSelectedLogsButton] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<string>("");
  const [selectAppGroup, setSelectAppGroup] = useState<string>("");
  const [selectApp, setSelectApp] = useState<string>("");
  const [tenantList, setTenantList] = useState<string[]>([]);
  const [appGrpList, setAppGrpList] = useState<string[]>([]);
  const [appList, setAppList] = useState<string[]>([]);
  const [menuItemData, setMenuItemData] = useState<TreeNode[]>(menuItems);
  const [versionList, setVersionList] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const [logsTabList, setLogTabList] = useState<"exception" | "log" | any>(
    "log"
  );
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
  const allExceptionLogColumns = ["key", "version", "timeStamp", "errorCode"];
  const [visibleColumns, setVisibleColumns] =
    useState<any>(allProcessLogColumns);
  const [showNodeData, setShowNodeData] = useState<null | any>(null);
  const [isLoading, setLoading] = useState(true);
  const [wordLength, setWordLength] = useState(0);

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
    setSelectedVersion("");
    setVersionList([]);
    fetchAppGroup(e);
  };

  const handleAppGroupselect = (e: any) => {
    setAppList([]);
    setVersionList([]);
    setSelectedVersion("");
    setSelectAppGroup(e);
    setSelectApp("");
    fetchApp(selectedTenant, e);
  };
  const handleAppselect = (e: any) => {
    setSelectedVersion("");
    setSelectApp(e);
    getAssemblerVersion(e);
  };
  const handleVersionselect = (e: any) => {
    setSelectedVersion(e);
    getAssemblerData(e);
  };

  const fetchTenants = async () => {
    try {
      const res = await AxiosService.get("/tp/getClientTenant?type=c");
      if (res.status == 200) {
        setTenantList(res.data as string[]);
      }
    } catch (error: any) {
      const { data } = error.response;
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Tenant",
          text: `${data.errorDetails.message}`,
          closeButton: false,
        } as any
      );
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
    } catch (error: any) {
      const { data } = error.response;
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Tenant",
          text: `${data.errorDetails.message}`,
          closeButton: false,
        } as any
      );
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
    } catch (error: any) {
      const { data } = error.response;
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Tenant",
          text: `${data.errorDetails.message}`,
          closeButton: false,
        } as any
      );
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
        setVersionList(
          res.data.sort(
            (a: any, b: any) =>
              parseInt(b.replace("v", "")) - parseInt(a.replace("v", ""))
          )
        );
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
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `Build saved successfully`,
            closeButton: false,
          } as any
        );
      }
    } catch (error: any) {
      const { data } = error.response;
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error saving build",
          text: `${typeof data.errorDetails == "string"
            ? data.errorDetails
            : data.errorDetails.message
            }`,
          closeButton: false,
        } as any
      );
    }
  };

  const handleUpdateBuild = async () => {
    try {
      const res = await AxiosService.post("/tp/updateAssemblerData", {
        key: `TGA:ARK:RELEASE:${selectedTenant}:${selectAppGroup}:${selectApp}:${selectedVersion}`,
        data: menuItemData,
      });
      if (res.status == 201) {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `Build saved successfully`,
            closeButton: false,
          } as any
        );
      }
    } catch (error: any) {
      const { data } = error.response;
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error updating build",
          text: `${typeof data.errorDetails == "string"
            ? data.errorDetails
            : data.errorDetails.message
            }`,
          closeButton: false,
        } as any
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ProgressButton isIndeterminate size={"xl"} />{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-[#F4F5FA]">
      <BuilderTopNav
        showNodeData={showNodeData}
        setShowNodeData={setShowNodeData}
      />
      <div className="flex justify-between w-full h-[94%] dark:bg-[#0F0F0F]">
        <BuilderSideNav />
        {showNodeData ? (
          <div className="flex flex-col w-[94%] h-[95%] mt-[1.46vw] mr-[0.87vw] rounded-md">
            <Artifactdetails nodeData={showNodeData} />
          </div>
        ) : (
          <div className="flex flex-col w-[94%] h-[89.07vh] border border-black/15 dark:border-black/15 bg-white mt-[1.46vw] overflow-y-hidden dark:bg-[#161616] rounded-md mr-[0.87vw] scrollbar-hide">
            <div className="flex w-full h-[6.66vh] items-center justify-between">
              <div className="flex gap-5 pt-2 pl-4">
                <Button
                  className={`${selectedAssemblerButton ? "text-[#1A2024] dark:text-white" : "text-[#1A2024]/35 dark:text-[white]/35"
                    } flex text-[0.93vw] leading-[2.22vh] font-semibold items-center gap-3 rounded-lg border-none outline-none`}
                  onPress={handleBuildButtonSelect}
                >
                  <AssemblerIcon fill={!selectedAssemblerButton ? "#A6A6A6" : isDarkMode ? "white" : "black"} />
                  Assembler
                </Button>
                <Button
                  className={`${selectedLogsButton ? "text-[#1A2024] dark:text-white" : "text-[#1A2024]/35 dark:text-[white]/35"
                    } flex text-[0.93vw] leading-[2.22vh] font-semibold items-center gap-3 rounded-lg border-none outline-none`}
                  onPress={handleHistoryButtonSelect}
                >
                  {" "}
                  <LogHubIcon fill={!selectedLogsButton ? "#A6A6A6" : isDarkMode ? "white" : "black"} />
                  Logs Hub
                </Button>
              </div>
              {selectedAssemblerButton && (
                <div className="flex pt-2 pr-3 gap-2 items-center">
                  <Button
                    onPress={handleUpdateBuild}
                    isDisabled={!selectedVersion}
                    className={`text-[0.83vw] leading-[2.22vh] rounded-md border-none text-[#4CAF50] disabled:cursor-not-allowed bg-[#4CAF50]/15 px-5 py-2 outline-none`}
                  >
                    Update
                  </Button>
                  <Button
                    onPress={handleSaveBuild}
                    isDisabled={!selectApp}
                    className={`text-[0.83vw] leading-[2.22vh] rounded-md border-none text-[#0736C4] disabled:cursor-not-allowed bg-[#0736C4]/15 px-5 py-2 outline-none`}
                  >
                    Save
                  </Button>
                  <Button
                    className={
                      "text-[0.83vw] leading-[2.22vh] rounded-md border-none text-white disabled:cursor-not-allowed bg-[#0736C4] px-5 py-2 outline-none"
                    }
                  >
                    Build
                  </Button>
                </div>
              )}
              {selectedLogsButton && (
                <div className="flex gap-2 items-center justify-between w-[70%]">
                  <div className="flex w-full gap-[0.58vw] items-center pt-[0.58vw">
                    <div className="relative w-[60%] h-[4vh] ">
                      <span className="absolute inset-y-0 left-0 flex items-center p-[0.58vw] h-[2.18vw] w-[2.18vw] ">
                        <SearchIcon fill={isDarkMode ? "white" : "black"} height="0.83vw" width="0.83vw"/>
                      </span>
                      <Input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search"
                        className={`w-full p-[0.29vw] text-[0.72vw] h-[4vh] focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 border pl-[1.76vw] font-medium rounded-md dark:border-[#212121] dark:text-white`}
                      />
                    </div>
                    <DropDown
                      classNames={{
                        popover: "w-[10vw] h-[25vh] overflow-y-auto",
                        triggerButton:
                          "w-[5.5vw] h-[4vh] border border-black/15 rounded-lg bg-[#F4F5FA] dark:border-[#212121] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]",
                      }}
                      triggerButton={
                        <div className="flex text-[0.72vw] font-medium items-center gap-[0.29vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]">
                          <ColumnIcon fill={isDarkMode ? "white" : "black"} height="0.83vw" width="0.83vw"/>{" "}
                          Columns
                        </div>
                      }
                      items={
                        logsTabList == "exception"
                          ? allExceptionLogColumns
                          : allProcessLogColumns
                      }
                      selectedKeys={visibleColumns}
                      setSelectedKeys={setVisibleColumns}
                      multiple
                      displaySelectedKeys={false}
                    />
                    <DropDown
                      classNames={{
                        popover: "w-[10vw] h-[25vh] overflow-y-auto",
                        triggerButton:
                          "w-[4.2vw] h-[4vh] border border-black/15 rounded-lg dark:border-[#212121] bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]",
                      }}
                      triggerButton={
                        <div className="flex text-[0.72vw] font-medium items-center gap-[0.29vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ">
                          <FilterIcon fill={isDarkMode ? "white" : "black"} />{" "}
                          Filter
                        </div>
                      }
                      items={
                        logsTabList == "exception"
                          ? allExceptionLogColumns
                          : allProcessLogColumns
                      }
                      selectedKeys={visibleColumns}
                      setSelectedKeys={setVisibleColumns}
                      multiple
                      displaySelectedKeys={false}
                    />
                  </div>
                  <div>
                    <Tabs
                      className={"pt-[0.58vw] pr-[0.58vw]"}
                      selectedKey={logsTabList}
                      onSelectionChange={setLogTabList}
                    >
                      <TabList className="flex w-full p-[0.29vw] gap-[0.58vw] bg-[#F4F5FA] items-center text-nowrap rounded-md dark:bg-[#0F0F0F] dark:text-[#FFFFFF]">
                        <Tab
                          id="log"
                          className={`p-[0.58vw] outline-none text-[0.7vw] rounded-md font-semibold cursor-pointer dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ${logsTabList === "log"
                            ? "bg-white dark:bg-[#161616]"
                            : ""
                            }`}
                        >
                          Log Details
                        </Tab>
                        <Tab
                          id="exception"
                          className={`p-[0.58vw] outline-none text-[0.7vw] rounded-md font-semibold cursor-pointer dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ${logsTabList === "exception"
                            ? "bg-white dark:bg-[#161616]"
                            : ""
                            }`}
                        >
                          Exception Details
                        </Tab>
                      </TabList>
                    </Tabs>
                  </div>
                </div>
              )}
            </div>
            <div className="pt-2">
              <Separator className="dark:border-[#212121]" />
            </div>
            {selectedAssemblerButton && (
              <div>
                <div className="flex w-full justify-between items-center">
                  <div className="flex outline-none gap-5 pl-4">
                    <DropDown
                      triggerButton="Tenant"
                      selectedKeys={selectedTenant}
                      setSelectedKeys={handleTenantselect}
                      items={tenantList}
                      classNames={{
                        triggerButton: `min-w-40  pressed:animate-torusButtonActive rounded-lg text-[0.83vw] leading-[2.22vh] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-[0.83vw] leading-[2.22vh] justify-between",
                      }}
                    />

                    <DropDown
                      triggerButton="AppGroup"
                      selectedKeys={selectAppGroup}
                      setSelectedKeys={handleAppGroupselect}
                      items={appGrpList}
                      classNames={{
                        triggerButton: `${selectedTenant
                          ? "min-w-40 pressed:animate-torusButtonActive rounded-lg text-[0.83vw] leading-[2.22vh] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          : "backdrop-blur-3xl min-w-40 rounded-lg text-[0.83vw] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          }`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-[0.83vw] leading-[2.22vh] justify-between",
                      }}
                    />

                    <DropDown
                      triggerButton="App"
                      selectedKeys={selectApp}
                      setSelectedKeys={handleAppselect}
                      items={appList}
                      classNames={{
                        triggerButton: `${selectAppGroup
                          ? "min-w-40 pressed:animate-torusButtonActive rounded-lg text-[0.83vw] leading-[2.22vh] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          : "backdrop-blur-3xl min-w-40 rounded-lg text-[0.83vw] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          }`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-[0.83vw] leading-[2.22vh] justify-between",
                      }}
                    />

                    <DropDown
                      triggerButton="version"
                      selectedKeys={selectedVersion}
                      setSelectedKeys={handleVersionselect}
                      items={versionList}
                      classNames={{
                        triggerButton: `${selectApp
                          ? "min-w-20 pressed:animate-torusButtonActive rounded-lg text-[0.83vw] leading-[2.22vh] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          : "backdrop-blur-3xl min-w-20 rounded-lg text-[0.83vw] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white"
                          }`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-[0.83vw] leading-[2.22vh] justify-between",
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-end mr-3 mt-2">
                    <Button
                      className={
                        "bg-[#FFF6F6] dark:bg-[#EF4444]/15 text-[0.72vw] leading-[1.85vh] font-medium outline-none rounded-md text-[#EF4444] px-6 py-2.5"
                      }
                      onPress={() => {
                        document
                          .getElementById("triggerClearKeyFunctionality")
                          ?.click();
                      }}
                    >
                      Clear
                    </Button>
                    <DialogTrigger>
                      <Button
                        className={
                          "bg-[#F1F1F1] dark:bg-[#0F0F0F] dark:text-white text-[0.72vw] leading-[1.85vh] font-medium outline-none rounded-md text-black px-4 py-2.5"
                        }
                      >
                        Clear All
                      </Button>
                      <Popover placement="bottom" className={`w-[20vw]`}>
                        <Dialog className="border bg-white dark:bg-[#161616] dark:text-white dark:border-[#212121] focus:outline-none rounded-lg">
                          {({ close }) => (
                            <div className="p-4 rounded-2xl flex flex-col gap-3">
                              <div className="text-[0.72vw] leading-[1.85vh] font-medium p-1">
                                Are you sure you want to clear all Menu Items?
                              </div>
                              <Button
                                className={`outline-none bg-red-500 px-2 py-1 text-[0.72vw] leading-[1.85vh] font-medium self-end rounded text-white`}
                                onPress={() => {
                                  setMenuItemData([]);
                                  close();
                                }}
                              >
                                delete
                              </Button>
                            </div>
                          )}
                        </Dialog>
                      </Popover>
                    </DialogTrigger>
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
                    />
                  </div>
                  <div className="w-[75%] pt-3 pr-2">
                    <MenuItemAccordian
                      data={menuItemData}
                      setData={setMenuItemData}
                    />
                  </div>
                </div>
              </div>
            )}
            {selectedLogsButton && (
              <div className="w-full h-full">
                {logsTabList == "log" ? (
                  <div className="w-[98%] ml-2 h-full">
                    <ProcessLogs
                      visibleColumns={visibleColumns}
                      searchValue={searchValue}
                      setShowNodeData={setShowNodeData}
                      showNodeData={showNodeData}
                    />
                  </div>
                ) : (
                  logsTabList == "exception" && (
                    <ExceptionLog
                      visibleColumns={visibleColumns}
                      searchValue={searchValue}
                    />
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
