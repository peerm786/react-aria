import React from 'react';
import { Tab, TabList, Tabs } from 'react-aria-components';

import { LuLock } from 'react-icons/lu';
import { Avatars, DataFabric, ThreeDots } from '../../constants/svgApplications';

const Tabcard = () => {
    const banks = [
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
        { name: 'Bank Master', apps: ['Equity southindian-Gfms'], lastEdited: 'few mins ago', editor: 'prasanth' },
    ];

    return (
        <div className='w-[60%] h-[30%] border-2 border-gray-300 p-4 rounded-md'>
            <div className='flex justify-between'>
                <h1 className='text-center mb-4'>My Library</h1>
                <h2 className='text-center'>Filter</h2>
            </div>
            <Tabs>
                <TabList className='flex gap-5 bg-[#F4F5FA]' aria-label='Tabs'>
                    <Tab id='FoR'>My Artifacts</Tab>
                    <Tab id='MaR'>My Components</Tab>
                    <Tab id='Emp'>Shared with Me</Tab>
                </TabList>
            </Tabs>
            <div className='mt-4 grid grid-cols-3 gap-5 overflow-y-auto ' >
                {banks.map((bank, index) => (
                    <div key={index} className='border-2  border-gray-300 bg-[#F4F5FA] p-3 flex flex-col items-center justify-center rounded-md'>
                        <div className='flex items-center ml-auto gap-1'>

                            <LuLock className='ml-1 text-red-500' />
                            <ThreeDots />
                        </div>
                        <div className=' mr-auto bg-[#0736C4]/15 rounded mb-3'>
                            < DataFabric />
                        </div>
                        <div className='flex justify-between mt-2'>
                            <h3 className='mb-4 mr-24 text-sm font-bold whitespace-nowrap'>{bank.name} </h3>
                            <div className=' text-xs '>V3.0</div>
                        </div>
                        <div className=' w-[110%] grid grid-cols-2 gap-2 text-sm  border-b border-b-black'>
                            {bank.apps.map((app, appIndex) => (
                                <div key={appIndex} className='text-[9px] text-xs ml-4  whitespace-nowrap'>
                                    {app}
                                </div>
                            ))}
                        </div>
                        <div className=' flex text-xs text-gray-500 whitespace-nowrap gap-4 '>
                            <div className='text-xs mr-2'>Last edited: {bank.lastEdited}
                                <div className='text-blue-700'>{bank.editor}</div></div>
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
