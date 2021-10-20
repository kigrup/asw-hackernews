const express = require('express');
const router = express.Router();

const { submit, contribution } = require('../controllers/submit.js');

router.get('/', submit);
router.post('/contribution', contribution);

module.exports = router;
