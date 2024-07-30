import React, { useEffect, useState } from 'react'
import { Button } from 'react-aria-components';
import { PiAirplaneTiltFill } from "react-icons/pi";
import { RiBankFill } from "react-icons/ri";
import { ThreeDots } from '../../constants/svgApplications';

const Card = ({ tenant, tenantInfo }: { tenant: string, tenantInfo: any[] }) => {
    const [mappingAppGrp, setMappingAppGrp] = useState<any[]>([]);

    // const banks = [
    //     { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
    //     { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
    //     { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
    //     { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
    //     { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
    //     { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
    //     { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
    //     { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
    //     { name: 'First Abu Dhabi Bank', icon: <PiAirplaneTiltFill />, apps: ['4 Apps'] },
    //     { name: 'Equity Bank', icon: <RiBankFill />, apps: ['3 Apps'] },
    // ];

    useEffect(() => {
        if (tenantInfo.length) {
            const appGrpData: any[] = []
            if (tenant) {
                const SelectedTenantAg = tenantInfo.find(item => item.name == tenant)
                if (SelectedTenantAg.appGroups && Array.isArray(SelectedTenantAg.appGroups)) {
                    SelectedTenantAg.appGroups.forEach((grpData: any, i: number) => {
                        const Ag = {
                            name: grpData.name,
                            apps: [`${grpData.apps.length} Apps`],
                            icon: i % 2 === 0 ? <PiAirplaneTiltFill /> : <RiBankFill />
                        }
                        appGrpData.push(Ag)
                    })
                }
            } else {
                tenantInfo.forEach((item) => {
                    if (item.appGroups && Array.isArray(item.appGroups)) {
                        item.appGroups.forEach((grpData: any) => {
                            const Ag = {
                                name: grpData.name,
                                apps: [`${grpData.apps.length} Apps`],
                                icon: < RiBankFill />,
                                tenant: item.name
                            }
                            appGrpData.push(Ag)
                        })
                    }
                })
            }
            setMappingAppGrp(appGrpData)
        }
    }, [tenant, tenantInfo])

    return (
        <div className='flex flex-col gap-3 border border-black/15 p-3 w-full h-full rounded-md ml-4 bg-white'>
            <div className='flex justify-between'>
                <h1 className='text-sm font-semibold'>AppGroups</h1>
                <h2 className='text-xs'>View all</h2>
            </div>
            <div className='grid grid-cols-2 grid-rows-5 gap-3 h-[90%] text-xs rounded-md'>
                {mappingAppGrp.map((bank, index) => (
                    <div key={index} className='flex flex-col bg-[#F4F5FA] border border-black/15 justify-center rounded-md'>
                        <Button className='flex ml-4 focus:outline-none'>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex gap-3 items-center'>
                                    <div className='bg-white p-2 text-[#0736C4] rounded-md'>
                                        {bank.icon}
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className='rounded-md text-xs font-medium'>{bank.name}</h3>
                                        <div className='text-[10px] text-start'>
                                            {bank.apps.map((app: any, appIndex: any) => (
                                                <div key={appIndex}>
                                                    {app}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <ThreeDots />
                            </div>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Card