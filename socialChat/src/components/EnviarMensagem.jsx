import React, { useState } from 'react';
import Styles from './EnviarMensagem.module.css';

function EnviarMensagem(){

    const [mensagem, setMensagem] = useState('');

    const handleChange = (event) => {
      setMensagem(event.target.value);
    };

    return (
    <>
    <textarea
      type="text"
      id="enviarmensagem"
      className={Styles.enviarMensagem}
      value={mensagem}
      onChange={handleChange}
      rows={Math.max(Math.ceil(mensagem.length / 40), 1)} // Ajuste o número de caracteres por linha conforme necessário
    />
    </>
    );
};

export default EnviarMensagem;