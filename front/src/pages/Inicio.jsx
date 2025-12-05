import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="inicio-container">
      <header className="navbar">
        <div className="navbar-left">
          <h2 className="logo">DBARY <span>COMPANY</span></h2>
        </div>

        <nav className="navbar-center">
          <a href="#">Inicio</a>
          <a href="#">Producto</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>
          <a href="#">Denuncia</a>
        </nav>

        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

    </div>
  );
}

export default Inicio;
