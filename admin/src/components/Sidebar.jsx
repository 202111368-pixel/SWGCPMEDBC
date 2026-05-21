import React, { useState } from "react"; 
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCashRegister, FaChartLine, FaBox, FaUsers, FaChartBar, 
  FaSignOutAlt, FaMoneyCheckAlt, FaTools, FaWarehouse,
  FaChevronDown, FaChevronUp, FaThLarge, FaClipboardList,
  FaBoxes, FaDraftingCompass, FaHammer, FaTruck 
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openCaja, setOpenCaja] = useState(false); 
  const [openProductos, setOpenProductos] = useState(false); 
  const [openDisenador, setOpenDisenador] = useState(false); 

  const handleLogout = () => {
    if (window.confirm("¿Deseas cerrar sesión?")) {
      localStorage.removeItem("user_session");
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>D’Bary Company</h3>
      </div>
      
      <ul className="sidebar-menu">
        <li className="menu-section-title">GENERAL</li>
        <li>
          <NavLink to="/admin/inicio" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaChartLine /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/clientes" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaUsers /> <span>Clientes</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/administrador" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaMoneyCheckAlt /> <span>Administrador</span>
          </NavLink>
        </li>
        
        {/* PRODUCTO DESPLEGABLE */}
        <li className={`menu-item-desplegable ${openProductos ? "open" : ""}`}>
          <div className="menu-link" onClick={() => setOpenProductos(!openProductos)} style={{ cursor: 'pointer' }}>
            <FaBox /> <span>Productos</span>
            <span className="icon-arrow">
              {openProductos ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          </div>
          
          {openProductos && (
            <ul className="submenu">
              <li><NavLink to="/admin/producto/gestionar" className="submenu-link"><FaThLarge size={14}/> Gestionar Productos</NavLink></li>
              <li><NavLink to="/admin/producto/catalogo" className="submenu-link"><FaClipboardList size={14}/> Gestionar Catálogo</NavLink></li>
            </ul>
          )}
        </li>
        
        <li className="menu-section-title">OPERACIONES</li>
        
        {/* DISEÑADOR DESPLEGABLE */}
        <li className={`menu-item-desplegable ${openDisenador ? "open" : ""}`}>
          <div className="menu-link" onClick={() => setOpenDisenador(!openDisenador)} style={{ cursor: 'pointer' }}>
            <FaChartBar /> <span>Diseñador</span>
            <span className="icon-arrow">
              {openDisenador ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          </div>
          
          {openDisenador && (
            <ul className="submenu">
              <li>
                <NavLink to="/admin/disenador/arquitecto" className="submenu-link">
                  <FaDraftingCompass size={14}/> Administrar Arquitecto
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/disenador/carpintero" className="submenu-link">
                  <FaHammer size={14}/> Administrar Carpintero
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        
        {/* CAJERO DESPLEGABLE */}
        <li className={`menu-item-desplegable ${openCaja ? "open" : ""}`}>
          <div className="menu-link" onClick={() => setOpenCaja(!openCaja)} style={{ cursor: 'pointer' }}>
            <FaCashRegister /> <span>Cajero</span>
            <span className="icon-arrow">
              {openCaja ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </span>
          </div>
          
          {openCaja && (
            <ul className="submenu">
              <li><NavLink to="/admin/caja/administrar" className="submenu-link">Administrar Caja</NavLink></li>
              <li><NavLink to="/admin/caja/historial" className="submenu-link">Historial de Caja</NavLink></li>
            </ul>
          )}
        </li>

        {/* SECCIÓN ALMACÉN / INVENTARIO */}
        <li>
          <NavLink to="/admin/jefeAlmacen" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaWarehouse /> <span>Jefe Almacén</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventario" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaBoxes /> <span>Inventario</span>
          </NavLink>
        </li>        
        {/* PROVEEDORES */}
        <li>
          <NavLink to="/admin/proveedor" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaTruck /> <span>Proveedores</span>
          </NavLink>
        </li>        

        <li className="menu-section-title">SISTEMA</li>
        <li>
          <NavLink to="/admin/configuración" className={({isActive}) => isActive ? "menu-link active" : "menu-link"}>
            <FaTools /> <span>Configuración</span>
          </NavLink>
        </li>
        
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