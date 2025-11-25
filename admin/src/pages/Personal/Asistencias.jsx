import React from "react";
import "../../styles/pages/Personal.css";

const Asistencias = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Asistencias</h2>
      <p className="page-description">
        Control de asistencia, horarios y turnos del personal.
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí se mostrará el registro de asistencias por fecha.
        </p>
      </div>
    </div>
  );
};

export default Asistencias;
