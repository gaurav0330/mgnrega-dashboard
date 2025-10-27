# Setup Guide - MGNREGA Dashboard

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
# On Windows PowerShell:
copy .env.example .env
# On Linux/Mac:
# cp .env.example .env

# Edit .env file with your credentials:
# - PostgreSQL connection details
# - Data.gov.in API key
# - State name (e.g., MAHARASHTRA)

# Create database
createdb mgnrega_db

# Initialize schema
psql mgnrega_db < db/schema.sql

# Ingest initial data
node ingest.js

# Start server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
# On Windows PowerShell:
copy .env.example .env
# On Linux/Mac:
# cp .env.example .env

# Edit .env file:
# VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

## Getting Data.gov.in API Key

1. Visit https://data.gov.in/
2. Sign up for an account
3. Navigate to "My Account" → "API Key"
4. Copy your API key
5. Add it to backend/.env file

## Database Setup

### PostgreSQL Installation
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **Linux**: `sudo apt-get install postgresql`
- **Mac**: `brew install postgresql`

### Create Database
```bash
createdb mgnrega_db
```

### Initialize Schema
```bash
psql mgnrega_db < db/schema.sql
```

## Running in Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ folder with nginx, Apache, or any static file server
```

### Auto Data Ingestion
Run the scheduler to automatically fetch new data monthly:
```bash
cd backend
npm run scheduler
```

## Environment Variables

### Backend (.env)
```
PGUSER=postgres
PGHOST=localhost
PGDATABASE=mgnrega_db
PGPASSWORD=your_password
PGPORT=5432
DATA_GOV_API_KEY=your_api_key
STATE_NAME=MAHARASHTRA
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l`

### API Key Issues
- Verify API key at https://data.gov.in/
- Check API key is correctly set in `.env`
- Some APIs may have rate limits

### Frontend Not Connecting
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Ensure CORS is enabled in backend

## Next Steps

1. Ingest data for your state
2. Test the application locally
3. Deploy to your server
4. Set up automated data ingestion
5. Configure production environment

For detailed architecture and features, see README.md

