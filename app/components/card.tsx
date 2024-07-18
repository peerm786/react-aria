import React from 'react'
import { Button } from 'react-aria-components';
import { PiAirplaneTiltFill } from "react-icons/pi";
import { RiBankFill } from "react-icons/ri";
import { ThreeDots } from '../constants/svgApplications';

const Card = () => {
    const banks = [
        { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
        { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
        { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
        { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
        { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
        { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
        { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
        { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
        { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
        { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },

    ];
    return (
        <div className=' border-2 border-gray-300 p-4 rounded-md'>
            <div className='flex justify-between'>
                <h1 className='text-center mb-4'>AppGroups</h1>
                <h2 className='text-center'>View all</h2>
            </div>
            <div className='   grid grid-cols-2  grid-rows-5 gap-3 w-full h-[60%] text-sm rounded-md bg-[#F4F5FA] '>
                {banks.map((bank, index) => (
                    <div key={index} className='border-2 border-gray-300 p-3 flex flex-col   items-center justify-center rounded-md'>
                        <Button className='flex items-center mb-2 focus:outline-none '>
                            {bank.icon}
                            <div className=''>
                                <h3 className='ml-2 rounded-md'>{bank.name}</h3>
                            </div>
                            <div className='absolute bottom-0 right-0 mb-2 mr-2'>
                                <ThreeDots />
                            </div>
                        </Button>
                        <div className='grid grid-cols-2 gap-2 text-xs rounded-md mr-8 '>
                            {bank.apps.map((app, appIndex) => (
                                <div key={appIndex} className=' ' >
                                    {app}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card