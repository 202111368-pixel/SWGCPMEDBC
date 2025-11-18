import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaWarehouse, FaFileInvoice, FaShoppingCart, FaCashRegister,
  FaChartLine, FaCog, FaBoxOpen, FaBoxes
} from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setEmail(parsed.email || "correo@no-encontrado.com");  {/* CORREGIR EL CORREO QUE DEJE INGRESA DESDE LOGIN 
                                                              CON EL CORREO O CON EL CORREO DE LA URP */}
    }
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {/* AQUÍ MUESTRA EL CORREO */}
        <h2>{email}</h2>
      </div>

      <ul className="sidebar-menu">

        {/* ALMACÉN */}
        <li>
          <button onClick={() => toggleMenu('almacen')}>
            <FaWarehouse /> Almacén
          </button>
          {activeMenu === 'almacen' && (
            <ul className="submenu">
              <li><Link to="/admin/Almacen/categoria">Categoría</Link></li>
              <li><Link to="/admin/almacen/marca">Marca</Link></li>
              <li><Link to="/admin/almacen/producto">Producto</Link></li>
            </ul>
          )}
        </li>

        {/* COTIZACIONES */}
        <li>
          <button onClick={() => toggleMenu('cotizaciones')}>
            <FaFileInvoice /> Cotizaciones
          </button>
          {activeMenu === 'cotizaciones' && (
            <ul className="submenu">
              <li><Link to="/admin/cotizaciones/generar">Generar Cotización</Link></li>
              <li><Link to="/admin/cotizaciones/ver">Ver Cotización</Link></li>
            </ul>
          )}
        </li>

        {/* COMPRAS */}
        <li>
          <button onClick={() => toggleMenu('compras')}>
            <FaShoppingCart /> Compras
          </button>
          {activeMenu === 'compras' && (
            <ul className="submenu">
              <li><Link to="/admin/compras/proveedores">Proveedores</Link></li>
              <li><Link to="/admin/compras/realizar">Realizar Compra</Link></li>
            </ul>
          )}
        </li>

        {/* CAJA */}
        <li>
          <button onClick={() => toggleMenu('caja')}>
            <FaCashRegister /> Caja
          </button>
          {activeMenu === 'caja' && (
            <ul className="submenu">
              <li><Link to="/admin/caja/administrar">Administrar Caja</Link></li>
              <li><Link to="/admin/caja/historial">Historial Caja</Link></li>
            </ul>
          )}
        </li>

        {/* VENTAS */}
        <li>
          <button onClick={() => toggleMenu('ventas')}>
            <FaChartLine /> Ventas
          </button>
          {activeMenu === 'ventas' && (
            <ul className="submenu">
              <li><Link to="/admin/ventas/clientes">Clientes</Link></li>
              <li><Link to="/admin/ventas/realizar">Realizar Ventas</Link></li>
              <li><Link to="/admin/ventas/dia">Consultar del Día</Link></li>
              <li><Link to="/admin/ventas/fecha">Consultar por Fecha</Link></li>
              <li><Link to="/admin/ventas/mes">Consultar por Mes</Link></li>
            </ul>
          )}
        </li>

        {/* CONFIG */}
        <li>
          <button onClick={() => toggleMenu('config')}>
            <FaCog /> Configuración
          </button>
          {activeMenu === 'config' && (
            <ul className="submenu">
              <li><Link to="/admin/configuracion">Configuración</Link></li>
            </ul>
          )}
        </li>

        {/* PRODUCTOS */}
        <li>
          <button onClick={() => toggleMenu('productos')}>
            <FaBoxOpen /> Productos
          </button>
          {activeMenu === 'productos' && (
            <ul className="submenu">
              <li><Link to="/admin/productos/apartar">Apartar Productos</Link></li>
              <li><Link to="/admin/productos/dia">Apartados del Día</Link></li>
              <li><Link to="/admin/productos/fecha">Apartados por Fecha</Link></li>
              <li><Link to="/admin/productos/mes">Apartados por Mes</Link></li>
            </ul>
          )}
        </li>

        {/* INVENTARIO */}
        <li>
          <button onClick={() => toggleMenu('inventario')}>
            <FaBoxes /> Inventario
          </button>
          {activeMenu === 'inventario' && (
            <ul className="submenu">
              <li><Link to="/admin/inventario/nuevo">Abrir Nuevo Inventario</Link></li>
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
