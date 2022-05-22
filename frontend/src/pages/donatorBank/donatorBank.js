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
    const [userInfo, setInfo] = useState({});
    const [donatorId, setDonatorId] = useState(null);
    const [banks, setBanks] = useState([]);
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
                    localStorage.setItem('donatorId', response.data.decoded.donatorId);
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
            console.log('response from getUserInfo:', response);
            if (response.data.code === 200) {
                setInfo(response.data.donator);
            } else if (response.data.code === 204) {
                console.log('no user found');
            }
        }).catch(error => {
            console.log('error from getUserInfo:', error);
        })

    }

    useEffect(() => {
        validateUser();
    }, []);
    useEffect(() => {
        if(donatorId) {
            getUserInfo();
        }
    }, [donatorId]);

   useEffect( () => {
        api.get('/bank').then(response => {
            setBanks(response.data);
            console.log('banks', response.data);
        });
   }, []);

   useEffect( () => {
    async function loadNumDonations() {
       const response = await api.get('/donator/numDonations', {donatorId});
       console.log('response from loadNumDonations:', response);
       if (response.status === 200) {
               console.log('numDonations:', response.data);
               setNumDonations(response.data.numDonations);
       }
   }
   loadNumDonations();
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
                    {userInfo.user && <h4>{userInfo.user.name}</h4>}
                    {userInfo.user && <h5>Tipo sanguineo: {userInfo.user.bloodType}</h5> }
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
                <div className="donate-to-bank">
                    <h1>Bancos de Sangue disponivéis para doação</h1>
                    <div className="search-results">
                        <BankToDonate banks={banks}/>
                    </div>

                    {/* <BankToDonate component here */} 
                </div>
            </div>
        </section>
    );
}

export default DonatorBank;