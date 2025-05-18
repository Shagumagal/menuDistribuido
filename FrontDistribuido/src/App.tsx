import React, { useState } from 'react';
import { UtensilsCrossed, Plus } from 'lucide-react';
import MenuComponent from './MenuComponent';
import MenuForm from './MenuForm';
import './menustyles.css';

const App: React.FC = () => {
  const [vista, setVista] = useState<'menu' | 'registro'>('menu');

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="logo">🍳 Cocina</h2>
        <nav>
          <button className={`nav-button ${vista === 'menu' ? 'active' : ''}`} onClick={() => setVista('menu')}>
            <UtensilsCrossed size={18} /> Menú
          </button>
          <button className={`nav-button ${vista === 'registro' ? 'active' : ''}`} onClick={() => setVista('registro')}>
            <Plus size={18} /> Registrar platillo
          </button>
        </nav>
      </aside>
      <main className="content">
        {vista === 'menu' && <MenuComponent />}
        {vista === 'registro' && <MenuForm onSuccess={() => setVista('menu')} />}

      </main>
    </div>
  );
};

export default App;
