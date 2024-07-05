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
import { DownArrow, PlusIcon, SixDotsSvg, UpArrow } from "../constants/svgApplications";
import { motion, AnimatePresence } from "framer-motion";
import { TreeNode, menuItems } from "../constants/MenuItemTree";
import _ from "lodash";

type HandleUpdateJsonType = (path: string, newContent: any, isDropContent?: boolean) => void;

interface TreeNodeProps {
    node: TreeNode;
    level: number;
    path: string;
    handleUpdateJson: HandleUpdateJsonType;
}

interface TreeProps {
    data?: TreeNode[];
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
    node,
    level,
    path,
    handleUpdateJson,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isInput, setInput] = useState(false);


    const handleDrop = (e: React.DragEvent<HTMLDivElement>, path: string) => {
        const content = JSON.parse(e.dataTransfer.getData("key"));
        handleUpdateJson(path, content, true);
    };



    const handleChangeTitle = (
        e: React.ChangeEvent<HTMLInputElement>,
        path: string
    ) => {
        handleUpdateJson(`${path}.title`, e.target.value);
        setInput(false);
    };

    return (
        <div>
            <div className={`ml-4 mt-2 border rounded`}>
                <div
                    className={`cursor-pointer flex items-center w-full focus:outline-gray-400 ${node.type == "container" ? "" : "flex-col"
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
                                onBlur={(e) => handleChangeTitle(e, path)}
                            />
                        ) : (
                            <span onDoubleClick={(e) => {
                                e.stopPropagation();
                                setInput(!isInput)
                            }}>
                                {node.title}
                            </span>
                        )}
                        <RACButton className="ml-auto p-2 transition-all duration-300 ease-in-out focus:outline-none" onPress={() => setExpanded(!expanded)}>
                            {expanded ? <UpArrow /> : <DownArrow />}
                        </RACButton>
                    </div>
                    <AnimatePresence>
                        {expanded && node.type == "child" && (
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
                                            value={node.keys ? node.keys[fab] : ""}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleDrop(e, `${path}.keys`)}
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
                {expanded && node.children && node.type == "container" && (
                    <motion.div
                        className={`overflow-hidden`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {node.children.map((child, index) => (
                            <div key={child.id} className="ml-4 mt-2 last:mb-2">
                                <TreeNodeComponent
                                    key={child.id}
                                    node={child}
                                    level={level + 1}
                                    path={`${path}.children.${index}`}
                                    handleUpdateJson={handleUpdateJson}
                                />
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TreeComponent: React.FC<TreeProps> = () => {
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

    const handleAddMenuGrp = () => {
        const newMenuGrp: TreeNode = {
            id: `${menuGroups.length + 1}`,
            title: `Menu Item ${menuGroups.length + 1}`,
            type: "container",
            children: [],
        };
        setMenuGroups((prev) => [...prev, newMenuGrp]);
    };

    const handleNewMenuItem = (id: number) => {
        const val: TreeNode[] | any = _.get(menuGroups, `${id}.children`);
        const newMenuItem: TreeNode = {
            id: `${id + 1}-${val.length + 1}`,
            title: `Menu Item ${id + 1}-${val.length + 1}`,
            type: "child",
            children: [],
            keys: {},
        };
        val.push(newMenuItem);
        handleUpdateJson(`${id}.children`, val);
    };

    const handleChangeTitle = (
        e: React.ChangeEvent<HTMLInputElement>,
        path: string
    ) => {
        handleUpdateJson(`${path}.title`, e.target.value);
        setInput(false);
    };

    return (
        <div className="flex w-full">
            <div className="flex flex-col w-full">
                <div className="flex w-full bg-[#F4F5FA] p-2 rounded-xl gap-3">
                    <div className="flex w-[97%] justify-around gap-3">
                        {menuGroups.map((node: TreeNode, id: number) => (
                            <div key={id} className="flex p-3 border rounded w-full bg-white">
                                <SixDotsSvg />
                                {isInput ? (
                                    <Input
                                        defaultValue={node.title}
                                        className={`border mr-2 w-full focus:outline-none focus:border-blue-300 rounded-lg p-1`}
                                        onBlur={(e) => handleChangeTitle(e, id.toString())}
                                    />
                                ) : (
                                    <span onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        setInput(!isInput);
                                    }}>
                                        {node.title}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-[4%] flex justify-center">
                        <RACButton
                            className={` px-2 items-center flex bg-white rounded focus:outline-blue-300`}
                            onPress={handleAddMenuGrp}
                        >
                            <PlusIcon />
                        </RACButton>
                    </div>
                </div>

                <div>
                    <div className="flex w-full justify-around h-[70vh] overflow-y-auto">
                        <div className="flex w-[97%] justify-around gap-4 mr-4">
                            {menuGroups.map((node: TreeNode, id: number) => {
                                if (node.type == "container") {
                                    return (
                                        <div className="w-full " key={id}>
                                            {node.children?.map((subNode, index) => (
                                                <div className="w-full " key={index}>
                                                    <TreeNodeComponent
                                                        node={subNode}
                                                        level={0}
                                                        path={`${id}.children.${index}`}
                                                        handleUpdateJson={handleUpdateJson}
                                                    />
                                                </div>
                                            ))}
                                            <RACButton
                                                className={`w-[92%] flex items-center justify-center
                           mt-2.5 py-2 ml-4 rounded-lg border-2 border-dashed
                            border-[#d9d9d9] focus:border-[#bdbcbc] focus:outline-none`}
                                                onPress={() => handleNewMenuItem(id)}
                                            >
                                                <PlusIcon />
                                            </RACButton>
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
                                                            const content = JSON.parse(e.dataTransfer.getData("key"));
                                                            handleUpdateJson(
                                                                `${id}.keys`,
                                                                content, true
                                                            )
                                                        }
                                                        }
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

export default TreeComponent;