import React, { useEffect, useState } from "react";
import { Button, Tab, TabList, Tabs } from "react-aria-components";
import { LuLock } from "react-icons/lu";
import {
  Avatars,
  DataFabric,
  FilterIcon,
  ProcessFabric,
  SecurityFabric,
  ThreeDots,
  UserFabric,
} from "../../constants/svgApplications";
import { AxiosService } from "../../../lib/utils/axiosService";
import { getCookie, getEncodedDetails } from "../../../lib/utils/cookiemgmt";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import TorusDialog from "../torusdialogmodal";
import FilterModal from "./filterModal";
import { toast } from "react-toastify";
import TorusToast from "../torusComponents/torusToast";
import { sortingConditions } from "../../constants/MenuItemTree"

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
  const [selectedSortButton, setSelectedSortButton] = useState<sortingConditions>("Newest");

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
        )
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
      )
    }
  };

  useEffect(() => {
    getArtifact(artifactType, fabric);
  }, [artifactType, fabric, fabricList, catalogs, artifactGrps, selectedSortButton]);

  const getFabricIcon = (fab: string) => {
    switch (fab) {
      case "df":
        return <DataFabric fill="#0736C4" />;
      case "pf":
        return <ProcessFabric fill="#13CC78" />;
      case "sf":
        return <SecurityFabric fill="#FFBE00" />;
      case "uf":
        return <UserFabric fill="#03A9F4" />;
      default:
        return <DataFabric fill="#0736C4" />;
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
      })
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
      )
    }
  }

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
  }, [artifactType])

  const getAllArtifactGrp = async () => {
    try {
      const res = await AxiosService.post(`/tp/getAllArtifactGrp`, {
        artifactType: artifactType,
      })
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
      )
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-white border border-gray-300 p-2 rounded-md dark:bg-[#1D1D1D] text-[#FFFFFF] dark:border-[#212121]">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-black dark:text-[#FFFFFF] py-2">
          My Library
        </h1>
        <TorusDialog
          triggerElement={
            <Button className=" outline-none flex items-center gap-2 text-xs dark:bg-[#0F0F0F] dark:border-[#212121] text-black font-medium border border-black/15 rounded-md px-3 h-6 cursor-pointer dark:text-[#FFFFFF]">
              Filter
              <FilterIcon fill={isDarkMode ? "#FFFFFF" : "#000000"}/>
            </Button>
          }
          classNames={{
            modalClassName: "justify-end pr-2 pt-16 ",
            dialogClassName:
              "bg-white border rounded p-2 h-[85vh] w-[20vw] overflow-y-auto outline-none",
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
      <Tabs selectedKey={artifactType} onSelectionChange={setArtifactType}>
        <TabList
          className="flex gap-5 rounded-md p-1  bg-[#F4F5FA] text-sm text-black  items-center dark:bg-[#0F0F0F] dark:text-[#FFFFFF] dark:border-[#212121]"
          aria-label="Tabs"
        >
          <Tab
            id={"frk"}
            className={({ isSelected }) =>
              `${isSelected
                ? "bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#212121]"
                : "outline-none text-xs font-semibold ml-2 "
              } cursor-pointer`
            }
          >
            {" "}
            My Artifacts
          </Tab>
          <Tab
            id={"tpfrk"}
            className={({ isSelected }) =>
              `${isSelected
                ? "bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#212121]"
                : "outline-none text-xs font-semibold ml-2"
              } cursor-pointer`
            }
          >
            Shared with Me
          </Tab>
          <Tab
            id={"crk"}
            className={({ isSelected }) =>
              `${isSelected
                ? "bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#212121]"
                : "outline-none text-xs font-semibold ml-2"
              } cursor-pointer`
            }
          >
            Purchased
          </Tab>
         
        </TabList>
      </Tabs>
      <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 text-[#000000] gap-5 overflow-y-auto  pr-2 dark:bg-[1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
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
              className="border border-gray-300 bg-[#F4F5FA] dark:bg-[#0F0F0F] p-3 flex flex-col items-center justify-center rounded-md dark:border-[#212121]"
            >
              <div className="flex items-center ml-auto gap-1">
                {item.isLocked ? (
                  <LuLock className="ml-1 text-red-500" />
                ) : null}
                <ThreeDots fill={isDarkMode ? "white" : "black"} />
              </div>
              <div className=" mr-auto bg-[#0736C4]/5 rounded-md mb-3 p-1">
                {getFabricIcon(item.fabric)}
              </div>
              <div className="flex w-full justify-between text-[#000000] dark:text-[#FFFFFF] cursor-pointer" onClick={() => handleNavigateToModeller(item)}>
                <h3 className="text-sm font-bold whitespace-nowrap ">
                  {item.artifactName.charAt(0).toUpperCase() +
                    item.artifactName.slice(1)}
                </h3>
                <div className=" text-xs dark:text-[#FFFFFF]/40 ">
                  {item.version}
                </div>
              </div>

              <div className="flex w-full cursor-pointer" onClick={() => handleNavigateToModeller(item)}>
                <p className="text-xs whitespace-nowrap text-black/40 dark:text-[#FFFFFF]/40">
                  {item.catalog} - {item.artifactGrp}
                </p>
              </div>
              <div className="w-[110%] border-b border-b-black/15 my-2"></div>
              <div className="flex w-full text-xs whitespace-nowrap justify-between px-1">
                <div className="text-xs text-black/35 dark:text-[#FFFFFF]/40">
                  Last edited{" "}
                  {calculateRecentlyWorkingDetails(item.recentlyWorking)}
                  <div className="text-[#0736C4] font-medium">{loginId}</div>
                </div>
                <div className="">
                  <Avatars />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tabcard;
