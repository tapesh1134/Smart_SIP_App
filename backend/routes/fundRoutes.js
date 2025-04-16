const express = require('express');
const router = express.Router();
const { getAllFunds, addFund } = require('../controllers/fundController');

router.get('/', getAllFunds);
router.post('/', addFund); // Admin can add mutual funds

module.exports = router;
