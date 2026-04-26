import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCashRegister, 
  FaBox, 
  FaWarehouse, 
  FaUsers, 
  FaTools, 
  FaChartBar, 
  FaUserShield, 
  FaClipboardList, 
  FaArrowCircleRight,
  FaChartLine,
  FaUserCog
} from "react-icons/fa";
import "../styles/pages/Inicio.css";

const Inicio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ventas");
  const [counts, setCounts] = useState({
    ventas: "S/ 4,300", 
    visitas: 13, 
    usuarios: 4, 
    productos: 7, 
    almacen: 2, 
    configuracion: "Sistema",
    admin: "Activo",
    inventario: 25
  });

  useEffect(() => {
    const dataString = localStorage.getItem("dashboard_summary_v1");
    if (dataString) {
      const savedData = JSON.parse(dataString);
      setCounts(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  const modulos = [
    { title: "Administrador", val: counts.admin, icon: FaUserShield, col: "#795548", path: "/admin/administrador" },
    { title: "Clientes", val: counts.usuarios, icon: FaUsers, col: "#f0ad4e", path: "/admin/clientes" },
    { title: "Catálogo", val: counts.productos, icon: FaBox, col: "#d9534f", path: "/admin/producto/gestionar" },
    { title: "Reportes", val: counts.visitas, icon: FaChartBar, col: "#5cb85c", path: "/admin/reportes" },
    { title: "Caja / Ventas", val: counts.ventas, icon: FaCashRegister, col: "#4eb4e1", path: "/admin/caja/administrar" },
    { title: "Jefe Almacén", val: counts.almacen, icon: FaWarehouse, col: "#6052aa", path: "/admin/jefeAlmacen" },
    { title: "Inventario", val: counts.inventario, icon: FaClipboardList, col: "#8e44ad", path: "/admin/inventario" },
    { title: "Configuración", val: counts.configuracion, icon: FaTools, col: "#475569", path: "/admin/configuración" }
  ];

  return (
    <div className="page-container fade-in">
      <div className="dashboard-content-limit">
        
        <div className="dashboard-tabs-container">
          <div className={`tab-item ${activeTab === "productos" ? "active" : ""}`} onClick={() => { setActiveTab("productos"); navigate("/admin/producto/gestionar"); }}>
            <FaBox className="tab-icon prod" /> PRODUCTOS Y STOCK
          </div>
          <div className={`tab-item ${activeTab === "ventas" ? "active" : ""}`} onClick={() => { setActiveTab("ventas"); navigate("/admin/caja/adminitrar"); }}>
            <FaChartLine className="tab-icon vent" /> VENTAS Y PEDIDOS
          </div>
          <div className={`tab-item ${activeTab === "reportes" ? "active" : ""}`} onClick={() => { setActiveTab("reportes"); navigate("/admin/reportes"); }}>
            <FaChartBar className="tab-icon recl" /> RECLAMOS Y CONSULTAS
          </div>
          <div className={`tab-item ${activeTab === "config" ? "active" : ""}`} onClick={() => { setActiveTab("config"); navigate("/admin/configuración"); }}>
            <FaUserCog className="tab-icon conf" /> CONFIGURACIÓN
          </div>
        </div>

        <div className="dashboard-header">
          <h2 className="page-title">Panel de Control D'Bary</h2>
          <p className="page-subtitle">Bienvenido al sistema de gestión de melamina</p>
        </div>

        <div className="cards-grid-reference">
          {modulos.map((m) => (
            <div key={m.title} className="card-stat" style={{ backgroundColor: m.col }} onClick={() => navigate(m.path)}>
              <div className="inner-content">
                <div className="stat-info">
                  <h3>{m.val}</h3>
                  <p>{m.title}</p>
                </div>
                <div className="stat-icon">
                  <m.icon />
                </div>
              </div>
              <div className="more-info">
                Ir al módulo <FaArrowCircleRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inicio;