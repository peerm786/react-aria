import React from 'react'
import { Button } from 'react-aria-components'
import { DataFabric, ProcessFabric, SecurityFabric, UserFabric } from '../../constants/svgApplications'

const Fabrics = () => {
    return (
        <div className='flex flex-col bg-white gap-3 p-4 ml-4 mt-4 border border-black/15 w-[40%] h-[28%] rounded-md'>
            <h2 className='text-sm font-semibold'>Fabrics</h2>
            <div className='flex gap-2'>
                <Button className="flex flex-col gap-3 outline-none w-[25%] p-2 bg-[#F4F5FA] text-xs font-medium rounded-md"><DataFabric />Data Fabric</Button>
                <Button className="flex flex-col gap-3 outline-none w-[25%] p-2 bg-[#F4F5FA] text-xs font-medium rounded-md"><UserFabric fill='#03A9F4' />UI Fabric</Button>
                <Button className="flex flex-col gap-3 outline-none w-[25%] p-2 bg-[#F4F5FA] text-xs font-medium rounded-md"><ProcessFabric fill='#13CC78' />Process Fabric</Button>
                <Button className="flex flex-col gap-3 outline-none w-[25%] p-2 bg-[#F4F5FA] text-xs font-medium rounded-md"><SecurityFabric fill='#FFBE00' />Security Fabric</Button>
            </div>
        </div>
    )
}

export default Fabrics
