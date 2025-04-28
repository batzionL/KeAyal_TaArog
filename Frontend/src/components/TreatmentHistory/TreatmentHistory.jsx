import { React, useEffect, useState } from 'react';
import './TreatmentHistory.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function TreatmentHistory() {

    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(location.state);
    const [treatment, setTreatment] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [expandedDiv, setExpandedDiv] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(!id ? true : false);
    const [toHide] = useState(id ? true : false);


    useEffect(() => {
        if (!isPopupOpen) {
            getTreatmentsHistory();
        }
    }, [isPopupOpen]);

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
    }
    return (
        < >
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
            <div className="container" >
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

            {!toHide && <button onClick={addTreatment}>הוספת טיפול</button>}
        </>
    )
}