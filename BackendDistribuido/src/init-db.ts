import { pool } from './db';

export const inicializarBaseDeDatos = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS menu (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        precio NUMERIC(10, 2) NOT NULL,
        imagen TEXT,
        categoria TEXT,
        disponible BOOLEAN DEFAULT true
      );
    `);
    console.log('✅ Tabla "menu" verificada o creada');
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error);
  }
};
