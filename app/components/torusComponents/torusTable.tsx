import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Cell,
  Column,
  Heading,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import { FaArrowDown } from "react-icons/fa";
import { Checkbox } from "react-aria-components";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";

import {
  Checked,
  DeleteIcon,
  EditIcon,
  TickSign,
  UnChecked,
  UnTickSign,
} from "../../constants/svgApplications";

import { twMerge } from "tailwind-merge";
import TorusDialog from "./torusdialogmodal";
import TorusInput from "./torusInput";
import TorusButton from "./torusButton";

const defaultClassName = {
  table: "",
  tableHeader: "",
  tableBody: "",
  tableRow: "",
  tableCell: "",
};
export const TableDataContext = createContext<null | any>(null);
export function TorusColumn(props: any) {
  return (
    <Column
      aria-label="Column"
      {...props}
      className={twMerge(
        "text-xs  font-medium px-4 center bg-[#EAECF0] py-[0.8rem] focus:outline-none focus:border-none",
        props.className
      )}
    >
      {({ allowsSorting, sortDirection }) => (
        <div className="w-[100%]  flex justify-center items-center group">
          <div className="w-[100%] flex items-center justify-center gap-1">
            <div className="w-[80%] flex items-center justify-center">
              {props.children.charAt(0).toUpperCase() + props.children.slice(1)}
            </div>
            <div className="w-[20%] flex items-center justify-center  ">
              {allowsSorting && (
                <span
                  aria-hidden="true"
                  className="sort-indicator opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaArrowDown
                    size={12}
                    color="#667085"
                    className={` transition-rotate ease-in-out duration-100 ${sortDirection === "ascending" ? "rotate-180" : ""
                      }`}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Column>
  );
}

export function TorusTableHeader({
  columns,
  children,
  selectedKeys,
  className,
}: any) {
  const { selectionBehavior, selectionMode, isSkeleton } =
    useContext(TableDataContext);
  return (
    <TableHeader aria-label="Table Header" className={twMerge("w-full sticky top-0", className)}>
      {/* Add extra columns for drag and drop and selection. */}
      {/* {allowsDragging && <Column />} */}
      {selectionBehavior === "toggle" && (
        <Column
          aria-label="Column"
          className={twMerge(
            `text-xs w-[${100 / columns.length + 1
            }%] font-medium px-[0.58vw] py-[0.8rem] focus:outline-none focus:border-none`,
            className
          )}
        >
          {selectionMode === "multiple" && (
            <TorusColumnCheckbox
              slot="selection"
              selectedKeys={selectedKeys}
              className="cursor-pointer"
            />
          )}
        </Column>
      )}
      {isSkeleton ? (
        <>
          {children && typeof children === "function" && children({ columns })}
        </>
      ) : (
        <>
          {columns.map((column: any) => (
            <TorusColumn
              key={column.id}
              id={column.id}
              allowsSorting={column.allowsSorting}
              isRowHeader={column.isRowHeader}
              className={`w-[${100 / columns.length + 1}%]`}
            >
              {column.name}
            </TorusColumn>
          ))}
        </>
      )}
      {/* <Collection items={columns}>{children}</Collection> */}
    </TableHeader>
  );
}

export function TorusRow({
  id,
  columns,
  className,
  children,
  ...otherProps
}: any) {
  let { selectionBehavior, isSkeleton } = useContext(TableDataContext);

  const handleRowAction = (item: any) => {
    if (otherProps?.onAction) {
      otherProps?.onAction(item);
    } else {
      console.log("Action not found");
    }
  };

  return (
    <>
      <Row
        aria-label="Row"
        {...otherProps}
        key={id}
        className={className}
        onAction={() => handleRowAction(otherProps?.item)}
      >
        {/* {allowsDragging && (
            <Cell className={"min-h-4"}>
              <Button slot="drag">≡</Button>
            </Cell>
          )} */}
        {selectionBehavior === "toggle" && (
          <Cell aria-label="Select row">
            <TorusCheckbox
              selectedKeys={otherProps?.selectedKeys}
              slot="selection"
              className="cursor-pointer"
              index={otherProps?.index}
            />

            {/* <TorusCheckBox type="single" /> */}
          </Cell>
        )}

        {isSkeleton ? (
          <>
            {children &&
              typeof children === "function" &&
              children({
                columns,
                item: otherProps?.item,
                index: otherProps?.index,
              })}
          </>
        ) : (
          <>
            {columns.map((column: any) => {
              if (column?.id == "Actions") {
                return (
                  <Cell
                    key={column?.id}
                    aria-label="Actions"
                    className={"border-b border-[#EAECF0]"}
                  >
                    <TableCellActions id={otherProps?.index} />
                  </Cell>
                );
              } else
                return (
                  <Cell
                    key={column?.id}
                    aria-label="table cell"
                    className={"border-b border-[#EAECF0]"}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center py-[1rem] text-xs font-normal ">
                      <RenderTableChildren>
                        {otherProps?.item?.[column?.id]}
                      </RenderTableChildren>
                    </div>
                  </Cell>
                );
            })}
          </>
        )}
      </Row>
    </>
  );
}

export function TorusCheckbox({ children, index, ...props }: any) {
  const { selectedRows, setSelectedRows, tableIndex, selectionMode } =
    useContext(TableDataContext);
  return (
    <Checkbox
      aria-label="Aria-checkbox"
      {...props}
      className={"w-full, h-full, flex items-center justify-center"}
      isIndeterminate={
        selectedRows &&
          Array.from(selectedRows).length > 0 &&
          (selectedRows.has(index) || selectedRows.has("all"))
          ? true
          : false
      }
    >
      {({ isIndeterminate }) => (
        <>
          <div
            className="checkbox"
            onClick={() => {
              if (selectedRows.has(index)) {
                if (selectionMode === "multiple")
                  setSelectedRows(
                    (prev: any) =>
                      new Set(Array.from(prev).filter((item) => item !== index))
                  );
                else setSelectedRows(new Set([]));
              } else if (
                selectedRows.has("all") &&
                selectionMode === "multiple"
              ) {
                setSelectedRows(
                  new Set(
                    Array.from(tableIndex).filter((item) => item !== index)
                  )
                );
              } else {
                if (
                  Array.from(selectedRows).length + 1 ==
                  Array.from(tableIndex).length &&
                  selectionMode === "multiple"
                ) {
                  setSelectedRows(new Set(["all"]));
                } else if (selectionMode === "multiple")
                  setSelectedRows(
                    (prev: any) => new Set([...Array.from(prev), index])
                  );
                else setSelectedRows(new Set([index]));
              }
            }}
          >
            <svg className="h-5 w-5" viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? <Checked /> : <UnChecked />}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}
function TorusColumnCheckbox({ children, ...props }: any) {
  const { selectedRows, setSelectedRows } = useContext(TableDataContext);

  return (
    <Checkbox
      // {...props}
      slot={"selection"}
      className={
        "w-full, h-full, flex items-center justify-center cursor-pointer"
      }
      id="all"
      isIndeterminate={
        selectedRows &&
          Array.from(selectedRows).length > 0 &&
          selectedRows.has("all")
          ? true
          : false
      }
    >
      {({ isIndeterminate }) => (
        <>
          <div
            className="checkbox"
            onClick={() => {
              if (selectedRows.has("all")) {
                setSelectedRows(new Set([""]));
              } else {
                setSelectedRows(new Set(["all"]));
              }
            }}
          >
            <svg className="h-5 w-5" viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? <Checked /> : <UnChecked />}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }: any) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 ">
      <Button
        className="px-[0.58vw] py-[0.29vw]  border rounded shadow flex items-center text-[0.72vw] text-[#344054] gap-2 focus:outline-none dark:text-[#FFFFFF]"
        onPress={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        <BiLeftArrowAlt size={12} /> Previous
      </Button>
      <div className="flex gap-2">
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            className={`pagination-button text-[0.72vw] focus:outline-none dark:focus:bg-[#3063FF]/35 dark:text-[#FFFFFF] ${page === currentPage
              ? "text-[#0736C4] bg-[#E3EAFF] px-[0.58vw] py-[0.29vw]  rounded"
              : "text-[#667085]"
              }`}
            onPress={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
        {totalPages > 4 && currentPage + 2 < totalPages && (
          <span className="text-[#667085] dark:text-[#FFFFFF]">...</span>
        )}
      </div>
      {totalPages > 4 && currentPage + 1 < totalPages && (
        <Button
          className={`pagination-button text-[0.72vw] focus:outline-none dark:text-[#FFFFFF] ${totalPages === currentPage
            ? "text-[#0736C4] bg-[#E3EAFF] px-[0.58vw] py-[0.29vw]  rounded"
            : "text-[#667085]"
            }`}
          onPress={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      )}
      <Button
        className="px-[0.58vw] py-[0.29vw]  border rounded shadow flex items-center text-[0.72vw] text-[#344054] gap-2 focus:outline-none aria-pressed:hidden dark:text-[#FFFFFF]"
        onPress={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next <BiRightArrowAlt size={12} />
      </Button>
    </div>
  );
};

export function TorusTable({
  isAsync = false,
  allowsSorting = true,
  primaryColumn,
  tableData,
  onSave,
  onEdit,
  rowsPerPage = 6,
  isEditable = true,
  description,
  selectionMode,
  selectionBehavior,
  getAysncData,
  selectedRows,
  setSelectedRows,
  onDelete,
  onAdd,
  children,
  editableColumns,
  addableColumns,
  visibleColumns,
  isSkeleton = false,
  searchValue = "",
}: any) {
  const [data, setData] = useState<any>([]);
  const [columns, setColumns] = useState<any>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState<null | any>(null);
  const [page, setPage] = useState<any>(1);
  const [totalPages, setTotalPages] = useState<null | any>(null);
  const [TotalColumns, setTotalColumns] = useState<any>([]);
  // const [searchValue, setSearchValue] = useState<string>("");

  const [tableDataLength, setTableDataLength] = useState<any>(0);
  const [tableIndex, setTableIndex] = useState<any>(new Set([]));
  const descriptions = (description: any) => {
    if (description) {
      return (
        <div className="col-span-6 flex justify-start items-center dark:text-[#FFFFFF]">
          <div className="w-[100%] whitespace-nowrap text-sm font-normal">
            {`Keep track of ${description} and display them in a table. `}
          </div>
        </div>
      );
    }
  };

  const length = () => {
    if (tableDataLength) {
      return (
        <>
          <div className="text-xs bg-[#F9F5FF] px-1.5 py-[2px] rounded-md">
            <p className="text-[#0736C4] font-medium">{`${tableDataLength}+ ${description}`}</p>
          </div>
        </>
      );
    }
  };
  // const handleSerach = useCallback(
  //   (e: any) => {
  //     if (isAsync)
  //       getAysncData(page, e, rowsPerPage).then((data: any) => {
  //         if (data && data.tableData && data.tableData.length > 0) {
  //           setData(data.tableData);
  //           setSearchValue(e);
  //         } else {
  //           setData([]);
  //           setSearchValue(e);
  //         }
  //       });
  //     else setSearchValue(e);
  //   },
  //   [page, rowsPerPage, getAysncData]
  // );

  const serachedItems: any = React.useMemo(() => {
    try {
      if (isAsync) return data;
      return data.filter((item: any) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    } catch (e) {
      console.error(e);
    }
  }, [searchValue, data, page, rowsPerPage, getAysncData]);

  const items = React.useMemo(() => {
    try {
      if (isAsync) return serachedItems;
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return serachedItems.slice(start, end);
    } catch (e) {
      console.error(e);
    }
  }, [page, serachedItems, rowsPerPage]);

  const filterColmns = React.useMemo(() => {
    try {
      if (!TotalColumns) return [];
      return TotalColumns.filter(
        (col: any) =>
          col?.name == primaryColumn || Array.from(columns).includes(col?.name)
      );
    } catch (e) {
      console.error(e);
    }
  }, [columns, primaryColumn, TotalColumns]);

  const sortedItems = React.useMemo(() => {
    try {
      if (!sortDescriptor) return items;
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor?.column];
        const second = b[sortDescriptor?.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.error(e);
    }
  }, [sortDescriptor, items]);
  const tableIndexs = useCallback(() => {
    try {
      if (data) {
        setTableIndex((prev: any) => {
          return new Set([
            ...prev,
            ...data.map((item: any) => item[primaryColumn]),
          ]);
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [data]);
  useEffect(() => {
    tableIndexs();
  }, [data]);
  const getColumns = (tableData: any, visibleColumns: any) => {
    try {
      let newColumns: any = new Set([]);
      tableData.forEach((item: any) => {
        if (typeof item == "object")
          Object.keys(item).forEach((key) => newColumns.add(key));
      });

      let cc = Array.from(newColumns).map((key) => ({
        id: key,
        name: key,
        key: key,
        label: key,
        isRowHeader: key == primaryColumn ? true : false,
        allowsSorting: allowsSorting,
      }));
      if (visibleColumns && visibleColumns.length > 0) {
        setTotalColumns([
          {
            id: primaryColumn,
            name: primaryColumn,
            key: primaryColumn,
            label: primaryColumn,
            isRowHeader: true,
            allowsSorting: allowsSorting,
          },
          ...visibleColumns.map((key: any) => {
            if (key !== primaryColumn) {
              return {
                id: key,
                name: key,
                key: key,
                label: key,
                isRowHeader: key == primaryColumn ? true : false,
                allowsSorting: allowsSorting,
              };
            }
          }),
        ]);
      } else {
        setTotalColumns(cc);
      }

      setColumns(newColumns);
    } catch (error) {
      console.error(error);
    }
  };
  let [selectedKeys, setSelectedKeys] = React.useState<null | any>(null);
  useEffect(() => {
    if (Array.isArray(tableData) && !isAsync) {
      getColumns(tableData, visibleColumns);
      setData(tableData);
      setTableDataLength(tableData.length);

      setSortDescriptor({
        column: primaryColumn,
        direction: "ascending",
      });
    } else if (isAsync && getAysncData) {
      initalsAysncData(true, page);
    } else {
      console.error("tableData is not an array");
    }
  }, [tableData, primaryColumn, visibleColumns]);

  const initalsAysncData = (isIntial = false, page: any) => {
    try {
      getAysncData(page, searchValue, rowsPerPage).then((data: any) => {
        if (
          data &&
          data.tableData &&
          Array.isArray(data.tableData) &&
          data?.totalPages
        ) {
          setData(data.tableData);
          if (isIntial) {
            getColumns(data.tableData, visibleColumns);
            setTableDataLength(data.totalPages / rowsPerPage);
            setTotalPages(data.totalPages);
            setSortDescriptor({
              column: primaryColumn,
              direction: "ascending",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAsync) setTotalPages(Math.ceil(data.length / rowsPerPage));
  }, [data, rowsPerPage]);
  const handleSave = React.useCallback(() => {
    try {
      if (onSave && !isAsync) {
        let returnValue: any = [];
        if (
          (selectionMode == "multiple" || selectionMode == "single") &&
          selectedRows.size > 0
        ) {
          Array.from(selectedRows).forEach((item: any) => {
            if (item && item !== "all") returnValue.push(data[item]);
            else if (item && item === "all") returnValue = data;
          });
        } else {
          returnValue = data;
        }

        onSave(returnValue);
      }
    } catch (error) {
      console.error(error);
    }
  }, [data, onSave, selectedRows, selectionMode]);
  const handlePageChange = async (type: any) => {
    let newPage: any;
    if (type == "next") {
      newPage = (p: any) => {
        if (p < totalPages) return p + 1;
        return p;
      };
    }
    if (type == "prev") {
      newPage = (p: any) => {
        if (p > 1) return p - 1;
        return p;
      };
    }
    if (isAsync && getAysncData) {
      initalsAysncData(false, newPage(page));
    }
    setPage(newPage(page));
  };

  return (
    <TableDataContext.Provider
      value={{
        primaryColumn,
        data,
        setData,
        selectedRows,
        setSelectedRows,
        selectionMode,
        selectionBehavior,
        tableIndex,
        isAsync,
        onEdit,
        onDelete,
        onAdd,
        TotalColumns,
        editableColumns,
        addableColumns,
        isSkeleton,
      }}
    >
      {filterColmns &&
        filterColmns.length > 0 &&
        sortDescriptor &&
        totalPages ? (
        <div className="w-full h-screen flex flex-col items-center ">
          {/* <div className="w-full h-[8%] flex justify-center items-center ">
              <div className="w-[95%] h-full flex justify-between items-center pl-2">
                <div className="w-[60%] h-full bg-transparent rounded-md flex justify-start  ">
                  <div className="w-[100%] h-full bg-transparent gap-1 rounded-md flex flex-col items-center">
                    <div className="w-[100%] h-full bg-transparent">
                      <div className="grid grid-cols-12 gap-0.5 ">
                        <div className="col-span-3 flex justify-start items-center">
                          <div className="w-[100%]">
                            <span className="text-lg font-medium text-[#101828]">
                              {heading}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-3 flex justify-start items-center">
                          {length()}
                        </div>
                      </div>
                    </div>
                    <div className="w-[100%] h-full bg-transparent">
                      <div className="grid grid-cols-12 gap-0.5 ">
                        {descriptions(description)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[40%] h-full flex flex-row justify-end gap-[0.2rem] items-center">
                  <div className="w-[20%] flex justify-end items-center py-2">
                    <TorusButton
                      Children="Save"
                    //   width={"full"}
                      btncolor={"#FFFFFF"}
                      outlineColor="hover:ring-gray-200/50"
                      borderColor={"2px solid #D0D5DD"}
                      radius={"lg"}
                      color={"#000000"}
                      gap={"py-[0.2rem] px-[0.5rem]"}
                    //   height={"md"}
                      fontStyle={"text-sm font-medium text-[#344054]"}
                      startContent={<CiSaveUp1 size={22} color="#344054" />}
                      onPress={handleSave}
                    />
                  </div>
                  <div className="w-[20%] flex justify-end items-center py-2">
                    <TorusButton
                      Children="Import"
                    //   width={"full"}
                      btncolor={"#FFFFFF"}
                      outlineColor="hover:ring-gray-200/50"
                      borderColor={"2px solid #D0D5DD"}
                      radius={"lg"}
                      color={"#000000"}
                      gap={"py-[0.2rem] px-[0.5rem]"}
                    //   height={"md"}
                      fontStyle={"text-sm font-medium text-[#344054]"}
                      startContent={<ImportIcon />}
                    />
                  </div>
                  <div className="w-[25%] h-[100%] flex bg-transparent rounded-md  items-center">
                    <TorusDialog
                      key={"TableDelete"}
                      triggerElement={
                        <TorusButton
                          Children={`Add`}
                          size={"xs"}
                          btncolor={"#0736C4"}
                          outlineColor="hover:ring-[#0736C4]/50"
                          radius={"lg"}
                          color={"#ffffff"}
                          gap={"py-[0.2rem] px-[0.2rem]"}
                        //   height={"md"}
                          borderColor={"3px solid #0736C4"}
                          startContent={<PlusIcon />}
                          fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        />
                      }
                      classNames={{
                        dialogClassName: " flex  border-2 flex-col bg-white",
                      }}
                      title={"Add"}
                      message={"Edit"}
                      children={({ close }:any) => <AddAction close={close} />}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          <div
            className={`w-full  ${totalPages > 1 ? "h-[73%]" : "h-[75%]"
              } flex flex-col justify-between items-center`}
          >
            {/* <div className="w-[95%] flex items-center justify-center h-[8%]">
                <div className="w-[60%] flex  h-full bg-transparent rounded-md ">
                  <div className="w-[20%] h-full bg-white rounded-md pl-2">
                    <Tabs aria-label="aria tabs">
                      <TabList
                        aria-label="UnIdentified-Tabs"
                        className={"flex justify-between gap-0 bg-transparent"}
                      >
                        <Tab
                          aria-label="Aria-Tabs"
                          className={
                            "py-[0.2rem]  bg-white focus:outline-none focus:bg-[#F9FAFB] px-[0.5rem] rounded-l-md border-2 border-[#D0D5DD] border-r-transparent "
                          }
                          id="FoR"
                        >
                          <span className="text-black font-normal text-xs whitespace-nowrap">
                            view all
                          </span>
                        </Tab>
                        <Tab
                          aria-label="Aria-Tabs"
                          className={
                            "py-[0.2rem]  bg-white focus:outline-none focus:bg-[#F9FAFB] px-[0.5rem] border-2 border-[#D0D5DD]  "
                          }
                          id="MaR"
                        >
                          <span className="text-black font-normal text-xs">
                            Monitered
                          </span>
                        </Tab>
                        <Tab
                          aria-label="Aria-Tabs"
                          className={
                            "py-[0.2rem]  bg-white focus:outline-none focus:bg-[#F9FAFB] px-[0.5rem] border-2 border-[#D0D5DD] border-l-transparent rounded-r-md "
                          }
                          id="Emp"
                        >
                          <span className="text-black font-normal text-xs">
                            Text
                          </span>
                        </Tab>
                      </TabList>
                    </Tabs>
                  </div>
                </div>
                <div className="w-[40%] h-full flex flex-row justify-between gap-2 items-center">
                  <div className="w-[80%] flex justify-start items-center">
                    <TorusSearch
                      variant="bordered"
                      labelColor="text-[#000000]/50"
                      borderColor="border-[#000000]/20"
                      outlineColor="focus:ring-[#000000]/50"
                      placeholder="search"
                      onChange={handleSerach}
                      isDisabled={false}
                      radius="lg"
                      textColor="text-[#000000]"
                      bgColor="bg-[#FFFFFF]"
                      value={searchValue}
                      type="text"
                    />
                  </div>
                  <div className="w-[20%] h-[100%] flex bg-transparent rounded-md justify-end items-center">
                    <TorusDropDown
                      title={"Filter"}
                      selectionMode="multiple"
                      selected={columns}
                      setSelected={setColumns}
                      dynamicItems={TotalColumns.filter(
                        (col: any) => col?.name != primaryColumn
                      )}
                      btWidth={"full"}
                      btncolor={"#FFFFFF"}
                      btheight={"md"}
                      outlineColor="hover:ring-gray-200/50"
                      radius={"lg"}
                      color={"#000000"}
                      gap={"py-[0.2rem] px-[0.5rem]"}
                      borderColor={"2px solid #D0D5DD"}
                      startContent={<FilterIcon />}
                      fontStyle={"text-sm font-medium text-[#344054]"}
                    />
                  </div>
                </div>
              </div> */}
            <div
              className={`w-full h-full overflow-y-scroll mt-2 border-b-1 border-transparent `}
            >
              <Table
                aria-label="table"
                selectedKeys={selectedKeys}
                onSortChange={setSortDescriptor}
                sortDescriptor={sortDescriptor}
                onSelectionChange={setSelectedKeys}
                className={"w-full h-full "}
              >
                {isSkeleton ? (
                  <>
                    {children &&
                      typeof children === "function" &&
                      children({
                        selectedKeys,
                        sortedItems,
                        filterColmns,
                        primaryColumn,
                      })}
                  </>
                ) : (
                  <>
                    <TorusTableHeader
                      selectedKeys={selectedKeys}
                      columns={[
                        ...filterColmns,
                        isEditable && {
                          id: "Actions",
                          name: "Actions",
                          key: "Actions",
                          label: "Actions",
                          isRowHeader: false,
                        },
                      ]}
                    />

                    <TableBody
                      aria-label="table body"
                      renderEmptyState={() => (
                        <div className="text-center"> No Data </div>
                      )}
                    >
                      {sortedItems.map((item: any, index: number) => (
                        <>
                          <TorusRow
                            key={item[primaryColumn]}
                            item={item}
                            id={index}
                            index={item[primaryColumn]}
                            columns={[
                              ...filterColmns,
                              isEditable && {
                                id: "Actions",
                                name: "Actions",
                                key: "Actions",
                                label: "Actions",
                                isRowHeader: false,
                              },
                            ]}
                            selectedKeys={selectedKeys}
                            className={
                              "border-1 border-b-slate-800 border-t-transparent border-l-transparent border-r-transparent"
                            }
                          />
                        </>
                      ))}
                    </TableBody>
                  </>
                )}
              </Table>
            </div>
          </div>
          {totalPages > 1 ? (
            <div className="w-full h-[7%] flex items-center">
              <Pagination
                currentPage={page}
                setCurrentPage={setPage}
                totalPages={totalPages}
              />
            </div>
          ) : null}

          {/* <div className="flex flex-col items-center justify-center pl-2 w-[100%] h-[5%]">
              <div className="w-[95%] flex justify-between "> */}
          {/* <div className="w-[85%] flex justify-start">
                  <span className="text-sm font-medium text-[#344054]">
                    Page {page} of {totalPages}
                  </span>
                </div> */}

          {/* <div className="w-[15%] flex items-center justify-end gap-2"> */}
          {/* <TorusButton
                    Children={<FaArrowDown  color="white"/>}
                    size={"md"}
                    outlineColor="hover:ring-gray-200/50"
                    btncolor={"warning"}
                    borderColor={"2px solid #D0D5DD"}
                    fontStyle={"text-xs font-normal text-[#344054]"}
                    radius={"lg"}
                    gap={"py-[0.2rem] px-[0.5rem]"}
                    isIconOnly={true}
                  /> */}

          {/* <div className="w-[40%] flex justify-start">
                    <TorusButton
                      Children="Previous"
                      size={"md"}
                      btncolor={"#FFFFFF"}
                      outlineColor="hover:ring-gray-200/50"
                      borderColor={"2px solid #D0D5DD"}
                      fontStyle={"text-xs font-normal text-[#344054]"}
                      radius={"lg"}
                      gap={"py-[0.2rem] px-[0.5rem]"}
                      // startContent={<GiPreviousButton />}
                      onPress={() => handlePageChange("prev")}
                    />
                  </div> */}

          {/* <div className="w-[30%] flex justify-end">
                    <TorusButton
                      Children={"Next"}
                      btncolor={"#FFFFFF"}
                      outlineColor="hover:ring-gray-200/50"
                      borderColor={"2px solid #D0D5DD"}
                      fontStyle={"text-xs font-normal text-[#344054]"}
                      radius={"lg"}
                      gap={"py-[0.2rem] px-[0.5rem]"}
                      size={"md"}
                      // startContent={<GiPreviousButton />}
                      onPress={() => handlePageChange("next")}
                    />
                  </div> */}
          {/* </div> */}
          {/* </div>
            </div> */}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[80vh] dark:text-white">
          No Data available
        </div>
      )}
    </TableDataContext.Provider>
  );
}
export const TableCellActions = ({ id }: any) => {
  return (
    <div className=" w-full h-full flex flex-col items-center justify-center ">
      <div className="w-[100%] h-[50%] flex justify-center items-center ">
        <div className="w-[25%] h-[100%] flex justify-end items-center">
          <TorusDialog
            Header="      Do you want to delete this item"
            key={"TableDelete"}
            triggerElement={
              <TorusButton
                buttonClassName={"w-10 h-10 rounded-full"}
                Children={<DeleteIcon />}
                isIconOnly={true}
                btncolor={"bg-transparent"}
              />
            }
            classNames={{
              dialogClassName:
                " flex  border border-gray-300 dark: border-[#212121] rounded-lg flex-col bg-white",
            }}
            message={"Delete"}
          >
            {({ close }: any) => (
              <>
                <div className="p-4">
                  <Heading
                    aria-label="heading"
                    className="font-medium text-black "
                    slot="title"
                  >
                    Delete Item
                  </Heading>
                  <p className="mt-2">
                    This will permanently delete the selected item. Continue?
                  </p>
                  <DeleteAction id={id} close={close} />
                </div>
              </>
            )}
          </TorusDialog>
        </div>

        <div className="w-[25%] h-[100%] flex justify-start items-center">
          <TorusDialog
            key={"TableEdit"}
            triggerElement={
              <TorusButton
                buttonClassName={"w-10 h-10 rounded-full"}
                Children={<EditIcon />}
                isIconOnly={true}
                btncolor={"bg-#D0D5DD"}
              />
            }
            classNames={{
              dialogClassName:
                " flex  border-2 dark: border-[#212121]  flex-col bg-white",
            }}
            title={"Edit"}
            message={"Edit"}
          >
            {({ close }: any) => <EditAction id={id} close={close} />}
          </TorusDialog>
        </div>
      </div>
    </div>
  );
};
export const RenderTableChildren = ({ children }: any) => (
  <>
    {children && typeof children === "object" ? (
      <>
        {Array.isArray(children) ? (
          <div className=" flex flex-col gap-1">
            {children.map((item, index) => (
              <li className="text-sm font-medium" key={index}>
                <RenderTableChildren key={index}>{item}</RenderTableChildren>
              </li>
            ))}
          </div>
        ) : (
          <div className=" flex flex-col gap-1 ">
            {Object.keys(children).map((key) => (
              <div key={key} className=" flex gap-2 items-center justify-start">
                <h1>{key}:</h1>
                <RenderTableChildren key={key}>
                  {children[key]}
                </RenderTableChildren>
              </div>
            ))}
          </div>
        )}
      </>
    ) : (
      children
    )}
  </>
);

const EditAction = ({ id, close }: any) => {
  const { data, setData, primaryColumn, onEdit, isAsync, editableColumns } =
    React.useContext(TableDataContext);
  const [obj, setObj] = React.useState<null | any>(null);
  useEffect(() => {
    let orginalObj = data?.find((item: any) => item?.[primaryColumn] === id);
    let modifiedObj: any = {};
    Object.keys(orginalObj).forEach((key) => {
      if (key !== primaryColumn && editableColumns.includes(key)) {
        modifiedObj[key] = orginalObj[key];
      }
    });
    setObj(modifiedObj);
  }, [id, data]);

  const handleSave = () => {
    if (isAsync) onEdit(id, obj);
    setData((prev: any) => {
      return prev.map((item: any, index: number) => {
        if (item?.[primaryColumn] === id) {
          return { ...item, ...obj };
        }
        return item;
      });
    });
    close();
  };
  return (
    <div className="w-[300px] bg-white h-[400px] rounded-lg  border-none flex flex-col gap-3 p-2 items-start justify-between">
      <div className="w-full h-[350px] overflow-y-scroll scrollbar-hide p-2">
        {obj && <Cycle obj={obj} setObj={setObj} />}
      </div>
      <div className="w-full flex justify-center">
        <TorusButton
          buttonClassName={
            "bg-[#0736C4] w-[95%] h-[45px] border-none text-white"
          }
          Children={"Save"}
          onPress={handleSave}
        />
      </div>
    </div>
  );
};
const AddAction = ({ close }: any) => {
  const {
    data,
    setData,
    primaryColumn,
    onAdd,
    isAsync,
    TotalColumns,
    addableColumns,
  } = React.useContext(TableDataContext);
  const [obj, setObj] = useState<null | any>(null);

  useEffect(() => {
    let newObj: any = {};
    TotalColumns.forEach((item: any) => {
      if (item.key !== primaryColumn && addableColumns.includes(item?.key))
        newObj = { ...newObj, [item?.key]: "" };
    });
    setObj(newObj);
  }, []);

  const handleSave = () => {
    if (isAsync && onAdd) onAdd(obj);
    setData((prev: any) => {
      return [...prev, obj];
    });
    close();
  };
  return (
    <div className="w-[300px] bg-white h-[400px] rounded-lg  border-none flex flex-col gap-3 p-2 items-start justify-between">
      <div className="w-full h-[350px] overflow-y-scroll scrollbar-hide p-2">
        {obj && <Cycle obj={obj} setObj={setObj} />}
      </div>
      <div className="w-full flex justify-center">
        <TorusButton
          buttonClassName={
            "bg-[#0736C4] w-[95%] h-[45px] border-none text-white"
          }
          Children={"Add"}
          onPress={handleSave}
        />
      </div>
    </div>
  );
};

const DeleteAction = ({ id, close }: any) => {
  const { data, setData, primaryColumn, onDelete, isAsync } =
    useContext(TableDataContext);

  const handleDelete = () => {
    if (isAsync) onDelete(id);
    setData((prev: any) => {
      return prev.filter(
        (item: any, index: any) => item?.[primaryColumn] !== id
      );
    });
    close();
  };
  return (
    <div className="w-[400px] bg-white h-[100px] rounded-lg  border-none flex flex-row gap-3 items-center justify-end">
      <TorusButton
        buttonClassName={"bg-gray-200 w-[80px] h-[40px] text-black"}
        Children={"Cancel"}
        onPress={close}
      />
      <TorusButton
        buttonClassName={"bg-red-500 w-[80px] h-[40px] text-white"}
        Children={"Delete"}
        onPress={handleDelete}
      />
    </div>
  );
};

const Cycle = ({ obj, setObj }: any) => {
  console.log(obj, "obj");
  return (
    <>
      {obj && Array.isArray(obj) ? (
        obj?.map((ele, index) => (
          <>
            {ele && (
              <li>
                <Cycle
                  key={index}
                  obj={ele}
                  setObj={(newObj: any) =>
                    setObj(
                      obj && obj?.map((e, i) => (i === index ? newObj : e))
                    )
                  }
                />
              </li>
            )}
          </>
        ))
      ) : obj && typeof obj == "object" ? (
        Object.keys(obj).map((ele) => {
          if (typeof obj[ele] === "object")
            return (
              <>
                <p>{ele}:</p>
                <Cycle
                  key={ele}
                  obj={obj[ele]}
                  setObj={(newObj: any) => setObj({ ...obj, [ele]: newObj })}
                />
              </>
            );
          return (
            <TorusInput
              key={ele}
              variant="bordered"
              label={ele}
              labelColor="text-[#000000]/50"
              borderColor="[#000000]/50"
              outlineColor="focus:ring-[#000000]/50"
              placeholder=""
              isDisabled={false}
              onChange={(e: any) => setObj({ ...obj, [ele]: e })}
              radius="lg"
              width="xl"
              height="xl"
              textColor="text-[#000000]"
              bgColor="bg-[#FFFFFF]"
              value={obj[ele]}
              type="text"
            />
          );
        })
      ) : (
        <TorusInput
          variant="bordered"
          labelColor="text-[#000000]/50"
          borderColor="[#000000]/50"
          outlineColor="focus:ring-[#000000]/50"
          placeholder=""
          isDisabled={false}
          onChange={(e: any) => setObj(e)}
          radius="lg"
          width="xl"
          height="xl"
          textColor="text-[#000000]"
          bgColor="bg-[#FFFFFF]"
          value={obj != null ? obj : ""}
          type="text"
        />
      )}
    </>
  );
};
