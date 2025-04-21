import mongoose from 'mongoose';
import Fund from './models/fundSchema'

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Fund.insertMany([
      { schemeCode: "118455", risk: "Low"},
      { schemeCode: "100153", risk: "Low"},
      { schemeCode: "151162", risk: "Low"},
    ]);
    console.log('Sample data inserted!');
  })
  .catch(err => console.log('Error inserting data:', err));
