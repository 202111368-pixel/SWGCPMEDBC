import React from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../../components/Navbar/Navbar";
import { FaHammer, FaLaptopCode, FaChevronRight } from "react-icons/fa";
import "./Diseñador.css"; 
import nicolasImg from "../../assets/nicolas.jpg"; 
import img1Img from "../../assets/christian.jpg"; 

const Diseñador = () => {
  return (
    <div className="marcas-page-wrapper">
      <Navbar />
      
      <div className="menu-disenadores-container">
        <header className="menu-disenadores-header">
          <h1>¿Qué tipo de proyecto deseas realizar?</h1>
          <p>Selecciona al profesional ideal para tu requerimiento</p>
        </header>

        <div className="disenadores-grid">
          
          {/* Tarjeta de Acceso a Nicolás */}
          <div className="disenador-card">
            <div className="disenador-card-img-box">
              <img src={nicolasImg} alt="Carpintería" />
              <div className="disenador-card-badge">
                <FaHammer /> Carpintería
              </div>
            </div>
            <div className="disenador-card-body">
              <h2>Nicolás</h2>
              <p>Especialista en diseño, fabricación e instalación de muebles a medida para cocinas, cuartos y locales.</p>
              <Link to="/diseñador/nicolas" className="disenador-card-btn nicolas-color">
                <span>Solicitar a Nicolás</span> <FaChevronRight size={12} />
              </Link>
            </div>
          </div>

          {/* Tarjeta de Acceso a Christian */}
          <div className="disenador-card">
            <div className="disenador-card-img-box">
              <img src={img1Img} alt="Ingeniería Civil" />
              <div className="disenador-card-badge civil-blue">
                <FaLaptopCode /> Arquitectura
              </div>
            </div>
            <div className="disenador-card-body">
              <h2>Christian</h2>
              <p>Modelado 3D, desarrollo de planos estructurales, distribución de interiores y diseño asistido por computadora.</p>
              <Link to="/diseñador/christian" className="disenador-card-btn christian-color">
                <span>Solicitar a Christian</span> <FaChevronRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Diseñador;