import React from 'react'
import { ListBox, ListBoxItem, Button, Popover, DialogTrigger, Dialog, OverlayArrow, } from 'react-aria-components';
import type { Selection } from 'react-aria-components';

const MultiDropDown = () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(['cheese']));
    return (
        <DialogTrigger>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Settings
            </Button>
            <Popover className="bg-white border border-gray-300 rounded shadow-lg">
                <Dialog className="p-4">
                    <ListBox className="max-h-60 overflow-y-auto"
                        aria-label="Sandwich contents"
                        selectionMode="multiple"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                    >
                        <ListBoxItem className="py-2 px-4 hover:bg-gray-200" id="lettuce">
                            Lettuce
                        </ListBoxItem>
                        <ListBoxItem className="py-2 px-4 hover:bg-gray-200" id="tomato">
                            Tomato
                        </ListBoxItem>
                        <ListBoxItem className="py-2 px-4 hover:bg-gray-200" id="cheese">
                            Cheese
                        </ListBoxItem>
                        <ListBoxItem className="py-2 px-4 hover:bg-gray-200" id="tuna">
                            Tuna Salad
                        </ListBoxItem>
                        <ListBoxItem className="py-2 px-4 hover:bg-gray-200" id="egg">
                            Egg Salad
                        </ListBoxItem>
                        <ListBoxItem className="py-2 px-4 hover:bg-gray-200" id="ham">
                            Ham
                        </ListBoxItem>
                    </ListBox>
                </Dialog>
            </Popover>
        </DialogTrigger>
    )
}

export default MultiDropDown