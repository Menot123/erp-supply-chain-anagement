import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import initApiRoutes from './route/api'
import connectDB from './config/connectDB';
import { createJWT, verifyToken } from './middleware/JWTServices';
require('dotenv').config();

let app = express();
let port = process.env.PORT || 8085;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());




viewEngine(app);
initApiRoutes(app);
initWebRoutes(app);

connectDB();


app.listen(port, () => {
    //callback
    console.log("Backend Node ERP Account running on the port:", +port);
});