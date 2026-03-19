import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRobot, FaSearch, FaMicrophone, FaSignOutAlt, FaWaveSquare } from 'react-icons/fa';
import './Inicio.css';
import muebleImg from "../../assets/nicolas.jpg"; 

function Inicio() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="inicio-container">
      <div className="ai-grid-overlay"></div>
      
      <header className="navbar-ia">
        <div className="navbar-left">
          <h2 className="logo-ia">DBARY <span>AI</span></h2>
        </div>

        <nav className="navbar-center-ia">
          <Link to="/inicio" className="nav-link-ai">Inicio</Link>
          <Link to="/productos" className="nav-link-ai">Productos</Link>
          <Link to="/nosotros" className="nav-link-ai">Nosotros</Link>
          <Link to="/contacto" className="nav-link-ai">Contacto</Link>
          <Link to="/denuncia" className="nav-link-ai">Denuncia</Link>
          <Link to="/blog" className="nav-link-ai">Blog</Link>
          <Link to="/marcas" className="nav-link-ai">Marcas</Link>
        </nav>

        <div className="navbar-right">
          <button className="logout-btn-ia" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Salir</span>
          </button>
        </div>
      </header>

      <main className="hero-ia">
        <div className="hero-bg-container">
          <div 
            className="hero-bg-3d" 
            style={{ backgroundImage: `url(${muebleImg})` }}
          ></div>
          <div className="hero-overlay-ia"></div>
        </div>

        <div className="hero-content-ia">
          <div className="ai-status">
            <span className="dot"></span> SISTEMA ACTIVO v3.0
          </div>
          <span className="badge-ia-neon">DBARY INTELLIGENCE</span>
          <h1>Diseña el futuro de tu <span>Hogar</span></h1>
          <p className="hero-description">
            Nuestra IA procesa tus ideas para transformarlas en muebles de melamina con precisión milimétrica.
          </p>
          
          <div className="ia-search-box">
            <div className="ia-scan-line"></div>
            <FaRobot className="ia-icon-main" />
            <input 
              type="text" 
              placeholder="Ej: 'Diseña una cocina minimalista en gris humo'..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="ia-actions">
              <FaMicrophone className="mic-icon-ia" />
              <button className="ia-btn-search-neon">
                <FaSearch />
              </button>
            </div>
          </div>
          
          <div className="ai-features-mini">
            <span><FaWaveSquare /> Procesamiento en tiempo real</span>
            <span>•</span>
            <span>Renderizado 3D inmediato</span>
          </div>
        </div>
      </main>

      <div className="ai-float-master">
        <div className="ai-ping"></div>
        <FaRobot />
        <div className="ai-tooltip-ia">¿Iniciamos un nuevo diseño?</div>
      </div>
    </div>
  );
}

export default Inicio;