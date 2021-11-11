const express = require('express');
const router = express.Router();

const { vote } = require('../controllers/vote.js');

router.get('/', vote);

module.exports = router;
