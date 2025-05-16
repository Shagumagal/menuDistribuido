import express from 'express';
import { pool } from './db';

const router = express.Router();

router.get('/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu WHERE disponible = true');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener menú:', error);
    res.status(500).json({ error: 'Error al obtener menú' });
  }
});

export default router;

