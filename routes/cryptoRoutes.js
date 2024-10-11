const express = require('express');
const router = express.Router();
const { getStats, getDeviation, fetchCryptoData } = require('../controllers/cryptoController');

// Route for triggering the background job to fetch crypto data
router.post('/fetch', async (req, res) => {
    try {
      const fetchedData = await fetchCryptoData(); // Call the function to fetch and store crypto data
      res.status(200).json({ 
        message: 'Crypto data fetched successfully.',
        data: fetchedData // Include the fetched data in the response
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching crypto data.', error: error.message });
    }
  });

// Route for fetching stats of a cryptocurrency
router.get('/stats', getStats);

// Route for fetching standard deviation of a cryptocurrency's price
router.get('/deviation', getDeviation);

module.exports = router;
