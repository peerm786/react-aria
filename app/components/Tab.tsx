// "use client"
// import React from 'react'
// import { Tabs, TabList, Tab, TabPanel } from 'react-aria-components';

// const Side = () => {
//     return (
//         <div className='bg-slate-200 w-[100%] h-full'>
//             <Tabs>
//                 <TabList aria-label="History of Ancient Rome" className="flex space-x-4">
//                     <Tab id="FoR" className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600">
//                         DF
//                     </Tab>
//                     <Tab id="MaR" className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600">
//                         UF
//                     </Tab>
//                     <Tab id="Emp" className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600">
//                         PF
//                     </Tab>
//                     <Tab id="Emp" className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-600">
//                         SF
//                     </Tab>
//                 </TabList>
//                 <TabPanel id="FoR" className="p-4">
//                     Key1
//                 </TabPanel>
//                 <TabPanel id="FoR" className="p-4">
//                     Key1
//                 </TabPanel>
//                 <TabPanel id="FoR" className="p-4">
//                     Key1
//                 </TabPanel>
//                 <TabPanel id="FoR" className="p-4">
//                     Key1
//                 </TabPanel>
//                 <TabPanel id="MaR" className="p-4">
//                     Key2
//                 </TabPanel>
//                 <TabPanel id="MaR" className="p-4">
//                     Key2
//                 </TabPanel>
//                 <TabPanel id="MaR" className="p-4">
//                     Key2
//                 </TabPanel>
//                 <TabPanel id="MaR" className="p-4">
//                     Key2
//                 </TabPanel>
//                 <TabPanel id="MaR" className="p-4">
//                     Key2
//                 </TabPanel>
//                 <TabPanel id="MaR" className="p-4">
//                     Key2
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>
//                 <TabPanel id="Emp" className="p-4">
//                     Key3
//                 </TabPanel>

//             </Tabs>
//         </div>
//     )
// }

// export default Side


// "use client"
// import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
// import type { TabPanelProps, TabProps } from 'react-aria-components';
// import { MdOutlineSecurity } from "react-icons/md";
// import { SiSecurityscorecard } from "react-icons/si";
// import { CiDatabase } from "react-icons/ci";
// import { useState } from 'react';
// import { AiOutlineProduct } from "react-icons/ai";

// function TabsExample() {
//     const [tabContent, setTabContent] = useState({
//         blog: [
//             { id: 1, content: "Artifact V1" },
//             { id: 2, content: "DF:Screen 1" },
//             { id: 3, content: "DF:Screen 1" },
//             { id: 4, content: "DF:Screen 1" },
//             { id: 5, content: "DF:Screen 1" },
//             { id: 6, content: "DF:Screen 1" },
//             { id: 7, content: "DF:Screen 1" },
//             { id: 8, content: "DF:Screen 1" },
//             { id: 9, content: "DF:Screen 1" },
//             { id: 10, content: "DF:Screen 1" },
//             { id: 11, content: "DF:Screen 1" },
//         ],
//         releases: [
//             { id: 1, content: "Key2" },
//             { id: 2, content: "Key2" },
//             { id: 3, content: "Key2" },
//             { id: 4, content: "Key2" },
//             { id: 5, content: "Key2" },
//             { id: 6, content: "Key2" },
//         ],
//         docs: [
//             { id: 1, content: "Key3" },
//             { id: 2, content: "Key3" },
//             { id: 3, content: "Key3" },
//             { id: 4, content: "Key3" },
//             { id: 5, content: "Key3" },
//             { id: 6, content: "Key3" },
//         ],
//     });


//     // const handleTabChange = (id: any) => {

//     //   switch (id) {
//     //     case 'blog':
//     //       setTabContent({
//     //         ...tabContent,
//     //         blog: [
//     //           { id: 1, content: "Updated Artifact V1" },
//     //           { id: 2, content: "Updated DF:Screen 1" },

//     //         ],
//     //       });
//     //       break;

//     //     default:
//     //       break;
//     //   }
//     // };

//     return (
//         <div className="pl-4 w-[20%] mt-2">
//             <div className='bg-[#F4F5FA] max-w-[300px]'>
//                 <Tabs>
//                     <TabList
//                         aria-label="Feeds"
//                         className="flex bg-[#FFFFFF] p-1"
//                     >
//                         <MyTab id="blog" label="DataFabric"><MdOutlineSecurity size={15} /></MyTab>
//                         <MyTab id="releases" label="Security"><SiSecurityscorecard size={15} /></MyTab>
//                         <MyTab id="docs" label="Database"><CiDatabase size={15} /></MyTab>
//                         <MyTab id="doc" label="Product"><AiOutlineProduct size={15} /></MyTab>
//                     </TabList>
//                     <MyTabPanel id="blog">
//                         <div className="p-2">
//                             {tabContent.blog.map((item) => (
//                                 <div key={item.id} className="border border-black/20 p-1 my-2 text-sm rounded-md">{item.content}</div>
//                             ))}
//                         </div>
//                     </MyTabPanel>
//                     <MyTabPanel id="releases">
//                         <div className="p-2">
//                             {tabContent.releases.map((item) => (
//                                 <div key={item.id} className="border border-black/20  p-1 my-2 text-sm rounded-md">{item.content}</div>
//                             ))}
//                         </div>
//                     </MyTabPanel>
//                     <MyTabPanel id="docs">
//                         <div className="p-2">
//                             {tabContent.docs.map((item) => (
//                                 <div key={item.id} className="border border-black/20 p-1 my-2 text-sm rounded-md">
//                                     {item.content}
//                                 </div>
//                             ))}
//                         </div>
//                     </MyTabPanel>
//                 </Tabs>
//             </div>
//         </div>
//     );
// }

// function MyTab({ id, children, label }: TabProps & { label: string }) {
//     return (
//         <Tab
//             id={id}
//             className={({ isSelected }) => `
//         w-full flex items-center justify-center text-[12px]
//         ${isSelected ? 'bg-[#F4F5FA] font-bold text-black p-2' : ' hover:bg-gray-200'}
//       `}

//         >
//             {({ isSelected }) => (
//                 <>
//                     {children}
//                     {isSelected && <span className="ml-2">{label}</span>}
//                 </>
//             )}
//         </Tab>
//     );
// }

// function MyTabPanel(props: TabPanelProps) {
//     return (
//         <TabPanel
//             {...props}
//             className="mt-2 text-gray-700 font-serif p-2 shadow"
//         />
//     );
// }

// export default TabsExample;



// "use client"
// import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
// import type { TabPanelProps, TabProps } from 'react-aria-components';
// import { MdOutlineSecurity } from "react-icons/md";
// import { SiSecurityscorecard } from "react-icons/si";
// import { CiDatabase } from "react-icons/ci";
// import { useState } from 'react';
// import { AiOutlineProduct } from "react-icons/ai";

// function TabsExample() {
//   const [selectedTab, setSelectedTab] = useState('');
//   const [tabContent, setTabContent] = useState({
//     blog: [
//       { id: 1, content: "Artifact V1" },
//       { id: 2, content: "DF:Screen 1" },
//       { id: 3, content: "DF:Screen 1" },
//       { id: 4, content: "DF:Screen 1" },
//       { id: 5, content: "DF:Screen 1" },
//       { id: 6, content: "DF:Screen 1" },
//       { id: 7, content: "DF:Screen 1" },
//       { id: 8, content: "DF:Screen 1" },
//       { id: 9, content: "DF:Screen 1" },
//       { id: 10, content: "DF:Screen 1" },
//       { id: 11, content: "DF:Screen 1" },
//     ],
//     releases: [
//       { id: 1, content: "Key2" },
//       { id: 2, content: "Key2" },
//       { id: 3, content: "Key2" },
//       { id: 4, content: "Key2" },
//       { id: 5, content: "Key2" },
//       { id: 6, content: "Key2" },
//       { id: 7, content: "Key2" },
//       { id: 8, content: "Key2" },
//       { id: 9, content: "Key2" },
//       { id: 10, content: "Key2" },
//       { id: 11, content: "Key2" },
//     ],
//     docs: [
//       { id: 1, content: "Key3" },
//       { id: 2, content: "Key3" },
//       { id: 3, content: "Key3" },
//       { id: 4, content: "Key3" },
//       { id: 5, content: "Key3" },
//       { id: 6, content: "Key3" },
//       { id: 7, content: "Key3" },
//       { id: 8, content: "Key3" },
//       { id: 9, content: "Key3" },
//       { id: 10, content: "Key3" },
//       { id: 11, content: "Key3" },
//     ],
//     doc: [
//       { id: 1, content: "Key3" },
//       { id: 2, content: "Key3" },
//       { id: 3, content: "Key3" },
//       { id: 4, content: "Key3" },
//       { id: 5, content: "Key3" },
//       { id: 6, content: "Key3" },
//       { id: 7, content: "Key3" },
//       { id: 8, content: "Key3" },
//       { id: 9, content: "Key3" },
//       { id: 10, content: "Key3" },
//       { id: 11, content: "Key3" },
//     ],
//   });


//   // const handleTabChange = (id: any) => {

//   //   switch (id) {
//   //     case 'blog':
//   //       setTabContent({
//   //         ...tabContent,
//   //         blog: [
//   //           { id: 1, content: "Updated Artifact V1" },
//   //           { id: 2, content: "Updated DF:Screen 1" },

//   //         ],
//   //       });
//   //       break;

//   //     default:
//   //       break;
//   //   }
//   // };

//   return (
//     <div className="py-8 px-2 sm:px-8 flex justify-center">
//       <Tabs className="w-full max-w-[300px] ">
//         <TabList
//           aria-label="Feeds"
//           className="flex space-x-1 bg-clip-padding p-1  "
//         >
//           <MyTab id="blog" label="DataFabric"><MdOutlineSecurity size={15} className={selectedTab === 'blog' ? 'text-blue-500' : 'text-gray-500'} /></MyTab>
//           <MyTab id="releases" label="Security"><SiSecurityscorecard size={15} className={selectedTab === 'releases' ? 'text-blue-500' : 'text-gray-500'} /></MyTab>
//           <MyTab id="docs" label="Database"><CiDatabase size={15} /></MyTab>
//           <MyTab id="doc" label="Product"><AiOutlineProduct size={15} /></MyTab>
//         </TabList>
//         <MyTabPanel id="blog">
//           <div className="border bg-pink-50 p-2  ">
//             {tabContent.blog.map((item) => (
//               <div key={item.id} className="border border-black/20 p-1 my-2 text-sm rounded-md   shadow-md">{item.content}</div>
//             ))}
//           </div>
//         </MyTabPanel>
//         <MyTabPanel id="releases">
//           <div className="border bg-pink-100 p-2">
//             {tabContent.releases.map((item) => (
//               <div key={item.id} className="border border-black/20  p-1 my-2 text-sm rounded-md  shadow-md">{item.content}</div>
//             ))}
//           </div>
//         </MyTabPanel>
//         <MyTabPanel id="docs">
//           <div className="border bg-pink-100 p-2">
//             {tabContent.docs.map((item) => (
//               <div key={item.id} className="border border-black/20 p-1 my-2 text-sm rounded-md  shadow-md">
//                 {item.content}
//               </div>
//             ))}
//           </div>
//         </MyTabPanel>
//         <MyTabPanel id="doc">
//           <div className="border bg-pink-100 p-2">
//             {tabContent.doc.map((item) => (
//               <div key={item.id} className="border border-black/20 p-1 my-2 text-sm rounded-md  shadow-md">
//                 {item.content}
//               </div>
//             ))}
//           </div>
//         </MyTabPanel>

//       </Tabs>
//     </div>
//   );
// }

// function MyTab({ id, children, label }: TabProps & { label: string }) {
//   return (
//     <Tab
//       id={id}
//       className={({ isSelected }) => `
//         w-full flex items-center justify-center text-[12px]
//         ${isSelected ? 'bg-pink-50 text-black' : 'text-gray-700 hover:bg-gray-200'}
//       `}

//     >
//       {({ isSelected }) => (
//         <>
//           {children}
//           {isSelected && <span className="ml-2">{label}</span>}
//         </>
//       )}

//     </Tab>
//   );
// }

// function MyTabPanel(props: TabPanelProps) {
//   return (
//     <TabPanel
//       {...props}
//       className="mt-2 text-gray-700 font-serif bg-white p-2 shadow"
//     />
//   );
// }

// export default TabsExample;



"use client"
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import type { TabPanelProps, TabProps } from 'react-aria-components';
import React, { useState } from 'react';
import { DataFabric, ProcessFabric, SecurityFabric, UserFabric } from '../constants/svgApplications';

function TabsExample() {
    const [selectedTab, setSelectedTab] = useState('df');
    const [tabContent, setTabContent] = useState({
        df: [
            { id: 1, content: "Artifact V1" },
            { id: 2, content: "DF:Screen 1" },
            { id: 3, content: "DF:Screen 1" },
            { id: 4, content: "DF:Screen 1" },
            { id: 5, content: "DF:Screen 1" },
            { id: 6, content: "DF:Screen 1" },
            { id: 7, content: "DF:Screen 1" },
            { id: 8, content: "DF:Screen 1" },
            { id: 9, content: "DF:Screen 1" },
            { id: 10, content: "DF:Screen 1" },
            { id: 11, content: "DF:Screen 1" },
        ],
        uf: [
            { id: 1, content: "Key2" },
            { id: 2, content: "Key2" },
            { id: 3, content: "Key2" },
            { id: 4, content: "Key2" },
            { id: 5, content: "Key2" },
            { id: 6, content: "Key2" },
            { id: 7, content: "Key2" },
            { id: 8, content: "Key2" },
            { id: 9, content: "Key2" },
            { id: 10, content: "Key2" },
            { id: 11, content: "Key2" },
        ],
        pf: [
            { id: 1, content: "Key3" },
            { id: 2, content: "Key3" },
            { id: 3, content: "Key3" },
            { id: 4, content: "Key3" },
            { id: 5, content: "Key3" },
            { id: 6, content: "Key3" },
            { id: 7, content: "Key3" },
            { id: 8, content: "Key3" },
            { id: 9, content: "Key3" },
            { id: 10, content: "Key3" },
            { id: 11, content: "Key3" },
        ],
        sf: [
            { id: 1, content: "Key4" },
            { id: 2, content: "Key4" },
            { id: 3, content: "Key4" },
            { id: 4, content: "Key4" },
            { id: 5, content: "Key4" },
            { id: 6, content: "Key4" },
            { id: 7, content: "Key4" },
            { id: 8, content: "Key4" },
            { id: 9, content: "Key4" },
            { id: 10, content: "Key4" },
            { id: 11, content: "Key4" },
        ],
    });

    const tabs = [
        { id: "df", label: "DataFabric", icon: <DataFabric /> },
        { id: "uf", label: "UserFabric", icon: <UserFabric /> },
        { id: "pf", label: "ProcessFabric", icon: <ProcessFabric /> },
        { id: "sf", label: "SecurityFabric", icon: <SecurityFabric /> },
    ]

    const handleTabChange = (id: any) => {
        setSelectedTab(id);
    };

    const handleDragKey = (e: React.DragEvent<HTMLDivElement>, content: any) => {
        console.log(selectedTab);

        e.dataTransfer.setData("key", JSON.stringify({ [selectedTab]: content }));
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Tabs onSelectionChange={handleTabChange}>
                <TabList
                    aria-label="Feeds"
                    className="flex w-[95%] bg-[#FFFFFF] rounded-lg p-2 font-semibold"
                >
                    {tabs.map(({ id, label, icon }) => (
                        <MyTab key={id} id={id} label={label} isSelected={selectedTab === id} onSelect={() => handleTabChange(id)}>
                            {icon}
                        </MyTab>
                    ))}
                </TabList>
                {Object.entries(tabContent).map(([key, items]) => (
                    <MyTabPanel className={"overflow-y-auto"} key={key} id={key}>
                        <div className="p-2">
                            {items.map((item) => (
                                <div draggable onDragStart={(e) => handleDragKey(e, item.content)} key={item.id} className="border border-black/20 p-1 my-2 text-sm rounded-md">
                                    {item.content}
                                </div>
                            ))}
                        </div>
                    </MyTabPanel>
                ))}
            </Tabs>
        </div>
    );
}

function MyTab({ id, children, label, isSelected, onSelect }: TabProps & { label: string, isSelected: boolean, onSelect: () => void }) {
    return (
        <Tab
            id={id}
            className={({ isSelected }) => `
        w-full flex items-center justify-center text-[12px]
        ${isSelected ? 'bg-[#F4F5FA] transition duration-300 ease-in-out rounded-lg outline-none p-1' : ''}
      `}
        // onSelect={onSelect}
        >
            {({ isSelected }) => (
                <>
                    {children}
                    {isSelected && <span className="ml-2">{label}</span>}
                </>
            )}
        </Tab>
    );
}

function MyTabPanel(props: TabPanelProps) {
    return (
        <TabPanel
            {...props}
            className="mt-2"
        />
    );
}

export default TabsExample;





