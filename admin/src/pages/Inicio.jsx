import React from "react";
import "../styles/pages/Inicio.css";

const Inicio = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Panel General</h2>
      <p className="page-description">
      </p>

      <div className="cards-grid">
        <div className="card">
          <h3>Resumen de Ventas</h3>
          <p>Próximamente verás aquí indicadores de ventas diarias y mensuales.</p>
        </div>
        <div className="card">
          <h3>Estado de Inventario</h3>
          <p>Control rápido de stock de tableros, cantos y accesorios.</p>
        </div>
        <div className="card">
          <h3>Producción</h3>
          <p>Órdenes de corte y armado en proceso.</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
