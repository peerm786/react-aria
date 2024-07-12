'use client'
import Image from 'next/image';
import { useState } from 'react';
import { FileTrigger, Button } from 'react-aria-components';
import { FileGallery } from '../constants/svgApplications';

export default function FileUploader() {
    let [file, setFile] = useState<string | null>(null);
    let [fileUrl, setFileUrl] = useState<string | null>(null);

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
        <div className='flex flex-col items-center'>
            <div className='flex flex-col justify-center items-center w-[25%] h-[25%] p-3 bg-white rounded-lg'>
                <div className='flex pt-2 items-center gap-3'>
                    <div className='bg-[#F4F5FA] p-3 rounded-md'>
                        {fileUrl ? (
                            <Image src={fileUrl} alt={fileUrl} width={50} height={50} />
                        ) : (
                            <FileGallery />
                        )}
                    </div>
                    <div className='flex flex-col mb-2'>
                        <h6 className='italic text-[9px] font-medium p-1'>
                            Please upload square image, size less than 100KB
                        </h6>
                        <div
                            className='flex bg-[#F4F5FA] justify-center gap-4 items-center p-2 rounded-md'
                            onDrop={handleFileDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                        >
                            <FileTrigger
                                acceptedFileTypes={['image/png', 'image/jpeg', "image/x-icon"]}
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
                                }}
                            >
                                <Button className={"text-[#0736C4] text-xs font-medium outline-none border border-[#0736C4] p-1 bg-[#F4F5FA] rounded-md"}>
                                    Choose File
                                </Button>
                            </FileTrigger>
                            <div className='text-xs font-medium'>
                                {file ? file && file : 'No File Chosen'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 p-2'>
                    <Button className={"bg-[#F4F5FA] text-sm font-medium text-black/60 px-12 py-2 rounded-md outline-none"}>
                        Cancel
                    </Button>
                    <Button className={"bg-[#0736C4] text-sm font-medium text-white px-14 py-2 rounded-md outline-none"}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}