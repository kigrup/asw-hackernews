const express = require('express');
const router = express.Router();

const { vote, unvote } = require('../controllers/vote.js');

router.get('/vote', vote);
router.get('/unvote', unvote);

module.exports = router;
