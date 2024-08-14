import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { Checked, UnChecked, SearchIcon } from "../constants/svgApplications";
import { twMerge } from "tailwind-merge";

type ClassNameProps = {
  container?: string;
  listbox?: string;
  listboxItem?: string;
};

interface Props {
  title: string;
  items: any;
  selectedKeys: any;
  setSelectedKeys: any;
  isSearchNeeded?: boolean;
  classNames?: ClassNameProps;
}

const FilterItems = ({
  title,
  items,
  selectedKeys,
  setSelectedKeys,
  isSearchNeeded = true,
  classNames,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredItems, setFilteredItems] = useState<Iterable<any>>(items);

  useEffect(() => {
    const filtered = (items as any).filter((item: any) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredItems(filtered);
  }, [searchTerm])


  return (
    <div className={twMerge("w-full", classNames?.container)}>
      <div className="flex justify-between text-nowrap items-center">
        <h1 className="text-[0.62vw] leading-[2.22vh] font-medium">{title.toUpperCase()}</h1>
        <Button
          onPress={() => setSelectedKeys(new Set([]))}
          className={"outline-none text-[#000000]/35 text-[0.52vw] leading-[2.22vh] font-medium"}
        >
          Clear All
        </Button>
      </div>
      {isSearchNeeded ? (
        <div className="relative items-center w-full">
          <Input
            type="text"
            className={`w-full items-center text-[0.72vw] leading-[1.5vh] text-[#64748B] p-[0.58vw] outline-none border-[#E7EAEE] rounded bg-[#F4F5FA] group focus:ring-2 focus:px-0 ${searchTerm ? "px-0" : "px-[1.75vw]"}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />{" "}
          {!isFocused && !searchTerm ? (
            <span className="absolute items-center inset-y-0 left-0 flex p-[0.58vw] group-fous:hidden">
              <SearchIcon width="0.83vw" height="0.83vw"/>
            </span>
          ) : null}
        </div>
      ) : null}
      <ListBox
        aria-label="customized-filter-items"
        selectionBehavior="toggle"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        items={filteredItems}
        className={twMerge("w-[95%] mt-[0.29vw]", classNames?.listbox)}
        renderEmptyState={() => 'No data Available'}
      >
        {(item) => (
          <ListBoxItem
            key={item.key}
            className={twMerge(
              `cursor-pointer outline-none`,
              classNames?.listboxItem
            )}
            textValue={item.label}
          >
            {({ isSelected }) => (
              <div className="w-full flex gap-[0.58vw] items-center text-[0.72vw] leading-[1.94vh]">
                {isSelected ? <Checked /> : <UnChecked />}
                {item.label}
              </div>
            )}
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  );
};

export default FilterItems;
