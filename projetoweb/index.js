const express = require('express');
const app = express();
//com chaves é algo específico, sem chaves manda tudo
const { engine } = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended:false }));
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
});

app.get('/clientes', function(req,res) {
    res.render('cliente/cliente', {listaclientes: fakedata});
});

app.get('/clientes/delete/:id', function(req,res) {
    let umcliente = fakedata.find(o => o.id == req.params['id']);
    let posicao = fakedata.indexOf(umcliente);
    if(posicao > -1) {
        fakedata.splice(posicao, 1);
    }
    res.redirect('/clientes');
});

app.get('/clientes/novo', function(req,res) {
    res.render('cliente/formcliente');
});

app.get('/clientes/alterar/:id', function(req,res) {
    let id = req.params['id'];
    let umcliente = fakedata.find(o => o.id == id);
    res.render('cliente/formcliente', {cliente: umcliente});
});

app.post('/clientes/save', function(req,res) {
    if(req.body.nome === '') {
        // res.redirect('/clientes');
        res.render('cliente/formcliente', {cliente: req.body});
        return;
    };

    let clienteantigo = fakedata.find( o => o.id == req.body.id);

    if (clienteantigo != undefined) {

        clienteantigo.nome = req.body.nome;
        clienteantigo.endereco = req.body.endereco;
        clienteantigo.sexo = req.body.sexo;
        clienteantigo.telefone = req.body.telefone;
        
    } else {

        let maiorId = Math.max(...fakedata.map(o => o.id));
        if (maiorId == -Infinity) maiorId =0;
    
        let novoCliente = {
            id: maiorId + 1,
            nome: req.body.nome,
            endereco: req.body.endereco,
            sexo: req.body.sexo,
            telefone: req.body.telefone
        };
        fakedata.push(novoCliente);
    }

    res.redirect('/clientes');
});

app.listen(3000, () => {
    console.log("Servidor Online");
    console.log("http://localhost:3000/");
});