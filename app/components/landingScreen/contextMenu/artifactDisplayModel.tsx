import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input } from "react-aria-components";
import { Breadcrumbs, Breadcrumb, Link } from "react-aria-components";
import { IoCloseOutline } from "react-icons/io5";
import CatalogAccordian from "./catalogAccordian";
import TorusToast from "../../torusComponents/torusToast";
import { toast } from "react-toastify";
import {
  DataFabric,
  MoveToIcon,
  ProcessFabric,
  SecurityFabric,
  UserFabric,
} from "../../../constants/svgApplications";
import { RiHome5Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { AxiosService } from "../../../../lib/utils/axiosService";
import TorusDropDown from "../../torusComponents/torusDropdown";
import TorusPopOver from "../../torusComponents/torusPopover";

const ArtifactDisplayModal = ({
  fabric = "df",
  sourceKeyPrefix,
  version,
  artifactName,
  closeParent,
}: any) => {
  const [projectCollectionName, setProjectCollectionName] = useState(null);
  const [artifactCollectionName, setArtifactCollectionName] = useState(null);
  const [newArtifactValue, setNewArtifactValue] = useState("Untitled 1");
  const [newArtifactNameValidation, setNewArtifactNameValidation] =
    useState(false);
  const [newArtifact, setNewArtifact] = useState(false);
  const [selectedTkey, setSelectedTkey] = useState("FRK");
  const [selectedArtifactGroup, setSelectedArtifactGroup] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [wordLength, setWordLength] = useState(0);
  const [artifactsList, setArtifactsList] = useState([]);
  const [inputchange, setInputchange] = useState<null | any>(null);

  const [selectedFabric, setSelectedFabric] = useState(fabric);
  const [selectedArtifact, setSelectedArtifact] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [cataLogListWithArtifactGroup, setCataLogListWithArtifactGroup] =
    useState({
      FRK: [],
      CRK: [],
      TFRK: [],
    });

  const accordionItems = useMemo(() => {
    return [
      {
        title: "My Artifacts",
        type: "categery",
        id: "FRK",
        content: cataLogListWithArtifactGroup?.["FRK"] ?? [],
      },
      {
        title: "Shared with me",
        type: "categery",
        id: "TFRK",
        content: cataLogListWithArtifactGroup?.["TFRK"] ?? [],
      },
      {
        title: "Purchased",
        type: "categery",
        id: "CRK",

        content: cataLogListWithArtifactGroup?.["CRK"] ?? [],
      },
    ];
  }, [cataLogListWithArtifactGroup]);

  const getAllCatalogWithArtifactGroup = async (fabric: string) => {
    try {
      const BASE_URL = `http://localhost:3002/vpt/getAllCatalogWithArtifactGroup`;
      let res = await fetch(`${BASE_URL}/?fabric=${fabric}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCatalogWithArtifactGroup = useCallback(async (fabric: string) => {
    return await getAllCatalogWithArtifactGroup(fabric).then((res) => res.data);
  }, []);

  useEffect(() => {
    handleCatalogWithArtifactGroup(fabric.toUpperCase()).then((data) => {
      setCataLogListWithArtifactGroup(data);
    });
  }, []);

  const artifactList = async (
    tKey: string,
    client: string,
    project: string,
    fabrics: string,
    saveKey: string,
    wantVersionList = false
  ) => {
    try {
      const BASE_URL = `http://localhost:3002/${
        fabrics === "PF"
          ? "pf-pfd"
          : fabrics === "DF"
          ? "df-erd"
          : fabrics === "UF"
          ? "uf-sld"
          : "sf"
      }`;
      const response = await fetch(
        `${BASE_URL}/${
          wantVersionList ? "artifactListWithVersion" : "artifactList"
        }?project=${project}&tKey=${tKey}&client=${client}&fabrics=${fabrics.toUpperCase()}&saveKey=${saveKey}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // toast.dismiss(loadingToastId);
      if (response.ok && data) {
        return data;
      } else {
        //throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIntialLoad = async (
    selectedTkey: string,
    client: string = "ABC",
    selectedFabric: string,
    applications: string,
    selectedArtifactGroup: string
  ) => {
    try {
      const response = await artifactList(
        selectedTkey,
        client,
        applications,
        selectedFabric,
        JSON.stringify([
          "TCL",
          selectedTkey,
          selectedFabric.toUpperCase(),
          applications,
          selectedArtifactGroup,
        ]),
        true
      );
      if (response && response?.status === 200) {
        setArtifactsList(response.data);
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
          text: `Cannot get artifacts details`,
          closeButton: false,
        } as any
      );
    }
  };

  const handleApplicationName = async (item: any) => {
    try {
      setSelectedArtifact("");
      setSelectedVersion("");
      setSelectedTkey(item?.tKey);
      setSelectedProject(item?.catalog);
      setSelectedArtifactGroup(item?.artifactGroup);

      handleIntialLoad(
        item?.tKey,
        "ABC",
        selectedFabric,
        item?.catalog,
        item?.artifactGroup
      ).catch((err: any) => {
        throw err;
      });
    } catch (err) {
      toast(
        <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
        {
          type: "error",
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          title: "Error",
          text: `Cannot set selected Application`,
          closeButton: false,
        } as any
      );
    }
  };

  const handleAccordionContentToggle = (item: any) => {
    // if (selectedVersion) handleArtifactLock(false);
    handleApplicationName(item);
    setProjectCollectionName(item);
    setArtifactCollectionName(null);
  };

  const handleMoveArtifact = async () => {
    const targetKeyPrefix = `TCL:${selectedTkey}:${selectedFabric.toUpperCase()}:${selectedProject}:${selectedArtifactGroup}`;
    try {
      const res = await AxiosService.post(`tp/moveArtifact`, {
        sourceKeyPrefix,
        targetKeyPrefix,
        artifactName,
        version,
      });
      if (res.status === 201) {
        handleIntialLoad(
          selectedTkey,
          "ABC",
          selectedFabric,
          selectedProject,
          selectedArtifactGroup
        );
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Success",
            text: `Artifact moved successfully`,
            closeButton: false,
          } as any
        );
      } else {
        toast(
          <TorusToast setWordLength={setWordLength} wordLength={wordLength} />,
          {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            title: "Error",
            text: `Something went wrong`,
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
          text: `Cannot move artifact`,
          closeButton: false,
        } as any
      );
    }
  };

  const fabrics = [
    {
      name: "df",
      icon: (
        <DataFabric
          fill="#000000"
          isSelected={selectedFabric == "df"}
          width="1.25vw"
          height="1.25vw"
        />
      ),
    },
    {
      name: "uf",
      icon: (
        <UserFabric
          fill="#000000"
          isSelected={selectedFabric == "uf"}
          width="1.25vw"
          height="1.25vw"
        />
      ),
    },
    {
      name: "pf",
      icon: (
        <ProcessFabric
          fill="#000000"
          isSelected={selectedFabric == "pf"}
          width="1.25vw"
          height="1.25vw"
        />
      ),
    },
    {
      name: "sf",
      icon: (
        <SecurityFabric
          fill="#000000"
          isSelected={selectedFabric == "sf"}
          width="1.25vw"
          height="1.25vw"
        />
      ),
    },
  ];

  return (
    <div>
      {selectedFabric && (
        <>
          <TorusPopOver
            parentHeading={
              <Button
                className={
                  "outline-none flex gap-[0.5vw] items-center text-[0.72vw] z-50"
                }
              >
                <MoveToIcon /> Move to
              </Button>
            }
            children={({ close }: any) => {
              // closeParent();
              return (
                <div
                  className={`${
                    selectedFabric === "events"
                      ? "h-[400px] w-[380px]"
                      : "h-[65.27vh]  w-[36.61vw] "
                  } mt-[2.5%] flex flex-col justify-between rounded-lg border border-[#E5E9EB] bg-white dark:border-[#212121] dark:bg-[#161616] 2xl:h-[580px] 2xl:w-[700px]`}
                >
                  {selectedFabric !== "events" ? (
                    <>
                      <div className="flex h-[10%] w-[100%] flex-row border-b border-[#E5E9EB] p-2 dark:border-[#212121]">
                        <div className="flex w-full items-center justify-start">
                          <p className="px-2 text-start text-[12px] font-semibold text-black dark:text-white">
                            Library
                          </p>
                        </div>

                        <div className="flex w-full items-center justify-center gap-2">
                          <Input
                            placeholder="Search"
                            className={
                              "flex h-[1.77vw] w-[21.56vw] items-center justify-center rounded-md border border-gray-300 bg-[#F4F5FA]    text-sm text-black dark:border-[#212121] dark:bg-[#0F0F0F] dark:text-white"
                            }
                          />
                        </div>

                        <div className="flex w-full flex-row  items-center justify-end gap-2 ">
                          {/* <TorusButton
                              isDisabled={
                                selectedVersion && selectedFabric == "UF"
                                  ? false
                                  : true
                              }
                              // onPress={() => {
                              //   selectedVersion &&
                              //     selectedFabric == "UF" &&
                              //     console.log("sjs");
  
                              //   //   handleTabChange("events");
                              // }}
                              Children={
                                <TbSquareRoundedPlus2 className="h-[1.22vw] w-[1.22vw] text-white" />
                              }
                              buttonClassName="flex cursor-pointer items-center justify-center rounded-md bg-[#0736C4]  w-[1.77vw] h-[1.77vw]"
                            /> */}

                          <span
                            className="flex cursor-pointer items-center justify-center rounded-md  transition-all duration-200  "
                            onClick={() => {
                              close();

                              setProjectCollectionName(null);

                              setArtifactCollectionName(null);

                              setNewArtifactValue("");

                              setNewArtifactNameValidation(
                                !newArtifactNameValidation
                              );
                            }}
                          >
                            <IoCloseOutline
                              size={18}
                              className="  text-black dark:text-white"
                            />
                          </span>
                        </div>
                      </div>

                      <div className=" flex h-[52.03vh] w-full items-center  justify-center   ">
                        <div className="flex h-full w-1/3 flex-col items-center justify-center gap-1 border-r border-[#E5E9EB] dark:border-[#212121]">
                          <div className="flex h-[50vh] w-[100%] overflow-y-scroll">
                            <div className="flex flex-col px-2 pt-1 gap-2 items-center">
                              {fabrics.map((fab) => (
                                <div
                                  className={`${
                                    selectedFabric == fab.name
                                      ? "bg-[#F4F5FA] rounded-md"
                                      : ""
                                  } p-2`}
                                >
                                  {fab.icon}
                                </div>
                              ))}
                            </div>
                            <hr className="w-[1px] h-[50vh] bg-black/15" />
                            <div>
                              <CatalogAccordian
                                items={accordionItems}
                                onSelectionChange={handleAccordionContentToggle}
                                selectedTkey={selectedTkey}
                                selectedProject={selectedProject}
                                selectedArtifactGroup={selectedArtifactGroup}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex h-[100%] w-2/3 scroll-m-1  flex-col items-center justify-center gap-1 ">
                          {/* Breadcrumbs need to bring again */}
                          <div className="flex h-[2.22vh] w-full items-center justify-start p-2 dark:bg-[#161616]">
                            <Breadcrumbs
                              isDisabled
                              className="flex flex-row gap-2 text-xs"
                            >
                              {"ABC" && (
                                <>
                                  <Breadcrumb>
                                    <Link className="flex flex-row items-center justify-center gap-1 text-[0.72vw] text-black dark:text-white">
                                      <RiHome5Line size={14} />
                                      ABC
                                      <IoIosArrowForward />
                                    </Link>
                                  </Breadcrumb>

                                  {selectedProject && (
                                    <>
                                      <Breadcrumb>
                                        <Link className="flex flex-row items-center justify-center gap-1 text-[0.72vw]">
                                          {selectedProject}

                                          <IoIosArrowForward />
                                        </Link>
                                      </Breadcrumb>

                                      <Breadcrumb>
                                        <Link className="flex  flex-row items-center justify-center gap-1 text-[0.72vw]">
                                          {selectedArtifactGroup}

                                          <IoIosArrowForward />
                                        </Link>
                                      </Breadcrumb>

                                      {selectedArtifact && (
                                        <Breadcrumb>
                                          <Link className="flex  flex-row items-center justify-center gap-1 text-[0.72vw]">
                                            {selectedArtifact}
                                          </Link>
                                        </Breadcrumb>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </Breadcrumbs>
                          </div>

                          <div className="flex h-[290px] w-full flex-col items-center justify-center  transition-all duration-300 ">
                            {newArtifact === true ? (
                              <div className="flex h-[26%] w-full flex-col items-center justify-center border-b border-t border-[#E5E9EB]  p-3 dark:border-[#212121]  ">
                                <div className="flex w-full flex-row items-start justify-center gap-2 ">
                                  <div className="flex h-full w-[65%] items-center justify-center ">
                                    <Input
                                      defaultValue={newArtifactValue}
                                      placeholder="Enter artifact name"
                                      className="flex h-[29.33px]  w-[199.34px] items-center justify-center rounded-md bg-[#F4F5FA] p-2 text-sm text-black dark:bg-[#0F0F0F] dark:text-white"
                                      onChange={(e) => {
                                        setNewArtifactValue(e.target.value);

                                        newArtifactNameValidation &&
                                          setNewArtifactNameValidation(false);
                                      }}
                                    />
                                  </div>

                                  {/* <div className="flex h-full w-[25%] items-center justify-center">
                                    <TorusButton
                                      buttonClassName="text-black w-[80px] dark:text-white bg-[#F4F5FA] hover:bg-[#e1e2e8]  transition-all duration-200 dark:bg-[#0F0F0F]  h-[30px] rounded-md  text-xs  flex justify-center items-center"
                                      onPress={() =>
                                        handleNewArtifactValidation()
                                      }
                                      Children={"Create"}
                                    />
                                  </div> */}
                                </div>

                                {/* <div className="flex h-full w-full items-end justify-center">
                                  <small
                                    className={`${
                                      newArtifactsNameValidation && "text-red-500"
                                    } flex w-[90%] items-center justify-start text-xs`}
                                  >
                                    {newArtifactsNameValidation &&
                                      "Entered artifact name already exists"}
                                  </small>
                                </div> */}
                              </div>
                            ) : null}

                            <div
                              className={`${
                                newArtifact ? "h-[75%]" : "h-[100%]"
                              } flex  w-[100%] flex-col items-center justify-start overflow-y-scroll scroll-smooth scrollbar-default `}
                            >
                              {artifactsList && artifactsList.length > 0 ? (
                                <div className="w-full px-[1.5vh]">
                                  {artifactsList.map(
                                    (obj: any, index: number) => {
                                      return (
                                        <div
                                          className={`flex justify-center h-[${
                                            artifactsList.length / 100
                                          }%] w-[100%] items-center`}
                                        >
                                          <div className="flex h-full w-full flex-row items-center justify-center py-[1vh] pr-[0.5vw]">
                                            <>
                                              {inputchange !== index ? (
                                                <div
                                                  // onClick={() =>
                                                  //   handleArtifactsChange(
                                                  //     obj?.artifact
                                                  //   )
                                                  // }
                                                  className="flex  h-[1.77vw] w-[15.10vw] flex-row items-center justify-between rounded-sm bg-[#F4F5FA] p-[0.35rem] dark:bg-[#0F0F0F]"
                                                >
                                                  <div className="flex h-full w-full items-center justify-start truncate text-[10.66px] text-black dark:text-white">
                                                    {obj?.artifact}
                                                  </div>

                                                  <div className="w- flex items-center justify-end gap-2">
                                                    <span
                                                      className="cursor-pointer"
                                                      onClick={() =>
                                                        setInputchange(index)
                                                      }
                                                    >
                                                      {/* <FiEdit2
                                                          className="text-black dark:text-white"
                                                          size={13}
                                                        /> */}
                                                    </span>

                                                    {/* <TorusModel
                                                    body="Are you sure you want to delete Artifact Name?"
                                                    title={
                                                      <div className="flex w-[50%] justify-around gap-[0.525rem]">
                                                        <div className="flex w-[10%] items-center justify-end">
                                                          <BsTrash3
                                                            color="red"
                                                            size={13}
                                                          />
                                                        </div>
  
                                                        <div className="flex w-[90%] items-center justify-start">
                                                          Delete Artifacts
                                                        </div>
                                                      </div>
                                                    }
                                                    triggerButton={
                                                      <BsTrash3
                                                        color="red"
                                                        size={13}
                                                      />
                                                    }
                                                    triggerButtonStyle={
                                                      "cursor-pointer bg=transparent"
                                                    }
                                                    titleStyle="text-red-500"
                                                    confirmButtonStyle={
                                                      "pressed:bg-red-600 cursor-pointer bg-[#F14336] text-white hover:border-red-600"
                                                    }
                                                  /> */}
                                                  </div>
                                                </div>
                                              ) : (
                                                <div className="w-full">
                                                  <Input
                                                    defaultValue={obj?.artifact}
                                                    placeholder="Enter text"
                                                    className="flex h-[1.77vw] w-[15.10vw] items-center justify-center rounded-md bg-[#F4F5FA] p-2 text-[10.66px] text-black dark:bg-[#0F0F0F] dark:text-white "
                                                    // onKeyDown={(e) => {
                                                    //   if (e.key === "Enter") {
                                                    //     handleArtifactsNameChange(
                                                    //       obj?.artifact,

                                                    //       e.target.value
                                                    //     );
                                                    //   }
                                                    // }}
                                                    // onChange={(e) => {
                                                    //   setInputValue(e.target.value);
                                                    // }}
                                                  />
                                                </div>
                                              )}
                                            </>
                                          </div>

                                          <div className="flex h-full w-full items-center justify-center text-[10.66px]">
                                            <TorusDropDown
                                              title={
                                                (selectedVersion &&
                                                  selectedArtifact ===
                                                    obj?.artifact &&
                                                  selectedVersion) ||
                                                "Version"
                                              }
                                              selectionMode="single"
                                              selected={
                                                selectedVersion &&
                                                selectedArtifact ===
                                                  obj?.artifact
                                                  ? new Set([selectedVersion])
                                                  : new Set([])
                                              }
                                              setSelected={(e: any) => {
                                                // getProcessFlowApi(
                                                //   obj?.artifact,

                                                //   Array.from(e)[0]
                                                // );

                                                setArtifactCollectionName(
                                                  obj?.artifact
                                                );
                                              }}
                                              items={
                                                obj?.versionList &&
                                                obj?.versionList?.map(
                                                  (item: any) => ({
                                                    label: item,

                                                    key: item,
                                                  })
                                                )
                                              }
                                              classNames={{
                                                buttonClassName:
                                                  "rounded-sm flex items-center justify-center  w-[100%] text-[10.66px] h-[1.77vw] font-nromal   p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F]  dark:text-white",

                                                popoverClassName:
                                                  "w-[4.27vw] max-h-[100px] min-h-[50px] bg-white border-none",

                                                listBoxClassName:
                                                  " min-h-[35px] max-h-[100px] overflow-y-auto",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[12px]">
                                  no artifacts
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex h-[7.31vh] w-[100%] flex-row items-center justify-center border-t border-gray-300 p-2 dark:border-[#212121] ">
                        <div className="flex w-1/3 items-center justify-start">
                          {/* <TorusButton
                            btncolor={"primary"}
                            onPress={() => {
                              handleNewArtifact(),
                                setNewArtifactNameValidation(false);
                            }}
                            buttonClassName={`${
                              newArtifact
                                ? "bg-red-200 dark:bg-red-500/30 w-[7.70vw] h-[4.07vh] text-red-500 dark:text-red-400"
                                : "text-black dark:text-white bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[98.67px] h-[4.07vh] "
                            }   rounded-md flex justify-center items-center`}
                            Children={
                              <div className="flex h-full w-[100%] flex-row items-center justify-center gap-1">
                                {newArtifact ? (
                                  <></>
                                ) : (
                                  <ArtifactLogo className="stroke-black dark:stroke-white" />
                                )}
  
                                <p className="text-[0.72vw]  ">
                                  {newArtifact ? "Cancel" : "New Artifact"}
                                </p>
                              </div>
                            }
                          /> */}
                        </div>

                        <div className="flex  w-2/3 items-center justify-end gap-2">
                          {/* <TorusButton
                            isDisabled={newArtifact ? true : false}
                            buttonClassName={`${
                              newArtifact
                                ? "bg-[#F4F5FA] text-gray-500 cursor-not-allowed"
                                : "bg-[#4CAF50]/15 text-[#4CAF50] cursor-pointer"
                            }   w-[6.40vw] h-[4.07vh] rounded-md text-[10.66px]  flex justify-center items-center`}
                            onPress={() =>
                              saveProcessFlow(
                                "update",
  
                                selectedProject,
  
                                selectedArtifact,
  
                                selectedVersion,
  
                                getDataFromFabrics
                              )
                            }
                            Children={"Update"}
                          /> */}

                          {/* <TorusButton
                            isDisabled={newArtifact ? true : false}
                            buttonClassName={`${
                              newArtifact
                                ? "bg-[#F4F5FA] text-gray-500 cursor-not-allowed"
                                : "bg-[#0736C4]/15 dark:text-[#3063FF] text-[#0736C4] cursor-pointer"
                            }   w-[5.36vw] h-[4.07vh] rounded-md text-[10.66px]  flex justify-center items-center`}
                            onPress={() => {
                              saveProcessFlow(
                                "create",
  
                                selectedProject,
  
                                selectedArtifact,
  
                                selectedVersion,
  
                                getDataFromFabrics
                              );
                            }}
                            Children={"Save"}
                          /> */}

                          <Button
                            isDisabled={
                              selectedProject && selectedArtifactGroup
                                ? false
                                : true
                            }
                            className={`outline-none disabled:bg-[rgb(95,130,236)] bg-[#0736C4] text-white w-[6.61vw] h-[4.07vh] rounded-md text-[10.66px] font-normal  flex justify-center items-center`}
                            onPress={handleMoveArtifact}
                          >
                            Move here
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex h-[12%] w-[100%] flex-row border-b border-[#E5E9EB] p-2 dark:border-[#212121]">
                        <div className="flex w-full items-center justify-start">
                          <p className="px-2 text-start text-sm font-medium text-black dark:text-white">
                            Events
                          </p>
                        </div>

                        <span
                          className="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-md p-[5px] transition-all duration-200 hover:border hover:border-red-400 hover:bg-red-200"
                          onClick={() => {
                            close(), setNewArtifact(false);
                          }}
                        >
                          <IoCloseOutline className="text-black dark:text-white" />
                        </span>
                      </div>

                      {/* <div className="flex h-[87%] w-[100%]">
                        <EventNavbar
                          getDataFromFabrics={getDataFromFabrics}
                          sendDataToFabrics={sendDataToFabrics}
                        />
                      </div> */}
                    </>
                  )}
                </div>
              );
            }}
            dialogClassName={
              "fixed z-[100] top-0 left-0 w-screen h-screen bg-transparent/45 flex items-center justify-center"
            }
          />

          {/* {selectedVersion && (
              <TorusButton
                onPress={() => {
                  handleArtifactLock(!artifactLockToggle);
                }}
                Children={
                  artifactLockToggle ? (
                    <FaLock size={10} />
                  ) : (
                    <FaLockOpen size={10} />
                  )
                }
                buttonClassName="flex w-[27px] cursor-pointer items-center justify-center rounded-md  p-[5px]"
              />
            )} */}

          {/* {selectedFabric === "events" && (
              <TorusButton
                onPress={() => {
                  selectedFabric === "events" && handleTabChange("UF");
                }}
                Children={<ArtifactOpen />}
                buttonClassName="flex h-[27px] w-[27px] cursor-pointer items-center justify-center rounded-md bg-[#0736C4] p-[5px]"
              />
            )} */}
        </>
      )}
    </div>
  );
};

export default ArtifactDisplayModal;
