const express = require('express');
const router = express.Router();

const { vote, unvote } = require('../controllers/vote.js');

router.put('/vote', vote);
router.put('/unvote', unvote);

module.exports = router;