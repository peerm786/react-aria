'use client'
// import Selectitem from './components/Nav'
import { useState } from 'react'
import { Button } from './src/Button'
import { Select, SelectItem } from './src/Select'
import { Separator } from './src/Separator'
import TabsExample from './components/Tab'
import TreeComponent from './components/MenuItemAccordian'

const page = () => {
  const [selectedBuildButton, setSelectedBuildButton] = useState(false)
  const [selectedHistoryButton, setSelectedHistoryButton] = useState(false)
  const [selectTenantValue, setSelectTenantValue] = useState<string | undefined>("")
  const [selectAppGroupValue, setSelectAppGroupValue] = useState<string | undefined>("")
  const [selectAppValue, setSelectAppValue] = useState<string | undefined>("")

  const handleBuildButtonSelect = () => {
    setSelectedBuildButton(true)
    setSelectedHistoryButton(false)
  }

  const handleHistoryButtonSelect = () => {
    setSelectedHistoryButton(true)
    setSelectedBuildButton(false)
  }

  const handleTenantselect = (e: any) => {
    setSelectTenantValue(e);
  }
  const handleAppGroupselect = (e: any) => {
    setSelectAppGroupValue(e);
  }
  const handleAppselect = (e: any) => {
    setSelectAppValue(e);
  }

  return (
    <div className='flex flex-col w-full h-screen overflow-y-hidden'>
      <div className='flex w-full justify-between'>
        <div className='flex gap-3 pt-2 pl-4'>
          <Button
            className={`${selectedBuildButton ? "font-bold" : ""} rounded-lg border-none`}
            onPress={handleBuildButtonSelect}
          >
            Build
          </Button>
          <Button
            className={`${selectedHistoryButton ? "font-bold" : ""} rounded-lg border-none`}
            onPress={handleHistoryButtonSelect}
          >
            History
          </Button>
        </div>
        <div className='pt-2 pr-3'>
          <Button className={"text-[12px] rounded-lg border-none text-[#0736C4] bg-blue-50 px-2 py-1"}>Build</Button>
        </div>
      </div>
      <div className='pt-2'>
        <Separator />
      </div>
      <div className='flex w-full justify-between'>
        <div className='flex gap-5 pl-4'>
          <Select selectedKey={selectTenantValue} onSelectionChange={handleTenantselect} label='Tenant' className={"min-w-[250px] rounded-lg mt-2 border border-violet-400"}>
            <SelectItem id={"ABC"}>ABC</SelectItem>
            <SelectItem id={"GSS"}>GSS</SelectItem>
            <SelectItem id={"GF"}>GF</SelectItem>
          </Select>
          <Select selectedKey={selectAppGroupValue} onSelectionChange={handleAppGroupselect} label='AppGroup' className={"min-w-[250px] rounded-lg mt-2 border border-violet-400"}>
            <SelectItem id={"MSP"}>MSP</SelectItem>
            <SelectItem id={"DEMO"}>DEMO</SelectItem>
            <SelectItem id={"TEST"}>TEST</SelectItem>
          </Select>
          <Select selectedKey={selectAppValue} onSelectionChange={handleAppselect} label='App' className={"min-w-[250px] rounded-lg mt-2 border border-violet-400"}>
            <SelectItem id={"ME"}>ME</SelectItem>
            <SelectItem id={"DEMOAPP"}>DEMOAPP</SelectItem>
            <SelectItem id={"TESTAPP"}>TESTAPP</SelectItem>
          </Select>
        </div>
        <div className='flex gap-2 justify-end'>
          <Button size='xs' className={"bg-red-100 rounded-md text-red-400 px-4 mt-2"}>Clear</Button>
          <Button size='xs' className={"bg-gray-200 rounded-md text-black p-2 mt-2 mr-2"}>Clear All</Button>
        </div>
      </div>
      <div>
        <Separator className='mt-2' />
      </div>
      <div className='flex w-full h-full gap-3'>
        <div className='w-[25%] pt-3 pl-4 rounded-lg'>
          <TabsExample />
        </div>
        <div className='w-[75%] pt-3 pr-2'>
          <TreeComponent />
        </div>
      </div>
      {/* <Separator className='mt-2' /> */}
      {/* <Tabs>
        <TabList>
          <Tab className={({ isSelected }) => `${isSelected
            ? 'text-emerald-700 bg-white shadow'
            : 'text-gray-600 hover:bg-white/10 pressed:bg-white/10'
            }`}>menu1</Tab>
          <Tab>menu2</Tab>
          <Tab>menu3</Tab>
          <Tab>menu4</Tab>
        </TabList>
        <TabPanel>
        </TabPanel>
      </Tabs> */}
      {/* <DatePicker />
      <Button variant='destructive' className={"bg-blue-400"}>khgujh</Button>
      <TorusDropDown title="Select" selected={selectedKeys} setSelected={setSelectedKeys} /> */}
    </div>
  )
}

export default page

// 'use client'
// import React from 'react'
// import MultiDropDown from './components/multiDropDown'

// const page = () => {
//   return (
//     <div>
//       <MultiDropDown />
//     </div>
//   )
// }

// export default page
