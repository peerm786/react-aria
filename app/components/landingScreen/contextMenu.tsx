import React from "react";
import { Button, Separator } from "react-aria-components";
import {
  ArtifactPinIcon,
  ArtifactShareIcon,
  MoveToIcon,
  PostToMarketArrowIcon,
  PostToMarketIcon,
  RenameIcon,
  TrashIcon,
} from "../../constants/svgApplications";   
 
interface contextMenuProps {
  artifactName: string;
  artifactType: string;
  catalog: string;
  artifactGrp: string;
  version: string;
  isLocked: any;
  close: () => void;
}
 
const ArtifactContextMenu = ({
  artifactName,
  artifactGrp,
  artifactType,
  catalog,
  isLocked,
  version,
  close,
}: contextMenuProps) => {
  return (
    <div className="bg-white w-[11vw] rounded-[0.42vw] P-[1vw]">
      <h2 className={`px-[1vw] py-[0.4vw] text-[1.05vw] font-medium`}>
        {artifactName.charAt(0).toUpperCase() + artifactName.slice(1)}
      </h2>
      <Separator orientation="horizontal" />
      <div className="flex flex-col justify-around px-[0.6vw] h-[6.25vw]">
        <Button
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
        >
          <RenameIcon /> Rename
        </Button>
        <Button
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
        >
          <ArtifactShareIcon /> Share to
        </Button>
        <Button
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
        >
          <MoveToIcon /> Move to
        </Button>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col px-[0.6vw] justify-around h-[6.25vw]">
        <Button
          className={"outline-none flex gap-[0.5vw] items-center text-[0.72vw]"}
        >
          <ArtifactPinIcon /> Pin to Top
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
        >
          <TrashIcon /> Move to Trash
        </Button>
      </div>
    </div>
  );
};
 
export default ArtifactContextMenu;
 
 