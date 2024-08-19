import React, { useState } from "react";
import { Button, Separator } from "react-aria-components";
import {
  ArtifactPinIcon,
  ArtifactShareIcon,
  MoveToIcon,
  PostToMarketArrowIcon,
  PostToMarketIcon,
  RenameIcon,
  TrashIcon,
} from "../../../constants/svgApplications";
import ArtifactDisplayModal from "./artifactDisplayModel";
import { AxiosService } from "../../../../lib/utils/axiosService";
import { getCookie } from "../../../../lib/utils/cookiemgmt";
import { toast } from "react-toastify";
import TorusPopOver from "../../torusComponents/torusPopover";
import ArtifactSharingModal from "./shareArtifactModal";
import TorusToast from "../../torusComponents/torusToast";

interface contextMenuProps {
  artifactName: string;
  artifactType: string;
  catalog: string;
  artifactGrp: string;
  version: string;
  fabric: string;
  index: number;
  isLocked: any;
  close: () => void;
  setInput: React.Dispatch<
    React.SetStateAction<{ id: number | undefined; name: string }>
  >;
  setRefetchOnContextMenu: any;
  artifactDetails: any;
}

const ArtifactContextMenu = ({
  artifactName,
  artifactGrp,
  artifactType,
  catalog,
  isLocked,
  version,
  fabric,
  index,
  close,
  setInput,
  setRefetchOnContextMenu,
  artifactDetails,
}: contextMenuProps) => {
  const [wordLength, setWordLength] = useState(0);

  const handleEdit = (e: any) => {
    setInput({ id: index, name: artifactName });
    close();
  };

  const handleDeleteArtifact = async () => {
    try {
      const response = await AxiosService.post("/tp/deleteArtifact", {
        loginId: getCookie("loginId"),
        artifactType,
        fabric,
        catalog,
        artifactGrp,
        artifactName,
        version,
      });

      if (response.status === 201) {
        toast.success("Artifact deleted successfully");
        setRefetchOnContextMenu((prev: any) => !prev);
        close();
      } else {
        toast.error("Some error occured");
      }
    } catch (error) {
      toast.error("Some error from API occured");
    }
  };

  const handlePinningOfArtifacts = async () => {
    try {
      const artifactKey = `TCL:${artifactType.toUpperCase()}:${fabric.toUpperCase()}:${catalog}:${artifactGrp}:${artifactName}:${version}:artifactInfo`;
      const ApiLink = artifactDetails.isUserPinned
        ? "unPinArtifact"
        : "pinArtifact";
      const response = await AxiosService.post(`/tp/${ApiLink}`, {
        artifactKey,
        loginId: getCookie("loginId"),
      });
      if (response.status == 201) {
        setRefetchOnContextMenu((prev: any) => !prev);
        close();
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
          text: `Some Network error occured`,
          closeButton: false,
        } as any
      );
    }
  };

  return (
    <div className="bg-white w-[11vw] rounded-[0.42vw] P-[1vw]">
      <h2 className={`px-[1vw] py-[0.4vw] text-[1.05vw] font-medium`}>
        {artifactName.charAt(0).toUpperCase() + artifactName.slice(1)}
      </h2>
      <Separator orientation="horizontal" />
      <div className="flex flex-col justify-around px-[0.6vw] h-[6.25vw]">
        <Button
          onPress={handleEdit}
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
        >
          <RenameIcon /> Rename
        </Button>
        <TorusPopOver
          parentHeading={
            <Button
              className={
                "outline-none flex gap-[0.5vw] items-center text-[0.72vw]"
              }
            >
              <ArtifactShareIcon /> Share to
            </Button>
          }
          children={({ close }: any) => (
            <ArtifactSharingModal
              close={close}
              artifactDetails={artifactDetails}
            />
          )}
          dialogClassName={
            "fixed z-[100] top-0 left-0 w-screen h-screen bg-transparent/45 flex items-center justify-center"
          }
        />

        <ArtifactDisplayModal
          fabric={fabric}
          sourceKeyPrefix={`TCL:${artifactType.toUpperCase()}:${fabric.toUpperCase()}:${catalog}:${artifactGrp}`}
          version={version}
          artifactName={artifactName}
          closeParent={close}
        />
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col px-[0.6vw] justify-around h-[6.25vw]">
        <Button
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
          onPress={handlePinningOfArtifacts}
        >
          <ArtifactPinIcon />{" "}
          {artifactDetails?.isUserPinned ? "Unpin" : "Pin to Top"}
        </Button>

        <Button
          className={
            "outline-none flex gap-[0.5vw] items-center text-[0.72vw] justify-between"
          }
        >
          <div className="flex gap-[0.5vw]">
            <PostToMarketIcon /> Post to Market
          </div>
          <PostToMarketArrowIcon />
        </Button>
        <Button
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
          onPress={handleDeleteArtifact}
        >
          <TrashIcon /> Move to Trash
        </Button>
      </div>
    </div>
  );
};

export default ArtifactContextMenu;
