import express from 'express';
import cors from 'cors';
import menuRoutes from './menuroutes';
import { inicializarBaseDeDatos } from './init-db';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', menuRoutes);

// Ejecutar creación de tabla
inicializarBaseDeDatos();

app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
