"use client";
import React, { useEffect, useRef, useState } from "react";
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
} from "../../constants/svgApplications";
import { motion, AnimatePresence } from "framer-motion";
import { TreeNode } from "../../constants/MenuItemTree";
import _ from "lodash";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/Store/store";
import { toast } from "react-toastify";
import TorusToast from "../torusComponents/torusToast";

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
  isDarkMode: boolean;
  setClearKeyPath: React.Dispatch<React.SetStateAction<string | null>>;
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
  isDarkMode,
  setClearKeyPath,
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
        className={`mt-2 border rounded`}
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
              <SixDotsSvg fill={isDarkMode ? "white" : "black"} />
            </RACButton>
            {isInput ? (
              <Input
                defaultValue={node.title}
                className={`border text-[0.83vw] leading-[2.22vh] mr-2 w-full focus:outline-none dark:text-white dark:bg-white focus:border-blue-300 rounded-lg p-1`}
                onKeyDown={(e) =>
                  e.key === "Enter" ? handleChangeTitle(e, path) : null
                }
                onBlur={(e) => handleChangeTitle(e, path)}
              />
            ) : (
              <span
                className="text-[0.83vw] leading-[2.22vh]"
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
              <DeleteIcon fill={isDarkMode ? "white" : "black"} />
            </RACButton>
            <RACButton
              className="ml-auto p-2 transition-all duration-300 ease-in-out focus:outline-none dark:bg-[#161616] dark:text-white"
              onPress={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <UpArrow fill={isDarkMode ? "white" : "black"} />
              ) : (
                <DownArrow fill={isDarkMode ? "white" : "black"} />
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
                    className="m-2 text-[0.72vw] leading-[2.22vh] relative dark:bg-[#161616] dark:text-white focus:outline-none"
                    key={id}
                    onFocus={() => setClearKeyPath(`${path}.keys`)}
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
                        <DeleteIcon fill={isDarkMode ? "white" : "black"} />
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
                  isDarkMode={isDarkMode}
                  setClearKeyPath={setClearKeyPath}
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
  const [isInput, setInput] = useState<null | string>(null);
  const headerSectionRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
  const [clearKeyPath, setClearKeyPath] = useState<null | string>(null);
  const [wordLength, setWordLength] = useState<number>(0);

  const handleUpdateJson: HandleUpdateJsonType = (
    path: string,
    newContent: any,
    isDropContent: boolean = false
  ) => {
    const js = structuredClone(data);
    if (isDropContent) {
      const getExistingContent = _.get(js, path);
      _.set(js, path, { ...getExistingContent, ...newContent });
      setData(js);
    } else {
      _.set(js, path, newContent);
      setData(js);
    }
  };

  const handleAddMenuGrp = (type: MenuType, close: () => void) => {
    if (type == "group") {
      const newMenuGrp: TreeNode = {
        id: `${data.length + 1}`,
        title: `Menu Item ${data.length + 1}`,
        sortOrder: `${data.length + 1}`,
        type: "group",
        items: [],
      };
      setData([...data, newMenuGrp]);
      close();
    } else {
      const newMenuGrp: TreeNode = {
        id: `${data.length + 1}`,
        title: `Menu Item ${data.length + 1}`,
        sortOrder: `${data.length + 1}`,
        type: "item",
        keys: {},
      };
      setData([...data, newMenuGrp]);
      close();
    }
  };

  const handleNewMenuItem = (id: number, type: MenuType, close: () => void) => {
    const val: TreeNode[] | any = _.get(data, `${id}.items`);
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
      setInput(null);
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
    const srcNode = _.get(data, pathOfSrcNode);
    const targetNode = _.get(data, pathOfTargetNode);

    //Code to sort node from within the same group at the Nav level working fine
    if (
      pathOfSrcNode.split(".").length == 1 &&
      pathOfTargetNode.split(".").length == 1
    ) {
      const js = structuredClone(data);
      _.update(js, pathOfSrcNode, () => targetNode);
      _.update(js, pathOfTargetNode, () => srcNode);
      const updatedSortOrder = js.map((node, index) => ({
        ...node,
        sortOrder: `${index + 1}`,
      }));
      setData(updatedSortOrder);
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
      const js = structuredClone(data);
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
      const js = structuredClone(data);

      if (!parentPathOfSrcNode) {
        const srcNode = js.splice(indexToModify, 1)[0];
        targetNode.items.push({
          ...srcNode,
          sortOrder: `${targetNode.items.length + 1}`,
        });
        const updatedMainGroup = js.map((node: TreeNode, index: number) => ({
          ...node,
          sortOrder: `${index + 1}`,
        }));
        _.set(updatedMainGroup, pathOfTargetNode, targetNode);
        setData(updatedMainGroup);
        return;
      }

      const parentOfSrcNode = _.get(js, parentPathOfSrcNode);

      // Remove the node from the source group
      const srcNode = parentOfSrcNode.splice(indexToModify, 1)[0];

      // Update the sort order of the source group
      const sortedItemsOfSrcNode = parentOfSrcNode.map(
        (node: TreeNode, index: number) => ({
          ...node,
          sortOrder: `${index + 1}`,
        })
      );

      // Add the node to the target group
      targetNode.items.push({
        ...srcNode,
        sortOrder: `${targetNode.items.length + 1}`,
      });

      // Update the sort order of the target group
      const sortedItemsOfTargetNode = targetNode.items.map(
        (node: TreeNode, index: number) => ({
          ...node,
          sortOrder: `${index + 1}`,
        })
      );

      // Update the source group and target group in the state
      _.set(js, parentPathOfSrcNode, sortedItemsOfSrcNode);
      _.set(js, pathOfTargetNode, {
        ...targetNode,
        items: sortedItemsOfTargetNode,
      });
      setData(js);
    } else {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "warning",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Warnig",
          text: `Can't drop here`,
          closeButton: false,
        } as any
      )
    }
  };

  const handleDeleteKeys = (path: string, fab: string) => {
    const js = structuredClone(data);
    const datas: any = _.get(js, path);
    delete datas[fab];
    handleUpdateJson(path, datas);
  };

  const handleDeleteMenuGrp = (path: string, isCalledfromNav?: boolean) => {
    const js = structuredClone(data);
    if (isCalledfromNav) {
      const indexToDelete = parseInt(path);
      js.splice(indexToDelete, 1);
      setData(js);
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

  const syncScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
    target.scrollLeft = source.scrollLeft;
  };

  useEffect(() => {
    console.log(headerSectionRef.current?.clientHeight);

    const headerSection = headerSectionRef.current;
    const contentSection = contentSectionRef.current;

    if (headerSection && contentSection) {
      const handleHeaderScroll = () =>
        syncScroll(headerSection, contentSection);
      const handleContentScroll = () =>
        syncScroll(contentSection, headerSection);

      headerSection.addEventListener("scroll", handleHeaderScroll);
      contentSection.addEventListener("scroll", handleContentScroll);

      return () => {
        headerSection.removeEventListener("scroll", handleHeaderScroll);
        contentSection.removeEventListener("scroll", handleContentScroll);
      };
    }
  }, []);

  const handleClearKeys = () => {
    if (clearKeyPath) {
      handleUpdateJson(clearKeyPath, {});
    } else {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "warning",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Warnig",
          text: `Please select a MenuItem to clear keys`,
          closeButton: false,
        } as any
      );
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div
          ref={headerSectionRef}
          className="flex w-full overflow-x-auto bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white p-2 rounded-tl-xl rounded-bl-xl gap-2 scrollbar-hide"
        >
          {data.map((node: TreeNode, id: number) => (
            <div
              draggable
              onDragStart={(e) => handleDragStartOfNode(e, `${id}`)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropNode(e, `${id}`)}
              key={id}
              className="flex p-1 items-center gap-2 border rounded flex-[0_0_23%] bg-white dark:bg-[#161616] dark:border-[#212121] dark:text-white group relative cursor-pointer"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            >
              <SixDotsSvg fill={isDarkMode ? "white" : "black"} />
              {isInput === `${id}` ? (
                <Input
                  defaultValue={node.title}
                  className={`border text-[0.83vw] leading-[2.22vh] mr-2 w-full focus:outline-none dark:bg-[#161616] dark:border-[#212121] dark:text-white focus:border-blue-300 rounded-lg p-1`}
                  onKeyDown={(e) =>
                    e.key === "Enter"
                      ? handleChangeTitle(e, id.toString())
                      : null
                  }
                  onBlur={(e) => handleChangeTitle(e, id.toString())}
                />
              ) : (
                <span
                  className="text-[0.83vw] leading-[2.22vh]"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setInput(id.toString());
                  }}
                >
                  {node.title}
                </span>
              )}
              <RACButton
                onPress={() => handleDeleteMenuGrp(`${id}`, true)}
                className="ml-auto mr-2 focus:outline-none h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity dark:hover:text-[#f0f0f0]"
              >
                <DeleteIcon fill={isDarkMode ? "white" : "black"} />
              </RACButton>
            </div>
          ))}

          <DialogTrigger>
            <RACButton
              className={`px-2 h-8 items-center bg-white flex dark:bg-[#161616] dark:text-white rounded focus:outline-blue-300`}
            >
              <PlusIcon fill={isDarkMode ? "white" : "black"} />
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
        <div
          ref={contentSectionRef}
          className="flex h-[60vh] w-[95%] overflow-x-auto scrollbar-thin gap-4 dark:bg-[#161616] dark:text-white"
        >
          {data.map((node: TreeNode, id: number) => {
            if (node.type === "group") {
              return (
                <div className="flex-[0_0_23%]" key={id}>
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
                        isDarkMode={isDarkMode}
                        setClearKeyPath={setClearKeyPath}
                      />
                    </div>
                  ))}
                  <DialogTrigger>
                    <RACButton
                      className={`w-[92%] flex items-center justify-center mt-2.5 py-2 ml-2 rounded-lg border-2 border-dashed border-[#d9d9d9] focus:border-[#bdbcbc] dark:border-[#212121] dark:text-white dark:bg-[#161616] focus:outline-none`}
                    >
                      <PlusIcon fill={isDarkMode ? "white" : "black"} />
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
                  className="flex-[0_0_23%] ml-4 h-fit border mt-3 rounded dark:bg-[#161616] dark:text-white"
                  key={id}
                >
                  {["df", "uf", "pf", "sf"].map((fab, index) => (
                    <TextField
                      className="m-2 text-[0.72vw] leading-[2.22vh] relative dark:bg-[#161616] dark:text-white"
                      key={index}
                      onFocus={() => setClearKeyPath(`${id}.keys`)}
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
                          "bg-[#F4F5FA]  p-2 focus:outline-blue-500 w-full rounded-lg pr-8 dark:bg-[#161616] dark:text-white"
                        }
                        name={fab}
                        placeholder={fab}
                      />
                      {node.keys?.[fab] ? (
                        <Button
                          onPress={() => handleDeleteKeys(`${id}.keys`, fab)}
                          className={
                            "absolute right-2 top-3 focus:outline-none dark:bg-[#161616] dark:text-white"
                          }
                        >
                          <DeleteIcon fill={isDarkMode ? "white" : "black"} />
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
        </div>
      </div>
      {/* this below button is used to trigger the clear key functionality from the builder */}
      <button
        className="hidden"
        onClick={handleClearKeys}
        id="triggerClearKeyFunctionality"
      ></button>
      {/* this above button is used to trigger the clear key functionality from the builder */}
    </div>
  );
};

export default MenuItemAccordian;
