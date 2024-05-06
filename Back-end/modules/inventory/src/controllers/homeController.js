import db from '../models/index';
require('dotenv').config();

const amqp = require('amqplib')

let getHomePage = async (req, res) => {
    try {
        // Create connect
        const connection = await amqp.connect('amqp://localhost')
        // Create channel
        const channel = await connection.createChannel()
        // Create name queue
        const nameQueue = 'Queue from inventory service'
        // Create queue
        await channel.assertQueue(nameQueue, {
            durable: false, // khi sever bi crash se mat data,
        })
        // Send to queue
        await channel.sendToQueue(nameQueue, Buffer.from('Hello Felix'), {
            expiration: '10000', //TTL (time to live),
            // persistent: true // Save queue in cache or disk 
        })

        await channel.close();
        await connection.close();
        res.send('Queue from inventory')
        // let docsPath = {
        //     data: "http://localhost:" + process.env.PORT + "/api/swagger-docs"
        // }
        // console.log("--------------------------------");
        // console.log("Welcome to the home page of Inventory API");
        // console.log("--------------------------------");
        // return res.render('homepage.ejs', docsPath);
        // return res.render('homepage');

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getHomePage: getHomePage,
}