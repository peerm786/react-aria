// // "use client";
// // import React, { useState, useContext, createContext } from 'react';
// // import { Cell, Column, Row, Table, TableBody, TableHeader, type Selection, type TableProps } from 'react-aria-components';
// // import TorusCheckbox from './landingScreen/toruscheckbox';

// // // Define the Pokemon interface
// // interface Pokemon {
// //     id: number;
// //     name: string;
// //     type: string;
// //     level: string;
// // }
// // interface TorusCheckboxProps {
// //     // other props...
// //     selectedKeys: Selection;
// //     // other props...
// // }

// // // Define the PokemonTable props interface
// // interface PokemonTableProps extends TableProps {
// //     items?: Pokemon[];
// //     renderEmptyState?: () => string;
// // }

// // const TableDataContext = React.createContext({
// //     selectedRows: new Set<number>(),
// //     setSelectedRows: (selectedRows: Set<number>) => { },
// //     tableIndex: [] as number[],
// //     selectionMode: 'multiple' as 'single' | 'multiple',
// // });

// // function PokemonTable(props: PokemonTableProps) {
// //     const [items, setItems] = useState<Pokemon[]>(props.items || [
// //         { id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67' },
// //         { id: 2, name: 'Blastoise', type: 'Water', level: '56' },
// //         { id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83' },
// //         { id: 4, name: 'Pikachu', type: 'Electric', level: '100' }
// //     ]);
// //     const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
// //     const [newItem, setNewItem] = useState<Pokemon>({ id: 0, name: '', type: '', level: '' });
// //     const [searchTerm, setSearchTerm] = useState<string>('');
// //     const [sortColumn, setSortColumn] = useState<keyof Pokemon | null>(null);
// //     const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');



// //     const filteredItems = items.filter(item =>
// //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.level.toLowerCase().includes(searchTerm.toLowerCase())
// //     );


// //     const sortedItems = [...filteredItems].sort((a, b) => {
// //         if (!sortColumn) return 0;

// //         const aValue = a[sortColumn];
// //         const bValue = b[sortColumn];

// //         if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
// //         if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
// //         return 0;
// //     });

// //     const handleSort = (column: keyof Pokemon) => {
// //         if (sortColumn === column) {
// //             setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
// //         } else {
// //             setSortColumn(column);
// //             setSortDirection('asc');
// //         }
// //     };

// //     return (
// //         <div>

// //             <div className="mb-4 w-[20%]">
// //                 <input
// //                     type="text"
// //                     placeholder="Search..."
// //                     value={searchTerm}
// //                     onChange={e => setSearchTerm(e.target.value)}
// //                     className="border px-2 py-1 w-full"
// //                 />
// //             </div>

// //             <Table
// //                 aria-label="Pokemon table"
// //                 {...props}
// //                 selectedKeys={selectedKeys}
// //                 onSelectionChange={setSelectedKeys}
// //                 className="min-w-full bg-white border border-gray-300"
// //             >
// //                 <TableHeader className="bg-gray-200">
// //                     <Column
// //                         isRowHeader
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => handleSort('id')}
// //                     >
// //                         ID
// //                     </Column>
// //                     <Column
// //                         isRowHeader
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => handleSort('name')}
// //                     >
// //                         Name
// //                     </Column>
// //                     <Column
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => handleSort('type')}
// //                     >
// //                         Type
// //                     </Column>
// //                     <Column
// //                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
// //                         onClick={() => handleSort('level')}
// //                     >
// //                         Level
// //                     </Column>
// //                 </TableHeader>
// //                 <TableBody items={sortedItems} renderEmptyState={props.renderEmptyState}>
// //                     {item => (
// //                         <Row key={item.id} className="bg-white border-b hover:bg-gray-50">
// //                             <Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</Cell>
// //                             <Cell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// //                                 <input
// //                                     type="text"
// //                                     value={item.name}
// //                                     className="w-full bg-transparent outline-none"
// //                                 />
// //                             </Cell>


// //                             <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                                 <input
// //                                     type="text"
// //                                     value={item.type}
// //                                     className="w-full bg-transparent outline-none"
// //                                 />
// //                             </Cell>
// //                             <Cell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                                 <input
// //                                     type="text"
// //                                     value={item.level}
// //                                     className="w-full bg-transparent outline-none"
// //                                 />
// //                             </Cell>
// //                         </Row>
// //                     )}
// //                 </TableBody>
// //             </Table>

// //             <div className="mt-4 flex space-x-2">
// //                 <input
// //                     type="text"
// //                     placeholder="Name"
// //                     value={newItem.name}
// //                     onChange={e => setNewItem({ ...newItem, name: e.target.value })}
// //                     className="border px-2 py-1"
// //                 />
// //                 <input
// //                     type="text"
// //                     placeholder="Type"
// //                     value={newItem.type}
// //                     onChange={e => setNewItem({ ...newItem, type: e.target.value })}
// //                     className="border px-2 py-1"
// //                 />
// //                 <input
// //                     type="text"
// //                     placeholder="Level"
// //                     value={newItem.level}
// //                     onChange={e => setNewItem({ ...newItem, level: e.target.value })}
// //                     className="border px-2 py-1"
// //                 />
// //                 <button
// //                     onClick={() => {
// //                         if (newItem.name && newItem.type && newItem.level) {
// //                             setItems([...items, { ...newItem, id: items.length + 1 }]);
// //                             setNewItem({ id: 0, name: '', type: '', level: '' });
// //                         }
// //                     }}
// //                     className="bg-blue-500 text-white px-4 py-2"
// //                 >
// //                     Add
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default PokemonTable;
// "use client"
// import React, {
//     createContext,
//     useCallback,
//     useContext,
//     useEffect,
//     useState,
// } from "react";
// import {
//     Button,
//     Cell,
//     Column,
//     Heading,
//     Row,
//     Table,
//     TableBody,
//     TableHeader,
// } from "react-aria-components";
// import { FaArrowDown } from "react-icons/fa";
// import { CiSaveUp1 } from "react-icons/ci";
// import { Tabs, TabList, Tab } from "react-aria-components";
// import { Checkbox } from "react-aria-components";

// import TorusButton from "react-aria-components"
// // import TorusDropDown from "./TorusDropDown.tsx";
// import TorusInput from "react-aria-components"
// import TorusDialog from "react-aria-components"
// import TorusSearch from "react-aria-components"
// // import {
// //     DeleteIcon,
// //     EditIcon,
// //     FilterIcon,
// //     ImportIcon,
// //     PlusIcon,
// //     TickSign,
// //     UnTickSign,
// // } from "../SVG_Application";

// // import { merger } from "../utils/utils";
// interface Pokemon {
//     id: number;
//     name: string;
//     type: string;
//     level: number;
//     // ... other properties
// }
// interface TableProps {
//     // other props...
//     selectedKeys: React.Key | null;
//     // other props...
//   }
  

// const defaultClassName = {
//     table: "",
//     tableHeader: "",
//     tableBody: "",
//     tableRow: "",
//     tableCell: "",
// };
// export const TableDataContext = createContext();
// export function TorusColumn(props: any) {
//     return (
//         <Column
//             {...props}
//         // className={merger(
//         //     "text-xs  font-medium px-4 center bg-[#EAECF0] py-[0.8rem] torus-focus:outline-none torus-focus:border-none",
//         //     props.className
//         // )}
//         >
//             {({ allowsSorting, sortDirection }) => (
//                 <div className="w-[100%]  flex justify-center items-center">
//                     <div className="w-[100%] flex items-center justify-center gap-1">
//                         <div className="w-[80%] flex items-center justify-center">
//                             {props.children.charAt(0).toUpperCase() + props.children.slice(1)}
//                         </div>
//                         <div className="w-[20%] flex items-center justify-center">
//                             {allowsSorting && (
//                                 <span aria-hidden="true" className="sort-indicator">
//                                     <FaArrowDown
//                                         size={15}
//                                         color="#667085"
//                                         className={` transition-rotate ease-in-out duration-100 ${sortDirection === "ascending" ? "rotate-180" : ""
//                                             }`}
//                                     />
//                                 </span>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </Column>
//     );
// }

// export function TorusTableHeader({ columns, children, selectedKeys }) {
//     const { selectionBehavior, selectionMode, isSkeleton } =
//         useContext(TableDataContext);
//     return (
//         <TableHeader className="w-full">
//             {/* Add extra columns for drag and drop and selection. */}
//             {/* {allowsDragging && <Column />} */}
//             {selectionBehavior === "toggle" && (
//                 <Column
//                     className={`text-xs w-[${100 / columns.length + 1
//                         }%] font-medium bg-[#EAECF0] px-2 py-[0.8rem] torus-focus:outline-none torus-focus:border-none`}
//                 >
//                     {selectionMode === "multiple" && (
//                         <TorusColumnCheckbox
//                             slot="selection"
//                             selectedKeys={selectedKeys}
//                             className="cursor-pointer"
//                         />
//                     )}
//                 </Column>
//             )}
//             {isSkeleton ? (
//                 <>
//                     {children && typeof children === "function" && children({ columns })}
//                 </>
//             ) : (
//                 <>
//                     {columns.map((column) => (
//                         <TorusColumn
//                             key={column.id}
//                             id={column.id}
//                             allowsSorting={column.allowsSorting}
//                             isRowHeader={column.isRowHeader}
//                             className={`w-[${100 / columns.length + 1}%]`}
//                         >
//                             {column.name}
//                         </TorusColumn>
//                     ))}
//                 </>
//             )}
//             {/* <Collection items={columns}>{children}</Collection> */}
//         </TableHeader>
//     );
// }

// export function TorusRow({ id, columns, children, ...otherProps }) {
//     let { selectionBehavior, isSkeleton } = useContext(TableDataContext);

//     return (
//         <>
//             <Row {...otherProps} key={id}>
//                 {/* {allowsDragging && (
//             <Cell className={"min-h-4"}>
//               <Button slot="drag">≡</Button>
//             </Cell>
//           )} */}
//                 {selectionBehavior === "toggle" && (
//                     <Cell>
//                         <TorusCheckbox
//                             selectedKeys={otherProps?.selectedKeys}
//                             slot="selection"
//                             className="cursor-pointer"
//                             index={otherProps?.index}
//                         />

//                         {/* <TorusCheckBox type="single" /> */}
//                     </Cell>
//                 )}

//                 {isSkeleton ? (
//                     <>
//                         {children &&
//                             typeof children === "function" &&
//                             children({ columns, otherProps })}
//                     </>
//                 ) : (
//                     <>
//                         {columns.map((column) => {
//                             if (column?.id == "Actions") {
//                                 return (
//                                     <Cell
//                                         className={"border-b border-[#EAECF0]"}
//                                         children={<TableCellActions id={otherProps?.index} />}
//                                     />
//                                 );
//                             } else
//                                 return (
//                                     <Cell
//                                         className={"border-b border-[#EAECF0]"}
//                                         children={
//                                             <div className="w-full h-full flex flex-col items-center justify-center py-[1rem] text-xs font-normal ">
//                                                 <RenderTableChildren
//                                                     children={otherProps?.item?.[column?.id]}
//                                                 />
//                                             </div>
//                                         }
//                                     />
//                                 );
//                         })}
//                     </>
//                 )}
//             </Row>
//         </>
//     );
// }

// export function TorusCheckbox({ children, index, ...props }) {
//     const { selectedRows, setSelectedRows, tableIndex, selectionMode } =
//         useContext(TableDataContext);
//     return (
//         <Checkbox
//             {...props}
//             className={"w-full, h-full, flex items-center justify-center"}
//             isIndeterminate={
//                 selectedRows &&
//                     Array.from(selectedRows).length > 0 &&
//                     (selectedRows.has(index) || selectedRows.has("all"))
//                     ? true
//                     : false
//             }
//         >
//             {({ isIndeterminate }) => (
//                 <>
//                     <div
//                         className="checkbox"
//                         onClick={() => {
//                             if (selectedRows.has(index)) {
//                                 if (selectionMode === "multiple")
//                                     setSelectedRows(
//                                         (prev) =>
//                                             new Set(Array.from(prev).filter((item) => item !== index))
//                                     );
//                                 else setSelectedRows(new Set([]));
//                             } else if (
//                                 selectedRows.has("all") &&
//                                 selectionMode === "multiple"
//                             ) {
//                                 setSelectedRows(
//                                     new Set(
//                                         Array.from(tableIndex).filter((item) => item !== index)
//                                     )
//                                 );
//                             } else {
//                                 if (
//                                     Array.from(selectedRows).length + 1 ==
//                                     Array.from(tableIndex).length &&
//                                     selectionMode === "multiple"
//                                 ) {
//                                     setSelectedRows(new Set(["all"]));
//                                 } else if (selectionMode === "multiple")
//                                     setSelectedRows(
//                                         (prev) => new Set([...Array.from(prev), index])
//                                     );
//                                 else setSelectedRows(new Set([index]));
//                             }
//                         }}
//                     >
//                         <svg className="h-5 w-5" viewBox="0 0 18 18" aria-hidden="true">
//                             {isIndeterminate ? <TickSign /> : <UnTickSign />}
//                         </svg>
//                     </div>
//                     {children}
//                 </>
//             )}
//         </Checkbox>
//     );
// }
// function TorusColumnCheckbox({ children, ...props }) {
//     const { selectedRows, setSelectedRows } = useContext(TableDataContext);

//     return (
//         <Checkbox
//             // {...props}
//             slot={"selection"}
//             className={
//                 "w-full, h-full, flex items-center justify-center cursor-pointer"
//             }
//             id="all"
//             isIndeterminate={
//                 selectedRows &&
//                     Array.from(selectedRows).length > 0 &&
//                     selectedRows.has("all")
//                     ? true
//                     : false
//             }
//         >
//             {({ isIndeterminate }) => (
//                 <>
//                     <div
//                         className="checkbox"
//                         onClick={() => {
//                             if (selectedRows.has("all")) {
//                                 setSelectedRows(new Set([""]));
//                             } else {
//                                 setSelectedRows(new Set(["all"]));
//                             }
//                         }}
//                     >
//                         <svg className="h-5 w-5" viewBox="0 0 18 18" aria-hidden="true">
//                             {isIndeterminate ? <TickSign /> : <UnTickSign />}
//                         </svg>
//                     </div>
//                     {children}
//                 </>
//             )}
//         </Checkbox>
//     );
// }
// export function TorusTable({
//     isAsync = false,
//     allowsSorting = true,
//     // primaryColumn,
//     tableData,
//     // onSave,
//     // onEdit,
//     rowsPerPage = 6,
//     isEditable = true,
//     heading,
//     description,
//     selectionMode,
//     selectionBehavior,
//     getAysncData,
//     selectedRows,
//     setSelectedRows,
//     // onDelete,
//     // onAdd,
//     // children,
//     // editableColumns,
//     // addableColumns,
//     // visibleColumns,
//     // isSkeleton = false,
// }) {
//     const [data, setData] = useState([]);
//     const [columns, setColumns] = useState(new Set([]));
//     const [sortDescriptor, setSortDescriptor] = useState<{ column: keyof Pokemon; direction: 'ascending' | 'descending' } | undefined>(undefined);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(null);
//     const [TotalColumns, setTotalColumns] = useState([]);
//     const [serchValue, setSerchValue] = useState("");

//     const [tableDataLength, setTableDataLength] = useState(0);
//     const [tableIndex, setTableIndex] = useState(new Set([]));
//     // const descriptions = (description) => {
//     //     if (description) {
//     //         return (
//     //             <div className="col-span-6 flex justify-start items-center">
//     //                 <div className="w-[100%] whitespace-nowrap text-sm font-normal">
//     //                     {`Keep track of ${description} and display them in a table. `}
//     //                 </div>
//     //             </div>
//     //         );
//     //     }
//     // };

//     // const length = () => {
//     //     if (tableDataLength) {
//     //         return (
//     //             <>
//     //                 <div className="text-xs bg-[#F9F5FF] px-1.5 py-[2px] rounded-md">
//     //                     <p className="text-[#0736C4] font-medium">{`${tableDataLength}+ ${description}`}</p>
//     //                 </div>
//     //             </>
//     //         );
//     //     }
//     // };
//     // const handleSerach = useCallback(
//     //     (e: any) => {
//     //         if (isAsync)
//     //             getAysncData(page, e, rowsPerPage).then((data: any) => {
//     //                 if (data && data.tableData && data.tableData.length > 0) {
//     //                     setData(data.tableData);
//     //                     setSerchValue(e);
//     //                 } else {
//     //                     setData([]);
//     //                     setSerchValue(e);
//     //                 }
//     //             });
//     //         else setSerchValue(e);
//     //     },
//     //     [page, rowsPerPage, getAysncData]
//     // );

//     const serachedItems = React.useMemo(() => {
//         try {
//             if (isAsync) return data;
//             return data.filter((item) =>
//                 Object.values(item)
//                     .join(" ")
//                     .toLowerCase()
//                     .includes(serchValue.toLowerCase())
//             );
//         } catch (e) {
//             console.error(e);
//         }
//     }, [serchValue, data, page, rowsPerPage, getAysncData]);

//     const items: any = React.useMemo(() => {
//         try {
//             if (isAsync) return serachedItems;
//             const start = (page - 1) * rowsPerPage;
//             const end = start + rowsPerPage;

//             return serachedItems?.slice(start, end);
//         } catch (e) {
//             console.error(e);
//         }
//     }, [page, serachedItems, rowsPerPage]);

//     // const filterColmns = React.useMemo(() => {
//     //     try {
//     //         if (!TotalColumns) return [];
//     //         return TotalColumns.filter(
//     //             (col) =>
//     //                 col.name == primaryColumn || Array.from(columns).includes(col.name)
//     //         );
//     //     } catch (e) {
//     //         console.error(e);
//     //     }
//     // }, [columns, primaryColumn, TotalColumns]);

//     const sortedItems = React.useMemo(() => {
//         try {
//             if (!sortDescriptor) return items;
//             const column = sortDescriptor.column as keyof Pokemon;
//             return [...items].sort((a, b) => {
//                 const first = a[column];
//                 const second = b[column];
//                 const cmp = first < second ? -1 : first > second ? 1 : 0;
//                 return sortDescriptor.direction === "descending" ? -cmp : cmp;
//             });
//         } catch (e) {
//             console.error(e);
//         }
//     }, [sortDescriptor, items]);
//     // const tableIndexs = useCallback(() => {
//     //     try {
//     //         if (data) {
//     //             setTableIndex((prev) => {
//     //                 const newItems = data.map((item) => item[primaryColumn]as never);
//     //                 return new Set([...prev, ...newItems]);
//     //             });
//     //         }
//     //     } catch (e) {
//     //         console.error(e);
//     //     }
//     // }, [data]);
//     // useEffect(() => {
//     //     tableIndexs();
//     // }, [data]);
//     // const getColumns = (tableData, visibleColumns) => {
//     //     try {
//     //         let newColumns = new Set([]);
//     //         tableData.forEach((item) => {
//     //             if (typeof item == "object")
//     //                 Object.keys(item).forEach((key) => newColumns.add(key));
//     //         });

//     //         let cc = Array.from(newColumns).map((key) => ({
//     //             id: key,
//     //             name: key,
//     //             key: key,
//     //             label: key,
//     //             isRowHeader: key == primaryColumn ? true : false,
//     //             allowsSorting: allowsSorting,
//     //         }));
//     //         if (visibleColumns && visibleColumns.length > 0) {
//     //             setTotalColumns([
//     //                 {
//     //                     id: primaryColumn,
//     //                     name: primaryColumn,
//     //                     key: primaryColumn,
//     //                     label: primaryColumn,
//     //                     isRowHeader: true,
//     //                     allowsSorting: allowsSorting,
//     //                 },
//     //                 ...visibleColumns.map((key) => {
//     //                     if (key !== primaryColumn) {
//     //                         return {
//     //                             id: key,
//     //                             name: key,
//     //                             key: key,
//     //                             label: key,
//     //                             isRowHeader: key == primaryColumn ? true : false,
//     //                             allowsSorting: allowsSorting,
//     //                         };
//     //                     }
//     //                 }),
//     //             ]);
//     //         } else {
//     //             setTotalColumns(cc);
//     //         }

//     //         setColumns(newColumns);
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };
//     let [selectedKeys, setSelectedKeys] = React.useState(null);
//     useEffect(() => {
//         if (Array.isArray(tableData) && !isAsync) {
//             getColumns(tableData, visibleColumns);
//             setData(tableData);
//             setTableDataLength(tableData.length);

//             setSortDescriptor({
//                 column: primaryColumn,
//                 direction: "ascending",
//             });
//         } else if (isAsync && getAysncData) {
//             initalsAysncData(true, page);
//         } else {
//             console.error("tableData is not an array");
//         }
//     }, [tableData, primaryColumn, visibleColumns]);

//     // const initalsAysncData = (isIntial = false, page) => {
//     //     try {
//     //         getAysncData(page, serchValue, rowsPerPage).then((data) => {
//     //             if (
//     //                 data &&
//     //                 data.tableData &&
//     //                 Array.isArray(data.tableData) &&
//     //                 data?.totalPages
//     //             ) {
//     //                 setData(data.tableData);
//     //                 if (isIntial) {
//     //                     getColumns(data.tableData, visibleColumns);
//     //                     setTableDataLength(data.totalPages / rowsPerPage);
//     //                     setTotalPages(data.totalPages);
//     //                     setSortDescriptor({
//     //                         column: primaryColumn,
//     //                         direction: "ascending",
//     //                     });
//     //                 }
//     //             }
//     //         });
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     if (!isAsync) setTotalPages(Math.ceil(data.length / rowsPerPage));
//     // }, [data, rowsPerPage]);
//     // const handleSave = React.useCallback(() => {
//     //     try {
//     //         if (onSave && !isAsync) {
//     //             let returnValue = [];
//     //             if (
//     //                 (selectionMode == "multiple" || selectionMode == "single") &&
//     //                 selectedRows.size > 0
//     //             ) {
//     //                 Array.from(selectedRows).forEach((item) => {
//     //                     if (item && item !== "all") returnValue.push(data[item]);
//     //                     else if (item && item === "all") returnValue = data;
//     //                 });
//     //             } else {
//     //                 returnValue = data;
//     //             }

//     //             onSave(returnValue);
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // }, [data, onSave, selectedRows, selectionMode]);
//     // const handlePageChange = async (type) => {
//     //     let newPage;
//     //     if (type == "next") {
//     //         newPage = (p) => {
//     //             if (p < totalPages) return p + 1;
//     //             return p;
//     //         };
//     //     }
//     //     if (type == "prev") {
//     //         newPage = (p) => {
//     //             if (p > 1) return p - 1;
//     //             return p;
//     //         };
//     //     }
//     //     if (isAsync && getAysncData) {
//     //         initalsAysncData(false, newPage(page));
//     //     }
//     //     setPage(newPage(page));
//     // };
//     return (
//         <TableDataContext.Provider
//             value={{
//                 // primaryColumn,
//                 data,
//                 setData,
//                 selectedRows,
//                 setSelectedRows,
//                 selectionMode,
//                 selectionBehavior,
//                 tableIndex,
//                 isAsync,
//                 // onEdit,
//                 // onDelete,
//                 // onAdd,
//                 // TotalColumns,
//                 // editableColumns,
//                 // addableColumns,
//                 // isSkeleton,
//             }}
//         >
//             {filterColmns.length > 0 && sortDescriptor && totalPages && (
//                 <div className="w-full h-screen flex flex-col items-center justify-evenly">
//                     <div className="w-full h-[8%] flex justify-center items-center ">
//                         <div className="w-[95%] h-full flex justify-between items-center pl-2">
//                             <div className="w-[60%] h-full bg-transparent rounded-md flex justify-start  ">
//                                 <div className="w-[100%] h-full bg-transparent gap-1 rounded-md flex flex-col items-center">
//                                     <div className="w-[100%] h-full bg-transparent">
//                                         <div className="grid grid-cols-12 gap-0.5 ">
//                                             <div className="col-span-3 flex justify-start items-center">
//                                                 <div className="w-[100%]">
//                                                     <span className="text-lg font-medium text-[#101828]">
//                                                         {heading}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             <div className="col-span-3 flex justify-start items-center">
//                                                 {length()}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="w-[100%] h-full bg-transparent">
//                                         <div className="grid grid-cols-12 gap-0.5 ">
//                                             {descriptions(description)}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="w-[40%] h-full flex flex-row justify-end gap-[0.2rem] items-center">
//                                 <div className="w-[20%] flex justify-end items-center py-2">
//                                     {/* <TorusButton
//                                         Children="Save"
//                                         width={"full"}
//                                         btncolor={"#FFFFFF"}
//                                         outlineColor="torus-hover:ring-gray-200/50"
//                                         borderColor={"2px solid #D0D5DD"}
//                                         radius={"lg"}
//                                         color={"#000000"}
//                                         gap={"py-[0.2rem] px-[0.5rem]"}
//                                         height={"md"}
//                                         fontStyle={"text-sm font-medium text-[#344054]"}
//                                         startContent={<CiSaveUp1 size={22} color="#344054" />}
//                                         onPress={handleSave}
//                                     /> */}
//                                 </div>
//                                 {/* <div className="w-[20%] flex justify-end items-center py-2">
//                                     <TorusButton
//                                         Children="Import"
//                                         width={"full"}
//                                         btncolor={"#FFFFFF"}
//                                         outlineColor="torus-hover:ring-gray-200/50"
//                                         borderColor={"2px solid #D0D5DD"}
//                                         radius={"lg"}
//                                         color={"#000000"}
//                                         gap={"py-[0.2rem] px-[0.5rem]"}
//                                         height={"md"}
//                                         fontStyle={"text-sm font-medium text-[#344054]"}
//                                         startContent={<ImportIcon />}
//                                     />
//                                 </div> */}
//                                 {/* <div className="w-[25%] h-[100%] flex bg-transparent rounded-md  items-center">
//                                     <TorusDialog
//                                         key={"TableDelete"}
//                                         triggerElement={
//                                             <TorusButton
//                                                 Children={`Add`}
//                                                 size={"xs"}
//                                                 btncolor={"#0736C4"}
//                                                 outlineColor="torus-hover:ring-[#0736C4]/50"
//                                                 radius={"lg"}
//                                                 color={"#ffffff"}
//                                                 gap={"py-[0.2rem] px-[0.2rem]"}
//                                                 height={"md"}
//                                                 borderColor={"3px solid #0736C4"}
//                                                 startContent={<PlusIcon />}
//                                                 fontStyle={"text-sm font-medium text-[#FFFFFF]"}
//                                             />
//                                         }
//                                         classNames={{
//                                             dialogClassName: " flex  border-2 flex-col bg-white",
//                                         }}
//                                         title={"Add"}
//                                         message={"Edit"}
//                                         children={({ close }) => <AddAction close={close} />}
//                                     />
//                                 </div>
//                             </div> */}
//                         </div>
//                     </div>
//                     <div className="w-full h-[70%] flex flex-col justify-between items-center">
//                         <div className="w-[95%] flex items-center justify-center h-[8%]">
//                             <div className="w-[60%] flex  h-full bg-transparent rounded-md ">
//                                 <div className="w-[20%] h-full bg-white rounded-md pl-2">
//                                     <Tabs>
//                                         <TabList
//                                             aria-label="UnIdentified-Tabs"
//                                             className={"flex justify-between gap-0 bg-transparent"}
//                                         >
//                                             <Tab
//                                                 className={
//                                                     "py-[0.2rem]  bg-white torus-focus:outline-none torus-focus:bg-[#F9FAFB] px-[0.5rem] rounded-l-md border-2 border-[#D0D5DD] border-r-transparent "
//                                                 }
//                                                 id="FoR"
//                                             >
//                                                 <span className="text-black font-normal text-xs whitespace-nowrap">
//                                                     view all
//                                                 </span>
//                                             </Tab>
//                                             <Tab
//                                                 className={
//                                                     "py-[0.2rem]  bg-white torus-focus:outline-none torus-focus:bg-[#F9FAFB] px-[0.5rem] border-2 border-[#D0D5DD]  "
//                                                 }
//                                                 id="MaR"
//                                             >
//                                                 <span className="text-black font-normal text-xs">
//                                                     Monitered
//                                                 </span>
//                                             </Tab>
//                                             <Tab
//                                                 className={
//                                                     "py-[0.2rem]  bg-white torus-focus:outline-none torus-focus:bg-[#F9FAFB] px-[0.5rem] border-2 border-[#D0D5DD] border-l-transparent rounded-r-md "
//                                                 }
//                                                 id="Emp"
//                                             >
//                                                 <span className="text-black font-normal text-xs">
//                                                     Text
//                                                 </span>
//                                             </Tab>
//                                         </TabList>
//                                     </Tabs>
//                                 </div>
//                             </div>
//                             <div className="w-[40%] h-full flex flex-row justify-between gap-2 items-center">
//                                 <div className="w-[80%] flex justify-start items-center">
//                                     {/* <TorusSearch
//                                         variant="bordered"
//                                         labelColor="text-[#000000]/50"
//                                         borderColor="border-[#000000]/20"
//                                         outlineColor="torus-focus:ring-[#000000]/50"
//                                         placeholder="search"
//                                         onChange={handleSerach}
//                                         isDisabled={false}
//                                         radius="lg"
//                                         textColor="text-[#000000]"
//                                         bgColor="bg-[#FFFFFF]"
//                                         value={serchValue}
//                                         type="text"
//                                     /> */}
//                                 {/* </div>
//                                 <div className="w-[20%] h-[100%] flex bg-transparent rounded-md justify-end items-center">
//                                     <TorusDropDown
//                                         title={"Filter"}
//                                         selectionMode="multiple"
//                                         selected={columns}
//                                         setSelected={setColumns}
//                                         dynamicItems={TotalColumns.filter(
//                                             (col) => col.name != primaryColumn
//                                         )}
//                                         btWidth={"full"}
//                                         btncolor={"#FFFFFF"}
//                                         btheight={"md"}
//                                         outlineColor="torus-hover:ring-gray-200/50"
//                                         radius={"lg"}
//                                         color={"#000000"}
//                                         gap={"py-[0.2rem] px-[0.5rem]"}
//                                         borderColor={"2px solid #D0D5DD"}
//                                         startContent={<FilterIcon />}
//                                         fontStyle={"text-sm font-medium text-[#344054]"}
//                                     />
//                                 </div> */}
//                             </div>
//                         </div>
//                         <div className="w-full h-[90%] overflow-scroll ">
//                             <Table
//                                 selectedKeys={selectedKeys}
//                                 onSortChange={(descriptor) => setSortDescriptor(descriptor)}
//                                 sortDescriptor={sortDescriptor}
//                                 onSelectionChange={setSelectedKeys}
//                                 className={"w-full h-[90%] mt-2"}
//                             >
//                                 {isSkeleton ? (
//                                     <>
//                                         {children &&
//                                             typeof children === "function" &&
//                                             children({
//                                                 selectedKeys,
//                                                 sortedItems,
//                                                 filterColmns,
//                                                 primaryColumn,
//                                             })}
//                                     </>
//                                 ) : (
//                                     <>
//                                         <TorusTableHeader
//                                             selectedKeys={selectedKeys}
//                                             columns={[
//                                                 ...filterColmns,
//                                                 isEditable && {
//                                                     id: "Actions",
//                                                     name: "Actions",
//                                                     key: "Actions",
//                                                     label: "Actions",
//                                                     isRowHeader: false,
//                                                 },
//                                             ]}
//                                         />

//                                         <TableBody
//                                             renderEmptyState={() => (
//                                                 <div className="text-center"> No Data </div>
//                                             )}
//                                         >
//                                             {sortedItems.map((item, index) => (
//                                                 <>
//                                                     <TorusRow
//                                                         key={item[primaryColumn]}
//                                                         item={item}
//                                                         id={index}
//                                                         index={item[primaryColumn]}
//                                                         columns={[
//                                                             ...filterColmns,
//                                                             isEditable && {
//                                                                 id: "Actions",
//                                                                 name: "Actions",
//                                                                 key: "Actions",
//                                                                 label: "Actions",
//                                                                 isRowHeader: false,
//                                                             },
//                                                         ]}
//                                                         selectedKeys={selectedKeys}
//                                                         className={
//                                                             "border-1 border-b-slate-800 border-t-transparent border-l-transparent border-r-transparent"
//                                                         }
//                                                     />
//                                                 </>
//                                             ))}
//                                         </TableBody>
//                                     </>
//                                 )}
//                             </Table>
//                         </div>
//                     </div>

//                     <div className="flex flex-col items-center justify-center pl-2 w-[100%] h-[5%]">
//                         <div className="w-[95%] flex justify-between ">
//                             <div className="w-[85%] flex justify-start">
//                                 <span className="text-sm font-medium text-[#344054]">
//                                     Page {page} of {totalPages}
//                                 </span>
//                             </div>

//                             <div className="w-[15%] flex items-center justify-end gap-2">
//                                 {/* <TorusButton
//                     Children={<FaArrowDown  color="white"/>}
//                     size={"md"}
//                     outlineColor="torus-hover:ring-gray-200/50"
//                     btncolor={"warning"}
//                     borderColor={"2px solid #D0D5DD"}
//                     fontStyle={"text-xs font-normal text-[#344054]"}
//                     radius={"lg"}
//                     gap={"py-[0.2rem] px-[0.5rem]"}
//                     isIconOnly={true}
//                   /> */}

//                                 {/* <div className="w-[40%] flex justify-start">
//                                     <TorusButton
//                                         Children="Previous"
//                                         size={"md"}
//                                         btncolor={"#FFFFFF"}
//                                         outlineColor="torus-hover:ring-gray-200/50"
//                                         borderColor={"2px solid #D0D5DD"}
//                                         fontStyle={"text-xs font-normal text-[#344054]"}
//                                         radius={"lg"}
//                                         gap={"py-[0.2rem] px-[0.5rem]"}
//                                         // startContent={<GiPreviousButton />}
//                                         onPress={() => handlePageChange("prev")}
//                                     />
//                                 </div> */}

//                                 {/* <div className="w-[30%] flex justify-end">
//                                     <TorusButton
//                                         Children={"Next"}
//                                         btncolor={"#FFFFFF"}
//                                         outlineColor="torus-hover:ring-gray-200/50"
//                                         borderColor={"2px solid #D0D5DD"}
//                                         fontStyle={"text-xs font-normal text-[#344054]"}
//                                         radius={"lg"}
//                                         gap={"py-[0.2rem] px-[0.5rem]"}
//                                         size={"md"}
//                                         // startContent={<GiPreviousButton />}
//                                         onPress={() => handlePageChange("next")}
//                                     />
//                                 </div> */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </TableDataContext.Provider>
//     );
// }
// {/* export const TableCellActions = ({ id }) => {
//     return (
//         <div className=" w-full h-full flex flex-col items-center justify-center ">
//             <div className="w-[100%] h-[50%] flex justify-center items-center ">
//                 <div className="w-[25%] h-[100%] flex justify-end items-center">
//                     <TorusDialog
//                         Header="      Do you want to delete this item"
//                         key={"TableDelete"}
//                         triggerElement={
//                             <TorusButton
//                                 buttonClassName={"w-10 h-10 rounded-full"}
//                                 Children={<DeleteIcon />}
//                                 isIconOnly={true}
//                                 btncolor={"bg-transparent"}
//                             />
//                         }
//                         classNames={{
//                             dialogClassName:
//                                 " flex  border border-gray-300 rounded-lg flex-col bg-white",
//                         }}
//                         message={"Delete"}
//                         children={({ close }) => (
//                             <>
//                                 <div className="p-4">
//                                     <Heading className="font-medium text-black " slot="title">
//                                         Delete Item
//                                     </Heading>
//                                     <p className="mt-2">
//                                         This will permanently delete the selected item. Continue?
//                                     </p>
//                                     <DeleteAction id={id} close={close} />
//                                 </div>
//                             </>
//                         )}
//                     />
//                 </div>

//                 <div className="w-[25%] h-[100%] flex justify-start items-center">
//                     <TorusDialog
//                         key={"TableEdit"}
//                         triggerElement={
//                             <TorusButton
//                                 buttonClassName={"w-10 h-10 rounded-full"}
//                                 Children={<EditIcon />}
//                                 isIconOnly={true}
//                                 btncolor={"bg-#D0D5DD"}
//                             />
//                         }
//                         classNames={{
//                             dialogClassName: " flex  border-2 flex-col bg-white",
//                         }}
//                         title={"Edit"}
//                         message={"Edit"}
//                         children={({ close }) => <EditAction id={id} close={close} />}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }; */}
// {/* export const RenderTableChildren = ({ children }) => (
//     <>
//         {children && typeof children === "object" ? (
//             <>
//                 {Array.isArray(children) ? (
//                     <div className=" flex flex-col gap-1">
//                         {children.map((item, index) => (
//                             <li className="text-sm font-medium">
//                                 <RenderTableChildren key={index} children={item} />
//                             </li>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className=" flex flex-col gap-1 ">
//                         {Object.keys(children).map((key) => (
//                             <div key={key} className=" flex gap-2 items-center justify-start">
//                                 <h1>{key}:</h1>
//                                 <RenderTableChildren key={key} children={children[key]} />
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </>
//         ) : (
//             children
//         )}
//     </>
// ); */}

// {/* const EditAction = ({ id, close }) => {
//     const { data, setData, primaryColumn, onEdit, isAsync, editableColumns } =
//         React.useContext(TableDataContext);
//     const [obj, setObj] = React.useState(null);
//     useEffect(() => {
//         let orginalObj = data?.find((item) => item?.[primaryColumn] === id);
//         let modifiedObj = {};
//         Object.keys(orginalObj).forEach((key) => {
//             if (key !== primaryColumn && editableColumns.includes(key)) {
//                 modifiedObj[key] = orginalObj[key];
//             }
//         });
//         setObj(modifiedObj);
//     }, [id, data]);

//     const handleSave = () => {
//         if (isAsync) onEdit(id, obj);
//         setData((prev) => {
//             return prev.map((item, index) => {
//                 if (item?.[primaryColumn] === id) {
//                     return { ...item, ...obj };
//                 }
//                 return item;
//             });
//         });
//         close();
//     };
//     return (
//         <div className="w-[300px] bg-white h-[400px] rounded-lg  border-none flex flex-col gap-3 p-2 items-start justify-between">
//             <div className="w-full h-[350px] overflow-y-scroll scrollbar-hide p-2">
//                 {obj && <Cycle obj={obj} setObj={setObj} />}
//             </div>
//             <div className="w-full flex justify-center">
//                 <TorusButton
//                     buttonClassName={
//                         "bg-[#0736C4] w-[95%] h-[45px] border-none text-white"
//                     }
//                     Children={"Save"}
//                     onPress={handleSave}
//                 />
//             </div>
//         </div>
//     );
// }; */}
// {/* const AddAction = ({ close }) => {
//     const {
//         data,
//         setData,
//         primaryColumn,
//         onAdd,
//         isAsync,
//         TotalColumns,
//         addableColumns,
//     } = React.useContext(TableDataContext);
//     const [obj, setObj] = useState(null);

//     useEffect(() => {
//         let newObj = {};
//         TotalColumns.forEach((item) => {
//             if (item.key !== primaryColumn && addableColumns.includes(item?.key))
//                 newObj = { ...newObj, [item?.key]: "" };
//         });
//         setObj(newObj);
//     }, []);

//     const handleSave = () => {
//         if (isAsync && onAdd) onAdd(obj);
//         setData((prev) => {
//             return [...prev, obj];
//         });
//         close();
//     };
//     return (
//         <div className="w-[300px] bg-white h-[400px] rounded-lg  border-none flex flex-col gap-3 p-2 items-start justify-between">
//             <div className="w-full h-[350px] overflow-y-scroll scrollbar-hide p-2">
//                 {obj && <Cycle obj={obj} setObj={setObj} />}
//             </div>
//             <div className="w-full flex justify-center">
//                 <TorusButton
//                     buttonClassName={
//                         "bg-[#0736C4] w-[95%] h-[45px] border-none text-white"
//                     }
//                     Children={"Add"}
//                     onPress={handleSave}
//                 />
//             </div>
//         </div>
//     );
// }; */}

// {/* const DeleteAction = ({ id, close }) => {
//     const { data, setData, primaryColumn, onDelete, isAsync } =
//         useContext(TableDataContext);

//     const handleDelete = () => {
//         if (isAsync) onDelete(id);
//         setData((prev) => {
//             return prev.filter((item, index) => item?.[primaryColumn] !== id);
//         });
//         close();
//     };
//     return (
//         <div className="w-[400px] bg-white h-[100px] rounded-lg  border-none flex flex-row gap-3 items-center justify-end">
//             <TorusButton
//                 buttonClassName={"bg-gray-200 w-[80px] h-[40px] text-black"}
//                 Children={"Cancel"}
//                 onPress={close}
//             />
//             <TorusButton
//                 buttonClassName={"bg-red-500 w-[80px] h-[40px] text-white"}
//                 Children={"Delete"}
//                 onPress={handleDelete}
//             />
//         </div>
//     );
// }; */}

// {/* const Cycle = ({ obj, setObj }) => {
//     console.log(obj, "obj");
//     return (
//         <>
//             {obj && Array.isArray(obj) ? (
//                 obj?.map((ele, index) => (
//                     <>
//                         {ele && (
//                             <li>
//                                 <Cycle
//                                     key={index}
//                                     obj={ele}
//                                     setObj={(newObj) =>
//                                         setObj(
//                                             obj && obj?.map((e, i) => (i === index ? newObj : e))
//                                         )
//                                     }
//                                 />
//                             </li>
//                         )}
//                     </>
//                 ))
//             ) : obj && typeof obj == "object" ? (
//                 Object.keys(obj).map((ele) => {
//                     if (typeof obj[ele] === "object")
//                         return (
//                             <>
//                                 <p>{ele}:</p>
//                                 <Cycle
//                                     key={ele}
//                                     obj={obj[ele]}
//                                     setObj={(newObj) => setObj({ ...obj, [ele]: newObj })}
//                                 />
//                             </>
//                         );
//                     return (
//                         <TorusInput
//                             key={ele}
//                             variant="bordered"
//                             label={ele}
//                             labelColor="text-[#000000]/50"
//                             borderColor="[#000000]/50"
//                             outlineColor="torus-focus:ring-[#000000]/50"
//                             placeholder=""
//                             isDisabled={false}
//                             onChange={(e) => setObj({ ...obj, [ele]: e })}
//                             radius="lg"
//                             width="xl"
//                             height="xl"
//                             textColor="text-[#000000]"
//                             bgColor="bg-[#FFFFFF]"
//                             value={obj[ele]}
//                             type="text"
//                         />
//                     );
//                 })
//             ) : (
//                 <TorusInput
//                     variant="bordered"
//                     labelColor="text-[#000000]/50"
//                     borderColor="[#000000]/50"
//                     outlineColor="torus-focus:ring-[#000000]/50"
//                     placeholder=""
//                     isDisabled={false}
//                     onChange={(e) => setObj(e)}
//                     radius="lg"
//                     width="xl"
//                     height="xl"
//                     textColor="text-[#000000]"
//                     bgColor="bg-[#FFFFFF]"
//                     value={obj != null ? obj : ""}
//                     type="text"
//                 />
//             )}
//         </>
//     );
// }; */}
