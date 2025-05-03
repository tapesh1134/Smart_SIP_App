import mongoose from 'mongoose';
import { Index } from './models/indexSchema.js'; // Adjust the path as needed

const seedIndices = async () => {
  const indicesData = [
    { name: "NIFTY 50", type: "NSE", current_value: 24131.10, oneYearCAGR: 8.8, risk: "Low" },
    { name: "NIFTY Midcap 100", type: "NSE", current_value: 46070.85, oneYearCAGR: 11.1, risk: "Medium" },
    { name: "NIFTY Smallcap 100", type: "NSE", current_value: 55199.86, oneYearCAGR: 9.0, risk: "High" },
    { name: "NIFTY Realty", type: "NSE", current_value: null, oneYearCAGR: 7.91, risk: "High" },
    { name: "NIFTY Pharma", type: "NSE", current_value: null, oneYearCAGR: 20.35, risk: "Medium" },
    { name: "NIFTY Auto", type: "NSE", current_value: null, oneYearCAGR: 19.84, risk: "Medium" },
    { name: "NIFTY IT", type: "NSE", current_value: null, oneYearCAGR: 19.08, risk: "Medium" },
    { name: "NIFTY Media", type: "NSE", current_value: null, oneYearCAGR: -26.08, risk: "High" },
    { name: "S&P BSE Sensex", type: "BSE", current_value: 79802.79, oneYearCAGR: 8.2, risk: "Low" },
    { name: "S&P BSE Midcap", type: "BSE", current_value: 46070.85, oneYearCAGR: 9.53, risk: "Medium" },
    { name: "S&P BSE Smallcap", type: "BSE", current_value: 55199.86, oneYearCAGR: 11.71, risk: "High" },
    { name: "BSE AllCap", type: "BSE", current_value: 10471.31, oneYearCAGR: 14.88, risk: "Medium" },
    { name: "BSE Greenex", type: "BSE", current_value: 7827.50, oneYearCAGR: 22.37, risk: "High" },
  ];

  try {
    await Index.insertMany(indicesData);
    console.log("Indices seeded successfully.");
  } catch (err) {
    console.error("Error seeding indices:", err);
  }
};

// Connect to MongoDB and seed data
mongoose.connect('mongodb+srv://tapesh:tapesh@cluster0.3ozzf.mongodb.net/smart-sip', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB.");
    await seedIndices();
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
    mongoose.disconnect();
  });
