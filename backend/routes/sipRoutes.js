const express = require('express');
const router = express.Router();
const { calculateSIP,calculateFutureValue,calculateInvestmentValue  } = require('../controllers/sipController');

router.post('/suggest', calculateSIP);
router.post('/sip', calculateFutureValue);
router.post('/cal_sip', calculateInvestmentValue);

module.exports = router;
