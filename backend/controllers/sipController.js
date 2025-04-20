import {Fund} from "../models/Fund.js";

// SIP formula
const calculateSIPAmount = (futureValue, rate, timeInYears) => {
  const r = rate / 12 / 100;
  const n = timeInYears * 12;
  return (futureValue * r) / (Math.pow(1 + r, n) - 1);
};

export const calculateSIP = async (req, res) => {
  try {
    const { targetAmount, duration, risk } = req.body;

    if (!targetAmount || !duration || !risk) {
      return res.status(400).json({ message: 'targetAmount, duration, and risk are required.' });
    }

    // Fetch all funds
    const allFunds = await Fund.find({});
    if (!allFunds || allFunds.length === 0) {
      return res.status(404).json({ message: 'No mutual funds found.' });
    }

    // Categorize funds by risk
    const lowRiskFunds = allFunds.filter(f => f.risk === 'Low');
    const mediumRiskFunds = allFunds.filter(f => f.risk === 'Medium');
    const highRiskFunds = allFunds.filter(f => f.risk === 'High');

    // Define allocation strategy based on risk and duration
    let selectedFunds = [];
    let strategy = [];

    if (risk === 'Low') {
      strategy = duration <= 5 ? [['Low', 0.7], ['Medium', 0.3]] : [['Low', 0.5], ['Medium', 0.5]];
    } else if (risk === 'Medium') {
      strategy = duration <= 5 ? [['Low', 0.7], ['Medium', 0.3]] : [['Medium', 0.5], ['High', 0.5]];
    } else if (risk === 'High') {
      strategy = duration <= 5 ? [['Medium', 0.7], ['High', 0.3]] : [['Medium', 0.2], ['High', 0.8]];
    }

    // Sort funds by CAGR in descending order within each risk category
    const sortFundsByCAGR = (funds) => {
      return funds.sort((a, b) => b.cagr - a.cagr);
    };

    let sipResults = [];
    let totalSIP = 0;

    // Process funds based on selected strategy
    for (const [riskLevel, weight] of strategy) {
      let fundPool = [];
      if (riskLevel === 'Low') fundPool = lowRiskFunds;
      else if (riskLevel === 'Medium') fundPool = mediumRiskFunds;
      else if (riskLevel === 'High') fundPool = highRiskFunds;

      if (fundPool.length === 0) continue;

      // Sort fundPool by CAGR in descending order
      fundPool = sortFundsByCAGR(fundPool);

      // Select top N funds (in this case, limit to 2 or 3 funds based on strategy)
      const selectedFundCount = duration <= 5 ? 2 : 3; // Choose top 2 for shorter durations, top 3 for longer durations
      const selectedFundsForRiskLevel = fundPool.slice(0, selectedFundCount);

      // Divide the target amount among the selected funds based on their proportion in CAGR
      const totalCAGR = selectedFundsForRiskLevel.reduce((acc, fund) => acc + fund.cagr, 0);
      
      for (const fund of selectedFundsForRiskLevel) {
        const allocation = (targetAmount * weight * (fund.cagr / totalCAGR));
        const sipAmount = calculateSIPAmount(allocation, fund.cagr, duration);
        totalSIP += sipAmount;

        sipResults.push({
          fundName: fund.name,
          sipAmount: sipAmount.toFixed(2),
          cagr: fund.cagr,
          risk: fund.risk,
        });
      }
    }

    res.json({
      success: true,
      message: 'Calculated SIP amount successfully.',
      totalSIPAmount: totalSIP.toFixed(2),
      funds: sipResults,
    });

  } catch (error) {
    console.error('SIP Calculation Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const calculateFutureValue = async (req, res) => {
  try {
    const { sipAmount, duration, risk } = req.body;

    // Validate input
    if (!sipAmount || !duration || !risk) {
      return res.status(400).json({ message: 'sipAmount, duration, and risk are required.' });
    }

    // Fetch funds based on selected risk category
    let funds = await Fund.find({ risk });
    if (!funds || funds.length === 0) {
      return res.status(404).json({ message: 'No funds found for the selected risk type.' });
    }

    // Sort funds by CAGR in descending order
    funds.sort((a, b) => b.cagr - a.cagr);

    // Define the number of funds to select based on the risk and duration
    const selectedFundCount = duration <= 5 ? 2 : 3; // Choose top 2 for shorter durations, top 3 for longer durations
    funds = funds.slice(0, selectedFundCount); // Select top `N` funds

    const totalCAGR = funds.reduce((acc, fund) => acc + fund.cagr, 0); // Total of selected funds' CAGR

    const futureResults = [];

    // Allocate SIP amount proportionally based on CAGR
    for (const fund of funds) {
      // Proportionate allocation of SIP amount based on CAGR
      const allocation = sipAmount * (fund.cagr / totalCAGR);

      // Calculate future value for each fund using the proportionate allocation
      const r = fund.cagr / 12 / 100; // Monthly rate
      const n = duration * 12; // Total months
      const fv = allocation * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

      futureResults.push({
        fundName: fund.name,
        risk: fund.risk,
        cagr: fund.cagr,
        allocatedSIPAmount: allocation.toFixed(2),
        estimatedFutureValue: fv.toFixed(2),
      });
    }

    res.json({
      success: true,
      message: 'Future value calculated successfully.',
      results: futureResults,
    });

  } catch (error) {
    console.error('Future Value Calculation Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Calculate Future Value of SIP or Lump Sum
export const calculateInvestmentValue = async (req, res) => {
  try {
    const { investmentType, amount, cagr, duration } = req.body;

    // Validate input
    if (!investmentType || !amount || !cagr || !duration) {
      return res.status(400).json({ message: 'investmentType, amount, cagr, and duration are required.' });
    }

    // Calculate future value for SIP
    if (investmentType === 'sip') {
      const r = cagr / 12 / 100;  // Monthly rate
      const n = duration * 12;  // Number of months
      const futureValue = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);  // SIP formula

      res.json({
        success: true,
        message: 'SIP future value calculated successfully.',
        futureValue: futureValue.toFixed(2),
      });

    }
    // Calculate future value for Lump Sum Investment
    else if (investmentType === 'lumpsum') {
      const r = cagr / 100;  // Annual rate
      const n = duration;  // Number of years
      const futureValue = amount * Math.pow(1 + r, n);  // Lump sum formula

      res.json({
        success: true,
        message: 'Lump sum future value calculated successfully.',
        futureValue: futureValue.toFixed(2),
      });

    } else {
      return res.status(400).json({ message: 'Invalid investment type. Please choose "sip" or "lumpsum".' });
    }

  } catch (error) {
    console.error('Investment Value Calculation Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
