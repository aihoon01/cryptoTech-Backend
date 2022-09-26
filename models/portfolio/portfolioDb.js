import db from "../db.js";
import { cryptoPrice, cryptoPriceSum } from "../../controller/helperFunctions.js";
let data= await db('addAssert');
export let portfolioDb = [];

cryptoPrice(portfolioDb, data)
cryptoPriceSum(portfolioDb)
