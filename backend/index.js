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

const dados = {
  'adm':[
  'padrão',
  'generico@gmail.com',
  '123',
  ]
};

app.get('/users', (req,res) =>{
  res.json(dadosJSON);
});

// Converta os dados em formato JSON
const dadosJSON = JSON.stringify(dados);

// Nome do arquivo JSON que você deseja criar
const nomeArquivo = 'dados.json';

// Escreva os dados no arquivo JSON
fs.writeFile(nomeArquivo, dadosJSON, (err) => {
  if (err) {
    console.error('Ocorreu um erro ao criar o arquivo JSON:', err);
  } else {
    console.log('Arquivo JSON criado com sucesso!');
  }
});


// Receber dados do site e adicionar ao arquivo JSON
app.post('/enviar-dados', (req, res) => {
  // Receba os dados enviados pelo cliente no corpo da requisição
  const { nome, apelido, email, senha} = req.body;
  console.log("Usuario criado com : " , nome, apelido, email, senha);
  // Lê o conteúdo atual do arquivo JSON
  fs.readFile(nomeArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Ocorreu um erro ao ler o arquivo JSON:', err);
      res.status(500).json({ message: 'Erro ao ler o arquivo JSON' });
      return;
    }

    // Parse o conteúdo JSON existente
    const dadosExistente = data ? JSON.parse(data) : {};

    //Verificar se esses dados ja existem e não criar um novo
    console.log(dadosExistente[apelido]);
    if(apelido == dadosExistente){
      console.log("Dados já cadastrados");
      return;
    }
    // Adicione os novos dados ao objeto existente
    dadosExistente[apelido] = {nome, email, senha };

    // Escreva o objeto atualizado de volta no arquivo JSON
    fs.writeFile(nomeArquivo, JSON.stringify(dadosExistente), (err) => {
      if (err) {
        console.error('Ocorreu um erro ao escrever o arquivo JSON:', err);
        res.status(500).json({ message: 'Erro ao escrever o arquivo JSON' });
        return;
      }
      console.log('Arquivo JSON atualizado com sucesso!');
      res.json({ message: 'Dados enviados e arquivo JSON atualizado com sucesso' });
    });
  });
});

//Verifica se o usuario existe
app.post('/login', (req, res) => {
  // Lê o conteúdo do arquivo JSON
  fs.readFile(nomeArquivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Ocorreu um erro ao ler o arquivo JSON:', err);
      res.status(500).json({ message: 'Erro ao ler o arquivo JSON' });
      return;
    }

    // Parse o conteúdo JSON do arquivo
    const dadosUser = JSON.parse(data);

    const { apelido, senha } = req.body;
    
    // Verificar as credenciais do usuário
    if (dadosUser[apelido] && dadosUser[apelido]["senha"] === senha) {
      // Credenciais corretas, o usuário está logado com sucesso
      req.session.loggedIn = true; // Armazene o estado de login na sessão
      res.json({ message: 'Login bem-sucedido' });
    } else {
      // Credenciais incorretas ou usuário não encontrado, o login falhou
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  });
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