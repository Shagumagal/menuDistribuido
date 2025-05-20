import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  categoria?: string;
  disponible: boolean;
}

interface Props {
  onSuccess: () => void;
  item?: MenuItem;
}

const MenuForm: React.FC<Props> = ({ onSuccess, item }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('');
  const [disponible, setDisponible] = useState(true);
  const [errores, setErrores] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (item) {
      setNombre(item.nombre);
      setDescripcion(item.descripcion);
      setPrecio(item.precio.toString());
      setImagen(item.imagen || '');
      setCategoria(item.categoria || '');
      setDisponible(item.disponible);
    }
  }, [item]);

  const validar = (): boolean => {
    const errs: string[] = [];
    if (nombre.trim().length < 3) errs.push('El nombre debe tener al menos 3 caracteres.');
    if (descripcion.trim().length < 5) errs.push('La descripción debe tener al menos 5 caracteres.');
    if (isNaN(Number(precio)) || Number(precio) <= 0) errs.push('El precio debe ser un número mayor a 0.');
    if (!categoria) errs.push('Debes seleccionar una categoría.');
    setErrores(errs);
    return errs.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    const data = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen,
      categoria,
      disponible,
    };

    try {
      if (item) {
        await axios.put(`http://localhost:3000/api/menu/${item.id}`, data);
        setMensaje('✅ Platillo actualizado.');
      } else {
        await axios.post('http://localhost:3000/api/menu', data);
        setMensaje('✅ Platillo registrado.');
      }
      onSuccess();
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      setMensaje('❌ Hubo un error al guardar el platillo.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">{item ? 'Editar platillo' : 'Registrar Platillo'}</h2>
      {mensaje && <p>{mensaje}</p>}
      {errores.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errores.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="form">
        <input className="input" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
        <textarea className="input" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" required />
        <input className="input" type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio" required />
        <input className="input" value={imagen} onChange={e => setImagen(e.target.value)} placeholder="URL de imagen (opcional)" />
        <select className="input" value={categoria} onChange={e => setCategoria(e.target.value)} required>
          <option value="">Selecciona una categoría</option>
          <option value="comida">Comida</option>
          <option value="bebida">Bebida</option>
          <option value="postre">Postre</option>
        </select>
        <label className="checkbox">
          <input type="checkbox" checked={disponible} onChange={e => setDisponible(e.target.checked)} />
          Disponible
        </label>
        <button type="submit" className="button">{item ? 'Actualizar' : 'Registrar'}</button>
      </form>
    </div>
  );
};

export default MenuForm;
