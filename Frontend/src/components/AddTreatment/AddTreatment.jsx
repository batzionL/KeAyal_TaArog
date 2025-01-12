import { useState } from 'react';
import './AddTreatment.css';

export default function AddTreatment() {

    const [treatment, setTreatment] = useState({ treatment_date: "", age: "", firstName: "", motherName: "", problem: "", TherapeuticProcess: "", homeWork: "" });

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
                body: JSON.stringfy(treatment),
            });
            if (response.ok)
                setTreatment({ treatment_date: "", age: "", firstName: "", motherName: "", problem: "", TherapeuticProcess: "", homeWork: "" });
            else { const errorData = await response.json(); }
        }
        catch (error) {
            alert("Failed to add treatment: " + error.message);
        }
    }

    const today = new Date(); // Get the current date
    const formattedDate = today.toLocaleDateString();

    return (
        <div dir="rtl">
            <center>
                <h2>הוספת טיפול:</h2>
                <br />
                <div>
                    <label
                        name='treatment_date'
                        value={treatment.treatment_date}>
                        תאריך:
                        {formattedDate}
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        גיל:
                        <input
                            type="number"
                            id="ageId"
                            name='age'
                            value={treatment.age}
                            onChange={handleChange}
                            placeholder="גיל המטופלת"
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        שם פרטי:
                        <input
                            type="text"
                            id="fNameId"
                            name='firstName'
                            value={treatment.firstName}
                            onChange={handleChange}
                            placeholder="שם פרטי"
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        שם אימא:
                        <input
                            type="text"
                            id="motherNameId"
                            name=' motherName'
                            value={treatment.motherName}
                            onChange={handleChange}
                            placeholder="שם אימא"
                            required />
                    </label>
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