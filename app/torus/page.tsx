"use client"
import React from 'react'
import Fabrics from '../components/landingScreen/Fabrics'
import Sidebar from '../components/SideNavBar'
import Topbar from '../components/TopNavBar'
import DateandTime from '../components/landingScreen/DayandDate'
import Card from '../components/landingScreen/card'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-[#F4F5FA] pt-1'>
            <Topbar />
            <div className='flex h-[88%]'>
                <Sidebar />
                <div className='flex flex-col w-full pt-3'>
                    <DateandTime />
                    <div className='flex flex-col h-full gap-5'>
                        <Fabrics />
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
