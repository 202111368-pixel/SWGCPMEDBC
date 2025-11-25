import React from "react";
import "../../styles/pages/Produccion.css";

const PlanificarProduccion = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Planificación de Producción</h2>
      <p className="page-description">
        Define las órdenes de corte, armado y acabado de proyectos en melamina.
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí podrás programar la carga de trabajo por día y por operario.
        </p>
      </div>
    </div>
  );
};

export default PlanificarProduccion;
