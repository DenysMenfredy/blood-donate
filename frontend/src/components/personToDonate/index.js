import React, {useState} from 'react';

import api from '../../services/api';

import './index.css';

function PersonToDonate(props) {
    // console.log(id_doador);
    const [data, setData] = useState('');

    async function makeDonation(e, patient_id, data) { 
        e.preventDefault();
        console.log(patient_id);
        const id_doador = localStorage.getItem('donatorId');
        // localStorage.setItem('PatientId', patient_id);
        // const id_patient = localStorage.getItem('PatientId');
        const response = await api.post('/doacao/paciente', {
            donatorId:id_doador, 
            patientId:patient_id,
            data:data 
        });
        alert(response.data);

        // alert("Button clicked, brô!");

    }

    return props.persons.map( function (person) {
        return (
            <div key={person.id} className="person-box">
                <div className="person-info">
                    <div className="left-info">
                        <h4>Nome: {person.nome}</h4>
                        <h4>Idade: {person.idade} anos</h4>
                        <h4>Motivo doação: {person.motivo}</h4>
                        <input 
                            type="date"
                            id="data"
                            value={data}
                            onChange={e => setData(e.target.value)}    
                            />
                    </div>
                    <div className="right-info">
                        <h4>Tipo sanguineo: {person.tipo_sanguineo}</h4>
                        <h4>Sexo: {person.sexo}</h4>
                    </div>
                </div>
                <div className="donate-btn">
                    <button onClick={(e) => makeDonation(e, person.id, data)}>Doar</button>
                </div>
            </div>

        );
    });
}

export default PersonToDonate;