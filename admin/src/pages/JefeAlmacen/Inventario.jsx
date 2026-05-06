import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaBox, FaLayerGroup, FaCheck, FaTrashAlt, FaWarehouse, FaShoppingCart, FaHistory } from 'react-icons/fa';
import "../../styles/pages/JefeAlmacen/Inventario.css"; 

const Inventario = () => {
  const [alertas, setAlertas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [metricas, setMetricas] = useState({ criticos: 0, bajo: 0, total: 0 });

  const cargarDatos = () => {
    const datosVentas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    const datosHistorial = JSON.parse(localStorage.getItem("historial_inventario")) || [];
    setAlertas(datosVentas);
    setHistorial(datosHistorial);
    setMetricas({
      criticos: datosVentas.length,
      bajo: Math.ceil(datosVentas.length * 0.2),
      total: datosVentas.length + datosHistorial.length
    });
  };

  useEffect(() => {
    cargarDatos();
    window.addEventListener("storage", cargarDatos);
    return () => window.removeEventListener("storage", cargarDatos);
  }, []);

  const gestionarAccion = (index, accion) => {
    let nuevasVentas = [...alertas];
    let itemProcesado = { ...nuevasVentas[index], 
      estado: accion === 'aceptar' ? 'ACEPTADO' : 'RECHAZADO',
      fechaAccion: new Date().toLocaleDateString()
    };

    const nuevoHistorial = [itemProcesado, ...historial];
    localStorage.setItem("historial_inventario", JSON.stringify(nuevoHistorial));
    
    nuevasVentas.splice(index, 1);
    localStorage.setItem("ventas_registradas", JSON.stringify(nuevasVentas));
    cargarDatos();
  };

  return (
    <div className="inventario-page-wrapper">
      <header className="inventario-header">
        <div className="header-content">
          <h1><FaWarehouse /> Gestión de Inventario</h1>
          <button className="btn-recompra-header" onClick={() => window.location.href = "http://localhost:3000/carrito"}>
            <FaShoppingCart /> IR AL CARRITO
          </button>
        </div>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card-alt critical">
          <div className="kpi-info"><span className="kpi-num">{metricas.criticos}</span><span className="kpi-label">Pendientes</span></div>
          <FaExclamationTriangle className="kpi-icon-bg" />
        </div>
        <div className="kpi-card-alt warning">
          <div className="kpi-info"><span className="kpi-num">{metricas.bajo}</span><span className="kpi-label">Stock Bajo</span></div>
          <FaLayerGroup className="kpi-icon-bg" />
        </div>
        <div className="kpi-card-alt total">
          <div className="kpi-info"><span className="kpi-num">{metricas.total}</span><span className="kpi-label">Total Histórico</span></div>
          <FaBox className="kpi-icon-bg" />
        </div>
      </div>

      <h2 className="section-title">Control de Decisiones</h2>
      <div className="material-grid">
        {alertas.map((item, index) => (
          <div className="material-card" key={index}>
            <div className="card-top">
              <h3>{item.producto}</h3>
              <span className="badge-status-validated">VALIDADO</span>
            </div>
            <div className="stock-display">
              <div className="stock-box"><span className="stock-label">Monto</span><span className="stock-val">S/ {item.venta || item.total}</span></div>
              <div className="stock-box"><span className="stock-label">Método</span><span className="stock-val-mini">{item.metodoPago || 'Yape'}</span></div>
            </div>
            <div className="card-actions">
              <button className="btn-aceptar-pago" onClick={() => gestionarAccion(index, 'aceptar')}><FaCheck /> ACEPTAR</button>
              <button className="btn-rechazar-pago" onClick={() => gestionarAccion(index, 'rechazar')}><FaTrashAlt /> RECHAZAR</button>
            </div>
          </div>
        ))}
      </div>

      <div className="inventory-table-section">
        <h2><FaHistory /> Historial de Inventario</h2>
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>MONTO</th>
              <th>ESTADO</th>
              <th>FECHA</th>
              <th>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((h, i) => (
              <tr key={i}>
                <td><strong>{h.producto}</strong></td>
                <td className="prod-price-green">{h.venta || h.total}</td>
                <td><span className={`badge-historial ${h.estado.toLowerCase()}`}>{h.estado}</span></td>
                <td>{h.fechaAccion}</td>
                <td><button className="btn-table-recompra" onClick={() => window.location.href = "http://localhost:3000/carrito"}><FaShoppingCart /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;