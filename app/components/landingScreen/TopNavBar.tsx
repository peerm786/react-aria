import React, { useEffect, useState } from "react";
import { Input } from "react-aria-components";
import { SearchIcon, TorusLogo } from "../../constants/svgApplications";
import DropDown from "../multiDropdownnew";

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

  useEffect(() => {
    if (tenantInfo && Array.isArray(tenantInfo)) {
      setTenantList(tenantInfo.map((item: any) => item.name));
    }
  }, [tenantInfo]);

  return (
    <nav aria-label="Navbar" className="flex w-full p-3 pt-2">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <TorusLogo />
          <h2 className="text-[1.25vw] leading-[2.66vh] font-medium">TORUS</h2>
        </div>
        <div className="flex w-[25%] relative items-center">
          <span className="absolute inset-y-0 left-0 p-2 h-7 w-7">
            <SearchIcon width="0.65vw" height="0.65vw" />
          </span>
          <Input
            placeholder="Search"
            className={`w-full p-1 focus:outline-none focus:border-blue-400 border pl-5 text-[0.72vw] leading-[2.22vh] rounded-md dark:border-[#212121]`}
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
                "min-w-40 rounded-lg text-[0.72vw] leading-[2.22vh] mt-2 bg-[white] dark:bg-[#0F0F0F] dark:text-white",
              popover: "w-40",
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
