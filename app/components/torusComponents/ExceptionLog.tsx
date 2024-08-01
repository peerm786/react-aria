import React, { useEffect, useState } from 'react'
import {
    TorusColumn,
    TorusRow,
    TorusTable,
    TorusTableHeader,
} from "./torusTable";
import { Cell, Separator, TableBody } from "react-aria-components";
import { AxiosService } from '../../../lib/utils/axiosService';
import { toast } from 'react-toastify';
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

const ExceptionLog = ({ visibleColumns, searchValue }: { visibleColumns: string[], searchValue: string }) => {
    const [data, setData] = useState<any[]>([]);
    const [tabdata, setTabData] = useState<any>({});
    const [teamName, setTeamName] = useState<string>("TP");

    const ExceptionLogData = async () => {
        try {
            const res = await AxiosService.get(
                `/log/exceptionLog?teamName=${teamName}`,
                {
                    headers: {
                        role: "Admin",
                    },
                }
            );
            if (res.status == 200) {
                const result = res.data.map((item: any) => ({
                    key: item.key,
                    version: item.key.split(":")[6],
                    timeStamp: item.time,
                    errorCode: item?.errorDetails?.errorCode,
                    errorDetails: item?.errorDetails
                }));
                setData(result);
            } else {
                toast.error("Exception log fetching process failed", {
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.error("Exception log fetching process failed", { autoClose: 2000 });
        }
    };

    useEffect(() => {
        ExceptionLogData();
    }, [teamName]);

    const displayjobname = (data: any) => {
        const array = data.key.split(":")
        const jobName = array[5]
        return (
            <div>
                <div className='text-sm font-bold'>{jobName}</div>
                <div className='text-xs text-black/35'>
                    {array.map((item: any, index: any) => (
                        index < 3 && <span>{item + ">"}</span>
                    ))}
                </div>
            </div>
        )
    }

    const RenderTableCell = (item: any, column: any) => {
        switch (column?.id) {
            case "key":
                return displayjobname(item);
            case "timeStamp":
                return <div>{item.timeStamp}</div>
            case "version":
                return <div>{item.version}</div>
            case "errorCode":
                return <div>{item.errorCode}</div>
            // case "errorDetails":
            //     return <div>{Object.keys(tabdata.error).map((item: any) => <div>{item.errorCode}</div>)}</div>
            default:
                return "none";
        }
    };


    const handleRowAction = (item: any) => {
        if (item.errorDetails) {
            setTabData(item.errorDetails)
        } else {
            console.log("Action not found")
        }
    }

    return (
        <div className='flex w-full h-full gap-5'>
            <div className='w-[75%] h-full'>
                <TorusTable
                    primaryColumn="key"
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
                                        {columns.map((column: any) => (
                                            <TorusColumn
                                                key={column.id}
                                                id={column.id}
                                                allowsSorting={column.allowsSorting}
                                                isRowHeader={column.isRowHeader}
                                                className={"bg-[#F4F5FA] cursor-pointer"}
                                            >
                                                {column.name}
                                            </TorusColumn>
                                        ))}
                                    </>
                                )}
                            </TorusTableHeader>
                            {/* <hr className="w-[90%] h-[1px] bg-black/10" /> */}
                            <TableBody
                                className={"overflow-y-auto"}
                                renderEmptyState={() => (
                                    <div className="text-center overflow-y-auto"> No Data </div>
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
                                            `border-1 border-b-slate-800 overflow-y-auto border-t-transparent border-l-transparent border-r-transparent`
                                        }
                                        onAction={handleRowAction}
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
                        </>
                    )}
                </TorusTable>
            </div>
            <hr className="w-[1px] h-[90%] bg-black/10" />
            <div className='w-[25%] h-[75%] pt-2 pr-2'>
                <div className='flex flex-col h-full items-center bg-[#F4F5FA] rounded-lg'>
                    <h2 className="text-xl font-bold text-left">Error Details</h2>
                    {/* <div className="flex w-full h-[40%] overflow-y-auto"> */}
                    {(tabdata) ? (
                        <JsonView
                            theme='atom'
                            enableClipboard={false}
                            src={tabdata}
                            className='w-full h-full overflow-y-auto'
                        />
                    ) : null}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default ExceptionLog
