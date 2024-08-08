import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { Checked, UnChecked } from "../constants/svgApplications";
import { twMerge } from "tailwind-merge";
import { IoIosSearch } from "react-icons/io";

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
      <div className="flex justify-between text-nowrap mb-2">
        <h1 className="text-xs font-semibold">{title.toUpperCase()}</h1>
        <Button
          onPress={() => setSelectedKeys(new Set([]))}
          className={"outline-none text-[#000000]/35 text-[10px]"}
        >
          Clear All
        </Button>
      </div>
      {isSearchNeeded ? (
        <div className="relative w-full my-2 px-1">
          <Input
            type="text"
            className={`w-full py-1 outline-none border-[#E7EAEE] rounded bg-[#F4F5FA] group focus:ring-2 focus:px-0 ${searchTerm ? "px-0" : "px-6"}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />{" "}
          {!isFocused && !searchTerm ? (
            <span className="absolute inset-y-0 left-0 flex items-center p-1 group-fous:hidden">
              <IoIosSearch />
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
        className={twMerge("w-[95%] mt-1 px-1", classNames?.listbox)}
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
              <div className="w-full flex gap-2 items-center text-sm">
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
