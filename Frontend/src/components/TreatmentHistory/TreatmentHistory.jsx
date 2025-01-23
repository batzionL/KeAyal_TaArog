import { React, useEffect, useState } from 'react';
import './TreatmentHistory.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TreatmentHistory() {

    const location = useLocation();
    const navigate = useNavigate();
    // const isOwner = location.isOwner;
    // alert(isOwner)
    const [id, setId] = useState(location.state);
    const [treatment, setTreatment] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [expandedDiv, setExpandedDiv] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(!id ? true : false);
    // const [patientId, setPatientId] = useState("");
    // const [patientDetails, setPatientDetails] = useState({});


    useEffect(() => {
        if (!isPopupOpen) {
            getTreatmentsHistory();
        }
    });

    const getTreatmentsHistory = async () => {
        try {
            const response = await fetch("/get_patient_treatments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setTreatment(data);
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.log("Failed to validate patient: " + error.message);
        }
    };

    const clickOnDiv = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    }

    const toggleExpand = (index) => {
        setExpandedDiv(expandedDiv === index ? null : index);
    };

    const addTreatment = () => {
        navigate('/NewTreatment', { state: id });
        // window.location.href = "/NewTreatment";
    }

    // const getPatientDetails = async () => {
    // try {
    // const response = await fetch("/get_patient_details", {
    // method: "POST",
    // headers: {
    // "Content-Type": "application/json",
    // },
    // body: JSON.stringify({
    // patientId: id
    // }),
    // });
    // if (response.ok) {
    // const data = await response.json();
    // setPatientDetails(data);
    // setIsPopupOpen(prevState => !prevState);
    // }
    // else {
    // const errorData = await response.json();
    // alert(`Error: ${errorData.error}`);
    // }
    // } catch (error) {
    // alert("Failed to validate owner: " + error.message);
    // }
    // }


    return (
        <center >
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <label>הכניסי תז של מטופלת
                            <input value={id} onChange={(e) => setId(e.target.value)} />
                        </label>
                        <button onClick={() => setIsPopupOpen(false)}>הבא</button>
                    </div>
                </div>
            )}
            <h1>היסטוריית טיפולים</h1>
            <div className="container">
                {treatment && treatment.length > 0 ? (
                    treatment.map((treat, index) => (
                        <div key={index} className={`hover-box ${expandedDiv === index ? "expanded" : ""}`}
                            onClick={() => toggleExpand(index)}>
                            <div onClick={() => clickOnDiv(index)}>
                                <label><h4>תאריך טיפול: </h4>{new Date(treat.treatment_date).toLocaleDateString()}</label>
                                <br />
                                <label><h4>בעיה: </h4>{treat.problem}</label>
                                {expandedIndex === index && (
                                    <>
                                        <label><h4>תהליך טיפולי: </h4>{treat.TherapeuticProcess}</label>
                                        <label><h4>שיעורי בית: </h4>{treat.homeWork}</label>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )
                    : 'No treatment data available'}
            </div>
            <button onClick={addTreatment}>הוספת טיפול</button>
        </center>
    )
}