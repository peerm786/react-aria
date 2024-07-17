import React from "react";
import { AccountSettingsIcon, AppearanceIcon, AppSetupIcon, LinkedAccountsIcon, TenantSetupIcon, UserSettingsIcon } from "../constants/svgApplications";

const Settings = () => {
  const MenuItems = [
    { icon: TenantSetupIcon, name: "Tenant Setup" },
    { icon: AppSetupIcon, name: "App Setup" },
    {icon : UserSettingsIcon , name : "User Settings"},
    {icon : AppearanceIcon , name:"Appearance"},
    {icon : AccountSettingsIcon , name : "Account Settings"},
    {icon : LinkedAccountsIcon , name : "Linked Accounts"},
  ];
  return (
    <div className="p-2 w-[45vw]">
      <h1 className="w-full border-b">Settings</h1>
    </div>
  );
};

export default Settings;
