// import React, { useEffect, useState } from "react";

// import { Button } from "react-aria-components";

// import { PiAirplaneTiltFill } from "react-icons/pi";

// import { RiBankFill } from "react-icons/ri";

// import { ThreeDots } from "../../constants/svgApplications";

// import { useSelector } from "react-redux";

// import { RootState } from "../../../lib/Store/store";

// import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";
 
// const Card = ({

//   tenant,

//   tenantInfo,

//   searchTerm,

// }: {

//   tenant: string;

//   tenantInfo: any[];

//   searchTerm: string;

// }) => {

//   const [mappingAppGrp, setMappingAppGrp] = useState<any[]>([]);

//   const [selectedTenant, setSelectedTenant] = useState<string | null>(null);

//   const [selectedAppGroup, setSelectedAppGroup] = useState<string | null>(null);

//   const [selectedApp, setSelectedApp] = useState<string | null>(null);

//   const [artifactData, setArtifactData] = useState<any[]>([]);

//   const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
 
 
//   const dummyArtifactData = [

//     { name: "Artifact A" },
 
//   ];
 
//   useEffect(() => {

//     if (tenantInfo.length) {

//       const appGrpData: any[] = [];

//       if (tenant) {

//         const selectedTenantAg = tenantInfo.find((item) => item.name == tenant);

//         if (selectedTenantAg.appGroups && Array.isArray(selectedTenantAg.appGroups)) {

//           selectedTenantAg.appGroups.forEach((grpData: any, i: number) => {

//             const Ag = {

//               tenant: tenant,

//               name: grpData.name,

//               apps: [`${grpData.apps.length} Apps`],

//               applicationArray: grpData.apps,

//               icon: i % 2 === 0 ? <PiAirplaneTiltFill /> : <RiBankFill />,

//             };

//             appGrpData.push(Ag);

//           });

//         }

//       } else {

//         tenantInfo.forEach((item) => {

//           if (item.appGroups && Array.isArray(item.appGroups)) {

//             item.appGroups.forEach((grpData: any) => {

//               const Ag = {

//                 name: grpData.name,

//                 apps: [`${grpData.apps.length} Apps`],

//                 applicationArray: grpData.apps,

//                 icon: <RiBankFill />,

//                 tenant: item.name,

//               };

//               appGrpData.push(Ag);

//             });

//           }

//         });

//       }

//       setMappingAppGrp(appGrpData);

//     }

//   }, [tenant, tenantInfo]);
 
//   const handleCardClick = (item: { tenant: string; name: string }) => {

//     setSelectedTenant(item.tenant);

//     setSelectedAppGroup(item.name);

//     setSelectedApp(null);

//   };
 
//   const handleBreadcrumbClick = (level: string) => {

//     if (level === 'tenant') {

//       setSelectedTenant(null);

//       setSelectedAppGroup(null);

//       setSelectedApp(null);

//       setArtifactData([]);

//     } else if (level === 'appGroup') {

//       setSelectedAppGroup(null);

//       setSelectedApp(null);

//       setArtifactData([]);

//     } else if (level === 'app') {

//       setSelectedApp(null);

//       setArtifactData([]);

//     }

//   };
 
//   const handleAppClick = (app: any) => {
 
//     setSelectedApp(app.name);

//     setArtifactData(dummyArtifactData);
 
//   };
 
//   const handleartifactclick = (artifact: any) => {

//     setArtifactData(artifact);

//   }
 
//   const filteredAppGroups = mappingAppGrp.filter(

//     (ele) =>

//       ele.apps.some((app: string) => app.toLowerCase().includes(searchTerm.toLowerCase())) ||

//       ele.name.toLowerCase().includes(searchTerm.toLowerCase())

//   );
 
//   return (

//     <div className="flex flex-col gap-3 border border-black/15 p-3 w-full h-full rounded-md ml-4 bg-white dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">

//       <div className="flex justify-between">

//         <h1 className="text-sm font-semibold">AppGroups</h1>

//         <h2 className="text-xs">View all</h2>

//       </div>

//       {selectedTenant && selectedAppGroup ? (

//         <>

//           <Breadcrumbs className="flex items-center text-lg text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">

//             <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">

//               <Link onPress={() => handleBreadcrumbClick('tenant')}>

//                 {selectedTenant}

//               </Link>

//             </Breadcrumb>

//             <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">

//               <Link onPress={() => handleBreadcrumbClick('appGroup')}>

//                 {selectedAppGroup}

//               </Link>

//             </Breadcrumb>

//             {selectedApp && (

//               <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">

//                 <Link onPress={() => handleBreadcrumbClick('app')}>

//                   {selectedApp}

//                 </Link>

//               </Breadcrumb>

//             )}

//           </Breadcrumbs>

//           <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">

//             {filteredAppGroups

//               .filter((item) => item.tenant === selectedTenant && item.name === selectedAppGroup && item.applicationArray)

//               .map((item) =>

//                 item.applicationArray.map((app: any, index: number) => (

//                   <div key={index} className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]">

//                     {selectedApp === app.name ? (
 
//                       artifactData.map((artifact: any, artifactIndex: number) => (

//                         <div key={artifactIndex}>

//                           {artifact.name}

//                         </div>

//                       ))

//                     ) : (
 
//                       <Button className="flex ml-4 focus:outline-none" onPress={() => handleAppClick(app)}>

//                         {app.name}

//                       </Button>

//                     )}

//                   </div>

//                 ))

//               )}
 
//           </div>

//         </>

//       ) : (

//         <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">

//           {filteredAppGroups.map((item, index) => (

//             <div key={index} className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]">

//               <Button className="flex ml-4 focus:outline-none" onPress={() => handleCardClick(item)}>

//                 <div className="flex justify-between items-center w-full">

//                   <div className="flex gap-3 items-center">

//                     <div className="bg-white p-2 text-[#0736C4] rounded-md dark:bg-[#161616]">

//                       {item.icon}

//                     </div>

//                     <div className="flex flex-col">

//                       <h3 className="rounded-md text-xs font-medium">{item.name}</h3>

//                       <div className="text-[10px] text-start">

//                         {item.apps.map((app: any, appIndex: any) => (

//                           <div key={appIndex}>{app}</div>

//                         ))}

//                       </div>

//                     </div>

//                   </div>

//                   <ThreeDots fill={isDarkMode ? "white" : "black"} />

//                 </div>

//               </Button>

//             </div>

//           ))}

//         </div>

//       )}

//     </div>

//   );

// };
 
// export default Card;

import React, { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { RiBankFill } from "react-icons/ri";
import { Avatars, DataFabric, ProcessFabric, SecurityFabric, ThreeDots, UserFabric } from "../../constants/svgApplications";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";
import { AxiosService } from "../../../lib/utils/axiosService";
import { toast } from "react-toastify";
import TorusToast from "../torusComponents/torusToast";
import { LuLock } from "react-icons/lu";
import { getEncodedDetails } from "../../../lib/utils/cookiemgmt";

const Card = ({
  tenant,
  tenantInfo,
  searchTerm,
}: {
  tenant: string;
  tenantInfo: any[];
  searchTerm: string;
}) => {
  const [mappingAppGrp, setMappingAppGrp] = useState<any[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string | null>(tenant || null);
  const [selectAppGroup, setSelectAppGroup] = useState("")
  const [selectedApp, setSelectApp] = useState("")
  const [appList, setAppList] = useState<any[]>([]);
  const [artifactList, setArtifactList] = useState<any[]>([]);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const [wordLength, setWordLength] = useState(0);

  useEffect(() => {
    if (tenant) {
      fetchAppGroup(tenant);
    } else {
      fetchAppGroup();
    }
  }, [tenant]);

  const fetchAppGroup = async (tenant?: string) => {
    try {
      const givenTenant = tenant ? tenant : "ABC";
      const res = await AxiosService.get(`/tp/getappgrouplist?tenant=${givenTenant}`);
      if (res.status === 200) {
        const result = res.data.map((grpData: any, index: number) => ({ tenant: givenTenant, name: grpData, icon: <RiBankFill /> }));
        setMappingAppGrp(result);
      }
    } catch (error) {
      console.error("Error fetching app groups:", error);
    }
  };

  const fetchAppList = async (tenant: string, appGroup: string) => {
    try {
      const res = await AxiosService.get(`/tp/getapplist?tenant=${tenant}&appGroup=${appGroup}`);
      if (res.status === 200) {
        setAppList(res.data);
      }
    } catch (error) {
      console.error("Error fetching apps:", error);
    }
  };

  const getArtifactRelatedToBuild = async (app: string) => {
    try {
      setArtifactList([])
      const res = await AxiosService.post(`/tp/getArtifactRelatedToBuild`, {
        tenant: selectedTenant,
        app: app,
      })
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
            title: "Error Fetching ArtifactRelatedToBuild",
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
          title: "Error",
          text: `${error}`,
          closeButton: false,
        } as any
      )
    }
  }

  const handleCardClick = (item: { tenant: string; name: string }) => {
    setSelectedTenant(item.tenant);
    setSelectAppGroup(item.name)
    fetchAppList(item.tenant, item.name)
  };

  const handleBreadcrumbClick = (level: string) => {
    if (level === "tenant") {
      setSelectedTenant("");
      setSelectAppGroup("")
      setSelectApp("")
    } else if (level === "appGroup") {
      setSelectApp("")
    }
  };

  const handleAppClick = (app: string) => {
    setSelectApp(app)
    getArtifactRelatedToBuild(app)
  };

  const handleNavigateToModeller = (item: any) => {
    const { artifactName, version, fabric, catalog, artifactGrp } = item;
    const enCodedDetails = getEncodedDetails(
      fabric,
      "frk",
      catalog,
      artifactGrp,
      artifactName,
      version
    );
    window.location.href = `http://192.168.2.97:3000?tk=${enCodedDetails}`;
  };

  const filteredAppGroups = mappingAppGrp.filter(
    (ele) =>
      ele.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="flex flex-col gap-3 border border-black/15 p-3 w-full h-full rounded-md ml-4 bg-white dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
      <div className="flex justify-between">
        <h1 className="text-sm font-semibold">{selectedApp ? "Artifacts" : selectAppGroup ? "Apps" : "AppGroups"}</h1>
      </div>
      {selectedTenant ? (
        <>
          <Breadcrumbs className="flex items-center text-lg text-[color:var(--text-color)] m-0 p-0">
            <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_''] cursor-pointer outline-none">
              <Link onPress={() => handleBreadcrumbClick("tenant")}>
                {selectedTenant}
              </Link>
            </Breadcrumb>
            {selectAppGroup && (
              <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_''] cursor-pointer outline-none">
                <Link onPress={() => handleBreadcrumbClick("appGroup")}>
                  {selectAppGroup}
                </Link>
              </Breadcrumb>
            )}
            {selectedApp && (
              <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_''] cursor-pointer outline-none">
                <Link onPress={() => handleBreadcrumbClick("app")}>
                  {selectedApp}
                </Link>
              </Breadcrumb>
            )}
          </Breadcrumbs>
          <div>
            {selectedApp ? (
              <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-3 text-[#000000] gap-5 overflow-y-auto  pr-2 dark:bg-[1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
                {artifactList.length ? artifactList 
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
                      {/* <div className="flex items-center ml-auto gap-1">
                        {item.isLocked ? (
                          <LuLock className="ml-1 text-red-500" />
                        ) : null}
                        <ThreeDots fill={isDarkMode ? "white" : "black"} />
                      </div> */}
                      <div className=" mr-auto bg-[#0736C4]/5 rounded-md mb-3 p-1">
                        {getFabricIcon(item.fabric)}
                      </div>
                      <div
                        className="flex w-full justify-between text-[#000000] dark:text-[#FFFFFF] cursor-pointer"
                        onClick={() => handleNavigateToModeller(item)}
                      >
                        <h3 className="text-sm font-bold whitespace-nowrap ">
                          {item.artifactName.charAt(0).toUpperCase() +
                            item.artifactName.slice(1)}
                        </h3>
                        <div className=" text-xs dark:text-[#FFFFFF]/40 ">
                          {item.version}
                        </div>
                      </div>

                      <div className="flex w-full cursor-pointer"
                        onClick={() => handleNavigateToModeller(item)}
                      >
                        <p className="text-xs whitespace-nowrap text-black/40 dark:text-[#FFFFFF]/40">
                          {item.catalog} - {item.artifactGrp}
                        </p>
                      </div>
                      {/* <div className="w-[110%] border-b border-b-black/15 my-2"></div> */}
                      {/* <div className="flex w-full text-xs whitespace-nowrap justify-between px-1">
                        <div className="text-xs text-black/35 dark:text-[#FFFFFF]/40">
                          Last edited{" "}
                          {calculateRecentlyWorkingDetails(item.recentlyWorking)}
                          <div className="text-[#0736C4] font-medium">{loginId}</div>
                        </div>
                        <div className="">
                          <Avatars />
                        </div>
                      </div> */}
                    </div>
                  )): <div>No artifacts found</div>}
              </div>
            ) : (
              <div className="grid grid-cols-2 grid-rows-5 gap-3 text-xs rounded-md">
                {appList.map((app, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-2 bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]"
                  >
                    <Button
                      className="flex ml-4 focus:outline-none"
                      onPress={() => handleAppClick(app)}
                    >
                      {app}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">
          {filteredAppGroups.map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]"
            >
              <Button
                className="flex ml-4 focus:outline-none"
                onPress={() => handleCardClick(item)}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-3 items-center">
                    <div className="bg-white p-2 text-[#0736C4] rounded-md dark:bg-[#161616]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="rounded-md text-xs font-medium">{item.name}</h3>
                      {/* <div className="text-[10px] text-start">
                        {item.apps.map((app: any, appIndex: any) => (
                          <div key={appIndex}>{app}</div>
                        ))}
                      </div> */}
                    </div>
                  </div>
                  <ThreeDots fill={isDarkMode ? "white" : "black"} />
                </div>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
