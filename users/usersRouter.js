const express = require('express');

const usersDb = require('./usersHelper.js');

const router = express.Router();

router.get('/users', (req, res) => {
    usersDb.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: 'error'})
        })
    
})

module.exports = router;