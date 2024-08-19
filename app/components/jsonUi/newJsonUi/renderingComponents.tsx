import React, { memo, useEffect, useState } from "react";
import TorusDialog from "../../torusComponents/torusdialogmodal";
import { PlusIcon } from "../../../constants/svgApplications";
import { AddModalContentType } from "./AddModalContent";
import { CiTrash } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  MdBackupTable,
  MdDataObject,
  MdExpandLess,
  MdOutlineDataArray,
} from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { SiDatabricks } from "react-icons/si";
import { TfiRulerPencil } from "react-icons/tfi";
import { PiCodepenLogoLight } from "react-icons/pi";
import { GoLink } from "react-icons/go";
import { LiaCreditCardSolid } from "react-icons/lia";
import { SlSocialDropbox } from "react-icons/sl";
import TorusInput from "../../torusComponents/torusInput";
import TorusDropDown from "../../torusComponents/torusDropdown";
import TorusButton from "../../torusComponents/torusButton";
import TorusSwitch from "../../torusComponents/torusSwitch";
import TorusToolTip from "../../torusComponents/torusTooltip";

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

const RenderDropdown = ({
  obj,
  path,
  handlejs,
  item,
  showObj,
  handleDeletejs,
}: any) => {
  const [value, setValue] = useState(null);
  const [data, setData] = useState<null | any>(null);
  const [bool, setBool] = useState();

  const handleDropdownClick = (event: any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    obj && setData(Object.keys(obj).filter((item) => item == "selectedValue"));
    if (obj && obj?.type == "boolean") {
      setBool(obj?.selectedValue);
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

  useEffect(() => {
    if (data !== null && bool !== undefined)
      handlejs(bool, path + "." + item + "." + data, data, "boolean", showObj);
  }, [bool]);

  const handleDropdownChange = (e: any) => {
    setValue(e);

    handlejs(e, path + "." + item + "." + data, data, "dropdown", showObj);
  };

  return (
    <>
      {obj && (obj.type == "dropdown" || obj.type == "boolean") && (
        <>
          {
            <div className="m-2 flex w-full gap-2 bg-gray-200">
              <div className="my-2 flex w-full flex-col gap-1 rounded-lg bg-white">
                {obj?.selectedValue.length > 0 && (
                  <span className="ml-2 mt-2 text-xs text-gray-400">
                    {obj.label}
                  </span>
                )}
                {obj.type == "dropdown" ? (
                  <div>
                    <TorusDropDown
                      key={path + "." + item + "." + data}
                      renderEmptyState={() => "No Items..."}
                      classNames={{
                        buttonClassName: `bg-white dark:bg-[#161616] w-[105%] h-[40px] text-black dark:text-white mt-2`,
                        listBoxClassName:
                          "bg-white dark:bg-[#161616] text-black dark:text-white",
                      }}
                      label={obj?.selectedValue.length > 0 && obj.label}
                      title={
                        <div className="flex w-[100%] flex-row  items-center">
                          <div
                            className={
                              "font-sfpro w-[80%] whitespace-nowrap tracking-tighter text-black dark:text-white xl:text-sm xl:font-normal 3xl:text-sm"
                            }
                          >
                            {obj?.selectedValue.length > 0
                              ? Array.from(obj?.selectedValue).join(",")
                              : obj.label}
                          </div>
                          <div className="w-[10%]">
                            <IoIosArrowDown className="text-black dark:text-white" />
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
                    <TorusButton
                      Children={`Delete`}
                      size={"xs"}
                      btncolor={"#0736C4"}
                      radius={"lg"}
                      color={"#f00"}
                      gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                      // height={"md"}
                      borderColor={"3px solid #0736C4"}
                      startContent={<CiTrash color="white" />}
                      fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                      onPress={() => handleDeletejs(path + "." + item, "obj")}
                    />
                  </div>
                ) : obj.type == "boolean" ? (
                  <div className="flex w-full items-center justify-between p-2 pl-4">
                    <span className="text-sm text-gray-800">{obj?.label}</span>
                    <div className="">
                      <TorusSwitch
                        skey={path + "." + item + "." + data}
                        isChecked={bool}
                        setIsChecked={setBool}
                      />
                      <TorusButton
                        Children={`Delete`}
                        size={"xs"}
                        btncolor={"#0736C4"}
                        radius={"lg"}
                        color={"#f00"}
                        gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                        // height={"md"}
                        borderColor={"3px solid #0736C4"}
                        startContent={<CiTrash color="white" />}
                        fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        onPress={() => handleDeletejs(path + "." + item, "obj")}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          }
        </>
      )}
    </>
  );
};

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

const RenderJsonArraySidebarIcon = ({
  obj,
  setShowObj,
  setPath,
  fg,
  activeTab,
  setActiveTab,
  setLabel,
  shuffledIcons,
  setCheckActivestatus,
  setExpandedItem,
}: any) => {
  return (
    <>
      <div
        className={
          "w-[100%]  flex z-50 items-center gap-4 cursor-pointer" +
          (activeTab == fg
            ? "text-xs  cursor-pointer text-[#6600ff]"
            : " text-gray-800 cursor-pointer")
        }
      >
        <TorusToolTip
          hoverContent={<MdOutlineDataArray size={20} />}
          tooltipFor="arr"
          tooltipContent={fg} // obj.map((ele) => ele?.label ? ele?.label : fg
          color={activeTab == fg ? "#6600ff" : "#09254D"}
          setShowObj={setShowObj}
          setActiveTab={setActiveTab}
          setPath={setPath}
          fg={fg}
          obj={obj}
          setLabel={setLabel}
          setCheckActivestatus={setCheckActivestatus}
          setExpandedItem={setExpandedItem}
        />
      </div>
    </>
  );
};

const JsonSidebarIcon = ({
  obj,
  setShowObj,
  setPath,
  setLabel,
  checkActivestatus,
  setCheckActivestatus,
  setExpandedItem,
}: any) => {
  const [activeTab, setActiveTab] = useState<null | any>(null);

  return (
    <>
      <div className="max-w-full relative bg-white dark:bg-[#161616]   h-full overflow-y-scroll scrollbar-none flex flex-col mb-5 p-4 gap-5">
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
                        : "text-gray-100 cursor-pointer")
                    }
                    onClick={() => {
                      setShowObj(ele);
                      setPath(ele);
                      setActiveTab(ele);
                      setCheckActivestatus(obj[activeTab]);
                    }}
                  >
                    <TorusToolTip
                      hoverContent={<MdDataObject size={20} />}
                      tooltipFor="obj"
                      tooltipContent={ele} // obj.map((ele) => ele?.label ? ele?.label : fg
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
                  setCheckActivestatus={setCheckActivestatus}
                  setExpandedItem={setExpandedItem}
                />
              );
            }
          })}
      </div>
    </>
  );
};

function JsonSidebarDetail({
  showObj,
  obj,
  handlejs,
  path,
  label,
  OgJson,
  handleAddjs,
  handleDeletejs,
  checkActivestatus,
  expandedItem,
  setExpandedItem,
}: any) {
  const [value, setValue] = useState(null);

  const handleInput = (e: any, i: any, key: any, type: any) => {
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  return (
    <div className="relative mt-3 flex h-[100%]  flex-col gap-3 p-2 text-sm  font-semibold">
      <span className="flex h-[20%]  flex-col">
        <span className="flex justify-between">
          <p className="mt-2 p-2  text-black dark:text-white"> Properties</p>
          <span
            onClick={() => OgJson()}
            className="mb-2 mt-2  cursor-pointer rounded-lg bg-[#0736C4] px-1  py-2 text-white active:scale-95"
          >
            save
          </span>
        </span>
        {label && (
          <span className="m-2 mt-1 w-[100%] font-normal text-black dark:text-white">
            Label :
            <span className="m-2 w-full font-poppins text-[#6600ff] dark:text-[#c4b707]  ">
              {label}
            </span>
          </span>
        )}
      </span>
      <div
        style={{
          height: "inherit",
        }}
        className="scrollbar-none  overflow-y-auto"
      >
        {obj && showObj && obj[showObj] && (
          <div className="">
            {!Array.isArray(obj[showObj]) ? (
              <div className="flex flex-col gap-3">
                {
                  <div className="  flex h-[100%] w-[40%] items-center">
                    <TorusDialog
                      key={"TableDelete"}
                      triggerElement={
                        <TorusButton
                          Children={`Add`}
                          size={"xs"}
                          btncolor={"#0736C4"}
                          radius={"lg"}
                          color={"#ffffff"}
                          gap={"py-[0.2rem] px-[0.2rem]"}
                          // height={"md"}
                          borderColor={"3px solid #0736C4"}
                          startContent={<PlusIcon />}
                          fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        />
                      }
                      classNames={{
                        modalClassName:
                          "w-full flex justify-center items-center  ",
                        dialogClassName:
                          "w-[30vw] p-3 h-full rounded-lg flex-col bg-white",
                      }}
                      title={"Add"}
                      message={"Edit"}
                    >
                      {({ close }: any) => (
                        <AddModalContentType
                          obj={obj}
                          showObj={showObj}
                          close={close}
                          handleAddjs={handleAddjs}
                          type={"obj"}
                        />
                      )}
                    </TorusDialog>
                    <TorusButton
                      Children={`Delete`}
                      size={"xs"}
                      btncolor={"#0736C4"}
                      radius={"lg"}
                      color={"#f00"}
                      gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                      // height={"md"}
                      borderColor={"3px solid #0736C4"}
                      startContent={<CiTrash color="white" />}
                      fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                      onPress={() => handleDeletejs(path)}
                    />
                  </div>
                }
                <div>
                  {obj &&
                    showObj &&
                    obj[showObj] &&
                    Object.keys(obj[showObj]).map((ele, j) => {
                      if (
                        !Array.isArray(obj[showObj][ele]) &&
                        typeof obj[showObj][ele] !== "object"
                      ) {
                        return (
                          <p
                            key={j}
                            style={{
                              display: ele === "label" ? "none" : "",
                            }}
                            className="rounded-lg bg-[#F4F5FA]  px-2 dark:bg-[#0F0F0F] "
                          >
                            <div className="w-[100%]">
                              <TorusInput
                                key={path}
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
                              <TorusButton
                                Children={`Delete`}
                                size={"xs"}
                                btncolor={"#0736C4"}
                                radius={"lg"}
                                color={"#f00"}
                                gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                                // height={"md"}
                                borderColor={"3px solid #0736C4"}
                                startContent={<CiTrash color="white" />}
                                fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                                onPress={() =>
                                  handleDeletejs(path + "." + ele, "obj")
                                }
                              />
                            </div>
                          </p>
                        );
                      }
                      if (
                        Array.isArray(obj[showObj][ele]) ||
                        typeof obj[showObj][ele] === "object"
                      ) {
                        return (
                          <RenderDropdown
                            key={ "dropdown" + j}
                            obj={obj[showObj][ele]}
                            item={ele}
                            path={path}
                            handlejs={handlejs}
                            showObj={showObj}
                            handleDeletejs={handleDeletejs}
                          />
                        );
                      }
                    })}
                </div>
              </div>
            ) : (
              <RenderJsonArraySidebarDetail
                obj={obj[showObj]}
                showObj={showObj}
                path={path}
                handlejs={handlejs}
                objs={obj}
                handleAddjs={handleAddjs}
                handleDeletejs={handleDeletejs}
                checkActivestatus={checkActivestatus}
                setExpandedItem={setExpandedItem}
                expandedItem={expandedItem}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const RenderJsonArraySidebarDetail = ({
  obj,
  showObj,
  path,
  handlejs,
  objs,
  handleAddjs,
  handleDeletejs,
  expandedItem,
  setExpandedItem,
}: any) => {
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
      setExpandedItem(expandedItem.filter((k: any) => k !== key));
    } else {
      setExpandedItem([...expandedItem, key]);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="flex h-full w-2/5 items-center mb-2 gap-2">
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
                // height={"md"}
                borderColor={"3px solid #0736C4"}
                startContent={<PlusIcon />}
                fontStyle={"text-sm font-medium text-[#FFFFFF]"}
              />
            }
            classNames={{
              modalClassName: " w-full flex justify-center items-center  ",
              dialogClassName:
                " w-[30vw] p-3 h-full rounded-lg flex-col bg-white",
            }}
            title={"Add"}
            message={"Edit"}
          >
            {({ close }: any) => (
              <AddModalContentType
                obj={obj}
                showObj={showObj}
                close={close}
                handleAddjs={handleAddjs}
                type="arr-0"
              />
            )}
          </TorusDialog>
          <TorusButton
            Children={`Delete`}
            size={"xs"}
            btncolor={"#0736C4"}
            radius={"lg"}
            color={"#f00"}
            gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
            // height={"md"}
            borderColor={"3px solid #0736C4"}
            startContent={<CiTrash color="white" />}
            fontStyle={"text-sm font-medium text-[#FFFFFF]"}
            onPress={() => handleDeletejs(path)}
          />
        </div>
      </div>
      <div
        className={`grid ${
          obj.length > 1 ? "grid-cols-2" : "grid-cols-1"
        } gap-2`}
      >
        {obj &&
          obj.map((ele: any, index: number) => {
            const isExpanded = expandedItem.includes(ele?.label);
            return (
              <div
                key={index}
                className={
                  " mb-2 w-[100%] rounded-lg bg-[#F4F5FA]  text-black  dark:bg-[#0F0F0F]   dark:text-white"
                }
              >
                <p
                  className="my-1  flex cursor-pointer items-center gap-2 p-2"
                  onClick={(e) => {
                    setShowAccordianItem(ele);
                    e.stopPropagation();
                    e.preventDefault();
                    toggleKey(ele?.label);
                  }}
                >
                  <span className="flex justify-end">
                    {isExpanded ? (
                      <MdExpandLess color="gray" size={20} />
                    ) : (
                      <IoIosArrowForward color="gray" size={20} />
                    )}
                  </span>
                  <p>{ele?.label} </p>
                </p>

                {isExpanded && (
                  <div className="mb-2  p-2">
                    <>
                      <div className="flex h-full w-2/5 items-center mb-2 gap-2">
                        <TorusDialog
                          key={"TableDelete"}
                          triggerElement={
                            <TorusButton
                              Children={`Add`}
                              size={"xs"}
                              btncolor={"#0736C4"}
                              radius={"lg"}
                              color={"#ffffff"}
                              gap={"py-[0.2rem] px-[0.2rem] mb-[0.5rem]"}
                              // height={"md"}
                              borderColor={"3px solid #0736C4"}
                              startContent={<PlusIcon />}
                              fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                            />
                          }
                          classNames={{
                            modalClassName:
                              " w-[40%] h-[40%]  flex justify-center items-center  ",
                            dialogClassName:
                              " w-full h-full rounded-lg flex-col bg-white",
                          }}
                          title={"Add"}
                          message={"Edit"}
                        >
                          {({ close }: any) => (
                            <AddModalContentType
                              obj={obj}
                              showObj={showObj}
                              close={close}
                              handleAddjs={handleAddjs}
                              type="arr-1"
                              path={index}
                            />
                          )}
                        </TorusDialog>
                        <TorusButton
                          Children={`Delete`}
                          size={"xs"}
                          btncolor={"#0736C4"}
                          radius={"lg"}
                          color={"#f00"}
                          gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                          // height={"md"}
                          borderColor={"3px solid #0736C4"}
                          startContent={<CiTrash color="white" />}
                          fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                          onPress={() =>
                            handleDeletejs(path, "arr-1", ele.label)
                          }
                        />
                      </div>
                    </>
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
                              <p
                                className="mt-[-25px] flex  flex-col "
                                key={inds}
                              >
                                <TorusInput
                                  key={inds}
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
                                <TorusButton
                                  Children={`Delete`}
                                  size={"xs"}
                                  btncolor={"#0736C4"}
                                  radius={"lg"}
                                  color={"#f00"}
                                  gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                                  // height={"md"}
                                  borderColor={"3px solid #0736C4"}
                                  startContent={<CiTrash color="white" />}
                                  fontStyle={
                                    "text-sm font-medium text-[#FFFFFF]"
                                  }
                                  onPress={() =>
                                    handleDeletejs(
                                      path + "." + index + "." + item,
                                      "obj"
                                    )
                                  }
                                />
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
                                  key={"dropdown" + inds}
                                  obj={objs[showObj][index][item]}
                                  item={item}
                                  path={path + "." + index}
                                  handlejs={handlejs}
                                  showObj={showObj}
                                  handleDeletejs={handleDeletejs}
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
      </div>
    </>
  );
};

function FabricsSideBar({
  obj,
  handlejs,
  OgJson,
  setDupJson,
  handleAddjs,
  handleDeletejs,
}: any) {
  const [showObj, setShowObj] = useState();
  const [label, setLabel] = useState(null);
  const [checkActivestatus, setCheckActivestatus] = useState(null);
  const [expandedItem, setExpandedItem] = useState([]);

  const [path, setPath] = useState(null);

  return (
    <div className="flex h-[100%] w-full max-w-full flex-row overflow-hidden ">
      <div
        style={{
          height: "inherit",
        }}
        className="relative border-r bg-white dark:border-[#212121]"
      >
        {
          <JsonSidebarIcon
            key={"iconBar"}
            showObj={showObj}
            setShowObj={setShowObj}
            obj={obj}
            setPath={setPath}
            setLabel={setLabel}
            setCheckActivestatus={setCheckActivestatus}
            checkActivestatus={checkActivestatus}
            setExpandedItem={setExpandedItem}
          />
        }
      </div>
      <div className=" w-full max-w-[90%] bg-white dark:bg-[#161616]">
        <div className=" h-full w-full relative   ">
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
              checkActivestatus={checkActivestatus}
              setExpandedItem={setExpandedItem}
              expandedItem={expandedItem}
            />
          }
        </div>
      </div>
    </div>
  );
}

export const RenderObject = ({
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
