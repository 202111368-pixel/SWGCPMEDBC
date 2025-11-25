import React from "react";
import "../../styles/pages/Inventario.css";

const Movimientos = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Movimientos de Inventario</h2>
      <p className="page-description">
        Registro de ingresos, salidas y ajustes de stock de melamina.
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí se listarán los movimientos por fecha, usuario y tipo.
        </p>
      </div>
    </div>
  );
};

export default Movimientos;
