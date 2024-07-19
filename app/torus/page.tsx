"use client"
import React from 'react'
import Fabrics from '../components/landingScreen/Fabrics'
import Sidebar from '../components/SideNavBar'
import Topbar from '../components/TopNavBar'
import DateandTime from '../components/landingScreen/DayandDate'
import Card from '../components/landingScreen/card'
import Tabcard from '../components/landingScreen/Tabcard'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-[#F4F5FA] pt-1'>
            <Topbar />
            <div className='flex h-[85%]'>
                <Sidebar />
                <div className='flex flex-col w-full h-full pt-3'>
                    <DateandTime />
                    <div className='flex justify-between w-full gap-2 h-full'>
                        <div className='flex flex-col gap-3 w-[36%]'>
                            <Fabrics />
                            <Card />
                        </div>
                        <div className='flex flex-col mt-4 mr-3 w-[61%]'>
                            <Tabcard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
