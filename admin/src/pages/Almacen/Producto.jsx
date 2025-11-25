import React from "react";
import "../../styles/pages/Almacen.css";

const Producto = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Productos de Melamina</h2>
      <p className="page-description">
        Gestiona los productos de melamina, sus medidas, espesores y acabados.
      </p>

      <div className="card">
        <p className="empty-state">
          Aquí irá la tabla de productos, formulario de registro y edición.
        </p>
      </div>
    </div>
  );
};

export default Producto;
