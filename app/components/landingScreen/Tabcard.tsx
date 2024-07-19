import React from 'react';
import { Tab, TabList, Tabs } from 'react-aria-components';
import { LuLock } from 'react-icons/lu';
import { Avatars, DataFabric, ThreeDots } from '../../constants/svgApplications';
import { TfiAlignCenter } from 'react-icons/tfi';

const Tabcard = () => {
    const banks = [
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
        { name: 'Bank Master' },
    ];

    return (
        <div className='flex flex-col w-full h-[93%] bg-white border border-gray-300 p-2 rounded-md'>
            <div className='flex justify-between mb-2'>
                <h1 className='text-sm font-bold'>My Library</h1>
                <h2 className='flex items-center gap-2 text-xs font-medium border border-black/15 rounded-md px-3 h-6'>Filter<TfiAlignCenter /></h2>
            </div>
            <Tabs>
                <TabList className='flex gap-5 rounded-md p-1 text-sm bg-[#F4F5FA] items-center' aria-label='Tabs'>
                    <Tab className={({ isSelected }) =>
                        `${isSelected ? 'bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold' : 'outline-none text-xs font-semibold ml-2'}`}> My Artifacts</Tab>
                    <Tab className={({ isSelected }) =>
                        `${isSelected ? 'bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold' : 'outline-none text-xs font-semibold ml-2'}`}>My Components</Tab>
                    <Tab className={({ isSelected }) =>
                        `${isSelected ? 'bg-white transition duration-300 ease-in-out rounded-lg outline-none p-2 text-xs font-semibold' : 'outline-none text-xs font-semibold ml-2'}`}>Shared with Me</Tab>
                </TabList>
            </Tabs>
            <div className='mt-4 grid grid-cols-3 gap-5 overflow-y-auto pr-2' >
                {banks.map((bank, index) => (
                    <div key={index} className='border-2   border-gray-300 bg-[#F4F5FA] p-3 flex flex-col items-center justify-center rounded-md'>
                        <div className='flex items-center ml-auto gap-1'>
                            <LuLock className='ml-1 text-red-500' />
                            <ThreeDots />
                        </div>
                        <div className=' mr-auto bg-[#0736C4]/15 rounded-md mb-3 p-1'>
                            < DataFabric width='22' />
                        </div>
                        <div className='flex w-full justify-between  '>
                            <h3 className='text-sm font-bold whitespace-nowrap'>{bank.name}</h3>
                            <div className=' text-xs '>V3.0</div>
                        </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <p className='text-xs whitespace-nowrap text-black/40'>Equity southindian-Gfms</p>
                        </div>
                        <div className='w-[110%] border-b border-b-black/15 my-2'>

                        </div>
                        <div className=' flex text-xs whitespace-nowrap gap-4'>
                            <div className='text-xs text-black/35'>Last edited a few mins ago
                                <div className='text-[#0736C4] font-medium'>Peer Maideen</div></div>
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
