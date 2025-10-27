# Quick Start Guide - MGNREGA Dashboard

## ⚡ Get Running in 5 Minutes

### Step 1: Backend Setup (2 minutes)

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit with your PostgreSQL credentials and API key

# Create database (if not exists)
createdb mgnrega_db

# Initialize schema
psql mgnrega_db < db/schema.sql

# Ingest data
node ingest.js

# Start server
npm run dev
```

Backend will run on `http://localhost:5000` ✅

### Step 2: Frontend Setup (2 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
# Add: VITE_API_URL=http://localhost:5000

# Start dev server
npm run dev
```

Frontend will run on `http://localhost:5173` ✅

### Step 3: Access Dashboard

Open browser to: `http://localhost:5173`

## 🎯 Features to Test

1. **Search District**: Type your district name
2. **Auto-Detect**: Click "Use my location" button
3. **Overview Tab**: See current month performance
4. **Trends Tab**: View 12-month chart
5. **Compare Tab**: See month-over-month changes
6. **Language**: Toggle English ↔ Hindi
7. **Voice**: Click speaker icon to hear values

## 📝 Environment Variables Needed

### Backend (.env)
```env
PGUSER=postgres
PGHOST=localhost
PGDATABASE=mgnrega_db
PGPASSWORD=your_password
PGPORT=5432
DATA_GOV_API_KEY=your_api_key_here
STATE_NAME=MAHARASHTRA
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🔑 Get Data.gov.in API Key

1. Go to: https://data.gov.in/
2. Sign up / Login
3. Go to: My Account → API Key
4. Copy your API key
5. Paste in backend/.env file

## 🗄️ PostgreSQL Setup

### Install PostgreSQL
- **Windows**: https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt install postgresql`

### Create Database
```bash
createdb mgnrega_db
```

### Verify Connection
```bash
psql mgnrega_db
# Type: SELECT 1;
# Type: \q to exit
```

## 🧪 Test the Application

### Test API Endpoints
```bash
# List districts
curl http://localhost:5000/api/v1/districts

# Get district summary
curl http://localhost:5000/api/v1/district/001/summary

# Get history
curl http://localhost:5000/api/v1/district/001/history?months=12

# Get comparison
curl http://localhost:5000/api/v1/district/001/comparison

# Health check
curl http://localhost:5000/health
```

### Test Frontend
1. Open browser to `http://localhost:5173`
2. Search for a district (e.g., "Mumbai")
3. Click on district from dropdown
4. Try all three tabs
5. Toggle language
6. Click speaker icons

## 🚨 Troubleshooting

### "Database connection failed"
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l`

### "API key invalid"
- Get key from https://data.gov.in/
- Add to `.env` file
- Restart backend server

### "Cannot find module"
- Run `npm install` in backend/
- Run `npm install` in frontend/

### "Districts not loading"
- Check backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Open browser console for errors

## 📦 What's Included

```
mgnrega-dashboard/
├── backend/
│   ├── controllers/     # API logic
│   ├── routes/         # Route definitions
│   ├── db/             # Database schema
│   ├── server.js       # Main server
│   ├── ingest.js       # Data ingestion
│   ├── auto-ingest.js  # Auto data fetch
│   └── scheduler.js    # Monthly updates
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DistrictSelector.jsx
│   │   │   ├── SummaryTiles.jsx
│   │   │   ├── TrendChart.jsx
│   │   │   └── ComparisonCard.jsx
│   │   ├── App.jsx     # Main app
│   │   └── main.jsx     # Entry point
│   └── package.json
└── README.md            # Full documentation
```

## 🎨 Key Features

✨ **Visual Indicators**: See performance at a glance with colors and emojis
📊 **Historical Trends**: 12-month interactive charts
📈 **Comparisons**: Month-over-month changes
📍 **Auto-Detection**: Detect district from GPS location
🌐 **Bilingual**: English and Hindi support
🔊 **Voice Narration**: Text-to-speech for accessibility
📱 **Mobile Friendly**: Works on all devices

## 🚀 Ready for Production

Check `README.md` and `DELIVERY_SUMMARY.md` for:
- Architecture details
- Deployment guide
- Security features
- Performance optimization
- Scaling strategy

**Happy coding! 🎉**

