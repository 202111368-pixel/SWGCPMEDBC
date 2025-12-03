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
  FaSignOutAlt,
  FaUserTie,
  FaClipboardList,
  FaCubes,
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
        <h3>D’Bary Company</h3>
        <p>Sistema de Melamina</p>
      </div>

      <ul className="sidebar-menu">

        {/* 🏠 INICIO */}
        <li>
          <Link to="/admin/inicio">
            <FaChartLine /> Inicio
          </Link>
        </li>

        {/* 🏢 ALMACÉN */}
        <li>
          <button onClick={() => toggleMenu("almacen")}>
            <FaWarehouse /> Almacén
          </button>
          {activeMenu === "almacen" && (
            <ul className="submenu">
              <li><Link to="/admin/almacen/categorias">Categorías</Link></li>
              <li><Link to="/admin/almacen/tipos">Tipos de Melamina</Link></li>
              <li><Link to="/admin/almacen/materiales">Materiales</Link></li>
              <li><Link to="/admin/almacen/ubicacion">Ubicación de Stock</Link></li>
            </ul>
          )}
        </li>

        {/* 💰 COTIZACIONES */}
        <li>
          <button onClick={() => toggleMenu("cotizaciones")}>
            <FaFileInvoice /> Cotizaciones
          </button>
          {activeMenu === "cotizaciones" && (
            <ul className="submenu">
              <li><Link to="/admin/cotizaciones/nueva">Nueva Cotización</Link></li>
              <li><Link to="/admin/cotizaciones/historial">Historial</Link></li>
            </ul>
          )}
        </li>

        {/* 🧾 VENTAS */}
        <li>
          <button onClick={() => toggleMenu("ventas")}>
            <FaCashRegister /> Ventas
          </button>
          {activeMenu === "ventas" && (
            <ul className="submenu">
              <li><Link to="/admin/ventas/registrar">Registrar Venta</Link></li>
              <li><Link to="/admin/ventas/clientes">Clientes</Link></li>
            </ul>
          )}
        </li>

        {/* 🚛 COMPRAS */}
        <li>
          <button onClick={() => toggleMenu("compras")}>
            <FaShoppingCart /> Compras
          </button>
          {activeMenu === "compras" && (
            <ul className="submenu">
              <li><Link to="/admin/compras/proveedores">Proveedores</Link></li>
              <li><Link to="/admin/compras/ordenes">Órdenes de Compra</Link></li>
            </ul>
          )}
        </li>

        {/* 📦 INVENTARIO */}
        <li>
          <button onClick={() => toggleMenu("inventario")}>
            <FaBoxes /> Inventario
          </button>
          {activeMenu === "inventario" && (
            <ul className="submenu">
              <li><Link to="/admin/inventario/ver">Ver Inventario</Link></li>
              <li><Link to="/admin/inventario/movimientos">Movimientos</Link></li>
            </ul>
          )}
        </li>

        {/* 🧰 PRODUCCIÓN */}
        <li>
          <button onClick={() => toggleMenu("produccion")}>
            <FaCubes /> Producción
          </button>
          {activeMenu === "produccion" && (
            <ul className="submenu">
              <li><Link to="/admin/produccion/planificar">Planificar Producción</Link></li>
              <li><Link to="/admin/produccion/ordenes">Órdenes de Producción</Link></li>
            </ul>
          )}
        </li>

        {/* 👷 PERSONAL */}
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

        {/* ⚙️ CONFIGURACIÓN */}
        <li>
          <button onClick={() => toggleMenu("configuracion")}>
            <FaCog /> Configuración
          </button>
          {activeMenu === "configuracion" && (
            <ul className="submenu">
              <li><Link to="/admin/configuracion/usuarios">Usuarios</Link></li>
              <li><Link to="/admin/configuracion/ajustes">Ajustes del Sistema</Link></li>
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
