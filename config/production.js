const config = {
    server: {
        env: 'production',
    },
    logging: {
        level: 'error'
    },
    rateLimit: {
        windowMs: 900000,
        max: 50  // stricter rate limiting in production
    }
};

module.exports = config;