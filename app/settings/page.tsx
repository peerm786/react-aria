"use client"
import React from 'react'
import TorusDialog from '../components/torusdialogmodal'
import { Button } from 'react-aria-components'
import Settings from '../components/settings'

const page = () => {
  return (
    <TorusDialog classNames={{ dialogClassName: "focus:outline-none bg-white border rounded" }} triggerElement={<Button className={"p-2 border focus:outline-blue-300 rounded m-2"} >Settings</Button>}>
      <Settings />
    </TorusDialog>
  )
}

export default page