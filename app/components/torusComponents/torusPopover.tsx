import React from "react";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import TorusButton from "./torusButton";

export default function TorusPopOver({
  children,
  parentHeading,
  popOverContent,
  popbuttonClassNames,
  dialogClassName
}: any) {
  return (
    <DialogTrigger>
      <TorusButton
        Children={parentHeading}
        startContent={popOverContent}
        buttonClassName={popbuttonClassNames}
      />
      <Popover
        style={{
          zIndex: 999,
        }}
      >
        <Dialog className={twMerge("rounded-lg outline-none " ,dialogClassName )}>{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}