const express = require('express');
const router = express.Router();

const item = require('../controllers/item.js');

router.get('/', item);

module.exports = router;
