import React, { useEffect, useState } from "react";
import { Input } from "react-aria-components";
import { SearchIcon, TorusLogo } from "../../constants/svgApplications";
import DropDown from "../multiDropdownnew";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";

const Topbar = ({
  tenant,
  setTenant,
  tenantInfo,
  setSearchTerm,
}: {
  tenant: string;
  setTenant: (tenant: string) => void;
  tenantInfo: any[];
  setSearchTerm: (searchTerm: string) => void;
}) => {
  const [selectedTenant, setSelectedTenant] = useState<string>("");
  const [tenantList, setTenantList] = useState<string[]>([]);
  const isDarkmode = useSelector((state: RootState) => state.main.useDarkMode);

  useEffect(() => {
    if (tenantInfo && Array.isArray(tenantInfo)) {
      setTenantList(tenantInfo.map((item: any) => item.name));
    }
  }, [tenantInfo]);

  return (
    <nav aria-label="Navbar" className="flex w-full p-[0.58vw] pt-[0.87vw]">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <TorusLogo />
          <h2 className="text-[1.25vw] leading-[2.66vh] font-medium">TORUS</h2>
        </div>
        <div className="flex w-[25%] relative items-center">
          <span className="absolute inset-y-0 left-0 p-[0.58vw]">
            <SearchIcon fill={isDarkmode ? "#FFFFFF" : "#000000"} width="0.65vw" height="0.65vw" />
          </span>
          <Input
            placeholder="Search"
            className={`w-full p-[0.29vw] focus:outline-none focus:border-blue-400 border pl-[1.46vw] text-[0.72vw] leading-[2.22vh] rounded-md dark:border-[#212121]`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex">
          <DropDown
            triggerButton="Tenant Selector"
            selectedKeys={tenant ? tenant : selectedTenant}
            setSelectedKeys={setTenant}
            items={tenantList}
            classNames={{
              triggerButton:
                "min-w-[11.71vw] mr-[1.75vw] rounded-lg text-[0.72vw] leading-[2.22vh] pt-[0.58vw] bg-[white] dark:bg-[#0F0F0F] dark:text-white",
              popover: "w-[11.71vw]",
              listbox: "overflow-y-auto",
              listboxItem: "flex text-[0.72vw] leading-[2.22vh] justify-between",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
