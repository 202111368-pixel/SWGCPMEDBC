import React from "react";
import "../../styles/pages/Inventario.css";

const VerInventario = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Inventario General</h2>
      <p className="page-description">
        Visualiza el stock actual de tableros, cantos y accesorios de melamina.
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí irá el reporte de inventario con filtros por almacén, tipo y estado.
        </p>
      </div>
    </div>
  );
};

export default VerInventario;
