const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());


const fakeData = [
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

//COnsulta que retorna todos os registros
app.get('/api/v1/clientes', (req,res) => {
    //writeHead 1 define o HTTP Status + headers da resposta
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(fakeData));
});

app.get('/api/v1/clientes/:id', (req,res) => {
    //Buscar o cliente pelo ID
    let httpStatus = 200;
    let resultado = fakeData.find(o => o.id == req.params.id);
    //Verificar se houve resultado
    if(resultado == undefined) {
        httpStatus = 400;
    }
    //retornar
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(resultado));
});

app.get('/api/v1/clientes/nome/:nome', (req,res) => {
    let httpStatus = 200;
    let resultado = fakeData.find(o => o.nome.includes(req.params.nome));
    if(resultado == undefined) {
        httpStatus = 400;
    }
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(resultado));
});

app.post('/api/v1/clientes', (req,res) => {
    let httpStatus = 201;
    //recupera o cliente de dentro do body da requisição
    let novoCliente = req.body;
    if(!novoCliente.hasOwnProperty('nome')) {
        httpStatus = 400;
    } else {
        //descobrindo o maior ID já cadastrado de clientes
        let maiorId = Math.max(...fakeData.map(o => o.id));
        //validação caso lista fakeData esteja vazia
        if (maiorId == -Infinity) maiorId =0;
        //adiciono 1 ao maior id dos clientes e gravo novo cliente
        novoCliente.id = maiorId + 1;
        
        //inserir o novo cliente na lista fakeData
        fakeData.push(novoCliente);    
    }
    //devolvo o objeto cliente para quem chamou
    res.writeHead(httpStatus, {'Content-type': 'application/json'});
    res.end(JSON.stringify(novoCliente));
});

app.put('/api/v1/clientes/:id', (req, res) => {
    let httpStatus = 200;
    let idClienteAntigo = req.params.id; //id da URL
    let clienteAtualizacao = req.body; //vem pelo body
    let clienteAnt = fakeData.find(o => o.id == idClienteAntigo);
    if(clienteAnt == undefined) {
        httpStatus = 404;
    } else {
        if (!clienteAnt.hasOwnProperty('nome')) {
            clienteAnt= {};
            httpStatus = 400;    
        } else {
            clienteAnt.nome = clienteAtualizacao.nome;
            clienteAnt.endereco = clienteAtualizacao.endereco;
            clienteAnt.sexo = clienteAtualizacao.sexo;
            clienteAnt.telefone = clienteAtualizacao.telefone;
        }
    }
    res.writeHead(httpStatus, {'Content-type': 'application/json'});
    res.end(JSON.stringify(clienteAnt));
});

app.delete('/api/v1/clientes/:id', (req,res) => {
    let httpStatus = 200;
    //Guardo da URL o ID do cliente para remover
    let idCliente = req.params.id;
    //Procurar pelo objeto usando o id
    let clienteExcluir = fakeData.find(o => o.id == idCliente);
    if(clienteExcluir == undefined) {
        httpStatus = 404;
    } else {
        //Descobrir a posição do objeto dentro do array
        let posicao = fakeData.indexOf(clienteExcluir);
        //Mando excluir
        fakeData.splice(posicao,1);
    }
    res.writeHead(httpStatus, {'Content-type': 'application/json'});
    res.end(JSON.stringify(clienteExcluir));
});

app.listen(3000, () => {
    console.log('Servidor online');
    console.log('http://localhost:3000/');
});




