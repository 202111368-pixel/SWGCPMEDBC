import React from 'react';
import "../../styles/pages/Cajero/Cupon.css";

const Cupon = () => {
  return (
    <div className="seccion-paso fade-in">
      <h3>Aplicar Cupón de Descuento</h3>
      <div className="cupon-flex">
        <input type="text" placeholder="Introduce tu código" className="modal-input" />
        <button className="btn-aplicar">APLICAR</button>
      </div>
    </div>
  );
};

export default Cupon;