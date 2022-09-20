import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

app.use(cors({
    origin:process.env.URL || '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Import Routes
import allCryptoRouter from './controller/routes/cryptoinfo.js';
import sortCryptoRouter from './controller/routes/sortCrypto.js';
import addAssertRouter from './controller/routes/asserts.js';

//API Routes
app.use('/', allCryptoRouter);
app.use('/sort', sortCryptoRouter);
app.use('/assert', addAssertRouter);

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
        servers: [ { url: "https://git.heroku.com/cryptotech-backend.git" }]
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