import db from "../db.js";
import { sortByPriceA, sortByPriceD, sortByNameA, sortByNameD } from "../../controller/helperFunctions.js";

//Database for the coin landing page
export const coinDb = await db('getAllCrypto');
//Database for the coin landing page sorted by name in ascending order
export const coinDbNa = await db('sortCryptoNameA')
//Database for the coin landing page sorted by name in descending order
export const coinDbNd = await db('sortCryptoNameD')
//Database for the coin landing page sorted by price in ascending order
export const coinDbPa = await db('sortCryptoPriceA')
//Database for the coin landing page sorted by price in descending order
export const coinDbPd = await db('sortCryptoPriceD')
// const sortes = sortByNameD(coinDb);
// console.log(sortes[0])