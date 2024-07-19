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
            <div className='flex h-[88%]'>
                <Sidebar />
                <div className='flex flex-col w-full pt-3'>
                    <DateandTime />
                    <div className='flex justify-between w-full gap-5 h-[75%]'>
                        <div className='flex flex-col gap-3 w-[35%] h-[82%]'>
                            <Fabrics />
                            <Card />
                        </div>
                        <div className='flex flex-col w-[60%] h-full mt-5 mr-3'>
                            <Tabcard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
