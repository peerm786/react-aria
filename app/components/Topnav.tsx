"use client"
import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel, Modal, Dialog, DialogTrigger, Button, Heading, TextField, Label, InputContext } from 'react-aria-components';
import Image from 'next/image';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { RiFeedbackLine } from 'react-icons/ri';
import { GrBug } from 'react-icons/gr';
import { FaYoutubeSquare } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import logo from "@/app/favicon copy.ico"
import { Input } from 'postcss';

const TopNavBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-gray-800 text-white">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <Image src={logo} alt="torus-logo" width={40} height={40} />
                    <span className="text-3xl font-bold">Torus</span>
                </div>
                <div className="flex items-center space-x-4">
                    <AiOutlineQuestionCircle className="w-6 h-6 cursor-pointer hover:text-gray-300" onClick={() => setOpen(true)} />
                    <RiLogoutBoxRLine className="w-6 h-6 cursor-pointer hover:text-gray-300" />
                </div>
            </div>




            <Modal isOpen={open} isDismissable={true} className="fixed inset-0 z-10 overflow-y-auto">
                <Dialog className="bg-white p-4 rounded shadow-lg max-w-md m-auto mt-20">
                    <Heading slot="title" className="text-lg font-bold">Notice</Heading>
                    <p>Click outside to close this dialog.</p>
                    <div className="p-3">
                        <h1 className="font-bold text-xl mb-2">Need Help?</h1>
                        <p className="text-sm mb-4">We value user feedback and want to help.</p>

                        <div className="flex items-center space-x-2 mb-4">
                            <RiFeedbackLine className="w-6 h-6" />
                            <span>Feedback</span>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <GrBug className="w-6 h-6" />
                            <span>Bug Report</span>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <FaYoutubeSquare className="w-6 h-6" />
                            <span>Tutorials</span>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <AiOutlineQuestionCircle className="w-6 h-6" />
                            <span>FAQs & Docs</span>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <AiOutlineQuestionCircle className="w-6 h-6" />
                            <span>Current status/ Known issues</span>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </div>
    );
};

export default TopNavBar;
