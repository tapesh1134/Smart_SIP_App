import { Index } from "../models/indexSchema.js";

// Helper function to calculate SIP amount
const calculateSIPAmount = (futureValue, rate, timeInYears) => {
    if (isNaN(futureValue) || isNaN(rate) || isNaN(timeInYears)) {
        throw new Error('Invalid input parameters for SIP calculation.');
    }
    const r = rate / 12 / 100; // Monthly rate from annual CAGR
    const n = timeInYears * 12; // Total number of months
    return (futureValue * r) / (Math.pow(1 + r, n) - 1);
};

// Controller: Calculate SIP based on target amount, duration, and risk
export const calculateSIP = async (req, res) => {
    try {
        const { targetAmount, duration, risk } = req.body;

        if (!targetAmount || !duration || !risk) {
            return res.status(400).json({ message: 'targetAmount, duration, and risk are required.' });
        }

        // Fetch funds based on the user's specified risk category and other categories
        const riskFunds = await Index.find({ risk });
        const higherRiskFunds = await Index.find({ risk: getNextRisk(risk) });
        const highestRiskFunds = await Index.find({ risk: getNextRisk(getNextRisk(risk)) });

        if (!riskFunds.length) {
            return res.status(404).json({ message: `No funds found for risk category: ${risk}` });
        }
        if (!higherRiskFunds.length) {
            return res.status(404).json({ message: `No funds found for risk category: ${getNextRisk(risk)}` });
        }
        if (!highestRiskFunds.length) {
            return res.status(404).json({ message: `No funds found for risk category: ${getNextRisk(getNextRisk(risk))}` });
        }

        // Sort funds by CAGR (Descending)
        riskFunds.sort((a, b) => b.oneYearCAGR - a.oneYearCAGR);
        higherRiskFunds.sort((a, b) => b.oneYearCAGR - a.oneYearCAGR);
        highestRiskFunds.sort((a, b) => b.oneYearCAGR - a.oneYearCAGR);

        let selectedFunds = [];

        // Duration-based selection logic
        if (duration < 5) {
            // For duration less than 5 years, select 2 funds from risk "x"
            selectedFunds = riskFunds.slice(0, 2);
        } else if (duration >= 5 && duration < 10) {
            // For duration between 5 to 10 years, select 2 funds from "x" and 1 from "x+1"
            selectedFunds = [
                ...riskFunds.slice(0, 2),      // 2 funds from risk "x"
                ...higherRiskFunds.slice(0, 1) // 1 fund from risk "x+1"
            ];
        } else {
            // For duration greater than 10 years, select 1 from "x", 1 from "x+1", and 1 from "x+2"
            selectedFunds = [
                ...riskFunds.slice(0, 1),       // 1 fund from risk "x"
                ...higherRiskFunds.slice(0, 1), // 1 fund from risk "x+1"
                ...highestRiskFunds.slice(0, 1) // 1 fund from risk "x+2"
            ];
        }

        const totalCAGR = selectedFunds.reduce((sum, fund) => sum + fund.oneYearCAGR, 0);

        let sipResults = [];
        let totalSIP = 0;

        // Calculate SIP amounts for selected funds
        for (const fund of selectedFunds) {
            const allocation = (targetAmount * (fund.oneYearCAGR / totalCAGR));

            if (isNaN(allocation) || allocation <= 0) {
                return res.status(400).json({ message: 'Invalid allocation amount for SIP calculation.' });
            }

            const sipAmount = calculateSIPAmount(allocation, fund.oneYearCAGR, duration);
            totalSIP += sipAmount;

            sipResults.push({
                name: fund.name,
                risk: fund.risk,
                cagr: fund.oneYearCAGR,
                sipAmount: sipAmount.toFixed(2),
                currentValue: fund.current_value
            });
        }

        res.json({
            success: true,
            message: 'SIP calculation successful.',
            totalSIPAmount: totalSIP.toFixed(2),
            funds: sipResults,
        });

    } catch (error) {
        console.error('SIP Calculation Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Helper function to determine the next risk category
const getNextRisk = (risk) => {
    switch (risk) {
        case 'Low':
            return 'Medium';
        case 'Medium':
            return 'High';
        case 'High':
            return 'High'; // There is no category above "High", so return "High"
        default:
            return null;
    }
};


// Controller: Calculate Future Value of SIP
export const calculateFutureValue = async (req, res) => {
    try {
        const { sipAmount, duration, risk } = req.body;

        if (!sipAmount || !duration || !risk) {
            return res.status(400).json({ message: 'sipAmount, duration, and risk are required.' });
        }

        // Fetch funds based on the user's specified risk category
        let funds = await Index.find({ risk });
        if (!funds.length) {
            return res.status(404).json({ message: 'No index funds found for the selected risk.' });
        }

        // Fetch funds from higher risk categories (to use if duration > 5)
        const higherRiskFunds = await Index.find({ risk: getNextRisk(risk) });
        const highestRiskFunds = await Index.find({ risk: getNextRisk(getNextRisk(risk)) });

        if (!higherRiskFunds.length) {
            return res.status(404).json({ message: `No funds found for risk category: ${getNextRisk(risk)}` });
        }
        if (!highestRiskFunds.length) {
            return res.status(404).json({ message: `No funds found for risk category: ${getNextRisk(getNextRisk(risk))}` });
        }

        // Sort funds by CAGR in descending order
        funds.sort((a, b) => b.oneYearCAGR - a.oneYearCAGR);
        higherRiskFunds.sort((a, b) => b.oneYearCAGR - a.oneYearCAGR);
        highestRiskFunds.sort((a, b) => b.oneYearCAGR - a.oneYearCAGR);

        let selectedFunds = [];

        // Logic based on duration
        if (duration < 5) {
            // Select 2 funds from the user's specified risk category (x)
            selectedFunds = funds.slice(0, 2);
        } else if (duration >= 5 && duration < 10) {
            // Select 2 funds from the user's specified risk category (x) and 1 from higher risk category (x+1)
            selectedFunds = [
                ...funds.slice(0, 2),        // 2 from risk "x"
                ...higherRiskFunds.slice(0, 1), // 1 from risk "x+1"
            ];
        } else {
            // Select 2 funds from the user's specified risk category (x), 2 from higher risk category (x+1), and 1 from highest risk category (x+2)
            selectedFunds = [
                ...funds.slice(0, 2),           // 2 from risk "x"
                ...higherRiskFunds.slice(0, 2), // 2 from risk "x+1"
                ...highestRiskFunds.slice(0, 1), // 1 from risk "x+2"
            ];
        }

        const totalCAGR = selectedFunds.reduce((sum, fund) => sum + fund.oneYearCAGR, 0);

        const results = [];

        for (const fund of selectedFunds) {
            // Calculate the allocation based on CAGR weight
            const allocation = sipAmount * (fund.oneYearCAGR / totalCAGR);

            // Monthly rate (annual CAGR / 12) and total months
            const r = fund.oneYearCAGR / 12 / 100;
            const n = duration * 12;

            // Calculate Future Value using SIP formula: FV = P * ((1+r)^n - 1) / r * (1+r)
            const futureValue = allocation * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

            // Store the result for this fund
            results.push({
                name: fund.name,
                risk: fund.risk,
                cagr: fund.oneYearCAGR,
                allocatedSIPAmount: allocation.toFixed(2),
                estimatedFutureValue: futureValue.toFixed(2),
            });
        }

        res.json({
            success: true,
            message: 'Future value calculated successfully.',
            results,
        });

    } catch (error) {
        console.error('Future Value Calculation Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Controller: Calculate Investment Value (SIP or Lump Sum)
export const calculateInvestmentValue = async (req, res) => {
    try {
        const { investmentType, amount, cagr, duration } = req.body;

        if (!investmentType || !amount || !cagr || !duration) {
            return res.status(400).json({ message: 'investmentType, amount, cagr, and duration are required.' });
        }

        let futureValue;
        let investedAmount;

        if (investmentType === 'sip') {
            const r = cagr / 12 / 100;
            const n = duration * 12;
            investedAmount = amount * n;
            futureValue = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        } else if (investmentType === 'lumpsum') {
            const r = cagr / 100;
            investedAmount = amount;
            futureValue = amount * Math.pow(1 + r, duration);
        } else {
            return res.status(400).json({ message: 'Invalid investment type. Use "sip" or "lumpsum".' });
        }

        res.json({
            success: true,
            message: 'Investment value calculated successfully.',
            investedAmount: investedAmount.toFixed(2),
            futureValue: futureValue.toFixed(2),
        });

    } catch (error) {
        console.error('Investment Value Calculation Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
