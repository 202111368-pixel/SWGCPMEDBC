import React from "react"; 
import { Link, useNavigate } from "react-router-dom";
import {
  FaCashRegister,
  FaChartLine,
  FaBox,
  FaUsers,          
  FaDraftingCompass, 
  FaHardHat,         
  FaSignOutAlt
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


    {/*Almacén */}
        <li>
          <Link to="/admin/categoria" className="menu-link">
            <FaBox /> <span>Almacén</span>
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

        {/* Arquitecto */}
        <li>
          <Link to="/admin/Arquitecto" className="menu-link">
            <FaDraftingCompass /> <span>Arquitecto (Diseño)</span>
          </Link>
        </li>


        {/* Civil */}
        <li>
          <Link to="/admin/Civil" className="menu-link">
            <FaHardHat /> <span>Ingeniería Civil</span>
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