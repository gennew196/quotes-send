import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT) || 3001;
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

app.get('/api/today-quote', async (_request, response) => {
  if (!pool) {
    return response.status(500).json({ error: 'DATABASE_URL is not configured.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT quote FROM quotes_list WHERE send_date = CURRENT_DATE LIMIT 1',
    );
    return response.json({ quote: rows[0]?.quote ?? null });
  } catch (error) {
    console.error('Unable to load today\'s quote:', error.message);
    return response.status(500).json({ error: 'Unable to load today\'s quote.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const buildDirectory = path.join(projectDirectory, 'dist');
  app.use(express.static(buildDirectory));
  app.get('*', (_request, response) => {
    response.sendFile(path.join(buildDirectory, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Quotes server listening on http://localhost:${port}`);
});