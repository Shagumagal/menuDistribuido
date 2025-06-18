import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'db', // db<-- nombre del servicio del contenedor //localhost
  database: 'menu_db',//menu db --- en entorno local-- transporteDB3
  password: 'admin',
  port: 5432,
});
