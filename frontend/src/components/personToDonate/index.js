import React, {useState} from 'react';

import api from '../../services/api';

import './index.css';

function PersonToDonate(props) {
    // console.log(id_doador);
    const [data, setData] = useState('');

    async function makeDonation(e, patientId, data) { 
        e.preventDefault();
        // console.log(patientId);
        const idDoador = localStorage.getItem('donatorId');
        // localStorage.setItem('PatientId', patient_id);
        // const id_patient = localStorage.getItem('PatientId');
        const response = await api.post('/donation/patient', {
            donatorId:idDoador, 
            patientId:patientId,
            date:data 
        });
        alert(response.data);

        // alert("Button clicked, brô!");

    }

    return props.persons.map( function (person) {
        return (
            <div key={person.patientId} className="person-box">
                <div className="person-info">
                    <div className="left-info">
                        <h4>Name: {person.user.name}</h4>
                        <h4>Birth Date: {person.user.birthDate}</h4>
                        <h4>Reason: {person.reason}</h4>
                        <input 
                            type="date"
                            id="data"
                            value={data}
                            onChange={e => setData(e.target.value)}    
                            />
                    </div>
                    <div className="right-info">
                        <h4>Blood type: {person.user.bloodType}</h4>
                        <h4>Sex: {person.user.sex}</h4>
                    </div>
                </div>
                <div className="donate-btn">
                    <button onClick={(e) => makeDonation(e, person.id, data)}>Donate</button>
                </div>
            </div>

        );
    });
}

export default PersonToDonate;