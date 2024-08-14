import React from "react";
import { Button } from "react-aria-components";
import {
  DataFabric,
  ProcessFabric,
  SecurityFabric,
  UserFabric,
} from "../../constants/svgApplications";
import { getEncodedDetails } from "../../../lib/utils/cookiemgmt";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";

const Fabrics = ({
  fabric,
  setFabric,
}: {
  fabric: string;
  setFabric: (fabric: string) => void;
}) => {
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);

  const handleFabricChange = (fab: string) => {
    const enCodedDetails = getEncodedDetails(fab);
    window.location.href = `http://192.168.2.89:3000?tk=${enCodedDetails}`;

    // if (fab !== fabric) {
    //   setFabric(fab);
    // } else {
    //   setFabric("");
    // }
  };

  const fabricData = [
    {
      fabric: "df",
      displayParam: "Data Fabric",
      icon: <DataFabric fill={isDarkMode ? "#3063FF" : "#0736C4"} width="2.5vw" height="2.5vw" />,
    },
    {
      fabric: "uf",
      displayParam: "UI Fabric",
      icon: <UserFabric fill={isDarkMode ? "#3063FF" : "#0736C4"} width="2.5vw" height="2.5vw" />,
    },
    {
      fabric: "pf",
      displayParam: "Process Fabric",
      icon: <ProcessFabric fill={isDarkMode ? "#3063FF" : "#0736C4"} width="2.5vw" height="2.5vw" />,
    },
    {
      fabric: "sf",
      displayParam: "Security Fabric",
      icon: <SecurityFabric fill={isDarkMode ? "#3063FF" : "#0736C4"} width="2.5vw" height="2.5vw" />,
    },
  ];

  return (
    <div className="flex flex-col bg-white gap-[1.46vw] p-[1.17vw] border border-black/15 w-full h-[20.79vh] rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
      <h2 className="text-[0.93vw] font-semibold leading-[1.13vh]">Fabrics</h2>
      <div className="flex gap-[0.58vw]">
        {fabricData.map((fab) => (
          <Button
            onPress={() => handleFabricChange(fab.fabric)}
            key={fab.fabric}
            className={`flex flex-col gap-[0.87vw] outline-none w-[7.6vw] h-[9.53vh] p-[0.58vw] text-[0.72vw] leading-[1.5vh] font-medium rounded-md text-nowrap mt-[0.29vw] dark:bg-[#0F0F0F]
                        ${
                          fabric === fab.fabric
                            ? "bg-[#0736C4]/15"
                            : "bg-[#F4F5FA]"
                        }`}
          >
            {fab.icon}
            {fab.displayParam}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Fabrics;