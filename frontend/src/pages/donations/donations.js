import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import './donations.css';
import DonationToPatient from '../../components/donationToPatient';
import avatar from '../../assets/blood-avatar-men.png';
import {FiEdit, FiLogOut} from 'react-icons/fi';
import {BiDonateBlood} from 'react-icons/bi';

function Donations() {
    const history = useHistory();
    const [donations, setDonations] = useState([]);
    const [userInfo, setInfo] = useState('');
    const donatorId = localStorage.getItem('donatorId');
    const [numDonations, setNumDonations] = useState('');

    useEffect(() => {
        api.get('/donator', { 
            headers: { 
                Authorization: donatorId
            }
        }).then(response => {
            setInfo(response.data);
        });
    }, [donatorId]);

    useEffect( () => {
        api.post('/donations/patients', {id:donatorId}).then(response => {
            if (response.status === 200){
                setDonations(response.data);
            } else if(response.status === 204) {
                console.log("Não foram encontradas doações pacientes realizadas por este usuário...");
            }   
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
                <div className="donation-to-patient">
                    <h1>Doações realizadas para pacientes</h1>
                    <div className="search-results">
                        <DonationToPatient donations={donations}/>
                    </div>
                </div>

               
                </div>
            </section>

    );
}

export default Donations;