import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaWarehouse,
  FaFileInvoice,
  FaShoppingCart,
  FaCashRegister,
  FaChartLine,
  FaCog,
  FaBoxOpen,
  FaBoxes,
  FaSignOutAlt, // 🔸 icono cerrar sesión
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      localStorage.removeItem("userEmail");
      navigate("/"); 
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
      </div>

      <ul className="sidebar-menu">
        {/* ALMACÉN */}
        <li>
          <button onClick={() => toggleMenu("almacen")}>
            <FaWarehouse /> Almacén
          </button>
          {activeMenu === "almacen" && (
            <ul className="submenu">
              <li><Link to="/admin/almacen/categoria">Categoría</Link></li>
              <li><Link to="/admin/almacen/marca">Marca</Link></li>
              <li><Link to="/admin/almacen/producto">Producto</Link></li>
            </ul>
          )}
        </li>

        {/* COTIZACIONES */}
        <li>
          <button onClick={() => toggleMenu("cotizaciones")}>
            <FaFileInvoice /> Cotizaciones
          </button>
          {activeMenu === "cotizaciones" && (
            <ul className="submenu">
              <li><Link to="/admin/cotizaciones/generar">Generar Cotización</Link></li>
              <li><Link to="/admin/cotizaciones/ver">Ver Cotización</Link></li>
            </ul>
          )}
        </li>

        {/* COMPRAS */}
        <li>
          <button onClick={() => toggleMenu("compras")}>
            <FaShoppingCart /> Compras
          </button>
          {activeMenu === "compras" && (
            <ul className="submenu">
              <li><Link to="/admin/compras/proveedores">Proveedores</Link></li>
              <li><Link to="/admin/compras/realizar">Realizar Compra</Link></li>
            </ul>
          )}
        </li>

        {/* CAJA */}
        <li>
          <button onClick={() => toggleMenu("caja")}>
            <FaCashRegister /> Caja
          </button>
          {activeMenu === "caja" && (
            <ul className="submenu">
              <li><Link to="/admin/caja/administrar">Administrar Caja</Link></li>
            </ul>
          )}
        </li>

        {/* VENTAS */}
        <li>
          <button onClick={() => toggleMenu("ventas")}>
            <FaChartLine /> Ventas
          </button>
          {activeMenu === "ventas" && (
            <ul className="submenu">
              <li><Link to="/admin/ventas/clientes">Clientes</Link></li>
            </ul>
          )}
        </li>

        {/* CONFIGURACIÓN */}
        <li>
          <button onClick={() => toggleMenu("config")}>
            <FaCog /> Configuración
          </button>
          {activeMenu === "config" && (
            <ul className="submenu">
              <li><Link to="/admin/configuracion">Configuración</Link></li>
            </ul>
          )}
        </li>

        {/* PRODUCTOS */}
        <li>
          <button onClick={() => toggleMenu("productos")}>
            <FaBoxOpen /> Productos
          </button>
          {activeMenu === "productos" && (
            <ul className="submenu">
              <li><Link to="/admin/productos/apartar">Apartar Productos</Link></li>
            </ul>
          )}
        </li>

        {/* INVENTARIO */}
        <li>
          <button onClick={() => toggleMenu("inventario")}>
            <FaBoxes /> Inventario
          </button>
          {activeMenu === "inventario" && (
            <ul className="submenu">
              <li><Link to="/admin/inventario/nuevo">Abrir Nuevo Inventario</Link></li>
            </ul>
          )}
        </li>

        <li className="cerrar-sesion">
          <button onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
