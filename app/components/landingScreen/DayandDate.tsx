"use client"
import { useEffect, useState } from 'react';
import { Button } from 'react-aria-components';
import { ShareIcon } from '../../constants/svgApplications';
import { getCookie } from '../../../lib/utils/cookiemgmt';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/Store/store';
import { useRouter } from 'next/navigation';

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
    const isDarkMode = useSelector((state: RootState) => state.main.useDarkMode);
    const loginId = getCookie("loginId")
    const router = useRouter()

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
        <div className='flex items-center justify-between pt-[0.87vw]'>
            <div className='flex flex-col gap-1 pl-[1.46vw]'>
                <h1 className='text-[1.25vw] font-semibold leading-[2.22vh]'>{greeting},{loginId.charAt(0).toUpperCase() + loginId.slice(1)}!</h1>
                <p className='text-[0.72vw] leading-[2.22vh] text-black/50 dark:text-white/50'>{formattedDate}</p>
            </div>
            <div className='flex gap-[0.29vw] self-end'>
                <Button className="flex outline-none items-center gap-[0.58vw] px-[0.58vw] h-[2.04vw] bg-[#0736C4]/15 text-[#0736C4] dark:text-[#3063FF] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Tenant Setup<ShareIcon fill={isDarkMode ? "#3063FF" : "#0736C4"} /></Button>
                <Button className="flex outline-none items-center gap-[0.58vw] px-[0.58vw] h-[2.04vw] bg-[#0736C4]/15 text-[#0736C4] dark:text-[#3063FF] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">App Setup<ShareIcon fill={isDarkMode ? "#3063FF" : "#0736C4"} /></Button>
                <Button onPress={() => router.push('/')} className="flex outline-none items-center gap-[0.58vw] px-[0.58vw] h-[2.04vw] bg-[#0736C4]/15 text-[#0736C4] dark:text-[#3063FF] font-medium rounded-3xl text-[0.72vw] leading-[2.22vh]">Build<ShareIcon fill={isDarkMode ? "#3063FF" : "#0736C4"} /></Button>
            </div>
        </div>
    );
};

export default DateandTime;
