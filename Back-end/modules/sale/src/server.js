import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import initApiRoutes from './route/api';
import setupSwagger from './middleware/swagger';
import connectDB from './config/connectDB';
import cacheMiddleware from './middleware/cacheMiddleware';
require('dotenv').config();
let app = express();
let port = process.env.PORT || 8084;

app.use(function (req, res, next) {


    // Website you wish to allow to connect
    const allowedOrigins = [process.env.REACT_URL, 'https://deploy-fe-erp-viet-77xme8ljr-felixs-projects-f472e045.vercel.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

setupSwagger(app);

viewEngine(app);
initApiRoutes(app)
initWebRoutes(app);


connectDB();


app.listen(port, () => {
    //callback
    console.log("Backend Node ERP Sale running on the port:", +port);
});