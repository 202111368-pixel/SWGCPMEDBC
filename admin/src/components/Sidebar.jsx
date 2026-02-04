import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaCashRegister,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
        <h3>D’Bary Company</h3>
        <p>Sistema de Melamina</p>
      </div>

      <ul className="sidebar-menu">
        {/* INICIO */}
        <li>
          <Link to="/admin/inicio">
            <FaChartLine /> Inicio
          </Link>
        </li>

        {/* VENTAS */}
        <li>
          <button onClick={() => toggleMenu("ventas")}>
            <FaCashRegister /> Ventas
          </button>
          {activeMenu === "ventas" && (
            <ul className="submenu">
              <li><Link to="/admin/ventas/registrar">Registrar Venta</Link></li>
            </ul>
          )}
        </li>

        {/*  COMPRAS */}
        <li>
          <button onClick={() => toggleMenu("compras")}>
            <FaShoppingCart /> Compras
          </button>
          {activeMenu === "compras" && (
            <ul className="submenu">
              <li><Link to="/admin/compras/ordenes">Órdenes de Compra</Link></li>
            </ul>
          )}
        </li>

        {/* PERSONAL */}
        <li>
          <button onClick={() => toggleMenu("personal")}>
            <FaUserTie /> Personal
          </button>
          {activeMenu === "personal" && (
            <ul className="submenu">
              <li><Link to="/admin/personal/empleados">Empleados</Link></li>
              <li><Link to="/admin/personal/asistencias">Asistencias</Link></li>
            </ul>
          )}
        </li>

        {/* CONFIGURACIÓN */}
        <li>
          <button onClick={() => toggleMenu("configuracion")}>
            <FaCog /> Configuración
          </button>
          {activeMenu === "configuracion" && (
            <ul className="submenu">
              <li><Link to="/admin/configuracion">Ajustes del Sistema</Link></li>
            </ul>
          )}
        </li>

        {/*  CAJA (Cajero.jsx) */}
        <li>
          <Link to="/admin/cajero">
            <FaCashRegister /> Caja
          </Link>
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