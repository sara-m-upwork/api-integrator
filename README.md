# API Integration Tool

A Node.js-based API integration service that combines weather and exchange rate data into a unified API interface.

## 🌟 Features

- **Weather API Integration**
  - Current weather conditions
  - Temperature and humidity
  - Wind speed and direction

- **Exchange Rate API Integration**
  - Real-time currency conversion
  - Support for multiple currencies
  - Historical exchange rates

- **Unified API Interface**
  - Combined data endpoints
  - Consistent response format
  - Error handling

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/api-integrator.git
cd api-integrator
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### GET /api/weather
Get current weather information.

```bash
GET /api/weather?city=seoul

Response:
{
  "status": "success",
  "data": {
    "location": "Seoul",
    "temperature": 20,
    "condition": "Clear",
    "humidity": 65
  }
}
```

### GET /api/exchange
Get currency exchange rates.

```bash
GET /api/exchange?base=USD&target=KRW

Response:
{
  "status": "success",
  "data": {
    "base": "USD",
    "target": "KRW",
    "rate": 1320.45,
    "timestamp": "2024-01-12T09:00:00Z"
  }
}
```

### GET /api/combined
Get both weather and exchange rate data.

```bash
GET /api/combined?city=seoul&base=USD&target=KRW

Response:
{
  "status": "success",
  "data": {
    "weather": {
      "location": "Seoul",
      "temperature": 20
    },
    "exchange": {
      "base": "USD",
      "target": "KRW",
      "rate": 1320.45
    }
  }
}
```

## ⚙️ Configuration

Key environment variables:

```env
PORT=3000
WEATHER_API_KEY=your_key_here
EXCHANGE_API_KEY=your_key_here
```

## 🔒 Security

- Rate limiting enabled
- CORS protection
- Helmet security headers
- Input validation
- Error handling

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📦 Dependencies

- Express.js
- Axios
- Winston
- Express Validator
- Express Rate Limit

## 🛠️ Development

```bash
# Run in development mode
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

## 📝 License

MIT License 