// rabbitmq.js
const amqp = require('amqplib/callback_api');
import { handleCheckProductIsEnough } from '../services/productService'

const startRabbitMQ = () => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const queue = 'order_queue';

            channel.assertQueue(queue, {
                durable: false,
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, async (msg) => {
                if (msg !== null) {
                    const order = JSON.parse(msg.content.toString());
                    // console.log(" [x] Received %s", order);

                    try {
                        let isEnoughProduct = [];
                        if (order && order?.productList && order?.productList?.length > 0) {
                            isEnoughProduct = await handleCheckProductIsEnough(order?.productList)
                        }


                        const response = JSON.stringify(isEnoughProduct)

                        channel.sendToQueue(msg.properties.replyTo,
                            Buffer.from(response), {
                            correlationId: msg.properties.correlationId
                        });

                        channel.ack(msg);
                    } catch (error) {
                        console.error('Error checking inventory:', error);
                        channel.ack(msg);

                    }
                }
            }, {
                noAck: false,
            });
        });
    });
};

module.exports = startRabbitMQ;