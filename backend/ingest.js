import fetch from 'node-fetch';
import pool from './db.js';

// Replace with your API key and resource ID
const API_KEY = process.env.DATA_GOV_API_KEY;
const RESOURCE_ID = 'ee03643a-ee4c-48c2-ac30-9f2ff26ab722';

// Fetch MGNREGA data from data.gov.in API
async function fetchMGNREGAData(stateName) {
  const API_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&filters[state_name]=${encodeURIComponent(stateName)}&limit=10000`;
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Government API error: ${res.statusText}`);
  return res.json();
}


// Upsert a single record into the database
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

(async function main() {
  try {
    const stateName = 'MAHARASHTRA'; // or your chosen state
    const year = 2025;
    const month = 10;

    const data = await fetchMGNREGAData(stateName);
    const records = data.records || [];
    console.log(`Fetched ${records.length} records from API for ${stateName}.`);

    for (const r of records) {
      await upsertRecord({
        district_code: r['district_code'] || r['District Code'],
        district_name: r['district_name'] || r['District Name'],
        year,
        month,
        total_households_worked: parseInt(r['Total_Households_Worked']) || 0,
        total_individuals_worked: parseInt(r['Total_Individuals_Worked']) || 0,
        avg_days_per_household: parseFloat(r['Average_days_of_employment_provided_per_Household']) || 0,
        payments_generated_within_15_days: parseFloat(r['percentage_payments_gererated_within_15_days']) || 0,
        wages: parseFloat(r['Wages']) || 0,
      });
    }

    console.log(`✅ Ingested ${records.length} records successfully.`);
  } catch (err) {
    console.error('❌ Ingestion failed:', err);
  } finally {
    pool.end();
  }
})();

