/**
    Objetivo: API para integração utilizando websocket e react
    Autor: Muryllo Vieira
    Data: 22/10/2023
    Versão: 1.0
**/

/**
    Express - dependencia para realizar requisições de API pelo protocolo HTTP 
    npm install express --save

    Socket.IO - dependencia para criar um conexão constante e delay
    npm install socket.io --save

    Nodemon 
**/

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {origin: 'http://localhost:5173'}})

const PORT = 8080

io.on('connection', socket => {
    console.log('Usuário conectado!', socket.id);

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado!', socket.id);
    })

    socket.on('set_username', username => {
        socket.data.username = username
    })

    socket.on('message', text => {
        io.emit('receive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, () => console.log('Server Rodando na Porta 8080'))