const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const cryptoRoutes = require('./routes/cryptoRoutes');
const { fetchCryptoData } = require('./controllers/cryptoController');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', cryptoRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};


app.get('/', (req, res) => {
  res.send('Welcome to the KoinX API!');
});

cron.schedule('0 */2 * * *', () => {
  console.log('Fetching cryptocurrency data...');
  fetchCryptoData();
});

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
