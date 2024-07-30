"use client";
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, Row, Column, Cell, ColumnResizer, ResizableTableContainer, Input } from 'react-aria-components';
import { useSelector } from 'react-redux';
// import { useTheme } from "next-themes";
// import { Input } from "@nextui-org/react";
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AxiosService } from '../../../lib/utils/axiosService';
// import { Subloader } from '../layout/Loader';
// import { RootState } from "../../../lib/Store/store";
// import { AxiosService } from "../../../lib/ulits/axiosService";
// import JsonView from 'react18-json-view';

interface Item {
    key: string;
    nodeName: string;
    time: string;
    error?: string;
}

const Nodedebug: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);
    const [tabData, setTabData] = useState<any>();
    // const fabric = useSelector((state: RootState) => state.main.fabric);
    //   const { theme } = useTheme();
    const [searchValue, setSearchValue] = useState("");
    const [fallback, setFallBack] = useState(true);
    const [activeTableRow, setActiveTableRow] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await AxiosService.get('/log/nodeDebugLog', {
                headers: {
                    role: "Admin"
                }

            });
            console.log(res, "yyu")
            if (res.status === 200) {
                setData(res.data);
                setFallBack(false);
                if (res.data.length > 0) {
                    setTabData({ npci: res.data[0].npci });
                }
            } else {
                toast.error('Node level debug log fetching process failed', { autoClose: 2000 });
                setFallBack(false);
            }
        } catch (error) {
            toast.error('Node level debug log fetching process failed', { autoClose: 2000 });
            setFallBack(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full">



            <div className={`flex w-full h-full overflow-hidden`}>
                <div className={`flex flex-col gap-4 w-[68%] `}>
                    <h2 className={`text-center p-2 `}>
                        Node Level Debug Log Details
                    </h2>
                    <div className="flex justify-between w-full px-5">
                        {/* <input
                    {...inputProps}
                    className="w-full pl-10 pr-3 py-2 border rounded-lg shadow-xl bg-default-200/50 dark:bg-default/60 backdrop-blur-xl backdrop-saturate-200 hover:bg-default-200/70 dark:hover:bg-default/70 group-data-[focused=true]:bg-default-200/50 dark:group-data-[focused=true]:bg-default/60 cursor-text"
                  /> */}
                    </div>
                    <ResizableTableContainer className="w-full h-full overflow-auto max-h-[430px]">
                        <Table>
                            <TableHeader >

                                <TableHeader>
                                    <Column id="key" allowsSorting isRowHeader>Key</Column>
                                    <Column id="time" allowsSorting>Time</Column>
                                    <Column id="nodeName" allowsSorting>Node Name</Column>
                                </TableHeader>

                            </TableHeader>
                            <TableBody items={data.filter((item) => item.key.toLowerCase().includes(searchValue.toLowerCase()))}>
                                {(item) => (
                                    <Row>


                                        <Cell>{item.key}</Cell>
                                        <Cell>{item.time}</Cell>
                                        <Cell>{item.nodeName || "No Data Available"}</Cell>
                                    </Row>
                                )}
                            </TableBody>


                        </Table>
                    </ResizableTableContainer>
                </div>
                <div className={`w-[32%] flex flex-col`}>
                    {tabData && (
                        <>
                            <div className="w-full text-center my-2">{tabData.key && tabData.key.split(":").join(": ")}</div>
                            <div className="overflow-y-auto">
                                {tabData.error ? <h2 className="text-center">Error Details</h2> : <h2 className="text-center">NPCI Details</h2>}
                                {/* <JsonView theme="atom" src={tabData.error ?? tabData.npci ?? { data: "no data available" }} className="w-full" /> */}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* <div className="w-full flex justify-center items-center font-bold text-xl h-full">There are no details available</div> */}

        </div>
    );
};

export default Nodedebug;
