import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaWarehouse, FaFileInvoice, FaShoppingCart, FaCashRegister,
  FaChartLine, FaCog, FaBoxOpen, FaBoxes
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>ADMIN</h2>
      </div>

      <ul className="sidebar-menu">
        <li>
          <button onClick={() => toggleMenu('almacen')}>
            <FaWarehouse /> Almacén
          </button>
          {activeMenu === 'almacen' && (
            <ul className="submenu">
              <li><Link to="#">Categoría</Link></li>
              <li><Link to="#">Presentación</Link></li>
              <li><Link to="#">Marca</Link></li>
              <li><Link to="#">Producto</Link></li>
              <li><Link to="#">Perecederos</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('cotizaciones')}>
            <FaFileInvoice /> Cotizaciones
          </button>
          {activeMenu === 'cotizaciones' && (
            <ul className="submenu">
              <li><Link to="#">Generar Cotización</Link></li>
              <li><Link to="#">Ver Cotización</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('compras')}>
            <FaShoppingCart /> Compras
          </button>
          {activeMenu === 'compras' && (
            <ul className="submenu">
              <li><Link to="#">Proveedores</Link></li>
              <li><Link to="#">Realizar Compra</Link></li>
              <li><Link to="#">Consultar por Fecha</Link></li>
              <li><Link to="#">Consultar por Mes</Link></li>
              <li><Link to="#">Historial de Precios</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('caja')}>
            <FaCashRegister /> Caja
          </button>
          {activeMenu === 'caja' && (
            <ul className="submenu">
              <li><Link to="#">Administrar Caja</Link></li>
              <li><Link to="#">Historial Caja</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('ventas')}>
            <FaChartLine /> Ventas
          </button>
          {activeMenu === 'ventas' && (
            <ul className="submenu">
              <li><Link to="#">Clientes</Link></li>
              <li><Link to="#">Realizar Ventas</Link></li>
              <li><Link to="#">Consultar del Día</Link></li>
              <li><Link to="#">Consultar por Fecha</Link></li>
              <li><Link to="#">Consultar por Mes</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('config')}>
            <FaCog /> Configuración
          </button>
          {activeMenu === 'config' && (
            <ul className="submenu">
              <li><Link to="#">Monedas</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('productos')}>
            <FaBoxOpen /> Productos
          </button>
          {activeMenu === 'productos' && (
            <ul className="submenu">
              <li><Link to="#">Apartar Productos</Link></li>
              <li><Link to="#">Apartados del Día</Link></li>
              <li><Link to="#">Apartados por Fecha</Link></li>
              <li><Link to="#">Apartados por Mes</Link></li>
            </ul>
          )}
        </li>

        <li>
          <button onClick={() => toggleMenu('inventario')}>
            <FaBoxes /> Inventario
          </button>
          {activeMenu === 'inventario' && (
            <ul className="submenu">
              <li><Link to="#">Abrir Nuevo Inventario</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
