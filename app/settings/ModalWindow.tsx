import React from "react";
import { useState } from "react";
import {
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tab,
    Tabs,
    Textarea,
} from "@nextui-org/react";
import { Accordion, AccordionItem, Tooltip } from "@nextui-org/react";
import _ from "lodash";
import { toast } from "react-toastify";
import RenderAccordion from "./RenderAccordian";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import { AxiosService } from "../../lib/utils/axiosService";
import TorusToast from "../components/torusComponents/torusToast";
interface componentprops {
    json: null | any;
    setjson: any;
}

const ModalWindow = ({ json = null, setjson }: componentprops) => {
    const [dupjson, setDupjson] = useState<any>(json);
    const [fileUrl, setFileUrl] = useState("");
    const [handleValue, setHandleValue] = useState(null);
    const [wordLength, setWordLength] = useState(0);

    const handlejs = (newContent: any, path: any) => {
        if (path) {
            const js = structuredClone(dupjson);
            _.set(js as any, path, newContent);
            setDupjson(js);
            setjson(js);
        }
    };

    const fileRemove = async (path: any) => {
        var fileName = fileUrl.split("/").pop();
        const res = await AxiosService.delete(
            `/file/delete/${fileName}`
        );

        if (res.status == 200) {
            handlejs("", path);
            setFileUrl("");
        }
    };

    const handleUploads = async (e: any, path: any) => {
        const file = e.target.files[0];
        var filename = "";
        try {
            const data = new FormData();
            data.append("file", file);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    name: filename,
                },
            };

            const res = await AxiosService.post(
                "/file/upload",
                data,
                config
            );

            if (res.status === 201) {
                const responseData = res.data;
                setFileUrl(responseData.filename);
                handlejs(responseData.filename, path);
            } else {
                toast(
                    <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
                    {
                        type: "error",
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        title: "Error",
                        text: `${res.statusText ?? "Error Occurred"}`,
                        closeButton: false,
                    } as any
                );
            }
        } catch (error) {
            toast(
                <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
                {
                    type: "error",
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    title: "Error",
                    text: `Error Occured`,
                    closeButton: false,
                } as any
            );
        }
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

    const handleAddNewEntity = (path: string, length: number) => {
        const currentData: any[] = _.get(dupjson, path);
        const transformedData = transformObject(currentData[0]);
        handlejs(transformedData, `${path}.${length}`);
    };

    const handleDeleteEntity = (path: string) => {
        const js = _.cloneDeep(dupjson);
        const parentpath = path.split(".");
        const index: any = parentpath.pop();
        const data: any[] = _.get(js, parentpath.join("."));
        data.splice(index, 1);
        _.set(js, parentpath.join("."), data);
        setDupjson(js);
        setjson(js);
    };

    return (
        <div
            className="mt-2 h-[85%]"
        >
            <Tabs fullWidth>
                {dupjson ? (
                    Object.entries(dupjson)
                        .filter(
                            ([skey]) => skey !== "Code" && skey !== "Name" && skey !== "Logo"
                        )
                        .map(([dkey, value]: [string, any]) => (
                            <Tab className="h-full overflow-y-auto overflow-x-hidden" key={dkey} title={dkey.toUpperCase()}>
                                <>
                                    {Array.isArray(value) && (
                                        <div className="w-full p-2 rounded flex justify-end cursor-pointer">
                                            <Tooltip content="add new entry" placement="top">
                                                <p>
                                                    <FaPlusCircle
                                                        fill="green"
                                                        onClick={() =>
                                                            handleAddNewEntity(dkey, value.length)
                                                        }
                                                    />
                                                </p>
                                            </Tooltip>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2 p-3 w-full border-none ">
                                        {Object.keys(value).map((key, index) => (
                                            <div key={index}>
                                                {typeof value[key] === "object" ? (
                                                    <Accordion
                                                        defaultExpandedKeys={[Object.keys(value)[0]]}
                                                        key={index}
                                                        className={`flex flex-col text-basegap-4 px-2 border-none`}
                                                        variant="bordered"
                                                    >
                                                        <AccordionItem
                                                            textValue="dd"
                                                            key={key}
                                                            className=""
                                                            title={
                                                                <div
                                                                    className="flex items-center justify-between gap-2 my-2 "
                                                                >
                                                                    <span>{dkey + " " + key}</span>
                                                                    <Popover placement="bottom" showArrow={true}>
                                                                        <PopoverTrigger>
                                                                            <button>
                                                                                <MdOutlineAutoDelete />{" "}
                                                                            </button>
                                                                        </PopoverTrigger>
                                                                        <PopoverContent>
                                                                            <div className="px-1 py-2">
                                                                                <div className="text-small font-bold">
                                                                                    Delete entity
                                                                                </div>
                                                                                <div className="text-tiny">
                                                                                    This action is not reversible, please
                                                                                    confirm your action
                                                                                </div>
                                                                                <div className="flex w-full justify-end my-2">
                                                                                    <Button
                                                                                        color="danger"
                                                                                        size="sm"
                                                                                        onClick={() =>
                                                                                            handleDeleteEntity(
                                                                                                `${dkey}.${key}`
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        delete
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </PopoverContent>
                                                                    </Popover>
                                                                </div>
                                                            }
                                                        >
                                                            {Array.isArray(value[key]) && (
                                                                <div className="w-full p-2 rounded flex justify-end cursor-pointer">
                                                                    <Tooltip
                                                                        content="add new entry"
                                                                        placement="top"
                                                                    >
                                                                        <p>
                                                                            <FaPlusCircle
                                                                                fill="green"
                                                                                onClick={() =>
                                                                                    handleAddNewEntity(
                                                                                        key,
                                                                                        value[key].length
                                                                                    )
                                                                                }
                                                                            />
                                                                        </p>
                                                                    </Tooltip>
                                                                </div>
                                                            )}
                                                            {typeof value[key] === "object" && (
                                                                <RenderAccordion
                                                                    data={value[key]}
                                                                    path={`${dkey}.${key}`}
                                                                    handlejs={handlejs}
                                                                    handleAddNewEntity={handleAddNewEntity}
                                                                    mainData={dupjson}
                                                                    handleDeleteEntity={handleDeleteEntity}
                                                                />
                                                            )}
                                                        </AccordionItem>
                                                    </Accordion>
                                                ) : (
                                                    <>
                                                        {key == "icon" || key == "Logo" ? (
                                                            <>
                                                                {fileUrl ? (
                                                                    <div className="flex items-center gap-3 relative">
                                                                        <div>
                                                                            <p className="pb-2">{key}</p>
                                                                            <Image
                                                                                src={fileUrl}
                                                                                alt="dhd"
                                                                                width={150}
                                                                                height={150}
                                                                            />
                                                                        </div>
                                                                        <Tooltip content="remove file">
                                                                            <button
                                                                                className="cursor-pointer absolute top-2 right-0 px-1 rounded"
                                                                                onClick={() => fileRemove(key)}
                                                                            >
                                                                                <TiDelete size={25} />
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                ) : (
                                                                    <Input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        labelPlacement="outside"
                                                                        className="text-gray-700 shadow-md"
                                                                        radius="lg"
                                                                        label={<label>{key}</label>}
                                                                        onChange={(e) => {
                                                                            handleUploads(e, `${dkey}.${key}`);
                                                                        }}
                                                                    />
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {key == "description" ? (
                                                                    <Textarea
                                                                        label={<label>{key}</label>}
                                                                        labelPlacement="outside"
                                                                        onValueChange={(e) => {
                                                                            setHandleValue(e as any);
                                                                        }}
                                                                        defaultValue={value[key]}
                                                                        onKeyUp={(e) => {
                                                                            handlejs(handleValue, `${dkey}.${key}`);
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Input
                                                                        isClearable
                                                                        radius="lg"
                                                                        label={<label>{key}</label>}
                                                                        labelPlacement="outside"
                                                                        className="text-gray-700 shadow-md"
                                                                        onValueChange={(e) => {
                                                                            setHandleValue(e as any);
                                                                        }}
                                                                        defaultValue={value[key]}
                                                                        onKeyUp={(e) => {
                                                                            handlejs(handleValue, `${dkey}.${key}`);
                                                                        }}
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            </Tab>
                        ))
                ) : (
                    <Tab key={"data"}>
                        <div>No data availabale</div>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default ModalWindow;