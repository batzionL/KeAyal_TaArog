import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { AppointmentCalendar } from "../Calendar/AppointmentCalendar";

export default function Login() {
    const [isVisibleOld, setIsVisibleOld] = useState(false);
    const [isVisibleNew, setIsVisibleNew] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [id, setId] = useState("");
    const [password, setPassword] = useState("")

    const OldPatient = () => {
        setIsVisibleOld(!isVisibleOld);
    };

    const newPatient = () => {
        setIsVisibleNew(!isVisibleNew);
    }

    const showPass = () => {
        setShowPassword((prev) => !prev);
    };

    const getPatientUsername = () => {
        window.location.href = "/addPatient";
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
                    <input type="text" id="IdPatient" className="form-control mb-3" value={id} onChange={(e) => setId(e.target.value)} required />
                    <div className="form-group mb-3">
                        <label>הכניסי סיסמה</label>
                        <div >
                            <input className="form-control mb-3" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {/* to check why the eye doesnt work */}
                            <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={showPass}></i>
                        </div>
                    </div>
                </div>

                <div style={{ display: isVisibleNew ? "block" : "none" }}>
                    <AppointmentCalendar/>
                </div>

                <button className="btn custom-button w-100 loginBtn" type="submit" onClick={getPatientUsername}>
                    כניסה
                </button>
            </div>
        </div>
    );
};