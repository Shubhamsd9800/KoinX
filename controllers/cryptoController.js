const CryptoData = require('../models/CryptoData')
const axios = require('axios');

const fetchCryptoData = async () => {
  try {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];

    // Fetch data from CoinGecko API
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: coins.join(','), 
        order: 'market_cap_asc',
        price_change_percentage: '24h'
      }
    });

    console.log('Fetched Coin Data:', response.data);

    const allCoinData = [];
    for (const coin of coins) {
      const coinData = response.data.find(c => c.id === coin);

      if (coinData) {
        const dataToSave = {
          coinId: coin,
          name: coin === 'bitcoin' ? 'Bitcoin' :
                coin === 'matic-network' ? 'Matic' : 'Ethereum',
          priceUSD: coinData.current_price,
          marketCapUSD: coinData.market_cap,
          change24h: coinData.price_change_percentage_24h
        };

        allCoinData.push(dataToSave);

        console.log('Fetched Coin Data:', dataToSave);

        await CryptoData.create(dataToSave); 
      } else {
        console.error(`No data found for ${coin}`);
      }
    }

    // Print all coin data
    console.log('All Coin Data:', allCoinData);

    console.log('Data fetched and stored successfully.');

    return allCoinData;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error.message);
    throw error;
  }
};



// Controller for /stats API
const getStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) return res.status(400).json({ message: 'Coin is required' });

  try {
    const latestData = await CryptoData.findOne({ coinId: coin }).sort({ timestamp: -1 });
    
    if (!latestData) return res.status(404).json({ message: 'No data found' });

    res.json({
      price: latestData.priceUSD,
      marketCap: latestData.marketCapUSD,
      "24hChange": latestData.change24h
    });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller for /deviation API
const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
  const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
};

const getDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    const records = await CryptoData.find({ coinId: coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ message: 'No records found for this coin' });
    }

    const prices = records.map(record => record.priceUSD);
    const deviation = calculateStandardDeviation(prices);

    res.status(200).json({ deviation });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  fetchCryptoData,
  getStats,
  getDeviation,
};
