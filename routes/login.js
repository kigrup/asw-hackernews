const express = require('express');
const router = express.Router();

const { login, apply } = require('../controllers/login.js');

router.get('/', login);
router.post('/apply', apply);

module.exports = router;
