import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddPatientForm() {

    const firstName = useRef();
    const lastName = useRef();
    const idPatien = useRef();
    const email = useRef();
    const password = useRef();

    const addPatient = async () => {
        try {
            if (!checkId(idPatien.current.value)) {
                alert("תז הזהות לא תקינה");
            } else {
                const response = await fetch('/addPatient', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        FName: firstName.current.value,
                        LName: lastName.current.value,
                        id: idPatien.current.value,
                        Email: email.current.value,
                        password: password.current.value
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                alert('Successfully added patient');
                window.location.href = '/Login';
            }
        } catch (error) {
            alert(error)
            console.error('Error adding patient:', error);
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
        <form>
            <h1>הוספת לקוחה:</h1>
            <input type="text" id="idFName" ref={firstName} placeholder="First Name" required />
            <input type="text" id="idLName" ref={lastName} placeholder="Last Name" required />
            <input type="text" id="IdPatient" ref={idPatien} placeholder="Patient ID" required />
            <input type="email" id="emailId" ref={email} placeholder="Email" required />
            <input type="password" id="pwdId" ref={password} placeholder="Password" required />
            <button type="submit" onClick={addPatient}>Add Patient</button>
        </form>
    );
};

export default AddPatientForm;
