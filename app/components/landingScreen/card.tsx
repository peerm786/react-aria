import React, { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { RiBankFill } from "react-icons/ri";
import { ThreeDots } from "../../constants/svgApplications";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";

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
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [selectedAppGroup, setSelectedAppGroup] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [artifactData, setArtifactData] = useState<any[]>([]);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);


  const dummyArtifactData = [
    { name: "Artifact A" },

  ];

  useEffect(() => {
    if (tenantInfo.length) {
      const appGrpData: any[] = [];
      if (tenant) {
        const selectedTenantAg = tenantInfo.find((item) => item.name == tenant);
        if (selectedTenantAg.appGroups && Array.isArray(selectedTenantAg.appGroups)) {
          selectedTenantAg.appGroups.forEach((grpData: any, i: number) => {
            const Ag = {
              tenant: tenant,
              name: grpData.name,
              apps: [`${grpData.apps.length} Apps`],
              applicationArray: grpData.apps,
              icon: i % 2 === 0 ? <PiAirplaneTiltFill /> : <RiBankFill />,
            };
            appGrpData.push(Ag);
          });
        }
      } else {
        tenantInfo.forEach((item) => {
          if (item.appGroups && Array.isArray(item.appGroups)) {
            item.appGroups.forEach((grpData: any) => {
              const Ag = {
                name: grpData.name,
                apps: [`${grpData.apps.length} Apps`],
                applicationArray: grpData.apps,
                icon: <RiBankFill />,
                tenant: item.name,
              };
              appGrpData.push(Ag);
            });
          }
        });
      }
      setMappingAppGrp(appGrpData);
    }
  }, [tenant, tenantInfo]);

  const handleCardClick = (item: { tenant: string; name: string }) => {
    setSelectedTenant(item.tenant);
    setSelectedAppGroup(item.name);
    setSelectedApp(null);
  };

  const handleBreadcrumbClick = (level: string) => {
    if (level === 'tenant') {
      setSelectedTenant(null);
      setSelectedAppGroup(null);
      setSelectedApp(null);
      setArtifactData([]);
    } else if (level === 'appGroup') {
      setSelectedAppGroup(null);
      setSelectedApp(null);
      setArtifactData([]);
    } else if (level === 'app') {
      setSelectedApp(null);
      setArtifactData([]);
    }
  };

  const handleAppClick = (app: any) => {

    setSelectedApp(app.name);
    setArtifactData(dummyArtifactData);

  };

  const handleartifactclick = (artifact: any) => {
    setArtifactData(artifact);
  }

  const filteredAppGroups = mappingAppGrp.filter(
    (ele) =>
      ele.apps.some((app: string) => app.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ele.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 border border-black/15 p-3 w-full h-full rounded-md ml-4 bg-white dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
      <div className="flex justify-between">
        <h1 className="text-sm font-semibold">AppGroups</h1>
        <h2 className="text-xs">View all</h2>
      </div>
      {selectedTenant && selectedAppGroup ? (
        <>
          <Breadcrumbs className="flex items-center text-lg text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
            <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
              <Link onPress={() => handleBreadcrumbClick('tenant')}>
                {selectedTenant}
              </Link>
            </Breadcrumb>
            <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
              <Link onPress={() => handleBreadcrumbClick('appGroup')}>
                {selectedAppGroup}
              </Link>
            </Breadcrumb>
            {selectedApp && (
              <Breadcrumb className="text-[color:var(--text-color)] m-0 p-0 [&:not(:last-child)]:after:content-['›'_/_'']">
                <Link onPress={() => handleBreadcrumbClick('app')}>
                  {selectedApp}
                </Link>
              </Breadcrumb>
            )}
          </Breadcrumbs>
          <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">
            {filteredAppGroups
              .filter((item) => item.tenant === selectedTenant && item.name === selectedAppGroup && item.applicationArray)
              .map((item) =>
                item.applicationArray.map((app: any, index: number) => (
                  <div key={index} className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]">
                    {selectedApp === app.name ? (

                      artifactData.map((artifact: any, artifactIndex: number) => (
                        <div key={artifactIndex}>
                          {artifact.name}
                        </div>
                      ))
                    ) : (

                      <Button className="flex ml-4 focus:outline-none" onPress={() => handleAppClick(app)}>
                        {app.name}
                      </Button>
                    )}
                  </div>
                ))
              )}

          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md">
          {filteredAppGroups.map((item, index) => (
            <div key={index} className="flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md dark:bg-[#0F0F0F]">
              <Button className="flex ml-4 focus:outline-none" onPress={() => handleCardClick(item)}>
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-3 items-center">
                    <div className="bg-white p-2 text-[#0736C4] rounded-md dark:bg-[#161616]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="rounded-md text-xs font-medium">{item.name}</h3>
                      <div className="text-[10px] text-start">
                        {item.apps.map((app: any, appIndex: any) => (
                          <div key={appIndex}>{app}</div>
                        ))}
                      </div>
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
