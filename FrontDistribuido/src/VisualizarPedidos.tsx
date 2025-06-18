import React, { useEffect, useState } from 'react';

interface Platillo {
  nombre: string;
  cantidad: number;
}

interface Pedido {
  id: number;
  cliente: string;
  estado: string;
  platillos: Platillo[];
}

const VisualizarPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetch('/api/pedidos/')
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => {
        console.error('Error al cargar pedidos:', err);
        setMensaje('❌ Error al cargar pedidos');
      });
  }, []);

  const actualizarEstado = async (id: number, nuevoEstado: string) => {
    try {
      const res = await fetch(`/api/pedidos/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (res.ok) {
        setPedidos(prev =>
          prev.map(p =>
            p.id === id ? { ...p, estado: nuevoEstado } : p
          )
        );
        setMensaje('✅ Estado actualizado');
      } else {
        setMensaje('❌ No se pudo actualizar el estado');
      }
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error de red');
    }
  };

  return (
    <div className="form">
      <h2 className="title">📋 Pedidos realizados</h2>
      {mensaje && <p>{mensaje}</p>}
      {pedidos.map(pedido => (
        <div key={pedido.id} className="card">
          <p><strong>Cliente:</strong> {pedido.cliente}</p>
          <p><strong>Estado:</strong> 
            <select
              value={pedido.estado}
              onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="pendiente">Pendiente</option>
              <option value="preparacion">En preparación</option>
              <option value="listo">Listo</option>
            </select>
          </p>
          <ul>
            {pedido.platillos.map((plat, i) => (
              <li key={i}>{plat.nombre} × {plat.cantidad}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default VisualizarPedidos;

