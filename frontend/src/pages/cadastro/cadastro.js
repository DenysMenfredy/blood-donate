import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './cadastro.css';

import logoLarge from '../../assets/logo-large.png'

function Cadastro() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [bloodType, setBloodType] = useState('');

    async function handleCadastro(e) {
        e.preventDefault(); 
        await api.post('/donator', {
            name, 
            birthDate, 
            gender, 
            username,
            password,
            phone,
            bloodType
        }).then( (response) => {
            console.log(response.data);
            alert('Succefully registered!');
            setTimeout(() => {
                history.push('/');
            }, 2000);
        }).catch( (error) => {
            console.log(error);
            alert('Error registering!');
        });
    }

    return (
        <section className="cad-container">
            <div className="lh">
                <img src={logoLarge} alt="logo blood-donate" />
                <div className="back-to-login">
                    <Link to="/">Back to Login</Link>
                </div>
            </div>

            <div className="rh">
                <div className="cad-section">
                <h1>Create an account now and save lifes!</h1>
                <form onSubmit={handleCadastro}>
                <h4>Personal Information</h4>
                    <div className="input-name">                        
                        <input 
                            type="text" 
                            placeholder="type your name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                         />
                    </div>

                    <div className="input-age">
                        <input 
                            type="date" 
                            placeholder="your birth date"
                            value={birthDate}
                            // parse={value => !value ? null : Number(value)}
                            onChange={e => setBirthDate(e.target.value)}
                            required
                         />
                    </div>
                    <div className="input-fone">
                        <input
                            type="number"
                            placeholder="Insert a phone number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-gender">
                        <label htmlFor="gender">Insert your gender</label> 
                            <select 
                                    name="gender" 
                                    id="gender" 
                                    value={gender} 
                                    onChange={e => setGender(e.target.value)}
                                    required>
                                <option value="M">Man</option>
                                <option value="W">Women</option>
                                {/* <option value="X">No </option> */}
                            </select>
                    </div>

                    <div className="input-blood">
                        <label htmlFor="blood">Insert your blood type</label> 
                            <select name="blood" 
                                    id="blood" 
                                    value={bloodType} 
                                    onChange={e => setBloodType(e.target.value)}
                                    required>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                    </div>
                    <h4>Login Information</h4>
                    <div className="input-username">
                        <input 
                            type="text" 
                            placeholder="Insert your username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                         />
                    </div>
                    <div className="input-password">
                        <input 
                            type="password" 
                            placeholder="Insert your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                         />
                    </div>
                    <button type="submit">Register</button>
                </form>
                </div>
            </div>
        </section>
    );

}


export default Cadastro;