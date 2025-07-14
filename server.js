const express = require('express');
const path = require ('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));

let ultimocontato = null; 

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  ultimocontato = req.body;
  res.status(200).redirect('/contato-recebido');   
});

app.get('/contato-recebido', (req, res)=>{
      if(!ultimocontato){
      res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  }
  const {nome, email, assunto, mensagem} = ultimocontato;
    res.status(200).send (`
        <h1>Contato recebido, obrigado!</h1>
        <p>Nome:<strong>${nome}</strong></p>
        <p>Email:<strong>${email}</strong></p>
        <p>Assunto:<strong>${assunto}</strong></p>
        <p>Mensagem:<strong>${mensagem}</strong></p>
        <a href="/">Voltar para o início</a>
        `);
});

let ultimasugestao = null; 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res)=>{
    const nome = req.query.nome;
    const ingredientes = req.query.ingredientes;

    if(!nome && !ingredientes){
         res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
    res.status(200).send(`
        <h1>Sugestão recebida, obrigado!</h1>
        <p>Nome:<strong>${nome}</strong></p>
        <p>ingredientes:<strong>${ingredientes}</strong></p>
        <a href="/">Voltar para o início</a>
        `);
})

app.get('/api/lanches', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'data/lanches.json'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});

