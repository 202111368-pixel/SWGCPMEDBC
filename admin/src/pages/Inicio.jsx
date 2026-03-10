import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/pages/Inicio.css";
import { 
  FaCashRegister, 
  FaBox, 
  FaWarehouse, 
  FaUsers, 
  FaTools, 
  FaChartBar, 
  FaArrowCircleRight 
} from "react-icons/fa";

const Inicio = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    ventas: "S/ 4,300", 
    visitas: 13, 
    usuarios: 4, 
    productos: 7, 
    almacen: 2, 
    configuracion: "Sistema"
  });

  useEffect(() => {
    const dataString = localStorage.getItem("dashboard_summary_v1");
    if (dataString) {
      const savedData = JSON.parse(dataString);
      setCounts(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  const modulos = [
    { 
      title: "Caja / Ventas", 
      val: counts.ventas, 
      icon: FaCashRegister, 
      col: "#4eb4e1", 
      path: "/admin/cajero" 
    },
    { 
      title: "Reportes", 
      val: counts.visitas, 
      icon: FaChartBar, 
      col: "#5cb85c", 
      path: "/admin/reportes" 
    },
    { 
      title: "Clientes", 
      val: counts.usuarios, 
      icon: FaUsers, 
      col: "#f0ad4e", 
      path: "/admin/clientes" 
    },
    { 
      title: "Catálogo", 
      val: counts.productos, 
      icon: FaBox, 
      col: "#d9534f", 
      path: "/admin/producto" 
    },
    { 
      title: "Jefe Almacén", 
      val: counts.almacen, 
      icon: FaWarehouse, 
      col: "#6052aa", 
      path: "/admin/jefeAlmacen" 
    },
    { 
      title: "Configuración", 
      val: counts.configuracion, 
      icon: FaTools, 
      col: "#475569", 
      path: "/admin/configuración" 
    }
  ];

  return (
    <div className="page-container fade-in">
      <div className="dashboard-header">
        <h2 className="page-title">Panel de Control D'Bary</h2>
        <p className="page-subtitle">Bienvenido al sistema de gestión de melamina</p>
      </div>

      <div className="cards-grid-reference">
        {modulos.map((m) => (
          <div 
            key={m.title} 
            className="card-stat" 
            style={{ backgroundColor: m.col }}
            onClick={() => navigate(m.path)}
          >
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
  );
};

export default Inicio;