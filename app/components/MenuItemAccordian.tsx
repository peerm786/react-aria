"use client";
import React, { useEffect, useState } from "react";
import {
  Button as RACButton,
  FieldError,
  Input,
  Label,
  Text,
  TextField,
  Button,
} from "react-aria-components";
import {
  DeleteIcon,
  DownArrow,
  PlusIcon,
  SixDotsSvg,
  UpArrow,
} from "../constants/svgApplications";
import { motion, AnimatePresence } from "framer-motion";
import { TreeNode, menuItems } from "../constants/MenuItemTree";
import _ from "lodash";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { getCookie } from "../../lib/utils/cookiemgmt";

type HandleUpdateJsonType = (
  path: string,
  newContent: any,
  isDropContent?: boolean
) => void;

type HandleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  path: string
) => void;

type HandleDropNode = (
  e: React.DragEvent<HTMLDivElement>,
  path: string
) => void;

type handleDeleteKeys = (path: string, fab: string) => void;

type handleDeleteMenuGrp = (path: string) => void;

type MenuType = "group" | "item";

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  path: string;
  handleUpdateJson: HandleUpdateJsonType;
  handleDropNode: HandleDropNode;
  handleDragStartOfNode: HandleDragStart;
  handleDeleteKeys: handleDeleteKeys;
  handleDeleteMenuGrp: handleDeleteMenuGrp;
}

interface TreeProps {
  data: TreeNode[];
  setData: (data: TreeNode[]) => void;
}

const RenderAccordian: React.FC<TreeNodeProps> = ({
  node,
  level,
  path,
  handleUpdateJson,
  handleDragStartOfNode,
  handleDropNode,
  handleDeleteKeys,
  handleDeleteMenuGrp,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isInput, setInput] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, path: string) => {
    const content = e.dataTransfer.getData("key");
    if (content) {
      handleUpdateJson(`${path}.keys`, JSON.parse(content), true);
    } else {
      handleDropNode(e, path);
    }
  };

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    path: string
  ) => {
    if (e.target?.value) {
      handleUpdateJson(`${path}.title`, e.target.value);
      setInput(false);
    }
  };

  return (
    <div>
      <div
        className={`ml-4 mt-2 border rounded`}
        draggable
        onDragStart={(e) => handleDragStartOfNode(e, path)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, path)}
      >
        <div
          className={`cursor-pointer flex items-center w-full focus:outline-gray-400 group relative ${
            node.type == "group" ? "" : "flex-col"
          } p-1 rounded`}
        >
          <div className="flex w-full h-full items-center">
            <RACButton aria-label="dd" className="mr-2 focus:outline-none">
              <SixDotsSvg fill={getCookie("isDarkMode") ? "white" : "black"} />
            </RACButton>
            {isInput ? (
              <Input
                defaultValue={node.title}
                className={`border mr-2 w-full focus:outline-none dark:text-white dark:bg-white focus:border-blue-300 rounded-lg p-1`}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleChangeTitle(e, path) : null
                }
                onBlur={(e) => handleChangeTitle(e, path)}
              />
            ) : (
              <span
              className="text-sm"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setInput(!isInput);
                }}
              >
                {node.title}
              </span>
            )}
            <RACButton
              onPress={() => handleDeleteMenuGrp(`${path}`)}
              className="ml-auto focus:outline-none h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <DeleteIcon />
            </RACButton>
            <RACButton
              className="ml-auto p-2 transition-all duration-300 ease-in-out focus:outline-none dark:bg-[#161616] dark:text-white"
              onPress={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <UpArrow fill={getCookie("isDarkMode") ? "white" : "black"} />
              ) : (
                <DownArrow fill={getCookie("isDarkMode") ? "white" : "black"} />
              )}
            </RACButton>
          </div>
          <AnimatePresence>
            {expanded && node.type == "item" && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {["df", "uf", "pf", "sf"].map((fab, id) => (
                  <TextField
                    className="m-2 relative dark:bg-[#161616] dark:text-white focus:outline-none"
                    key={id}
                  >
                    <Label />
                    <Input
                      onDragOver={(e) => e.preventDefault()}
                      value={node.keys ? node.keys[fab] : ""}
                      className={
                        "bg-[#F4F5FA]  p-2 focus:outline-blue-500 w-full rounded-lg pr-8 dark:bg-[#161616] dark:text-white"
                      }
                      name={fab}
                      placeholder={fab}
                    />
                    {node.keys[fab] ? (
                      <Button
                        onPress={() => handleDeleteKeys(`${path}.keys`, fab)}
                        className="absolute right-2 top-3 focus:outline-none"
                      >
                        <DeleteIcon />
                      </Button>
                    ) : null}
                    <Text slot="description" />
                    <FieldError />
                  </TextField>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {expanded && node.items && node.type == "group" && (
          <motion.div
            className={`overflow-hidden dark:bg-[#161616] dark:text-white`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {node.items.map((child, index) => (
              <div
                key={child.id}
                className="ml-4 mt-2 last:mb-2 dark:bg-[#161616] dark:text-white"
              >
                <RenderAccordian
                  key={child.id}
                  node={child}
                  level={level + 1}
                  path={`${path}.items.${index}`}
                  handleUpdateJson={handleUpdateJson}
                  handleDragStartOfNode={handleDragStartOfNode}
                  handleDropNode={handleDropNode}
                  handleDeleteKeys={handleDeleteKeys}
                  handleDeleteMenuGrp={handleDeleteMenuGrp}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuItemAccordian: React.FC<TreeProps> = ({ data, setData }) => {
  const [menuGroups, setMenuGroups] = useState<TreeNode[]>([]);
  const [isInput, setInput] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setMenuGroups(data);
    } else {
      setMenuGroups(menuItems);
    }
  }, [data]);

  useEffect(() => {
    setData(menuGroups);
  }, [menuGroups]);

  const handleUpdateJson: HandleUpdateJsonType = (
    path: string,
    newContent: any,
    isDropContent: boolean = false
  ) => {
    const js = structuredClone(menuGroups);
    if (isDropContent) {
      const getExistingContent = _.get(js, path);
      _.set(js, path, { ...getExistingContent, ...newContent });
      setMenuGroups(js);
    } else {
      _.set(js, path, newContent);
      setMenuGroups(js);
    }
  };

  const handleAddMenuGrp = (type: MenuType, close: () => void) => {
    if (type == "group") {
      const newMenuGrp: TreeNode = {
        id: `${menuGroups.length + 1}`,
        title: `Menu Item ${menuGroups.length + 1}`,
        sortOrder: `${menuGroups.length + 1}`,
        type: "group",
        items: [],
      };
      setMenuGroups((prev) => [...prev, newMenuGrp]);
      close();
    } else {
      const newMenuGrp: TreeNode = {
        id: `${menuGroups.length + 1}`,
        title: `Menu Item ${menuGroups.length + 1}`,
        sortOrder: `${menuGroups.length + 1}`,
        type: "item",
        keys: {},
      };
      setMenuGroups((prev) => [...prev, newMenuGrp]);
      close();
    }
  };

  const handleNewMenuItem = (id: number, type: MenuType, close: () => void) => {
    const val: TreeNode[] | any = _.get(menuGroups, `${id}.items`);
    var newMenuItem: TreeNode;
    if (type == "group") {
      newMenuItem = {
        id: `${id + 1}-${val.length + 1}`,
        title: `Menu Grp ${id + 1}-${val.length + 1}`,
        sortOrder: `${val.length + 1}`,
        type: "group",
        items: [],
      };
    } else {
      newMenuItem = {
        id: `${id + 1}-${val.length + 1}`,
        title: `Menu Item ${id + 1}-${val.length + 1}`,
        sortOrder: `${val.length + 1}`,
        type: "item",
        items: [],
        keys: {},
      };
    }
    val.push(newMenuItem);
    handleUpdateJson(`${id}.items`, val);
    close();
  };

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    path: string
  ) => {
    if (e.target.value) {
      handleUpdateJson(`${path}.title`, e.target.value);
      setInput(false);
    }
  };

  const handleDragStartOfNode: HandleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    path: string
  ) => {
    e.dataTransfer.setData("pathOfSrcNode", path);
  };

  const handleDropNode: HandleDropNode = (
    e: React.DragEvent<HTMLDivElement>,
    pathOfTargetNode: string
  ) => {
    const pathOfSrcNode = e.dataTransfer.getData("pathOfSrcNode");
    const srcNode = _.get(menuGroups, pathOfSrcNode);
    const targetNode = _.get(menuGroups, pathOfTargetNode);

    //Code to sort node from within the same group at the Nav level working fine
    if (
      pathOfSrcNode.split(".").length == 1 &&
      pathOfTargetNode.split(".").length == 1
    ) {
      const js = structuredClone(menuGroups);
      _.update(js, pathOfSrcNode, () => targetNode);
      _.update(js, pathOfTargetNode, () => srcNode);
      const updatedSortOrder = js.map((node, index) => ({
        ...node,
        sortOrder: `${index + 1}`,
      }));
      setMenuGroups(updatedSortOrder);
      return;
    }

    const parentPathOfSrcNode = pathOfSrcNode.split(".").slice(0, -1).join(".");
    const indexToModify = parseInt(
      pathOfSrcNode.split(".")[pathOfSrcNode.split(".").length - 1]
    );
    const parentPathOfTargetNode = pathOfTargetNode
      .split(".")
      .slice(0, -1)
      .join(".");


      //Code to sort node from within the same group working finely
    if (parentPathOfSrcNode == parentPathOfTargetNode) {
      const js = structuredClone(menuGroups);
      _.update(js, pathOfSrcNode, () => targetNode);
      _.update(js, pathOfTargetNode, () => srcNode);
      const updatedParentNode = _.get(js, parentPathOfSrcNode);
      const updatedSortOrder = updatedParentNode.map(
        (node: TreeNode, index: number) => ({
          ...node,
          sortOrder: `${index + 1}`,
        })
      );
      handleUpdateJson(parentPathOfSrcNode, updatedSortOrder);
      return;
    }

    //Code To Drop nodes from any group to any other group working finely
    if (pathOfSrcNode !== pathOfTargetNode && targetNode.type == "group") {
      const js = structuredClone(menuGroups);

      if(!parentPathOfSrcNode){
        const srcNode =js.splice(indexToModify, 1)[0];
        targetNode.items.push({
          ...srcNode,
          sortOrder: `${targetNode.items.length + 1}`,
        })
        const updatedMainGroup = js.map((node: TreeNode, index: number) => ({
          ...node,
          sortOrder: `${index + 1}`,
        }))
        _.set(updatedMainGroup , pathOfTargetNode , targetNode);
        setMenuGroups(updatedMainGroup);
        return
      }


      const parentOfSrcNode = _.get(js, parentPathOfSrcNode);
      
      // Remove the node from the source group
      const srcNode = parentOfSrcNode.splice(indexToModify, 1)[0];
    
      // Update the sort order of the source group
      const sortedItemsOfSrcNode = parentOfSrcNode.map((node: TreeNode, index: number) => ({
        ...node,
        sortOrder: `${index + 1}`,
      }));
    
      // Add the node to the target group
      targetNode.items.push({
        ...srcNode,
        sortOrder: `${targetNode.items.length + 1}`,
      });
    
      // Update the sort order of the target group
      const sortedItemsOfTargetNode = targetNode.items.map((node: TreeNode, index: number) => ({
        ...node,
        sortOrder: `${index + 1}`,
      }));
        
       // Update the source group and target group in the state
       _.set(js, parentPathOfSrcNode, sortedItemsOfSrcNode);
      _.set(js , pathOfTargetNode, {
        ...targetNode,
        items: sortedItemsOfTargetNode,
      });
      setMenuGroups(js);
    
    } else {
      alert("Can't drop here");
    }
    
  };
  console.log(menuGroups, "menuGroups");

  const handleDeleteKeys = (path: string, fab: string) => {
    const js = structuredClone(menuGroups);
    const data: any = _.get(js, path);
    delete data[fab];
    handleUpdateJson(path, data);
  };

  const handleDeleteMenuGrp = (path: string, isCalledfromNav?: boolean) => {
    const js = structuredClone(menuGroups);
    if (isCalledfromNav) {
      const indexToDelete = parseInt(path);
      js.splice(indexToDelete, 1);
      setMenuGroups(js);
    } else {
      const parentPath = path.split(".").slice(0, -1).join(".");
      const indexToDelete = parseInt(
        path.split(".")[path.split(".").length - 1]
      );
      const parentData: any = _.get(js, parentPath);
      parentData.splice(indexToDelete, 1);
      handleUpdateJson(parentPath, parentData);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div className="flex w-full bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white  p-2 rounded-xl gap-2">
          <div className="flex w-[95%] justify-around gap-2 overflow-x-auto">
            {menuGroups.map((node: TreeNode, id: number) => (
              <div
                draggable
                onDragStart={(e) => handleDragStartOfNode(e, `${id}`)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropNode(e, `${id}`)}
                key={id}
                className="flex p-1 items-center gap-2 border rounded w-full bg-white dark:bg-[#161616] dark:border-[#212121] dark:text-white group relative"
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                <SixDotsSvg
                  fill={getCookie("isDarkMode") ? "white" : "black"}
                />
                {isInput ? (
                  <Input
                    defaultValue={node.title}
                    className={`border mr-2 w-full focus:outline-none dark:bg-[#161616] dark:border-[#212121] dark:text-white focus:border-blue-300 rounded-lg p-1`}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? handleChangeTitle(e, id.toString())
                        : null
                    }
                    onBlur={(e) => handleChangeTitle(e, id.toString())}
                  />
                ) : (
                  <span
                  className="text-sm"
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setInput(!isInput);
                    }}
                  >
                    {node.title}
                  </span>
                )}
                <RACButton
                  onPress={() => handleDeleteMenuGrp(`${id}`, true)}
                  className="ml-auto mr-2 focus:outline-none h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <DeleteIcon />
                </RACButton>
              </div>
            ))}
          </div>
          <div className="w-[4%] flex justify-center">
            <DialogTrigger>
              <RACButton
                className={`px-2 items-center flex bg-white dark:bg-[#161616] dark:text-white rounded focus:outline-blue-300`}
              >
                <PlusIcon fill={getCookie("isDarkMode") ? "white" : "black"} />
              </RACButton>
              <Popover placement="left">
                <Dialog className="border bg-white dark:bg-[#161616] dark:text-white dark:border-[#212121] focus:outline-none rounded-lg">
                  {({ close }) => (
                    <div className="flex flex-col px-5 py-2 gap-2 dark:bg-[#161616] dark:text-white">
                      <RACButton
                        onPress={() => handleAddMenuGrp("group", close)}
                        className={
                          "focus:outline-blue-300 p-1 dark:bg-[#161616] dark:text-white"
                        }
                      >
                        MenuGroup
                      </RACButton>
                      <RACButton
                        onPress={() => handleAddMenuGrp("item", close)}
                        className={
                          "focus:outline-blue-300 p-1 dark:bg-[#161616] dark:text-white"
                        }
                      >
                        MenuItem
                      </RACButton>
                    </div>
                  )}
                </Dialog>
              </Popover>
            </DialogTrigger>
          </div>
        </div>

        <div>
          <div className="flex w-full justify-around h-[70vh] overflow-y-auto dark:bg-[#161616] dark:text-white">
            <div className="flex w-[97%] justify-around gap-4 mr-4 dark:bg-[#161616] dark:text-white">
              {menuGroups.map((node: TreeNode, id: number) => {
                if (node.type == "group") {
                  return (
                    <div className="w-full" key={id}>
                      {node.items?.map((subNode, index) => (
                        <div className="w-full" key={index}>
                          <RenderAccordian
                            node={subNode}
                            level={0}
                            path={`${id}.items.${index}`}
                            handleUpdateJson={handleUpdateJson}
                            handleDropNode={handleDropNode}
                            handleDragStartOfNode={handleDragStartOfNode}
                            handleDeleteKeys={handleDeleteKeys}
                            handleDeleteMenuGrp={handleDeleteMenuGrp}
                          />
                        </div>
                      ))}
                      <DialogTrigger>
                        <RACButton
                          className={`w-[92%] flex items-center justify-center
                           mt-2.5 py-2 ml-4 rounded-lg border-2 border-dashed
                            border-[#d9d9d9] focus:border-[#bdbcbc] dark:border-[#212121]  dark:text-white dark:bg-[#161616] focus:outline-none`}
                        >
                          <PlusIcon
                            fill={getCookie("isDarkMode") ? "white" : "black"}
                          />
                        </RACButton>
                        <Popover placement="bottom">
                          <Dialog className="border bg-white focus:outline-none rounded-lg dark:bg-[#161616] dark:text-white">
                            {({ close }) => (
                              <div className="flex flex-col px-5 py-3 gap-2 dark:bg-[#161616] dark:text-white">
                                <RACButton
                                  onPress={() =>
                                    handleNewMenuItem(id, "group", close)
                                  }
                                  className={
                                    "focus:outline-blue-300 p-1 dark:bg-[#161616] dark:text-white"
                                  }
                                >
                                  MenuGroup
                                </RACButton>
                                <RACButton
                                  onPress={() =>
                                    handleNewMenuItem(id, "item", close)
                                  }
                                  className={
                                    "focus:outline-blue-300 p-1 dark:bg-[#161616] dark:text-white"
                                  }
                                >
                                  MenuItem
                                </RACButton>
                              </div>
                            )}
                          </Dialog>
                        </Popover>
                      </DialogTrigger>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="w-full h-fit border mt-3 rounded dark:bg-[#161616] dark:text-white"
                      key={id}
                    >
                      {["df", "uf", "pf", "sf"].map((fab, index) => (
                        <TextField
                          className="m-2 relative dark:bg-[#161616] dark:text-white"
                          key={index}
                        >
                          <Label />
                          <Input
                            value={node.keys ? node.keys[fab] : ""}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              const content = e.dataTransfer.getData("key");
                              if (content) {
                                handleUpdateJson(
                                  `${id}.keys`,
                                  JSON.parse(content),
                                  true
                                );
                              }
                            }}
                            className={
                              "bg-[#F4F5FA] p-2 focus:outline-blue-500 w-full rounded-lg pr-8 dark:bg-[#161616] dark:text-white"
                            }
                            name={fab}
                            placeholder={fab}
                          />
                          {node.keys?.[fab] ? (
                            <Button
                              onPress={() =>
                                handleDeleteKeys(`${id}.keys`, fab)
                              }
                              className={
                                "absolute right-2 top-3 focus:outline-none dark:bg-[#161616] dark:text-white"
                              }
                            >
                              <DeleteIcon />
                            </Button>
                          ) : null}
                          <Text slot="description" />
                          <FieldError />
                        </TextField>
                      ))}
                    </div>
                  );
                }
              })}
              <div className="w-[3%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemAccordian;
