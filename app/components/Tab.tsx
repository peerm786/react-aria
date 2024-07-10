"use client"
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import type { TabPanelProps, TabProps } from 'react-aria-components';
import React, { useState } from 'react';
import { DataFabric, ProcessFabric, SecurityFabric, UserFabric } from '../constants/svgApplications';

function TabsExample() {
    const [selectedTab, setSelectedTab] = useState('df');
    const [tabContent, setTabContent] = useState({
        df: [
            { id: 1, content: "Artifact V1" },
            { id: 2, content: "DF:Screen 1" },
            { id: 3, content: "DF:Screen 1" },
            { id: 4, content: "DF:Screen 1" },
            { id: 5, content: "DF:Screen 1" },
            { id: 6, content: "DF:Screen 1" },
            { id: 7, content: "DF:Screen 1" },
            { id: 8, content: "DF:Screen 1" },
            { id: 9, content: "DF:Screen 1" },
            { id: 10, content: "DF:Screen 1" },
            { id: 11, content: "DF:Screen 1" },
        ],
        uf: [
            { id: 1, content: "Key2" },
            { id: 2, content: "Key2" },
            { id: 3, content: "Key2" },
            { id: 4, content: "Key2" },
            { id: 5, content: "Key2" },
            { id: 6, content: "Key2" },
            { id: 7, content: "Key2" },
            { id: 8, content: "Key2" },
            { id: 9, content: "Key2" },
            { id: 10, content: "Key2" },
            { id: 11, content: "Key2" },
        ],
        pf: [
            { id: 1, content: "Key3" },
            { id: 2, content: "Key3" },
            { id: 3, content: "Key3" },
            { id: 4, content: "Key3" },
            { id: 5, content: "Key3" },
            { id: 6, content: "Key3" },
            { id: 7, content: "Key3" },
            { id: 8, content: "Key3" },
            { id: 9, content: "Key3" },
            { id: 10, content: "Key3" },
            { id: 11, content: "Key3" },
        ],
        sf: [
            { id: 1, content: "Key4" },
            { id: 2, content: "Key4" },
            { id: 3, content: "Key4" },
            { id: 4, content: "Key4" },
            { id: 5, content: "Key4" },
            { id: 6, content: "Key4" },
            { id: 7, content: "Key4" },
            { id: 8, content: "Key4" },
            { id: 9, content: "Key4" },
            { id: 10, content: "Key4" },
            { id: 11, content: "Key4" },
        ],
    });

    const tabs = [
        { id: "df", label: "DataFabric", icon: <DataFabric /> },
        { id: "uf", label: "UserFabric", icon: <UserFabric /> },
        { id: "pf", label: "ProcessFabric", icon: <ProcessFabric /> },
        { id: "sf", label: "SecurityFabric", icon: <SecurityFabric /> },
    ]

    const handleTabChange = (id: any) => {
        setSelectedTab(id);
    };

    const handleDragKey = (e: React.DragEvent<HTMLDivElement>, content: any) => {
        console.log(selectedTab);

        e.dataTransfer.setData("key", JSON.stringify({ [selectedTab]: content }));
    }

    return (
        <div className="flex flex-col h-[95%] bg-[#F4F5FA] rounded-lg">
            <Tabs onSelectionChange={handleTabChange}>
                <TabList
                    aria-label="Feeds"
                    className="flex w-[95%] bg-[#FFFFFF] rounded-lg p-2 ml-2 mt-2 font-semibold"
                >
                    {tabs.map(({ id, label, icon }) => (
                        <MyTab
                            key={id} id={id} label={label}
                            isSelected={selectedTab === id}
                            onSelect={() => handleTabChange(id)}
                        >
                            {icon}
                        </MyTab>
                    ))}
                </TabList>
                <div className='h-[90%] overflow-y-auto scrollbar-thin'>
                    {Object.entries(tabContent).map(([key, items]) => (
                        <MyTabPanel key={key} id={key}>
                            <div className="p-2">
                                {items.map((item) => (
                                    <div draggable onDragStart={(e) => handleDragKey(e, item.content)} key={item.id} className="w-[95%] border border-black/20 p-1 my-2 text-sm rounded-md">
                                        {item.content}
                                    </div>
                                ))}
                            </div>
                        </MyTabPanel>
                    ))}
                </div>
            </Tabs >
        </div >
    );
}

function MyTab({ id, children, label, isSelected, onSelect }: TabProps & { label: string, isSelected: boolean, onSelect: () => void }) {
    return (
        <Tab
            id={id}
            className={({ isSelected }) => `
        w-full flex items-center justify-center text-[12px]
        ${isSelected ? 'bg-[#F4F5FA] transition duration-300 ease-in-out rounded-lg outline-none p-1' : ''}
      `}
        // onSelect={onSelect}
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

export default TabsExample;





