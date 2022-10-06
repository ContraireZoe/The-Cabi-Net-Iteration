const express = require('express');
const userController = require('../controllers/userController');
const jwtController = require('../controllers/jwtController');
const router = express.Router();


router.post('/signup', userController.signUp, jwtController.setToken, (req, res) => {
    console.log('CHECKING JWT TOKEN: ', res.locals.token);
    //cookie set to expire after 5 minutes
    res.cookie('JWT', res.locals.token, { maxAge: 300000})
    res.cookie('LOGGEDIN', res.locals.username, { maxAge: 300000})
    res.status(200).send(res.locals.token)
})

router.post('/login', userController.logIn, jwtController.setToken, (req, res) => {
    console.log('logging in');
    //cookie set to expire after 5 minutes
    res.cookie('JWT', res.locals.token, { maxAge: 300000})
    res.cookie('LOGGEDIN', res.locals.username, { maxAge: 300000})
    res.status(200).send(`${res.locals.username} IS LOGGED IN`)
})

module.exports = router;