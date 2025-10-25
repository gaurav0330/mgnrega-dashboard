CREATE TABLE IF NOT EXISTS mgnrega_monthly (
  district_code VARCHAR(10),
  district_name VARCHAR(100),
  year INT,
  month INT,
  total_households_worked INT,
  total_individuals_worked INT,
  avg_days_per_household FLOAT,
  payments_generated_within_15_days FLOAT,
  wages FLOAT,
  PRIMARY KEY (district_code, year, month)
);
