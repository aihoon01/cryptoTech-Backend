import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import coinRouter from './controller/router/coin.js';
import wlRouter from './controller/router/watchlist.js';
import pfRouter from './controller/router/portfolio.js';

const app = express();

app.use(cors({
    origin:process.env.URL || '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//EXTERNAL Routes
import allCryptoRouter from './controller/routes/cryptoinfo.js';
// import sortCryptoRouter from './controller/routes/sortCrypto.js';
import addAssertRouter from './controller/routes/asserts.js';

//EXTERNAL API Routes
app.use('/', allCryptoRouter);
app.use('/assert', addAssertRouter);

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
        servers: [ { url: "https://cryptotech-backend.herokuapp.com" }]
    },
    apis: ["./controller/routes/*.js"]
};

const specs = swaggerJSDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log("server is listening on PORT: " + port)
})

export default app