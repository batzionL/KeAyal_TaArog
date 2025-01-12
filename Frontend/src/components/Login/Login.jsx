import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [isVisibleOld, setIsVisibleOld] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [patientId, setPatientId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const OldPatient = () => {
        setIsVisibleOld(!isVisibleOld);
    };

    const newPatient = () => {
        // setIsVisibleNew(!isVisibleNew);
        navigate("/Calander");
    }

    const showPass = () => {
        setShowPassword((prev) => !prev);
    };

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
                // ניתן להפנות לדף אחר אם המטופל נמצא
                window.location.href = "/Patient";
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            alert("Failed to validate patient: " + error.message);
        }
    };
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 bg-white rounded shadow-sm text-center clientsBtn" >
                <h1 className="mb-4">ברוכות הבאות</h1>
                <button id="btnOldPatient" className="btn custom-btn mb-2 oldClient" onClick={OldPatient}>
                    מטופלת ותיקה
                </button>
                <button id="btnNewPatient" className="btn custom-btn mb-4 newClient" onClick={newPatient}>
                    מטופלת חדשה
                </button>

                <div style={{ display: isVisibleOld ? "block" : "none" }}>
                    <label>הכניסי תז</label>
                    <input type="text" id="IdPatient" className="form-control mb-3" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                    <div className="form-group mb-3">
                        <label>הכניסי סיסמה</label>
                        <div >
                            <input className="form-control mb-3" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {/* to check why the eye doesnt work */}
                            <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={showPass}></i>
                        </div>
                    </div>
                </div>
                <button className="btn custom-button w-100 loginBtn" type="submit" onClick={validatePatient}>
                    כניסה
                </button>
            </div>
        </div>
    );
};