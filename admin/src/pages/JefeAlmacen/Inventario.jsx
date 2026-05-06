import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaBox, FaLayerGroup, FaArrowRight, FaTimes } from 'react-icons/fa';
import "../../styles/pages/JefeAlmacen/Inventario.css"; 

const Inventario = () => {
  const navigate = useNavigate();
  const [metricas, setMetricas] = useState({ criticos: 0, bajo: 0, total: 0 });
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const datosVentas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    const criticos = datosVentas.filter(v => (v.cantidad || 0) < 5).length; 
    const total = datosVentas.length;

    setMetricas({
      criticos: criticos,
      bajo: Math.ceil(total * 0.2), 
      total: total
    });

    setAlertas(datosVentas.slice(0, 3)); 
  }, []);

  const irATabla = () => {
    window.location.href = "http://localhost:3001/admin/producto/gestionar";
  };

  return (
    <div className="inventario-page-wrapper">
      <header className="inventario-header">
        <h1>Inventario y Alertas</h1>
        <p>Resumen de existencias sincronizado con Gestión de Productos</p>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card-alt critical clickable" onClick={irATabla}>
          <div className="kpi-info">
            <span className="kpi-num">{metricas.criticos}</span>
            <span className="kpi-label">Alertas Críticas</span>
          </div>
          <FaExclamationTriangle className="kpi-icon-bg" />
        </div>

        <div className="kpi-card-alt warning clickable" onClick={irATabla}>
          <div className="kpi-info">
            <span className="kpi-num">{metricas.bajo}</span>
            <span className="kpi-label">Stock Bajo</span>
          </div>
          <FaLayerGroup className="kpi-icon-bg" />
        </div>

        <div className="kpi-card-alt total clickable" onClick={irATabla}>
          <div className="kpi-info">
            <span className="kpi-num">{metricas.total}</span>
            <span className="kpi-label">Total Productos</span>
          </div>
          <FaBox className="kpi-icon-bg" />
        </div>
      </div>

      <h2 className="section-title">Materiales que Requieren Atención <span className="badge-count">{alertas.length} materiales</span></h2>

      <div className="material-grid">
        {alertas.map((item, index) => (
          <div className="material-card" key={index}>
            <div className="card-top">
              <div>
                <h3>{item.producto || "Sin Nombre"}</h3>
                <span className="cat-text">{item.metodoPago || "Melamina"}</span>
              </div>
              <span className="badge-critico">Crítico</span>
            </div>

            <div className="stock-display">
              <div className="stock-box">
                <span className="stock-label">Total Venta</span>
                <span className="stock-val" style={{color: '#27ae60'}}>{item.venta || item.total}</span>
              </div>
              <div className="stock-box">
                <span className="stock-label">Fecha Reg.</span>
                <span className="stock-val" style={{fontSize: '14px'}}>{item.fecha}</span>
              </div>
            </div>

            <div className="suggestion-box">
              <p>Estado Actual</p>
              <strong>{item.estado || "VALIDADO"}</strong>
            </div>

            <div className="card-actions">
              <button className="btn-planificar" onClick={irATabla}>Ver en Tabla <FaArrowRight /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventario;