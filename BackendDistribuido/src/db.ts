import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'db', // <-- nombre del servicio del contenedor
  database: 'menu_db',
  password: 'admin',
  port: 5432,
});
