import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'transporteDB3',
  password: '',
  port: 5432,
});
