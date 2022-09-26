import express from "express";
import { portfolioDb } from "../../models/portfolio/portfolioDb.js";
const pfRouter = express.Router();

pfRouter.get('/', (req, res) => {
    res.send(portfolioDb);
})

export default pfRouter;