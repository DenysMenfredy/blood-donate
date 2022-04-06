import React, {useState} from 'react';

import api from '../../services/api';

import './index.css';

function PersonToDonate({patient}) {
    // console.log(id_doador);
    const [date, setData] = useState('');

    async function makeDonation(e, patientId, date) { 
        e.preventDefault();
        // console.log(patientId);
        const donatorId = localStorage.getItem('donatorId');
        // localStorage.setItem('PatientId', patient_id);
        // const id_patient = localStorage.getItem('PatientId');
        const response = await api.post('/donation/patient', {
            donatorId:donatorId, 
            patientId:patientId,
            date:date 
        });
        if (response.data.code === 201) {
            alert(response.data.message);
        } else {
            alert(response.data.message);
        }

        // alert("Button clicked, brô!");

    }

    function formatDate(birthDate) {
        let date = new Date(birthDate);
        return date.toLocaleDateString('pt-BR');
    }

        return (
            <div className="person-box">
                <div className="person-info">
                    <div className="left-info">
                        <h4>Name: {patient.user.name}</h4>
                        <h4>Birth Date: {formatDate(patient.user.birthDate)}</h4>
                        <h4>Reason: {patient.reason}</h4>
                        <input 
                            type="date"
                            id="data"
                            value={date}
                            onChange={e => setData(e.target.value)}    
                            />
                    </div>
                    <div className="right-info">
                        <h4>Blood type: {patient.user.bloodType}</h4>
                        <h4>Sex: {patient.user.sex}</h4>
                    </div>
                </div>
                <div className="donate-btn">
                    <button onClick={(e) => makeDonation(e, patient.patientId, date)}>Donate</button>
                </div>
            </div>

        );
}

export default PersonToDonate;