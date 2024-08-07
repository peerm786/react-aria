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
import TorusToast from './torusToast';

const ExceptionLog = ({ visibleColumns, searchValue }: { visibleColumns: string[], searchValue: string, }) => {
    const [data, setData] = useState<any[]>([]);
    const [tabdata, setTabData] = useState<any>({});
    const [teamName, setTeamName] = useState<string>("TP");
    const [wordLength, setWordLength] = useState(0);

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
                toast(
                    <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
                    {
                        type: "error",
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        title: "Error",
                        text: `Exception log fetching process failed`,
                        closeButton: false,
                    } as any
                )
            }
        } catch (error: any) {
            const { data } = error.response
            toast(
                <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
                {
                    type: "error",
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    title: "Error Fetching Tenant",
                    text: `${data.errorDetails.message}`,
                    closeButton: false,
                } as any
            )
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
                <div className='text-sm font-bold dark:text-white'>{jobName}</div>
                <div className='text-xs text-black/35 dark:text-[#FFFFFF]/35 '>
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
                return <div className='text-xs text-black/50 dark:text-[#FFFFFF]/50 '>{item.timeStamp}</div>
            case "version":
                return <div className='text-sm font-medium dark:text-white'>{item.version}</div>
            case "errorCode":
                return <div className='text-xs dark:text-white/50'>{item.errorCode}</div>
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
            <div className='w-[75%] h-full ml-2 dark:bg-[#161616] '>
                <TorusTable
                    primaryColumn="key"
                    tableData={data}
                    visibleColumns={visibleColumns}
                    isSkeleton={true}
                    searchValue={searchValue}
                >
                    {({ selectedKeys, filterColmns, sortedItems, primaryColumn }: any) => (
                        <>
                            <TorusTableHeader className="dark:bg-[#0F0F0F]"
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
                                                className={`text-sm font-medium bg-[#F4F5FA] cursor-pointer dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ${i == 0 ? "rounded-tl-xl rounded-bl-xl" : ""} ${i == filterColmns.length - 1 ? "rounded-tr-xl rounded-br-xl" : ""}`}
                                            >
                                                {column.name}
                                            </TorusColumn>
                                        ))}
                                    </>
                                )}
                            </TorusTableHeader>
                            {/* <hr className="w-[90%] h-[1px] bg-black/10" /> */}
                            <TableBody
                                className={"overflow-y-auto dark:bg-[#161616]"}
                                renderEmptyState={() => (
                                    <div className="text-center overflow-y-auto dark:bg-[#161616] dark:text-[#FFFFFF]"> No Data </div>
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
                                            `${item.timeStamp == tabdata.timeStamp ? "bg-[#F4F5FA] dark:bg-[#0F0F0F] rounded-full" : ""}hover:bg-[#F4F5FA] dark:hover:bg-[#0F0F0F] dark:hover:text-white outline-none hover:cursor-pointer`
                                        }
                                        onAction={handleRowAction}
                                    >
                                        {({ columns, index, item }: any) => (
                                            <>
                                                {columns.map((column: any, i: number) => (
                                                    <Cell
                                                        key={i}
                                                        className={`border-b border-transparent ${item.timeStamp == tabdata.timeStamp ? (i == 0 ? " rounded-tl-2xl rounded-bl-2xl" : i == columns.length - 1 ? "rounded-tr-2xl rounded-br-2xl" : "") : ""}`}
                                                        children={
                                                            <div className="w-full h-full flex flex-col items-center justify-center py-[1rem] text-xs">
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
            <hr className="w-[1px] h-[90%] bg-black/10 dark:bg-[#212121]" />
            <div className='w-[28%] h-[85%] mt-2 mr-3 items-center bg-[#F4F5FA] rounded-lg dark:bg-[#0F0F0F] dark:text-[#FFFFFF]'>
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
