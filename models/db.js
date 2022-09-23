import { getAllCrypto, sortCryptoNameA, sortCryptoNameD, sortCryptoPriceA, sortCryptoPriceD } from "../controller/scripts/allcrypto.js";
import { addAssert } from "../controller/scripts/addAssert.js";

const operations = ['getAllCrypto', 'sortCryptoNameA', 'sortCryptoNameD', 'sortCryptoPriceA', 'sortCryptoPriceD']

const db = async (operations) => {
  switch (operations) {
    case 'getAllCrypto':
        return await getAllCrypto()
        break;
    case 'sortCryptoNameA':
        return await sortCryptoNameA()
        break;
    case 'sortCryptoNameD':
       return await sortCryptoNameD()
        break;
    case 'sortCryptoPriceA':
        return await sortCryptoPriceA()
        break;
    case 'sortCryptoPriceD':
        return await sortCryptoPriceD()
        break;
    case 'addAssert':
        return await addAssert()
        break;
    }
}
// const DB = [await db('sortCryptoNameA'), await db('getAllCrypto'), await db('sortCryptoNameD'), await db('sortCryptoPriceA'), await db('sortCryptoPriceD')]
// console.log(DB.length)
export default db