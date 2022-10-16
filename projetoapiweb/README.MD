# Projeto API WEB NodeJs
Implementação de uma API REST utilizando NodeJS e Express

# O que é API
Faz a conversa entre os programas, usando uma interface onde as máquinas consigam conversar
- ### API REST: transferência de estado
- ### Formato: JSON JavaScript Object Notation

## Ferramentas para mexer com API
- Postman
- Thunder Client

## Criando o projeto
- criar uma pasta com o nome do projeto
- abrir o terminal do VSCODE
- entrar na pasta do projeto: cd projetoapiweb
- criar novo projeto: npm init
- o npm irá gerar o arquivo descritor do projeto


## Instalando dependências
- instalar o express: npm i express --save

## Ferramentas
Utilizadas para testar a API
- Extensão do VSCode Thunder Client
- Extensão do VSCode REST Client

## Iniciando o Express
### Criando a depêndencia: busca e inicia
```javascript
const express = require('express');
const app = express();
```

### Expondo para a internet
```javascript
app.listen(3000, () => {
    console.log('Servidor online');
    console.log('http://localhost:3000/');
});
```

## Padrões de nomenclatura
- hhtps://restfulapi.net/resource-naming/

### Endpoint GET /api/v1/clientes
- Verbo GET do protocolo HTTP
- Objetivo: retornar uma lista de objetos cliente
- HTTP Status Code 200 - Sucesso
- HTTP Status Code 404 - Not Found
- Header Resposta
    - Content-Type = application/json (tipo da informação retornada pela API)

### Endpoint POST /api/v1/clientes
- Verbo POST do protocolo HTTP
- Objetivo: recebe no corpo (body) da requisição um objeto e insere na lista de dados
- HTTP Status Code 201 - Created
- HTTP Status Code 400 - Bad Request - se o corpo não possuir um objeto
- Header Resposta
    - Content-Type = application/json (tipo da informação retornada pela API)

### Endpoint PUT /api/v1/clientes
- Verbo PUT do protocolo HTTP
- Objetivo: recebe no corpo (body) da requisição um objet, utilizando o parametro id da URL, procurar pelo cliente e então atualizar o cliente com o objeto recebido no corpo do body
- HTTP Status Code 200 - Sucesso
- HTTP Status Code 201 - Created
- HTTP Status Code 400 - Bad Request - se o corpo não possuir um objeto
- HTTP Status Code 404 - Not Found
- Resposta: o objeo alterado
- Header Resposta
    - Content-Type = application/json (tipo da informação retornada pela API)

### Endpoint DELETE /api/v1/clientes/{id}
- Verbo DELETE do protocolo HTTP
- Objetivo: receber o id pela URL e remover o objeto do sistema
- HTTP Status Code 200 - Sucess
- HTTP Status Code 404 - Not Found
- Resposta: o objeto excluído
- Header Resposta
    - Content-Type = application/json (tipo da informação retornada pela API)
