import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import districtRoutes from './routes/districtRoutes.js';
import compression from 'compression';
import pool from './db.js'; // ✅ ADD THIS LINE
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();

// ✅ Basic performance + security middlewares
app.use(compression());
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

// ✅ Add rate limiting (protects from abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit per IP
});
app.use(limiter);

// ✅ Health check route
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch {
    res.status(500).json({ status: 'db_error' });
  }
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('MGNREGA API is Running 🚀');
});

// ✅ API routes
app.use('/api/v1', districtRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
