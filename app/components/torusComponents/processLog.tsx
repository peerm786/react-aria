import React, { useEffect, useState } from "react";
import { AxiosService } from "../../../lib/utils/axiosService";
import {
  TorusColumn,
  TorusRow,
  TorusTable,
  TorusTableHeader,
} from "./torusTable";
import { Button, Cell, Separator, TableBody } from "react-aria-components";
import { Clipboard } from "../../constants/svgApplications";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import { SiTicktick } from "react-icons/si";

const ProcessLogs = ({
  visibleColumns,
  searchValue,
  showNodeData,
  setShowNodeData,
}: any) => {
  const [data, setData] = useState<any>([]);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const [copied, setCopied] = useState(null);

  const getProcessLogs = async () => {
    try {
      const res = await AxiosService.get("/log/processlog", {
        headers: {
          role: "Admin",
        },
      });
      if (res.status == 200) {
        const groupedData: { [key: string]: any[] } = {};

        res.data.forEach((item: any) => {
          // Check if the key already exists in groupedData
          if (!groupedData[item.key]) {
            // If not, create a new entry with an empty array
            groupedData[item.key] = [];
          }
          // Add the current item to the array for the specific key
          groupedData[item.key].push({
            node: item?.nodeName,
            time: item?.time,
            status: item?.status,
            npc: item?.npc,
            ipc: item?.ipc,
            mode: item?.mode,
          });
        });

        const result = Object.keys(groupedData).map((key) => {
          const statusArray = groupedData[key].map((item) => item.status);
          const nodeNameArray = groupedData[key].map((item) => item.node);
          const timeStampArray = groupedData[key].map((item) => item.time);
          const isProcess = key.split(":")[1] == "PF" ? true : false;
          return {
            jobName: key,
            version: key.split(":")[6],
            fabric: key.split(":")[1],
            jobType: key.split(":")[1] == "PF" ? "Process" : "Process",
            status: statusArray.includes("Failed") ? "Failed" : "Success",
            node: nodeNameArray,
            time: timeStampArray,
            nodeData: groupedData[key],
          };
        });
        setData(result);
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  useEffect(() => {
    getProcessLogs();
  }, []);

  const displayNodeData = (data: any, type: "node" | "time" | "status") => {
    switch (type) {
      case "node":
        return (
          <div>
            {data.nodeData.map((item: any) => (
              <div key={item.node} className="text-[0.83vw] font-medium">
                {item.node}
              </div>
            ))}
          </div>
        );
      case "time":
        return (
          <div>
            {data.nodeData.map((item: any) => (
              <div
                key={item.time}
                className="text-[0.833vw] text-black/50 
           dark:text-[#FFFFFF]/50"
              >
                {item.time}
              </div>
            ))}
          </div>
        );
      case "status":
        const resultStatus: any[] = data.nodeData.map(
          (item: any) => item.status
        );
        if (resultStatus.includes("Failed")) {
          return (
            <div
              className={`px-[0.87vw] py-[0.29vw] text-center text-[0.625vw] rounded-full text-white bg-red-500`}
            >
              Failed
            </div>
          );
        } else {
          return (
            <div
              className={`px-[0.87vw] py-[0.29vw] text-center text-[0.625vw] rounded-full text-white bg-green-500`}
            >
              Success
            </div>
          );
        }
      default:
        return <></>;
    }
  };

  const displayjobname = (datas: any) => {
    const { jobName } = datas;
    const artifact = jobName.split(":")[5];
    const tenantDetail = jobName
      .split(":")
      .map((item: string, index: number) => (index < 3 ? item + ">" : ""))
      .join("");
    const isProcess = jobName.split(":")[1] == "PF" ? true : false;
    const processKey = jobName.split(":")[jobName.split(":").length - 1];

    const handleCopyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(processKey);
        setCopied(processKey);
        setTimeout(() => {
          setCopied(null);
        }, 1000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <div
        onClick={() => setShowNodeData(datas)}
        className="flex flex-col gap-[0.29vw]"
      >
        <div className="text-[0.833vw] leading-[1.85vh] font-bold">
          {artifact.charAt(0).toUpperCase() + artifact.slice(1)}
        </div>
        <div className="text-[0.625vw] leading-[1.85vh] text-black/35 dark:text-[#FFFFFF]/35">
          {tenantDetail}
        </div>
        {processKey && (
          <div className="flex items-center gap-1 text-[0.625vw] leading-[1.85vh] font-medium border border-[#1C274C]/15 rounded-full p-1 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-[#FFFFFF] text-[#1C274C] dark:border-[#FFFFFF]/15">
            UID: {processKey}
            <Button className={"outline-none"} onPress={handleCopyToClipboard}>
              {copied && copied === processKey ? (
                <SiTicktick size={8} className="text-green-500" />
              ) : (
                <Clipboard fill={isDarkMode ? "white" : "black"} />
              )}
            </Button>
          </div>
        )}
      </div>
    );
  };

  const RenderTableCell = (item: any, column: any) => {
    switch (column?.id) {
      case "jobName":
        return displayjobname(item);
      case "version":
        return <div className="text-[0.83vw] font-medium">{item.version}</div>;
      case "fabric":
        return <div className="text-[0.83vw] font-medium">{item.fabric}</div>;
      case "jobType":
        return <div className="text-[0.83vw] font-medium">{item.jobType}</div>;
      case "status":
        return displayNodeData(item, "status");
      case "node":
        return displayNodeData(item, "node");
      case "time":
        return displayNodeData(item, "time");
      default:
        return "none";
    }
  };

  return (
    <div>
      <TorusTable
        className=""
        primaryColumn="jobName"
        tableData={data}
        visibleColumns={visibleColumns}
        isSkeleton={true}
        searchValue={searchValue}
      >
        {({ selectedKeys, filterColmns, sortedItems, primaryColumn }: any) => (
          <>
            <TorusTableHeader
              selectedKeys={selectedKeys}
              columns={[...filterColmns]}
            >
              {({ columns }: any) => (
                <>
                  {columns.map((column: any, i: number) => (
                    <TorusColumn
                      key={column.id}
                      id={column.id}
                      allowsSorting={column.allowsSorting}
                      isRowHeader={column.isRowHeader}
                      className={`text-[0.72vw] leading-[2.22vh] font-medium bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-[#FFFFFF] cursor-pointer ${
                        i == 0 ? "rounded-tl-xl rounded-bl-xl" : ""
                      } ${
                        i == filterColmns.length - 1
                          ? "rounded-tr-xl rounded-br-xl"
                          : ""
                      }`}
                    >
                      {column.name}
                    </TorusColumn>
                  ))}
                </>
              )}
            </TorusTableHeader>
            <Separator className="dark:border-[#212121] border border-black" />
            {/* <span className="h-[500px] overflow-y-scroll"> */}
            <TableBody
              renderEmptyState={() => (
                <div className="text-center overflow-y-auto">
                  {" "}
                  No Process log detail found{" "}
                </div>
              )}
            >
              {sortedItems.map((item: any, index: number) => (
                <TorusRow
                  key={index}
                  item={item}
                  id={index}
                  index={item[primaryColumn]}
                  columns={[...filterColmns]}
                  selectedKeys={selectedKeys}
                  className={
                    "border-1 hover:bg-[#F4F5FA] dark:hover:bg-[#0F0F0F] dark:hover:text-white outline-none hover:cursor-pointer border-b-slate-800 overflow-y-auto border-t-transparent border-l-transparent border-r-transparent dark:bg-[#161616] dark:text-[#FFFFFF]"
                  }
                >
                  {({ columns, index, item }: any) => (
                    <>
                      {columns.map((column: any, i: number) => (
                        <Cell
                          key={i}
                          className={"border-b border-transparent "}
                        >
                          {
                            <div className="w-full h-full flex flex-col items-center justify-center py-[1rem]">
                              {RenderTableCell(item, column)}
                            </div>
                          }
                        </Cell>
                      ))}
                    </>
                  )}
                </TorusRow>
              ))}
            </TableBody>
            {/* </span> */}
          </>
        )}
      </TorusTable>
    </div>
  );
};

export default ProcessLogs;
