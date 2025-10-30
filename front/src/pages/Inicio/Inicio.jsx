import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Inicio.css';

const Inicio = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Bienvenido al Sistema</h1>
        <p>Has iniciado sesión correctamente 🎉</p>
      </div>
    </>
  );
};

export default Inicio;
