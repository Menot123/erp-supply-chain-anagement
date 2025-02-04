const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimitAndTimeout = require("./middlewares/rateLimitAndTimeout");
const routes = require("./routes");

const app = express();

// app.use(cors()); // Enable CORS


app.use(function (req, res, next) {


    // Website you wish to allow to connect
    const allowedOrigins = [process.env.REACT_URL, 'http://localhost:3000', 'https://deploy-fe-erp-viet-77xme8ljr-felixs-projects-f472e045.vercel.app'];
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

// Middleware setup
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information
app.use(rateLimitAndTimeout);
// Apply the rate limit and timeout middleware to the proxy
app.use(routes);

module.exports = app;