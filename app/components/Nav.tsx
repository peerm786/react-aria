"use client"
import React from 'react'
import { FaArrowDown } from "react-icons/fa";
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

const Selectitem = () => {
    const handleselectchange = () => {

        console.log("111")

    }
    return (
        <div className='flex gap-3'>
            <Select selectedKey={'1'} onOpenChange={handleselectchange}>
                <Label>Menu1</Label>
                <Button>

                    <span aria-hidden="true"><FaArrowDown /></span>
                </Button>
                <Popover>
                    <ListBox>
                        <ListBoxItem>Aardvark</ListBoxItem>
                        <ListBoxItem>Cat</ListBoxItem>
                        <ListBoxItem>Dog</ListBoxItem>
                        <ListBoxItem>Kangaroo</ListBoxItem>
                        <ListBoxItem>Panda</ListBoxItem>
                        <ListBoxItem>Snake</ListBoxItem>
                    </ListBox>
                </Popover>
            </Select>
            <Select>
                <Label>Menu1</Label>
                <Button>

                    <span aria-hidden="true"><FaArrowDown /></span>
                </Button>
                <Popover>
                    <ListBox>
                        <ListBoxItem>Aardvark</ListBoxItem>
                        <ListBoxItem>Cat</ListBoxItem>
                        <ListBoxItem>Dog</ListBoxItem>
                        <ListBoxItem>Kangaroo</ListBoxItem>
                        <ListBoxItem>Panda</ListBoxItem>
                        <ListBoxItem>Snake</ListBoxItem>
                    </ListBox>
                </Popover>
            </Select>
            <Select>
                <Label>Menu1</Label>
                <Button>

                    <span aria-hidden="true"><FaArrowDown /></span>
                </Button>
                <Popover>
                    <ListBox>
                        <ListBoxItem>Aardvark</ListBoxItem>
                        <ListBoxItem>Cat</ListBoxItem>
                        <ListBoxItem>Dog</ListBoxItem>
                        <ListBoxItem>Kangaroo</ListBoxItem>
                        <ListBoxItem>Panda</ListBoxItem>
                        <ListBoxItem>Snake</ListBoxItem>
                    </ListBox>
                </Popover>
            </Select>
            <Select>
                <Label>Menu1</Label>
                <Button>

                    <span aria-hidden="true"><FaArrowDown /></span>
                </Button>
                <Popover>
                    <ListBox>
                        <ListBoxItem>Aardvark</ListBoxItem>
                        <ListBoxItem>Cat</ListBoxItem>
                        <ListBoxItem>Dog</ListBoxItem>
                        <ListBoxItem>Kangaroo</ListBoxItem>
                        <ListBoxItem>Panda</ListBoxItem>
                        <ListBoxItem>Snake</ListBoxItem>
                    </ListBox>
                </Popover>
            </Select>
        </div>

    )
}

export default Selectitem