import express from "express";
import fetch from "node-fetch";
import { portfolioDb, data } from "../../models/portfolio/portfolioDb.js";
const pfRouter = express.Router();

pfRouter.get('/', (req, res) => {
    res.send(portfolioDb);
})

pfRouter.post('/', async (req, res) => {
    const id = req.query.id;
    const amount = req. query.amount;

    const addAssert = async () => {
    const baseUrl = 'https://cryptotech-backend.herokuapp.com';
    const endPoint = '/assert';
    const requestParams = `?id=${id}&amount=${amount}&convert=usd`;
    const urlToFetch = `${baseUrl}${endPoint}${requestParams}`;

    try {
    const res = await fetch(urlToFetch)
    if (res.ok) {
    const data = await res.json();
    return data.data
    } else {
        alert("Cannot get data")
    }
    } catch (error) {
        console.log(error.message);
    }
}

    const portfolio = await addAssert()
    data.push(portfolio);
    res.send(portfolioDb);

})

export default pfRouter;