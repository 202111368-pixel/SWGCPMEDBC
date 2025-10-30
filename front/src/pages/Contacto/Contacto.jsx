import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Contacto.css';

const Contacto = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Contacto</h1>
        <p>Puedes comunicarte con nosotros mediante este formulario o correo.</p>
      </div>
    </>
  );
};

export default Contacto;
