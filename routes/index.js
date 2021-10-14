// initialize
const express = require('express');
const router = express.Router();

// controller
const { index } = require('../controllers/index.js');

router.get('/', index);

module.exports = router;
