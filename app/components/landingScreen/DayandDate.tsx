import { useEffect, useState } from 'react';
import { Button } from 'react-aria-components';
import { ShareIcon } from '../../constants/svgApplications';

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

    return (
        <div className='flex justify-between ml-5'>
            <div className='flex flex-col'>
                <h1 className='text-sm font-bold'>{greeting},Peer Maideen!</h1>
                <p className='text-xs'>{formattedDate}</p>
            </div>
            <div className='flex gap-2 mr-3'>
                <Button className="flex items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-semibold rounded-3xl text-[10px]">Tenant Setup<ShareIcon /></Button>
                <Button className="flex items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-semibold rounded-3xl text-[10px]">App Setup<ShareIcon /></Button>
                <Button className="flex items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-semibold rounded-3xl text-[10px]">Build<ShareIcon /></Button>
                <Button className="flex items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-semibold rounded-3xl text-[10px]">Bank Master<ShareIcon /></Button>
                <Button className="flex items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-semibold rounded-3xl text-[10px]">Form<ShareIcon /></Button>
                <Button className="flex items-center gap-2 px-2 h-7 bg-[#0736C4]/15 text-[#0736C4] font-semibold rounded-3xl text-[10px]">Connector Setup<ShareIcon /></Button>
            </div>
        </div>
    );
};

export default DateandTime;
