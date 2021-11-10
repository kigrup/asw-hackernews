const express = require('express');
const router = express.Router();

const { posts, comments } = require('../controllers/liked.js');

router.get('/', posts);
router.get('/posts', posts);
router.get('/comments', comments);

module.exports = router;
