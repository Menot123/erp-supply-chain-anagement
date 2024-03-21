const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimitAndTimeout = require("./middlewares/rateLimitAndTimeout");
const routes = require("./routes");

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information
app.use(rateLimitAndTimeout); // Apply the rate limit and timeout middleware to the proxy
app.use(routes);

module.exports = app;