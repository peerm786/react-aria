"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
    TorusColumn,
    TorusRow,
    TorusTable,
    TorusTableHeader,
} from "../torusComponents/torusTable"
import {
    About,
    Account,
    App,
    Apperance,
    ApplicationSettings,
    Billing,
    Calender,
    Checked,
    ColumnIcon,
    DeleteIcon,
    Integration,
    Management,
    Notification,
    Org,
    PlusIcon,
    Profile,
    PSicon,
    Roles,
    SearchIcon,
    Security,
    SettingsIcon,
    Tenant,
    UnChecked,
    Whatsnew,
} from "../../constants/svgApplications"
import { Button, Checkbox, Input, Select, Separator } from "react-aria-components";
import { Cell, Column, Row, Table, TableBody, TableHeader } from "react-aria-components";
import DropDown from "../multiDropdownnew";
import TorusAvatar from "../Avatar";
import { AxiosService } from "../../../lib/utils/axiosService";
import DynamicGroupMemberTable from "./dynamicGroupMemberTable";
import AppGroupTable from "./appGroupTable";

interface App {
    code: string;
    name: string;
    description: string;
    icon: string;
}

interface AppGroup {
    code: string;
    name: string;
    description: string;
    icon: string;
    APPS: App[];
}

interface Org {
    orgCode: string;
    orgName: string;
}

interface OrgGrp {
    orgGrpCode: string;
    orgGrpName: string;
    org: Org[];
}

interface Role {
    roleCode: string;
    roleName: string;
}

interface RoleGrp {
    roleGrpCode: string;
    roleGrpName: string;
    roles: Role[];
}

interface Ps {
    psCode: string;
    psName: string;
}

interface PsGrp {
    psGrpCode: string;
    psGrpName: string;
}

const SetupScreen = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [Columns, setColumns] = useState<any>([]);
    const [data, setData] = useState<any>([]);
    const [appGrpData, setAppGrpData] = useState<any>([]);
    const [orgGrpData, setOrgGrpData] = useState<any>([]);
    const [roleGrpData, setRoleGrpData] = useState<any>([]);
    const [psGrpData, setPsGrpData] = useState<any>([]);

    const getTenantProfile = async () => {
        try {
            const response = await AxiosService.get(`/tp/getTenantInfo?tenant=ABC`);
            if (response.status === 200) {
                setAppGrpData(response.data.AG);
                setOrgGrpData(response.data.orgGrp);
                setRoleGrpData(response.data.roleGrp);
                setPsGrpData(response.data.psGrp);
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTenantProfile();
    }, []);

    const getDisplayData: (controller: string) => {
        data: OrgGrp[] | RoleGrp[] | PsGrp[]; onUpdate: (updatedData: OrgGrp[] | RoleGrp[] | PsGrp[]) => void; assetType: "org" | "roles" | "ps"
    } = useCallback((controller) => {
        switch (controller) {
            case "org":
                return { data: orgGrpData, onUpdate: setOrgGrpData, assetType: "org" };
            case "role":
                return {
                    data: roleGrpData,
                    onUpdate: setRoleGrpData,
                    assetType: "roles",
                };
            case "ps":
                return { data: psGrpData, onUpdate: setPsGrpData, assetType: "ps" };
            default:
                throw new Error(`Invalid controller value: ${controller}`);
        }
    }, [orgGrpData, roleGrpData, psGrpData]);

    const tabledata = [
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            name: "Susan Andrews",
            email: "james.williams@example.com",
            templateType: 'Template 1',
            noofproductsservice: 12,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 05, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 2',
            noofproductsservice: 10,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 06, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 3',
            noofproductsservice: 12,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 05, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 1',
            noofproductsservice: 10,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 06, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 1',
            noofproductsservice: 12,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 05, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 2',
            noofproductsservice: 10,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 06, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 1',
            noofproductsservice: 12,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 05, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 2',
            noofproductsservice: 10,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 06, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 1',
            noofproductsservice: 12,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 05, 2024',
        },
        {
            users: {
                name: "Susan Andrews",
                email: "james.williams@example.com"

            },
            templateType: 'Template 2',
            noofproductsservice: 10,
            accessExpires: '31.07.2024',
            lastActive: 'June 30, 2024 | 15:10:24',
            dateAdded: 'May 06, 2024',
        },
    ];

    const Columnchange = [
        'users',
        'templateType',
        'noofproductsservice',
        'accessExpires',
        'lastActive',
        'dateAdded',
    ];

    const TableCell = (item: any, column: any) => {
        switch (column.key) {
            case 'users':
                return <div className="flex gap-2 ">
                    <TorusAvatar size="sm" />
                    <div className="flex flex-col justify-center">
                        <span className="text-[0.83vw] leading-[1.04vw] font-medium">{item[column.key].name}</span>
                        <span className="text-[0.62vw] leading-[1.04vh] text-[#000000]/50">{item[column.key].email}</span>
                    </div>
                </div>
            case 'templateType':
                return <DropDown
                    triggerButton="Template1"
                    selectedKeys={item[column.id]}
                    setSelectedKeys={() => { }}
                    items={items}
                    classNames={{
                        triggerButton: `w-[10.52vw] h-[4vh] pressed:animate-torusButtonActive rounded-lg text-[0.83vw] leading-[2.22vh] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-[0.83vw] leading-[2.22vh] justify-between",
                    }}
                />
            case 'numOfProducts':
                return <div>{item[column.key]}</div>;
            case 'accessExpires':
                return <div className=" flex space-x-5 text-[0.72vw]  leading-[1.04vw]  px-4 py-2 rounded-md bg-[#F4F5FA]">
                    <span >{item[column.key]}</span>
                    <Calender />
                </div>;
            case 'lastActive':
                return <div >{item[column.key]}</div>;
            case 'dateAdded':
                return <div>{item[column.key]}</div>;
            default:
                return <div>{item[column.key]}</div>;
        }
    };

    const items = [
        { key: 'name', label: 'Name' },
        { key: 'organization', label: 'Organization' },
        { key: 'role', label: 'Role' },

    ];

    const menuItems = [
        {
            category: "Personal",
            items: [

                { name: "Profile", svg: <Profile />, code: 'profile' },
                { name: "Appearance", svg: <Apperance />, code: 'appearance' },
            ],
        },
        {
            category: "Configuration",
            items: [
                { name: "Tenant", svg: <Tenant />, code: 'tenant' },
                { name: "Application", svg: <App />, code: 'app' },
                { name: "Organization", svg: <Org />, code: 'org' },
                { name: "Roles & Groups", svg: <Roles />, code: 'role' },
                { name: "Product & Services", svg: <PSicon />, code: 'ps' },
            ],
        },
        {
            category: "Management",
            items: [{ name: "User Management", svg: <Management />, code: 'user' }],
        },

        {
            category: "General",
            items: [
                { name: "Security", svg: <Security />, code: 'security' },
                { name: "Notifications", svg: <Notification />, code: 'notification' },
                { name: "Billings", svg: <Billing />, code: 'billing' },

            ],
        },

    ];

    const handleMenuClick = (itemCode: string) => {
        setSelectedMenuItem(itemCode);
    };

    const dummyData = [
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
        { environmentType: 'Dev', hostnameServer: 'Dev Server', hostIP: '192.168.2.165', volumePath: '3005', app: 'App Code' },
    ];

    const visibleColumns = [
        "environmentType",
        "hostnameServer",
        "hostIP",
        "volumePath",
        "app"
    ];

    const RenderTableCell = (item: any, column: any) => {
        switch (column.id) {
            case "environmentType":
                return <div className="bg-[#F4F5FA] p-1 w-[10.52vw] h-[4.07vh] rounded-md">{item[column.id]}</div>
            case "hostnameServer":
                return <div className="w-[10.52vw] p-1 h-[4vh] bg-[#F4F5FA]  rounded-md ">
                    {item[column.id]}
                </div>
            case "hostIP":
                return <div className="w-[10.52vw] h-[4vh] p-1 bg-[#F4F5FA]  rounded-md">
                    {item[column.id]}
                </div>
            case "volumePath":
                return <div className="w-[10.52vw] h-[4vh] p-1 bg-[#F4F5FA] rounded-md">
                    {item[column.id]}
                </div>
            case "app":
                return <DropDown
                    triggerButton="Appcode"
                    selectedKeys={item[column.id]}
                    setSelectedKeys={() => { }}
                    items={items}
                    classNames={{
                        triggerButton: `w-[10.52vw] h-[4vh] pressed:animate-torusButtonActive rounded-lg text-[0.83vw] leading-[2.22vh] mt-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white`,
                        popover: "w-40",
                        listbox: "overflow-y-auto",
                        listboxItem: "flex text-[0.83vw] leading-[2.22vh] justify-between",
                    }}
                />
            default:
                return <div >
                    {item[column.id]}
                </div>
        }
    };

    return (
        <div className="w-full h-full">
            <div className="flex ml-4 p-3 items-center">
                <div className="flex gap-2 items-center text-[0.93vw] text-[#1A2024] leading-[2.22vh] font-semibold">
                    <ApplicationSettings /> Setup
                </div>
            </div>
            <hr className="w-[100%]"></hr>
            <div className="flex h-[82.5vh]">
                <div className="flex flex-col h-full w-[10.57vw] p-4 border-r">
                    {menuItems.map((section) => (
                        <div key={section.category} className="mb-4">
                            <h2 className="font-semibold text-[0.72vw] leading-[1.04vw] mb-2">
                                {section.category}
                            </h2>
                            <ul>
                                {section.items.map((item) => (
                                    <li
                                        key={item.code}
                                        className={`mb-2 cursor-pointer ${selectedMenuItem === item.code ? "text-[#0736C4]" : "text-[#000000]/50"
                                            }`}
                                        onClick={() => handleMenuClick(item.code)}
                                    >
                                        <div className="flex items-center text-[0.72vw] leading-[1.04vw]">
                                            <div className="mr-2">{item.svg}</div>
                                            <span>{item.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex w-[79.58vw] h-[82.5vh] p-4">
                    {selectedMenuItem === "user" && (
                        <div className="w-full h-full">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[1.25vw] leading-[1.04vw] font-semibold">User Management</h1>
                                    <p className="text-[0.83vw] leading-[1.04vw] text-[#000000]/50">
                                        Lorem Ipsum dolor sit amet,consectutar adipising elit
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 ">
                                    <div className="relative w-[100%] h-[4vh]">
                                        <span className="absolute inset-y-0 left-0 flex items-center p-[0.58vw] h-[2.18vw] w-[2.18vw] ">
                                            <SearchIcon width="0.83vw" height="0.83vw" />
                                        </span>
                                        <Input
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder="Search"
                                            className={` w-[20vw] bg-[#F4F5FA] p-[0.45vw] text-[0.72vw] h-[4vh] focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 border pl-[1.76vw] font-medium rounded-md dark:border-[#212121] dark:text-white`}
                                        />
                                    </div>
                                    <DropDown
                                        classNames={{
                                            popover: "w-[10vw] h-[25vh] overflow-y-auto",
                                            triggerButton:
                                                "w-[5.5vw] h-[4vh] border border-black/15 rounded-lg bg-[#F4F5FA] dark:border-[#212121] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]",
                                        }}
                                        triggerButton={
                                            <div className="flex text-xs font-medium items-center gap-1 dark:bg-[#0F0F0F] dark:text-[#FFFFFF]">
                                                <ColumnIcon />{" "}
                                                Filter
                                            </div>
                                        }
                                        items={items}
                                        selectedKeys={Columns}
                                        setSelectedKeys={setColumns}
                                        multiple
                                        displaySelectedKeys={false}
                                    />
                                    <Button className="flex items-center bg-blue-600 px-2 py-1 whitespace-nowrap  text-white rounded-md text-[0.72vw] leading-[1.04vw]">
                                        <PlusIcon />
                                        New user
                                    </Button>
                                    <Button className="flex items-center bg-[#F44336]/35 px-2 py-1 whitespace-nowrap  text-white rounded-md text-[0.72vw] leading-[1.04vw]">
                                        <DeleteIcon />
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <div className="w-[79.58vw] h-[60vh] overflow-y-scroll">
                                <TorusTable
                                    className=""
                                    primaryColumn="users"
                                    tableData={tabledata}
                                    visibleColumns={Columnchange}
                                    isSkeleton={true}
                                    searchValue={searchValue}
                                    selectionBehavior="toggle"
                                    selectionMode="multiple"
                                >
                                    {({ selectedKeys, filterColmns, sortedItems, primaryColumn }: any) => (
                                        <>
                                            <TorusTableHeader
                                                className="bg-[#F4F5FA] rounded-l"
                                                selectedKeys={selectedKeys}
                                                columns={[...filterColmns]}
                                            >
                                                {({ columns }: any) => (
                                                    <>
                                                        {columns.map((column: any, i: number) => (
                                                            <TorusColumn
                                                                key={column.id}
                                                                id={column.id}
                                                                allowsSorting={column.allowsSorting}
                                                                isRowHeader={column.isRowHeader}
                                                                className={`text-[0.72vw] leading-[1.04vw]  font-medium bg-[#F4F5FA] rounded-r dark:bg-[#0F0F0F] dark:text-[#FFFFFF] cursor-pointer ${i == 0 ? '' : ''
                                                                    } ${i == filterColmns.length - 1 ? '' : ''}`}
                                                            >
                                                                {column.name}
                                                            </TorusColumn>
                                                        ))}
                                                    </>
                                                )}
                                            </TorusTableHeader>
                                            {/* <Separator className="dark:border-[#212121] border border-black" /> */}
                                            <TableBody
                                                renderEmptyState={() => <div className="text-center overflow-y-auto">No Process log detail found</div>}
                                            >
                                                {sortedItems.map((item: any, index: number) => (
                                                    <TorusRow
                                                        key={index}
                                                        item={item}
                                                        // id={index}
                                                        index={item[primaryColumn]}
                                                        columns={[...filterColmns]}
                                                        selectedKeys={selectedKeys}
                                                        className="text-[0.72vw] leading-[1.04vw]  dark:hover:text-white outline-none hover:cursor-pointer border-b-slate-800 overflow-y-auto border-t-transparent border-l-transparent border-r-transparent dark:bg-[#161616] dark:text-[#FFFFFF]"
                                                    >
                                                        {({ columns, index, item }: any) => (
                                                            <>
                                                                {columns.map((column: any, i: number) => (
                                                                    <Cell key={i} className="">
                                                                        <div className="w-full h-full flex flex-col items-center justify-center py-[1rem]">
                                                                            {TableCell(item, column)}
                                                                        </div>
                                                                    </Cell>
                                                                ))}
                                                            </>
                                                        )}
                                                    </TorusRow>
                                                ))}
                                            </TableBody>
                                        </>
                                    )}
                                </TorusTable>
                            </div>
                        </div>
                    )}
                    {selectedMenuItem === "tenant" && (
                        <div className="w-full h-full" >
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-[1.25vw] leading-[1.04vw] font-semibold">Tenant</h1>
                                    <p className="text-[0.83vw] leading-[1.04vw] text-[#000000]/50">
                                        Lorem Ipsum dolor sit amet,consectutar adipising elit
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 ">
                                    <div className="relative w-[100%] h-[4vh]">
                                        <span className="absolute inset-y-0 left-0 flex items-center p-[0.58vw] h-[2.18vw] w-[2.18vw] ">
                                            <SearchIcon width="0.83vw" height="0.83vw" />
                                        </span>
                                        <Input
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            placeholder="Search"
                                            className={` w-[20vw] bg-[#F4F5FA] p-[0.45vw] text-[0.72vw] h-[4vh] focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 border pl-[1.76vw] font-medium rounded-md dark:border-[#212121] dark:text-white`}
                                        />
                                    </div>
                                    <DropDown
                                        classNames={{
                                            popover: "w-[10vw] h-[25vh] overflow-y-auto",
                                            triggerButton:
                                                "w-[5.5vw] h-[4vh] border border-black/15 rounded-lg bg-[#F4F5FA] dark:border-[#212121] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]",
                                        }}
                                        triggerButton={
                                            <div className="flex text-xs font-medium items-center gap-1 dark:bg-[#0F0F0F] dark:text-[#FFFFFF]">
                                                <ColumnIcon />{" "}
                                                Filter
                                            </div>
                                        }
                                        items={items}
                                        selectedKeys={Columns}
                                        setSelectedKeys={setColumns}
                                        multiple
                                        displaySelectedKeys={false}
                                    />
                                    <Button className="flex items-center bg-blue-600 px-2 py-1 whitespace-nowrap  text-white rounded-md text-[0.72vw] leading-[1.04vw]">
                                        <PlusIcon />
                                        New user
                                    </Button>
                                    <Button className="flex items-center bg-[#F44336]/35 px-2 py-1 whitespace-nowrap  text-white rounded-md text-[0.72vw] leading-[1.04vw]">
                                        <DeleteIcon />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div className="w-[79.58vw] h-[60vh] overflow-y-scroll ">
                                <TorusTable
                                    className=""
                                    primaryColumn=""
                                    tableData={dummyData}
                                    visibleColumns={visibleColumns}
                                    isSkeleton={true}
                                    searchValue={searchValue}
                                    selectionBehavior="toggle"
                                    selectionMode="multiple"
                                >
                                    {({ filterColmns, sortedItems, primaryColumn }: any) => (
                                        <>
                                            <TorusTableHeader columns={[...filterColmns]} className="w-[79.58vw] h-[4.81vh] bg-[#F4F5FA] rounded-l">
                                                {({ columns }: any) => (
                                                    <>
                                                        {columns.map((column: any, i: number) => (
                                                            <TorusColumn
                                                                key={column.id}
                                                                id={column.id}
                                                                allowsSorting={column.allowsSorting}
                                                                isRowHeader={column.isRowHeader}
                                                                className={`text-[0.72vw] leading-[1.04vw]  font-medium bg-[#F4F5FA] rounded-r dark:bg-[#0F0F0F] dark:text-[#FFFFFF] cursor-pointer ${i == 0 ? '' : ''
                                                                    } ${i == filterColmns.length - 1 ? '' : ''}`}
                                                            >
                                                                {column.name}
                                                            </TorusColumn>
                                                        ))}
                                                    </>
                                                )}
                                            </TorusTableHeader>
                                            <Separator className="dark:border-[#212121] border border-black" />
                                            <TableBody
                                                renderEmptyState={() => (
                                                    <div className="text-center "> No Process log detail found </div>
                                                )}
                                            >
                                                {sortedItems.map((item: any, index: number) => (
                                                    <TorusRow
                                                        key={index}
                                                        item={item}
                                                        id={index}
                                                        index={item[primaryColumn]}
                                                        columns={[...filterColmns]}
                                                        className={
                                                            '  dark:hover:bg-[#0F0F0F] dark:hover:text-white outline-none hover:cursor-pointer border-b-slate-800 overflow-y-auto border-t-transparent border-l-transparent border-r-transparent dark:bg-[#161616] dark:text-[#FFFFFF]'
                                                        }
                                                    >
                                                        {({ columns, item }: any) => (
                                                            <>
                                                                {columns.map((column: any, i: number) => (
                                                                    <Cell key={i} className={'border-b  text-[0.72vw] leading-[2.22vh] border-transparent  '}>
                                                                        <div className=" flex items-center justify-center ml-11 ">

                                                                            {RenderTableCell(item, column)}
                                                                        </div>
                                                                    </Cell>
                                                                ))}
                                                            </>
                                                        )}
                                                    </TorusRow>
                                                ))}
                                            </TableBody>
                                        </>
                                    )}
                                </TorusTable>
                            </div>
                        </div>
                    )}
                    {selectedMenuItem === "app" && (
                        <div>
                            <AppGroupTable data={appGrpData} onUpdate={setAppGrpData} />
                        </div>
                    )}
                    {(selectedMenuItem === "org" || selectedMenuItem === "role" || selectedMenuItem === "ps") && (
                        <div>
                            <DynamicGroupMemberTable
                                {...getDisplayData(selectedMenuItem)}
                                groupFields={
                                    selectedMenuItem === "org"
                                        ? ["orgGrpCode", "orgGrpName"]
                                        : selectedMenuItem === "role"
                                            ? ["roleGrpCode", "roleGrpName"]
                                            : ["psGrpCode", "psGrpName"]
                                }
                                memberFields={
                                    selectedMenuItem === "org"
                                        ? ["orgCode", "orgName"]
                                        : selectedMenuItem === "role"
                                            ? ["roleCode", "roleName"]
                                            : ["psCode", "psName"]
                                }
                                headerFields={
                                    ["code", "name"]
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default SetupScreen;
