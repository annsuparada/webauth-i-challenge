const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session)

const usersRouter = require('./users/usersRouter.js')
const dbConnection = require('./data/db-config.js')

const sessionConfig = {
   name: 'chocochip', 
     secret:'keep it secrect',
     cookie: {
       maxAge: 1000 * 60 * 60,
       secure: false,
     },
     httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
     resave: false,
     saveUninitialized: true,
     store: new KnexSessionStore({
       knex: dbConnection,
       tablename: 'knexsession',
       sidfielname: 'sessionid',
       createtable: true,
       clearInterval: 1000 * 60 * 30,
     })
 }

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api', usersRouter);

module.exports = server;