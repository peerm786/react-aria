import {
    Accordion,
    AccordionItem,
    Button,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Textarea,
    Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import _ from "lodash";
import { MdOutlineAutoDelete } from "react-icons/md";
import { getCookie } from "../../../../lib/utils/cookiemgmt";
import TorusToast from "../../torusComponents/torusToast";
import { AxiosService } from "../../../../lib/utils/axiosService";

const RenderAccordion = ({
    data,
    path,
    handlejs,
    mainData,
    handleAddNewEntity,
    handleDeleteEntity = null,
}: any) => {
    const [handleValue, setHandleValue] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [wordLength, setWordLength] = useState(0);

    const handleUploads = async (e: any, path: any) => {
        const file = e.target.files[0];
        var filename = "";
        const tenant = getCookie("tenant") as string;
        const parentpath = path.split(".");
        parentpath.pop();
        const existingData = _.get(mainData, parentpath.join("."));
        if (existingData.APPS) {
            filename = `${tenant}_${existingData.code}`;
        } else {
            const appgrouppath = parentpath.slice(0, 2);
            const appgroupData = _.get(mainData, appgrouppath.join("."));
            filename = `${tenant}_${appgroupData.code}_${existingData.code}`;
        }
        try {
            const data = new FormData();
            data.append("file", file);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    name: filename,
                },
            };

            if (file) {
                const res = await AxiosService.post("/file/upload", data, config);

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
                    text: `Error Occurred`,
                    closeButton: false,
                } as any
            );
        }
    };

    const fileRemove = async (path: string) => {
        var fileName = fileUrl.split("/").pop();
        const res = await AxiosService.delete(`/file/delete/${fileName}`);

        if (res.status == 200) {
            handlejs("", path);
            setFileUrl("");
        }
    };
    const hasAlphabets = (str: string) => /[a-zA-Z]/.test(str);

    return (
        <>
            {data &&
                Object.keys(data).map((key, index) => {
                    const currentPath = `${path}.${key}`;
                    if (typeof data[key] === "object") {
                        return (
                            <div className="mb-4" key={index}>
                                <Accordion
                                    defaultExpandedKeys={[Object.keys(data)[0]]}
                                    className={`flex w-full gap-4 px-2 border-none`}
                                    variant="light"
                                >
                                    <AccordionItem
                                        key={key}
                                        className="w-full"
                                        title={
                                            <div className="flex items-center justify-between gap-2 my-2 w-full">
                                                <span>{key}</span>
                                                {!hasAlphabets(key) ? (
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
                                                                    This action is not reversible, please confirm
                                                                    your action
                                                                </div>
                                                                <div className="flex w-full justify-end my-2">
                                                                    <Button
                                                                        color="danger"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleDeleteEntity(currentPath)
                                                                        }
                                                                    >
                                                                        delete
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                ) : null}
                                            </div>
                                        }
                                        textValue="dhd"
                                    >
                                        <>
                                            {Array.isArray(data[key]) && (
                                                <div className="w-full p-2 rounded flex justify-end cursor-pointer">
                                                    <Tooltip content="add new entry" placement="top">
                                                        <p>
                                                            <FaPlusCircle
                                                                fill="green"
                                                                onClick={() =>
                                                                    handleAddNewEntity(
                                                                        currentPath,
                                                                        data[key].length
                                                                    )
                                                                }
                                                            />
                                                        </p>
                                                    </Tooltip>
                                                </div>
                                            )}
                                            <RenderAccordion
                                                data={data[key]}
                                                path={currentPath}
                                                handlejs={handlejs}
                                                mainData={mainData}
                                                handleAddNewEntity={handleAddNewEntity}
                                                handleDeleteEntity={handleDeleteEntity}
                                            />
                                        </>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        );
                    } else if (
                        Array.isArray(data[key]) &&
                        typeof data[key][0] !== "string"
                    ) {
                        return (
                            <div className="" key={"array"+index}>
                                <Accordion
                                    key={key}
                                    className={`flex flex-row  gap-4 px-2 border-none`}
                                    variant="light"
                                >
                                    <AccordionItem
                                        textValue="dgd"
                                        title={
                                            <div
                                                className="flex items-center justify-between gap-2 my-2"
                                            // style={{
                                            //   width: "30%",
                                            // }}
                                            >
                                                <span>{key}</span>
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
                                                                This action is not reversible, please confirm
                                                                your action
                                                            </div>
                                                            <div className="flex w-full justify-end my-2">
                                                                <Button
                                                                    color="danger"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleDeleteEntity(currentPath)
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
                                        {data[key].map((item:any, index:number) => {
                                            return (
                                                <div key={index}>
                                                    <RenderAccordion
                                                        data={item}
                                                        path={currentPath + "." + index}
                                                        handlejs={handlejs}
                                                        mainData={mainData}
                                                        handleAddNewEntity={handleAddNewEntity}
                                                        handleDeleteEntity={handleDeleteEntity}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        );
                    } else if (
                        Array.isArray(data[key]) &&
                        typeof data[key][0] === "string"
                    ) {
                        return (
                            <div className="" key={"stringarray"+index}>
                                <Accordion
                                    key={key}
                                    className={`flex flex-row  gap-4 px-2 border-none `}
                                    variant="light"
                                >
                                    <AccordionItem
                                        textValue="dghs"
                                        title={
                                            <div
                                                className="flex items-center justify-between gap-2 my-2"
                                            // style={{
                                            //   width: "30%",
                                            // }}
                                            >
                                                <span>{key}</span>
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
                                                                This action is not reversible, please confirm
                                                                your action
                                                            </div>
                                                            <div className="flex w-full justify-end my-2">
                                                                <Button
                                                                    color="danger"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleDeleteEntity(currentPath)
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
                                        className=""
                                    >
                                        {(data[key] as any[]).map((item, index) => (
                                            <div key={index} className="my-2 py-1">
                                                <Input
                                                    isClearable
                                                    radius="lg"
                                                    labelPlacement="outside"
                                                    label={<label>{index}</label>}
                                                    className="text-gray-700 shadow-md"
                                                    onValueChange={(e) => {
                                                        setHandleValue(e as any);
                                                    }}
                                                    defaultValue={item}
                                                    onKeyUp={(e) => {
                                                        // if (e.key === "Enter") {
                                                        handlejs(handleValue, currentPath + "." + index);
                                                        // }
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        );
                    } else {
                        return (
                            <div key={key} className="my-2 py-1">
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
                                                            onClick={() => fileRemove(currentPath)}
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
                                                        handleUploads(e, currentPath);
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
                                                    defaultValue={data[key]}
                                                    onKeyUp={(e) => {
                                                        handlejs(handleValue, currentPath);
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
                                                    defaultValue={data[key]}
                                                    onKeyUp={(e) => {
                                                        handlejs(handleValue, currentPath);
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            </div>
                        );
                    }
                })}
        </>
    );
};

export default RenderAccordion;
