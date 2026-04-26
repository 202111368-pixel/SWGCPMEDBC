import React from 'react';
import "../../styles/pages/Cajero/Facturacion.css";

const Facturacion = () => {
  return (
    <div className="seccion-paso fade-in">
      <h3>Datos de Facturación</h3>
      <div className="form-group">
        <input type="text" placeholder="RUC o DNI" className="modal-input" />
        <input type="text" placeholder="Razón Social" className="modal-input" />
      </div>
    </div>
  );
};

export default Facturacion;