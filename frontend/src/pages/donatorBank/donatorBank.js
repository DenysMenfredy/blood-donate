import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import './donatorBank.css';
import BankToDonate from '../../components/bankToDonate';
import avatar from '../../assets/blood-avatar-men.png';
import {FiEdit, FiLogOut} from 'react-icons/fi';
import {BiDonateBlood} from 'react-icons/bi';

function DonatorBank() {
    const history = useHistory();
    const [userInfo, setInfo] = useState('');
    const donatorId = localStorage.getItem('donatorId');
    const [bancos, setBancos] = useState([]);
    const [numDonations, setNumDonations] = useState('');

    useEffect(() => {
        api.get('donator', { 
            headers: { 
                Authorization: donatorId
            }
        }).then(response => {
            setInfo(response.data);
        });
    }, [donatorId]);

   useEffect( () => {
        api.get('/banco/all').then(response => {
            setBancos(response.data);
            // console.log(response.data);
        });
   });

   useEffect( () => {
    api.post('/donator/numDonations', {donatorId}).then(response => {
         setNumDonations(response.data.num_donations);
    });
});
    // console.log(userInfo);

    function handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        history.push('/');
    }

    return (
        <section className="container">
            <aside className="left-bar">
                <div className="user-info">
                    <img src={avatar} alt="blood avatar " />
                    <h4>{userInfo.nome}</h4>
                    <h5>Tipo sanguineo: {userInfo.tipo_sanguineo}</h5>
                    <span> {numDonations} doações realizadas</span>
                </div>
                <div className="divisor" />
                <nav className="aside-menu">
                    <ul>
                        <li>
                            <BiDonateBlood size="20px" /> 
                            <Link to="/donations"> Minhas doações</Link>
                        </li>
                        <li>
                            <FiLogOut size="20px" />
                            <Link to="/" onClick={handleLogout}>Sair da conta</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="right-content">
                <div className="donate-btns">
                    <Link to="/donator">
                        <button>Doar para paciente</button>
                    </Link>
                   
                    <Link to="/donatorBank">
                        <button>Doar para Banco de sangue</button>
                    </Link>
                </div>
                <div className="donate-to-bank">
                    <h1>Bancos de Sangue disponivéis para doação</h1>
                    <div className="search-results">
                        <BankToDonate banks={bancos}/>
                    </div>

                    {/* <BankToDonate component here */} 
                </div>
            </div>
        </section>
    );
}

export default DonatorBank;