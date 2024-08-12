"use client"
import { useEffect, useState } from 'react';
import { Button } from 'react-aria-components';
import { ShareIcon } from '../../constants/svgApplications';
import { getCookie } from '../../../lib/utils/cookiemgmt';

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
};

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
        return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 16) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

const DateandTime = () => {
    const [formattedDate, setFormattedDate] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const currentDate = new Date();
        const formatted = formatDate(currentDate);
        setFormattedDate(formatted);
    }, []);

    useEffect(() => {
        const currentGreeting = getGreeting();
        setGreeting(currentGreeting);
    }, []);

    if (!greeting) {
        return null
    }

    return (
        <div className='flex items-center justify-between mx-5 pt-3'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-[1.25vw] font-semibold leading-[2.22vh]'>{greeting},{getCookie("loginId")}!</h1>
                <p className='text-[0.72vw] leading-[2.22vh] text-black/50'>{formattedDate}</p>
            </div>
            <div className='flex gap-1 self-end'>
                <Button className="flex outline-none items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Tenant Setup<ShareIcon /></Button>
                <Button className="flex outline-none items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">App Setup<ShareIcon /></Button>
                <Button className="flex outline-none items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Build<ShareIcon /></Button>
                <Button className="flex outline-none items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Bank Master<ShareIcon /></Button>
                <Button className="flex outline-none items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Form<ShareIcon /></Button>
                <Button className="flex outline-none items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Connector Setup<ShareIcon /></Button>
            </div>
        </div>
    );
};

export default DateandTime;
