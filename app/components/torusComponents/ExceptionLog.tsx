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
import { tree } from 'next/dist/build/templates/app-page';

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
                setTabData(result[0]);
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
            setTabData(item)
        } else {
            console.log("Action not found")
        }
    }
    console.log(tabdata);

    return (
        <div className='flex w-full h-full gap-5'>
            <div className='w-[75%] h-full ml-2'>
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
                                            `${item.timeStamp == tabdata.timeStamp ? "bg-[#F4F5FA] rounded-full" : ""}hover:bg-[#F4F5FA] outline-none hover:cursor-pointer`
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
            <div className='w-[28%] h-[85%] mt-2 mr-3 items-center bg-[#F4F5FA] rounded-lg'>
                <p className="text-l p-3 font-semibold text-left">Error Details</p>
                <div className='w-full h-[88%] overflow-scroll scrollbar-thin'>
                    {(tabdata) ? (
                        <JsonView
                            theme='atom'
                            enableClipboard={false}
                            src={tabdata.errorDetails}
                        // collapsed={true}
                        // collapseObjectsAfterLength={2}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default ExceptionLog
