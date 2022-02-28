import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './login.css';
import logoImg from '../../assets/logo.png';
import bloodDonate from '../../assets/donation.png';



function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [donatorId, setDonatorId] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const history = useHistory();


    function handleTokenValidation() {
        const token = sessionStorage.getItem('token');
        // console.log('token', token);
        const config = {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };
        api.post('/validate', {}, config)
            .then((response) => {
                console.log('auth:', response.data);
                if(response.status === 200) {
                    console.log('donatorId:', response.data.decoded.donatorId);
                    setDonatorId(response.data.decoded.donatorId);
                    setAuthorized(true);
                    return true;
                } else {
                    // history.push('/403');   
                    setAuthorized(false);
                    // setTimeout(() => {
                    //     history.push('/');
                    // }, 5000);
            }
                console.log(donatorId);
            })
            .catch((error) => {
                console.log('err:', error);
            })
            
    }


    async function handleLogin(e) {
        e.preventDefault();
        
        try {
            const response = await api.post('/login', {username, password});
            if (response.status === 200) {
                    sessionStorage.setItem('token', response.data.token);
                    if (handleTokenValidation()) {
                        history.push({pathname: '/donator', state: {
                            authorized: authorized, 
                            donatorId: donatorId
                        }});
                    } else {
                        history.push('/403');
                        setTimeout( () => {
                            history.push('/');
                        }, 5000);
                    }
                } else {
                    sessionStorage.removeItem('token');
                    alert('username or password incorrect.');
                }

            } catch (error) {
                console.log('err:', error);
                alert('Failed to login. Please try again.');
            }
            
        }
        

    

    return (
        <section className="login-container">
            <div className="left-half">
                <div className="logo">
                    <img src={logoImg} alt="Blood Donate" />
                </div>
                <div className="donation-pic">
                 <img src={bloodDonate} alt="Donation" />
                 </div>
            </div>

            <div className="right-half">
                <div className="login-section">
                    <h1>Entre e doe sangue</h1>
                    <form onSubmit={handleLogin}>
                        <div className="user-input">
                            <input 
                                type="text" 
                                placeholder="Insira o nome de usuário" 
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                />
                        </div>
                        <div className="password-input">
                            <input 
                                type="password" 
                                placeholder="Insira sua senha" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                        <span className="link-create-account">Não pussui uma conta? 
                        <Link to="/cadastro"> Cadastre-se agora </Link></span>
                </div>
            </div>
        </section>
    );
}

export default Login;