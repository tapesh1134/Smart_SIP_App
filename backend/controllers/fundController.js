import {Fund} from "../models/Fund.js";

export const getAllFunds = async (req, res) => {
  const funds = await Fund.find();
  res.json(funds);
};

export const addFund = async (req, res) => {
  const fund = new Fund(req.body);
  await fund.save();
  res.status(201).json(fund);
};
