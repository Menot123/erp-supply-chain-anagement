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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

connectDB();

let port = process.env.PORT || 8085;

app.listen(port, () => {
    //callback
    console.log("Backend Node ERP Account running on the port:", +port);
});