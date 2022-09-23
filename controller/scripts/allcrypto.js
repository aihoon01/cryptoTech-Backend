import fetch from 'node-fetch';
const baseUrl = 'https://cryptotech-backend.herokuapp.com';
// Get all available Crytpo Currencies
export const getAllCrypto = async () => {
  
    try {
    const res = await fetch(baseUrl)
    if (res.ok) {
    const data = await res.json()
    return data.data 
    } else {
        console.log("Cannot get data")
    }
    } catch (error) {
        console.log(error.message);
    }
    
};
//sort crypto currency by name;
    //ascending order Sort
export const sortCryptoNameA = async () => { 
    const endPoint = '/sort';
    const requestParams = '?sort=name&sort_dir=asc';
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
    
};

    //Descending order Sort
export const sortCryptoNameD = async () => { 
    const endPoint = '/sort';
    const requestParams = '?sort=name&sort_dir=desc';
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
    
};

//Sort Crypto by Price
   //ascending order Sort
export const sortCryptoPriceA = async () => { 
    const endPoint = '/sort';
    const requestParams = '?sort=price&sort_dir=asc';
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
    
};

   //Descending order Sort
export const sortCryptoPriceD = async () => { 
    const endPoint = '/sort';
    const requestParams = '?sort=price&sort_dir=desc';
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
    
};


export const getCryptoInfo = async () => {
    const endPoint = '/';
    const requestParams = `?id=1`;
    const urlToFetch = `${baseUrl}${endPoint}${requestParams}`;

    try {
    const res = await fetch(urlToFetch)
    if (res.ok) {
    const data = await res.json();
    return data  
    } else {
        alert("Cannot get data")
    }
    } catch (error) {
        console.log(error.message);
    }
    
};