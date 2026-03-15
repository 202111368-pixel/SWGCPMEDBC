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
            "CONVIERTE TU ESPACIO EN EL LUGAR QUE SIEMPRE SOÑASTE"<br /> 
          </h1>
          <p className="hero-description">
            Diseñamos espacios que inspiran y potencian tu ESTILO DE VIDA
          </p>
          <div className="hero-buttons">
            <button className="btn-dark">Ver Catálogo →</button>
            <button className="btn-light">Solicitar Presupuesto</button>
          </div>
          <div className="hero-stats">
            <div><h2>15+</h2><p>Años de experiencia</p></div>
            <div><h2>500+</h2><p>Clientes satisfechos</p></div>
            <div><h2>1000+</h2><p>Proyectos realizados</p></div>
          </div>
        </div>

        <div className="hero-right">
          <div className="image-container-3d">
            <img src={muebleImg} alt="Mueble de melamina" className="image-3d" />
          </div>
        </div>
      </section>

      <section className="video-section">
        <h2 className="video-title">Nuestros Proyectos en Video</h2>
        <div className="video-grid">
          <div className="video-card">
            <iframe src="https://www.youtube.com/embed/rDWRARlVe-E" title="Video 1" allowFullScreen></iframe>
          </div>
          <div className="video-card">
            <iframe src="https://www.youtube.com/embed/PaRfCWrlo4w" title="Video 2" allowFullScreen></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inicio;