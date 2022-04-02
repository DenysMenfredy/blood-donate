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


    async function handleLogin(e) {
        e.preventDefault();
        const response = await api.post('/login', {username, password});
        console.log('response:', response);
        if (response.status === 200) {
            setDonatorId(response.data.donatorId);
            setAuthorized(true);
            localStorage.setItem('access_token', response.data.token);
            // localStorage.setItem('donatorId', response.data.donatorId);
            history.push('/donator');
        }
        if(!response){
            alert('Login failed');
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