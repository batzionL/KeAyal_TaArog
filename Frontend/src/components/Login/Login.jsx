import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [patientId, setPatientId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    /* ------------------------------ */
    const showPass = () => {
        setShowPassword((prev) => !prev);
    };


    /* ------------------------------ */
    const validatePatient = async () => {
        try {
            const response = await fetch("/get_patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientId,
                    password
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const dataPass = { name: data.firstName };
                dataPass.id = patientId;

                if (!(await ownerLogin(dataPass))) {
                    navigate('/OpenPage', { state: dataPass });
                }
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.log("Failed to validate patient: " + error.message);
        }
    };

    /* ------------------------------ */
const ownerLogin = async (dataPass) => {
        try {
            const response = await fetch("/get_owner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patientId
                }),
            });

            if (response.ok) {
                dataPass.isOwner = true;
                navigate('/OpenPage', { state: dataPass });
            }
            else {
                console.log('This patient is not an owner');
            }
        } catch (error) {
            console.log("Failed to validate owner: " + error.message);
        }
    }

    return (
        <div >
            <center>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="clientsBtn" >
                        <h1 className="titleLogin">ברוכה הבאה</h1>
                        <br />
                        <br />
                        <div >
                            <strong>הכניסי תז</strong>
                            <br />
                            <input type="text" id="IdPatient" className="form-control mb-3" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                            <label><strong>הכניסי סיסמה</strong></label>
                            <br />
                            <div className="showPass">
                                <input className="form-control mb-3" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={showPass} ></i>
                            </div>
                        </div>

                        <button className="loginBtn" type="submit" onClick={validatePatient}>
                            כניסה
                        </button>
                    </div>
                </div>
            </center>
        </div>
    );
};