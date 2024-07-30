
import React, { useState, useEffect } from "react";
import { AxiosService } from '../../../lib/utils/axiosService';
import { toast } from "react-toastify";
import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components";
import JsonView from "react18-json-view";


const ExceptionTable = () => {
    const [data, setData] = useState<any[]>([]);
    const [tabdata, setTabData] = useState<any>(null);
    const [SearchValue, setSearchValue] = useState("");
    const [fallback, setFallBack] = useState(true);
    const [activeTableRow, setActiveTableRow] = useState<any>(0);
    const [teamName, setTeamName] = useState<string>("TP");
    console.log(tabdata, "fgf")
    const ExceptionLog = async () => {
        setFallBack(true);
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
                setData(res.data);
                setFallBack(false);
                if (res.data.length > 0) {
                    setTabData({ error: res.data[0].errorDetails });
                }
            } else {
                toast.error("Exception log fetching process failed", {
                    autoClose: 2000,
                });
                setFallBack(false);
            }
        } catch (error) {
            toast.error("Exception log fetching process failed", { autoClose: 2000 });
            setFallBack(false);
        }
    };
    useEffect(() => {

        ExceptionLog();
    }, [teamName]);

    const displayartifacts = (data: any) => {
        const array = data.key.split(":")
        const artifactName = array[4]
        const uid = array[6]

        return (
            <div>
                <div>{artifactName}</div>
                <div>
                    {array.map((item: any, index: any) => (
                        index < 3 && <span>{item + ">"}</span>
                    ))}
                </div>
                <div>{uid}</div>
            </div>
        );
    }
    const version = (data: any) => {
        const array = data.key.split(":")
        const version = array[5]
        return <div>{version}</div>
    }
    return (
        <div className="flex w-full h-screen  gap-4  overflow-scroll">
            <div className="border border-[#E5E9EB] w-full h-[100%] overflow-y-auto ">

                <Table

                    className="w-full  overflow-y-auto  "
                    aria-label="Example table with client side sorting"


                >
                    <TableHeader className="sticky top-0 bg-[#F4F5FA] text-sm text-left border-b border-gray-300 rounded-lg">
                        <Row className="bg-gray-200 text-left">
                            <Column className="px-4 py-2 font-semibold" isRowHeader>Key</Column>
                            <Column className="px-4 py-2 font-semibold">Version</Column>
                            <Column className=" font-semibold">Session Info</Column>
                            <Column className="px-7 py-2 font-semibold">Timestamp</Column>
                            <Column className="px-8 py-2 font-semibold">Error Code</Column>
                        </Row>
                    </TableHeader>
                    <TableBody className=" w-full h-full bg-white ">
                        {data.map((item, index: number) => (
                            <Row
                                key={index}
                                // className={` cursor-pointer ${activeTableRow == index ? "bg-[#F4F5FA] " : ""}`}
                                onAction={() => {
                                    if (item.error) {
                                        setTabData({ error: item.error });
                                        setActiveTableRow(index);
                                    } else {
                                        setTabData({
                                            error: { data: "no data available" },
                                        });
                                    }
                                }}
                            >
                                <Cell className="w-1/8 h-12 "> {displayartifacts(item)}</Cell>


                                <Cell className="pl-5">{version(item)}</Cell>

                                <Cell className="">
                                    {item.sessionInfo && item.sessionInfo.user}
                                </Cell>
                                <Cell className="pl-7">{item.time}</Cell>
                                <Cell className="pl-7 ">{item.errorDetails.errorCode}</Cell>
                            </Row>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div
                className={`w-[30%] flex flex-col overflow-scroll scrollbar-hide`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >

                <div className="overflow-y-auto bg-[#F4F5FA] scrollbar-hide border border-blue-500 rounded">
                    <h2 className=" font-bold pb-4">Error Details</h2>
                    {(tabdata && tabdata.error) ? (
                        <JsonView
                            theme="atom"
                            src={tabdata.error}
                            className=" w-full mx-9"
                        />
                    ) : null}
                </div>
            </div>





        </div>





    )
}

export default ExceptionTable