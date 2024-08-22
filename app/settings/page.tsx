"use client"
import React, { useState } from 'react'
import BuilderSideNav from '../components/builderScreen/BuilderSideNav'
import BuilderTopNav from '../components/builderScreen/BuilderTopNav'
import SetupScreen from '../components/settings/setup'

const page = () => {
    // const [Sidenav, Setsidenav] = useState(false)
    return (
        <div className="flex flex-col w-full h-screen bg-[#F4F5FA]">
            <div className="flex w-full h-full">
                <BuilderTopNav />
            </div>
            <div className="flex gap-2 mb-5">
                <div>
                    <BuilderSideNav />
                </div>
                <div className=" flex mt-5 w-[92.76vw] h-[89.16vh] bg-[#FFFFFF] border rounded-xl">
                    <SetupScreen />
                </div>
            </div>
        </div>
    )
}

export default page