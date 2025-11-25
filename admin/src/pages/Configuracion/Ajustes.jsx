import React from "react";
import "../../styles/pages/Configuracion.css";

const Ajustes = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Ajustes del Sistema</h2>
      <p className="page-description">
        Configura parámetros generales: moneda, impuestos, series de documentos y más.
      </p>

      <div className="card">
        <p className="empty-state">
          Sección para ajustes generales del sistema D’Bary Company.
        </p>
      </div>
    </div>
  );
};

export default Ajustes;
