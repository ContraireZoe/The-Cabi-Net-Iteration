const express = require('express');
const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');
const router = express.Router();


router.post('/signup', userController.signUp, jwtController.setToken, (req, res) => {
    console.log('CHECKING JWT TOKEN: ', res.locals.token);
    res.cookie('JWT', res.locals.token)
    res.status(200).send(res.locals.token)
})

router.post('/login', userController.logIn, jwtController.setToken, (req, res) => {
    console.log('logging in');
    res.cookie('JWT', res.locals.token)
    res.status(200).send(`${res.locals.username} IS LOGGED IN`)
})

module.exports = router;