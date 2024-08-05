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
        <div className='flex flex-col w-full h-screen bg-[#F4F5FA] pt-1 dark:bg-[#161616] dark:text-[#FFFFFF]'>
            <Topbar tenant={tenant} setTenant={setTenant} tenantInfo={data} />
            <div className='flex h-[88%]'>
                <Sidebar />
                <div className='flex flex-col w-full h-full'>
                    <DateandTime />
                    <div className='flex justify-between w-full gap-2 h-[93%]'>
                        <div className='flex flex-col gap-3 w-[36%]'>
                            <Fabrics fabric={fabric} setFabric={setFabric} />
                            <Card tenant={tenant} tenantInfo={data} />
                        </div>
                        <div className='flex flex-col mt-4 mr-3 w-[61%]'>
                            <Tabcard fabric={fabric} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
