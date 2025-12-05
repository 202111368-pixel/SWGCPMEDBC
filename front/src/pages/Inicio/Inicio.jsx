import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Inicio.css";

import muebleImg from "../../assets/nicolas.jpg"; 

const Inicio = () => {
  return (
    <>
      <Navbar />

      <section className="hero-crea">
        <div className="hero-left">
          <h1>
            Diseñamos y construimos <br /> muebles únicos
          </h1>

          <p className="hero-description">
            Especialistas en muebles de melamina de alta calidad. Desde el
            diseño hasta la instalación, creamos espacios funcionales y elegantes
            para tu hogar u oficina.
          </p>

          <div className="hero-buttons">
            <button className="btn-dark">Ver Catálogo →</button>
            <button className="btn-light">Solicitar Presupuesto</button>
          </div>

          <div className="hero-stats">
            <div>
              <h2>15+</h2>
              <p>Años de experiencia</p>
            </div>
            <div>
              <h2>500+</h2>
              <p>Clientes satisfechos</p>
            </div>
            <div>
              <h2>1000+</h2>
              <p>Proyectos realizados</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src={muebleImg} alt="Mueble de melamina" />
        </div>
      </section>
    </>
  );
};

export default Inicio;
