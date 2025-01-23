// import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import AddPatient from './components/AddPatient/AddPatient';
import AddTreatment from './components/AddTreatment/AddTreatment';
import { Route, Routes } from 'react-router-dom';
import { AppointmentCalendar } from './components/Calendar/AppointmentCalendar';
import FirstPage from './components/Firstpage/FirstPage';
import TreatmentHistory from './components/TreatmentHistory/TreatmentHistory';

function App() {
    return (
        <div className="App">
            <img className="backgroundStyle" />
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/Patient' element={<AddPatient/>}/>
                <Route path='/NewTreatment' element={<AddTreatment/>}/>
                <Route path='/Calander' element={<AppointmentCalendar/>}/>
                <Route path='/OpenPage' element={<FirstPage/>}/>
                <Route path='TreatmentHistory' element={<TreatmentHistory/>}/>
            </Routes>
        </div>
    );
}

export default App;
