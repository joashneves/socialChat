const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');

const port = 5000;

app.use(session({secret: 'wqeqwcewfgpoimriog'}));
app.use(express.json());
app.use(fileupload({
  useTempFiles:true,
  tempFileDir: path.join(__dirname,'temp')
}));
app.use(cors());

app.get('/users', (req,res) =>{
  res.json([{'apelido':'adm',
            'senha':'123'}]) 
})

app.post('/login', (req, res) => {
  const { apelido, senha } = req.body;

  // Verificar as credenciais do usuário (por exemplo, comparar com um banco de dados)
  if (apelido === 'adm' && senha === '123') {
    // Credenciais corretas, o usuário está logado com sucesso
    req.session.loggedIn = true; // Armazene o estado de login na sessão
    res.json({ message: 'Login bem-sucedido' });
  } else {
    // Credenciais incorretas, o login falhou
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Rota para verificar o estado de login do usuário
app.get('/status', (req, res) => {
  if (req.session.loggedIn) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(port, ()=>{
  console.log('Rodando na porta 5000...');
});