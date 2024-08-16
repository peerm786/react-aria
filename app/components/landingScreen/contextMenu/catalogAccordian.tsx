import React, { memo, useEffect, useState } from "react";
import { DownArrow } from "../../../constants/svgApplications";

const CatalogAccordian = memo(
  ({
    items,
    onSelectionChange,
    selectedTkey,
    selectedProject,
    selectedArtifactGroup,
  }: any) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelectionChange = (id: any) => {
      setSelectedItem(id);
      onSelectionChange(id);
    };

    return (
      <div className="flex flex-col gap-0.5 p-2">
        {items &&
          items.map((item: any) => (
            <DisplayTkeys
              key={item.id}
              title={item.title}
              id={item.id}
              items={item.content}
              onSelectionChange={handleSelectionChange}
              selectedItem={selectedItem}
              selectedTkey={selectedTkey}
              selectedProject={selectedProject}
              selectedArtifactGroup={selectedArtifactGroup}
            />
          ))}
      </div>
    );
  }
);

const DisplayTkeys = memo(
  ({
    title,
    id,
    items,
    onSelectionChange,
    selectedItem,
    selectedTkey,
    selectedProject,
    selectedArtifactGroup,
  }: any) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (selectedTkey === id) {
        setOpen(true);
      }
    }, [selectedTkey, id]);
    return (
      <div className="flex w-[100%] flex-col gap-0.5 ">
        <div
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-start gap-2"
        >
          <span
            className={`transition duration-300 ease-in-out ${
              open && items.length > 0 ? "rotate-[0deg]" : "rotate-[-90deg]"
            }`}
          >
            <DownArrow />
          </span>
          <span className="cursor-pointer select-none text-[0.72vw] font-medium text-black dark:text-white">
            {title}
          </span>
        </div>
        <div>
          <div className="mx-2 flex flex-col gap-0.5 border-l">
            {open &&
              items &&
              items.map((item: any) => (
                <DisplayCatalog
                  key={item.catalog}
                  title={item.catalog}
                  id={{ tKey: id, catalog: item.catalog }}
                  items={item.artifactGroupList}
                  onSelectionChange={onSelectionChange}
                  selectedItem={selectedItem}
                  selectedTkey={selectedTkey}
                  selectedProject={selectedProject}
                  selectedArtifactGroup={selectedArtifactGroup}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
);

const DisplayCatalog = memo(
  ({ title, id, items, onSelectionChange, selectedItem ,  selectedTkey , selectedProject , selectedArtifactGroup }: any) => {
    const [open, setOpen] = useState(false);
   
    useEffect(() => {
      if (selectedProject === id?.catalog && selectedTkey === id?.tKey) {
        setOpen(true);
      }
    }, [selectedProject, selectedTkey, id]);

    return (
      <div className="flex w-[100%] flex-col gap-0.5 rounded-md  px-1">
        <div
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-start gap-2"
        >
          <span
            className={`transition duration-300 ease-in-out ${
              open ? "rotate-[0deg]" : "rotate-[-90deg]"
            }`}
          >
            <DownArrow />
          </span>
          <span className="cursor-pointer select-none text-[0.72vw] font-medium text-black dark:text-white ">
            {title}
          </span>
        </div>
        <div className="mx-2 flex flex-col gap-1 border-l">
          {open &&
            items &&
            items.map((item: any) => {
              return (
                <DisplayContent
                  key={item}
                  title={item}
                  id={{ ...id, artifactGroup: item }}
                  onSelectionChange={onSelectionChange}
                  isSelected={
                    selectedTkey == id?.tKey &&
                    selectedProject === id?.catalog &&
                    selectedArtifactGroup === item
                      ? true
                      : false
                  }
                />
              );
            })}
        </div>
      </div>
    );
  }
);

const DisplayContent = memo(
  ({ title, id, onSelectionChange, isSelected }: any) => {
    // console.log(title , isSelected ,id , "dhd");

    return (
      <div
        className={`fade-in-out flex w-[100%] cursor-pointer flex-col gap-0.5 rounded-md font-medium transition-all  duration-150  ${
          isSelected
            ? "    text-[#000000] dark:text-white"
            : "  text-gray-500/50 dark:text-white/50"
        }`}
        onClick={() => onSelectionChange(id)}
      >
        <span
          className={`transition-all duration-300 ease-in-out ${
            isSelected ? "px-3 text-[0.72vw] " : "px-3 text-[0.72vw]"
          } `}
        >
          {title}
        </span>
      </div>
    );
  }
);

export default CatalogAccordian;