"use client";
import _ from "lodash";
import React, { useMemo, useState } from "react";
import { Button, Input } from "react-aria-components";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { toast } from "react-toastify";

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

interface DynamicGroupMemberTableProps {
  data: OrgGrp[] | RoleGrp[] | PsGrp[];
  onUpdate: (updatedData: OrgGrp[] | RoleGrp[] | PsGrp[]) => void;
  assetType: "APPS" | "org" | "roles" | "ps";
  groupsPerPage?: number;
  groupFields: string[];
  memberFields: string[];
  headerFields: string[];
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
            className={`pagination-button text-[0.72vw] focus:outline-none dark:focus:bg-[#3063FF]/35 dark:text-[#FFFFFF] ${
              page === currentPage
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
          className={`pagination-button text-[0.72vw] focus:outline-none dark:text-[#FFFFFF] ${
            totalPages === currentPage
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

const DynamicGroupMemberTable: React.FC<DynamicGroupMemberTableProps> = ({
  data,
  onUpdate,
  assetType,
  groupsPerPage = 2,
  groupFields,
  memberFields,
  headerFields,
}) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [editingCell, setEditingCell] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const currentGroups = useMemo(() => {
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    return data.slice(indexOfFirstGroup, indexOfLastGroup);
  }, [data, currentPage, onUpdate]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / groupsPerPage);
  }, [data, currentPage, groupsPerPage]);

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

  const getMatchedPath = (index: string | number, key: string) => {
    const adjustedIndex =
      currentPage > 1
        ? Number(index) + (currentPage - 1) * groupsPerPage
        : index;

    const path = `${adjustedIndex}.${key}`;
    return path; // Return the path if you need to use it elsewhere
  };

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
      toast.error("Please select an application group");
      return;
    }
    if (groupKeys.size > 1) {
      toast.error("Please select only one application group");
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
    const updatedData: any = _.cloneDeep(data);
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
      toast.error("Please select an application or group");
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
        toast.warning(
          "Cannot delete last application , try deleting applicationGroup"
        );
        return;
      }
      _.remove(parentData, (obj) => obj === memberObj);
      _.set(updatedData, parentPath, parentData);
    });
    onUpdate(updatedData);
  };

  return (
    <div
      className="w-full flex flex-col gap-5"
      role="table"
      aria-label="Application Groups"
    >
      <div className="flex justify-between w-full px-2">
        <div>Application</div>
        <div className="flex gap-4">
          <Button
            className={`px-2 py-1 bg-blue-600 text-white rounded`}
            onPress={handleAddMember}
          >
            + New App
          </Button>
          <Button
            className={`px-2 py-1 bg-blue-600 text-white rounded`}
            onPress={() => handleAddNewEntity(undefined, data.length)}
          >
            + New Group
          </Button>
          <Button
            className={`px-2 py-1 bg-red-600 text-white rounded`}
            onPress={handleDeleteGroupAndMembers}
          >
            delete
          </Button>
        </div>
      </div>
      <div className="mx-2 mt-2">
        {/* Group Header */}
        <div
          className="flex w-[79.58vw] rounded-lg items-center p-1.5 bg-[#F4F5FA]"
          role="row"
        >
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
          {headerFields.map((field, index) => (
            <div
              key={index}
              className="w-[15.52vw] font-medium text-[0.72vw] leading-[1.85vh]"
              role="columnheader"
            >
              {field}
            </div>
          ))}
          {/* <div
            className="w-[10.52vw] font-medium text-[0.72vw] leading-[1.85vh]"
            role="columnheader"
          >
            Code
          </div>
          <div
            className="w-[15.46vw] ml-5 font-medium text-[0.72vw] leading-[1.85vh]"
            role="columnheader"
          >
            Name
          </div>
          <div
            className="w-[43.53vw] ml-5 font-medium text-[0.72vw] leading-[1.85vh]"
            role="columnheader"
          >
            Description
          </div> */}
        </div>
      </div>

      {currentGroups.map((group, i) => (
        <div
          key={i}
          className="rounded mx-2 w-[79.58vw] border border-black/15"
          role="rowgroup"
          // aria-labelledby={`group-${group.code}`}
        >
          {/* Group Row */}
          <div
            className="flex gap-5 items-center bg-[#F4F5FA] rounded-sm p-2 text-[0.62vw] leading-[1.77vh]"
            role="row"
          >
            <div className="w-10 ml-3" role="cell">
              <input
                type="checkbox"
                checked={
                  !!selectedItems[
                    `${getMatchedPath(i, "code").replace(".code", "")}`
                  ]
                }
                onChange={() =>
                  handleSelect(
                    `${getMatchedPath(i, "code").replace(".code", "")}`,
                    true
                  )
                }
                // aria-labelledby={`group-${group.code}`}
              />
            </div>

            {groupFields.map((field) => (
              <div
                key={field}
                className={`${
                  field === "code"
                    ? "w-[10.52vw]"
                    : field === "name"
                    ? "w-[15.46vw]"
                    : "w-[43.53vw]"
                } p-2 bg-white`}
                role="cell"
                onDoubleClick={() =>
                  handleSetEditingCell(getMatchedPath(i, field))
                }
              >
                {(editingCell && getMatchedPath(i, field) === editingCell) ||
                !(group as any)[field] ? (
                  <Input
                    type="text"
                    defaultValue={(group as any)[field]}
                    onFocus={() =>
                      handleSetEditingCell(getMatchedPath(i, field))
                    }
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        handleValueChange(
                          getMatchedPath(i, field),
                          e.target.value
                        );
                      }
                    }}
                    onBlur={(e) => {
                      handleValueChange(
                        getMatchedPath(i, field),
                        e.target.value
                      );
                    }}
                    autoFocus
                    className={"outline-none"}
                  />
                ) : (
                  (group as any)[field]
                )}
              </div>
            ))}
          </div>

          {/* App Rows */}
          {(group[assetType] as any).map((app: any, memberIndex: number) => {
            const parentPath = getMatchedPath(i, assetType);
            return (
              <div
                key={memberIndex}
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
                    // aria-labelledby={`app-${group.code}-${app.code}`}
                  />
                </div>

                {memberFields.map((field) => (
                  <div
                    key={field}
                    className={`${
                      field === "code"
                        ? "w-[10.52vw]"
                        : field === "name"
                        ? "w-[15.46vw]"
                        : "w-[43.53vw]"
                    } p-2 bg-[#F4F5FA]`}
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
                            );
                          }
                        }}
                        onBlur={(e) => {
                          handleValueChange(
                            `${parentPath}.${memberIndex}.${field}`,
                            e.target.value
                          );
                        }}
                        autoFocus
                        className={"bg-[#F4F5FA] outline-none"}
                      />
                    ) : (
                      (app as any)[field]
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DynamicGroupMemberTable;