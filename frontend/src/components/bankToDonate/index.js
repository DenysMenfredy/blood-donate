import React, {useState} from 'react';

import api from '../../services/api';

import './index.css';

function BankToDonate(props) {
    // console.log(id_doador);
    const [data, setData] = useState('');

    async function makeDonation(e, id_banco, data) { 
        e.preventDefault();
        const id_doador = localStorage.getItem('donatorId');
        // localStorage.setItem('BankId', bank_id);
        // const id_patient = localStorage.getItem('BankId');
        const response = await api.post('/doacao/banco', {
                    donatorId:id_doador, 
                    bankId:id_banco,
                    data:data 
        });
        alert(response.data);

        // alert("Button clicked, brô!");

    }

    return props.banks.map( function (bank) {
        return (
            <div key={bank.id_banco} className="bank-box">
                <div className="bank-info">
                    <div className="left-info">
                        <h4>Nome: {bank.nome}</h4>
                        <h4>Endereço: {bank.endereco}</h4>
                        <h4>Telefone: {bank.telefone}</h4>
                        <input 
                            type="date"
                            id="data"
                            value={data}
                            onChange={e => setData(e.target.value)}    
                            />
                    </div>
                    <div className="right-info">
                        <h4>Cidade: {bank.cidade}</h4>
                        <h4>UF: {bank.uf}</h4>
                    </div>
                </div>
                <div className="donate-btn">
                    <button onClick={(e) => makeDonation(e, bank.id_banco, data)}>Doar</button>
                </div>

                {/* <div className="donation-confirm">
                    <h3>Confirmar doação?</h3>
                    <div>
                        <button onClick={(e) => alert('clicou em confirmar')}>Confirmar</button>
                        <button onClick={(e) => alert('clicou em cancelar')}>Cancelar</button>
                    </div>
                </div> */}

            </div>

        );
    });
}

export default BankToDonate;