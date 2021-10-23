const express = require('express');
const router = express.Router();

const user = require('../controllers/user.js');

router.get('/', user);

module.exports = router;
