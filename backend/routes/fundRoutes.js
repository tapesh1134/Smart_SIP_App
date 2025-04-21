import express from 'express';
import { getAllFunds, addFund } from '../controllers/fundController.js';

const router = express.Router();

router.get('/', getAllFunds);
router.post('/add', addFund); // Admin can add mutual funds

export default router;
