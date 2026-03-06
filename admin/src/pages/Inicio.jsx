import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/pages/Inicio.css";
import DonutChart from "../components/DonutChart";
import { 
  FaCashRegister, FaBox, FaBoxes, 
  FaUsers, FaDraftingCompass, FaHardHat 
} from "react-icons/fa";

const Inicio = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    ventas: 0, almacen: 0, producto: 0, clientes: 0, arquitecto: 0, civil: 0
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dashboard_summary_v1"));
    if (savedData) {
      setCounts(savedData);
    }
  }, []);

  const modulos = [
    { title: "Ventas", val: counts.ventas, 
      icon: FaCashRegister, col: "#D9544F", path: "/admin/ventas/registrar" },

    { title: "Almacén", val: counts.almacen, 
      icon: FaBox, col: "#8e6c34", path: "/admin/categoria" },

    { title: "Producto", val: counts.producto,
       icon: FaBoxes, col: "#3867A3", path: "/admin/producto" },

    { title: "Clientes", val: counts.clientes, 
      icon: FaUsers, col: "#2F7E69", path: "/admin/clientes" },

    { title: "Inventario", val: counts.arquitecto, 
      icon: FaDraftingCompass, col: "#6052aa", path: "/admin/Inventario" },

    { title: "Configuración", val: counts.civil, 
      icon: FaHardHat, col: "#475569", path: "/admin/Configuración" },
    
    { title: "Reportes", val: counts.civil, 
      icon: FaHardHat, col: "#475569", path: "/admin/Reportes" },
  ];

  return (
    <div className="page-container ia-bg">
      <div className="dashboard-header">
        <div className="ia-scanner-text">
          <h2 className="page-title">D'Bary </h2>
        </div>
      </div>

      <div className="cards-grid-3x3">
        {modulos.map((m, index) => (
          <div 
            key={index} 
            className="dash-card ia-card" 
            style={{ "--delay": `${index * 0.1}s` }}
            onClick={() => navigate(m.path)}
          >
            <div className="card-header-dash">
              <div className="icon-wrapper ia-icon" style={{ color: m.col }}>
                <m.icon />
              </div>
              <div className="card-info">
                <h4>{m.title}</h4>
                <div className="card-value">{m.val}</div>
              </div>
            </div>
            <div className="card-chart-container">
              <DonutChart value={m.val > 0 ? 100 : 0} color={m.col} total={100} />
            </div>
            <div className="ia-status-bar" style={{ backgroundColor: m.col }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;