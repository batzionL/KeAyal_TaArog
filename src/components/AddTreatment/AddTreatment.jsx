import './AddTreatment.css'
export default function AddTreatment() {
    return (
        <div dir="rtl">
            <center>
                <h2>הוספת טיפול:</h2>
                <br />
                {/* <form > */}
                <div>
                    <label>
                        תאריך: <input type="date" id="dateId" placeholder="בחירת תאריך" required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                    גיל: <input type="number" id="ageId" placeholder="גיל המטופלת" required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                    שם פרטי: <input type="text" id="fNameId" placeholder="שם פרטי" required />
                    </label>
                </div>
                <br />
                <div >
                    <label>
                    שם משפחה: <input type="text" id="lNameId" placeholder="שם משפחה" required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                    שם אימא: <input type="text" id="motherNameId" placeholder="שם אימא" required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                    בעיה: <input type="text" id="problemId" placeholder="בעיה" required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                    תהליך טיפולי: <input type="text" id="dateId" placeholder="תהליך טיפולי" required />
                    </label>
                </div>
                <br />
                <div>
                    <label>
                    תרגילי בית: <input type="text" id="homeWorkId" placeholder="תרגילי בית" required />
                    </label>
                </div>
                <br />
                {/* <button type="submit" onClick={addPatient}>הוספה</button> */}
                <button type="submit">הוספה</button>

                {/* </form> */}
            </center>
        </div>
    );
}