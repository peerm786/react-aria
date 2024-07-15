"use client";
import React, { useState } from "react";
import { ListBoxItem } from "react-aria-components";
import DropDown from "../components/multiDropdownnew";
import { IoIosCheckmark } from "react-icons/io";
import "../globals.css"

const values = [  {"id": 1, "name": "item1"},
    {"id": 2, "name": "item2"},
    {"id": 3, "name": "item3"},
    {"id": 4, "name": "item4"},
    {"id": 5, "name": "item5"},
    {"id": 6, "name": "item6"},
    {"id": 7, "name": "item7"},
    {"id": 8, "name": "item8"},
    {"id": 9, "name": "item9"},
    {"id": 10, "name": "item10"},
    {"id": 11, "name": "item11"},
    {"id": 12, "name": "item12"},
    {"id": 13, "name": "item13"},
    {"id": 14, "name": "item14"},
    {"id": 15, "name": "item15"},
    {"id": 16, "name": "item16"},
    {"id": 17, "name": "item17"},
    {"id": 18, "name": "item18"},
    {"id": 19, "name": "item19"},
    {"id": 20, "name": "item20"},];
const items = ["item1" , "item2" , "item3"]

const Page = () => {
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);

  const renderOption = (
    item: any,
    close: () => void,
    handleSelectionChange: (selectedItems: any, close: () => void) => void
  ) => (
    <ListBoxItem
      key={item.name}
      textValue={item.name}
      onAction={() => handleSelectionChange(item, close)}
      className={`p-2 cursor-pointer focus:outline-none flex justify-between`}
    >
      {`${item.id} ${item.name}`}
      {selectedKeys.includes(item) ? <IoIosCheckmark size={20} fill="blue" /> : ""}
    </ListBoxItem>
  );
  console.log(selectedKeys, "selectedKeys");
  

  return (
    <div className="p-4 w-60">
      <DropDown
        triggerButton="Select Items"
        multiple={true}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
        items={values}
        displayParam="name"
        classNames={{
          triggerButton: "border w-60 overflow-x-auto",
          popover : "w-60",
          listbox: "w-60 h-40 overflow-y-auto",
          listboxItem: "flex justify-between",
        }}
        renderOption={renderOption}
      />
    </div>
  );
};

export default Page;
