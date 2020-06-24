const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users_controller');

console.log('user route created');

router.get('/profile' , usersController.profile);
router.get('/post' , require('./post'));

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.singIn);

module.exports = router;