const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { validationResult, query } = require('express-validator');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API endpoints configuration
const API_CONFIG = {
    weather: {
        url: 'https://api.weatherapi.com/v1/current.json',
        apiKey: process.env.WEATHER_API_KEY
    },
    exchange: {
        url: 'https://api.exchangerate-api.com/v4/latest',
        apiKey: process.env.EXCHANGE_API_KEY
    }
};

// Validation middleware
const validateWeatherParams = [
    query('city').notEmpty().withMessage('City parameter is required'),
];

const validateExchangeParams = [
    query('base').notEmpty().withMessage('Base currency is required'),
    query('target').notEmpty().withMessage('Target currency is required'),
];

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: err.message
    });
};

// Weather API integration
async function getWeatherData(city) {
    try {
        const response = await axios.get(API_CONFIG.weather.url, {
            params: {
                key: API_CONFIG.weather.apiKey,
                q: city
            }
        });
        
        return {
            location: response.data.location.name,
            country: response.data.location.country,
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
            humidity: response.data.current.humidity,
            windSpeed: response.data.current.wind_kph
        };
    } catch (error) {
        throw new Error(`Weather API error: ${error.message}`);
    }
}

// Exchange rate API integration
async function getExchangeRate(base, target) {
    try {
        const response = await axios.get(`${API_CONFIG.exchange.url}/${base}`);
        const rate = response.data.rates[target];
        
        if (!rate) {
            throw new Error('Invalid currency code');
        }
        
        return {
            base,
            target,
            rate,
            timestamp: response.data.date
        };
    } catch (error) {
        throw new Error(`Exchange API error: ${error.message}`);
    }
}

// Routes
app.get('/api/weather', validateWeatherParams, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const weatherData = await getWeatherData(req.query.city);
        res.json({
            status: 'success',
            data: weatherData
        });
    } catch (error) {
        next(error);
    }
});

app.get('/api/exchange', validateExchangeParams, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const exchangeData = await getExchangeRate(req.query.base, req.query.target);
        res.json({
            status: 'success',
            data: exchangeData
        });
    } catch (error) {
        next(error);
    }
});

// Combined endpoint
app.get('/api/combined', async (req, res, next) => {
    try {
        const { city, base, target } = req.query;
        const [weatherData, exchangeData] = await Promise.all([
            getWeatherData(city),
            getExchangeRate(base, target)
        ]);

        res.json({
            status: 'success',
            data: {
                weather: weatherData,
                exchange: exchangeData
            }
        });
    } catch (error) {
        next(error);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'Service is healthy',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;