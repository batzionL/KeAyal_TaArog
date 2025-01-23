// import { useState, useEffect } from "react";
import './FirstPage.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function FirstPage() {

    const location = useLocation();
    const data = location.state;
    // console.log('data - ', data);

    const navigate = useNavigate();

    const makingAnAppointment = () => {
        window.location.href = "/Calander";
    }

    const treatmentHistory = () => {
        navigate('/TreatmentHistory', { state: data.id });
    }

    const addTreatment = () => {
        window.location.href = "/NewTreatment";
    }

    const addPatient = () => {
        window.location.href = "/Patient";
    }

    return (
        <center>
            <div>
                <h1>שלום {data.name}</h1>

            </div>
            <p className="idOfBtns">
                <button onClick={addPatient} style={{ display: data && data.isOwner ? "block" : "none" }}>הוספת מטופלת</button>
                <button onClick={makingAnAppointment} style={{ display: data && data.isOwner ? "none" : "block" }}>לקביעת תור</button>
                <button onClick={treatmentHistory}>לצפייה בהיסטוריית טיפולים</button>
                {/* לשנות את השם כא */}
                <button onClick={addTreatment} style={{ display: data && data.isOwner ? "block" : "none" }}>הוספת טיפול</button>
            </p>
        </center>
    );
}