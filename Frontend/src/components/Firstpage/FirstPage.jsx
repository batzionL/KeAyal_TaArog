import './FirstPage.css'
import { useNavigate, useLocation } from "react-router-dom";

export default function FirstPage() {

    const location = useLocation();
    const data = location.state;

    const navigate = useNavigate();

    const makingAnAppointment = () => {
        window.location.href = "/Calander";
    }

    const treatmentHistory = () => {
        navigate('/TreatmentHistory', { state: data.id });
    }

    const addPatient = () => {
        navigate('/Patient', { state: data.name });
    }

    const oldPatient = () => {
        window.location.href = "/TreatmentHistory";
    }

    const getToCalander = () => {
        navigate('/Calander', { state: data.id });
    }

    return (
        <center>
            <div>
                <h1>שלום {data?.name ? data.name : data}</h1>

            </div>
            <p className="idOfBtns">
                <button onClick={addPatient} style={{ display: data && data.isOwner ? "block" : "none" }}>הוספת מטופלת</button>
                <button onClick={makingAnAppointment} style={{ display: data && data.isOwner ? "none" : "block" }}>לקביעת תור</button>
                <button onClick={treatmentHistory} style={{ display: data && data.isOwner ? "none" : "block" }}>לצפייה בהיסטוריית טיפולים</button>
                <button onClick={oldPatient} style={{ display: data && data.isOwner ? "block" : "none" }}>כניסה למטופלת</button>
                <button onClick={getToCalander} style={{ display: data && data.isOwner ? "block" : "none" }}>כניסה ליומן</button>
            </p>
        </center>
    );
}