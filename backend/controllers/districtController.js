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
          -- clamp payments to 0-100
          CASE 
            WHEN payments_generated_within_15_days < 0 THEN 0
            WHEN payments_generated_within_15_days > 100 THEN 100
            ELSE payments_generated_within_15_days
          END AS payments_within_15_days
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

export async function getDistrictHistory(req, res) {
  const { code } = req.params;
  const { months = '12' } = req.query;

  try {
    const result = await pool.query(
      `SELECT 
          year,
          month,
          total_individuals_worked AS people_got_work,
          avg_days_per_household,
          CASE 
            WHEN payments_generated_within_15_days < 0 THEN 0
            WHEN payments_generated_within_15_days > 100 THEN 100
            ELSE payments_generated_within_15_days
          END AS payments_within_15_days
       FROM mgnrega_monthly
       WHERE district_code = $1
       ORDER BY year DESC, month DESC
       LIMIT $2`,
      [code, months]
    );

    res.json({
      district_code: code,
      records: result.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function getDistrictComparison(req, res) {
  const { code } = req.params;

  try {
    // Get current month
    const current = await pool.query(
      `SELECT 
          year,
          month,
          total_individuals_worked AS people_got_work,
          avg_days_per_household,
          payments_generated_within_15_days AS payments_within_15_days
       FROM mgnrega_monthly
       WHERE district_code = $1
       ORDER BY year DESC, month DESC
       LIMIT 1`,
      [code]
    );

    // Get previous month
    const previous = await pool.query(
      `SELECT 
          year,
          month,
          total_individuals_worked AS people_got_work,
          avg_days_per_household,
          payments_generated_within_15_days AS payments_within_15_days
       FROM mgnrega_monthly
       WHERE district_code = $1
       AND NOT (year = $2 AND month = $3)
       ORDER BY year DESC, month DESC
       LIMIT 1`,
      [code, 
       current.rows[0]?.year || 0, 
       current.rows[0]?.month || 0]
    );

    // Get same month last year
    const lastYear = await pool.query(
      `SELECT 
          year,
          month,
          total_individuals_worked AS people_got_work,
          avg_days_per_household,
          payments_generated_within_15_days AS payments_within_15_days
       FROM mgnrega_monthly
       WHERE district_code = $1
       AND year = $2 - 1
       AND month = $3
       LIMIT 1`,
      [code,
       current.rows[0]?.year || 0,
       current.rows[0]?.month || 0]
    );

    res.json({
      current: current.rows[0] || null,
      previous: previous.rows[0] || null,
      lastYear: lastYear.rows[0] || null
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
