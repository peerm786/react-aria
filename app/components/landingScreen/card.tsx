// import React, { useEffect, useState } from "react";
// import { Button } from "react-aria-components";
// import { PiAirplaneTiltFill } from "react-icons/pi";
// import { RiBankFill } from "react-icons/ri";
// import { ThreeDots } from "../../constants/svgApplications";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../lib/Store/store";
// import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";
// import { AxiosService } from "../../../lib/utils/axiosService";

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
//   const [selectedTenant, setSelectedTenant] = useState<string | null>(tenant || null);


//   const [appGrpList, setAppGrpList] = useState<any[]>([]);
//   const [appList, setAppList] = useState<any[]>([]);
//   const [artifactData, setArtifactData] = useState<any[]>([]);
//   const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);

//   useEffect(() => {
//     if (tenantInfo.length) {
//       const appGrpData: any[] = [];
//       tenantInfo.forEach((item) => {
//         if (item.appGroups && Array.isArray(item.appGroups)) {
//           item.appGroups.forEach((grpData: any, i: number) => {
//             const Ag = {
//               tenant: item.name,
//               name: grpData.name,
//               apps: [`${grpData.apps.length} Apps`],
//               applicationArray: grpData.apps,
//               icon: i % 2 === 0 ? <PiAirplaneTiltFill /> : <RiBankFill />,
//             };
//             appGrpData.push(Ag);
//           });
//         }
//       });
//       setMappingAppGrp(appGrpData);
//     }
//   }, [tenant, tenantInfo]);

//   const fetchAppGroup = async (tenant: string) => {
//     try {
//       const res = await AxiosService.get(`/tp/getappgrouplist?tenant=${tenant}`);
//       console.log(res);
//       if (res.status === 200) {
//         setAppGrpList(res.data);

//       }
//     } catch (error) {
//       console.error("Error fetching app groups:", error);
//     }
//   };

//   const fetchAppList = async (tenant: string, appGroup: string) => {
//     try {
//       const res = await AxiosService.get(`/tp/getapplist?tenant=${tenant}&appGroup=${appGroup}`);
//       console.log(res.data);
//       if (res.status === 200) {
//         setAppList(res.data);
//       }
//     } catch (error) {
//       console.error("Error fetching apps:", error);
//     }
//   };

//   const handleCardClick = (item: { tenant: string; name: string }) => {
//     setSelectedTenant(item.tenant);

//     setAppGrpList([]);
//     setAppList([]);

//     setArtifactData([]);
//   };

//   const handleBreadcrumbClick = (level: string) => {
//     if (level === 'tenant') {
//       setSelectedTenant(null);
//       setAppGrpList([]);
//       setAppList([]);
//       setArtifactData([]);
//     } else if (level === 'appGroup') {
//       setAppGrpList([]);
//       setAppList([]);
//       setArtifactData([]);
//     } else if (level === 'app') {
//       setAppList([]);
//       setArtifactData([]);
//     }
//   };

//   const handleAppClick = async (app: any) => {
//     setAppList(app.name);

//     setArtifactData([{ name: "Artifact A" }]);
//   };

//   // const filteredAppGroups = mappingAppGrp.filter(
//   //   (ele) =>
//   //     ele.apps.some((app: string) => app.toLowerCase().includes(searchTerm.toLowerCase())) ||
//   //     ele.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div className="flex flex-col gap-3 border border-black/15 p-3 w-full h-full rounded-md ml-4 bg-white dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
//       <div className="flex justify-between">
//         <h1 className="text-sm font-semibold">AppGroups</h1>
//         {/* <h2 className="text-xs">View all</h2> */}
//       </div>
//       {selectedTenant ? (
//         <>
//           <Breadcrumbs className="flex items-center text-lg text-[color:var(--text-color)] m-0 p-0">
//             <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
//               <Link onPress={() => handleBreadcrumbClick('tenant')}>
//                 {selectedTenant}
//               </Link>
//             </Breadcrumb>
//             {appGrpList && (
//               <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
//                 <Link onPress={() => handleBreadcrumbClick('appGroup')}>
//                   {appGrpList}
//                 </Link>
//               </Breadcrumb>
//             )}
//             {appList && (
//               <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
//                 <Link onPress={() => handleBreadcrumbClick('app')}>
//                   {appList}
//                 </Link>
//               </Breadcrumb>
//             )}
//           </Breadcrumbs>
//           <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">
//             {appGrpList ? (
//               appGrpList.map((appGroup: any, index: any) => (
//                 <div key={index} className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]">
//                   <Button className="flex ml-4 focus:outline-none" onPress={() => handleCardClick(appGroup)}>
//                     {appGroup.name}
//                   </Button>
//                 </div>

//               ))
//             ) : (
//               appList.map((app, index) => (
//                 <div key={index} className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]">
//                   <Button className="flex ml-4 focus:outline-none" onPress={() => handleAppClick(app)}>
//                     {app.name}
//                   </Button>
//                 </div>
//               ))
//             )}
//           </div>

//         </>
//       ) : (
//         <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">
//           {appGrpList.map((item, index) => (
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
import { ThreeDots } from "../../constants/svgApplications";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";
import { AxiosService } from "../../../lib/utils/axiosService";

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
  const [selectApp, setSelectApp] = useState("")
  const [appList, setAppList] = useState<any[]>([]);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);

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
  };

  const filteredAppGroups = mappingAppGrp.filter(
    (ele) =>
      ele.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 border border-black/15 p-3 w-full h-full rounded-md ml-4 bg-white dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
      <div className="flex justify-between">
        <h1 className="text-sm font-semibold">{selectApp ? "Artifacts" : selectAppGroup ? "Apps" : "AppGroups"}</h1>
      </div>
      {selectedTenant ? (
        <>
          <Breadcrumbs className="flex items-center text-lg text-[color:var(--text-color)] m-0 p-0">
            <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
              <Link onPress={() => handleBreadcrumbClick("tenant")}>
                {selectedTenant}
              </Link>
            </Breadcrumb>
            {selectAppGroup && (
              <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
                <Link onPress={() => handleBreadcrumbClick("appGroup")}>
                  {selectAppGroup}
                </Link>
              </Breadcrumb>
            )}
            {selectApp && (
              <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
                <Link onPress={() => handleBreadcrumbClick("app")}>
                  {selectApp}
                </Link>
              </Breadcrumb>
            )}
          </Breadcrumbs>
          <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">
            {appList.length > 0 ? (
              appList.map((app: any, index: any) => (
                <div
                  key={index}
                  className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]"
                >
                  <Button
                    className="flex ml-4 focus:outline-none"
                    onPress={() => handleAppClick(app)}
                  >
                    {app}
                  </Button>
                </div>
              ))
            ) : (
              appList.map((app, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]"
                >
                  <Button
                    className="flex ml-4 focus:outline-none"
                    onPress={() => console.log(`App Clicked: ${app.name}`)}
                  >
                    {app.name}
                  </Button>
                </div>
              ))
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
