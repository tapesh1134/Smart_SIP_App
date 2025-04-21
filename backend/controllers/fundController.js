// Get all mutual funds
import axios from "axios";
import { Fund } from "../models/fundSchema.js";

export const getAllFunds = async (req, res) => {
  try {
    const funds = await Fund.find();

    const fundDataWithAPI = await Promise.all(
      funds.map(async (fund) => {
        try {
          const response = await axios.get(`https://api.mfapi.in/mf/${fund.schemeCode}/latest`);
          const { meta, data } = response.data;

          return {
            scheme_code: fund.scheme_code,
            risk: fund.risk,
            fund_house: meta?.fund_house || "N/A",
            scheme_name: meta?.scheme_name || "N/A",
            scheme_type: meta?.scheme_type || "N/A",
            scheme_category: meta?.scheme_category || "N/A",
            latest_nav: data?.[0]?.nav || "N/A",
            nav_date: data?.[0]?.date || "N/A",
          };
        } catch (err) {
          console.error(`Error fetching NAV for ${fund.scheme_code}:`, err.message);
          return {
            scheme_code: fund.scheme_code,
            risk: fund.risk,
            error: "NAV fetch failed"
          };
        }
      })
    );

    res.status(200).json({
      success: true,
      count: fundDataWithAPI.length,
      data: fundDataWithAPI
    });

  } catch (error) {
    console.error("Error fetching funds:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// Add a new mutual fund
export const addFund = async (req, res) => {
  try {
    const { schemeCode, risk } = req.body;
    if (!schemeCode || !risk) {
      return res.status(400).json({
        success: false,
        message: "schemeCode and risk are required."
      });
    }

    const existing = await Fund.findOne({ schemeCode });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Fund with this schemeCode already exists."
      });
    }
    const fund = new Fund({ schemeCode, risk });
    await fund.save();

    res.status(201).json({
      success: true,
      message: "Fund added successfully.",
      data: fund
    });
  } catch (error) {
    console.error("Error adding fund:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add fund.",
      error: error.message
    });
  }
};
