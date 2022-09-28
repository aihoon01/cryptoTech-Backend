//Main Database Source
import { getAllCrypto } from "../controller/scripts/allcrypto.js";
import { addAssert } from "../controller/scripts/addAssert.js";

const operations = ['getAllCrypto', 'sortCryptoNameA', 'sortCryptoNameD', 'sortCryptoPriceA', 'sortCryptoPriceD']

const db = async (operations) => {
  switch (operations) {
    case 'getAllCrypto':
        return await getAllCrypto()
        break;
    }
}
// const DB = [await db('sortCryptoNameA'), await db('getAllCrypto'), await db('sortCryptoNameD'), await db('sortCryptoPriceA'), await db('sortCryptoPriceD')]
// console.log(await db('getAllCrypto'));
// console.log(DB.length)
export default db