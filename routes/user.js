const express = require('express');
const router = express.Router();

const{user, modify} = require('../controllers/user.js');

router.get('/', user);
router.post('/edit', modify);

module.exports = router;
