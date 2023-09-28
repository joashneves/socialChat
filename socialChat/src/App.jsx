import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './components/Logar.jsx';
import Logar from './components/Inscrever.jsx';
import Bar from './components/Barra';
import EnviarMensagem from './components/EnviarMensagem';
import Api from './Api';
import axios from 'axios';

function App() {

  const [logado, setLogado] = useState(false);

  useEffect(()=>{
    Api.get('users').then(res =>{
      console.log("Resposta do servidor: ", res.data);
    })
  }, [])

  const [telaAtual, setTelaAtual] = useState('login');

  const alternarTela = () => {
    // Se a tela atual for 'login', mude para 'logar'; caso contrário, mude para 'login'.
    setTelaAtual(telaAtual === 'login' ? 'logar' : 'login');
  };

  const TelaVisivel = telaAtual === 'login' ? Login : Logar;
  return (
    <>
      <Bar/>
      {!logado &&(
        <div>
      <TelaVisivel
        onClick={alternarTela}
        setLogado={setLogado}
        />
      </div>
      )
      }
    
    {logado &&(
  <EnviarMensagem/>
    )
    }
      
  </>

  )
}

export default App
