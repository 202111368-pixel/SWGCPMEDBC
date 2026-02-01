import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(0);

  const handleLogout = () => {
    navigate('/');
  };

  const goToCarrito = () => {
    navigate('/carrito');
  };

  const actualizarCantidad = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCantidad(carrito.length);
  };

  useEffect(() => {
    actualizarCantidad();

    window.addEventListener("carritoActualizado", actualizarCantidad);
    return () => {
      window.removeEventListener("carritoActualizado", actualizarCantidad);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="logo">
          DBARY <span>COMPANY</span>
        </h2>
      </div>

      <nav className="navbar-center">
        <Link to="/inicio">Inicio</Link>
        <Link to="/producto">Producto</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/denuncia">Denuncia</Link>
      </nav>

      <div className="navbar-right">
        <div className="carrito-icon" onClick={goToCarrito}>
          <FaShoppingCart />
          <span className="carrito-count">{cantidad}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
