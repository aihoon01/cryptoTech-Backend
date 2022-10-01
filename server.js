import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import coinRouter from './controller/router/coin.js';
import wlRouter from './controller/router/watchlist.js';
import pfRouter from './controller/router/portfolio.js';
import allCryptoRouter from './controller/routes/cryptoinfo.js';
import addAssertRouter from './controller/routes/assert.js';
import sortCryptoRouter from './controller/routes/sortCrypto.js';

const app = express();

app.use(cors({
    origin:process.env.URL || '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//External Routes
app.use('/', allCryptoRouter);
app.use('/assert', addAssertRouter);
app.use('/sort', sortCryptoRouter)

//INTERNAL ROUTES
app.use('/coins', coinRouter);
app.use('/watchlist', wlRouter);
app.use('/portfolio', pfRouter)

//Swagger Setup
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Cryptocurrency Marker",
            version: "1.0.0",
            description: "A cryptocurrency library API",
            contact: {
                name: "API Support",
                email: "stephen.aihoon@gmail.com"
            }
        },
        servers: [ { url: "https://cryptotech-backend.herokuapp.com" }, {url: "http://localhost:4000" }
    ]
    },
    apis: ["./controller/router/*.js"]
};

const specs = swaggerJSDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 4000;

app.listen(port, ()=> {
    console.log("server is listening on PORT: " + port)
})

export default app
