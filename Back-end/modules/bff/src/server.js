import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB';
import initApiRoutes from './route/api'
import setupSwagger from './middlewares/swagger';
const cookieParser = require('cookie-parser');

require('dotenv').config();

let app = express();

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL || "http://localhost:3000");

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


app.use(cookieParser());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

setupSwagger(app);

viewEngine(app);
initApiRoutes(app)
initWebRoutes(app);

// connectDB();

let port = process.env.PORT || 8088;

app.listen(port, () => {
    //callback
    console.log("BFF Node ERP running on the port:", +port);
});