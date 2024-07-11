'use client'
import { useEffect, useState } from 'react'
import { Button } from './src/Button'
import { Select, SelectItem } from './src/Select'
import { Separator } from './src/Separator'
import FabricSelector from './components/Tab'
import MenuItemAccordian from './components/MenuItemAccordian'
import { AxiosService } from '../lib/utils/axiosService'
import { toast } from 'react-toastify'

const page = () => {
  const [selectedBuildButton, setSelectedBuildButton] = useState(true)
  const [selectedHistoryButton, setSelectedHistoryButton] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<string>("")
  const [selectAppGroup, setSelectAppGroup] = useState<string>("")
  const [selectApp, setSelectApp] = useState<string>("")
  const [tenantList, setTenantList] = useState<string[]>([])
  const [appGrpList, setAppGrpList] = useState<string[]>([])
  const [appList, setAppList] = useState<string[]>([])

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
          <Select selectedKey={selectedTenant} onSelectionChange={handleTenantselect} label='Tenant' className={"min-w-[250px] rounded-lg mt-2 border border-[#D6BBFB]"}>
            {tenantList.map((tenant: string, id: number) => (
              <SelectItem key={id} id={tenant}>
                {tenant}
              </SelectItem>
            ))}
          </Select>

          <Select isDisabled={!selectedTenant} selectedKey={selectAppGroup} onSelectionChange={handleAppGroupselect} label='AppGroup'
            className={"min-w-[250px] rounded-lg mt-2 border border-[#D6BBFB]"}>
            {appGrpList.map((ag: string, id: number) => (
              <SelectItem key={id} id={ag}>
                {ag}
              </SelectItem>
            ))}
          </Select>

          <Select isDisabled={!selectAppGroup} selectedKey={selectApp} onSelectionChange={handleAppselect} label='App' className={"min-w-[250px] rounded-lg mt-2 border border-[#D6BBFB]"}>
            {appList.map((app: string, id: number) => (
              <SelectItem key={id} id={app}>
                {app}
              </SelectItem>
            ))}
          </Select>
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