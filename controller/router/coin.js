import express from "express";
import { coinDb } from "../../models/coin/coinDb.js";
import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();
import { sortByPriceA, sortByPriceD, sortByNameA, sortByNameD } from "../helperFunctions.js";

const coinRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     cryptos:
 *       type: object
 *       securitySchemes:
 *         api_key:
 *           type: apiKey
 *           name: 'X-CMC_PRO_API_KEY'
 *           in: headers.headers
 *       properties:
 *         data:
 *           type: object
 *           description: object of cryptos
 *       example:
 *         date:
 *          - id: 1
 *            name: Bitcoin
 *            symbol: BTC
 *            slug: bitcoin
 *            cmc_rank: 5
 *            num_market_pairs: 500
 *            circulating_supply: 16950100
 *            total_supply: 16950100
 *            max_supply: 21000000
 *            last_updated: '2018-06-02T22:51:28.209Z'
 *            date_added: '2013-04-28T00:00:00.000Z'
 *            tags:
 *              - mineable
 *            platform: null
 *            self_reported_circulating_supply: null
 *            self_reported_market_cap: null
 *            quote:
 *              USD: 
 *                price: 9283.92
 *                volume_24h: 7155680000
 *                volume_change_24h: -0.152774
 *                percent_change_1h: -0.152774
 *                percent_change_24h: 0.518894
 *                percent_change_7d: 0.986573
 *                market_cap: 852164659250.2758
 *                market_cap_dominance: 51
 *                fully_diluted_market_cap: 952835089431.14
 *                last_updated: '2018-08-09T22:53:32.000Z'
 *              BTC:
 *                price: 1
 *                volume_24h: 772012
 *                volume_change_24h: 0
 *                percent_change_1h: 0
 *                percent_change_24h: 0
 *                percent_change_7d: 0
 *                market_cap: 17024600
 *                market_cap_dominance: 12
 *                fully_diluted_market_cap: 952835089431.14
 *                last_updated: '2018-08-09T22:53:32.000Z'
 *        
 *     generalError:
 *       400:
 *           description: Bad Request
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                      format: date-time
 *                     error_code: 
 *                       minimum: 400
 *                     error_message: 
 *                       pattern: Invalid value for id
 *                     elapsed: 
 *                       minimum: 10
 *                     credit_count: 
 *                       minimum: 0
 * 
 *       401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       format: date-time
 *                     error_code: 
 *                       minimum: 1002
 *                     error_message: 
 *                       pattern: API key missing
 *                     elapsed: 
 *                       minimum: 10
 *                     credit_count: 
 *                       minimum: 0
 * 
 *       403:
 *           description: Forbidden
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       format: date-time
 *                     error_code: 
 *                       minimum: 1006
 *                     error_message: 
 *                       pattern: Your API key subscription plan doesn't support this endpoint.
 *                     elapsed: 
 *                       minimum: 10
 *                     credit_count: 
 *                       minimum: 0
 * 
 *       429:
 *           description: Too Many Requests
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       format: date-time
 *                     error_code: 
 *                       minimum: 1008
 *                     error_message: 
 *                       pattern: You have exceeded your API key's HTTP request rate limit. Rate limit resets every minute.
 *                     elapsed: 
 *                       minimum: 10
 *                     credit_count: 
 *                        minimum: 0
 * 
 *       500:
 *         description: Internal Server Error
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       format: date-time
 *                     error_code: 
 *                       minimum: 500
 *                     error_message: 
 *                       pattern: An internal server error occurred
 *                     elapsed: 
 *                       minimum: 10
 *                     credit_count: 
 *                       minimum: 0
 *         
 */

/**
 * @swagger
 * tags:
 *   name: allCrypto
 *   description: API for calling all available cryptos
 */

/**
 * @swagger
 * /coins:
 *   get:
 *     summary: Returns all available crypto currencies
 *     tags: [allCrypto]
 *     responses:
 *       200:
 *         description: List of 100 crypto currencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cryptos'
 * 
 *       400:
 *         $ref: '#/components/schemas/generalError/400'
 *       
 * 
 *       401:
 *         $ref: '#/components/schemas/generalError/401'
 * 
 *       403:
 *         $ref: '#/components/schemas/generalError/403'
 *       
 *       429:
 *         $ref: '#/components/schemas/generalError/429'
 * 
 *       500:
 *         $ref: '#/components/schemas/generalError/500'
 *                 
 */

coinRouter.get('/', async (req, res) => {
    const headers = {
        headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
        'Accept': 'application/json',
        'Accept-Encoding': 'deflate, gzip'
    
    }};
    const baseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

    const getAllCrypto = async () => {
        try {
        const res = await fetch(baseUrl, headers)
        if (res.ok) {
        const data = await res.json()
        return data.data 
        } else {
            console.log("Cannot get data")
        }
        } catch (error) {
            console.log(error.message);
        }}
    const data = await getAllCrypto()
    coinDb.push(data);
    res.json(coinDb[0]);
});

/**
 * @swagger
 * /coins/{sort}:
 *   get:
 *     summary: Returns a sorted array of all available crypto currencies
 *     tags: [allCrypto]
 *     parameters:
 *      - in: path
 *        name: sort
 *        schema:
 *          type: string
 *        required: true
 *        description: criteria for sorting
 *     responses:
 *       200:
 *         description: List of 100 crypto currencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cryptos'
 * 
 *       400:
 *         $ref: '#/components/schemas/generalError/400'
 *       
 * 
 *       401:
 *         $ref: '#/components/schemas/generalError/401'
 * 
 *       403:
 *         $ref: '#/components/schemas/generalError/403'
 *       
 *       429:
 *         $ref: '#/components/schemas/generalError/429'
 * 
 *       500:
 *         $ref: '#/components/schemas/generalError/500'
 *                 
 */

coinRouter.get('/:sort', (req, res) => {
    try {
    switch (req.params.sort) {
        case 'sortna':
            const sortedcoinNa = sortByNameA(coinDb[0]);
            res.json(sortedcoinNa)
            break;
        case 'sortnd':
            const sortedCoinNd = sortByNameD(coinDb[0]);
            res.json(sortedCoinNd)
            break;
        case 'sortpa':
            const sortedCoinPa = sortByPriceA(coinDb[0]);
            res.json(sortedCoinPa)
            break;
        case 'sortpd':
            const sortedCoinPd = sortByPriceD(coinDb[0]);
            res.json(sortedCoinPd)
            break;
        }
    } catch (error) {
        console.error(error.message)
    }
})

export default coinRouter