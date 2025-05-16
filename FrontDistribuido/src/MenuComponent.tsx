import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './menustyles.css';

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  categoria?: string;
  disponible: boolean;
}

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get<MenuItem[]>('http://localhost:3000/api/menu')
      .then(res => {
        console.log('✅ Menú recibido:', res.data);
        setMenuItems(res.data);
        setFilteredItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar el menú:', err);
        setError('No se pudo cargar el menú.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = menuItems.filter(item => {
      const matchName = item.nombre.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category ? item.categoria === category : true;
      return matchName && matchCategory;
    });
    setFilteredItems(filtered);
  }, [search, category, menuItems]);

  const categories = Array.from(new Set(menuItems.map(item => item.categoria).filter(Boolean)));

  return (
    <div className="container">
      <h1 className="title">Menú</h1>

      {loading && <p>Cargando menú...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="select"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat!}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid">
            {filteredItems.length === 0 ? (
              <p>No hay platillos disponibles.</p>
            ) : (
              filteredItems.map(item => (
                <div key={item.id} className="card">
                  <h2>{item.nombre}</h2>
                  <p>{item.descripcion}</p>
                  <p>
                    <strong>${Number(item.precio).toFixed(2)}</strong>
                  </p>
                  {item.imagen && <img src={item.imagen} alt={item.nombre} />}
                  <p>{item.disponible ? 'Disponible' : 'No disponible'}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuComponent;
