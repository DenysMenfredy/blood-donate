import React from 'react';

import './index.css';


function DonationToPatient(props) { 
    return props.donations.map(function (donation) {
        return (
            <div key={donation.id} className="donation-box">
                <div className="donation-info">
                    <div className="left-info">
                            <h4>Nome: {donation.nome}</h4>
                            <h4>Idade: {donation.idade} anos</h4>
                            <h4>Motivo: {donation.motivo}</h4>
                    </div>
                    <div className="right-info">
                        <h4>Tipo sanguineo: {donation.tipo_sanguineo}</h4>
                        <h4>Sexo: {donation.sexo}</h4>
                        <h4>Data de doação: {donation.data_doacao}</h4>
                    </div>
                </div>
                
            </div>
        )
    });

}


export default DonationToPatient;
