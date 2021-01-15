import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './login.css';
import logoImg from '../../assets/logo.png';
import bloodDonate from '../../assets/donation.png';



function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('login', {username, password});
            // console.log(response);
            localStorage.setItem('donatorId', response.data.userInfo.id);
            localStorage.setItem('username', response.data.userInfo.username);
            
            history.push('/donator');
        } catch(err) {
            alert("Falha no login, tente novamente.")
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