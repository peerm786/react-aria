'use client'
import { useEffect, useState } from 'react'
import { Button } from './src/Button'
import { Separator } from './src/Separator'
import FabricSelector from './components/Tab'
import MenuItemAccordian from './components/MenuItemAccordian'
import { AxiosService } from '../lib/utils/axiosService'
import { toast } from 'react-toastify'
import DropDown from './components/multiDropdownnew'

const page = () => {
  const [selectedBuildButton, setSelectedBuildButton] = useState(true)
  const [selectedHistoryButton, setSelectedHistoryButton] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<string>("")
  const [selectAppGroup, setSelectAppGroup] = useState<string>("")
  const [selectApp, setSelectApp] = useState<string>("")
  const [tenantList, setTenantList] = useState<string[]>([])
  const [appGrpList, setAppGrpList] = useState<string[]>([])
  const [appList, setAppList] = useState<string[]>([])


  console.log(appGrpList, "appGrpList");


  const handleBuildButtonSelect = () => {
    setSelectedBuildButton(true)
    setSelectedHistoryButton(false)
  }

  const handleHistoryButtonSelect = () => {
    setSelectedHistoryButton(true)
    setSelectedBuildButton(false)
  }

  const handleTenantselect = (e: any) => {
    setAppGrpList([])
    setSelectedTenant(e);
    setSelectAppGroup("")
    setSelectApp("")
    fetchAppGroup(e)
  }

  const handleAppGroupselect = (e: any) => {
    setAppList([])
    setSelectAppGroup(e);
    setSelectApp("")
    fetchApp(selectedTenant, e)
  }
  const handleAppselect = (e: any) => {
    setSelectApp(e);
  }

  const fetchTenants = async () => {
    try {
      const res = await AxiosService.get("/tp/getClientTenant?type=c");
      if (res.status == 200) {
        setTenantList(res.data as string[]);
      }
    } catch (error) {
      toast.error("Error fetching tenants");
    }
  };
  console.log(tenantList, "tenantList");


  const fetchAppGroup = async (tenant: string) => {
    try {
      const res = await AxiosService.get(`/tp/getappgrouplist?tenant=${tenant}`)
      if (res.status == 200) {
        setAppGrpList(res.data)
      }
    } catch (error) {
      toast.error("Error fetching Appgrp");
    }
  }

  const fetchApp = async (tenant: string, appGroup: string) => {
    try {
      const res = await AxiosService.get(`/tp/getapplist?tenant=${tenant}&appGroup=${appGroup}`)
      if (res.status == 200) {
        setAppList(res.data)
      }
    } catch (error) {
      toast.error("Error fetching Appgrp");
    }
  }

  useEffect(() => {
    fetchTenants();
  }, []);

  return (
    <div className='flex flex-col w-full h-screen overflow-y-hidden'>
      <div className='flex w-full justify-between'>
        <div className='flex gap-3 pt-2 pl-4'>
          <Button
            className={`${selectedBuildButton ? "font-semibold" : ""} rounded-lg border-none`}
            onPress={handleBuildButtonSelect}
          >
            Build
          </Button>
          <Button
            className={`${selectedHistoryButton ? "font-semibold" : ""} rounded-lg border-none`}
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
        <div className='flex outline-none gap-5 pl-4'>

          <DropDown
            triggerButton="Tenant"
            selectedKeys={selectedTenant}
            setSelectedKeys={handleTenantselect}
            items={tenantList}
            classNames={{
              triggerButton: "min-w-60 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA]",
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />

          <DropDown
            triggerButton="AppGroup"
            selectedKeys={selectAppGroup}
            setSelectedKeys={handleAppGroupselect}
            items={appGrpList}
            classNames={{
              triggerButton: `${selectedTenant ? "min-w-60 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA]" : ""}`,
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />

          <DropDown
            triggerButton="App"
            selectedKeys={selectApp}
            setSelectedKeys={handleAppselect}
            items={appList}
            classNames={{
              triggerButton: "min-w-60 rounded-lg text-sm font-medium mt-2 bg-[#F4F5FA]",
              popover: "w-60",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-sm justify-between",
            }}
          />

        </div>
        <div className='flex gap-2 justify-end'>
          <Button size='xs' className={"bg-red-50 font-semibold rounded-md text-red-400 px-5 mt-3"}>Clear</Button>
          <Button size='xs' className={"bg-gray-100 font-medium rounded-md text-black px-5 mt-3 mr-2"}>Clear All</Button>
        </div>
      </div>
      <div>
        <Separator className='mt-2' />
      </div>
      <div className='flex w-full h-full gap-3'>
        <div className='w-[25%] pt-3 pl-4 rounded-lg'>
          <FabricSelector tenant={selectedTenant} appGrp={selectAppGroup} app={selectApp} />
        </div>
        <div className='w-[75%] pt-3 pr-2'>
          <MenuItemAccordian />
        </div>
      </div>
    </div>
  )
}

export default page