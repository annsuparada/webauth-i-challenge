const express = require('express');
const server = express();
const helmet = require('helmet');
server.use(helmet());
server.use(express.json());

const usersRouter = require('./users/usersRouter.js')


server.get('/', (req, res) => {
   res.send('<h1>Hello from Express<h1>')
});

server.use('/api', usersRouter);

module.exports = server;