const express = require('express');
const router = express.Router();

const { index, newest } = require('../controllers/index.js');

router.get('/', index);
router.get('/index', index);
router.get('/newest', newest);
router.get('/ask', newest);

module.exports = router;
