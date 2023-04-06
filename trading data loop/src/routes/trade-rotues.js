const express = require('express');
const { listData } = require('../controllers/list-trade-controller');
const { getData } = require('../controllers/trade-controller');
const tradeRouter = express.Router();

tradeRouter.get('/test', (req, res) => res.send('v1 api working'));
tradeRouter.get('/get-data', getData);
tradeRouter.get('/list-data', listData);

module.exports = tradeRouter