import React, { useEffect, useState } from "react";
import { AxiosService } from "../../../lib/utils/axiosService";
import {
  RenderTableChildren,
  TorusColumn,
  TorusRow,
  TorusTable,
  TorusTableHeader,
} from "./torusTable";
import { Cell, Separator, TableBody } from "react-aria-components";
import { Clipboard } from "../../constants/svgApplications";

const ProcessLogs = ({ visibleColumns, searchValue, showNodeData, setShowNodeData }: any) => {
  const [data, setData] = useState<any>([]);

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
            jobType: key.split(":")[1] == "PF" ? "Process" : "Push",
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
              <div>{item.node}</div>
            ))}
          </div>
        );
      case "time":
        return (
          <div>
            {data.nodeData.map((item: any) => (
              <div className="text-xs text-black/50">{item.time}</div>
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
              className={`px-4 py-1 text-center text-xs rounded-full text-white bg-red-500`}
            >
              Failed
            </div>
          );
        } else {
          return (
            <div
              className={`px-2 py-1 text-center text-xs rounded-full text-white bg-green-500`}
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
    const tenantDetail = jobName.split(":").map((item: string, index: number) => (index < 3 ? item + ">" : "")).join("");
    const isProcess = jobName.split(":")[1] == "PF" ? true : false;
    const processKey = isProcess ? jobName.split(":")[jobName.split(":").length - 1] : undefined;

    return (
      <div onClick={() => setShowNodeData(datas)}>
        <div className="text-sm font-bold">
          {artifact.charAt(0).toUpperCase() + artifact.slice(1)}
        </div>
        <div className="text-xs text-black/35">{tenantDetail}</div>
        {processKey && (
          <div className="flex gap-1 text-xs text-[#1C274C] border border-[#1C274C]/15 rounded-full p-1 bg-[#F4F5FA]">
            UID:{processKey} <Clipboard />
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
        return item.version;
      case "fabric":
        return item.fabric;
      case "jobType":
        return item.jobType;
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
                      className={`bg-[#F4F5FA] cursor-pointer ${i == 0 ? "rounded-tl-xl rounded-bl-xl" : ""} ${i == filterColmns.length - 1 ? "rounded-tr-xl rounded-br-xl" : ""}`}

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
                <div className="text-center overflow-y-auto"> No Process log detail found </div>
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
                    "border-1 hover:bg-[#F4F5FA] outline-none hover:cursor-pointer border-b-slate-800 overflow-y-auto border-t-transparent border-l-transparent border-r-transparent"
                  }
                >
                  {({ columns, index, item }: any) => (
                    <>
                      {columns.map((column: any, i: number) => (
                        <Cell
                          key={i}
                          className={"border-b border-transparent"}
                          children={
                            <div className="w-full h-full flex flex-col items-center justify-center py-[1rem] text-xs font-normal ">
                              {/* <RenderTableChildren
                                children={item?.[column?.id]}
                              /> */}
                              {RenderTableCell(item, column)}
                            </div>
                          }
                        />
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
