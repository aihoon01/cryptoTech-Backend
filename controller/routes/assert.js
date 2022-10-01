import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const addAssertRouter = express.Router();

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
 *         data:
 *           symbol: BTC
 *           id: '1'
 *           name: Bitcoin
 *           amount: 50
 *           last_updated: '2018-06-06T08:04:36.000Z'
 *           quote:
 *               GBP:
 *                price: 284656.08465608465
 *                last_updated: '2018-06-06T06:00:00.000Z'
 *               LTC:
 *                price: 3128.7279766396537
 *                last_updated: '2018-06-06T08:04:02.000Z'
 *               USD:
 *                price: 381442
 *                last_updated: '2018-06-06T08:06:51.968Z'

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
 *   name: ExternalRoute
 *   description: API for converting crypto currency to USD
 */

/**
 * @swagger
 * /assert:
 *   get:
 *     summary: Converts crypto coins to currency (USD)
 *     tags: [ExternalRoute]
 * 
 *     parameters:
 *      - in: query
 *        name: id
 *        description: The id of the crypto currency to convert
 *        schema:
 *          type: integer
 *      - in: query
 *        name: amount
 *        description: The amount of crypto coin to convert
 *        schema:
 *          type: integer
 *      - in: query
 *        name: convert
 *        description: The conversion currency from crypto coin to currency amount.
 *        schema:
 *          type: string
 * 
 *     responses:
 *       200:
 *         description: Returns the price of crypto purchased
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