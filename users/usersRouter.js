const express = require('express');
const bcrypt = require('bcryptjs');
const restricted = require('../middlewere/restricted.js')
const usersDb = require('./usersHelper.js');

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    usersDb.add({username, password: hash })
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.post('/login', (req, res)=> {
    let { username, password } = req.body;
    usersDb.findBy({ username })
    .first()
    .then(user => {
        req.session.user = user
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}!` });
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error);
      });
})


router.get('/users', restricted, (req, res) => {
    usersDb.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'error'})
        })
    
})

router.get('/logout', (req, res) => {
        if(req.session) {
          req.session.destroy(error => {
            if(error) {
              res.status(500).json({ message: 'can not log out'})
            } else {
              res.status(200).json({ message: 'bye'})
            }
          });
        } else {
          res.status(200).json({ message: 'Already logged out'})
        }
     
})

module.exports = router;