"use client"
import React from 'react'
import Topbar from '../components/TopNavBar'
import Sidebar from '../components/SideNavBar'

const page = () => {
    return (
        <div className='flex bg-[#F4F5FA]'>
            <Sidebar />
            <Topbar />
        </div>
    )
}

export default page
