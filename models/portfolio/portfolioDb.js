import db from "../db.js";
import { cryptoPrice, cryptoPriceSum } from "../../controller/helperFunctions.js";
export let data = [];
export let portfolioDb = [];
cryptoPrice(portfolioDb, data)
// cryptoPriceSum(portfolioDb)
