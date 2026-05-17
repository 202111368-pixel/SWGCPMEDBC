import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronRight, FaHammer, FaDraftingCompass, FaLaptopCode } from "react-icons/fa";
import "./Diseñador.css"; 
import nicolasImg from "../../assets/nicolas.jpg"; 
import img1Img from "../../assets/christian.jpg"; 

const Diseñador = () => {
  const [muebleDeseado, setMuebleDeseado] = useState("");
  const [tipoEspacio, setTipoEspacio] = useState("");

  const [proyectoEstructura, setProyectoEstructura] = useState("");
  const [tipoInmuebleCivil, setTipoInmuebleCivil] = useState("");

  const handleSubmitNicolas = (e) => {
    e.preventDefault();
    alert(`[Carpintería - Nicolás] Solicitud enviada`);
  };

  const handleSubmitChristian = (e) => {
    e.preventDefault();
    alert(`[Ingeniería Civil - Christian] Solicitud enviada`);
  };

  return (
    <div className="marcas-page-wrapper">
      <Navbar />
      
      <div className="disenador-central-wrapper">
        
        <section className="amedida-container">
          <div className="amedida-left-image">
            <img src={nicolasImg} alt="Carpintería" className="carpinteria-hero-img" />
            <div className="image-overlay-badge">
              <FaHammer /> Nicolás
            </div>
          </div>

          <div className="amedida-right-content">
            <header className="amedida-header">
              <div className="badge-ia">Proyectos Personalizados</div>
              <h1>Carpintería</h1>
              <p className="subtitulo">
                Diseñamos y fabricamos tus muebles exactamente a la medida.
              </p>
            </header>

            <form onSubmit={handleSubmitNicolas} className="amedida-form">
              <div className="form-group-custom">
                <label className="form-label-custom">1. ¿Qué deseas diseñar?</label>
                <div className="options-grid-custom">
                  {["Cocina", "Cuarto", "Baño", "Tienda", "Especial"].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={`option-btn-custom ${muebleDeseado === opcion ? "selected" : ""}`}
                      onClick={() => setMuebleDeseado(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group-custom">
                <label className="form-label-custom">2. ¿Dónde se instalará?</label>
                <div className="options-grid-custom">
                  {["Casa", "Departamento", "Tienda", "Trabajo"].map((espacio) => (
                    <button
                      key={espacio}
                      type="button"
                      className={`option-btn-custom ${tipoEspacio === espacio ? "selected" : ""}`}
                      onClick={() => setTipoEspacio(espacio)}
                    >
                      {espacio}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-btn-amedida" disabled={!muebleDeseado || !tipoEspacio}>
                <span>Solicitar a Nicolás</span> <FaChevronRight size={14} />
              </button>
            </form>
          </div>
        </section>

        <section className="amedida-container civil-section-spacing">
          <div className="amedida-left-image">
            <img src={img1Img} alt="Ingeniería Civil" className="carpinteria-hero-img" />
            <div className="image-overlay-badge civil-badge">
              <FaLaptopCode /> Christian
            </div>
          </div>

          <div className="amedida-right-content">
            <header className="amedida-header">
              <div className="badge-ia civil-tag">Modelado 3D y Planos</div>
              <h1>Ingeniería Civil</h1>
              <p className="subtitulo">
                Medimos todo en computadora para un modelado perfecto.
              </p>
            </header>

            <form onSubmit={handleSubmitChristian} className="amedida-form">
              <div className="form-group-custom">
                <label className="form-label-custom">1. ¿Qué plano o modelo requieres?</label>
                <div className="options-grid-custom">
                  {["Plano 2D", "Modelo 3D", "Estructura", "Interiores"].map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      className={`option-btn-custom civil-btn ${proyectoEstructura === opcion ? "selected" : ""}`}
                      onClick={() => setProyectoEstructura(opcion)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group-custom">
                <label className="form-label-custom">2. ¿Tipo de edificación?</label>
                <div className="options-grid-custom">
                  {["Casa", "Depa", "Tienda", "Trabajo"].map((espacio) => (
                    <button
                      key={espacio}
                      type="button"
                      className={`option-btn-custom civil-btn ${tipoInmuebleCivil === espacio ? "selected" : ""}`}
                      onClick={() => setTipoInmuebleCivil(espacio)}
                    >
                      {espacio}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-btn-amedida civil-submit-btn" disabled={!proyectoEstructura || !tipoInmuebleCivil}>
                <span>Solicitar a Christian</span> <FaDraftingCompass size={14} />
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Diseñador;