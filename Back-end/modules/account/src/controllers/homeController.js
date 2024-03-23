import db from '../models/index';
require('dotenv').config();

let getHomePage = async(req, res) => {
    try {
        let docsPath = {
            data: "http://localhost:" + process.env.PORT + "/api/swagger-docs"
        }
        console.log("--------------------------------");
        console.log("Welcome to the home page of Account API");
        console.log("--------------------------------");
        return res.render('homepage.ejs', docsPath);

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getHomePage: getHomePage,
}