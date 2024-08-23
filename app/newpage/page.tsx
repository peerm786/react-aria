"use client";
import React, { useState } from "react";
import CustomGrpMemberDropdown from "../components/customGrpMemberDropdown";
import { groupmemberData } from "../constants/MenuItemTree";

const Page = () => {
  const { orgGrp, psGrp, roleGrp } = groupmemberData;
  const [selectedOrg, setSelectedOrg] = useState<any>([]);
  const [selectedPsg, setSelectedPsg] = useState<any>([]);
  const [selectedRg, setSelectedRg] = useState<any>([]);

  return (
    <div className="flex gap-[0.58vw]">
      <CustomGrpMemberDropdown
        data={roleGrp}
        groupKey="roleGrp"
        memberKey="roles"
        memberCodeKey="roleCode"
        memberNameKey="roleName"
        groupCodeKey="roleGrpCode"
        groupNameKey="roleGrpName"
        selected={selectedRg}
        setSelected={setSelectedRg}
      />

      <CustomGrpMemberDropdown
        data={orgGrp}
        groupKey="orgGrp"
        memberKey="org"
        memberCodeKey="orgCode"
        memberNameKey="orgName"
        groupCodeKey="orgGrpCode"
        groupNameKey="orgGrpName"
        selected={selectedOrg}
        setSelected={setSelectedOrg}
      />

      <CustomGrpMemberDropdown
        data={psGrp}
        groupKey="psGrp"
        memberKey="ps"
        memberCodeKey="psCode"
        memberNameKey="psName"
        groupCodeKey="psGrpCode"
        groupNameKey="psGrpName"
        selected={selectedPsg}
        setSelected={setSelectedPsg}
      />
    </div>
  );
};

export default Page;
