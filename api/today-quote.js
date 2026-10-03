import pg from 'pg';

const { Pool } = pg;
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export default async function handler(_request, response) {
  if (!pool) {
    return response.status(500).json({ error: 'DATABASE_URL is not configured.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT quote FROM quotes_list WHERE send_date = CURRENT_DATE LIMIT 1',
    );
    return response.status(200).json({ quote: rows[0]?.quote ?? null });
  } catch (error) {
    console.error("Unable to load today's quote:", error.message);
    return response.status(500).json({ error: "Unable to load today's quote." });
  }
}
