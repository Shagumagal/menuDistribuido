import React, { useState } from 'react';
import { UtensilsCrossed, Plus, ClipboardList, Eye } from 'lucide-react';
import MenuComponent from './MenuComponent';
import MenuForm from './MenuForm';
import PedidoForm from './PedidoForm';
import VisualizarPedidos from './VisualizarPedidos';
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

const App: React.FC = () => {
  const [vista, setVista] = useState<'menu' | 'registro' | 'editar' | 'pedido' | 'verpedidos'>('menu');
  const [editItem, setEditItem] = useState<MenuItem | null>(null);

  const handleEdit = (item: MenuItem) => {
    setEditItem(item);
    setVista('editar');
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="logo">🍳 Cocina</h2>
        <nav>
          <button
            className={`nav-button ${vista === 'menu' ? 'active' : ''}`}
            onClick={() => {
              setVista('menu');
              setEditItem(null);
            }}
          >
            <UtensilsCrossed size={18} /> Menú
          </button>
          <button
            className={`nav-button ${vista === 'registro' ? 'active' : ''}`}
            onClick={() => {
              setVista('registro');
              setEditItem(null);
            }}
          >
            <Plus size={18} /> Registrar platillo
          </button>
          <button
            className={`nav-button ${vista === 'pedido' ? 'active' : ''}`}
            onClick={() => setVista('pedido')}
          >
            <ClipboardList size={18} /> Pedido
          </button>
          <button
            className={`nav-button ${vista === 'verpedidos' ? 'active' : ''}`}
            onClick={() => setVista('verpedidos')}
          >
            <Eye size={18} /> Visualizar pedidos
          </button>
        </nav>
      </aside>

      <main className="content">
        {vista === 'menu' && <MenuComponent onEdit={handleEdit} />}
        {vista === 'registro' && <MenuForm onSuccess={() => setVista('menu')} />}
        {vista === 'editar' && editItem && (
          <MenuForm item={editItem} onSuccess={() => {
            setEditItem(null);
            setVista('menu');
          }} />
        )}
        {vista === 'pedido' && <PedidoForm />}
        {vista === 'verpedidos' && <VisualizarPedidos />}
      </main>
    </div>
  );
};

export default App;
