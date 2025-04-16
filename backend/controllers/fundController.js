const Fund = require('../models/Fund');

exports.getAllFunds = async (req, res) => {
  const funds = await Fund.find();
  res.json(funds);
};

exports.addFund = async (req, res) => {
  const fund = new Fund(req.body);
  await fund.save();
  res.status(201).json(fund);
};
