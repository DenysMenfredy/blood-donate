import React from 'react';

import './index.css';


function DonationToBank(props) { 
    return props.donations.map(function (donation) {
        return (
            <div key={donation.id} className="donation-box">
                <div className="donation-info">
                    <div className="left-info">
                            <h4>Nome: {donation.nome}</h4>
                            <h4>Endereço: {donation.endereco}</h4>
                            <h4>Telefone: {donation.telefone}</h4>
                    </div>
                    <div className="right-info">
                        <h4>Cidade: {donation.cidade}</h4>
                        <h4>UF: {donation.uf}</h4>
                        <h4>Data de doação: {donation.data_doacao}</h4>
                    </div>
                </div>
                
            </div>
        )
    });

}


export default DonationToBank;
