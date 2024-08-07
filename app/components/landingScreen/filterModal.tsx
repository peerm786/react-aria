"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { TfiAlignCenter } from "react-icons/tfi";
import { CloseIcon } from "../../constants/svgApplications";
import FilterItems from "../filterItems";

interface FilteringModalProps {
  fabrics: Set<string>;
  setFabrics: (fabric: Set<string>) => void;
  artifactType?: "frk" | "crk" | "tpfrk" | string[];
}

const FilterModal = ({ fabrics, setFabrics , artifactType }: FilteringModalProps) => {
  // Seperate filtering States
  const [catalogs, setCatalogs] = useState<Set<string>>(new Set());
  const [artifactGrps, setArtifactGrps] = useState<Set<string>>(new Set());

  // OverAll FilterState just for displaying purpose
  const [filteredItems, setFilteredItems] = React.useState(
    new Set([
      ...Array.from(fabrics),
      ...Array.from(catalogs),
      ...Array.from(artifactGrps),
    ])
  );

  // List Options subjected to change
  const fabricList = [
    { key: "df", label: "Data Fabric" },
    { key: "uf", label: "UI Fabric" },
    { key: "pf", label: "Process Fabric" },
    { key: "sf", label: "Security Fabric" },
  ];
  const [catalogList, setCatalogList] = useState(["dj", "sh"]);
  const [artifactGrpList, setArtifactGrpList] = useState(["ddj", "ssj"]);

  //Overall conditions to map
  const mappingCondtions = [
    {
      selectedKeys: fabrics,
      setSelectedKeys: setFabrics,
      items: fabricList,
      title: "Fabrics",
    },
    {
      selectedKeys: catalogs,
      setSelectedKeys: setCatalogs,
      items: catalogList,
      title: "Catalog",
    },
    {
      selectedKeys: artifactGrps,
      setSelectedKeys: setArtifactGrps,
      items: artifactGrpList,
      title: "Artifact Group",
    },
  ];

  useEffect(() => {
    setFilteredItems(
      new Set([...Array.from(catalogs), ...Array.from(artifactGrps)])
    );
  }, [catalogs, artifactGrps]);

  const removeItemFromAllStates = (ele: any) => {
    const selectedCatalogs = new Set(catalogs);
    const selectedArtifactGrps = new Set(artifactGrps);

    selectedCatalogs.delete(ele);
    selectedArtifactGrps.delete(ele);

    setCatalogs(selectedCatalogs);
    setArtifactGrps(selectedArtifactGrps);
  };

  const handleRemoveItem = (ele: any) => {
    removeItemFromAllStates(ele);
    const RemovedArray = Array.from(filteredItems).filter(
      (item) => item !== ele
    );
    setFilteredItems(new Set(RemovedArray));
  };

  const handleResetAllFilters = () => {
    setFilteredItems(new Set([]));
    setArtifactGrps(new Set([]));
    setCatalogs(new Set([]));
    setFabrics(new Set([]));
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center px-1 py-2">
        <span className="flex items-center gap-2 font-semibold">
          <TfiAlignCenter /> Filter
        </span>
        <Button
          onPress={handleResetAllFilters}
          className={"outline-none text-[#000000/35] text-[10px]"}
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap">
        {Array.from(filteredItems).map((ele, index) => (
          <div
            className="m-2 bg-[#F4F5FA] flex gap-3 rounded-xl p-1 px-2"
            key={index}
          >
            <span key={index} className="text-xs">
              {ele}
            </span>
            <Button
              onPress={() => handleRemoveItem(ele)}
              className={`outline-none`}
            >
              <CloseIcon />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {mappingCondtions.map((state, index) => (
          <FilterItems
            key={index}
            items={
              index == 0
                ? state.items
                : state.items.map((item) => ({ key: item, label: item }))
            }
            selectedKeys={state.selectedKeys}
            setSelectedKeys={state.setSelectedKeys}
            title={state.title}
            isSearchNeeded={index == 0 ? false : true}
            classNames={{
              listbox: "h-[25%] overflow-y-scroll",
              listboxItem: "p-1",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterModal;
