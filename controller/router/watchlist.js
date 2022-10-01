import express from "express";
import { watchListDb } from "../../models/watchlist/watchlistDb.js";
import { cryptoAdd, cryptoDelete, getCryptoById } from "../helperFunctions.js";
import { coinDb } from "../../models/coin/coinDb.js";


const wlRouter = express.Router();


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
 *   name: Watchlist
 *   description: API for calling Selected cryptos on watchlist
 */

/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Returns all crypto currencies on watchlist
 *     tags: [Watchlist]
 *     responses:
 *       200:
 *         description: List of crypto currencies
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

wlRouter.get('/', (req, res) => {
    res.send(watchListDb);
});


/**
 * @swagger
 * /watchlist:
 *   post:
 *     summary: Sends a crypto currency to the watchlist page
 *     tags: [Watchlist]
 *     
 *     parameters:
 *      - in: query
 *        name: id
 *        description: the cryptocurrency id
 *        schema:
 *          type: string
 *        required: true
 * 
 *     responses:
 *       200:
 *         description: List of crypto currencies
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


wlRouter.post('/', (req, res) => {
    const id = req.query.id
    const crypto = getCryptoById(coinDb[0], id);
    // console.log(coinDb)
    // console.log(crypto);
    try {
    if (crypto) {
    cryptoAdd(watchListDb, crypto);
    } else {
        res.send(`cannot find crypto with id: ${id}`)
    }
    res.send(watchListDb)
} catch(error) {
    console.log(error.message)
}
    
})


/**
 * @swagger
 * /watchlist:
 *   delete:
 *     summary: Deletes a crypto currency from the watchlist page
 *     tags: [Watchlist]
 *     
 *     parameters:
 *      - in: query
 *        name: id
 *        description: the cryptocurrency id
 *        schema:
 *          type: string
 *        required: true
 * 
 *     responses:
 *       200:
 *         description: List of Updated crypto currencies on Watchlist page
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

wlRouter.delete('/', (req, res) => {
    const id = req.query.id;
    try{
    const crypto = getCryptoById(watchListDb, id);
    if (crypto) {
    cryptoDelete(watchListDb, crypto);
    } else {
        console.log(`cannot find crypto with id ${id}`)
    }
    res.send(watchListDb)

    } catch (error) {
        console.log(error.message)
    }
})

export default wlRouter;
