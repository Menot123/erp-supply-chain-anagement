// rabbitmq.js
const amqp = require('amqplib/callback_api');
import { handleCheckProductIsEnough } from '../services/productService'
import { sendNotification } from './inventoryMailService'

const startRabbitMQ = () => {
    const rabbitMQHost = process.env.RABBITMQ_HOST || 'rabbitmq';
    const rabbitMQPort = process.env.RABBITMQ_PORT || '5672';

    amqp.connect(`amqp://${rabbitMQHost}:${rabbitMQPort}`, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const queue = 'order_queue';
            const queue2 = 'mailer_queue';

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

            // Thiết lập hàng đợi 2
            channel.assertQueue(queue2, {
                durable: false,
            });

            channel.consume(queue2, async (msg) => {
                if (msg !== null) {
                    const receivers = JSON.parse(msg.content.toString());
                    let arrReceivers = receivers.split('_')
                    if (arrReceivers && arrReceivers.length === 3) {
                        let invoiceId = arrReceivers[arrReceivers.length - 1];
                        arrReceivers.pop()

                        arrReceivers.forEach(async (receiver) => {
                            await sendNotification({ receiver: receiver, invoiceId: invoiceId })
                        });
                    }

                    channel.ack(msg);
                }
            }, {
                noAck: false,
            });
        });
    });
};

module.exports = startRabbitMQ;