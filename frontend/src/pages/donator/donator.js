import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import './donator.css';
import PersonToDonate from '../../components/personToDonate';
import avatar from '../../assets/blood-avatar-men.png';
import {FiEdit, FiLogOut} from 'react-icons/fi';
import {BiDonateBlood} from 'react-icons/bi';

function Donator() {
    const history = useHistory();
    const [userInfo, setInfo] = useState({});
    const username = localStorage.getItem('username');
    const [donatorId, setDonatorId] = useState(null);
    const [patients, setPatients] = useState([]);
    const [numDonations, setNumDonations] = useState('');

    //TODO: rename all this variables to new db names

    function handleTokenValidation() {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };

        api.post('/validate', {}, config)
        .then((response) => {
            console.log('auth:', response.data);
            if(response.status === 200) {
                console.log(response.data);
                setDonatorId(response.data.donatorId);
            } else {
                setTimeout(() => {
                    history.push('/403');   
                }, 5000);
                history.push('/')
            }  
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleTokenValidation();

        api.get(`/donator/${donatorId}`)
        .then(response => {
            console.log('info:', response.data);
            setInfo(response.data);
        });
    }, [donatorId]);

   useEffect( () => {
        api.post('/patient', {donatorId}).then(response => {
            setPatients(response.data);
            console.log('patients:', response.data);
        });
   });

   useEffect( () => {
       api.post('/donator/numDonations', {donatorId}).then(response => {
            //TODO: fix-me-> backend route doesn't return numDonations
            console.log('numDonations:', response.data);
            setNumDonations(response.data.donations);
       });
   });
    console.log('user info:', userInfo);


    function handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }

    return (
        <section className="container">
            <aside className="left-bar">
                <div className="user-info">
                    <img src={avatar} alt="blood avatar " />
                    <h4>{userInfo.username}</h4>
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
                    <Link to="/donator">
                        <button>Doar para paciente</button>
                    </Link>
                   
                    <Link to="/donatorBank">
                        <button>Doar para Banco de sangue</button>
                    </Link>
                </div>
                <div className="donate-to-patient">
                    <h1>Pacientes disponivéis para doação</h1>
                    <div className="search-results">
                        <PersonToDonate persons={patients}/>
                    </div>
                </div>

                
            </div>
        </section>
    );
}

export default Donator;