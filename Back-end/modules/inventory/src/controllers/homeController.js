import db from '../models/index';
require('dotenv').config();

const amqp = require('amqplib')

let getHomePage = async (req, res) => {
    try {

        let docsPath = {
            data: "http://localhost:" + process.env.PORT + "/api/swagger-docs"
        }
        console.log("--------------------------------");
        console.log("Welcome to the home page of Inventory API");
        console.log("--------------------------------");
        return res.render('homepage.ejs', docsPath);
        return res.render('homepage');
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getHomePage: getHomePage,
}