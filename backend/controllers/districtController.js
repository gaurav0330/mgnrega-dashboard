import pool from '../db.js';

export async function getDistricts(req, res) {
  try {
    const result = await pool.query(
      'SELECT DISTINCT district_code, district_name FROM mgnrega_monthly ORDER BY district_name ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getDistrictSummary(req, res) {
  const { code } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
          district_code,
          district_name,
          year,
          month,
          total_individuals_worked AS people_got_work,
          avg_days_per_household,
          (100 - payments_generated_within_15_days) AS payments_delayed_percent
       FROM mgnrega_monthly
       WHERE district_code = $1
       ORDER BY year DESC, month DESC
       LIMIT 1`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'District not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
