const express = require('express');
const router = express.Router();

const { index, newest } = require('../controllers/index.js');

router.get('/', index);
router.get('/newest', newest);

module.exports = router;
