const express = require('express');

const router = express.Router();
const postController = require('../controllers/post_controller');

console.log('post route created');

module.exports = postController.post;
// module.exports = router;