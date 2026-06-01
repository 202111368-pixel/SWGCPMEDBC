import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronRight, FaHammer, FaArrowLeft } from "react-icons/fa";
import "./SolicitudNicolas.css"; 
import nicolasImg from "../../assets/nicolas.jpg"; 

const SolicitudNicolas = () => {
  const [muebleDeseado, setMuebleDeseado] = useState("");
  const [tipoEspacio, setTipoEspacio] = useState("");

  const handleSubmitNicolas = (e) => {
    e.preventDefault();
        const datosCaja = {
      mueble: muebleDeseado,
      espacio: tipoEspacio
    };
    const dataString = encodeURIComponent(JSON.stringify(datosCaja));
        window.location.href = `http://localhost:3000/admin/disenador/carpintero?data=${dataString}`;
  };

  return (
    <div className="nicolas-page-wrapper">
      <Navbar />
      
      <div className="back-btn-container">
        <Link to="/diseñador" className="back-link">
          <FaArrowLeft size={12} /> Volver a diseñadores
        </Link>
      </div>

      <div className="nicolas-central-wrapper">
        <section className="nicolas-container">
          
          <div className="nicolas-left-image">
            <img src={nicolasImg} alt="Carpintería" className="nicolas-hero-img" />
            <div className="nicolas-overlay-badge">
              <FaHammer /> Nicolás
            </div>
          </div>

          <div className="nicolas-right-content">
            <header className="nicolas-header">
              <div className="nicolas-badge-ia">Proyectos Personalizados</div>
              <h1>Carpintería</h1>
              <p className="nicolas-subtitulo">Diseñamos y fabricamos tus muebles exactamente a la medida.</p>
            </header>

            <form onSubmit={handleSubmitNicolas} className="nicolas-form">
              <div className="nicolas-form-group">
                <label className="nicolas-label">1. ¿Qué deseas diseñar?</label>
                <div className="nicolas-options-grid">
                  {["Cocina", "Cuarto", "Baño", "Tienda", "Especial"].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={`nicolas-option-btn ${muebleDeseado === opcion ? "selected" : ""}`}
                      onClick={() => setMuebleDeseado(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="nicolas-form-group">
                <label className="nicolas-label">2. ¿Dónde se instalará?</label>
                <div className="nicolas-options-grid">
                  {["Casa", "Departamento", "Tienda", "Trabajo"].map((espacio) => (
                    <button
                      key={espacio}
                      type="button"
                      className={`nicolas-option-btn ${tipoEspacio === espacio ? "selected" : ""}`}
                      onClick={() => setTipoEspacio(espacio)}
                    >
                      {espacio}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="nicolas-submit-btn" disabled={!muebleDeseado || !tipoEspacio}>
                <span>Solicitar a Nicolás</span> <FaChevronRight size={14} />
              </button>
            </form>

          </div>
        </section>
      </div>
    </div>
  );
};

export default SolicitudNicolas;