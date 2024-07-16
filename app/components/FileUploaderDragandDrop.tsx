"use client"
import React, { useState } from 'react'
import { FileTrigger, Button } from 'react-aria-components';
import { FileTree } from '../constants/svgApplications';
import Image from 'next/image';

const FileUploaderDragandDrop = () => {
    const [file, setFile] = useState<any>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setFileUrl(reader.result as string);
            };

            reader.readAsDataURL(file);
            setFile(file.name);
        }
    };

    return (
        <div className='flex flex-col w-full items-center justify-center p-2'>
            <h2 className='text-center font-medium'>Upload your image</h2>
            <h6 className='text-xs text-center text-gray-400 p-2'>JPG, PNG and GIF files are allowed</h6>
            <div className='flex w-full h-full justify-center' onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}>
                <FileTrigger
                    onSelect={(e) => {
                        if (!e || e.length === 0) return;
                        let files = Array.from(e as FileList);
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            setFileUrl(reader.result as string);
                        }
                        reader.readAsDataURL(e[0]);
                        let filenames: any = files.map((file: any) => file.name);
                        setFile(filenames);
                    }}>
                    <div className='flex flex-col w-[25%] items-center p-5 border border-black/35 border-dashed bg-[#F4F5FA]'>
                        <Button className={`outline-none`}>
                            {fileUrl ? (
                                <Image src={fileUrl} alt={fileUrl} width={50} height={50} />
                            ) : (
                                <FileTree />
                            )}
                        </Button>
                        <h6 className='text-[10px] text-center text-gray-400 p-2'> {file ? file : "Drag & Drop or browse from computer to choose a file"}</h6>
                    </div>
                </FileTrigger>
            </div>
        </div >
    )
}

export default FileUploaderDragandDrop
