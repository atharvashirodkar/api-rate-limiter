const redis = require('../redis/redisClient');

const MAX = parseInt(process.env.RATE_LIMIT_MAX) || 10;
const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS) / 1000 || 60;

async function fixedWindowMiddleware(req, res, next) {
    
    const key = `fw:${req.ip}`;
    const count = await redis.incr(key);

    if (count === 1) {
        // First request in this window — set the expiry
        await redis.expire(key, WINDOW);
    }

    res.setHeader('X-RateLimit-Limit', MAX);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, MAX - count));

    if (count > MAX) {
        return res.status(429).json({
            error: 'Too Many Requests',
            retryAfter: await redis.ttl(key),
        });
    }

    next();
}

module.exports = fixedWindowMiddleware;
