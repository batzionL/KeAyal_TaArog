import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPatientForm() {

    const getRandom6DigitNumber = () => Math.floor(100000 + Math.random() * 900000);

    const [patient, setPatient] = useState({ firstName: "", lastName: "", patientId: "", email: "", password: getRandom6DigitNumber().toString(), phone: "", dateOfBirth: "", motherName: "" });

    const [showPassword, setShowPassword] = useState(false);

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
                checkArray.push(checkNum);
            } else {
                checkArray.push(id[i]);
            }
        }
        for (let num of checkArray) {
            sum += num;
        }
        checkNum = sum + id[id.length - 1];
        return checkNum === 30;
    }

    return (
        <div dir='rtl'>
            <div className="form-container">
                <h1 className='h1'>הוספת לקוחה:</h1>

                <strong> שם פרטי:</strong>
                <input
                    name='firstName'
                    value={patient.firstName}
                    id="idFName"
                    onChange={handleChange}
                    required />

                <strong>שם משפחה:</strong>
                <input
                    name='lastName'
                    id="idLName"
                    value={patient.lastName}
                    onChange={handleChange}
                    required />

                <strong>תעודת זהות:</strong>
                <input
                    name='patientId'
                    id="IdPatient"
                    value={patient.patientId}
                    onChange={handleChange}
                    required />

                <strong> כתובת מייל:</strong>
                <input
                    type="email"
                    name='email'
                    id="emailId"
                    value={patient.email}
                    onChange={handleChange} />


                <strong>סיסמה:</strong>
                {/* <div> */}
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        id="pwdId"
                        value={patient.password}
                        onChange={handleChange}
                        required />
                    <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={() => setShowPassword(!showPassword)} ></i>
                {/* </div> */}

                <strong>מס' טלפון:</strong>
                <input
                    type="text"
                    name='phone'
                    id="phoneId"
                    value={patient.phone}
                    onChange={handleChange}
                    required />

                <strong>תאריך לידה:</strong>
                <input
                    type="date"
                    id="ageId"
                    name='dateOfBirth'
                    value={patient.dateOfBirth}
                    onChange={handleChange}
                    required />

                <strong>שם אימא:</strong>
                <input
                    type="text"
                    id="motherNameId"
                    name='motherName'
                    value={patient.motherName}
                    onChange={handleChange}
                    required />

                <button
                    type="submit"
                    onClick={addPatient}>
                    הוספה
                </button>
            </div>
        </div >
    );
};

export default AddPatientForm;
