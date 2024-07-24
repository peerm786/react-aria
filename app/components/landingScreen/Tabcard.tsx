import React, { useEffect, useState } from 'react';
import { Tab, TabList, Tabs } from 'react-aria-components';
import { LuLock } from 'react-icons/lu';
import { Avatars, DataFabric, ProcessFabric, SecurityFabric, ThreeDots, UserFabric } from '../../constants/svgApplications';
import { TfiAlignCenter } from 'react-icons/tfi';
import { AxiosService } from '../../../lib/utils/axiosService';
import { getCookie } from '../../../lib/utils/cookiemgmt';

const Tabcard = ({ fabric }: { fabric: string }) => {
    const [artifactType, setArtifactType] = useState<any>('frk')
    const [artifactList, setArtifactList] = useState<any>([])

    const client = getCookie("client")
    const loginId = getCookie("loginId")

    const getArtifact = async (type: string, fabric?: string) => {
        try {
            const res = await AxiosService.post(`/tp/getArtifactList`,
                {
                    artifactType: type,
                    client: client,
                    loginId: loginId,
                    fabric: fabric,
                    torusVersion: "torus9.0"
                })
            setArtifactList(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getArtifact(artifactType, fabric)
    }, [artifactType, fabric])

    const getFabricIcon = (fab: string) => {
        switch (fab) {
            case 'df':
                return <DataFabric fill='#0736C4' />
            case 'pf':
                return <ProcessFabric fill='#13CC78' />
            case 'sf':
                return <SecurityFabric fill='#FFBE00' />
            case 'uf':
                return <UserFabric fill='#03A9F4' />
            default:
                return <DataFabric fill='#0736C4' />
        }
    }

    const calculateRecentlyWorkingDetails = (date: string) => {
        const date1 = new Date(date);
        const date2 = new Date();
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        if (diffDays > 0) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return `Just now`;
        }
    };


    return (
        <div className='flex flex-col w-full h-full bg-white border border-gray-300 p-2 rounded-md'>
            <div className='flex justify-between mb-2'>
                <h1 className='text-sm font-bold'>My Library</h1>
                <h2 className='flex items-center gap-2 text-xs font-medium border border-black/15 rounded-md px-3 h-6'>Filter<TfiAlignCenter /></h2>
            </div>
            <Tabs selectedKey={artifactType} onSelectionChange={setArtifactType}>
                <TabList className='flex gap-5 rounded-md p-1 text-sm bg-[#F4F5FA] items-center' aria-label='Tabs'>
                    <Tab id={'frk'} className={({ isSelected }) =>
                        `${isSelected ? 'bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold' : 'outline-none text-xs font-semibold ml-2'}`}> My Artifacts</Tab>
                    <Tab id={'crk'} className={({ isSelected }) =>
                        `${isSelected ? 'bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold' : 'outline-none text-xs font-semibold ml-2'}`}>My Components</Tab>
                    <Tab id={'tpfrk'} className={({ isSelected }) =>
                        `${isSelected ? 'bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold' : 'outline-none text-xs font-semibold ml-2'}`}>Shared with Me</Tab>
                </TabList>
            </Tabs>
            <div className='mt-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-5 overflow-y-auto pr-2' >
                {artifactList.map((item: any, index: number) => (
                    <div key={index} className='border-2   border-gray-300 bg-[#F4F5FA] p-3 flex flex-col items-center justify-center rounded-md'>
                        <div className='flex items-center ml-auto gap-1'>
                            <LuLock className='ml-1 text-red-500' />
                            <ThreeDots />
                        </div>
                        <div className=' mr-auto bg-[#0736C4]/5 rounded-md mb-3 p-1'>
                            {getFabricIcon(item.fabric)}
                        </div>
                        <div className='flex w-full justify-between  '>
                            <h3 className='text-sm font-bold whitespace-nowrap'>{item.artifactName}</h3>
                            <div className=' text-xs '>{item.version}</div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <p className='text-xs whitespace-nowrap text-black/40'>
                                {artifactType === 'frk' ? item.project : item.source} - {client}
                            </p>
                        </div>
                        <div className='w-[110%] border-b border-b-black/15 my-2'>

                        </div>
                        <div className='flex w-full text-xs whitespace-nowrap justify-between px-1'>
                            <div className='text-xs text-black/35'>Last edited {calculateRecentlyWorkingDetails(item.recentlyWorking)}
                                <div className='text-[#0736C4] font-medium'>{loginId}</div></div>
                            <div className=''>
                                <Avatars />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabcard;
