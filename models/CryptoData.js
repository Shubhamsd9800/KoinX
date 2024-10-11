const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
  coinId: { 
    type: String, 
    required: true },
  name: { 
    type: String, 
    required: true },
  priceUSD: { 
    type: Number, 
    required: true },
  marketCapUSD: { 
    type: Number, 
    required: true },
  change24h: { 
    type: Number, 
    required: true },
  timestamp: { 
    type: Date, 
    default: Date.now }
});

const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);
module.exports = CryptoData;
