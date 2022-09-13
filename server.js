import express from 'express';
import cors from 'cors';

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


const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log("server is listening on PORT: " + port)
})

export default app