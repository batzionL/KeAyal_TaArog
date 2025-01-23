





//צריך לסדר את התז של המטופלת, איך להכניס את זה לתוך הטיפול ולהצליח להוסיף טיפול 






import { useEffect, useState, useRef } from 'react';
import './AddTreatment.css';
// import { data } from 'react-router-dom';

export default function AddTreatment() {

    const [isPopupOpen, setIsPopupOpen] = useState(true);
    // const idRef = useRef(null);
    const [treatment, setTreatment] = useState({ patientId: "", treatment_date: "", problem: "", TherapeuticProcess: "", homeWork: "" });
    const [patientDetails, setPatientDetails] = useState({});
    const [age, setAge] = useState(null);
    const [patientId, setPatientId] = useState("");

    // const[id,setId]=useState("");
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    useEffect(() => {
        if (patientId)
            setTreatment({ ...treatment, patientId: patientId, treatment_date: today });
    }, [patientId]);

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
                setIsPopupOpen(prevState => !prevState);
            }
            else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            alert("Failed to validate owner: " + error.message);
        }
    }

    // const handleChangeId = (e) => {
    // const { name, value } = e.target;
    // setId({ ...id, [name]: value });
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTreatment({ ...treatment, [name]: value });
    }


    const addTreatment = async (e) => {
        e.preventDefault();
        // if (!treatment.patientId || treatment.patientId.trim() === "") {
        // alert("Patient ID is required");
        // return;
        // }
        // console.log('treatment - ', treatment)
        try {
            const response = await fetch("/add_treatment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({
                    // ...treatment,
                    // patient_id: idRef.current.value
                // }),
                body: JSON.stringify(treatment)
            });
            if (response.ok)
                setTreatment({ patientId: "", treatment_date: "", problem: "", TherapeuticProcess: "", homeWork: "" });
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
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <label>הכניסי תז של מטופלת
                            {/* <input  name='id' */}
                            {/* // value={id} */}
                            {/* // onChange={handleChangeId} /> */}
                            {/* <input ref={idRef} /> */}
                            <input value={patientId} onChange={(e) => setPatientId(e.target.value)} />
                        </label>
                        <button onClick={getPatientDetails}>הבא</button>
                    </div>
                </div>
            )}

            <center>
                <h2>הוספת טיפול:</h2>
                <br />
                <div>
                    <label
                        name='patientId'
                        // value={idRef.current.value}
                        onChange={handleChange}>
                    </label>
                </div>
                <br />
                <div>
                    <label
                        name='treatment_date'
                        value={treatment.treatment_date}
                        onChange={handleChange}>
                        תאריך:
                        {formattedDate}
                    </label>
                </div>
                <br />
                <div>
                    <label>שם: {patientDetails.firstName}</label>
                </div>
                <br />
                <div>
                    <label>גיל: {age}</label>
                </div>
                <br />
                <div>
                    <label>שם אימא: {patientDetails.motherName}</label>
                </div>
                <br />
                <div>
                    <label>
                        בעיה:
                        <input
                            type="text"
                            id="problemId"
                            name='problem'
                            value={treatment.problem}
                            onChange={handleChange}
                            placeholder="בעיה"
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        תהליך טיפולי:
                        <input
                            type="text"
                            id="dateId"
                            name='TherapeuticProcess'
                            value={treatment.TherapeuticProcess}
                            onChange={handleChange}
                            placeholder="תהליך טיפולי"
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        תרגילי בית:
                        <input
                            type="text"
                            id="homeWorkId"
                            name='homeWork'
                            value={treatment.homeWork}
                            onChange={handleChange}
                            placeholder="תרגילי בית"
                            required />
                    </label>
                </div>
                <br />
                <button
                    type="submit"
                    onClick={addTreatment}>
                    הוספה
                </button>
            </center>
        </div>
    );
}