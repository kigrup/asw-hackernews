const express = require('express');
const router = express.Router();

const { index, threads } = require('../controllers/index.js');

router.get('/', index);
router.post('/threads', threads);

module.exports = router;
