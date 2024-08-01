

"use client"
import React from 'react'
import CustomTable from '../../components/landingScreen/exceptiontable'
import VendorTable from '../../components/landingScreen/processtable'
import Artifactdetails from '../../components/landingScreen/artifactdetails'



const data = {
    "key": "T:PF:FRKP:ME:NA:bankmaster:v1:ctks9q6rbc1mzt7ny0cg",
    "nodeData": [
        {
            "node": "ManualInput",
            "time": "18:42:25.482 29 Jul 2024",
            "status": "Success",
            "npc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            },
            "ipc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            }
        },
        {
            "node": "AmountCheck",
            "time": "18:42:25.498 29 Jul 2024",
            "status": "Success",
            "npc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            },
            "ipc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            }
        },
        {
            "node": "CallCB",
            "time": "18:42:25.532 29 Jul 2024",
            "status": "Success",
            "npc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            },
            "ipc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            }
        },
        {
            "node": "Output",
            "time": "18:42:25.589 29 Jul 2024",
            "status": "Success",
            "npc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            },
            "ipc": {
                "PRE": null,
                "PRO": null,
                "PST": null
            }
        }
    ]
}




const page = () => {
    return (
        <div>
            <Artifactdetails nodeData={data} />
            {/* <VendorTable /> */}
            {/* <CustomTable /> */}
        </div>
    )
}

export default page


