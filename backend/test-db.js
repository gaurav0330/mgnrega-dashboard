import pool from './db.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connected successfully!', res.rows[0]);
  } catch (err) {
    console.error('Connection failed:', err);
  } finally {
    pool.end();
  }
})();
