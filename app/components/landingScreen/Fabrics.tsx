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

    return (
        <div className='flex flex-col bg-white gap-2 p-4 ml-4 mt-4 border border-black/15 w-full h-[35%] rounded-md'>
            <h2 className='text-sm font-semibold'>Fabrics</h2>
            <div className='flex gap-2'>
                <Button onPress={() => handleFabricChange('df')} className={`flex flex-col gap-3 outline-none w-[24%] p-2 ${fabric === 'df' ? 'bg-[#f1f1f0]' : 'bg-[#F4F5FA]'} text-[0.9vw] font-medium rounded-md text-nowrap mt-1`}><DataFabric fill='#0736C4' />Data Fabric</Button>
                <Button onPress={() => handleFabricChange('uf')} className={`flex flex-col gap-3 outline-none w-[24%] p-2 ${fabric == 'uf' ? 'bg-[#f1f1f0]' : 'bg-[#F4F5FA]'} text-[0.9vw] font-medium rounded-md text-nowrap`}><UserFabric fill='#03A9F4' />UI Fabric</Button>
                <Button onPress={() => handleFabricChange('pf')} className={`flex flex-col gap-3 outline-none w-[24%] p-2 ${fabric == 'pf' ? 'bg-[#f1f1f0]' : 'bg-[#F4F5FA]'} text-[0.9vw] font-medium rounded-md text-nowrap`}><ProcessFabric fill='#13CC78' />Process Fabric</Button>
                <Button onPress={() => handleFabricChange('sf')} className={`flex flex-col gap-3 outline-none w-[24%] p-2 ${fabric == 'sf' ? 'bg-[#f1f1f0]' : 'bg-[#F4F5FA]'} text-[0.9vw] font-medium rounded-md text-nowrap`}><SecurityFabric fill='#FFBE00' />Security Fabric</Button>
            </div>
        </div>
    )
}

export default Fabrics
