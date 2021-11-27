const express = require('express');
const router = express.Router();

// Controllers
const api = require('../controllers/api.js');

// Middlewares
const authMiddleware = require('../middlewares/apiAuthentication.js');

// Endpoints
router.get('/index', api.index);
router.get('/newest', api.newest);
router.get('/ask', api.ask);
router.post('/submit/post', authMiddleware, api.submitPost);
router.get('/item', api.item);
router.post('/item/comment', authMiddleware, api.itemComment);
router.get('/user', api.user);
router.post('/user/edit', authMiddleware, api.userEdit); // Cambiar a PUT
router.get('/vote', authMiddleware, api.vote); // Cambiar a PUT
router.get('/threads', authMiddleware, api.threads);
router.get('/liked/posts', authMiddleware, api.likedPosts);
router.get('/liked/comments', authMiddleware, api.likedComments);

module.exports = router;
