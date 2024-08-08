const amqp = require('amqplib/callback_api');

// export const checkProductInventory = (dataSendToQueue) => {
//     amqp.connect('amqp://localhost', (error0, connection) => {
//         if (error0) {
//             throw error0;
//         }
//         connection.createChannel((error1, channel) => {
//             if (error1) {
//                 throw error1;
//             }

//             const queue = 'order_queue';
//             const replyQueue = 'reply_queue';
//             const correlationId = generateUuid();
//             const msg = JSON.stringify(dataSendToQueue);

//             channel.assertQueue(queue, {
//                 durable: false,
//             });

//             channel.assertQueue(replyQueue, {
//                 durable: false,
//             });

//             let result = []

//             channel.consume(replyQueue, (msg) => {
//                 if (msg.properties.correlationId === correlationId) {
//                     console.log(' [.] Got %s', msg.content.toString());
//                     result.push(msg.content)
//                     setTimeout(() => {
//                         connection.close();
//                     }, 500);
//                 }
//                 return result
//             }, {
//                 noAck: true
//             });

//             channel.sendToQueue(queue, Buffer.from(msg), {
//                 correlationId: correlationId,
//                 replyTo: replyQueue
//             });
//         });
//     });
// };

export const checkProductInventory = (dataSendToQueue) => {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0) {
                return reject(error0);
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    return reject(error1);
                }

                const queue = 'order_queue';
                const replyQueue = 'reply_queue';
                const correlationId = generateUuid();
                const msg = JSON.stringify(dataSendToQueue);

                channel.assertQueue(queue, {
                    durable: false,
                });

                channel.assertQueue(replyQueue, {
                    durable: false,
                });


                channel.consume(replyQueue, (msg) => {
                    if (msg.properties.correlationId === correlationId) {
                        const response = JSON.parse(msg.content.toString());
                        // console.log(' [.] Got %s', response);
                        resolve(response);
                        setTimeout(() => {
                            connection.close();
                        }, 500);
                    }
                }, {
                    noAck: true
                });

                channel.sendToQueue(queue, Buffer.from(msg), {
                    correlationId: correlationId,
                    replyTo: replyQueue
                });
            });
        });
    });
};

function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}
