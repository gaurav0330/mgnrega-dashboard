# Our Voice, Our Rights - MGNREGA Dashboard

A citizen-facing dashboard for tracking MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) district performance. Built with production-ready architecture for millions of rural Indians.

## 🌟 Features

- **Low-Literacy Friendly UI**: Visual indicators, emojis, and color-coded performance metrics
- **Bilingual Support**: English and Hindi language toggle
- **Auto-Detection**: Automatic district detection using GPS location
- **Historical Trends**: 12-month trend visualization with interactive charts
- **Comparisons**: Month-over-month and year-over-year comparisons
- **Production Ready**: Rate limiting, compression, caching, error handling
- **Responsive Design**: Works on mobile and desktop devices
- **Text-to-Speech**: Audio narration for accessibility

## 🏗️ Architecture

### Backend
- **Node.js + Express**: REST API server
- **PostgreSQL**: Reliable data storage
- **Caching Strategy**: Local database to reduce API dependencies
- **Security**: Helmet, rate limiting, CORS protection
- **Performance**: Gzip compression

### Frontend
- **React + Vite**: Fast development and build
- **Recharts**: Data visualization
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Modern, responsive UI
- **PWA Ready**: Can be deployed as progressive web app

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Data.gov.in API key ([Get it here](https://data.gov.in/))

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Create database
createdb mgnrega_db

# Initialize schema
psql mgnrega_db < db/schema.sql

# Run data ingestion
node ingest.js

# Start server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with backend URL

# Start development server
npm run dev
```

### Production Build

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
# Serve the dist/ folder with your preferred server
```

## 📊 Data Sources

- **Data.gov.in API**: Official MGNREGA monthly statistics
- **Resource ID**: `ee03643a-ee4c-48c2-ac30-9f2ff26ab722`
- **Auto-Update**: Set up cron job to run `node backend/auto-ingest.js` monthly

## 🎯 Design Decisions for Rural India

1. **Visual Over Text**: Large icons and emojis help users understand without reading
2. **Color Coding**: Green/Yellow/Red indicators for quick performance assessment
3. **Large Touch Targets**: Big buttons for easier mobile interaction
4. **Bilingual**: Hindi support for non-English speakers
5. **Voice Narration**: Text-to-speech helps illiterate users
6. **Caching**: Local database ensures app works even when API is down
7. **Offline Capable**: Can be deployed as PWA for offline access

## 🗺️ API Endpoints

- `GET /api/v1/districts` - List all districts
- `GET /api/v1/district/:code/summary` - Latest month data
- `GET /api/v1/district/:code/history?months=12` - Historical trends
- `GET /api/v1/district/:code/comparison` - Compare with previous month
- `GET /health` - Health check

## 🛠️ Technical Highlights

- **Reverse Geocoding**: Uses OpenStreetMap Nominatim API
- **Data Validation**: Clamps payment percentages (0-100%)
- **Error Handling**: Graceful fallbacks for API failures
- **Performance**: Query optimization with proper indexes
- **Scalability**: Designed for high traffic with rate limiting

## 📝 Future Enhancements

- [ ] Add more states beyond Maharashtra
- [ ] Implement district-to-district comparisons
- [ ] Add export functionality (PDF/CSV)
- [ ] Push notifications for updates
- [ ] Offline mode with service workers
- [ ] Social sharing capabilities

## 📄 License

MIT License - Built for public good

## 🙏 Acknowledgments

- Data provided by Ministry of Rural Development, Government of India
- OpenStreetMap for geocoding services

