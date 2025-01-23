import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddPatientForm() {

    const [patient, setPatient] = useState({ firstName: "", lastName: "", patientId: "", email: "", password: "", phone: "", dateOfBirth: "", motherName: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const addPatient = async (e) => {
        e.preventDefault();
        try {
            // if (!checkId(patient.patientId)) {
            // alert("תז הזהות לא תקינה");
            // }
            // else {
            const response = await fetch("/add_patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patient),
            });

            if (response.ok) {
                // alert("Patient added successfully!");
                setPatient({ firstName: "", lastName: "", patientId: "", email: "", password: "", phone: "", dateOfBirth: "", motherName: "" });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
            // }
        } catch (error) {
            alert("Failed to add patient: " + error.message);
        }
    };

    const checkId = (id) => {
        let checkArray = [];
        let checkNum = 0, sum = 0;
        for (let i = 0; i < id.length - 1; i++) {
            if (i % 2 === 0) {
                checkNum = id[i] * 2;
                if (checkNum > 9) {
                    checkNum = Math.floor(checkNum / 10) + (checkNum % 10);
                }
                checkArray.push(checkNum); // Even index
            } else {
                checkArray.push(id[i]);  // Odd index
            }
        }
        for (let num of checkArray) {
            sum += num;
        }
        checkNum = sum + id[id.length - 1];
        return checkNum === 30;
    }

    return (
        <center dir='rtl'>
            <div>
                <h1>הוספת לקוחה:</h1>
                <br />
                <div>
                    <label>
                        שם פרטי:
                        <input
                            type="text"
                            name='firstName'
                            value={patient.firstName}
                            id="idFName"
                            onChange={handleChange}
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        שם משפחה:
                        <input
                            type="text"
                            name='lastName'
                            id="idLName"
                            value={patient.lastName}
                            onChange={handleChange}
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        תעודת זהות:
                        <input
                            type="text"
                            name='patientId'
                            id="IdPatient"
                            value={patient.patientId}
                            onChange={handleChange}
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        כתובת מייל:
                        <input
                            type="email"
                            name='email'
                            id="emailId"
                            value={patient.email}
                            onChange={handleChange} />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        סיסמה:
                        <input
                            type="password"
                            name='password'
                            id="pwdId"
                            value={patient.password}
                            onChange={handleChange}
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        מס' טלפון:
                        <input
                            type="text"
                            name='phone'
                            id="phoneId"
                            value={patient.phone}
                            onChange={handleChange}
                            required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                        תאריך לידה:
                        <input
                            type="date"
                            id="ageId"
                            name='dateOfBirth'
                            value={patient.dateOfBirth}
                            onChange={handleChange}
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
                            name='motherName'
                            value={patient.motherName}
                            onChange={handleChange}
                            required />
                    </label>
                </div>
                <br />
                <button
                    type="submit"
                    onClick={addPatient}>
                    הוספה
                </button>
            </div>
        </center >
    );
};

export default AddPatientForm;
