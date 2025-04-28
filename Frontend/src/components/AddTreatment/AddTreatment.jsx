import { useEffect, useState } from 'react';
import './AddTreatment.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AddTreatment() {

    const navigate = useNavigate();
    const location = useLocation();
    const [patientId] = useState(location.state);

    const [treatment, setTreatment] = useState({ patientId: "", treatment_date: "", problem: "", TherapeuticProcess: "", homeWork: "" });
    const [patientDetails, setPatientDetails] = useState({});
    const [age, setAge] = useState(null);

    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    useEffect(() => {
        if (patientId)
            getPatientDetails();
        setTreatment({ ...treatment, patientId: patientId, treatment_date: today });
    }, []);

    useEffect(() => {
        if (patientDetails.age) {
            const birthDate = new Date(patientDetails.age);
            let fullAge = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                fullAge--;
            }
            setAge(fullAge);
        }
    }, [patientDetails.age]);


    const getPatientDetails = async () => {
        try {
            const response = await fetch("/get_patient_details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientId: patientId
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setPatientDetails(data);
            }
            else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            alert("Failed to validate owner: " + error.message);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTreatment({ ...treatment, [name]: value });
    }


    const addTreatment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/add_treatment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(treatment)
            });
            if (response.ok) {
                setTreatment({ patientId: "", treatment_date: "", problem: "", TherapeuticProcess: "", homeWork: "" });
                navigate(-1);
            }
            else {
                const errorData = await response.json();
                console.log("Error ", errorData);
            }
        }
        catch (error) {
            alert("Failed to add treatment: " + error.message);
        }
    }

    return (
        <div dir="rtl">
            <div className="form-container">
                <h1>הוספת טיפול:</h1>

                <label name='patientId' onChange={handleChange}></label>
                <label><strong>תאריך:</strong> {formattedDate}</label>
                <label><strong>שם:</strong> {patientDetails.firstName}</label>
                <label><strong>גיל:</strong> {age}</label>
                <label><strong>שם אימא:</strong> {patientDetails.motherName}</label>

                <strong>בעיה:</strong>
                <textarea
                    id="problemId"
                    name="problem"
                    value={treatment.problem}
                    onChange={handleChange}
                    rows="5"
                    cols="30"
                    required
                />

                <strong>תהליך טיפולי:</strong>
                <textarea
                    id="dateId"
                    name="TherapeuticProcess"
                    value={treatment.TherapeuticProcess}
                    onChange={handleChange}
                    rows="5"
                    cols="30"
                    required
                />

                <strong>תרגילי בית:</strong>
                <textarea
                    id="homeWorkId"
                    name="homeWork"
                    value={treatment.homeWork}
                    onChange={handleChange}
                    rows="5"
                    cols="30"
                    required
                />
            
            <button type="submit" className="submit-btn" onClick={addTreatment}>
                הוספה
            </button>
            </div>
        </div>
    );
}