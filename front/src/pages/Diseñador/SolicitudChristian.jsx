import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FaDraftingCompass, FaLaptopCode, FaArrowLeft } from "react-icons/fa";
import "./SolicitudChristian.css"; 
import img1Img from "../../assets/christian.jpg"; 

const SolicitudChristian = () => {
  const [proyectoEstructura, setProyectoEstructura] = useState("");
  const [tipoInmuebleCivil, setTipoInmuebleCivil] = useState("");

  const handleSubmitChristian = (e) => {
    e.preventDefault();
        const datosCaja = {
      mueble: proyectoEstructura,  
      espacio: tipoInmuebleCivil
    };

    const dataString = encodeURIComponent(JSON.stringify(datosCaja));
        window.location.href = `http://localhost:3000/admin/disenador/arquitecto?data=${dataString}`;
  };

  return (
    <div className="christian-page-wrapper">
      <Navbar />
      
      <div className="back-btn-container">
        <Link to="/diseñador" className="back-link">
          <FaArrowLeft size={12} /> Volver a diseñadores
        </Link>
      </div>

      <div className="christian-central-wrapper">
        <section className="christian-container">
          
          <div className="christian-left-image">
            <img src={img1Img} alt="Arquitectura" className="christian-hero-img" />
            <div className="christian-overlay-badge">
              <FaLaptopCode /> Christian
            </div>
          </div>

          <div className="christian-right-content">
            <header className="christian-header">
              <div className="christian-badge-ia">Modelado 3D y Planos</div>
              <h1>Arquitectura</h1>
              <p className="christian-subtitulo">Medimos todo en computadora para un modelado perfecto.</p>
            </header>

            <form onSubmit={handleSubmitChristian} className="christian-form">
              <div className="christian-form-group">
                <label className="christian-label">1. ¿Qué plano o modelo requieres?</label>
                <div className="christian-options-grid">
                  {["Plano 2D", "Modelo 3D", "Estructura", "Interiores"].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={`christian-option-btn ${proyectoEstructura === opcion ? "selected" : ""}`}
                      onClick={() => setProyectoEstructura(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="christian-form-group">
                <label className="christian-label">2. ¿Tipo de edificación?</label>
                <div className="christian-options-grid">
                  {["Casa", "Depa", "Tienda", "Trabajo"].map((espacio) => (
                    <button
                      key={espacio}
                      type="button"
                      className={`christian-option-btn ${tipoInmuebleCivil === espacio ? "selected" : ""}`}
                      onClick={() => setTipoInmuebleCivil(espacio)}
                    >
                      {espacio}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="christian-submit-btn" disabled={!proyectoEstructura || !tipoInmuebleCivil}>
                <span>Solicitar a Christian</span> <FaDraftingCompass size={14} />
              </button>
            </form>

          </div>
        </section>
      </div>
    </div>
  );
};

export default SolicitudChristian;