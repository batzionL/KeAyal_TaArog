import React, { useState } from 'react';
import './AppointmentCalendar.css';

export const AppointmentCalendar = () => {

    const [events, setEvents] = useState({});
    const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);


    const handleEventAdd = (day) => {
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;

        if (newTime) {
            const event = `שעה: ${newTime}`;
            setEvents((prev) => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), event],
            }));
            addEventTodb();
            setNewDate('');
            setNewTime('');
            setIsPopupOpen(false);
        }
    };

    const changeMonth = (direction) => {
        if (direction === 'prev') {
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
            if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
            if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
        }
    };

    const openAddFreeTreatment = (day) => {
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setNewDate(dateKey);
        setSelectedDay(day);
        setIsPopupOpen(true);
    };

    const addFreeTreatment = () => {
        if (selectedDay) {
            handleEventAdd(selectedDay);
        }
    };

    const addEventTodb = () => {
        
    }

    const days = daysInMonth(currentYear, currentMonth);
    return (
        <>
            <center>
                <h2>בחרי תור מהיומן</h2>
                <div>
                    <button onClick={() => changeMonth('prev')}>קודם</button>
                    <span>
                        {currentMonth + 1}/{currentYear}
                    </span>
                    <button onClick={() => changeMonth('next')}>הבא</button>
                </div>
                <br />
                <div className='daysOfWeek'>
                    {daysOfWeek.map((day) => (
                        <div key={day}>{day}</div>
                    ))}
                </div>
                <div className='calander'>
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                        <div key={`empty-${i}`} className="emptyCellStyle"></div>
                    ))}
                    {[...Array(days)].map((_, i) => {
                        const day = i + 1;
                        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;

                        return (
                            <div onClick={() => openAddFreeTreatment(day)} key={i} className='cellDay'>
                                {day}
                                <ul>
                                    {(events[dateKey] || []).map((event, idx) => (
                                        <li key={idx}>{event}</li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </center>
            <br />
            {isPopupOpen && (
                <div className='popup-overly'>
                    <div className='popup'>
                        <br />
                        <labe>הכניסי שעה: </labe>
                        <input type='time' value={newTime} onChange={(e) => setNewTime(e.target.value)} />
                        <br />
                        <button onClick={addFreeTreatment}>שמירה</button>
                    </div>
                </div>
            )}
        </>
    );
};