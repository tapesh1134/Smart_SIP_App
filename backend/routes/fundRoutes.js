// import express from 'express';
// import { getAllFunds, addFund } from '../controllers/fundController.js';

// const router = express.Router();

// router.get('/', getAllFunds);
// router.post('/add', addFund); // Admin can add mutual funds

// export default router;

import express from "express";
import { getAllIndices, addIndex } from "../controllers/fundController1.js";

const router = express.Router();

router.get("/", getAllIndices);
router.post("/add", addIndex);

export default router;
