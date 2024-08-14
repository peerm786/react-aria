"use client"
import React, { useEffect, useState } from 'react'
import Fabrics from '../components/landingScreen/Fabrics'
import Sidebar from '../components/landingScreen/SideNavBar'
import Topbar from '../components/landingScreen/TopNavBar'
import DateandTime from '../components/landingScreen/DayandDate'
import Card from '../components/landingScreen/card'
import Tabcard from '../components/landingScreen/Tabcard'
import { AxiosService } from '../../lib/utils/axiosService'
import { getCookie } from '../../lib/utils/cookiemgmt'
import ProgressButton from '../components/progressbar'

const page = () => {
    const [fabric, setFabric] = useState('')
    const [tenant, setTenant] = useState('')
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const token = getCookie('token')
    const [isLoading, setLoading] = useState(true)

    const AuthorizedTenantDetails = async () => {
        try {
            if (token) {
                const res = await AxiosService.get(`/tp/AuthorizedTenantDetails`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(res.data)
            } else {
                console.log("no token")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        AuthorizedTenantDetails()
        if (typeof window !== 'undefined') {
            setLoading(false)
        }
    }, [])



    if (isLoading) {
        return <div className="h-screen w-screen flex items-center justify-center"><ProgressButton isIndeterminate size={"xl"} /> </div>
    }

    return (
        <div className='flex flex-col w-full h-screen bg-[#F4F5FA] dark:bg-[#161616] dark:text-[#FFFFFF]'>
            <Topbar tenant={tenant} setTenant={setTenant} tenantInfo={data} setSearchTerm={setSearchTerm} />
            <div className='flex h-[89.07vh]'>
                <Sidebar />
                <div className='flex flex-col h-[89.07vh]'>
                    <DateandTime />
                    <div className='flex justify-between w-full pt-[1.46vw] gap-[1.46vw] h-[82.37vh]'>
                        <div className='flex flex-col gap-[1.46vw] pl-[1.46vw] w-[37.18vw]'>
                            <Fabrics fabric={fabric} setFabric={setFabric} />
                            <Card tenant={tenant} tenantInfo={data} searchTerm={searchTerm} />
                        </div>
                        <div className='flex flex-col w-[53.64vw] h-full'>
                            <Tabcard fabric={fabric} searchTerm={searchTerm} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
