"use client";
import React, { useEffect, useState } from "react";
import {
  Button as RACButton,
  FieldError,
  Input,
  Label,
  Text,
  TextField,
} from "react-aria-components";
import {
  DownArrow,
  PlusIcon,
  SixDotsSvg,
  UpArrow,
} from "../constants/svgApplications";
import { motion, AnimatePresence } from "framer-motion";
import { TreeNode, menuItems } from "../constants/MenuItemTree";
import _ from "lodash";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";

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

type MenuType = "grp" | "item";

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  path: string;
  handleUpdateJson: HandleUpdateJsonType;
  handleDropNode: HandleDropNode;
  handleDragStartOfNode: HandleDragStart;
}

interface TreeProps {
  data?: TreeNode[];
}

const RenderAccordian: React.FC<TreeNodeProps> = ({
  node,
  level,
  path,
  handleUpdateJson,
  handleDragStartOfNode,
  handleDropNode,
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
          className={`cursor-pointer flex items-center w-full focus:outline-gray-400 ${node.type == "grp" ? "" : "flex-col"
            } p-1 rounded`}
        >
          <div className="flex w-full h-full items-center">
            <RACButton aria-label="dd" className="mr-2 focus:outline-none">
              <SixDotsSvg />
            </RACButton>
            {isInput ? (
              <Input
                defaultValue={node.title}
                className={`border mr-2 w-full focus:outline-none focus:border-blue-300 rounded-lg p-1`}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleChangeTitle(e, path) : null
                }
                onBlur={(e) => handleChangeTitle(e, path)}
              />
            ) : (
              <span
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setInput(!isInput);
                }}
              >
                {node.title}
              </span>
            )}
            <RACButton
              className="ml-auto p-2 transition-all duration-300 ease-in-out focus:outline-none"
              onPress={() => setExpanded(!expanded)}
            >
              {expanded ? <UpArrow /> : <DownArrow />}
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
                  <TextField className="m-2" key={id}>
                    <Label />
                    <Input
                      onDragOver={(e) => e.preventDefault()}
                      value={node.keys ? node.keys[fab] : ""}
                      className={
                        "bg-[#F4F5FA] p-2 focus:outline-blue-500 w-full rounded-lg"
                      }
                      name={fab}
                      placeholder={fab}
                    />
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
        {expanded && node.items && node.type == "grp" && (
          <motion.div
            className={`overflow-hidden`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {node.items.map((child, index) => (
              <div key={child.id} className="ml-4 mt-2 last:mb-2">
                <RenderAccordian
                  key={child.id}
                  node={child}
                  level={level + 1}
                  path={`${path}.items.${index}`}
                  handleUpdateJson={handleUpdateJson}
                  handleDragStartOfNode={handleDragStartOfNode}
                  handleDropNode={handleDropNode}
                />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuItemAccordian: React.FC<TreeProps> = () => {
  const [menuGroups, setMenuGroups] = useState<TreeNode[]>([]);
  const [isInput, setInput] = useState(false);

  useEffect(() => {
    setMenuGroups(menuItems);
  }, []);

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
    if (type == "grp") {
      const newMenuGrp: TreeNode = {
        id: `${menuGroups.length + 1}`,
        title: `Menu Item ${menuGroups.length + 1}`,
        type: "grp",
        items: [],
      };
      setMenuGroups((prev) => [...prev, newMenuGrp]);
      close();
    } else {
      const newMenuGrp: TreeNode = {
        id: `${menuGroups.length + 1}`,
        title: `Menu Item ${menuGroups.length + 1}`,
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
    if (type == "grp") {
      newMenuItem = {
        id: `${id + 1}-${val.length + 1}`,
        title: `Menu Grp ${id + 1}-${val.length + 1}`,
        type: "grp",
        items: [],
        keys: {},
      };
    } else {
      newMenuItem = {
        id: `${id + 1}-${val.length + 1}`,
        title: `Menu Item ${id + 1}-${val.length + 1}`,
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
    path: string
  ) => {
    const pathOfSrcNode = e.dataTransfer.getData("pathOfSrcNode");
    const srcNode = _.get(menuGroups, pathOfSrcNode);
    const targetNode = _.get(menuGroups, path);
    if (pathOfSrcNode !== path && targetNode.type == "grp") {
      targetNode.items.push(srcNode);
      handleUpdateJson(path, targetNode);
      const js = structuredClone(menuGroups);
      _.unset(js, pathOfSrcNode);
      setMenuGroups(js.filter((node) => node !== undefined));
    } else {
      alert("Can't drop here");
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div className="flex w-full bg-[#F4F5FA] p-2 rounded-xl gap-2">
          <div className="flex w-[95%] justify-around gap-2 overflow-x-auto">
            {menuGroups.map((node: TreeNode, id: number) => (
              <div
                draggable
                onDragStart={(e) => handleDragStartOfNode(e, `${id}`)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropNode(e, `${id}`)}
                key={id}
                className="flex p-1 border rounded w-full bg-white"
                onContextMenu={(e) => {
                  e.preventDefault();
                }}
              >
                <SixDotsSvg />
                {isInput ? (
                  <Input
                    defaultValue={node.title}
                    className={`border mr-2 w-full focus:outline-none focus:border-blue-300 rounded-lg p-1`}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? handleChangeTitle(e, id.toString())
                        : null
                    }
                    onBlur={(e) => handleChangeTitle(e, id.toString())}
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      setInput(!isInput);
                    }}
                  >
                    {node.title}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="w-[4%] flex justify-center">
            <DialogTrigger>
              <RACButton
                className={`px-2 items-center flex bg-white rounded focus:outline-blue-300`}
              >
                <PlusIcon />
              </RACButton>
              <Popover placement="left">
                <Dialog className="border bg-white focus:outline-none rounded-lg">
                  {({ close }) => (
                    <div className="flex flex-col px-5 py-2 gap-2">
                      <RACButton
                        onPress={() => handleAddMenuGrp("grp", close)}
                        className={"focus:outline-blue-300 bg-gray-200 p-1"}
                      >
                        MenuGroup
                      </RACButton>
                      <RACButton
                        onPress={() => handleAddMenuGrp("item", close)}
                        className={"focus:outline-blue-300 bg-gray-200 p-1"}
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
          <div className="flex w-full justify-around h-[70vh] overflow-y-auto scrollbar-thin">
            <div className="flex w-[97%] justify-around gap-4 mr-4">
              {menuGroups.map((node: TreeNode, id: number) => {
                if (node.type == "grp") {
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
                          />
                        </div>
                      ))}
                      <DialogTrigger>
                        <RACButton
                          className={`w-[92%] flex items-center justify-center
                           mt-2.5 py-2 ml-4 rounded-lg border-2 border-dashed
                            border-[#d9d9d9] focus:border-[#bdbcbc] focus:outline-none`}
                        >
                          <PlusIcon />
                        </RACButton>
                        <Popover placement="bottom">
                          <Dialog className="border bg-white focus:outline-none rounded-lg">
                            {({ close }) => (
                              <div className="flex flex-col px-5 py-3 gap-2">
                                <RACButton
                                  onPress={() =>
                                    handleNewMenuItem(id, "grp", close)
                                  }
                                  className={"focus:outline-blue-300 bg-gray-200 p-1"}
                                >
                                  MenuGroup
                                </RACButton>
                                <RACButton
                                  onPress={() =>
                                    handleNewMenuItem(id, "item", close)
                                  }
                                  className={"focus:outline-blue-300 bg-gray-200 p-1"}
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
                    <div className="w-full h-fit border mt-3 rounded" key={id}>
                      {["df", "uf", "pf", "sf"].map((fab, index) => (
                        <TextField className="m-2" key={index}>
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
                              "bg-[#F4F5FA] p-2 focus:outline-blue-500 w-full rounded-lg"
                            }
                            name={fab}
                            placeholder={fab}
                          />
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
