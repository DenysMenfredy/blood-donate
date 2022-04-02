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
    const [donatorId, setDonatorId] = useState(null);
    console.log('donatorId:', donatorId);
    
    // const [userId, setUserId] = useState(null);
    const [patients, setPatients] = useState([]);
    const [numDonations, setNumDonations] = useState('');
    
    async function validateUser() {
        const token = localStorage.getItem('access_token');
        console.log('token:', token);
        if(token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Application: 'application/json'
            }}
            const response = await api.post('/validate', {}, config);
            console.log('response:', response);
            if(response.status === 200) {
                setDonatorId(response.data.decoded.donatorId);
                return true;
            }
            return false;
        }
        return false;
    }

    async function getUserInfo() {
        const response = await api.get(`/donator/d/${donatorId}`);
        console.log('donator:', response.data);
        if(response.status === 200) {
            setInfo(response.data);
        }
    }

    useEffect(() => {
        if(!validateUser()) {
            console.log('User not authorized');
            history.push('/403');
        }
        console.log('User authorized');
        getUserInfo();
    } , [donatorId]);

   useEffect( () => {
       async function loadPatients() {
           const response = await api.get('/patient');
           if (response.status === 200) {
                setPatients(response.data);
           }
        }
        loadPatients();
   }, []);

//    useEffect( () => {
//          async function loadNumDonations() {
//             const response = await api.post('/donator/numDonations', {donatorId});
//             if (response.status === 200) {
//                     console.log('numDonations:', response.data);
//                     setNumDonations(response.data.numDonations);
//             }
//         }
//         loadNumDonations();
//    }, []);
    console.log('user info:', userInfo);
    // console.log('Blood Type:', userInfo.user.bloodType);

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
                    {/* <h5>Tipo sanguineo: {userInfo.user.bloodType}</h5> */}
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
                    {patients.map( (patient) => (
                            <PersonToDonate key={patient.patientId} patient={patient} />
                        )
                    )}
                </div>

                
            </div>
        </section>
    );
}

export default Donator;