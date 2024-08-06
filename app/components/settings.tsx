import React, { useEffect, useState } from "react";
import {
  AccountSettingsIcon,
  AppearanceIcon,
  AppSetupIcon,
  LinkedAccountsIcon,
  TenantSetupIcon,
  UserSettingsIcon,
} from "../constants/svgApplications";
import { Button } from "react-aria-components";
import { AxiosService } from "../../lib/utils/axiosService";
import { toast } from "react-toastify";
import ModalWindow from "../settings/ModalWindow";
import { RenderJson } from "./jsonUi/renderData";
import { sample } from "./jsonUi/samplejson";
import TorusToast from "./torusComponents/torusToast";
import DropDown from "./multiDropdownnew";
import { getCookie } from "../../lib/utils/cookiemgmt";

const Settings = () => {
  const [tenantInfo, setTenantInfo] = useState<null | any>(null);
  const [selectedButton, setSelectedButton] = useState("Tenant Setup");
  const [state, setState] = useState(sample);
  const [tenant, setTenant] = useState("");
  const [wordLength, setWordLength] = useState(0);
  const token = getCookie('token')
  const [tenantList, setTenantList] = useState<string[]>([]);

  const AuthorizedTenantDetails = async () => {
    try {
      if (token) {
        const res = await AxiosService.get(`/tp/AuthorizedTenantDetails`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setTenantList(res.data.map((item: any) => item.name))
      } else {
        console.log("no token")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AuthorizedTenantDetails()
  }, [])

  const handleSelectTenant = (e: string) => {
    setTenant(e);
    handleTenant(e);
  }

  const getFunction = (json: any) => {
    console.log(json);
  };

  const handleTenant = async (tenant?: string) => {
    setTenantInfo(null);
    const givenTenant = tenant || tenantList[0];
    const response = await AxiosService.get(`/tp/getTenantInfo?tenant=${givenTenant}`);
    if (response.status === 200) {
      setTenantInfo(response.data);
    } else {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Failed to fetch tenant info`,
          closeButton: false,
        } as any
      );
    }
  };

  const handleTenantProfile = async () => {
    try {
      const response = await AxiosService.post("tp/postTenantInfo", {
        tenant: tenant,
        data: tenantInfo,
      });
      if (response.status == 201) {
        toast.success("Tenant profile info updated");
      } else {
        toast.error("Some error occured");
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const SettingsMenu = [
    { Icon: TenantSetupIcon, name: "Tenant Setup" },
    { Icon: AppSetupIcon, name: "App Setup" },
    { Icon: UserSettingsIcon, name: "User Settings" },
    { Icon: AppearanceIcon, name: "Appearance" },
    { Icon: AccountSettingsIcon, name: "Account Settings" },
    { Icon: LinkedAccountsIcon, name: "Linked Accounts" },
  ];
  const colorThemes = [
    { color: "Red", bgClass: "bg-red-500" },
    { color: "Pink", bgClass: "bg-pink-500" },
    { color: "Purple", bgClass: "bg-purple-500" },
    { color: "Blue", bgClass: "bg-blue-500" },
    { color: "Green", bgClass: "bg-green-500" },
    { color: "Yellow", bgClass: "bg-yellow-500" },
    { color: "Orange", bgClass: "bg-orange-500" },
  ];

  return (
    <div className="p-4 w-[60vw] h-[80vh] bg-white rounded-md shadow-md flex">
      <div className="w-[20%] border-r">
        <h1 className="w-full border-b  font-semibold">Settings</h1>
        {SettingsMenu.map(({ Icon, name }, index) => (
          <Button
            onPress={() => {
              setSelectedButton(name);
              { selectedButton === "App Setup" && handleTenant() };
            }}
            key={index}
            className={`mt-2 text-xs gap-2 items-center p-2 rounded-md outline-none ${selectedButton == name ? "flex bg-[#F4F5FA]" : "flex cursor-pointer hover:bg-[#F4F5FA]"}`}
          >
            <Icon />
            {name}
          </Button>
        ))}
      </div>

      <div className="w-3/4 ml-4 mt-2">
        {selectedButton == "App Setup" && tenantInfo ? (
          <div className="flex flex-col h-full">
            <div className="flex ml-auto">
              <DropDown
                triggerButton="Tenant Selector"
                selectedKeys={tenant}
                setSelectedKeys={handleSelectTenant}
                items={tenantList}
                classNames={{
                  triggerButton:
                    "min-w-40 rounded-lg text-xs font-medium mt-2 bg-[#F4F5FA]",
                  popover: "w-40",
                  listbox: "overflow-y-auto",
                  listboxItem: "flex text-sm justify-between",
                }}
              />
            </div>
            {tenantInfo ? <ModalWindow json={tenantInfo} setjson={setTenantInfo} /> : null}
            <Button
              className={"flex outline-none bg-blue-500 text-white p-1 ml-auto rounded-lg"}
              onPress={handleTenantProfile}
            >
              Update Changes
            </Button>
          </div>
        ) : null}
        {selectedButton == "Tenant Setup" ? (
          <RenderJson json={state} functionality={getFunction} />
        ) : null}
        {selectedButton != "Tenant Setup" && selectedButton != "App Setup" && (
          <div>
            <h1 className="text-lg font-semibold mt-4 border-t  pb-2">
              Appearance
            </h1>
            <div>
              <h2 className="text-sm font-medium mb-2">Color Mode</h2>
              <p className="text-sm text-[#000000]">
                Choose to change the apperance of the Torus app
              </p>
              <div className="flex items-center py-2 mb-5  rounded-md gap-6 ">
                <Button className="bg-[#0736C4]  px-2 py-1 rounded-md   text-white">
                  Light
                </Button>
                <Button className="bg-[#F4F5FA] px-2 py-1 rounded-md  ">
                  Dark
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-medium mb-2">Themes</h2>
              <p className="text-sm text-[#000000] mb-2">
                Change the color theme of the app.
              </p>

              <div className="grid grid-cols-4 gap-2  ">
                {colorThemes.map((theme, index) => (
                  <Button
                    key={index}
                    value={theme.color}
                    className={`flex items-center w-[80%]  ${theme.bgClass} gap-2 rounded-md p-2  `}
                  >
                    <span
                      className={`w-2 h-2  ${theme.bgClass}  inline-block rounded-full border border-black`}
                    />
                    <span>{theme.color}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
