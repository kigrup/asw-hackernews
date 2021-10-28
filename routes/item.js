const express = require('express');
const router = express.Router();

const { item, comment } = require('../controllers/item.js');

router.get('/', item);
router.post('/comment', comment);

module.exports = router;
