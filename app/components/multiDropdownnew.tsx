import React from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Popover,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { IoIosCheckmark } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { DownArrow } from "../constants/svgApplications";

type classNames = {
  triggerButton?: string;
  popover?: string;
  listbox?: string;
  listboxItem?: string;
};

interface CustomDropDpwnProps {
  triggerButton: React.ReactNode;
  multiple?: boolean;
  selectedKeys: string[] | any[] | any;
  setSelectedKeys: (keys: any) => void;
  items: any[];
  displayParam?: string;
  classNames?: classNames;
  renderOption?: (
    item: any,
    close: () => void,
    handleSelectionChange: (selectedItems: any, close: () => void) => void,
    setOpen: (open: boolean) => void
  ) => React.ReactNode;
  isDarkMode?: boolean;
  displaySelectedKeys?: boolean;
}

const DropDown = ({
  triggerButton,
  multiple = false,
  selectedKeys,
  setSelectedKeys,
  items,
  displayParam,
  classNames,
  renderOption,
  isDarkMode,
  displaySelectedKeys = true,
}: CustomDropDpwnProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSelectionChange = (selectedItem: any, close: () => void) => {
    if (multiple) {
      setSelectedKeys((prevKeys: any[]) =>
        prevKeys.some((k: any) =>
          displayParam
            ? k[displayParam] === selectedItem[displayParam]
            : k === selectedItem
        )
          ? prevKeys.filter((k: any) =>
              displayParam
                ? k[displayParam] !== selectedItem[displayParam]
                : k !== selectedItem
            )
          : [...prevKeys, selectedItem]
      );
    } else {
      setSelectedKeys(selectedItem);
      close();
      setOpen(false);
    }
  };

  const getItemDisplayValue = (item: any) => {
    return displayParam ? item[displayParam] : item;
  };

  return (
    <DialogTrigger>
      <Button
        className={twMerge(
          `p-2 items-center flex justify-between disabled:cursor-not-allowed dark:text-white rounded focus:outline-none w-full ${
            open ? "border-[#0736C4]" : ""
          }`,
          classNames?.triggerButton
        )}
        // isDisabled={items.length === 0}
        onPress={() => setOpen(!open)}
      >
        {displaySelectedKeys
          ? selectedKeys.length && Array.isArray(selectedKeys)
            ? selectedKeys
                .map((item: any) => getItemDisplayValue(item))
                .join(", ")
            : selectedKeys && typeof selectedKeys === "string"
            ? getItemDisplayValue(selectedKeys)
            : triggerButton
          : triggerButton}
        {displaySelectedKeys && <DownArrow fill={isDarkMode ? "white" : "black"} />}
      </Button>
      <Popover
        placement="bottom"
        className={twMerge("w-full", classNames?.popover)}
      >
        <Dialog className="border bg-white dark:bg-[#212121] dark:text-white dark:border-[#212121] focus:outline-none rounded-lg">
          {({ close }) => (
            <ListBox
              aria-label="Custom dropdown"
              selectionMode={multiple ? "multiple" : "single"}
              className={twMerge("", classNames?.listbox)}
              renderEmptyState={()=> <div className="p-2 rounded dark:bg[#212121] dark:text-white">No data found</div>}
            >
              {items.map((item: any) => {
                const isSelected = () => {
                  if (multiple) {
                    return selectedKeys.some((k: any) =>
                      displayParam
                        ? k[displayParam] === item[displayParam]
                        : k === item
                    );
                  } else {
                    return selectedKeys === item;
                  }
                };
                if (renderOption) {
                  return renderOption(
                    item,
                    close,
                    handleSelectionChange,
                    setOpen
                  );
                } else {
                  return (
                    <ListBoxItem
                      key={displayParam ? item[displayParam] : item}
                      textValue={getItemDisplayValue(item)}
                      onAction={() => handleSelectionChange(item, close)}
                      className={twMerge(
                        `focus:outline-none p-1 items-center flex justify-between border border-transparent cursor-pointer rounded ${
                          isSelected() ? "bg-[#F9FAFB] dark:bg-[#000]" : ""
                        }`,
                        classNames?.listboxItem
                      )}
                    >
                      {getItemDisplayValue(item)}
                      {isSelected() && <IoIosCheckmark size={25} fill="blue" />}
                    </ListBoxItem>
                  );
                }
              })}
            </ListBox>
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};

export default DropDown;
