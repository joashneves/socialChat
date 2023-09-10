import { useState } from 'react';
import Styles from'./Logar.module.css';
import axios from 'axios'; 
import Api from '../Api';

function Login(props){

  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');

  const alternarTela = () => {
    // Chame a função passada como prop
    props.onClick();
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    try {
        // Enviar as credenciais para a sua API usando o axios
        const response = await Api.post('login', {
            apelido,
            senha,
        });

        if (response.data.message === 'Login bem-sucedido') {
            // Login bem-sucedido, faça o que desejar aqui
            console.log('Login bem-sucedido');
        } else {
            // Login falhou, trate de acordo
            alert('Credenciais inválidas');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
};

    return(
        <>
        <form className={Styles.formulario} onSubmit={handleSubmit}>
            <label >Apelido:</label>
            <input className={Styles.texto} type="text" name="Nome" id="Apelido" onChange={(e) => setApelido(e.target.value)}/>
            <label forhtml='senha'>Senha:</label>
            <input className={Styles.texto} type="password" name="Senha" id="Senha" onChange={(e) => setSenha(e.target.value)}/>
            <input className={Styles.botao} type="submit" value="Entrar" />
            <input className={Styles.botao} type="button" value="Inscreve-se" onClick={alternarTela} />
        </form>
            
        </>
    );
}

export default Login;