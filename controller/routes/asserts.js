import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const addAssertRouter = express.Router();
addAssertRouter.get('/', async (req, res) => {
    const headers = {
        headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
        'Accept': 'application/json',
        'Accept-Encoding': 'deflate, gzip'
    
    }};
    const baseUrl = 'https://pro-api.coinmarketcap.com';
    const endPoint = '/v2/tools/price-conversion';
    const requestParams = `?id=${req.query.id}&amount=${req.query.amount}&convert=${req.query.convert}`;
    const urlToFetch = `${baseUrl}${endPoint}${requestParams}`;

    try {
    const cryptoInfo = await fetch(urlToFetch, headers);
    const data = await cryptoInfo.json();
    res.json(data);

    } catch(error) {
        console.error(error.message);
    }
})

export default addAssertRouter;