import React, { useState } from "react";
import { Button, Input } from "react-aria-components";
import { SearchIcon, TorusLogo } from "../constants/svgApplications";
import DropDown from "./multiDropdownnew";

const Topbar = () => {

    const [selectedTenant, setSelectedTenant] = useState<string>("")

    return (
        <nav
            aria-label="Navbar"
            className="flex w-full p-3 pt-2"
        >
            <div className="flex w-full justify-between items-center">
                <div className="flex">
                    <TorusLogo />
                    <h2 className="font-semibold">TORUS</h2>
                </div>
                <div className="relative ">
                    <span className="absolute inset-y-0 left-0 flex items-center p-2 h-7 w-7">
                        <SearchIcon />
                    </span>
                    <Input
                        placeholder="Search"
                        className={`w-[180%] p-1 focus:outline-none focus:border-blue-400 border pl-6 text-sm font-medium rounded-md`}
                    />
                </div>
                <div className="flex">
                    <DropDown
                        triggerButton="Tenant Selector"
                        selectedKeys={selectedTenant}
                        setSelectedKeys={setSelectedTenant}
                        items={["ABC"]}
                        classNames={{
                            triggerButton: "min-w-40 rounded-lg text-xs font-medium mt-2 bg-[white] dark:bg-[#0F0F0F] dark:text-white",
                            popover: "w-40",
                            listbox: "overflow-y-auto",
                            listboxItem: "flex text-sm justify-between",
                        }}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Topbar;





{/* <div className="flex items-center h-fit gap-2">
<DialogTrigger>
    <Button
        className={`text-white pb-2 text-xs gap-1 p-2 items-center focus:outline-none bg-[#0736C4] flex rounded`}
    >
        <PlusIcon height={16} fill="white" />Create a New App
    </Button>
    <Popover className={"w-[10%]"} placement="bottom">
        <Dialog className="border bg-white focus:outline-none rounded-lg">
            {({ close }) => (
                <div className="flex flex-col p-2 gap-2">
                    <Input
                        placeholder="App Name"
                        className="text-xs font-medium focus:outline-none border px-2 py-1"
                    />
                    <Button className="bg-gray-300 font-medium text-xs px-2 py-1" onPress={close}>Create App</Button>
                </div>
            )}
        </Dialog>
    </Popover>
</DialogTrigger>
<BellIcon />
<TorusAvatar radius="full" />
</div> */}