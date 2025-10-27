import fetch from 'node-fetch';
import pool from './db.js';

const API_KEY = process.env.DATA_GOV_API_KEY;
const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';

async function fetchMGNREGAData(stateName, year, month) {
  const API_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&filters[state_name]=${encodeURIComponent(stateName)}&limit=10000`;
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Government API error: ${res.statusText}`);
  return res.json();
}

async function upsertRecord(row) {
  const query = `
    INSERT INTO mgnrega_monthly
      (district_code, district_name, year, month, total_households_worked, total_individuals_worked,
       avg_days_per_household, payments_generated_within_15_days, wages)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (district_code, year, month) DO UPDATE SET
      total_households_worked = EXCLUDED.total_households_worked,
      total_individuals_worked = EXCLUDED.total_individuals_worked,
      avg_days_per_household = EXCLUDED.avg_days_per_household,
      payments_generated_within_15_days = EXCLUDED.payments_generated_within_15_days,
      wages = EXCLUDED.wages;
  `;
  const values = [
    row.district_code,
    row.district_name,
    row.year,
    row.month,
    row.total_households_worked,
    row.total_individuals_worked,
    row.avg_days_per_household,
    row.payments_generated_within_15_days,
    row.wages,
  ];
  await pool.query(query, values);
}

async function ingestDataForMonth(stateName, year, month) {
  try {
    console.log(`Fetching data for ${stateName} (${month}/${year})...`);
    const data = await fetchMGNREGAData(stateName, year, month);
    const records = data.records || [];
    console.log(`Fetched ${records.length} records from API.`);

    for (const [i, r] of records.entries()) {
      const totalHouseholds = parseInt(r['Total_Households_Worked']) || 0;
      const totalIndividuals = parseInt(r['Total_Individuals_Worked']) || 0;
      const avgDays = parseFloat(r['Average_days_of_employment_provided_per_Household']) || 0;

      let payments =
        parseFloat(r['percentage_payments_generated_within_15_days'] ?? 
                   r['percentage_payments_gererated_within_15_days']) || 0;
      payments = Math.max(0, Math.min(100, payments));

      const wages = parseFloat(r['Wages']) || 0;

      await upsertRecord({
        district_code: r['district_code'] || r['District Code'],
        district_name: r['district_name'] || r['District Name'],
        year,
        month,
        total_households_worked: totalHouseholds,
        total_individuals_worked: totalIndividuals,
        avg_days_per_household: avgDays,
        payments_generated_within_15_days: payments,
        wages,
      });

      if (i % 100 === 0) console.log(`Inserted/Updated ${i} records...`);
    }

    console.log(`✅ Ingested ${records.length} records successfully for ${month}/${year}.`);
    return records.length;
  } catch (err) {
    console.error(`❌ Ingestion failed for ${month}/${year}:`, err);
    throw err;
  }
}

async function main() {
  const stateName = process.env.STATE_NAME || 'MAHARASHTRA';
  const year = parseInt(process.env.YEAR) || 2025;
  const month = parseInt(process.env.MONTH) || 10;

  try {
    await ingestDataForMonth(stateName, year, month);
  } catch (err) {
    console.error('Main ingestion failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Allow running as cron job
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { ingestDataForMonth };

