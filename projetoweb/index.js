const express = require('express');
const app = express();
//com chaves é algo específico, sem chaves manda tudo
const { engine } = require('express-handlebars');
const path = require('path');

app.set('view engine', 'handlebars');
app.engine('handlebars', engine());

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/public', express.static(path.join(__dirname, 'public')));

const fakedata = [
    {
        id: 1,
        nome: 'Zezinho',
        endereco: 'Rua lalala 100',
        sexo: 'Masculino',
        telefone: '5555-1234'
    },
    {
        id: 2,
        nome: 'Mariazinha',
        endereco: 'Rua lululu 200',
        sexo: 'Feminino',
        telefone: '5555-4321'
    }
];

app.get("/", function(req,res){
    // res.send(`Eu não acredito ${req.query['nome']} ${req.query['sobrenome']}`);
    res.render('index');
})

app.listen(3000, () => {
    console.log("Servidor Online");
    console.log("http://localhost:3000/");
})