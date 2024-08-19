import React, { useState } from 'react';
import { Tabs } from 'react-aria-components';
import { Tab, TabList, TabPanel } from 'react-aria-components';
import JsonView from 'react18-json-view';
import { FaClipboardCheck } from 'react-icons/fa';
import { Clipboard, Node } from '../../constants/svgApplications';
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
                return 'text-green-500 bg-green-100 border border-green-200  w-[80%] h-[15%]'; // Green for success
            case 'Failed':
                return 'text-red-500 bg-red-100 border border-red-200 w-[80%] h-[15%]';   // Red for failed
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
        <div className="flex w-full gap-5 h-full overflow-hidden">
            <div className="flex flex-col h-full w-[15%] border border-[#000000]/15  rounded-lg bg-white dark:bg-[#161616] dark:text-[#FFFFFF]">
                <div className="flex flex-col border-b dark:border-[#212121] border-gray-300">
                    <div className="flex justify-between p-[0.87vw] ">
                        <h1 className="text-[0.83vw] leading-[1.25vw] mx-[0.29vw] font-semibold text-[#000000] dark:text-[#FFFFFF]">{artifact.toUpperCase()}</h1>
                        <p className="bg-[#0736C4] text-white text-[0.52vw] leading-[1.25vw] rounded-xl px-[0.87vw]   dark:text-[#FFFFFF]">{version}</p>
                    </div>
                    <div className="flex mx-[1.17vw]  mb-[0.58vw]  text-[#1C274C] bg-[#F4F5FA] justify-between border border-[#1C274C]/15  py-[0.29vw] px-[0.58vw] rounded-full dark:bg-[#161616] dark:text-[#FFFFFF] dark:border-[#FFFFFF]/15">
                        <h2 className="text-xs text-[#1C274C] ">
                            <span onClick={handleCopyToClipboard} className="text-nowrap text-[0.62vw] leading-[1.04vw] cursor-pointer gap-[0.87vw] flex items-center dark:text-[#FFFFFF] ">
                                UID: {uid}
                                {copied ? (
                                    <FaClipboardCheck className="text-green-500" />
                                ) : (
                                    <Clipboard width='0.83vw' height='0.83vw' fill={isDarkMode ? 'white' : 'black'} />
                                )}
                            </span>
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col mt-[1.17vw] dark:bg-[#161616] dark:text-[#FFFFFF] ">
                    {nodeData.nodeData.map((item: any, index: number) => (
                        <div
                            key={index}
                            className={`p-[0.87vw] cursor-pointer rounded-full transition-colors duration-300 ease-in-out dark:text-[#FFFFFF] hover:bg-[#F4F5FA] dark:hover:bg-[#0F0F0F]
                                ${selectedNode === item ? 'bg-[#F4F5FA] dark:bg-[#0F0F0F]' : ''}`}
                            onClick={() => handleNodeClick(item)}
                        >
                            <div className='flex items-center gap-[0.87vw]   dark:text-[#FFFFFF]'>
                                <Node />
                                <span className='text-[0.72vw] leading-[1.25vw]'>{item.node}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=' flex flex-col w-[85%] bg-white dark:bg-[#161616] h-full border rounded-lg dark:border-[#212121] '>
                <div className='flex gap-[1.46vw] p-[0.87vw] dark:text-[#FFFFFF] '>
                    <h3 className='text-[#1A2024] text-[0.93vw] leading-[1.25vw] font-semibold dark:text-[#FFFFFF]'>Completed</h3>
                    <h4 className='text-[#1A2024]/35 text-[0.93vw] leading-[1.25vw] dark:text-[#FFFFFF]'>Waiting</h4>
                    <h5 className='text-[#1A2024]/35 text-[0.93vw] leading-[1.25vw] dark:text-[#FFFFFF]'>Active</h5>
                    <h6 className='text-[#1A2024]/35 text-[0.93vw] leading-[1.25vw] dark:text-[#FFFFFF]'>Delayed</h6>
                    <p className='text-[#1A2024]/35 text-[0.93vw] leading-[1.25vw] dark:text-[#FFFFFF]'>Failed</p>
                    <p className='text-[#1A2024]/35 text-[0.93vw] leading-[1.25vw] dark:text-[#FFFFFF]'>Waiting</p>
                </div>

                <hr className='w-full border-[#E5E9EB] dark:border-[#212121]' />

                <div className='flex  w-full h-[92%] text-black bg-white rounded-lg dark:bg-[#161616] dark:text-[#FFFFFF]  '>
                    <div className='flex flex-col p-[0.58vw] gap-[0.87vw] w-[70%] h-full '>
                        {Table.map((item: any, index) => (
                            <div key={index} className="flex w-full bg-[#F4F5FA] p-[1.46vw] gap-[0.58vw] border-t border-transparent rounded-lg   dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ">
                                <div className="flex  gap-[0.87vw] text-gray-500 ">
                                    <div className='flex flex-col gap-[1.46vw] '>
                                        <div className='flex flex-col gap-[0.58vw] py-[1.75vw] '>
                                            <p className='text-[#1A2024]/35 text-end text-[0.62vw] font-medium leading-[0.26vw]  dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>Added at</p>
                                            <p className='text-[#1A2024]/35 text-nowrap text-[0.62vw]  leading-[0.26vw] font-medium dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35   '>{item?.addedAt}</p>
                                        </div>
                                        <div className="text-gray-500 flex flex-col gap-[0.58vw] ">
                                            <p className='text-[#1A2024]/35  text-end text-[0.62vw] font-medium leading-[0.26vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>Process started at</p>
                                            <p className='text-[#1A2024]/35 text-nowrap text-[0.62vw] font-medium leading-[0.26vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>{item?.processStartedAt}</p>
                                        </div>
                                        <div className="text-gray-500 flex flex-col gap-[0.58vw] py-[1.25vw] ">
                                            <p className='text-[#1A2024]/35  text-end text-[0.62vw] font-medium leading-[0.26vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>Finished at</p>
                                            <p className='text-[#1A2024]/35 text-nowrap text-[0.62vw] font-medium leading-[0.26vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35 '>{item?.finishedAt}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center relative ">
                                        <div className="absolute h-full w-px bg-[#000000]/35 dark:bg-[#FFFFFF]"></div>
                                        <div className="flex flex-col  ">
                                            <div className="flex items-center ">
                                                <div className="h-[0.58vw] w-[0.58vw] bg-[#000000]/35 dark:bg-[#FFFFFF]  rounded-full"></div>
                                                <div className="h-[4.09vw]  bg-[#000000]/35 dark:bg-[#FFFFFF] "></div>
                                            </div>
                                            <div className="flex items-center ">
                                                <div className="h-[0.58vw] w-[0.58vw] bg-[#000000]/35 rounded-full dark:bg-[#FFFFFF] "></div>
                                                <div className="h-[4.09vw]  bg-[#000000]/35 dark:bg-[#FFFFFF] "></div>
                                            </div>
                                            <div className="flex items-center ">
                                                <div className="h-[0.58vw] w-[0.58vw] bg-[#000000]/35 rounded-full dark:bg-[#FFFFFF] "></div>
                                                <div className="h-[4.09vw]  bg-[#000000]/35 dark:bg-[#FFFFFF] "></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex w-full justify-between '>
                                    <div>
                                        <p className='text-black font-medium text-nowrap text-[0.83vw] leading-[1.04vw] dark:text-[#FFFFFF] '>{item?.title}</p>
                                    </div>
                                    <div className="flex gap-[0.87vw] text-center">
                                        <p className={`text-[0.72vw] leading-[1.04vw] mt-[0.58vw] font-bold text-[#1A2024]/35  ${determinePercentageColorClass(item?.percentage)}`}>
                                            {item?.percentage}%
                                        </p>
                                        <p className={`flex font-semibold text-[0.62vw] text-center items-center  leading-[1.04vw] ${determineStatusColorClass(item.status)} px-2 rounded-full `}>{item.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr className="w-[1px] h-full  bg-black/10  dark:border:[#FFFFFF] dark:bg-[#212121] " />

                    <div className="flex text-center p-[1.46vw] w-[30%] h-[98%] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]">
                        <Tabs className={"bg-[#F4F5FA]/15 w-full dark:bg-[#0F0F0F]"} selectedKey={activeTab} onSelectionChange={setActiveTab}>
                            <TabList className="flex  border border-[#000000]/15 gap-[0.58vw] bg-[#F4F5FA]  items-center rounded-md dark:bg-[#0F0F0F] dark:text-[#FFFFFF] dark:border-[#212121]">
                                <Tab id="npc" className={`px-[4.00vw] py-[0.58vw] text-center outline-none text-[0.67vw] leading-[1.04vw] font-medium rounded-md ${activeTab === 'npc' ? 'bg-white dark:bg-[#161616]' : ''}`}>
                                    NPC
                                </Tab>
                                <Tab id="ipc" className={`px-[4.55vw] py-[0.60vw] outline-none text-[0.67vw] leading-[1.04vw] font-medium rounded-md ${activeTab === 'ipc' ? 'bg-white dark:bg-[#161616]' : ''}`}>
                                    IPC
                                </Tab>
                            </TabList>
                            <div className={"h-full overflow-scroll  scrollbar-thin "}>
                                <TabPanel id="npc">
                                    {selectedNode ? (
                                        <div className='text-[0.83vw] mt-[1.46vw]'>
                                            <JsonView src={selectedNode.npc} theme="atom" enableClipboard={false} displaySize={10} />
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </TabPanel>
                                <TabPanel id="ipc">
                                    {selectedNode ? (
                                        <div className='text-[0.83vw] mt-[1.46vw]'>
                                            <JsonView className='' src={selectedNode.ipc} theme="atom" enableClipboard={false} style={{ fill: '#1A2024' }} />
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Artifactdetails;
