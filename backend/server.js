import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import districtRoutes from './routes/districtRoutes.js';
import compression from 'compression';

dotenv.config();
const app = express();


app.use(compression());

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch {
    res.status(500).json({ status: 'db_error' });
  }
});

app.get('/', (req, res) => {
  res.send('MGNREGA API is Running 🚀');
});

app.use('/api/v1', districtRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
