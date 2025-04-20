import express from 'express';
import { calculateSIP, calculateFutureValue, calculateInvestmentValue } from '../controllers/sipController.js';

const router = express.Router();

router.post('/suggest', calculateSIP);
router.post('/sip', calculateFutureValue);
router.post('/cal_sip', calculateInvestmentValue);

export default router;
