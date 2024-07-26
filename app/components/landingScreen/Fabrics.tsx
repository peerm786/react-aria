import React from 'react'
import { Button } from 'react-aria-components'
import { DataFabric, ProcessFabric, SecurityFabric, UserFabric } from '../../constants/svgApplications'

const Fabrics = ({ fabric, setFabric }: { fabric: string, setFabric: (fabric: string) => void }) => {

    const handleFabricChange = (fab: string) => {
        if (fab !== fabric) {
            setFabric(fab)
        } else {
            setFabric('')
        }
    }

    const fabricData = [
        { fabric: "df", displayParam: "Data Fabric", icon: <DataFabric fill='#0736C4' /> },
        { fabric: "uf", displayParam: "UI Fabric", icon: <UserFabric fill='#03A9F4' /> },
        { fabric: "pf", displayParam: "Process Fabric", icon: <ProcessFabric fill='#13CC78' /> },
        { fabric: "sf", displayParam: "Security Fabric", icon: <SecurityFabric fill='#FFC107' /> }
    ]

    return (
        <div className='flex flex-col bg-white gap-2 p-4 ml-4 mt-4 border border-black/15 w-full h-[35%] rounded-md'>
            <h2 className='text-sm font-semibold'>Fabrics</h2>
            <div className='flex gap-2'>
                {
                    fabricData.map((fab, i) => (
                        <Button onPress={() => handleFabricChange(fab.fabric)} className={`flex flex-col gap-3 outline-none w-[24%] p-2 ${fabric === fab.fabric ? 'bg-[#0736C4]/15' : 'bg-[#F4F5FA]'} text-[0.9vw] font-medium rounded-md text-nowrap mt-1`}>{fab.icon}{fab.displayParam}</Button>
                    ))
                }
            </div>
        </div>
    )
}

export default Fabrics