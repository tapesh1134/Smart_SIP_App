import axios from 'axios';
import { Fund } from "../models/fundSchema.js";

const calculateSIPAmount = (futureValue, rate, timeInYears) => {
  const r = rate / 12 / 100;
  const n = timeInYears * 12;
  return (futureValue * r) / (Math.pow(1 + r, n) - 1);
};

const fetchLatestNAV = async (schemeCode) => {
  try {
    const response = await axios.get(`https://api.mfapi.in/mf/${schemeCode}/latest`);
    const navData = response.data?.data?.[0];
    return {
      nav: navData?.nav || 'N/A',
      date: navData?.date || 'N/A'
    };
  } catch (err) {
    console.error(`NAV Fetch Error for ${schemeCode}:`, err.message);
    return { nav: 'N/A', date: 'N/A' };
  }
};

// Calculate SIP based on target amount, duration, and risk
export const calculateSIP = async (req, res) => {
  try {
    const { targetAmount, duration, risk } = req.body;

    if (!targetAmount || !duration || !risk) {
      return res.status(400).json({ message: 'targetAmount, duration, and risk are required.' });
    }

    const allFunds = await Fund.find({});
    if (!allFunds.length) {
      return res.status(404).json({ message: 'No mutual funds found.' });
    }

    // Risk buckets
    const lowRiskFunds = allFunds.filter(f => f.risk === 'Low');
    const mediumRiskFunds = allFunds.filter(f => f.risk === 'Medium');
    const highRiskFunds = allFunds.filter(f => f.risk === 'High');

    // Strategy matrix
    let strategy = [];
    if (risk === 'Low') {
      strategy = duration <= 5 ? [['Low', 0.7], ['Medium', 0.3]] : [['Low', 0.5], ['Medium', 0.5]];
    } else if (risk === 'Medium') {
      strategy = duration <= 5 ? [['Low', 0.7], ['Medium', 0.3]] : [['Medium', 0.5], ['High', 0.5]];
    } else if (risk === 'High') {
      strategy = duration <= 5 ? [['Medium', 0.7], ['High', 0.3]] : [['Medium', 0.2], ['High', 0.8]];
    }

    // Sort funds by CAGR
    const sortFundsByCAGR = (funds) => funds.sort((a, b) => b.cagr - a.cagr);
    let sipResults = [];
    let totalSIP = 0;

    // Loop over risk strategy and calculate SIP
    for (const [riskLevel, weight] of strategy) {
      let fundPool = {
        Low: lowRiskFunds,
        Medium: mediumRiskFunds,
        High: highRiskFunds
      }[riskLevel] || [];

      if (!fundPool.length) continue;

      fundPool = sortFundsByCAGR(fundPool);
      const topN = duration <= 5 ? 2 : 3;
      const selectedFunds = fundPool.slice(0, topN);
      const totalCAGR = selectedFunds.reduce((sum, f) => sum + f.cagr, 0);

      for (const fund of selectedFunds) {
        const allocation = (targetAmount * weight * (fund.cagr / totalCAGR));
        const sipAmount = calculateSIPAmount(allocation, fund.cagr, duration);
        totalSIP += sipAmount;

        const navInfo = await fetchLatestNAV(fund.schemeCode);

        sipResults.push({
          fundName: fund.name,
          schemeCode: fund.schemeCode,
          risk: fund.risk,
          cagr: fund.cagr,
          sipAmount: sipAmount.toFixed(2),
          latestNAV: navInfo.nav,
          navDate: navInfo.date
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

// Calculate Future Value of SIP based on SIP amount, duration, and risk
export const calculateFutureValue = async (req, res) => {
  try {
    const { sipAmount, duration, risk } = req.body;

    if (!sipAmount || !duration || !risk) {
      return res.status(400).json({ message: 'sipAmount, duration, and risk are required.' });
    }

    let funds = await Fund.find({ risk });
    if (!funds || funds.length === 0) {
      return res.status(404).json({ message: 'No funds found for the selected risk type.' });
    }

    // Sort funds by CAGR
    funds.sort((a, b) => b.cagr - a.cagr);

    // Select the top funds based on duration
    const selectedFundCount = duration <= 5 ? 2 : 3; 
    funds = funds.slice(0, selectedFundCount);

    const totalCAGR = funds.reduce((acc, fund) => acc + fund.cagr, 0); 

    const futureResults = [];

    // Calculate future value for each fund
    for (const fund of funds) {
      const allocation = sipAmount * (fund.cagr / totalCAGR);

      const r = fund.cagr / 12 / 100; 
      const n = duration * 12; 
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

// Calculate Investment Value (SIP or Lump Sum)
export const calculateInvestmentValue = async (req, res) => {
  try {
    const { investmentType, amount, cagr, duration } = req.body;

    if (!investmentType || !amount || !cagr || !duration) {
      return res.status(400).json({ message: 'investmentType, amount, cagr, and duration are required.' });
    }

    if (investmentType === 'sip') {
      const r = cagr / 12 / 100;  
      const n = duration * 12;  
      const futureValue = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);  

      res.json({
        success: true,
        message: 'SIP future value calculated successfully.',
        futureValue: futureValue.toFixed(2),
      });

    } else if (investmentType === 'lumpsum') {
      const r = cagr / 100;  
      const n = duration;  
      const futureValue = amount * Math.pow(1 + r, n);  

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
