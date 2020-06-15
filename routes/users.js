const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users_controller');

console.log('user route created');

router.get('/profile' , usersController.profile);
router.get('/post' , require('./post'));

module.exports = router;