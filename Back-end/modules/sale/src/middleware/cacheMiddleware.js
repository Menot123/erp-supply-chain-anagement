import redisClient from '../config/redisClient'

// Middleware để kiểm tra cache
const cacheMiddleware = (keyPrefix) => {
    return (req, res, next) => {
        const key = `${keyPrefix}:${req.originalUrl}`;

        redisClient.get(key, (err, data) => {
            if (err) {
                console.error('Redis error: ', err);
                return next();
            }

            if (data) {
                return res.json(JSON.parse(data));
            } else {
                res.sendResponse = res.json;
                res.json = (body) => {
                    redisClient.setex(key, 3600, JSON.stringify(body));
                    res.sendResponse(body);
                }
                next();
            }
        });
    };
};

module.exports = cacheMiddleware;
