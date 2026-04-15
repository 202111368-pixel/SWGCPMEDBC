import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import {
  FaCashRegister, FaChartLine, FaBox, FaUsers, FaChartBar, 
  FaSignOutAlt, FaMoneyCheckAlt, FaTools, FaWarehouse,
  FaChevronDown, FaChevronUp 
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openCaja, setOpenCaja] = useState(false); 

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
        <li><Link to="/admin/inicio" className="menu-link"><FaChartLine /> <span>Dashboard</span></Link></li>
        <li><Link to="/admin/clientes" className="menu-link"><FaUsers /> <span>Clientes</span></Link></li>
        <li><Link to="/admin/administrador" className="menu-link"><FaMoneyCheckAlt /> <span>Administrador</span></Link></li>
        <li><Link to="/admin/producto" className="menu-link"><FaBox /> <span>Productos</span></Link></li>
        <hr className="sidebar-divider" />
        <li><Link to="/admin/reportes" className="menu-link"><FaChartBar /> <span>Reportes</span></Link></li>
        {/*  Cajero con Submenú */}
        <li className={`menu-item-desplegable ${openCaja ? "active" : ""}`}>
          <div className="menu-link" onClick={() => setOpenCaja(!openCaja)} style={{ cursor: 'pointer' }}>
            <FaCashRegister /> <span>Cajero</span>
            <span className="icon-arrow">
              {openCaja ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          </div>
          
          {openCaja && (
            <ul className="submenu">
              <li><Link to="/admin/caja/administrar" className="submenu-link">Administrar Caja</Link></li>
              <li><Link to="/admin/caja/historial" className="submenu-link">Historial de Caja</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/admin/jefeAlmacen" className="menu-link"><FaWarehouse /> <span>Jefe Almacén</span></Link></li>
        <hr className="sidebar-divider" />
        <li><Link to="/admin/configuración" className="menu-link"><FaTools /> <span>Configuración</span></Link></li>
        <li className="cerrar-sesion">
          <button onClick={handleLogout} className="btn-logout"><FaSignOutAlt /> <span>Cerrar Sesión</span></button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;