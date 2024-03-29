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
    const [donatorId, setDonatorId] = useState(null);
    const [numDonations, setNumDonations] = useState('');


    async function validateUser() {
        const token = localStorage.getItem('access_token');
        // console.log('token:', token);
        if(token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Application: 'application/json'
            }}
            api.post('/validate', {}, config)
            .then(response => {
                if(response.data.code === 200) {
                    console.log('response from route validate:', response);
                    setDonatorId(response.data.decoded.donatorId);
                } else if (response.data.code === 401) {
                    console.log('unauthorized');
                    history.push('/403');
                    setTimeout( () => {
                        history.push('/');
                    }, 3000);
                }
            }).catch(error => {
                console.log('error from route validate:', error);
                history.push('/403');
            });   
        } else {
            console.log('no token');
            history.push('/403');
                setTimeout( () => {
                    history.push('/');
            }, 3000);
        }
    }

    async function getUserInfo() {
        api.get(`/donator/d/${donatorId}`)
        .then(response => {
            // console.log('response from getUserInfo:', response);
            setInfo(response.data.donator);
        }).catch(error => {
            console.log('error from getUserInfo:', error);
        })
    }

    useEffect(() => {
        validateUser();
    }, []);

    useEffect(() => {
        getUserInfo();
    }, [donatorId]);

    useEffect( () => {
        api.get('/donation/patient', {donatorId:donatorId})
        .then(response => {
            if (response.data.code === 200) {
                setDonations(response.data.donations);
            } else if (response.data.code === 204) {
                console.log('no donations found');
            }
        }).catch(error => {
            console.log(error);
        })
   }, [donatorId]);

//    useEffect( () => {
//         api.post('/donator/numDonations', {donatorId}).then(response => {
//             setNumDonations(response.data.num_donations);
//         });
//     });

    console.log('donations:', donations);

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
                <div className="donation-to-patient">
                    <h1>Doações realizadas para pacientes</h1>
                    {donations.length > 0 ? (
                        <div className="search-results">
                            {donations && <DonationToPatient donations={donations}/> }
                        </div>
                    ) : (
                        <div className="no-results">
                            <h2>No donations to patients</h2>
                        </div>
                    )}
                </div>

               
                </div>
            </section>

    );
}

export default Donations;