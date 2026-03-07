import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaSearch, FaMicrophone } from 'react-icons/fa';
import './Inicio.css';

function Inicio() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

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
          <a href="#">Blog</a>
          <a href="#">Marcas</a>
        </nav>

        <div className="navbar-right">
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="hero-ia">
        <div className="hero-content">
          <span className="badge-ia">Powered by DBARY AI</span>
          <h1>Diseña el futuro de tu <span>Hogar</span></h1>
          <p>Usa nuestro asistente con IA para encontrar el mueble perfecto o diseñar tu espacio ideal en segundos.</p>
          
          <div className="ia-search-container">
            <FaRobot className="ia-icon-inside" />
            <input 
              type="text" 
              placeholder="Dime qué buscas... (Ej: Una cocina minimalista color gris)" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="ia-btn-search">
              <FaSearch />
            </button>
            <FaMicrophone className="mic-icon" />
          </div>
        </div>
      </main>

      <div className="ai-float-button">
        <div className="ai-tooltip">¿En qué puedo ayudarte hoy?</div>
        <FaRobot />
      </div>
    </div>
  );
}

export default Inicio;