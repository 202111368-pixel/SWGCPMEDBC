import React from "react"; 
import { Link, useNavigate } from "react-router-dom";
import {
  FaCashRegister,
  FaChartLine,
  FaBox,
  FaUsers,          
  FaBoxes, 
  FaChartBar,         
  FaSignOutAlt,
  FaMoneyCheckAlt,
  FaTools
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
        {/*INICIO */}
        <li>
          <Link to="/admin/inicio" className="menu-link">
            <FaChartLine /> <span>Dashboard </span>
          </Link>
        </li>


    {/*ventas */}
        <li>
          <Link to="/admin/ventas/registrar" className="menu-link">
            <FaCashRegister /> <span>Ventas</span>
          </Link>
        </li>


    {/*Pagos */}
        <li>
          <Link to="/admin/pagos" className="menu-link">
            <FaMoneyCheckAlt /> <span>Pagos</span>
          </Link>
        </li>
  


  {/*Producto */}
         <li>
          <Link to="/admin/producto" className="menu-link">
            <FaBox /> <span>Producto</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/* cliente */}
        <li>
          <Link to="/admin/clientes" className="menu-link">
            <FaUsers /> <span>Clientes</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        {/* Inventario */}
        <li>
          <Link to="/admin/Inventario" className="menu-link">
            <FaBoxes /> <span>Inventario </span>
          </Link>
        </li>


        {/* Reportes */}
       <li>
          <Link to="/admin/reportes" className="menu-link">
            <FaChartBar /> <span>Reportes</span>
          </Link>
        </li>

         {/* Configuración  */}
       <li>
          <Link to="/admin/configuración " className="menu-link">
            <FaTools /> <span>Configuración </span>
          </Link>
        </li>


        <hr className="sidebar-divider" />

        {/* cerrar */}
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