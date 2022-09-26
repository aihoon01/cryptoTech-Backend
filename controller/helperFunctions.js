export const sortByPriceA = (datas) => {
return datas.map(data => data).sort((x,y) => x.quote.USD.price - y.quote.USD.price);
};

export const sortByPriceD = (datas) => {
    return datas.map(data => data).sort((x,y) => y.quote.USD.price - x.quote.USD.price);
};

export const sortByNameA = (datas) => {
    return datas.map(data => data).sort((x,y) => x.name.localeCompare(y.name));
};

export const sortByNameD = (datas) => {
    return datas.map(data => data).sort((x,y) => y.name.localeCompare(x.name));
};

//Takes in a crypto array and a crypto object and check if crypto exists
//if crytpo exists, delete crypto from watchList DB, else add to watchList DB

//sample Test
// const data = [{
//     "id": 1,
//     "symbol": "BTC",
//     "name": "Bitcoin",
//     "amount": 1,
//     "last_updated": "2022-09-24T18:05:00.000Z",
//     "quote": {
//     "USD": {
//     "price": 19072.029697320148,
//     "last_updated": "2022-09-24T18:05:00.000Z"
//     }
//     }
//     }, {
//     "id": 1,
//     "symbol": "BTC",
//     "name": "Bitcoin",
//     "amount": 1,
//     "last_updated": "2022-09-24T18:05:00.000Z",
//     "quote": {
//     "USD": {
//     "price": 19072.029697320148,
//     "last_updated": "2022-09-24T18:05:00.000Z"
//     }
//     }
//     }];
// const others = {
//     "id": 2,
//     "symbol": "BTC",
//     "name": "Ethereum",
//     "amount": 1,
//     "last_updated": "2022-09-24T18:05:00.000Z",
//     "quote": {
//     "USD": {
//     "price": 19072.029697320148,
//     "last_updated": "2022-09-24T18:05:00.000Z"
//     }
//     }
//     };


export const cryptoAdd = (data, crypto) => {
    !data.includes(crypto) ? data.push(crypto) : data.splice(data.findIndex(ele => ele.id === crypto.id), 1)
    return data
};

export const cryptoDelete = (data, crypto) => {
   data.splice(data.findIndex(ele => ele.id === crypto.id), 1)
    return data
};
// console.log(cryptoAdd(data, others))

export const getCryptoById = (data, id) => {
    return data.find(element => element.id == id)
};

//Takes in a crypto array and a crypto object and check if crypto exists
//if crytpo exists, increase the total amount of the crypto
//If crypto does not exists, add crypto to the crypto array.
export const cryptoPrice = (data, crypto) => {
    data.length === 0 ? data.push(crypto): data.forEach(ele => ele.id === crypto.id ? ele.quote.USD.price +=crypto.quote.USD.price : data.unshift(crypto));
    return data
};

//Sums up the of all Cryptos
export const cryptoPriceSum = (data) => {
    const totalPrice = data.reduce((a, b) =>  a.quote.USD.price + b.quote.USD.price );
    if (data.length === 0) {
    data.push({totalPrice: 0})
    } else {
        const findX = data.find(ele => ele.key === totalPrice);
        if (findX) {
            totalPrice += totalPrice
        } else {
            data.push({totalPrice: totalPrice});
        }
    }
    return data
};
// console.log(cryptoPriceSum(data));