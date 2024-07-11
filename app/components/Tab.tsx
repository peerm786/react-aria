"use client"
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import type { TabPanelProps, TabProps } from 'react-aria-components';
import React, { useEffect, useState } from 'react';
import { DataFabric, ProcessFabric, SecurityFabric, UserFabric } from '../constants/svgApplications';
import { AxiosService } from '../../lib/utils/axiosService';
import { toast } from 'react-toastify';

interface BuilderProps {
    tenant: string,
    appGrp: string,
    app: string
}

function FabricSelector({ tenant, appGrp, app }: BuilderProps) {
    const [selectedTab, setSelectedTab] = useState('df');
    const [modelKeys, setModelKeys] = useState<any[]>([]);

    const tabs = [
        { id: "df", label: "DataFabric", icon: <DataFabric /> },
        { id: "uf", label: "UserFabric", icon: <UserFabric /> },
        { id: "pf", label: "ProcessFabric", icon: <ProcessFabric /> },
        { id: "sf", label: "SecurityFabric", icon: <SecurityFabric /> },
    ]

    const getAllApplicationList = async (fabric: string) => {

        if (tenant && appGrp && app) {
            const key = `${tenant}:${appGrp}:${app}`
            const res = await AxiosService.post(
                "/tp/getAllKeys",
                {
                    keyPrefix: `${key}:${fabric}`,
                }
            );

            if (res.status == 201) {
                if (res.data.data) {
                    const allKeys = [...res.data.data];
                    const data = allKeys.map((item: string) => {
                        const parts = item.split(":");
                        parts.pop();
                        if (parts.length == 6) {
                            return parts.join(":");
                        }
                    }).filter((ele) => ele != undefined);
                    setModelKeys([...new Set(data)]);
                } else {
                    setModelKeys([]);
                    toast.error("There is no ModelKey found for the application", {
                        autoClose: 2000
                    });
                }
            } else {
                setModelKeys([]);
                toast.error("Please select valid application", {
                    autoClose: 2000
                });
            }
        } else {
            toast.error("Please select valid application", {
                autoClose: 2000
            });
        }
    };

    useEffect(() => {
        if (app) getAllApplicationList(selectedTab.toUpperCase());
    }, [app])

    const handleTabChange = (id: any) => {
        setSelectedTab(id);
        getAllApplicationList(id.toUpperCase());
    };

    const handleDragKey = (e: React.DragEvent<HTMLDivElement>, content: any) => {
        e.dataTransfer.setData("key", JSON.stringify({ [selectedTab]: content }));
    }

    return (
        <div className="flex flex-col w-full h-screen">
            <Tabs className={"h-[81%] bg-[#F4F5FA] rounded-lg"} onSelectionChange={handleTabChange}>
                <TabList
                    aria-label="Feeds"
                    className="flex w-[95%] bg-[#FFFFFF] rounded-lg p-2 ml-2 mt-2 font-semibold"
                >
                    {tabs.map(({ id, label, icon }) => (
                        <MyTab key={id} id={id} label={label}>
                            {icon}
                        </MyTab>
                    ))}
                </TabList>
                <div className='h-[85%] overflow-y-auto scrollbar-thin mt-3'>
                    {modelKeys.map((key: string, index: number) => (
                        <MyTabPanel key={index} id={selectedTab}>
                            <div draggable onDragStart={(e) => handleDragKey(e, key)} className="w-[95%] border border-black/20 p-1 ml-2 text-sm rounded-md">
                                {key.replace(`${tenant}:${appGrp}:${app}:`, "")}
                                {/* {items.map((item) => (
                                    <div draggable onDragStart={(e) => handleDragKey(e, item.content)} key={item.id} className="w-[95%] border border-black/20 p-1 my-2 text-sm rounded-md">
                                        {item.content}
                                    </div>
                                ))} */}
                            </div>
                        </MyTabPanel>
                    ))}
                </div>
            </Tabs >
        </div >
    );
}

function MyTab({ id, children, label }: TabProps & { label: string }) {
    return (
        <Tab
            id={id}
            className={({ isSelected }) => `
        w-full flex items-center justify-center text-[12px]
        ${isSelected ? 'bg-[#F4F5FA] transition duration-300 ease-in-out rounded-lg outline-none p-1' : ''}
      `}
        >
            {({ isSelected }) => (
                <>
                    {children}
                    {isSelected && <span className="ml-2">{label}</span>}
                </>
            )}
        </Tab>
    );
}

function MyTabPanel(props: TabPanelProps) {
    return (
        <TabPanel
            {...props}
            className="mt-2"
        />
    );
}

export default FabricSelector;





