const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const host = process.env.PGHOST || process.env.DB_HOST || 'localhost';
const port = process.env.PGPORT || process.env.DB_PORT || 5432;
const user = process.env.PGUSER || process.env.DB_USER || 'postgres';
const password = process.env.PGPASSWORD || process.env.DB_PASSWORD || process.env.PASSWORD || 'postgres';
const dbName = process.env.DB_NAME || process.env.DATABASE_NAME || process.env.DB || process.env.DATABASE || 'football_manager';
const adminDb = process.env.ADMIN_DB || 'postgres';

async function run() {
  const adminClient = new Client({ host, port, user, password, database: adminDb });
  try {
    console.log('Conectando a Postgres en', `${host}:${port}`);
    await adminClient.connect();
    const res = await adminClient.query('SELECT 1 FROM pg_database WHERE datname=$1', [dbName]);
    if (res.rowCount === 0) {
      console.log('Base de datos no encontrada, creando', dbName);
      await adminClient.query(`CREATE DATABASE \"${dbName}\"`);
    } else {
      console.log('Base de datos ya existe:', dbName);
    }
    await adminClient.end();

    // Ejecutar script init.sql
    const sqlPath = path.resolve(__dirname, '../../scripts/db/init.sql');
    if (!fs.existsSync(sqlPath)) {
      console.error('No se encontró', sqlPath);
      process.exit(1);
    }
    const sql = fs.readFileSync(sqlPath, 'utf8');

    const dbClient = new Client({ host, port, user, password, database: dbName });
    await dbClient.connect();
    console.log('Ejecutando init SQL...');
    await dbClient.query(sql);
    await dbClient.end();
    console.log('Inicialización completa.');
  } catch (err) {
    console.error('Error creando DB o ejecutando SQL:', err.message || err);
    process.exit(1);
  }
}

run();
