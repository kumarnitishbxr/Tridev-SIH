const redis =  require('redis');



const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: 18443,
    }
});


module.exports = redisClient

