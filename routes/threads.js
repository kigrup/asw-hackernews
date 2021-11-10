const express = require('express');
const router = express.Router();

const threads = require('../controllers/threads.js');

router.get('/', threads);

module.exports = router;
