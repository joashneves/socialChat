import React from "react";
import Styles from './Logar.module.css';
import axios from 'axios'; 
import Api from '../Api';

function Logar(props){

    const alternarTela = () => {
        // Chame a função passada como prop
        props.onClick();

      };

      const handleSubmit  = async(event) => {
      event.preventDefault(); // Impede o comportamento padrão de envio do formulário

      // Aqui você pode acessar os valores dos campos e fazer o que desejar com eles
      const nome = event.target.Name.value;
      const apelido = event.target.Apelido.value;
      const email = event.target.Email.value;
      const senha = event.target.Senha.value;

        // Crie um objeto com os dados que deseja enviar
        const dadosParaEnviar = {
            nome,
            apelido,
            email,
            senha,
        };

        // Use o axios ou outra biblioteca para enviar esses dados para o servidor
        try {
            const response = await Api.post('enviar-dados', dadosParaEnviar);
            console.log('Resposta do servidor:', response.data);
            console.log("dados enviados", nome, apelido, email, senha);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
      };

    return(
        <>
        <form className={Styles.formulario} onSubmit={handleSubmit}>
            <label >Nome Completo:</label>
            <input className={Styles.texto} type="text" name="Nome" id="Name"/>
            <label >Apelido:</label>
            <input className={Styles.texto} type="text" name="Nome" id="Apelido"/>
            <label >Email:</label>
            <input className={Styles.texto} type="email" name="Nome" id="Email"/>
            <label forhtml='senha'>Senha:</label>
            <input className={Styles.texto} type="password" name="Senha" id="Senha"/>
            <input className={Styles.botao} type="submit" value="Inscreve-se"  />
            <input className={Styles.botao} type="button" value="Entrar" onClick={alternarTela}/>
        </form>
        </>
    );
}

export default Logar;