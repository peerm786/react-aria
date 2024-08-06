import React, { useState } from 'react';
import { Tabs } from '../../src/Tabs';
import { Tab, TabList, TabPanel } from 'react-aria-components';
import JsonView from 'react18-json-view';
import { FaClipboardCheck } from 'react-icons/fa';
import { Clipboard } from '../../constants/svgApplications';
import { MdOutlineManageAccounts } from "react-icons/md";
import "react18-json-view/src/style.css";
import { RootState } from '../../../lib/Store/store';
import { useSelector } from 'react-redux';

const Artifactdetails = ({ nodeData }: any) => {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<any>('');
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
    console.log(nodeData)
    const array = nodeData.jobName.split(":")
    const artifact = array[5]
    const uid = array[7]
    const version = array[6]
    const Table = [
        {
            addedAt: 'June 29, 2023 18:42:24',
            processStartedAt: 'June 29, 2023 18:42:25',
            finishedAt: 'June 29, 2023 18:42:27',
            percentage: -100,
            status: 'Success',
            statusColor: 'green',
            title: 'Lorem Ipsum',
            description: 'Process completed successfully.'
        },
        {
            addedAt: 'June 29, 2023 18:42:24',
            processStartedAt: 'June 29, 2023 18:42:25',
            finishedAt: 'June 29, 2023 18:42:27',
            percentage: -27,
            status: 'Failed',
            statusColor: 'red',
            title: 'Lorem Ipsum',
        }
    ];
    const handleNodeClick = (node: any) => {
        if (node !== selectedNode) {
            setSelectedNode(node);
        }
    };

    const determinePercentageColorClass = (percentage: any) => {
        if (percentage == -100) return 'text-green-500'; // example color
        if (percentage == -27) return 'text-red-500'; // example color
    };

    const determineStatusColorClass = (status: string) => {
        switch (status) {
            case 'Success':
                return 'text-green-500 bg-green-100 border border-green-200 w-[80%] h-[15%]'; // Green for success
            case 'Failed':
                return 'text-red-500 text-center bg-red-100 border border-red-200 w-[80%] h-[15%]';   // Red for failed
            default:
                return 'text-gray-500';  // Default gray for other statuses
        }
    };

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(uid);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    return (
        <div className="flex w-full gap-2 h-full overflow-hidden dark:bg-[#161616] dark:text-[#FFFFFF] ">
            <div className="flex flex-col h-full w-[20%] border border-[#000000]/15  rounded-lg bg-white dark:bg-[#161616] dark:text-[#FFFFFF]">
                <div className="flex flex-col border-b dark:border-[#212121] border-gray-300">
                    <div className="flex justify-between p-3 ">
                        <h1 className="text-lg mx-1 font-bold text-[#1C274C] dark:text-[#FFFFFF]">{artifact.toUpperCase()}</h1>
                        <p className="bg-[#0736C4] text-white rounded-full px-2 py-1 text-sm dark:text-[#FFFFFF]">{version}</p>
                    </div>
                    <div className="flex mx-3 mb-2 text-[#1C274C] bg-[#F4F5FA] justify-between border border-[#1C274C]/15  py-2 px-3 rounded-lg dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#FFFFFF]/15">
                        <h2 className="text-xs text-[#1C274C] ">
                            <span onClick={handleCopyToClipboard} className="text-nowrap cursor-pointer gap-2 flex items-center dark:text-[#FFFFFF] ">
                                UID: {uid}
                                {copied ? (
                                    <FaClipboardCheck className="text-green-500" />
                                ) : (
                                    <Clipboard fill={isDarkMode ? 'white' : 'black'} />
                                )}
                            </span>
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col mt-4 dark:bg-[#161616] dark:text-[#FFFFFF]">
                    {nodeData.nodeData.map((item: any, index: number) => (
                        <div
                            key={index}
                            className={`text-[#000000] p-3 cursor-pointer rounded-lg transition-colors duration-300 ease-in-out dark:text-[#FFFFFF] ${selectedNode === item ? 'bg-[#F4F5FA] dark:bg-[#161616]' : 'hover:bg-[#F4F5FA] dark:hover:bg-[#161616] '}`}
                            onClick={() => handleNodeClick(item)}
                        >
                            <div className='flex items-center gap-2 dark:text-[#FFFFFF]'>
                                <MdOutlineManageAccounts className='text-[#0736C4] w-5 h-5' />
                                <span>{item.node}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col border border-transparent w-[90%] h-full text-black bg-white rounded-lg dark:bg-[#161616] dark:text-[#FFFFFF]  '>
                <div className='flex gap-5 text-black pb-4 p-2 dark:text-[#FFFFFF] '>
                    <h3 className='text-[#1A2024] text-sm font-bold dark:text-[#FFFFFF]'>Completed</h3>
                    <h4 className='text-[#1A2024]/35 text-sm dark:text-[#FFFFFF]'>Waiting</h4>
                    <h5 className='text-[#1A2024]/35 text-sm dark:text-[#FFFFFF]'>Active</h5>
                    <h6 className='text-[#1A2024]/35 text-sm dark:text-[#FFFFFF]'>Delayed</h6>
                    <p className='text-[#1A2024]/35 text-sm dark:text-[#FFFFFF]'>Failed</p>
                    <p className='text-[#1A2024]/35 text-sm dark:text-[#FFFFFF]'>Waiting</p>
                </div>
                <hr className='w-full border-[#E5E9EB] dark:border-[#212121]' />

                <div className='flex w-full h-full  '>
                    <div className='w-[70%] h-full '>
                        {Table.map((item: any) => (
                            <div className="flex w-[96%] mx-4 bg-[#F4F5FA] p-2 gap-2 border-t border-transparent rounded-lg  mt-5 dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ">
                                <div className="flex  gap-3 text-gray-500 ">
                                    <div className='flex flex-col gap-5 '>
                                        <div className='flex flex-col '>
                                            <p className='text-[#1A2024]/35 text-end text-sm dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>Added at</p>
                                            <p className='text-[#1A2024]/35 text-nowrap text-sm dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35   '>{item?.addedAt}</p>
                                        </div>
                                        <div className="text-gray-500 ">
                                            <p className='text-[#1A2024]/35  text-end text-sm dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>Process started at</p>
                                            <p className='text-[#1A2024]/35 text-nowrap text-sm dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>{item?.processStartedAt}</p>
                                        </div>
                                        <div className="text-gray-500 ">
                                            <p className='text-[#1A2024]/35  text-end text-sm dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>Finished at</p>
                                            <p className='text-[#1A2024]/35 text-nowrap text-sm dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>{item?.finishedAt}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center relative ">
                                        <div className="absolute h-full w-px bg-[#000000]/35 dark:bg-[#FFFFFF]"></div>
                                        <div className="flex flex-col  ">
                                            <div className="flex items-center ">
                                                <div className="h-3 w-3 bg-[#000000]/35 dark:bg-[#FFFFFF]  rounded-full"></div>
                                                <div className="h-14  bg-[#000000]/35 dark:bg-[#FFFFFF] "></div>
                                            </div>
                                            <div className="flex items-center ">
                                                <div className="h-3 w-3 bg-[#000000]/35 rounded-full dark:bg-[#FFFFFF] "></div>
                                                <div className="h-14  bg-[#000000]/35 dark:bg-[#FFFFFF] "></div>
                                            </div>
                                            <div className="flex items-center ">
                                                <div className="h-3 w-3 bg-[#000000]/35 rounded-full dark:bg-[#FFFFFF] "></div>
                                                <div className="h-14  bg-[#000000]/35 dark:bg-[#FFFFFF] "></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full justify-between '>
                                    <div>
                                        <p className='text-black font-semibold text-nowrap text-sm dark:text-[#FFFFFF] '>{item?.title}</p>
                                    </div>
                                    <div className="flex gap-3 text-center">
                                        <p className={`text-sm text-[#1A2024]/35  ${determinePercentageColorClass(item?.percentage)}`}>
                                            {item?.percentage}%
                                        </p>
                                        <p className={`font-sm ${determineStatusColorClass(item.status)} px-2 rounded-full `}>{item.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className="w-[1px] h-full bg-black/10" />
                    <div className="flex flex-row text-center  w-[30%] h-full p-6 dark:bg-[#0F0F0F] dark:text-[#FFFFFF] overflow-y-auto scrollbar-hide">
                        <div className='w-full  '>
                            <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
                                <TabList className="flex p-1  w-full border border-[#000000]/15 gap-2 bg-[#F4F5FA] items-center  rounded-md dark:bg-[#161616] dark:text-[#FFFFFF]">
                                    <Tab id="npc" className={`px-10 py-2 text-center outline-none text-sm rounded-md dark:bg-[#161616]  ${activeTab === 'npc' ? 'bg-white dark:bg-[#161616]' : ''}`}>
                                        NPC
                                    </Tab>
                                    <Tab id="ipc" className={`px-10 py-2 outline-none text-sm rounded-md dark:bg-[#161616] ${activeTab === 'ipc' ? 'bg-white dark:bg-[#161616]' : ''}`}>
                                        IPC
                                    </Tab>
                                </TabList>
                                <TabPanel id="npc">
                                    {selectedNode ? (
                                        <div>
                                            <JsonView src={selectedNode.npc} theme="atom" enableClipboard={false} displaySize={10} />
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </TabPanel>
                                <TabPanel id="ipc">
                                    {selectedNode ? (
                                        <div>
                                            <JsonView src={selectedNode.ipc} theme="atom" enableClipboard={false} style={{ fill: '#1A2024' }} />
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Artifactdetails;
