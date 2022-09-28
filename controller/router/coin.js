import express from "express";
import { coinDb } from "../../models/coin/coinDb.js";
import { sortByPriceA, sortByPriceD, sortByNameA, sortByNameD } from "../helperFunctions.js";

const coinRouter = express.Router();

coinRouter.get('/', (req, res) => {
    try {
        const coins = coinDb
        res.json(coins)
    } catch (error) {
        console.error(error.message)
    }
});

coinRouter.get('/:sort', (req, res) => {
    try {
    switch (req.params.sort) {
        case 'sortna':
            const sortedcoinNa = sortByNameA(coinDb);
            res.json(sortedcoinNa)
            break;
        case 'sortnd':
            const sortedCoinNd = sortByNameD(coinDb);
            res.json(sortedCoinNd)
            break;
        case 'sortpa':
            const sortedCoinPa = sortByPriceA(coinDb);
            res.json(sortedCoinPa)
            break;
        case 'sortpd':
            const sortedCoinPd = sortByPriceD(coinDb);
            res.json(sortedCoinPd)
            break;
        }
    } catch (error) {
        console.error(error.message)
    }
})
// try{
//     if (req.params.sort === 'sortna') {
//         const coins = coinDbNa
//         res.json(coins)
//     } else {
//         console.log('error')
//     }
// } catch(error) {
//     console.error(error.message)
// }
// })

export default coinRouter