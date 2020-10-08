const express = require('express');

const router = express.Router();
const { index, sheet } = require('../controllers/dashboard');

router.get('/', index);
router.get('/sheet', sheet);

module.exports = router;
