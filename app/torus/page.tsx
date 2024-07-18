"use client"
import React from 'react'
import Fabrics from '../components/landingScreen/Fabrics'
import Sidebar from '../components/SideNavBar'
import Topbar from '../components/TopNavBar'
import DateandTime from '../components/landingScreen/DayandDate'

const page = () => {
    return (
        <div className='flex flex-col w-full h-screen bg-[#F4F5FA]'>
            <Topbar />
            <div className='flex h-screen'>
                <Sidebar />
                <div className='flex flex-col w-full gap-2 pt-5'>
                    <DateandTime />
                    <Fabrics />
                </div>
            </div>
        </div>
    )
}

export default page
