// initialize
const express = require('express');
const router = express.Router();

// controller
const { login, apply } = require('../controllers/login.js');

router.get('/', login);
router.get('/apply', apply);

module.exports = router;
