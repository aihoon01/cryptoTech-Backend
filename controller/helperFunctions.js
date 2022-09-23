export const sortByPriceA = (datas) => {
return datas.map(data => data).sort((x,y) => x.quote.USD.price - y.quote.USD.price);
}

export const sortByPriceD = (datas) => {
    return datas.map(data => data).sort((x,y) => y.quote.USD.price - x.quote.USD.price);
}

export const sortByNameA = (datas) => {
    return datas.map(data => data).sort((x,y) => x.name.localeCompare(y.name));
}

export const sortByNameD = (datas) => {
    return datas.map(data => data).sort((x,y) => y.name.localeCompare(x.name));
}