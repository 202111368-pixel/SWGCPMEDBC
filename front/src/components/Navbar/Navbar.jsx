import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // redirige al login
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="logo">DBARY <span>COMPANY</span></h2>
      </div>

      <nav className="navbar-center">
        <Link to="/inicio">Inicio</Link>
        <Link to="/producto">Producto</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/denuncia">Denuncia</Link>
      </nav>

      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
