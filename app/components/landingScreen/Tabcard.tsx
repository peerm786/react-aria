import React, { ChangeEvent, useEffect, useState } from "react";
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
import {
  Avatars,
  DataFabric,
  FilterIcon,
  ProcessFabric,
  SecurityFabric,
  ThreeDots,
  UserFabric,
  LockIcon,
} from "../../constants/svgApplications";
import { AxiosService } from "../../../lib/utils/axiosService";
import { getCookie, getEncodedDetails } from "../../../lib/utils/cookiemgmt";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import TorusDialog from "../torusdialogmodal";
import FilterModal from "./filterModal";
import { toast } from "react-toastify";
import TorusToast from "../torusComponents/torusToast";
import { sortingConditions } from "../../constants/MenuItemTree";
import ArtifactContextMenu from "./contextMenu/contextMenu";
import { TbPinFilled } from "react-icons/tb";

const Tabcard = ({
  fabric,
  searchTerm,
}: {
  fabric: string;
  searchTerm: string;
}) => {
  const [artifactType, setArtifactType] = useState<any>("frk");
  const [artifactList, setArtifactList] = useState<any>([]);
  const [fabricList, setFabricList] = useState<Set<string>>(new Set([]));
  const [catalogs, setCatalogs] = useState<Set<string>>(new Set());
  const [catalogList, setCatalogList] = useState([]);
  const [artifactGrps, setArtifactGrps] = useState<Set<string>>(new Set());
  const [artifactGrpList, setArtifactGrpList] = useState([]);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const client = getCookie("client");
  const loginId = getCookie("loginId");
  const [wordLength, setWordLength] = useState(0);
  const [selectedSortButton, setSelectedSortButton] =
    useState<sortingConditions>("Newest");
  const [isInput, setInput] = useState<{
    id: number | undefined;
    name: string;
  }>({ id: undefined, name: "" });
  const [refetchOnContextMenu, setRefetchOnContextMenu] = useState<any>(false);

  const getArtifact = async (type: string, fabric?: string) => {
    try {
      const res = await AxiosService.post(`/tp/getArtifactDetail`, {
        artifactType: type,
        client: client,
        loginId: loginId,
        fabric: fabric
          ? fabric
          : fabricList.size
          ? Array.from(fabricList)
          : fabric,
        catalog: catalogs.size ? Array.from(catalogs) : undefined,
        artifactGrp: artifactGrps.size ? Array.from(artifactGrps) : undefined,
        sortOrder: selectedSortButton ? selectedSortButton : "Newwest",
      });
      if (res.status === 201) {
        setArtifactList(res.data);
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Error Fetching Artifacts",
            text: `Something went wrong`,
            closeButton: false,
          } as any
        );
      }
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Artifacts",
          text: `${error}`,
          closeButton: false,
        } as any
      );
    }
  };

  useEffect(() => {
    getArtifact(artifactType, fabric);
  }, [
    artifactType,
    fabric,
    fabricList,
    catalogs,
    artifactGrps,
    selectedSortButton,
    refetchOnContextMenu,
  ]);

  const getFabricIcon = (fab: string) => {
    switch (fab) {
      case "df":
        return (
          <DataFabric
            fill={isDarkMode ? "#3063FF" : "#0736C4"}
            width="1.04vw"
            height="1.04vw"
          />
        );
      case "pf":
        return (
          <ProcessFabric
            fill={isDarkMode ? "#3063FF" : "#0736C4"}
            width="1.04vw"
            height="1.04vw"
          />
        );
      case "sf":
        return (
          <SecurityFabric
            fill={isDarkMode ? "#3063FF" : "#0736C4"}
            width="1.04vw"
            height="1.04vw"
          />
        );
      case "uf":
        return (
          <UserFabric
            fill={isDarkMode ? "#3063FF" : "#0736C4"}
            width="1.04vw"
            height="1.04vw"
          />
        );
      default:
        return (
          <DataFabric
            fill={isDarkMode ? "#3063FF" : "#0736C4"}
            width="1.04vw"
            height="1.04vw"
          />
        );
    }
  };

  const calculateRecentlyWorkingDetails = (date: string) => {
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `Just now`;
    }
  };

  const getAllCatalogs = async () => {
    try {
      const res = await AxiosService.post(`/tp/getAllCatalogs`, {
        artifactType: artifactType,
      });
      setCatalogList(res.data);
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Catalogs",
          text: `${error}`,
          closeButton: false,
        } as any
      );
    }
  };

  const handleNavigateToModeller = (item: any) => {
    const { artifactName, version, fabric, catalog, artifactGrp } = item;
    const enCodedDetails = getEncodedDetails(
      fabric,
      artifactType,
      catalog,
      artifactGrp,
      artifactName,
      version
    );
    window.location.href = `http://192.168.2.89:3000?tk=${enCodedDetails}`;
  };

  useEffect(() => {
    getAllCatalogs();
    getAllArtifactGrp();
  }, [artifactType]);

  const getAllArtifactGrp = async () => {
    try {
      const res = await AxiosService.post(`/tp/getAllArtifactGrp`, {
        artifactType: artifactType,
      });
      setArtifactGrpList(res.data.filter(Boolean));
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Tenant",
          text: `${error}`,
          closeButton: false,
        } as any
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangeArtifactName = async (item: any) => {
    try {
      if (item.artifactName == isInput.name) {
        setInput({ id: undefined, name: "" });
        return;
      }
      const res = await AxiosService.post(`/tp/renameArtifact`, {
        artifactType: item.artifactType,
        fabric: item.fabric,
        catalog: item.catalog,
        artifactGrp: item.artifactGrp,
        oldName: item.artifactName,
        newName: isInput.name,
      });
      if (res.status === 201) {
        setInput({ id: undefined, name: "" });
        getArtifact(artifactType);
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Error Fetching Artifacts",
            text: `${res.data}`,
            closeButton: false,
          } as any
        );
      }
    } catch (error) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error Fetching Artifacts",
          text: `${error}`,
          closeButton: false,
        } as any
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white border border-gray-300 p-[0.87vw] rounded-md dark:bg-[#1D1D1D] text-[#FFFFFF] dark:border-[#212121]">
      <div className="flex items-center justify-between">
        <h1 className="text-[0.93vw] font-semibold leading-[2vh] text-black dark:text-[#FFFFFF] py-[0.58vw]">
          My Library
        </h1>
        <TorusDialog
          triggerElement={
            <Button className=" outline-none flex items-center gap-[0.29vw] text-[0.69vw] leading-[2.22vh] dark:bg-[#0F0F0F] dark:border-[#212121] text-black border border-black/15 rounded-md px-[0.8vw] py-[0.1vw] cursor-pointer dark:text-[#FFFFFF]">
              Filter
              <FilterIcon fill={isDarkMode ? "#FFFFFF" : "#000000"} />
            </Button>
          }
          classNames={{
            modalClassName: "justify-end pr-[1.46vw] pt-[6.6vw]",
            dialogClassName:
              "bg-white border rounded p-[0.58vw] h-[79.18vh] w-[14.89vw] outline-none",
          }}
        >
          <FilterModal
            fabrics={fabricList}
            setFabrics={setFabricList}
            catalogs={catalogs}
            setCatalogs={setCatalogs}
            artifactGrps={artifactGrps}
            setArtifactGrps={setArtifactGrps}
            catalogList={catalogList}
            artifactGrpList={artifactGrpList}
            selectedSortButton={selectedSortButton}
            setSelectedSortButton={setSelectedSortButton}
          />
        </TorusDialog>
      </div>
      <div className="flex flex-col pl-[0.58vw] h-[70.37vh]">
        <Tabs
          className={"pt-[0.58vw]"}
          selectedKey={artifactType}
          onSelectionChange={setArtifactType}
        >
          <TabList
            className="flex w-[26.3vw] text-nowrap rounded-lg p-[0.29vw] bg-[#F4F5FA] text-black items-center dark:bg-[#0F0F0F] dark:text-[#FFFFFF] dark:border-[#212121]"
            aria-label="Tabs"
          >
            <Tab
              id={"frk"}
              className={({ isSelected }) =>
                `${
                  isSelected
                    ? "bg-white transition duration-300 ease-in-out rounded-md p-[0.55vw] font-bold dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#212121]"
                    : "font-semibold"
                } cursor-pointer outline-none w-[8.67vw] text-center text-[0.67vw] leading-[1.85vh]`
              }
            >
              {" "}
              My Artifacts
            </Tab>
            <Tab
              id={"tpfrk"}
              className={({ isSelected }) =>
                `${
                  isSelected
                    ? "bg-white transition duration-300 ease-in-out rounded-md p-[0.55vw] font-bold dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#212121]"
                    : "font-semibold"
                } cursor-pointer outline-none w-[8.67vw] text-center text-[0.67vw] leading-[1.85vh]`
              }
            >
              Shared with Me
            </Tab>
            <Tab
              id={"crk"}
              className={({ isSelected }) =>
                `${
                  isSelected
                    ? "bg-white transition duration-300 ease-in-out rounded-md p-[0.55vw] font-bold dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#212121]"
                    : "font-semibold"
                } cursor-pointer outline-none w-[8.67vw] text-center text-[0.67vw] leading-[1.85vh]`
              }
            >
              Purchased
            </Tab>
          </TabList>
        </Tabs>
        <div className="pt-[1.17vw] grid sm:grid-cols-2 xl:grid-cols-3 text-[#000000] gap-[1.46vw] overflow-y-auto pr-[0.58vw] dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
          {artifactList
            .filter(
              (ele: any) =>
                ele.artifactName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                ele.catalog.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ele.artifactGrp.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item: any, index: number) => (
              <div
                key={index}
                className="w-[15.15vw] h-[9.5vw] border border-black/15 bg-[#F4F5FA] dark:bg-[#0F0F0F] flex flex-col items-center justify-center rounded-md dark:border-[#212121]"
              >
                <div className="w-full p-[0.58vw]">
                  <div className="flex w-full justify-between">
                    <div className="self-start bg-[#0736C4]/15 rounded-md mb-[0.87vw] w-[2.18vw] h-[2.18vw]">
                      <div className="w-full h-full flex items-center justify-center">
                        {getFabricIcon(item.fabric)}
                      </div>
                    </div>
                    <div className="flex items-center gap-[0.29vw] pb-[1.75vw]">
                      {item.isUserPinned ? (
                        <TbPinFilled fill="#0736C4" />
                      ) : null}
                      {item.isLocked ? <LockIcon /> : null}
                      <DialogTrigger>
                        <Button
                          className={`focus:outline-[#000000]/15 p-[0.29vw] items-center`}
                        >
                          <ThreeDots fill={isDarkMode ? "white" : "black"} />
                        </Button>
                        <Popover
                          placement="bottom right"
                          style={{ zIndex: 10 }}
                        >
                          <Dialog className="outline-none">
                            {({ close }) => (
                              <ArtifactContextMenu
                                artifactName={item.artifactName}
                                artifactGrp={item.artifactGrp}
                                artifactType={item.artifactType}
                                catalog={item.catalog}
                                isLocked={item.isLocked}
                                version={item.version}
                                fabric={item.fabric}
                                index={index}
                                close={close}
                                setInput={setInput}
                                setRefetchOnContextMenu={
                                  setRefetchOnContextMenu
                                }
                                artifactDetails={item}
                              />
                            )}
                          </Dialog>
                        </Popover>
                      </DialogTrigger>
                    </div>
                  </div>
                  <div
                    className="flex w-full items-center justify-between text-[#000000] dark:text-[#FFFFFF] cursor-pointer"
                    onClick={() => {
                      if (index == isInput.id) return;
                      handleNavigateToModeller(item);
                    }}
                  >
                    {isInput.id === index ? (
                      <Input
                        defaultValue={item.artifactName}
                        onChange={handleInputChange}
                        onBlur={() => handleChangeArtifactName(item)}
                        onKeyDown={(e) => {
                          if (e.key == "Enter") handleChangeArtifactName(item);
                        }}
                        className={`bg-[#F4F5FA] w-[80%] text-[0.83vw] leading-[1.7vh] font-semibold focus:outline-none dark:bg-[#161616] dark:text-white rounded-md`}
                       />
                    ) : (
                      <h3 className="text-[0.83vw] leading-[1.7vh] font-semibold whitespace-nowrap">
                        {item.artifactName.charAt(0).toUpperCase() +
                          item.artifactName.slice(1)}
                      </h3>
                    )}
                    <div className="text-[0.72vw] leading-[1.29vh] pr-[0.58vw] font-medium text-black/35 dark:text-[#FFFFFF]/35 ">
                      {item.version}
                    </div>
                  </div>
                  <div
                    className="flex w-full cursor-pointer"
                    onClick={() => handleNavigateToModeller(item)}
                  >
                    <p className="pt-[0.29vw] text-[0.62vw] leading-[1.34vh] font-medium whitespace-nowrap text-black/40 dark:text-[#FFFFFF]/40">
                      {item.catalog} - {item.artifactGrp}
                    </p>
                  </div>
                </div>

                <div className="w-full border-b border-b-black/15 dark:border-[#212121]"></div>

                <div className="w-full p-[0.58vw]">
                  <div className="flex w-full text-xs whitespace-nowrap justify-between">
                    <div className="flex flex-col text-[0.52vw] leading-[1.66vh] font-medium text-black/40 dark:text-[#FFFFFF]/40">
                      Last edited{" "}
                      {calculateRecentlyWorkingDetails(item.recentlyWorking)}
                      <span className="text-[#0736C4] text-[0.62vw] leading-[1.66vh] font-medium">
                        {loginId.charAt(0).toUpperCase() + loginId.slice(1)}
                      </span>
                    </div>
                    <div>
                      <Avatars />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tabcard;
