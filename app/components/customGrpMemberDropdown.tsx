import React, { useState, useRef } from "react";
import { Button } from "react-aria-components";
import { DownArrow } from "../constants/svgApplications";
import useClickOutside from "../../lib/utils/useClickOutsideRef";

const CustomGrpMemberDropdown = ({
  data,
  groupKey,
  memberKey,
  memberCodeKey,
  memberNameKey,
  groupCodeKey,
  groupNameKey,
  selected,
  setSelected,
  multiple = true,
}: any) => {
  const [isOpen, setOpen] = useState(false);
  // const [selected, setSelected] = useState<any>([]);
  const customDropDownRef = useRef(null);
  useClickOutside(customDropDownRef, () => setOpen(false));

  const handleSelectGrp = (grp: any) => {
    if (
      selected.some((item: any) => item[groupCodeKey] === grp[groupCodeKey])
    ) {
      setSelected(
        selected.filter((item: any) => item[groupCodeKey] !== grp[groupCodeKey])
      );
    } else {
      setSelected([...selected, grp]);
    }
  };

  const handleSelectMember = (
    grpCode: any,
    member: any,
    isGrpSelected: boolean
  ) => {
    const copyOfSelected = structuredClone(selected);
    if (isGrpSelected) {
      const indexOfSelectedGrp = copyOfSelected.findIndex(
        (grp: any) => grp[groupCodeKey] === grpCode
      );
      const indexOfMemberToBeRemoved = copyOfSelected[indexOfSelectedGrp][
        memberKey
      ].findIndex(
        (memberItem: any) => memberItem[memberCodeKey] === member[memberCodeKey]
      );
      if (copyOfSelected[indexOfSelectedGrp][memberKey].length === 1) {
        copyOfSelected.splice(indexOfSelectedGrp, 1);
      } else {
        copyOfSelected[indexOfSelectedGrp][memberKey].splice(
          indexOfMemberToBeRemoved,
          1
        );
      }
    } else {
      const existingIndexOfGrp = copyOfSelected.findIndex(
        (grp: any) => grp[groupCodeKey] === grpCode
      );
      if (existingIndexOfGrp != -1) {
        const existingMemberInGrpIndex = copyOfSelected[existingIndexOfGrp][
          memberKey
        ].findIndex((m: any) => m[memberCodeKey] === member[memberCodeKey]);
        if (existingMemberInGrpIndex != -1) {
          if (copyOfSelected[existingIndexOfGrp][memberKey].length === 1) {
            copyOfSelected.splice(existingIndexOfGrp, 1);
          } else {
            copyOfSelected[existingIndexOfGrp][memberKey].splice(
              existingMemberInGrpIndex,
              1
            );
          }
        } else {
          copyOfSelected[existingIndexOfGrp][memberKey].push(member);
        }
      } else {
        const grpData = data.find((grp: any) => grp[groupCodeKey] === grpCode);
        const memberData = grpData[memberKey].find(
          (m: any) => m[memberCodeKey] === member[memberCodeKey]
        );
        copyOfSelected.push({ ...grpData, [memberKey]: [memberData] });
      }
    }
    setSelected(copyOfSelected);
    // setOpen(false);
  };

  return (
    <div className="relative m-2" ref={customDropDownRef}>
      <Button
        className={`p-2 outline-none bg-gray-400 flex justify-between items-center rounded`}
        onPress={() => setOpen(!isOpen)}
      >
        <span>Select {groupKey}</span>
        <DownArrow />
      </Button>
      {isOpen && (
        <div className="absolute mt-[0.5vw] z-20 bg-white p-[0.5vw] rounded w-[12vw] border">
          {data.map((grp: any, index: number) => {
            const isParentSelected = selected.some(
              (item: any) => JSON.stringify(item) === JSON.stringify(grp)
            );

            return (
              <div key={index}>
                <Button
                  className="flex gap-[0.5vw] items-center outline-none"
                  key={grp[groupCodeKey]}
                  onPress={() => handleSelectGrp(grp)}
                >
                  <input type="checkbox" checked={isParentSelected} readOnly />
                  <span>{grp[groupNameKey]}</span>
                </Button>
                <div className="ml-[0.5vw]">
                  {grp[memberKey].map((member: any, memberIndex: number) => {
                    const existingGrp = selected.find(
                      (grpdata: any) =>
                        grpdata[groupCodeKey] === grp[groupCodeKey]
                    );
                    const isMemberSelected = existingGrp
                      ? existingGrp[memberKey].some(
                          (item: any) =>
                            item[memberCodeKey] === member[memberCodeKey]
                        )
                      : false;

                    return (
                      <Button
                        key={memberIndex}
                        className={`flex gap-[0.5vw] items-center outline-none 
                    
                    `}
                        onPress={() =>
                          handleSelectMember(
                            grp[groupCodeKey],
                            member,
                            isParentSelected
                          )
                        }
                        aria-label={member[memberCodeKey]}
                      >
                        <input
                          type="checkbox"
                          checked={isMemberSelected}
                          readOnly
                        />
                        <span>{member[memberNameKey]}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomGrpMemberDropdown;
