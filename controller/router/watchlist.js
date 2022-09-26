import express from "express";
import { watchListDb } from "../../models/watchlist/watchlistDb.js";
import { cryptoAdd, cryptoDelete, getCryptoById } from "../helperFunctions.js";
import { coinDb } from "../../models/coin/coinDb.js";


const wlRouter = express.Router();

wlRouter.get('/', (req, res) => {
    res.send(watchListDb);
});

wlRouter.post('/', (req, res) => {
    const id = req.query.id
    const crypto = getCryptoById(coinDb, id);
    // console.log(crypto);
    cryptoAdd(watchListDb, crypto);
    res.send(watchListDb)

})

wlRouter.delete('/', (req, res) => {
    const id = req.query.id;
    cryptoDelete(watchListDb, id);
    res.send(watchListDb)
})

export default wlRouter;
