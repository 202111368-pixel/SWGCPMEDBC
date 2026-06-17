import React, { useState } from "react";
import { FaBox, FaUsers, FaClipboardList } from "react-icons/fa";

// Importamos tus 3 nuevas pestañas modulares
import TabUsuarios from "./TabUsuarios";
import TabProductos from "./TabProductos";
import TabInventarioProveedor from "./TabInventarioProveedor";

import "../styles/pages/Inicio.css";

const TABS = [
  { key: "usuarios",   label: "CLIENTE Y ADMINISTRADOR", icon: FaUsers,         color: "#3b82f6" },
  { key: "productos",  label: "PRODUCTOS Y STOCK",       icon: FaBox,           color: "#d35400" },
  { key: "inventario", label: "INVENTARIO Y PROVEEDOR",  icon: FaClipboardList, color: "#8e44ad" },
];

const Inicio = () => {
  const [activeTab, setActiveTab] = useState("usuarios");

  const renderTab = () => {
    switch (activeTab) {
      case "usuarios":
        return <TabUsuarios />;
      case "productos":
        return <TabProductos />;
      case "inventario":
        return <TabInventarioProveedor />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-content-limit">
        {/* Contenedor de las Pestañas (Tabs) */}
        <div className="dashboard-tabs-container">
          {TABS.map(t => (
            <div 
              key={t.key} 
              className={`tab-item ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
              style={activeTab === t.key ? { color: t.color } : {}}
            >
              <t.icon className="tab-icon" style={{ color: t.color }} />
              {t.label}
              {activeTab === t.key && <div className="tab-underline" style={{ background: t.color }}></div>}
            </div>
          ))}
        </div>
        
        {/* Renderizado del módulo seleccionado */}
        <div className="tab-view-container" style={{ marginTop: "20px" }}>
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Inicio;