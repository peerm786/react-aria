import React from "react";
import { Button } from "react-aria-components";
import {
  DataFabric,
  ProcessFabric,
  SecurityFabric,
  UserFabric,
} from "../../constants/svgApplications";
import { getEncodedDetails } from "../../../lib/utils/cookiemgmt";

const Fabrics = ({
  fabric,
  setFabric,
}: {
  fabric: string;
  setFabric: (fabric: string) => void;
}) => {
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
      icon: <DataFabric fill="#0736C4" width="2.5vw" height="2.5vw" />,
    },
    {
      fabric: "uf",
      displayParam: "UI Fabric",
      icon: <UserFabric fill="#03A9F4" width="2.5vw" height="2.5vw" />,
    },
    {
      fabric: "pf",
      displayParam: "Process Fabric",
      icon: <ProcessFabric fill="#13CC78" width="2.5vw" height="2.5vw" />,
    },
    {
      fabric: "sf",
      displayParam: "Security Fabric",
      icon: <SecurityFabric fill="#FFC107" width="2.5vw" height="2.5vw" />,
    },
  ];

  return (
    <div className="flex flex-col bg-white gap-5 p-4 ml-4 border border-black/15 w-full h-[40%] rounded-md dark:bg-[#1D1D1D] dark:text-[#FFFFFF] dark:border-[#212121]">
      <h2 className="text-[0.93vw] font-semibold leading-[1.13vh]">Fabrics</h2>
      <div className="flex gap-2">
        {fabricData.map((fab) => (
          <Button
            onPress={() => handleFabricChange(fab.fabric)}
            key={fab.fabric}
            className={`flex flex-col gap-3 outline-none w-[24%] p-2 text-[0.72vw] leading-[1.5vh] font-medium rounded-md text-nowrap mt-1 dark:bg-[#0F0F0F]
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
