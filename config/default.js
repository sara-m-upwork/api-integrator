const config = {
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    api: {
        weather: {
            baseUrl: 'https://api.weatherapi.com/v1',
            apiKey: process.env.WEATHER_API_KEY,
            timeout: 5000
        },
        exchange: {
            baseUrl: 'https://api.exchangerate-api.com/v4',
            apiKey: process.env.EXCHANGE_API_KEY,
            timeout: 5000
        }
    },
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 900000,
        max: parseInt(process.env.RATE_LIMIT_MAX) || 100
    },
    cors: {
        origins: process.env.ALLOWED_ORIGINS.split(','),
        methods: ['GET', 'POST', 'OPTIONS'],
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        format: 'combined'
    }
};

module.exports = config;