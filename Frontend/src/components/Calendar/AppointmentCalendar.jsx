import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import './AppointmentCalendar.css';
import { HDate } from '@hebcal/core';

export const AppointmentCalendar = () => {

    const location = useLocation();
    const id = location.state;

    const [flag, setFlag] = useState(false);
    const [events, setEvents] = useState({});
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const [saveEventPopup, setSaveEventPopup] = useState(false);
    const [saveEvent, setSaveEvent] = useState(null);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    useEffect(() => {
        getAllEvents();
        checkIdOfOwner();
    }, []);


    const checkIdOfOwner = async () => {
        try {
            const response = await fetch("/get_owner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id
                }),
            });
            if (response.ok) {
                setFlag(true)
                console.log("flag - ", flag);
            }
        } catch (error) {
            console.log("Failed to validate owner: " + error.message);
        }
    }

    const handleEventAdd = (day) => {
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        if (newTime) {
            const event = `שעה: ${newTime}`;
            setEvents((prev) => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), event],
            }));
            addEventToDB();
            setIsPopupOpen(false);
        }
    };

    //
    const changeMonth = (direction) => {
        if (direction === 'prev') {
            setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
            if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
        } else {
            setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
            if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
        }
    };

    //
    const openAddFreeTreatment = (day) => {
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setNewDate(dateKey);
        setSelectedDay(day);
        setIsPopupOpen(true);
    };

    //
    const addFreeTreatment = () => {
        if (selectedDay) {
            handleEventAdd(selectedDay);
        }
    };

    //
    const addEventToDB = async () => {
        if (newDate && newTime) {
            const event = {
                "newDate": newDate,
                "newTime": newTime,
                "freeOrBusy": "פנוי"
            }
            try {
                const response = await fetch("/add_event", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(event)
                });
                if (response.ok) {
                    window.location.reload();
                    setNewDate('');
                    setNewTime('');
                }
                else {
                    const errorData = await response.json();
                    console.log("erroe: ", errorData);
                }
            }
            catch (error) {
                console.log("Failed to add event: " + error.message);
            }
        }
    }

    //
    const getAllEvents = async () => {
        try {
            const response = await fetch("/get_all_events", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                const data = await response.json(); // Wait for the promise to resolve
                setEvents(data);
            }
            else {
                const errorData = await response.json();
                console.log("Error: " + errorData);
            }
        }
        catch (e) {
            console.log("Failed to add al events: " + e.message);
        }
    }

    //
    const normalizeDate = (date) => {
        const localDate = new Date(date);
        localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); // Adjust for time zone
        return localDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    };

    const chooseAnAppointment = async (day, eventTime) => {
        const id = prompt(`קביעת טיפול בתאריך ${day}/${currentMonth + 1}/${currentYear} - הכניסי ת.ז:`);
        if (id !== "") {
            const exists = await checkIfPatientExist(id);
            if (exists) {
                setSaveEventPopup(true);
                const eventDate = new Date(Date.UTC(currentYear, currentMonth, day)).toISOString().split('T')[0];  // YYYY-MM-DD format
                setSaveEvent({ id, eventDate, eventTime });
            }
            else {
                alert("ת.ז כנראה אינה תקינה");
            }
        }
    }

    //
    const checkIfPatientExist = async (id) => {
        try {
            const response = await fetch("get_patient_id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (response.ok) {
                return true;
            }
            else {
                const errorData = response.json();
                console.log("Error: ", errorData);
                return false;
            }
        }
        catch (e) {
            console.log("Failed to validate patient: ", e.message);
            return false;
        }
    }

    //
    const closeModal = () => {
        setSaveEventPopup(false);
        alert("התור בוטל");
    }

    //
    const updateEvent = async () => {
        const event = {
            id: saveEvent.id,
            freeOrBusy: "תפוס",
            eventDate: saveEvent.eventDate,
            eventTime: saveEvent.eventTime
        };
        try {
            const response = await fetch("update_event", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(event)
            });
            if (response.ok) {
                alert("התור נשמר בהצלחה");
                setSaveEventPopup(false);
                //לנסות לאפשר שמירה ביומן של המטופל ושליחה ליומן של אימא
            }
            else {
                const error = await response.json();
                console.log("Error: ", error);
            }
        }
        catch (e) {
            console.log("Error: ", e.message);
        }
    }

    //
    const HebrewDate = (date) => {
        const hebrewDate = new HDate(new Date(date)).toString("h");
        return hebrewDate;
    };


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

                        const normalizedDateKey = normalizeDate(dateKey);
                        const hebrewDate = HebrewDate(dateKey);

                        return (
                            <div key={i} className={normalizedDateKey === normalizeDate(today) ? "todayCell" : "cellDay"}>
                                <span className="dayLabel" onClick={() => openAddFreeTreatment(day)}>{day}({hebrewDate})</span>
                                <ul dir='rtl'>
                                    {events && events.length > 0 ? (
                                        events
                                            .filter(event => {
                                                const isMatch = normalizeDate(event.eventDate) === normalizedDateKey;
                                                return isMatch;
                                            })
                                            .map((event, idx) => (
                                                flag === true ?
                                                    <li key={idx} className='events' onClick={() => chooseAnAppointment(day, event.eventTime)}>{event.freeOrBusy}: {event.freeOrBusy} - {event.fullName}</li>
                                                    :
                                                    <li key={idx} className='events' onClick={() => chooseAnAppointment(day, event.eventTime)}>{event.eventTime}</li>
                                            ))
                                    ) : (
                                        (events[dateKey] || []).map((event, idx) => (
                                            <li key={idx} className='events'>{event}</li>
                                        ))
                                    )}
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
                        <label onClick={() => setIsPopupOpen(false)} className="close-modal-btn">
                            X
                        </label>
                        <br />
                        <label>הכניסי שעה: </label>
                        <input type='time' value={newTime} onChange={(e) => setNewTime(e.target.value)} />
                        <br />
                        <button onClick={addFreeTreatment}>שמירה</button>
                    </div>
                </div>
            )}
            {saveEventPopup && (
                <div className='popup-overly'>
                    <div className='popup'>
                        <label onClick={closeModal} className="close-modal-btn">
                            X
                        </label>
                        <br />
                        <label>נקבע טיפול עבור ת.ז {saveEvent.id}</label>
                        <label>נקבע טיפול בתאריך {saveEvent.eventDate} ובשעה {saveEvent.eventTime}</label>
                        <br />
                        <br />
                        <label className='saveEventBtn' onClick={updateEvent}>אישור</label>
                    </div>
                </div>
            )}
        </>
    );
};