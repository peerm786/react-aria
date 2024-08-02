// import React, { useState, useEffect } from 'react';

// import {
//     Cell,
//     Column,
//     Row,
//     Tab,
//     Table,
//     TableBody,
//     TableHeader,
//     TabList,
//     TabPanel,
//     Tabs,
// } from 'react-aria-components';
// import { toast } from 'react-toastify';
// // import { avatar } from '@nextui-org/react';

// import Image from 'next/image';
// import picture from "../../constants/avatar.jpg"
// import TorusAvatar from '../Avatar';
// import JsonView from "react18-json-view";
// import { AxiosService } from '../../../lib/utils/axiosService';

// interface Vendor {
//     id: string;
//     name: string;
//     version: string;
//     fabric: string;
//     jobType: string;
//     node: string;
//     status: string;
//     madeBy: {
//         avatar: string;
//         name: string;
//     };
//     timestamp: string;
// }


// const VendorTable: React.FC = () => {
//     const [vendors, setVendors] = useState<Vendor[]>([]);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [tabListState, setTabListState] = useState<any>({});
//     const [activeTableRow, setActiveTableRow] = useState<number | null>(null);
//     const [tabData, setTabData] = useState({});
//     const [searchValue, setSearchValue] = useState('');
//     const [tab, settab] = useState('')

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await AxiosService.get("/log/processlog", {
//                     headers: {
//                         role: "Admin"
//                     }
//                 })
//                 if (res.status == 200) {
//                     setLoading(true);
//                     setData(res.data);
//                 } else {
//                     toast.error("Unable to get Process Log Details", { autoClose: 2000 });
//                     setLoading(true);
//                 }
//             } catch (err) {
//                 toast.error("Server error", { autoClose: 2000 });
//                 setLoading(true);
//             }
//         })();
//     }, []);

//     // const data = [{


//     //     "id": "1",
//     //     "name": "Bank master",
//     //     "version": "1.0",
//     //     "fabric": "Data",
//     //     "jobType": "Process",
//     //     "node": ["Manual Input",
//     //         "Amount check",
//     //         "Callcb",
//     //         "output",

//     //     ],

//     //     "status": "Success",
//     //     "madeBy": {
//     //         "avatar": <TorusAvatar radius='full' />,

//     //         "name": "Balaji Eswar"
//     //     },
//     //     "timestamp": ["june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24"
//     //     ]
//     // },
//     // {
//     //     "id": "2",
//     //     "name": "Transaction History",
//     //     "version": "2.0",
//     //     "fabric": "UI",
//     //     "jobType": "Process",
//     //     "node": ["Manual Input",
//     //         "Amount check",
//     //         "Callcb",
//     //         "output",

//     //     ],
//     //     "status": "Failure",
//     //     "madeBy": {
//     //         "avatar": <TorusAvatar radius='full' />,

//     //         "name": "Balaji Eswar"
//     //     },
//     //     "timestamp": ["june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24"
//     //     ]
//     // },
//     // {
//     //     "id": "3",
//     //     "name": "CCS Inward",
//     //     "version": "2.0",
//     //     "fabric": "Process",
//     //     "jobType": "Push",
//     //     "node": ["Manual Input",
//     //         "Amount check",
//     //         "Callcb",
//     //         "output",

//     //     ],
//     //     "status": "Failure",
//     //     "madeBy": {

//     //         "avatar": <TorusAvatar radius='full' />,
//     //         "name": "Balaji Eswar"
//     //     },
//     //     "timestamp": ["june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24"
//     //     ]
//     // },
//     // {
//     //     "id": "4",
//     //     "name": "Cheque Scanning",
//     //     "version": "2.0",
//     //     "fabric": "Security",
//     //     "jobType": "Build",
//     //     "node": ["Manual Input",
//     //         "Amount check",
//     //         "Callcb",
//     //         "output",

//     //     ],
//     //     "status": "Failure",
//     //     "madeBy": {
//     //         "avatar": <TorusAvatar radius='full' />,

//     //         "name": "Balaji Eswar"
//     //     },
//     //     "timestamp": ["june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24"
//     //     ]
//     // },
//     // {
//     //     "id": "5",
//     //     "name": "Bulk Upload",
//     //     "version": "2.0",
//     //     "fabric": "Data",
//     //     "jobType": "Process",
//     //     "node": ["Manual Input",
//     //         "Amount check",
//     //         "Callcb",
//     //         "output",

//     //     ],
//     //     "status": "Failure",
//     //     "madeBy": {
//     //         "avatar": <TorusAvatar radius='full' />,
//     //         "name": "Balaji Eswar"
//     //     },
//     //     "timestamp": ["june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24"
//     //     ]
//     // },
//     // {
//     //     "id": "6",
//     //     "name": "Wages Master",
//     //     "version": "2.0",
//     //     "fabric": "UI",
//     //     "jobType": "Process",
//     //     "node": ["Manual Input",
//     //         "Amount check",
//     //         "Callcb",
//     //         "output",

//     //     ],
//     //     "status": "Failure",
//     //     "madeBy": {
//     //         "avatar": <TorusAvatar radius='full' />,
//     //         "name": "Balaji Eswar"
//     //     },
//     //     "timestamp": ["june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24",
//     //         "june 26,2023 14:20:24"
//     //     ]
//     // }

//     // ]
//     const jsonData = [
//         {
//             "id": 1,
//             "key": ['Bank Master',
//                 // "Gss> First abhudhabibank>ipp",
//                 // "UID CT73hsbhjbh723",

//             ],
//             "version": '2.0',
//             "sessionInfo": {
//                 "avatar": <TorusAvatar radius='full' />,

//                 "name": "Balaji Eswar"

//             },
//             "Timestamp": 'june26,2023 14:20:24',
//             "errorcode": '404',
//         },
//         {
//             "id": "2",
//             "key": ['Transaction History',
//                 // "Gss> First abhudhabibank>ipp",
//                 // "UID CT73hsbhjbh723",

//             ],
//             "version": '1.2',
//             "sessionInfo": {
//                 "avatar": <TorusAvatar radius='full' />,

//                 "name": "Balaji Eswar"
//             },
//             "Timestamp": 'june26,2023 14:20:24',
//             "errorcode": '100',
//         },
//         {
//             "id": 3,
//             "key": ['Css Inward',
//                 "Gss> First abhudhabibank>ipp",
//                 "UID CT73hsbhjbh723",

//             ],
//             "version": '2.1',
//             "sessionInfo": {
//                 "avatar": <TorusAvatar radius='full' />,

//                 "name": "Balaji Eswar"
//             },
//             "Timestamp": 'june26,2023 14:20:24',
//             "errorcode": '200',
//         },
//         {
//             "id": '4',
//             "key": ['Cheque Scanning',
//                 // "Gss> First abhudhabibank>ipp",
//                 // "UID CT73hsbhjbh723",

//             ],
//             'version': '3.1',
//             'sessionInfo': {
//                 "avatar": <TorusAvatar radius='full' />,

//                 "name": "Balaji Eswar"
//             },
//             'Timestamp': 'june26,2023 14:20:24',
//             'errorcode': '301',
//         },
//         {
//             'id': '5',
//             "key": ['Bulk Upload',
//                 // "Gss> First abhudhabibank>ipp",
//                 // "UID CT73hsbhjbh723",

//             ],
//             'version': '2.4',
//             sessionInfo: {
//                 "avatar": <TorusAvatar radius='full' />,

//                 "name": "Balaji Eswar"

//             },
//             'Timestamp': 'june26,2023 14:20:24',
//             'errorcode': '401',
//         },
//         {
//             'id': '6',
//             "key": ['Wages Master',
//                 // "Gss> First abhudhabibank>ipp",
//                 // "UID CT73hsbhjbh723",

//             ],
//             'version': '1.8',
//             'sessionInfo': {
//                 "avatar": <TorusAvatar radius='full' />,

//                 "name": "Balaji Eswar"
//             },
//             'Timestamp': 'june26,2023 14:20:24',
//             'errorcode': '402',
//         },
//     ];



//     // const currentVendors = vendors.slice(
//     //     (currentPage - 1) * rowsPerPage,
//     //     currentPage * rowsPerPage
//     // );
//     // const totalPages = Math.ceil(vendors.length / rowsPerPage);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     return (
//         <div className='flex justify-between'>
//             <div className="container mx-auto p-4 h-screen">



//                 <Tabs>
//                     <TabList className="flex space-x-2">
//                         <Tab id="logDetails" className={`p-2 rounded-lg ${tabListState.selectedKey === 'logDetails' ? 'bg-gray-200' : 'bg-gray-100'}`}>
//                             Log Details
//                         </Tab>
//                         <Tab id="exceptionDetails" className={`p-2 rounded-lg ${tabListState.selectedKey === 'exceptionDetails' ? 'bg-gray-200' : 'bg-gray-100'}`}>
//                             Exception Details
//                         </Tab>
//                     </TabList>

//                     <TabPanel id="logDetails">

//                         <Table
//                             className="bg-white border border-gray-200 w-full h-full"
//                             aria-label="Vendor Table"
//                         >
//                             <TableHeader className="bg-[#F4F5FA] text-left ">
//                                 <Column className=" border-b w-1/8 h-12" isRowHeader={true}>Job Name</Column>
//                                 <Column className="  border-b w-1/8 h-12">Version</Column>
//                                 <Column className=" border-b w-1/8 h-12">Fabric</Column>
//                                 <Column className=" border-b w-1/8 h-12">Job Type</Column>
//                                 <Column className=" border-b w-1/8 h-12">Node</Column>
//                                 <Column className=" border-b w-1/8 h-12">Status</Column>
//                                 <Column className=" border-b w-1/8 h-12">Made By</Column>
//                                 <Column className=" border-b w-1/8 h-12">Time Stamp</Column>
//                             </TableHeader>
//                             <TableBody className="h-full">
//                                 {data.map(vendor => (
//                                     <Row key={vendor.id} className="hover:bg-gray-100 h-12">
//                                         <Cell className=" w-1/8 h-12">{vendor.name}</Cell>
//                                         <Cell className=" w-1/8 h-12">{vendor.version}</Cell>
//                                         <Cell className=" w-1/8 h-12">{vendor.fabric}</Cell>
//                                         <Cell className=" w-1/8 h-12">{vendor.jobType}</Cell>
//                                         <Cell>
//                                             <div className="w-1/8 h-12"></div>
//                                             {vendor.node.map((item, index) => (
//                                                 <div key={index}>{item}</div>
//                                             ))}
//                                         </Cell>
//                                         <Cell className=" w-1/8 h-12">
//                                             <span
//                                                 className={`px-2 py-1 rounded-full text-white ${vendor.status === 'Success'
//                                                     ? 'bg-green-500'
//                                                     : 'bg-red-500'
//                                                     }`}
//                                             >
//                                                 {vendor.status}
//                                             </span>
//                                         </Cell>
//                                         <Cell >
//                                             <div className='flex'>
//                                                 {vendor.madeBy.avatar}
//                                                 <span>{vendor.madeBy.name}</span>
//                                             </div>
//                                         </Cell>
//                                         <Cell>
//                                             <ul className="list-disc pl-5 space-y-1">
//                                                 {vendor.timestamp.map((timestamp, index) => (
//                                                     <li key={index}>{timestamp}</li>
//                                                 ))}
//                                             </ul>
//                                         </Cell>
//                                     </Row>
//                                 ))}
//                             </TableBody>
//                         </Table>

//                     </TabPanel>
//                     <TabPanel id="exceptionDetails">
//                         <Table
//                             aria-label="Example table with client side sorting"
//                             className="w-3/4 max-h-[445px] min-h-[410px] border border-gray-200 rounded overflow-hidden"
//                         >

//                             <TableHeader className="sticky top-0 bg-gray-100 text-left ">
//                                 <Row className="bg-gray-200 text-left">
//                                     <Column className="px-4 py-2 font-semibold" isRowHeader>Key</Column>
//                                     <Column className="px-4 py-2 font-semibold">Version</Column>
//                                     <Column className="px-4 py-2 font-semibold">Session Info</Column>
//                                     <Column className="px-4 py-2 font-semibold">Timestamp</Column>
//                                     <Column className="px-4 py-2 font-semibold">Error Code</Column>
//                                 </Row>
//                             </TableHeader>

//                             <TableBody className="bg-white">
//                                 {jsonData

//                                     .map((item, index: number) => (
//                                         <Row
//                                             key={index}
//                                             className={`hover:bg-gray-100 cursor-pointer ${activeTableRow === index ? 'bg-gray-200' : ''}`}
//                                             onAction={() => {
//                                                 setTabData(item);
//                                                 setActiveTableRow(index);
//                                             }}
//                                         >

//                                             <Cell>
//                                                 {item.key}

//                                             </Cell>

//                                             <Cell className="pl-5  border-b">{item.version}</Cell>
//                                             <Cell className=" border-b">
//                                                 <div className='flex'>
//                                                     {item.sessionInfo.avatar}
//                                                     <span>{item.sessionInfo.name}</span>
//                                                 </div>
//                                             </Cell>
//                                             <Cell className=" border-b">{item.Timestamp}</Cell>
//                                             <Cell className="pl-7 border-b">{item.errorcode}</Cell>



//                                         </Row>

//                                     ))}


//                             </TableBody>
//                         </Table>

//                     </TabPanel>
//                 </Tabs>
//             </div>
//             {/* <div>
//                 <p>Error details</p>
//             </div> */}
//         </div>

//     );
// };

// export default VendorTable;
import React, { useState, useEffect } from 'react';
import {
    Cell,
    Column,
    Row,
    Tab,
    Table,
    TableBody,
    TableHeader,
    TabList,
    TabPanel,
    Tabs,
} from 'react-aria-components';
import { toast } from 'react-toastify';
import TorusAvatar from '../Avatar';
import { AxiosService } from '../../../lib/utils/axiosService';
import { getCookie } from '../../../lib/utils/cookiemgmt';
import exceptiontable from './exceptiontable';
import ExceptionTable from './exceptiontable';

interface Vendor {
    id: string;
    name: string;
    version: string;
    fabric: string;
    jobType: string;
    nodeName: string;

    status: string;
    timestamp: string[];

    time: string[];
    key: string,
}

const VendorTable: React.FC = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [tabListState, setTabListState] = useState<any>({});
    const [activeTableRow, setActiveTableRow] = useState<any>(0);
    const [tabData, setTabData] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [tab, settab] = useState('');
    const [AllValues, setAllValues] = useState<any[]>([]);
    const [SearchData, setSearchData] = useState<any[]>([]);

    const [data, setData] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(false);
    const [mainData, setMainData] = useState<any[]>([]);
    const [artifact, setArtifact] = useState([]);
    const tenant = getCookie("tenant")

    useEffect(() => {
        (async () => {
            try {
                const res = await AxiosService.get("/log/processlog", {
                    headers: {
                        role: "Admin"
                    }
                });
                console.log(res)

                if (res.status === 200) {
                    setLoading(true);
                    setData(res.data);
                } else {
                    toast.error("Unable to get Process Log Details", { autoClose: 2000 });
                    setLoading(true);
                }
            } catch (err) {
                toast.error("Server error", { autoClose: 2000 });
                setLoading(true);
            }
        })();
    }, []);





    const displayartifacts = (data: any) => {
        const array = data.key.split(":")
        const artifactName = array[4]


        return (
            <div>
                <div>{artifactName}</div>
                <div>
                    {array.map((item: any, index: any) => (
                        index < 3 && <span>{item + ">"}</span>
                    ))}
                </div>
            </div>
        );
    };
    const displayjobname = (data: any) => {
        const array = data.key.split(":")
        const jobName = array[5]
        const uid = array[7]
        return (
            <div>
                <div>{jobName}</div>
                <div>
                    {array.map((item: any, index: any) => (
                        index < 3 && <span>{item + ">"}</span>
                    ))}
                </div>
                <div>
                    Uid:{uid}
                </div>

            </div>


        )

    }

    const version = (data: any) => {
        const array = data.key.split(":")
        const version = array[6]
        return <div>{version}</div>
    }
    const fabric = (data: any) => {
        const array = data.key.split(":")
        const fabric = array[1]
        return <div>{fabric}</div>
    }



    const time = (data: any) => {
        const array = data.key.split(":")
        const timestamp = array[1]
        return <div>{timestamp}</div>
    }


    const handleClick = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, ele: any, index: number, id: any) => {
        setTabData(ele);
        setActiveTableRow([id, index]);
    };


    const groupedData: { [key: string]: any[] } = {};

    data.forEach((item: any) => {
        // Check if the key already exists in groupedData
        if (!groupedData[item.key]) {
            // If not, create a new entry with an empty array
            groupedData[item.key] = [];
        }
        // Add the current item to the array for the specific key
        groupedData[item.key].push({
            node: item.nodeName,
            time: item.time,
            status: item.status,
            npc: item.npc,
            ipc: item.ipc
        });
    });

    // Convert the groupedData object into an array if needed
    const result = Object.keys(groupedData).map(key => ({
        key,
        nodeData: groupedData[key],


    }));
    console.log(result);

    return (
        <div className='flex justify-between h-screen'>
            {/* <button onClick={handleData}>getData</button> */}
            <div className="container mx-auto p-4 ">
                <Tabs>
                    <TabList className="flex space-x-2 font-inter font-bold text-sm">
                        <Tab id="logDetails" className={`p-2 rounded-lg ${tabListState.selectedKey === 'logDetails' ? 'bg-gray-200' : 'bg-gray-100'}`}>
                            Log Details
                        </Tab>
                        <Tab id="exceptionDetails" className={`p-2 rounded-lg ${tabListState.selectedKey === 'exceptionDetails' ? 'bg-gray-200' : 'bg-gray-100'}`}>
                            Exception Details
                        </Tab>
                    </TabList>

                    <TabPanel id="logDetails">
                        <div className="border border-[#E5E9EB]  w-full h-[70%] overflow-y-auto ">

                            <Table

                                className="w-full  overflow-y-auto  border-gray-300 rounded-lg  "
                                aria-label="Example table with client side sorting" >

                                <TableHeader className=" flex text-start bg-[#F4F5FA]  text-sm border-b rounded-lg ">
                                    <Column className="  w-1/8 h-12 " isRowHeader={true}>Job Name</Column>
                                    <Column className="w-1/8 h-12" >Version</Column>
                                    <Column className="w-1/8 h-12 ">Fabric</Column>
                                    <Column >Job Type</Column>
                                    <Column >nodeName</Column>
                                    <Column>Status</Column>

                                    <Column >Time Stamp</Column>
                                </TableHeader>
                                <TableBody className=" flex flex-col h-full gap-10 whitespace-normal break-words  ">
                                    {data.map((item: any, id: any) => (
                                        <Row key={item.id} className=" flex gap-28 ">
                                            <Cell >
                                                {displayjobname(item)}


                                            </Cell>
                                            <Cell className="">{version(item)}</Cell>
                                            <Cell className="">{fabric(item)}</Cell>
                                            <Cell className="">Process</Cell>
                                            <Cell>
                                                {groupedData[item.key].map((item: any, index: number) => (
                                                    <div key={index}>{item.node}</div>

                                                ))}

                                            </Cell>

                                            <Cell>
                                                <span className={`px-4 py-1 rounded-full text-white ${item.statusDetails === 'Success' ? 'bg-green-500' : 'bg-red-500'}`}
                                                >{groupedData[item.key][0].status}</span>

                                                {groupedData[item.key].map((item: any, index: number) => (
                                                    <div key={index}>{item.status}</div>

                                                ))}
                                            </Cell>
                                            <Cell >
                                                {groupedData[item.key].map((item: any, index: number) => (
                                                    <div key={index}>{item.time}</div>

                                                ))}
                                            </Cell>
                                        </Row>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </TabPanel>
                    <TabPanel id="exceptionDetails">
                        <ExceptionTable />



                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default VendorTable;
