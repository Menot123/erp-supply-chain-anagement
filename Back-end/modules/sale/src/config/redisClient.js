const redis = require('redis');

// Tạo một client kết nối đến Redis
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

redisClient.on('connect', () => {
    console.log('Connected to Redis...');
});

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = redisClient;