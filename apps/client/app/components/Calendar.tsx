'use client';
import { useState, useEffect } from 'react';

// Mock API Call
const fetchBookings = async (): Promise<Record<string, string>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                '2026-06-25': 'Stage A Installation',
                '2026-06-28': 'Stage B Maintenance',
            });
        }, 500);
    });
};

export default function Calendar({ 
    onRangeSelect 
}: { 
    onRangeSelect: (range: { start: string | null, end: string | null }) => void 
}) {
    const [bookings, setBookings] = useState<Record<string, string>>({});
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        fetchBookings().then(setBookings);
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate days for the current month
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const d = new Date(year, month, i + 1);
        return d.toISOString().split('T')[0];
    });

    const handleDateClick = (date: string) => {
        if (bookings[date]) return;

        if (!startDate || (startDate && endDate) || date < startDate) {
            setStartDate(date);
            setEndDate(null);
            onRangeSelect({ start: date, end: null });
        } else {
            setEndDate(date);
            onRangeSelect({ start: startDate, end: date });
        }
    };

    return (
        <div className="bg-[#121212] p-6 rounded-sm border border-zinc-800">
            <h2 className="text-xl font-bold mb-6 text-white">1. 시공 일자 선택 (시작 - 종료)</h2>
            <div className="grid grid-cols-7 gap-1">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                    <div key={day} className="text-center text-zinc-500 text-xs font-bold uppercase py-2">{day}</div>
                ))}
                {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                {days.map(date => {
                    const isBooked = !!bookings[date];
                    const isPast = new Date(date) < today;
                    const isSelected = date === startDate || date === endDate;
                    const isInRange = startDate && endDate && date > startDate && date < endDate;
                    
                    return (
                        <button
                            key={date}
                            onClick={() => !isBooked && !isPast && handleDateClick(date)}
                            disabled={isBooked || isPast}
                            className={`h-16 border text-sm transition flex flex-col items-center justify-center ${
                                isBooked || isPast ? 'bg-zinc-950 text-zinc-700 cursor-not-allowed' :
                                isSelected ? 'bg-[#c84d4b] border-[#c84d4b] text-white' : 
                                isInRange ? 'bg-[#c84d4b]/20 border-[#c84d4b]/50 text-white' : 'border-zinc-800 bg-zinc-900 hover:border-[#c84d4b] text-white'
                            }`}
                        >
                            <span className="font-bold">{parseInt(date.split('-')[2])}</span>
                            {isBooked && <span className="text-[9px] mt-1 opacity-70 truncate w-full px-1">{bookings[date]}</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
