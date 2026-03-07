import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/pages/Inicio.css";
import { 
  FaCashRegister, 
  FaBox, 
  FaBoxes, 
  FaUsers, 
  FaCog, 
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
    inventario: 2, 
    configuracion: 0
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
      title: "Ventas", 
      val: counts.ventas, 
      icon: FaCashRegister, 
      col: "#4eb4e1", 
      path: "/admin/ventas/registrar" 
    },
    { 
      title: "Visitas", 
      val: counts.visitas, 
      icon: FaChartBar, 
      col: "#5cb85c", 
      path: "/admin/categoria" 
    },
    { 
      title: "Usuarios", 
      val: counts.usuarios, 
      icon: FaUsers, 
      col: "#f0ad4e", 
      path: "/admin/clientes" 
    },
    { 
      title: "Productos", 
      val: counts.productos, 
      icon: FaBoxes, 
      col: "#d9534f", 
      path: "/admin/producto" 
    },
    { 
      title: "Inventario", 
      val: counts.inventario, 
      icon: FaBox, 
      col: "#6052aa", 
      path: "/admin/Inventario" 
    },
    { 
      title: "Configuración", 
      val: counts.configuracion, 
      icon: FaCog, 
      col: "#475569", 
      path: "/admin/Configuracion" 
    }
  ];

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h2 className="page-title">Panel de Control D'Bary</h2>
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
              Más Info <FaArrowCircleRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;