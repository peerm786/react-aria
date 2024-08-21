"use client"
import React, { useState } from 'react'
import Page from '../components/torusComponents/usermanage'
import BuilderSideNav from '../components/builderScreen/BuilderSideNav'
import BuilderTopNav from '../components/builderScreen/BuilderTopNav'
import UserManage from '../components/torusComponents/usermanage'

const page = () => {
    // const [Sidenav, Setsidenav] = useState(false)
    return (
        <div className="flex flex-col w-full h-screen bg-[#F9F5FF]">
            <div className="w-full">
                <BuilderTopNav />
            </div>
            <div className="flex gap-x-2  ">
                <div className=" ">
                    <BuilderSideNav />
                </div>
                <div className=" flex mt-5  w-[93.7vw] h-[89.1vh] bg-[#FFFFFF]  border rounded-xl scrollbar-hide  overflow-auto">
                    <UserManage />
                </div>
            </div>
        </div>
    )
}

export default page