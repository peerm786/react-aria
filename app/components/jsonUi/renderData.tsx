import { createElement, memo, useEffect, useState } from "react";
import { unflatten } from "flat";
import TorusToolTip from "./torusComponents/torusTooltip";
import {
  MdBackupTable,
  MdDataObject,
  MdExpandLess,
  MdOutlineDataArray,
} from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { TfiRulerPencil } from "react-icons/tfi";
import { PiCodepenLogoLight } from "react-icons/pi";
import { GoLink } from "react-icons/go";
import { LiaCreditCardSolid } from "react-icons/lia";
import { SlSocialDropbox } from "react-icons/sl";
import { SiDatabricks } from "react-icons/si";
import TorusInput from "./torusComponents/TorusInput";
import _ from "lodash";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TorusDropDown from "./torusComponents/torusDropdown";
import TorusDialog from "../torusdialogmodal";
import TorusButton from "../TorusButton";
import { PlusIcon } from "../../constants/svgApplications";
import { AddModalContentType } from "./AddModalContentType";
import { CiTrash } from "react-icons/ci";

const iconArray = [
  MdDataObject,
  MdOutlineDataArray,
  MdBackupTable,
  LuDatabase,
  SiDatabricks,
  TfiRulerPencil,
  PiCodepenLogoLight,
  GoLink,
  LiaCreditCardSolid,
  SlSocialDropbox,
];

const RenderJsonArraySidebarIcon = memo(
  ({
    obj,
    setShowObj,
    setPath,
    fg,
    activeTab,
    setActiveTab,
    setLabel,
    shuffledIcons,
  }: any) => {
    return (
      <>
        <div
          className={
            "w-[100%]  flex z-50 items-center gap-4 cursor-pointer" +
            (activeTab == fg
              ? "text-xs  cursor-pointer text-[#6600ff]"
              : " text-black cursor-pointer")
          }
        >
          <TorusToolTip
            hoverContent={
              shuffledIcons.length > 0 &&
              createElement(
                shuffledIcons[Math.floor(Math.random() * shuffledIcons.length)],
                {
                  size: 20,
                  color: activeTab === fg ? "#6600ff" : "#B2BABB",
                }
              )
            }
            tooltipFor="arr"
            tooltipContent={obj.map((ele: any) => (ele.label ? ele.label : fg))}
            color={activeTab == fg ? "#6600ff" : "#09254D"}
            setShowObj={setShowObj}
            setActiveTab={setActiveTab}
            setPath={setPath}
            fg={fg}
            setLabel={setLabel}
          />
        </div>
      </>
    );
  }
);

const RenderSwitch = ({ obj }: any) => {
  const handleDropdownClick = (event: any) => {
    event.stopPropagation();
  };
  return (
    <div>
      <select onClick={handleDropdownClick}>
        {obj && obj.map((ele: any) => ({ ele }))}
      </select>
    </div>
  );
};

const RenderJsonArraySidebarDetail = ({
  obj,
  showObj,
  path,
  handlejs,
  objs,
  handleAddjs,
  handleDeletejs
}: any) => {
  const [expandedItem, setExpandedItem] = useState<any[]>([]);
  const [showAccordianItem, setShowAccordianItem] = useState(null);
  const [value, setValue] = useState(null);
  const handleInput = (e: any, i: any, key: any, type: any) => {
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  const toggleKey = (key: any) => {
    if (expandedItem.includes(key)) {
      setExpandedItem(expandedItem.filter((k) => k !== key));
    } else {
      setExpandedItem([...expandedItem, key]);
    }
  };

  return (
    <>
     <div className="  flex h-[100%] w-full items-center">
        <TorusDialog
          key={"TableDelete"}
          triggerElement={
            <TorusButton
              Children={`Add`}
              size={"xs"}
              btncolor={"#0736C4"}
              radius={"lg"}
              color={"#ffffff"}
              gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
              height={"md"}
              borderColor={"3px solid #0736C4"}
              startContent={<PlusIcon />}
              fontStyle={"text-sm font-medium text-[#FFFFFF]"}
            />
          }
          classNames={{
            modalClassName: " w-full flex justify-center items-center  ",
            dialogClassName: " w-[30vw] p-3 h-full rounded-lg flex-col bg-white",
          }}
          title={"Add"}
          message={"Edit"}
          children={({ close }:any) => (
            <AddModalContentType
              obj={obj}
              showObj={showObj}
              close={close}
              handleAddjs={handleAddjs}
              type="arr-0"
            />
          )}
        />
        <TorusButton
          Children={`Delete`}
          size={"xs"}
          btncolor={"#0736C4"}
          radius={"lg"}
          color={"#f00"}
          gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
          height={"md"}
          borderColor={"3px solid #0736C4"}
          startContent={<CiTrash color="white" />}
          fontStyle={"text-sm font-medium text-[#FFFFFF]"}
          onPress={() => handleDeletejs(path)}
        />
      </div>
    <div className={`grid ${obj.length > 1 ? "grid-cols-2" : ""} gap-2`}>
      {obj &&
        obj.map((ele: any, index: number) => {
          const isExpanded = expandedItem.includes(ele.label);
          return (
            <div
              key={index}
              className={
                " bg-[#F4F5FA] text-black dark:text-white dark:bg-[#0F0F0F]  rounded-lg  w-[100%]   mb-2"
              }
            >
              <p
                className="cursor-pointer  flex items-center gap-2 p-2 "
                onClick={(e) => {
                  setShowAccordianItem(ele);
                  e.stopPropagation();
                  toggleKey(ele.label);
                }}
              >
                <span className="flex justify-end">
                  {isExpanded ? (
                    <MdExpandLess color="gray" size={20} />
                  ) : (
                    <IoIosArrowForward color="gray" size={20} />
                  )}
                </span>
                <p>{ele.label} </p>
              </p>

              {isExpanded && (
                <div className="mb-2 p-2">
                  {objs &&
                    Object.keys(objs[showObj][index])
                      .filter(
                        (item) => item !== "grouplabel" && item !== "label"
                      )
                      .map((item, inds) => {
                        if (
                          !Array.isArray(objs[showObj][index][item]) &&
                          typeof objs[showObj][index][item] !== "object"
                        ) {
                          return (
                            <p className="flex flex-col  mt-[-25px] ">
                              <TorusInput
                                variant="bordered"
                                label={item}
                                labelColor="text-[#000000]/50"
                                borderColor="[#000000]/50"
                                outlineColor="torus-focus:ring-[#000000]/50"
                                placeholder=""
                                isDisabled={false}
                                onChange={(e: any) => {
                                  handleInput(
                                    e,
                                    path + "." + index + "." + item,
                                    item,
                                    "arr"
                                  );
                                }}
                                radius="lg"
                                width="xl"
                                height="xl"
                                textColor="text-[#000000] dark:text-[#FFFFFF]"
                                bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
                                value={objs[showObj][index][item]}
                              />
                              {/* <input
                                className="border text-blue-500 "
                                type="text"
                                Value={objs[showObj][index][item]}
                                onChange={(e) => {
                                  handleInput(
                                    e,
                                    path + "." + index + "." + item,
                                    item,
                                    "arr"
                                  );
                                }}
                              /> */}
                            </p>
                          );
                        }

                        if (
                          Array.isArray(objs[showObj][index][item]) ||
                          typeof objs[showObj][index][item] === "object"
                        ) {
                          return (
                            <>
                              <RenderDropdown
                                obj={objs[showObj][index][item]}
                                item={item}
                                path={path + "." + index}
                                handlejs={handlejs}
                                showObj={showObj}
                              />
                            </>
                          );
                        }
                        if (typeof objs[showObj][index][item] === "boolean") {
                          <RenderSwitch obj={objs[showObj][index][item]} />;
                        }
                      })}
                </div>
              )}
            </div>
          );
        })}

      {/* 
      {obj && (
        <>
          {obj && obj.map((ele, index) => {
            {
              console.log(ele, "ele-<");
            }
            return (
              <div key={index}>
                <p
                  onClick={() => setShowAccordianItem(ele) }
                  className="cursor-pointer"
                >
                  {ele.label}
                </p>
              </div>
            );
          })}

           {
           showAccordianItem &&
            Object.keys(showAccordianItem).map((item, inds) => {
              if (!Array.isArray(showAccordianItem[item])) {
                return (
                  <p >
                  {item} :
                  <input
                    className="border text-blue-500 "
                    type="text"
                    Value={showAccordianItem[item]}
                   
                  />
                </p> 
              
                );
              }
            })} 
        </>
      )} */}

      {/* <select>
        {obj &&
          obj.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
      </select> */}
    </div>
    </>
  );
};

const RenderDropdown = ({ obj, path, handlejs, item, showObj }: any) => {
  const [value, setValue] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleDropdownClick = (event: any) => {
    event.stopPropagation();
  };

  //   {
  //     "type": "dropdown",
  //     "label": "tags",
  //     "value": [
  //         "user",
  //         "premium"
  //     ],
  //     "selectedValue": ""
  // }

  useEffect(() => {
    {
      obj &&
        setData(Object.keys(obj).filter((item) => item == "selectedValue"));
    }
  }, []);

  useEffect(() => {
    if (value) {
      handlejs(
        Array.from(value),
        path + "." + item + "." + data,
        data,
        "dropdown",
        showObj
      );
    }
  }, [value]);

  const handleDropdownChange = (e: any) => {
    setValue(e);

    handlejs(e, path + "." + item + "." + data, data, "dropdown", showObj);
  };

  return (
    <>
      {obj && obj.type == "dropdown" && (
        <>
          {
            <div className="flex w-[100%] flex-col gap-2">
              <div className="flex flex-col gap-1 w-full ">
                {/* <p>{obj.label}</p> */}
                {
                  <TorusDropDown
                    renderEmptyState={() => "No Items..."}
                    classNames={{
                      buttonClassName: `bg-white dark:bg-[#161616] w-[100%] h-[40px] text-black dark:text-white  mb-2`,
                      listBoxClassName:
                        "bg-white dark:bg-[#161616] text-black dark:text-white",
                    }}
                    label={obj?.selectedValue.length > 0 && obj.label}
                    title={
                      <div className="flex flex-row items-center  w-[100%]">
                        <div
                          className={
                            "w-[80%] text-black dark:text-white font-sfpro 3xl:text-sm xl:text-sm xl:font-normal tracking-tighter whitespace-nowrap"
                          }
                        >
                          {obj?.selectedValue.length > 0
                            ? Array.from(obj?.selectedValue).join(",")
                            : obj.label}
                        </div>
                        <div className="w-[10%]">
                          <IoIosArrowDown className="dark:text-white text-black" />
                        </div>
                      </div>
                    }
                    fontStyle={
                      "font-plexsans 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                    }
                    selected={value}
                    setSelected={setValue}
                    selectionMode="multiple"
                    items={obj.selectionList.map((ele: any) => ({
                      key: ele,
                      label: ele,
                    }))}
                    btWidth={"md"}
                  />
                }

                {/* {
                  <TorusSelector
                    selected={
                      obj.selectedValue.length > 0 ? obj.selectedValue : value
                    }
                    setSelected={setValue}
                    label={obj.label}
                    items={obj.selectionList.map((ele) => ({
                      key: ele,
                      label: ele,
                    }))}
                  />
                }  */}
              </div>

              {/* <p className="flex  gap-4 mb-3">
                {" "}
                selectedValue :<span>{obj?.selectedValue}</span>
              </p> */}
            </div>
          }
        </>
      )}
    </>
  );
};

export default function JsonSidebarDetail({
  showObj,
  obj,
  handlejs,
  path,
  label,
  OgJson,
  handleAddjs,
  handleDeletejs,
}: any) {
  const [value, setValue] = useState(null);
  const [selectedTab, setselectedTab] = useState("Tabs");

  const handleInput = (e: any, i: any, key: any, type: any) => {
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  return (
    <div className=" flex max-h-[100%] w-full mt-3 flex-col gap-3 font-semibold p-2  text-sm">
      <span className="flex flex-col w-full">
        <span className="flex w-full justify-between">
          <p className="p-2 mt-2 text-black dark:text-white"> Properties</p>
          <span
            onClick={() => OgJson()}
            className="cursor-pointer rounded-lg px-3 mt-2 py-2 bg-[#0736C4] text-white mb-2 active:scale-95"
          >
            save
          </span>
        </span>

        <span className="mt-1 font-normal m-2 w-[100%] text-black dark:text-white">
          Label :
          <span className="text-[#6600ff] dark:text-[#c4b707] m-2 font-poppins w-full  ">
            {label}
          </span>
        </span>
      </span>
      <div className="scrollbar-none  overflow-y-scroll">
        {
          <div className="">
            {
              !Array.isArray(obj[showObj]) ? (
                obj &&
                showObj &&
                obj[showObj] &&
                Object.keys(obj[showObj]).map((ele) => {
                  if (
                    !Array.isArray(obj[showObj][ele]) &&
                    typeof obj[showObj][ele] !== "object"
                  ) {
                    return (
                      <p
                        style={{ display: ele === "label" ? "none" : "" }}
                        className="bg-[#F4F5FA]  dark:bg-[#0F0F0F] rounded-lg "
                      >
                        <div className="w-[100%]">
                          <TorusInput
                            variant="bordered"
                            label={ele}
                            labelColor="text-[#000000]/50"
                            borderColor="[#000000]/50"
                            outlineColor="torus-focus:ring-[#000000]/50"
                            placeholder=""
                            isDisabled={false}
                            onChange={(e: any) =>
                              handleInput(e, path, ele, "obj")
                            }
                            radius="lg"
                            width="xl"
                            height="xl"
                            textColor="text-[#000000] dark:text-[#FFFFFF]"
                            bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
                            value={obj[showObj][ele]}
                          />
                        </div>

                        {/* <input
                          className="border text-orange-500 "
                          type="text"
                          value={obj[showObj][ele]}
                          onChange={(e) =>
                            handleInput(e.target.value, path, ele, "obj")
                          }
                        /> */}
                      </p>
                    );
                  }
                  if (
                    Array.isArray(obj[showObj][ele]) ||
                    typeof obj[showObj][ele] === "object"
                  ) {
                    return (
                      <RenderDropdown
                        obj={obj[showObj][ele]}
                        item={ele}
                        path={path}
                        handlejs={handlejs}
                        showObj={showObj}
                      />
                    );
                  }
                })
              ) : (
                <RenderJsonArraySidebarDetail
                  obj={obj[showObj]}
                  showObj={showObj}
                  path={path}
                  handlejs={handlejs}
                  objs={obj}
                  handleAddjs={handleAddjs}
                  handleDeletejs={handleDeletejs}
                />
              )
              // showObj &&
              //   Object.keys(showObj).map((ele ,index) => {
              //     if (!Array.isArray(showObj[ele]))
              //       return (
              //         <p style={{ display: ele === "label" ? "none" : "" }} key={path + "."+ele}>

              //           {ele} :
              //            <input
              //             className="border text-blue-500 "
              //             type="text"
              //             defaultValue={showObj[ele]}
              //             onChange={(e) =>
              //               handleInput(e.target.value, path + "."+ele ,"", "arr" )
              //             }
              //           />
              //         </p>
              //       );
              //     else if (Array.isArray(showObj[ele]))
              //       return <RenderJsonArraySidebarDetail obj={showObj[ele]} />;
              //     else if (typeof showObj[ele] == "object")
              //       return (
              //         <p>
              //           {ele} : {showObj[ele].label}
              //         </p>
              //       );
              //   })
            }
          </div>
        }
      </div>
    </div>
  );
}

export const JsonSidebarIcon = memo(
  ({ obj, setShowObj, setPath, setLabel }: any) => {
    const [activeTab, setActiveTab] = useState<any>(null);

    return (
      <>
        <div className="max-w-full bg-white dark:bg-[#161616]   h-full overflow-y-scroll scrollbar-none flex flex-col mb-5 p-4 gap-5">
          {obj &&
            Object.keys(obj).map((ele, i) => {
              if (typeof obj[ele] == "object" && !Array.isArray(obj[ele])) {
                return (
                  <div key={i + ele} className="">
                    <span
                      className={
                        " flex items-center z-50 text-xs cursor-pointer gap-4" +
                        (activeTab === ele
                          ? " cursor-pointer  text-xs text-[#0073e6]"
                          : "text-black cursor-pointer")
                      }
                      onClick={() => {
                        setShowObj(ele);
                        setPath(ele);
                        setActiveTab(ele);
                      }}
                    >
                      <TorusToolTip
                        hoverContent={
                          iconArray.length > 0 &&
                          createElement(
                            iconArray[
                              Math.floor(Math.random() * iconArray.length)
                            ],
                            {
                              size: 20,
                              color: activeTab === ele ? "#E74C3C" : "#B2BABB",
                            }
                          )
                        }
                        tooltipFor="obj"
                        tooltipContent={obj[ele].label ? obj[ele].label : ele}
                        color={activeTab == ele ? "#6600ff" : "#09254D"}
                        setShowObj={setShowObj}
                        setActiveTab={setActiveTab}
                        setPath={setPath}
                        ele={ele}
                        setLabel={setLabel}
                      />
                    </span>
                  </div>
                );
              }
              if (Array.isArray(obj[ele])) {
                return (
                  <RenderJsonArraySidebarIcon
                    key={i + ele}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    obj={obj[ele]}
                    fg={ele}
                    setShowObj={setShowObj}
                    setPath={setPath}
                    setLabel={setLabel}
                    shuffledIcons={iconArray}
                  />
                );
              }
            })}
        </div>
      </>
    );
  }
);

export function FabricsSideBar({
  obj,
  handlejs,
  OgJson,
  handleAddjs,
  handleDeletejs,
}: any) {
  const [showObj, setShowObj] = useState();
  const [label, setLabel] = useState(null);

  const [path, setPath] = useState(null);
  return (
    <div className="flex h-[100%] w-full max-w-full flex-row overflow-hidden ">
      <div className="max-w-[40%] h-[450px] border-r   bg-white  dark:border-[#212121]">
        {
          <JsonSidebarIcon
            key={"iconBar"}
            showObj={showObj}
            setShowObj={setShowObj}
            obj={obj}
            setPath={setPath}
            setLabel={setLabel}
          />
        }
      </div>
      <div className="w-full max-w-[90%] bg-white dark:bg-[#161616]">
        <div className="h-[430px] relative w-full">
          {
            <JsonSidebarDetail
              showObj={showObj}
              obj={obj}
              handlejs={handlejs}
              path={path}
              label={label}
              OgJson={OgJson}
              handleAddjs={handleAddjs}
              handleDeletejs={handleDeletejs}
            />
          }
        </div>
      </div>
    </div>
  );
}

const RenderObject = ({
  obj,
  handlejs,
  OgJson,
  setDupJson,
  handleAddjs,
  handleDeletejs,
}: any) => {
  return (
    <>
      {
        <FabricsSideBar
          obj={obj}
          handlejs={handlejs}
          OgJson={OgJson}
          setDupJson={setDupJson}
          handleAddjs={handleAddjs}
          handleDeletejs={handleDeletejs}
        />
      }
    </>
  );
};

// This will be the main render function which can be called from outside to list datas
export const RenderJson = memo(({ json, functionality }: any) => {
  const [dupJson, setDupJson] = useState<any>(null);
  const [convertedJson, setConvertedJson] = useState<any>(null);

  function convertJson(obj: any) {
    const converted: any = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        converted[key.replace(/\//g, ".")] = convertJson(obj[key]);
      } else if (Array.isArray(obj[key])) {
        converted[key.replace(/\//g, ".")] = obj[key];
      } else {
        converted[key.replace(/\//g, ".")] = obj[key];
      }
    }

    return converted;
  }

  // function replaceKeys(obj) {
  //   if (Array.isArray(obj)) {
  //     return obj.map((item) => replaceKeys(item));
  //   } else if (typeof obj === "object" && obj !== null) {
  //     let newObj = {};
  //     for (let key in obj) {
  //       if (obj.hasOwnProperty(key)) {
  //         let newKey = key.replace(/\//g, ".");
  //         newObj[newKey] = replaceKeys(obj[key]);
  //       }
  //     }
  //     return newObj;
  //   } else {
  //     return obj;
  //   }
  // }

  const OgJson = () => {
    const jss = convertJson(dupJson);
    const newjson = JSON.stringify(jss, null, 2);
    let newjs: any = unflatten(jss);
    setConvertedJson(newjs);
    functionality(newjs);
  };

  const handlejs = (e: any, i: any, key: any, type: any, jskey: any) => {
    if (type == "obj") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [i]: {
            ...prev[i],
            [key]: e,
          },
        };
      });
    }
    if (type == "arr-0" || type == "arr-1" || type == "arr") {
      if (i) {
        const js = structuredClone(dupJson);
        _.set(js, i, e);
        setDupJson(js);
      }
    }

    if (type == "dropdown" || type == "boolean") {
      if (i) {
        const js = structuredClone(dupJson);
        _.set(js, i, e);
        setDupJson(js);
      }
    }
  };

  const handleAddjs = (
    path: any,
    key: any,
    value: any,
    type: any,
    i: any,
    selectedType: any
  ) => {
    console.log(path, key, value, type, i, selectedType, "handleAddjs");
    if (type == "obj" && selectedType === "input") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: {
            ...prev[path],
            [key]: value,
          },
        };
      });
    } else if (type == "obj" && selectedType === "boolean") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: {
            ...prev[path],
            [key]: {
              label: key,
              type: "boolean",
              selectedValue: false,
              selectionList: [true, false],
            },
          },
        };
      });
    } else if (type == "obj" && selectedType === "dropdown") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: {
            ...prev[path],
            [key]: {
              label: key,
              type: "dropdown",
              selectedValue: "",
              selectionList: value,
            },
          },
        };
      });
    } else if (type === "arr-1" && selectedType === "input") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: prev[path].map((item: any, index: number) => {
            if (index === i) {
              return {
                ...item,
                [key]: value,
              };
            } else {
              return item;
            }
          }),
        };
      });
    } else if (type === "arr-1" && selectedType === "boolean") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: prev[path].map((item: any, index: number) => {
            if (index === i) {
              return {
                ...item,
                [key]: {
                  label: key,
                  type: "boolean",
                  selectedValue: false,
                  selectionList: [true, false],
                },
              };
            } else {
              return item;
            }
          }),
        };
      });
    } else if (type == "arr-1" && selectedType === "dropdown") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: prev[path].map((item: any, index: number) => {
            if (index === i) {
              return {
                ...item,
                [key]: {
                  label: key,
                  type: "dropdown",
                  selectedValue: "",
                  selectionList: value,
                },
              };
            } else {
              return item;
            }
          }),
        };
      });
    } else if (type === "arr-0" && selectedType === "object") {
      setDupJson((prev: any) => {
        return {
          ...prev,
          [path]: [
            ...prev[path],
            {
              label: key,
            },
          ],
        };
      });
    }
  };

  const handleDeletejs = (path: any, type: any, label: any) => {
    if (type === "arr-1") {
      setDupJson((prev: any) => {
        const updatedObj = _.cloneDeep(prev);
        const events = _.get(updatedObj, path);
        _.remove(events, (event: any) => event.label === label);
        return updatedObj;
      });
    } else if (type === "obj") {
      console.log(path, "bjp");
      const js = structuredClone(dupJson);
      _.unset(js, path);
      setDupJson(js);
    } else {
      const js = structuredClone(dupJson);
      const pathsToDelete = Object.keys(js).filter(
        (key) => key == path || key.startsWith(path + "/")
      );
      pathsToDelete.forEach((key) => {
        _.unset(js, key);
      });
      setDupJson(js);
    }
  };

  function denormalizeJson(
    obj: any,
    prefix = "",
    result: any = {},
    originalObj: any
  ) {
    const copy = JSON.parse(JSON.stringify(obj));
    for (let key in copy) {
      if (copy.hasOwnProperty(key)) {
        let newKey = prefix ? `${prefix}/${key}` : key;
        if (
          typeof copy[key] === "object" &&
          copy[key] !== null &&
          !Array.isArray(copy[key])
        ) {
          if (
            !(copy[key].hasOwnProperty("type") && copy[key].type === "dropdown")
          ) {
            if (copy[key] === originalObj) {
              return result; // Return early if the object being processed is the same as the original object
            }
            result[newKey] = copy[key];
            denormalizeJson(copy[key], newKey, result, originalObj);
            delete copy[key];
          }
        } else if (
          Array.isArray(copy[key]) &&
          typeof copy[key][0] === "object"
        ) {
          result[newKey] = copy[key];
          copy[key].forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              const nestedKey = `${newKey}/${index}`;
              denormalizeJson(item, nestedKey, result, originalObj);
            } else {
              result[newKey][index] = item;
            }
          });
          delete copy[key];
        } else {
          if (!prefix) {
            result[copy["label"]] = copy;
          }
        }
      }
    }
    return result;
  }

  const haandledenormalize = () => {
    if (json) {
      const denormalized = denormalizeJson(json, "", {}, json);
      console.log(denormalized, "denormalized");
      setDupJson(structuredClone(denormalized));
    }
  };

  useEffect(() => {
    haandledenormalize();
  }, [json]);

  return (
    <div className="w-full  ">
      {dupJson && Object.keys(dupJson).length > 0 && (
        <div className="">
          {
            <>
              <RenderObject
                obj={dupJson}
                handlejs={handlejs}
                OgJson={OgJson}
                setDupJson={setDupJson}
                handleAddjs={handleAddjs}
                handleDeletejs={handleDeletejs}
              />
            </>
          }
        </div>
      )}
    </div>
  );
});
