"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-aria-components";
import { CloseIcon, FilterIcon } from "../../constants/svgApplications";
import FilterItems from "../filterItems";
import { sortingConditions } from "../../constants/MenuItemTree";

interface FilteringModalProps {
  fabrics: Set<string>;
  setFabrics: (fabric: Set<string>) => void;
  catalogs: Set<string>;
  setCatalogs: (fabric: Set<string>) => void;
  artifactGrps: Set<string>;
  setArtifactGrps: (fabric: Set<string>) => void;
  catalogList: string[];
  artifactGrpList: string[];
  selectedSortButton: sortingConditions;
  setSelectedSortButton: (selectedSortButton: sortingConditions) => void
}

const FilterModal = (
  { fabrics, setFabrics, catalogs, setCatalogs,
    artifactGrps, setArtifactGrps, catalogList, artifactGrpList, 
    selectedSortButton, setSelectedSortButton }: FilteringModalProps
) => {

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
    setSelectedSortButton("")
  };

  const sortbutton: sortingConditions[] = [
    "Newest",
    "Oldest",
    "Recently Modified",
    "Recently Created",
  ]

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex w-full justify-between items-center px-1 py-2">
        <span className="flex items-center gap-1 text-[16px] font-semibold">
          <FilterIcon /> Filter
        </span>
        <Button
          onPress={handleResetAllFilters}
          className={"outline-none text-xs text-[#000000]/35"}
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

      <div className="flex flex-col gap-2">
        <h1 className="text-xs font-semibold">SORT BY</h1>
        <div className="flex gap-2 flex-wrap text-nowrap">
          {sortbutton.map((item) => (
            <Button
              onPress={() => setSelectedSortButton(item)}
              className={`flex outline-none p-1 text-xs border border-black/15
              rounded-lg ${selectedSortButton == item ? "bg-[#0736C4] text-white" : "bg-[#F4F5FA]"}`}
            >
              {item}
            </Button>
          ))}
        </div>
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
              listbox: "h-20 overflow-y-scroll",
              listboxItem: "p-1",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterModal;
