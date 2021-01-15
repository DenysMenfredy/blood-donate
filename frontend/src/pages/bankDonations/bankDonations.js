import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import './bankDonations.css';
import DonationToBank from '../../components/donationToBank';
import avatar from '../../assets/blood-avatar-men.png';
import {FiEdit, FiLogOut} from 'react-icons/fi';
import {BiDonateBlood} from 'react-icons/bi';

function BankDonations() {
    const history = useHistory();
    const [donations, setDonations] = useState([]);
    const [userInfo, setInfo] = useState('');
    const donatorId = localStorage.getItem('donatorId');
    const username = localStorage.getItem('username');
    const [numDonations, setNumDonations] = useState('');

    useEffect(() => {
        api.get('/donator', { 
            headers: { 
                Authorization: username
            }
        }).then(response => {
            setInfo(response.data);
        });
    }, [username]);

    useEffect( () => {
        api.post('/donations/banks', {id:donatorId}).then(response => {
                setDonations(response.data);
            // console.log(response.data);
        });
   });

   useEffect( () => {
    api.post('/donator/numDonations', {donatorId}).then(response => {
         setNumDonations(response.data.num_donations);
    });
});


    function handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        history.push('/');
    }

    
    return (
        
        <section className="container">
            <aside className="left-bar">
                <div className="user-info">
                    <Link to="/donator">
                        <img src={avatar} alt="blood avatar " />
                    </Link>
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
                            <FiEdit size="20px" />
                            <Link to="#">Editar perfil</Link>
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
                    <Link to="/donations">
                        <button>Doações realizadas para paciente</button>
                    </Link>
                    <Link to="/donations/banks">
                        <button>Doações realizadas para Bancos de sangue</button>
                    </Link>
                </div>
                <div className="donation-to-bank">
                    <h1>Doações realizadas para bancos de sangue</h1>
                    <div className="search-results">
                        <DonationToBank donations={donations}/>
                    </div>
                </div>

                </div>
            </section>

    );
}

export default BankDonations;