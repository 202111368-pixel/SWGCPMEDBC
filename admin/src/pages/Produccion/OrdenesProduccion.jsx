import React from "react";
import "../../styles/pages/Produccion.css";

const OrdenesProduccion = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Órdenes de Producción</h2>
      <p className="page-description">
        Seguimiento de órdenes de producción y su estado (en proceso, terminado, entregado).
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí se listarán las órdenes ya generadas.
        </p>
      </div>
    </div>
  );
};

export default OrdenesProduccion;
