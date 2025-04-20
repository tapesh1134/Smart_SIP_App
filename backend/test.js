import mongoose from 'mongoose';
import Fund from './models/Fund.js'; // Assuming Fund model is correctly defined

mongoose.connect('mongodb://localhost:27017/smart-sip', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Fund.insertMany([
      { name: "Fund f", risk: "Low", cagr: 6 },
      { name: "Fund e", risk: "Medium", cagr: 9 },
      { name: "Fund d", risk: "Medium", cagr: 10 },
      { name: "Fund q", risk: "High", cagr: 13 }
    ]);
    console.log('Sample data inserted!');
  })
  .catch(err => console.log('Error inserting data:', err));
