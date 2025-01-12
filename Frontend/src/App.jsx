// import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import AddPatient from './components/AddPatient/AddPatient';
import AddTreatment from './components/AddTreatment/AddTreatment';
import { Route, Routes } from 'react-router-dom';
import { AppointmentCalendar } from './components/Calendar/AppointmentCalendar';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/Patient' element={<AddPatient/>}/>
                <Route path='/Treatment' element={<AddTreatment/>}/>
                <Route path='/Calander' element={<AppointmentCalendar/>}/>
            </Routes>
        </div>
    );
}

export default App;
