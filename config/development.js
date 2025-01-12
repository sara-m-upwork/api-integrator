const config = {
    server: {
        env: 'development',
    },
    logging: {
        level: 'debug'
    },
    rateLimit: {
        windowMs: 900000,
        max: 1000  // more lenient rate limiting in development
    }
};

module.exports = config;