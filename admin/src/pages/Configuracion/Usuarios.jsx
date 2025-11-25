import React from "react";
import "../../styles/pages/Configuracion.css";

const Usuarios = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Usuarios del Sistema</h2>
      <p className="page-description">
        Administra los usuarios y sus roles (almacén, ventas, producción, administración).
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí irá la tabla de usuarios con permisos y estados.
        </p>
      </div>
    </div>
  );
};

export default Usuarios;
