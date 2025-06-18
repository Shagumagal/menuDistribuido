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

// ✅ US-017 y US-019: Obtener platillos disponibles, con orden asc/desc
router.get('/menu', async (req: Request, res: Response) => {
  const orden = req.query.orden?.toString().toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  try {
    const result = await pool.query(
      `SELECT * FROM menu WHERE disponible = true ORDER BY precio ${orden}`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener menú ordenado:', error);
    res.status(500).json({ error: 'Error al obtener menú ordenado' });
  }
});

// Ruta POST: registrar nuevo platillo (ya tenías esto)
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
router.post('/menu', handleCreateMenu);

// Ruta PUT: actualizar platillo existente (ya la tenías)
const handleUpdateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, imagen, categoria, disponible } = req.body;

    if (!nombre || !descripcion || isNaN(precio)) {
      res.status(400).json({ error: 'Datos inválidos o incompletos.' });
      return;
    }

    const result = await pool.query(
      `UPDATE menu
       SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, categoria = $5, disponible = $6
       WHERE id = $7
       RETURNING *`,
      [nombre, descripcion, precio, imagen || null, categoria || null, disponible, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Platillo no encontrado.' });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar platillo:', err);
    res.status(500).json({ error: 'Error interno al actualizar el platillo.' });
  }
};
router.put('/menu/:id', handleUpdateMenu);

// ✅ US-018: desactivar platillo (marcar como no disponible)
router.put('/menu/:id/desactivar', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE menu SET disponible = false WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Platillo no encontrado para desactivar.' });
      return;
    }

    res.json({ message: 'Platillo desactivado', platillo: result.rows[0] });
  } catch (error) {
    console.error('Error al desactivar platillo:', error);
    res.status(500).json({ error: 'Error interno al desactivar el platillo.' });
  }
});

export default router;
