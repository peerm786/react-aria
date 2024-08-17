import React, { useCallback, useEffect, useState } from 'react';
import { Input } from 'react-aria-components';
import { Domain, Global, Globe, Lock, Member, Multiply, Privacy, Threecircles } from '../../../constants/svgApplications';
import DropDown from '../../multiDropdownnew';
import TorusAvatar from "../../Avatar";
import { VscCheck } from "react-icons/vsc";
import { Button } from 'react-aria-components';
import { AxiosService } from '../../../../lib/utils/axiosService';
import { getCookie } from '../../../../lib/utils/cookiemgmt';
import { toast } from 'react-toastify';

const people = [
    { name: 'Balaji Eswar', email: 'balaji@torus.tech', role: 'FullAccess' },
    { name: 'Susan Andrews', email: 'susan@torus.tech', role: 'can View' },
    { name: 'James Williams', email: 'james@torus.tech', role: 'can View' },
    { name: 'Robert Francisco', email: 'robert@torus.tech', role: 'can Edit' },
];
const accessOptions = [
    {
        id: 1,
        title: 'Privacy',
        description: 'Only users you choose can access',
        icon: Lock,
    },
    {
        id: 2,
        title: 'Public',
        description: 'Anyone with the link can access',
        icon: Globe,
    },
];

const userOptions = [
    {
        id: 1,
        title: 'Your Team',
        description: 'Only members of your team can access',
        icon: Member,
    },
    {
        id: 2,
        title: 'Anyone from Domain(s)',
        description: 'Only Users with your email domain can access',
        icon: Domain,
    },
];





const ArtifactSharingModal = ({ close, artifactDetails }: any) => {
    const [Share, setShare] = React.useState(true);
    const [Private, setPrivate] = React.useState(false);
    const [isSelected, setIsSelected] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectOption, setSelectOption] = useState(null)
    const [inputValue, setInputValue] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverContent, setPopoverContent] = useState<{ loginId: any; email: any; }[]>([]);
    const [searchTerm, setSearchTerm] = useState([])
    const [userList, setUserList] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const { artifactType, fabric, catalog, artifactGrp, artifactName, version, createdBy, sharingInfo } = artifactDetails;
    const [selectedPermission, setSelectedPermission] = useState<string>("can view");

    const [selectedKeys, setSelectedKeys] = useState(sharingInfo ? sharingInfo?.map((person: any) => (person?.accessType)) : null);
    const [sharingInfoList, setSharingInfoList] = useState(sharingInfo ? sharingInfo : null);
    const [usersSelectedOption, setUsersSelectedOption] = useState(null);
    const [linkAccessSelectedOption, setLinkAccessSelectedOption] = useState(null);

    // Function to handle when a new key is selected
    const handleSelectedKeys = (newKey: any, index: number) => {
        handleShare(newKey, sharingInfoList[index].sharedTo);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosService.get(`/tp/getUserList?client=${getCookie("client")}&type=c`);
                setUserList(response.data);
            } catch (error) {
                console.error("Error fetching user list", error);
            }
        };

        fetchData();
    }, []);

    const handleShare = async (accessType: string = "Can View", user?: any) => {
        try {
            const response = await AxiosService.post("/tp/shareArtifact ", {
                loginId: getCookie("loginId"),
                artifactType,
                fabric,
                catalog,
                artifactGrp,
                artifactName,
                version,
                shareTo: user ? user : selectedUser,
                accessType
            });
            if (response.status == 201) {
                setSharingInfoList(response.data)
                if (!user) toast.success("Artifact shared successfully")
                // close();
            } else {
                toast.error("Some error occured")
            }

        } catch (error) {
            toast.error("Some error occured")

        }

    }

    const handleshare = () => {
        setShare(true);
        setPrivate(false);
    };

    const handlepriv = () => {
        setPrivate(true);
        setShare(false);
    };
    const handleToggle = (id: any) => {
        setIsSelected(isSelected === id ? null : id);
        setSelectedOption(id);
        setSelectOption(id)
    };
    const handleInputChange = (event: any) => {
        const value = event.target.value;
        console.log(event.target.value)
        if (!value) {
            setIsPopoverOpen(false)

        }
        else {

            setIsPopoverOpen(true)
        }
        setInputValue(value);
        setSearchTerm(event.target.value)

        if (value) {

            const filteredData = userList.filter(item =>
                item.loginId.toLowerCase().includes(value.toLowerCase()) ||
                item.email.toLowerCase().includes(value.toLowerCase())
            );

            const content = filteredData.map(item => ({ loginId: item.loginId, email: item.email }));
            setPopoverContent(content);
        } else {
            setPopoverContent([]);
        }
    };

    const handleselectUser = (user: any) => {
        setSelectedUser(user)
        setIsPopoverOpen(false)
    }
    const handleLinkAccessToggle = (id: any) => {
        setLinkAccessSelectedOption(id);
    };


    const handleUsersToggle = (id: any) => {
        setUsersSelectedOption(id);
    };

    return (
        <div className='bg-white w-[37.25vw] rounded p-[0.2vw]'>
            <div className="flex justify-between w-full p-2">

                <div className="flex mt-[0.58vw] ml-[0.86vw] gap-[1.46vw] border-none ">
                    <Button
                        className={`${Share ? "text-[#1A2024]" : "text-[#1A2024]/35 border-none"} flex gap-[0.87vw] font-semibold text-[0.93vw] leading-[1.25vw]`}
                        onPress={handleshare}>
                        <Threecircles fill={`${Share ? "#1A2024" : "#AFB1B2"}`} />
                        Share
                    </Button>


                    <Button
                        className={`${Private ? "text-[#1A2024]" : "text-[#1A2024]/35 border-none"} flex text-sm gap-[0.58vw] text-[0.93vw] leading-[1.25vw]`}
                        onPress={handlepriv}>
                        <Privacy fill={`${Private ? "#1A2024" : "#AFB1B2"}`} />
                        Privacy
                    </Button>

                    <Button className='ouitline-none ml-[20.12vw] ' onPress={close}>
                        <Multiply />
                    </Button>
                </div>

            </div>

            <hr className='w-[100%] mt-[0.58vw] border-[#E5E9EB] dark:border-[#212121]' />


            {Share && (
                <div>
                    <div className="mt-[1.17vw] mx-[0.87vw] ">
                        <label className="text-[0.72vw] font-semibold  text-[#101828] leading-[1.25vw] mb-[0.87vw] block">Share with people and teams</label>
                        <div className="relative">
                            <div className='flex justify-between gap-[0.29vw]'>
                                {selectedUser ? <div className='flex w-full justify-between px-[0.87vw]'><span>{selectedUser.loginId}</span><span className='cursor-pointer' onClick={() => { setSelectedUser(null) }}>X</span></div> :
                                    <Input
                                        type="text"
                                        placeholder="Enter people,teams or email address"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        className="flex w-[28.11vw] p-[0.58vw]  text-[#101828] text-[0.83vw] leading-[1.25vw] bg-[#F4F5FA]  focus:outline-none  rounded"
                                    />}
                                <Button isDisabled={selectedUser ? false : true}
                                    onPress={() => { handleShare() }}
                                    className="p-[0.58vw] px-[1.46vw]  bg-[#0736C4] disabled:bg-[#4c68bd] self-end text-[#FFFFFF] text-[0.83vw] leading-[1.25vw] rounded-md"
                                >
                                    Share
                                </Button>

                            </div>
                            {isPopoverOpen && (
                                <div className=" absolute  mt-[0.58vw] left-0 bg-[#F4F5FA]  border w-[380px]  rounded-md p-[0.58vw] max-h-40 overflow-auto">
                                    <div className="flex flex-col">
                                        {popoverContent.length > 0 ? (
                                            popoverContent.map((item: any) => (
                                                <div key={item.email} className="flex p-[0.58vw]  hover:bg-[#cfd0d3]" onClick={() => handleselectUser(item)}>
                                                    <div className="flex">
                                                        <TorusAvatar radius="full" size="lg" />
                                                    </div>
                                                    <div className="flex flex-col ml-[0.58vw]">
                                                        <p className="text-sm font-medium">{item.loginId}</p>
                                                        <p className="text-xs text-gray-500">{item.email}</p>

                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-500">No results found</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    <hr className='w-[100%] mt-[0.58vw] border-[#E5E9EB]' />

                    <div className="mt-[0.29vw] mx-[0.14vw]">
                        <h3 className="font-semibold text-[0.72vw] leading-[1.25vw] text-[#101828] mx-[0.87vw]">People with Access</h3>
                        <div className="mt-[0.58vw] mx-[0.21vw]">
                            <div className="flex justify-between items-center py-[0.58vw]">

                                <div className='flex gap-[0.87vw] '>
                                    <TorusAvatar radius="full" size="md" />
                                    <div className='flex flex-col mb-[0.58vw]'>
                                        <p className="text-[0.85vw] leading-[1.06vw] mt-[0.48vw] font-medium ">{createdBy}</p>
                                    </div>
                                </div>
                                <div className='border border-black/15 rounded-lg bg-[#F4F5FA] p-[0.43vw] px-[2.34vw] text-[0.62vw] text-[#000000] mt-[0.58vw] leading-[1.25vw]'>Owner
                                </div>
                            </div>
                            {sharingInfoList ? sharingInfoList.map((person: any, i: any) => (
                                <div key={person?.sharedTo?.email} className="flex justify-between items-center py-[0.58vw]">
                                    <div className='flex gap-[0.87vw]  mb-[0.58vw items-center'>
                                        <TorusAvatar radius="full" size="md" />
                                        <div className='flex flex-col'>
                                            <p className="text-[0.85vw] leading-[1.06vw] font-medium">{person?.sharedTo?.loginId}</p>
                                            <p className="text-[0.63vw] leading-[1.25vw] text-[#000000]/50">{person?.sharedTo?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex  gap-[0.58vw] ">
                                        <DropDown
                                            triggerButton=""
                                            selectedKeys={person?.accessType}
                                            setSelectedKeys={(e) => handleSelectedKeys(e, i)}
                                            items={["Full Access", "Can View", "Can Edit"]}
                                            classNames={{
                                                triggerButton:
                                                    "w-[7vw] h-[2.5vw] flex items-center justify-center gap-[0.58vw] whitespace-nowrap rounded-lg bg-[#F4F5FA] border border-[#000000]/15 text-[0.62vw] leading-[1.25vw] text-[#000000] mt-[0.58vw]",
                                                popover: "w-40",
                                                listbox: "overflow-y-auto",
                                                listboxItem: "flex text-sm justify-between",
                                            }}
                                        />
                                    </div>
                                </div>
                            )) : <></>}
                        </div>
                    </div>
                </div>
            )}
            {Private && (
                <div className='w-full'>

                    <div className="p-[0.86vw] h-[51.2vh] ">
                        <h3 className="font-semibold text-[0.72vw] leading-[1.25vw] text-[#101828]">Link Access</h3>
                        {accessOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`flex gap-[0.87vw] bg-[#F4F5FA] rounded-md py-[0.87vw] px-[0.87vw] mb-[0.87vw] items-center cursor-pointer ${linkAccessSelectedOption === option.id ? '' : ''
                                    }`}
                                onClick={() => handleLinkAccessToggle(option.id)}
                            >
                                <span className="flex items-center ">
                                    <span className='bg-white p-[0.29vw] flex items-center justify-center rounded-full'><option.icon /></span>
                                </span>
                                <div className="flex flex-col font-medium text-[#101828] text-[0.85vw] leading-[1.06vw] ">
                                    {option.title}
                                    <div className='text-[0.62vw] text-[#000000]/50 leading-[1.25vw]'>{option.description}</div>
                                </div>

                                <div className="ml-auto cursor-pointer">
                                    <span
                                        className={`p-[0.29vw] flex items-center justify-center rounded-full ${linkAccessSelectedOption === option.id
                                            ? 'bg-blue-500'
                                            : 'border border-[#808080]/55'
                                            }`}
                                    >
                                        {linkAccessSelectedOption === option.id && (
                                            <VscCheck className="text-white w-[0.62vw] h-[1.11vh]" />
                                        )}
                                    </span>
                                </div>

                            </div>
                        ))}


                        <hr className="w-full mt-[0.58vw] border-[#E5E9EB] dark:border-[#212121]" />

                        <h3 className="font-semibold text-[0.72vw] leading-[1.25vw] text-[#101828]">Users</h3>
                        {userOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`flex gap-[0.87vw] bg-[#F4F5FA] rounded-md py-[0.87vw] px-[0.87vw] mb-[0.87vw] items-center cursor-pointer ${usersSelectedOption === option.id ? '' : ''
                                    }`}
                                onClick={() => handleUsersToggle(option.id)}
                            >
                                <span className="flex items-center">
                                    <span className='bg-white p-[0.29vw] flex items-center justify-center rounded-full'><option.icon /></span>
                                </span>
                                <div className="flex flex-col text-[#101828] text-[0.85vw] font-medium leading-[1.06vw]">
                                    {option.title}
                                    <div className='text-[0.62vw] text-[#000000]/50 leading-[1.25vw]'>{option.description}</div>
                                </div>
                                <div className="ml-auto cursor-pointer">
                                    <span
                                        className={`p-[0.29vw] flex items-center justify-center rounded-full ${usersSelectedOption === option.id
                                            ? 'bg-blue-500'
                                            : 'border border-[#808080]/55'
                                            }`}
                                    >
                                        {usersSelectedOption === option.id && (
                                            <VscCheck className="text-white w-[0.62vw] h-[1.11vh]" />
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <hr className="w-full mt-[0.58vw] border-[#E5E9EB] dark:border-[#212121]" />
            {Share && (
                <div className="flex items-center w-full bg-[#F4F5FA] rounded-md p-[0.29vw]  ">
                    <div className='ml-[0.58vw]'>
                        <Global />
                    </div>
                    <div className="flex-1 flex items-center p-[0.58vw]  text-[#101828] text-[0.83vw] leading-[1.25vw] ">
                        <span className="whitespace-normal text-[0.83vw] linear-[1.25vw] text-[#000000]/50  ">Anyone with the link</span>
                        <DropDown
                            triggerButton={selectedPermission}
                            selectedKeys={selectedPermission}
                            setSelectedKeys={setSelectedPermission}
                            items={["canview", "canEdit"]}
                            classNames={{
                                triggerButton: " w-35 gap-[0.29vw] text-[0.83vw] leading-[1.25vw] font-semibold text-[#000000]/50 ",
                                popover: "w-40",
                                listbox: "overflow-y-auto",
                                listboxItem: "flex text-sm  justify-between",
                            }}
                        />
                    </div>
                    <Button className="p-[0.29vw] px-[1.46vw] text-black  bg-[#FFFFFF] text-[0.83vw] leading-[1.25vw] rounded-md">
                        Copy Link
                    </Button>
                </div>

            )}
        </div>
    );
}

export default ArtifactSharingModal;

