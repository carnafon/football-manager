import fs from 'fs';
import path from 'path';
import pool from './db';

export async function initDb() {
  const p = path.resolve(__dirname, '../../scripts/db/init.sql');
  if (!fs.existsSync(p)) {
    console.log('No init SQL found at', p);
    return;
  }
  const sql = fs.readFileSync(p, 'utf8');
  const statements = sql.split(';').map(s => s.trim()).filter(Boolean);
  for (const stmt of statements) {
    try {
      await pool.query(stmt);
    } catch (err) {
      console.error('Error running init statement:', err);
    }
  }
  console.log('Database initialization complete');
}

export default initDb;
