"use client";
import _ from "lodash";
import React, { useMemo, useState } from "react";
import { Button, Input } from "react-aria-components";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { FilterIcon, PlusIcon, SearchIcon, TrashIcon } from "../../constants/svgApplications";
import DropDown from "../multiDropdownnew";
import { Pagination } from "../torusComponents/torusTable";
import TorusToast from "../torusComponents/torusToast";

interface App {
  code: string;
  name: string;
  description: string;
  icon: string;
}

interface Group {
  code: string;
  name: string;
  description: string;
  icon: string;
  APPS: App[];
}

interface AppGroupTableProps {
  data: Group[];
  onUpdate: (updatedData: Group[]) => void;
  groupsPerPage?: number;
}

const AppGroupTable: React.FC<AppGroupTableProps> = ({
  data,
  onUpdate,
  groupsPerPage = 2,
}) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [editingCell, setEditingCell] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [wordLength, setWordLength] = useState(0);

  const filteredData = Object.entries(data)
    .filter(([key, value]) => {
      if (typeof value === "string") {
        return (value as string).toLowerCase().includes(searchTerm.toLowerCase());
      } else if (Array.isArray(value)) {
        return value.some((role) => {
          return Object.values(role).some((val) => {
            return (
              typeof val === "string" &&
              val.toLowerCase().includes(searchTerm.toLowerCase())
            );
          });
        });
      } else {
        return Object.values(value).some((val) => {
          if (typeof val === "string") {
            return val.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (Array.isArray(val)) {
            return val.some((role) => {
              return Object.values(role).some((v) => {
                return (
                  typeof v === "string" &&
                  v.toLowerCase().includes(searchTerm.toLowerCase())
                );
              });
            });
          }
        });
      }
    })
    .map(([key, value], index) => ({ ...value, originalIndex: key }));

  const currentGroups = useMemo(() => {
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;

    return filteredData.slice(indexOfFirstGroup, indexOfLastGroup);
  }, [data, filteredData, currentPage, onUpdate, searchTerm]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / groupsPerPage);
  }, [data, filteredData, currentPage, groupsPerPage]);

  const handleSelect = (path: string, isParent: boolean = false) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };

      if (isParent) {
        const groupData = _.get(data, path);
        const isParentSelected = !!updatedItems[path];

        if (isParentSelected) {
          // If the parent is selected, remove the parent and all its children
          delete updatedItems[path];
          Object.entries(groupData).forEach(([key, item]: any) => {
            if (typeof item === "object" && Array.isArray(item)) {
              item.forEach((_, index) => {
                delete updatedItems[`${path}.${key}.${index}`];
              });
            }
          });
        } else {
          // If the parent is not selected, add the parent and all its children
          updatedItems[path] = true;
          Object.entries(groupData).forEach(([key, item]: any) => {
            if (typeof item === "object" && Array.isArray(item)) {
              item.forEach((_, index) => {
                updatedItems[`${path}.${key}.${index}`] = true;
              });
            }
          });
        }
      } else {
        // Toggle the selection for individual items
        updatedItems[path] = !updatedItems[path];
      }

      return updatedItems;
    });
  };

  const transformObject: any = (obj: any) => {
    if (typeof obj === "string") {
      return "";
    }

    if (Array.isArray(obj)) {
      return [transformObject(obj[0])];
    }

    if (typeof obj === "object" && obj !== null) {
      const newObj: any = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = transformObject(obj[key]);
        }
      }
      return newObj;
    }
    return obj; // Return the value if it's not an object, array, or string
  };

  const handlejs = (newContent: any, path: any) => {
    if (path) {
      const js = structuredClone(data);
      _.set(js as any, path, newContent);
      onUpdate(js);
    }
  };

  const handleAddNewEntity = (path?: string, length?: number) => {
    var currentData: any[] = data;
    if (path) {
      currentData = _.get(data, path);
    }
    const transformedData = transformObject(currentData[0]);
    const isExists = findPath(currentData, transformedData);
    if (isExists) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "warning",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Warning",
          text: `Already ${path ? "member" : "group"} created`,
          closeButton: false,
        } as any
      )
      return
    }
    if (path) {
      handlejs(transformedData, `${path}.${length}`);
    } else {
      handlejs(transformedData, `${length}`);
    }
  };

  const handleValueChange = (path: string, value: string) => {
    handlejs(value, path);
    setEditingCell(null);
  };

  // const getMatchedPath = (index: string | number, key: string) => {
  //   const adjustedIndex =
  //     currentPage > 1
  //       ? Number(index) + (currentPage - 1) * groupsPerPage
  //       : index;

  //   const path = `${adjustedIndex}.${key}`;
  //   return path; // Return the path if you need to use it elsewhere
  // };

  const handleSetEditingCell = (path: string) => {
    setEditingCell(path);
  };

  const handleAddMember = () => {
    const groupKeys = new Set();
    Object.entries(selectedItems).forEach(([key, value]) => {
      if (value && key.split(".").length === 1) {
        groupKeys.add(key);
      }
    });
    if (groupKeys.size == 0) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Please select an application group`,
          closeButton: false,
        } as any
      )
      return;
    }
    if (groupKeys.size > 1) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Please select only one application group`,
          closeButton: false,
        } as any
      )
      return;
    }

    const groupKey = Array.from(groupKeys)[0];
    const group = _.get(data, `${groupKey}`);
    Object.entries(group).forEach(([key, value]) => {
      if (typeof value === "object" && Array.isArray(value)) {
        handleAddNewEntity(`${groupKey}.${key}`, value.length);
      }
    });
  };

  const handleDeleteGroupAndMembers = () => {
    const updatedData = _.cloneDeep(data);
    const groupKeys = new Set();
    const memberKeys = new Set();
    Object.entries(selectedItems).forEach(([key, value]) => {
      if (value && key.split(".").length === 1) {
        groupKeys.add(key);
      } else if (value) {
        memberKeys.add(key);
      }
    });

    if (groupKeys.size == 0 && memberKeys.size == 0) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Please select an application or group`,
          closeButton: false,
        } as any
      )
      return;
    }
    groupKeys.forEach((key) => {
      const groupObj = _.get(updatedData, `${key}`);
      _.remove(updatedData, (obj) => obj === groupObj);
    });

    memberKeys.forEach((key) => {
      if (groupKeys.has((key as string).split(".")[0])) return;
      const parentPath = (key as string).split(".").slice(0, -1).join(".");
      const parentData = _.get(updatedData, parentPath);
      const memberObj = _.get(updatedData, `${key}`);
      if (!parentData) return;
      if (parentData.length == 1) {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "warning",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Warning",
            text: `Cannot delete last application , try deleting applicationGroup`,
            closeButton: false,
          } as any
        )
        return;
      }
      _.remove(parentData, (obj) => obj === memberObj);
      _.set(updatedData, parentPath, parentData);
    });
    onUpdate(updatedData);
    toast(
      <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
      {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        title: "Deleted Successfully",
        text: `Selected data deleted successfully`,
        closeButton: false,
      } as any
    )
  };

  const handleSelectAllApps = () => {
    const allSelected =
      Object.keys(selectedItems).length ===
      data.reduce((count, group) => count + group.APPS.length + 1, 0);

    const newSelectedItems: Record<string, boolean> = {};

    if (!allSelected) {
      data.forEach((group) => {
        newSelectedItems[group.code] = true;
        group.APPS.forEach((app) => {
          newSelectedItems[`${group.code}-${app.code}`] = true;
        });
      });
    }

    setSelectedItems(newSelectedItems);
  };

  function findPath(obj: any, searchValue: any, path = "") {
    if (typeof obj === "object") {
      for (const key in obj) {
        if (JSON.stringify(obj[key]) === JSON.stringify(searchValue)) {
          return path + key;
        } else if (Array.isArray(obj[key])) {
          for (let i = 0; i < obj[key].length; i++) {
            const result: any = findPath(
              obj[key][i],
              searchValue,
              path + key + "." + i + "."
            );
            if (result) {
              return result;
            }
          }
        } else if (typeof obj[key] === "object") {
          const result: any = findPath(obj[key], searchValue, path + key + ".");
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }

  return (
    <div
      className="w-full flex flex-col gap-5"
      role="table"
      aria-label="Application Groups"
    >
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex flex-col gap-[0.58vw]">
          <div className="text-[1.25vw] leading-[1.85vh] font-semibold">
            Application
          </div>
          <p className="text-[0.83vw] leading-[1.85vh] text-black/50">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="flex items-center gap-[0.58vw] w-[48.9vw]">
          <div className="relative items-center w-[23.75vw] h-[4vh]">
            <span className="absolute inset-y-0 left-0 flex p-[0.58vw] h-[2.18vw] w-[2.18vw] ">
              <SearchIcon height="0.83vw" width="0.83vw" />
            </span>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className={`w-full bg-[#F4F5FA] text-dark p-[0.29vw] text-[0.72vw] h-[4vh] focus:outline-none focus:border-blue-400 dark:focus:border-blue-400 border pl-[1.76vw] font-medium rounded-md dark:border-[#212121] dark:text-white`}
            />
          </div>
          <DropDown
            classNames={{
              popover: "w-[8vw] h-[25vh] overflow-y-auto",
              triggerButton:
                "w-[5vw] items-center h-[3.98vh] border border-black/15 rounded-lg dark:border-[#212121] bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-[#FFFFFF]",
            }}
            triggerButton={
              <div className="flex text-[0.72vw] pt-[0.29vw] pl-[0.29vw] font-medium gap-[0.29vw] dark:bg-[#0F0F0F] dark:text-[#FFFFFF] ">
                <FilterIcon />
                Filter
              </div>
            }
            items={[]}
            selectedKeys={visibleColumns}
            setSelectedKeys={setVisibleColumns}
            multiple
            displaySelectedKeys={false}
          />
          <Button
            className={`flex gap-[0.29vw] px-3 py-1.5 items-center text-nowrap text-[0.72vw] leading-[2.22vh] bg-[#0736C4] text-white rounded-lg`}
            onPress={() => handleAddNewEntity(undefined, data.length)}
          >
            <PlusIcon fill="white" width={"1.04vw"} height={"1.04vw"} /> New Group
          </Button>
          <Button
            className={`flex gap-[0.29vw] px-3 py-1.5 items-center text-nowrap text-[0.72vw] leading-[2.22vh] bg-[#0736C4] text-white rounded-lg`}
            onPress={handleAddMember}
          ><PlusIcon fill="white" width={"1.04vw"} height={"1.04vw"} />
            New App
          </Button>
          <Button
            className={`flex gap-[0.29vw] px-3 py-1.5 text-[0.72vw] leading-[2.22vh] items-center bg-[#F44336] text-white rounded-lg`}
            onPress={handleDeleteGroupAndMembers}
          >
            <TrashIcon fill="white" />delete
          </Button>
        </div>
      </div>
      <div className="mx-2 mt-2">
        {/* Group Header */}
        <div className="flex w-[79.58vw] rounded-lg items-center p-2 bg-[#F4F5FA]" role="row">
          <div className="w-16 ml-4" role="columnheader">
            {/* <input
              type="checkbox"
              onChange={handleSelectAllApps}
              checked={
                Object.keys(selectedItems).length ===
                data.reduce((count, group) => count + group.APPS.length + 1, 0)
              }
            /> */}
          </div>
          <div className="w-[10.52vw] font-medium text-[0.72vw] leading-[1.85vh]" role="columnheader">
            Code
          </div>
          <div className="w-[15.46vw] ml-5 font-medium text-[0.72vw] leading-[1.85vh]" role="columnheader">
            Name
          </div>
          <div className="w-[43.53vw] ml-5 font-medium text-[0.72vw] leading-[1.85vh]" role="columnheader">
            Description
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[1.17vw] h-[52.25vh] pb-[0.58vw] overflow-y-auto">
        {currentGroups.map((group, i) => (
          <div
            key={group.code}
            className="rounded mx-2 w-[79.58vw] border border-black/15"
            role="rowgroup"
            aria-labelledby={`group-${group.code}`}
          >
            {/* Group Row */}
            <div
              className="flex gap-5 items-center bg-[#F4F5FA] rounded-sm p-2 text-[0.62vw] leading-[1.77vh]"
              role="row"
            >
              <div className="w-10 ml-3" role="cell">
                <input
                  type="checkbox"
                  checked={!!selectedItems[`${group.originalIndex}`]}
                  onChange={() => handleSelect(`${group.originalIndex}`, true)}
                  aria-labelledby={`group-${group.code}`}
                />
              </div>

              {["code", "name", "description"].map((field) => (
                <div
                  key={field}
                  className={`${field === "code" ? "w-[10.52vw]" : field === "name" ? "w-[15.46vw]" : "w-[43.53vw]"} p-2 bg-white`}
                  role="cell"
                  onDoubleClick={() =>
                    handleSetEditingCell(`${group.originalIndex}.${field}`)
                  }
                >
                  {(editingCell && editingCell == `${group.originalIndex}.${field}`) ||
                    !(group as any)[field] ? (
                    <Input
                      type="text"
                      defaultValue={(group as any)[field]}
                      onFocus={() =>
                        handleSetEditingCell(`${group.originalIndex}.${field}`)
                      }
                      onKeyDown={(e: any) => {
                        if (e.key === "Enter") {
                          handleValueChange(
                            `${group.originalIndex}.${field}`,
                            e.target.value
                          );
                        }
                      }}
                      onBlur={(e) => {
                        handleValueChange(
                          `${group.originalIndex}.${field}`,
                          e.target.value
                        );
                      }}
                      className={"outline-none"}
                    />
                  ) : (
                    (group as any)[field]
                  )}
                </div>
              ))}
            </div>

            {/* App Rows */}
            {group.APPS.map((app, memberIndex) => {
              const parentPath = `${group.originalIndex}.APPS`;
              return (
                <div
                  key={app.code}
                  className="flex w-full items-center gap-5 p-2 bg-white text-[0.62vw] leading-[1.77vh]"
                  role="row"
                >
                  <div className="w-10 ml-3" role="cell">
                    <input
                      type="checkbox"
                      checked={!!selectedItems[`${parentPath}.${memberIndex}`]}
                      onChange={() =>
                        handleSelect(`${parentPath}.${memberIndex}`)
                      }
                      aria-labelledby={`app-${group.code}-${app.code}`}
                    />
                  </div>

                  {["code", "name", "description"].map((field) => (
                    <div
                      key={field}
                      className={`${field === "code" ? "w-[10.52vw]" : field === "name" ? "w-[15.46vw]" : "w-[43.53vw]"} p-2 bg-[#F4F5FA]`}
                      role="cell"
                      onDoubleClick={() =>
                        handleSetEditingCell(
                          `${parentPath}.${memberIndex}.${field}`
                        )
                      }
                    >
                      {(editingCell &&
                        editingCell == `${parentPath}.${memberIndex}.${field}`) ||
                        !(app as any)[field] ? (
                        <Input
                          type="text"
                          defaultValue={(app as any)[field]}
                          onFocus={() =>
                            handleSetEditingCell(
                              `${parentPath}.${memberIndex}.${field}`
                            )
                          }
                          onKeyDown={(e: any) => {
                            if (e.key === "Enter") {
                              handleValueChange(
                                `${parentPath}.${memberIndex}.${field}`,
                                e.target.value
                              )
                            }
                          }}
                          onBlur={(e) => {
                            handleValueChange(
                              `${parentPath}.${memberIndex}.${field}`,
                              e.target.value
                            );
                          }}
                          className={"bg-[#F4F5FA] outline-none"}
                        />
                      ) : (
                        (app as any)[field]
                      )}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AppGroupTable;