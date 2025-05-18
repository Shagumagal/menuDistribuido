import express, { Request, Response } from 'express';
import { pool } from './db';

const router = express.Router();

// Definimos la estructura del cuerpo que esperamos en POST
interface MenuBody {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  categoria?: string;
  disponible: boolean;
}

// Ruta GET: obtener todos los platillos disponibles
router.get('/menu', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM menu WHERE disponible = true');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener menú:', error);
    res.status(500).json({ error: 'Error al obtener menú' });
  }
});

// Handler separado para evitar errores de tipado en TypeScript
const handleCreateMenu = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, precio, imagen, categoria, disponible } = req.body;

    if (!nombre || !descripcion || isNaN(precio)) {
      res.status(400).json({ error: 'Datos inválidos o incompletos.' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO menu (nombre, descripcion, precio, imagen, categoria, disponible)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, descripcion, precio, imagen || null, categoria || null, disponible]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar platillo:', err);
    res.status(500).json({ error: 'Error interno al registrar el platillo.' });
  }
};

// Ruta POST: registrar nuevo platillo
router.post('/menu', handleCreateMenu);

export default router;
