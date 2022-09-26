import { assert } from 'chai';
import { getCryptoById, cryptoPrice, cryptoPriceSum, cryptoAdd, cryptoDelete, sortByNameA, sortByNameD, sortByPriceA, sortByPriceD } from '../controller/helperFunctions.js';

describe('Helper Functions', () => {
    describe('getCryptoById', () => {
        it('Returns a crypto currency with the ID: 2', ()=> {
            //Setup
            let data = [{ name: 'Bitcoin', id: 1, price: 30000}, {name: 'Tether', id: 2, price: 23000}, {name: 'Ethereum', id: 3, price: 25000}];
            const expected = {name: 'Tether', id: 2, price: 23000};

            //Exercise
            const beta = getCryptoById(data, 2)

            //Verify
            assert.include(beta, expected);
        })
    });
    describe('cryptoDelete', () => {
        it('Deletes a crypto currency with the ID: 2', ()=> {
            //Setup
            let data = [{ name: 'Bitcoin', id: 1, price: 30000}, {name: 'Tether', id: 2, price: 23000}, {name: 'Ethereum', id: 3, price: 25000}];
            const exception = {name: 'Tether', id: 2, price: 23000};

            //Exercise
            const deletedCrypto = cryptoDelete(data, 2);

            //Verify
            assert.notInclude(data, exception);
        })
    });

    describe('cryptoAdd', () => {
        it('Adds ethereum to the list of cryptos', ()=> {
            //Setup
            let data = [{ name: 'Bitcoin', id: 1, price: 30000}, {name: 'Tether', id: 2, price: 23000}];
            const expect = [{ name: 'Bitcoin', id: 1, price: 30000}, {name: 'Tether', id: 2, price: 23000}, {name: 'Ethereum', id: 3, price: 25000}];
            const crypto = {name: 'Ethereum', id: 3, price: 25000};

            //Exercise
            const  results = cryptoAdd(data, crypto);

            //Verify
            assert.deepEqual(results, expect);
        })
    });

    // describe('router', () => {
    //     it('routes through a range of 4 to call specific fetch functions', ()=> {
    //         //Setup
    //         let num = 1;
    //         const expect = Object;
    //         //Exercise
    //         const beta= router(num);

    //         //Verify
    //         assert.include(beta, expect);
    //     })
    // });

    describe('cryptoPrice', () => {
        it('Adds a crypto price to an existing crypto', ()=> {
            //Setup
            const crypto = {
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                };

            let cryptoObj = [{
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                }];

            const expect = [{
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 38144.059394640295,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                }];
            //Exercise
            const beta= cryptoPrice(cryptoObj, crypto);

            //Verify
            assert.deepEqual(beta, expect);
            assert.isArray(beta);
        })

        it('Adds a new crypto Object', ()=> {
            //Setup
            const crypto = {
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                };

            let cryptoObj = [{
                "id": 2,
                "symbol": "BTC",
                "name": "Ethereum",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                }];

            const expect = [{
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                }, {
                    "id": 2,
                    "symbol": "BTC",
                    "name": "Ethereum",
                    "amount": 1,
                    "last_updated": "2022-09-24T18:05:00.000Z",
                    "quote": {
                    "USD": {
                    "price": 19072.029697320148,
                    "last_updated": "2022-09-24T18:05:00.000Z"
                    }
                    }
                    }];

            //Exercise
            const beta= cryptoPrice(cryptoObj, crypto);

            //Verify
            assert.deepEqual(beta, expect);
            assert.isArray(beta);
        })
    });

    describe('cryptoPriceSum', () => {
        it('Sums Up the price of all Cryptos', ()=> {
            //Setup
            let cryptoObj = [{
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                },  
                {
                "id": 2,
                "symbol": "BTC",
                "name": "Ethereum",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                } ];
            const expect = [{
                "id": 1,
                "symbol": "BTC",
                "name": "Bitcoin",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                },
                {
                "id": 2,
                "symbol": "BTC",
                "name": "Ethereum",
                "amount": 1,
                "last_updated": "2022-09-24T18:05:00.000Z",
                "quote": {
                "USD": {
                "price": 19072.029697320148,
                "last_updated": "2022-09-24T18:05:00.000Z"
                }
                }
                }, 
                {totalPrice: 38144.059394640295}];
            //Exercise
            const beta= cryptoPriceSum(cryptoObj);

            //Verify
            assert.deepEqual(beta, expect);
            // assert.isObject(beta);
        })
    });
})