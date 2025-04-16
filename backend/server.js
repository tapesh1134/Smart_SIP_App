const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const fundRoutes = require('./routes/fundRoutes');
const sipRoutes = require('./routes/sipRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Required to parse JSON bodies
app.use(cors());
app.use(express.json()); // <--- THIS LINE IS CRUCIAL

// Routes
app.use('/api/funds', fundRoutes);
app.use('/api/sip', sipRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.log(err));
