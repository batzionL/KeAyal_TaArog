import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useNavigate } from "react-router-dom";
// import backgroundImage from '../../Pictures/backgroundImage.jpeg'

export default function Login() {
    const [isVisibleOld, setIsVisibleOld] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [patientId, setPatientId] = useState("");
    const [password, setPassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBtn, setNewBtn] = useState(false);
    // const [oldBtn, setOldBtn] = useState(false);
    const navigate = useNavigate();


    /* ------------------------------ */
    const OldPatient = () => {
        setIsVisibleOld(!isVisibleOld);
        setNewBtn(!newBtn);
    };


    /* ------------------------------ */
    const newPatient = () => {
        navigate("/Calander");
    }


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
                    navigate('/OpenPage', { state: dataPass }); // Pass data to Page 2
                }
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            alert("Failed to validate patient: " + error.message);
        }
    };


    /* ------------------------------ */
    const closeModal = () => setIsModalOpen(false);


    /* ------------------------------ */
    const isOwner = () => {
        setIsModalOpen(!isModalOpen);
    }


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
            alert("Failed to validate owner: " + error.message);
        }
    }

    return (
        <div >
            <button onClick={isOwner} className="isOwner">מנהלת</button>

            <div style={{ display: isModalOpen ? "block" : "none" }} className="modal-overlay">
                <div className="modal-content">
                    <button onClick={closeModal} className="close-modal-btn">
                        X
                    </button>
                    <label>הכניסי תז</label>
                    <input type="text" id="IdPatient" className="form-control mb-3" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
                    <div className="form-group mb-3">
                        <label>הכניסי סיסמה</label>
                        <div >
                            <input className="form-control mb-3" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {/* to check why the eye doesnt work */}
                            {/* <i className={`far ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={showPass}></i> */}
                        </div>
                    </div>
                    <button className="ownerLoginBtn" type="submit" onClick={validatePatient}>
                        כניסה
                    </button>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="clientsBtn" >
                    <h1 className="mb-4">ברוכות הבאות</h1>
                    <button id="btnOldPatient" className="btn custom-btn mb-2 oldClient" onClick={OldPatient}>
                        מטופלת ותיקה
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

                    <button id="btnNewPatient" className="btn custom-btn mb-4 newClient" onClick={newPatient} style={{ display: !newBtn ? "block" : "none" }}>
                        מטופלת חדשה
                    </button>
                    <button className="loginBtn" type="submit" onClick={validatePatient}>
                        כניסה
                    </button>
                </div>
            </div>
        </div>
    );
};