import React from 'react';
import "../../styles/pages/Cajero/Pago.css";

const Pago = () => {
  return (
    <div className="seccion-paso fade-in">
      <h3>Método de Pago</h3>
      <div className="opciones-pago">
        <button className="pago-card">Tarjeta de Crédito</button>
        <button className="pago-card">Yape / Plin</button>
      </div>
    </div>
  );
};

export default Pago;