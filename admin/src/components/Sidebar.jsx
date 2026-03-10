import React from "react"; 
import { Link, useNavigate } from "react-router-dom";
import {
  FaCashRegister,
  FaChartLine,
  FaBox,
  FaUsers,          
  FaChartBar,         
  FaSignOutAlt,
  FaMoneyCheckAlt,
  FaTools,
  FaWarehouse
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

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
        {/* Inicio */}
        <li>
          <Link to="/admin/inicio" className="menu-link">
            <FaChartLine /> <span>Dashboard</span>
          </Link>
        </li>

        {/* Ventas */}
        <li>
          <Link to="/admin/cajero" className="menu-link">
            <FaCashRegister /> <span>Cajero</span>
          </Link>
        </li>

        {/* Administrador */}
        <li>
          <Link to="/admin/administrador" className="menu-link">
            <FaMoneyCheckAlt /> <span>Administrador</span>
          </Link>
        </li>

        {/* Producto */}
        <li>
          <Link to="/admin/producto" className="menu-link">
            <FaBox /> <span>Productos</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/* Clientes */}
        <li>
          <Link to="/admin/clientes" className="menu-link">
            <FaUsers /> <span>Clientes</span>
          </Link>
        </li>

        {/* Jefe de Almacén */}
        <li>
          <Link to="/admin/jefeAlmacen" className="menu-link">
            <FaWarehouse /> <span>Jefe Almacén</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/* Reportes */}
        <li>
          <Link to="/admin/reportes" className="menu-link">
            <FaChartBar /> <span>Reportes</span>
          </Link>
        </li>

        {/* Configuración */}
        <li>
          <Link to="/admin/configuración" className="menu-link">
            <FaTools /> <span>Configuración</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/* Cerrar Sesión */}
        <li className="cerrar-sesion">
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> <span>Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;