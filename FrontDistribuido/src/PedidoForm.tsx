import React, { useEffect, useState } from 'react';
import './menustyles.css';

interface Platillo {
  id: number;
  nombre: string;
  precio: number;
}

interface Cliente {
  id: number;
  nombre: string;
}

const PedidoForm: React.FC = () => {
  const [clienteId, setClienteId] = useState(0);
  const [platillosDisponibles, setPlatillosDisponibles] = useState<Platillo[]>([]);
  const [platillosPedido, setPlatillosPedido] = useState([{ id: 0, cantidad: 1 }]);
  const [mensaje, setMensaje] = useState('');

  const clientesFicticios: Cliente[] = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'Ana López' },
    { id: 3, nombre: 'Carlos Gómez' }
  ];

  const API_MENU_URL =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:3000/api/menu'
      : '/api/menu';

  const API_PEDIDOS_URL =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:8000/api/pedidos/'
      : '/api/pedidos/';

  useEffect(() => {
    fetch(API_MENU_URL)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlatillosDisponibles(data);
        } else if (Array.isArray(data.menu)) {
          setPlatillosDisponibles(data.menu);
        } else {
          console.error('Respuesta inesperada del backend:', data);
        }
      })
      .catch(err => console.error('Error al cargar menú:', err));
  }, []);

  const agregarPlatillo = () => {
    setPlatillosPedido([...platillosPedido, { id: 0, cantidad: 1 }]);
  };

  const actualizarPlatillo = (index: number, campo: string, valor: any) => {
    const nuevos = [...platillosPedido];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setPlatillosPedido(nuevos);
  };

  const enviarPedido = async () => {
    const clienteSeleccionado = clientesFicticios.find(c => c.id === clienteId);
    if (!clienteSeleccionado) {
      setMensaje('❌ Debes seleccionar un cliente');
      return;
    }

    const pedido = {
      cliente: clienteSeleccionado.nombre,
      platillos: platillosPedido.map(p => {
        const platillo = platillosDisponibles.find(pd => pd.id === Number(p.id));
        return {
          nombre: platillo?.nombre || '',
          cantidad: p.cantidad
        };
      }),
      estado: 'pendiente'
    };

    try {
      const res = await fetch(API_PEDIDOS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });

      if (res.ok) {
        setMensaje('✅ Pedido enviado correctamente');
        setClienteId(0);
        setPlatillosPedido([{ id: 0, cantidad: 1 }]);
      } else {
        setMensaje('❌ Error al enviar el pedido');
      }
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error de red');
    }
  };

  return (
    <div className="form">
      <h2 className="title">Realizar Pedido</h2>

      <select
        className="select"
        value={clienteId}
        onChange={(e) => setClienteId(Number(e.target.value))}
      >
        <option value={0}>-- Seleccionar cliente --</option>
        {clientesFicticios.map(c => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>

      {platillosPedido.map((p, i) => (
        <div key={i} className="checkbox">
          <select
            className="select"
            value={p.id}
            onChange={(e) => actualizarPlatillo(i, 'id', Number(e.target.value))}
          >
            <option value={0}>-- Seleccionar platillo --</option>
            {platillosDisponibles.map(plat => (
              <option key={plat.id} value={plat.id}>{plat.nombre}</option>
            ))}
          </select>
          <input
            className="input"
            type="number"
            min={1}
            value={p.cantidad}
            onChange={(e) => actualizarPlatillo(i, 'cantidad', Number(e.target.value))}
          />
        </div>
      ))}

      <button className="button" onClick={agregarPlatillo}>➕ Agregar platillo</button>
      <button className="button" onClick={enviarPedido}>✅ Enviar pedido</button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PedidoForm;
