import React from "react";
import "../../styles/pages/Personal.css";

const Empleados = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Empleados</h2>
      <p className="page-description">
        Gestión del personal de ventas, almacén, producción y administración.
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí irá la ficha del personal con datos de contacto y rol.
        </p>
      </div>
    </div>
  );
};

export default Empleados;
