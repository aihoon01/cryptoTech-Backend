
# Cryptocurrency Market

This application feeds users with the most recent updates on crypto currency statistics. Users can view detailed statistics of a crypto currency by selecting the crypto. Users can also add assets to their portfolio and view their assets value in real time.

## Authors

- [Stephen Aihoon | Backend Engineer](https://github.com/aihoon01)
- [Asiedu  Saah | Frontend Engineer](https://github.com/amalisaah)



## Acknowledgements

 - [Sharaf Deen Okyere | Product Owner](sharaf.okyere@amalitech.org)
 - [Arthur Benjamin | Technical Advisor](arthur.benjamin@amalitech.com)


## Features

- Display live cryptocurrencies with latest market data and statistics.
- Display detailed information about a cryptocurrency
- Adding assets to portfolio
- View statistics about added assets
- Updating user's portfolio
- Watchlist for tracking cryptocurrencies statistics
- Insights into user's portfolio


## API Reference

#### Get all items
Returns crypto currencies sorted by market cap by default

```http
  GET /https://cryptotech-backend.herokuapp.com
```
HEADERS
| X-CMC_PRO_API_KEY | Accept     | Accept -Encoding                |
| :-------- | :------- | :------------------------- |
| `process.env.API_KEY`
 `application/json` | `deflate, gzip` |

#### Get item

```http
  GET /https://cryptotech-backend.herokuapp.com?`sort=${sort_by}&sort_dir=${sort_in}`
  queries:
   sort_by: users can sort by 'price'/'name'
   sort_in: users can sort in 'asc' or 'desc' for ascending and descending order respectively. 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required**. defining endpoints with accepted query params |


```http
  GET /https://cryptotech-backend.herokuapp.com/v2/tools/price-conversion?`id=${req.query.id}&amount=${req.query.amount}&convert=${req.query.convert}`
  queries:
   id: id for the crypto currency to be purchased
   amount: amount for crypto to be purchased in coins.
   convert: currency type for the coin to currency conversion. 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required**. defining endpoints with accepted query params |







## Documentation
[Click here for the full app Documentation](https://git.heroku.com/cryptotech-backend.git/api-docs) 
## Related

Here are the related project links 

[Frontend Solution URL](https://github.com/amalisaah/crptotech)

[Backend Solution URL](https://github.com/aihoon01/cryptoTech-Backend)


## Development Process
This project was developed on the basis of MVC (Model-View-Controller) desgin pattern whiles strictly adhering to the YAGNI principle. Two Developers (frontend developer & backend developer) built this project with the code first-approach method. 
## Tech Stack

**Client:** React, React Router, Bootstrap

**Server:** Node, Express


## Live URL link

https://crptotech-main.netlify.app/


## Screenshots

![Cryptocurreny table](./models/screenshots/Screenshot%20(200).png)

![WatchList Page](./models/screenshots/Screenshot%20(201).png)


## Run Locally

Clone the project

```bash
  git clone https://github.com/aihoon01/cryptoTech-Backend
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node server.js
```


## Running Tests

To run tests, run the following command inside the test directory

```bash
  npm test
```


