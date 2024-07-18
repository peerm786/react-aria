import React from "react";
import {
  AccountSettingsIcon,
  AppearanceIcon,
  AppSetupIcon,
  LinkedAccountsIcon,
  TenantSetupIcon,
  UserSettingsIcon,
} from "../constants/svgApplications";

const Settings = () => {
  const SettingsMenu = [
    { Icon: TenantSetupIcon, name: "Tenant Setup" },
    { Icon: AppSetupIcon, name: "App Setup" },
    { Icon: UserSettingsIcon, name: "User Settings" },
    { Icon: AppearanceIcon, name: "Appearance" },
    { Icon: AccountSettingsIcon, name: "Account Settings" },
    { Icon: LinkedAccountsIcon, name: "Linked Accounts" },
  ];
  return (
    <div className="p-2 w-[45vw]">
      <h1 className="w-full border-b">Settings</h1>
      <div className="flex">
        <section aria-label="SettingsMenu" className="flex flex-col gap-3 first:mt-2">
          {SettingsMenu.map(({ Icon, name }, index) => (
            <div className={`w-full flex gap-2 text-sm ${
                index === 2 ? "border-b" : ""
              }`}>
                <Icon />{name}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Settings;
