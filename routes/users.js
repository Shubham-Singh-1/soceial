const express = require('express');

const router = express.Router();

const passport = require('passport'); 

const usersController = require('../controllers/users_controller');

console.log('user route created');

router.get('/profile' ,passport.checkAuthentication,usersController.profile);
router.get('/post' , require('./post'));

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.singIn);

router.post('/create' ,usersController.create);


//use Passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

module.exports = router;