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

const page = () => {
    const [fabric, setFabric] = useState('')
    const [tenant, setTenant] = useState('')
    const [data, setData] = useState([])
    const token = getCookie('token')

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
    }, [])

    return (
        <div className='flex flex-col w-full h-screen bg-[#F4F5FA] pt-1'>
            <Topbar tenant={tenant} setTenant={setTenant} tenantInfo={data} />
            <div className='flex h-[85%]'>
                <Sidebar />
                <div className='flex flex-col w-full h-full pt-3'>
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
