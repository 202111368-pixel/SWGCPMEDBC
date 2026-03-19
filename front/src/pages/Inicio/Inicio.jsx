import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import "./Inicio.css";
import muebleImg from "../../assets/nicolas.jpg"; 

const Inicio = () => {
  return (
    <div className="inicio-page">
      <Navbar />

      <section className="hero-crea">
        <div className="hero-visual">
          <div 
            className="hero-img-3d" 
            style={{ backgroundImage: `url(${muebleImg})` }}
          ></div>
          <div className="hero-mask"></div>
        </div>

        <div className="hero-content-left">
          <div className="hero-tag">
            <FaChartLine /> <span>Líderes en Melamina</span>
          </div>
          <h1>
            Convierte tu espacio en el <br />
            <span>Lugar que siempre soñaste</span>
          </h1>
          <p className="hero-description">
            Diseñamos mobiliario de alta ingeniería que inspira y potencia tu estilo de vida con acabados de lujo.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary">Ver Catálogo <FaArrowRight /></button>
            <button className="btn-outline">Solicitar Presupuesto</button>
          </div>

          <div className="hero-stats-container">
            <div className="stat-item">
              <h3>15+</h3>
              <p>Años de trayectoria</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Clientes satisfechos</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Proyectos entregados</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;