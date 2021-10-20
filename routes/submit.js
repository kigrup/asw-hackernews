const express = require('express');
const router = express.Router();

const { submit, post } = require('../controllers/submit.js');

router.get('/', submit);
router.post('/post', post);

module.exports = router;
