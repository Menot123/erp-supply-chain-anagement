import db from '../models/index';

const amqp = require('amqplib')

let getHomePage = async(req, res) => {

    try {
        // // Create connect
        // const connection = await amqp.connect('amqp://localhost')
        // // Create channel
        // const channel = await connection.createChannel()
        // // Create name queue
        // const nameQueue = 'Queue from inventory service'
        // // Create queue
        // await channel.assertQueue(nameQueue, {
        //     durable: false, // khi sever bi crash se mat data,
        // })
        // // Receive to queue
        // await channel.consume(nameQueue, msg => {
        //     console.log('MSG: ', msg.content.toString())
        // }, { noAck: true })
        // res.send('Queue from sale')
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



    // try {
    //     let data = await db.User.findAll();
    //     console.log("--------------------------------");
    //     console.log(data);
    //     console.log("--------------------------------");
    //     return res.render('homepage.ejs');

    // } catch (err) {
    //     console.log(err);
    // }
}

module.exports = {
    getHomePage: getHomePage,
}