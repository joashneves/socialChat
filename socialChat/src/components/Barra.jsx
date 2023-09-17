import styles from "./Barra.module.css";
import { useState } from "react";
import menu from '../assets/bars-solid.svg';
import avatar from '../assets/user.svg';
import home from '../assets/home.svg';
import chat from '../assets/chat.svg';
import quit from '../assets/quit.svg';


function Bar() {
    const [estaAtivo, setEstaAtivo] = useState(true);
    const animacaoBar = estaAtivo ? styles.bar : `${styles.bar} ${styles.barAtivo}`;
    
    function expandir(){
        setEstaAtivo(estaAtivo ? false : true);
        console.log("Test", estaAtivo); 
    }
  return (
    <>
      <div className={animacaoBar}>
        <img src={menu} alt="menu" className={styles.barImagem} onClick={expandir}/>
        <p>Nome</p>
        <img src={avatar} alt="avatar" className={styles.avatarImagem} />
        <p>Home</p>
        <img src={home} alt="home" className={styles.barImagem} />
        <p>Chat</p>
        <img src={chat} alt="chat" className={styles.barImagem} />
        <p>Sair</p>
        <img src={quit} alt="sair" className={styles.barImagem} />
      </div>
    </>
  );
}

export default Bar;