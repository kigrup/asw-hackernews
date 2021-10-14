// initialize
const express = require('express');
const router = express.Router();

// controller
const { login, register } = require('../controllers/login');

router.get('/', login);

module.exports = router;
