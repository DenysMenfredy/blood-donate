import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import api from '../../services/api';

import './cadastro.css';

import logoLarge from '../../assets/logo-large.png'

function Cadastro() {

    const history = useHistory();

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [sexo, setSexo] = useState('');
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [tipo_sanguineo, setTipoSanguineo] = useState('');

    async function handleCadastro(e) {
        e.preventDefault();
        try { 
            await api.post('/donator', {
                nome, 
                idade, 
                sexo, 
                username,
                senha,
                telefone,
                tipo_sanguineo
            })
            const response = await api.post('/donator/getId', {username});
            const donatorId = response.data.id_doador;
            console.log(donatorId);
            localStorage.setItem('donatorId', donatorId);

            history.push('/donator');
        }catch(err) {
            console.log("Falha ao cadastrar doador");
        }

    }

    return (
        <section className="cad-container">
            <div className="lh">
                <img src={logoLarge} alt="logo blood-donate" />
            </div>
            <div className="rh">
                <div className="cad-section">
                <h1>Crie uma conta agora e salve vidas!</h1>
                <form onSubmit={handleCadastro}>
                <h4>Informações Pessoais</h4>
                    <div input-name>
                        <input 
                            type="text" 
                            placeholder="insira seu nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                         />
                    </div>

                    <div input-age>
                        <input 
                            type="number" 
                            placeholder="insira sua idade"
                            value={idade}
                            parse={value => !value ? null : Number(value)}
                            onChange={e => setIdade(e.target.value)}
                            required
                         />
                    </div>
                    <div classname="input-fone">
                        <input
                            type="number"
                            placeholder="Insira um telefone para contato"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            required
                        />
                    </div>
                    <div input-gender>
                        <label for="gender">Informe seu sexo</label> 
                            <select 
                                    name="gender" 
                                    id="gender" 
                                    value={sexo} 
                                    onChange={e => setSexo(e.target.value)}
                                    required>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                    </div>

                    <div input-blood>
                        <label for="blood">Informe seu tipo sanguineo</label> 
                            <select name="blood" 
                                    id="blood" 
                                    value={tipo_sanguineo} 
                                    onChange={e => setTipoSanguineo(e.target.value)}
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
                    <h4>Informações de Login</h4>
                    <div input-username>
                        <input 
                            type="text" 
                            placeholder="insira seu nome de usuário"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                         />
                    </div>
                    <div input-password>
                        <input 
                            type="password" 
                            placeholder="insira sua senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                         />
                    </div>
                    <button type="submit">Cadastrar-se</button>
                </form>
                </div>
            </div>
        </section>
    );

}


export default Cadastro;