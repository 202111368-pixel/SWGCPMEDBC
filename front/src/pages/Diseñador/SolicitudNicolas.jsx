import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronRight, FaHammer, FaArrowLeft, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import "./SolicitudNicolas.css"; 
import nicolasImg from "../../assets/nicolas.jpg"; 
import cocinaImg from "../../img/DiseñadorImg/cocina.jpg";
import planoImg from "../../img/DiseñadorImg/plano.jpg";

const SolicitudNicolas = () => {
  const [muebleDeseado, setMuebleDeseado] = useState("");
  const [tipoEspacio, setTipoEspacio] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const despieceCocina = [
    { nombre: "LATERALES", cantidad: 2, largo: 750, ancho: 580, espesor: "18MM" },
    { nombre: "PISO", cantidad: 1, largo: 864, ancho: 580, espesor: "18MM" },
    { nombre: "ZÓCALO", cantidad: 2, largo: 864, ancho: 100, espesor: "18MM" },
    { nombre: "LAZOS DE AMARRE (Techo)", cantidad: 2, largo: 864, ancho: 70, espesor: "18MM" },
    { nombre: "LATERAL CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 500, espesor: "18MM" },
    { nombre: "HORIZ. CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 806, espesor: "18MM" },
    { nombre: "TAPAS DE CAJÓN", cantidad: 3, largo: 247, ancho: 896, espesor: "18MM" },
  ];

  const handleSubmitNicolas = (e) => {
    e.preventDefault();
    setMostrarResultado(true);
    setMostrarGaleria(false); 
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
                      onClick={() => {
                        setMuebleDeseado(opcion);
                        setMostrarResultado(false);
                        setMostrarGaleria(false);
                      }}
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
                      onClick={() => {
                        setTipoEspacio(espacio);
                        setMostrarResultado(false);
                        setMostrarGaleria(false);
                      }}
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

            {mostrarResultado && muebleDeseado === "Cocina" && (
              <div className="resultado-despiece-container" style={{ marginTop: "30px", borderTop: "2px solid #e0e0e0", paddingTop: "20px" }}>
                <h3 style={{ color: "#8B5A2B", marginBottom: "15px" }}>Optimización de Melamina Generada</h3>
                
                <div className="acciones-resultado" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  <a 
                    href="https://www.coohom.com/pub/tool/bim/cloud?redirecturl=/pub/saas/workbench&designid=3FO3EK2RJXIU&newproject=Design&em=0&cfloorplan=1&locale=es_ES" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-ver-coohom"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", borderRadius: "5px", textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}
                  >
                    <FaExternalLinkAlt /> Ver en Coohom 3D
                  </a>
                  
                  <button 
                    type="button"
                    onClick={() => setMostrarGaleria(true)}
                    className="btn-ver-imagenes"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 15px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
                  >
                    <FaEye /> Ver Planos e Imágenes
                  </button>
                </div>

                <div className="layout-tecnico-split" style={{ display: "flex", gap: "25px", alignItems: "flex-start", flexWrap: "wrap" }}>
                  
                  <div className="tabla-responsiva" style={{ flex: "1", minWidth: "300px", overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                          <th style={{ padding: "10px" }}>NOMBRES</th>
                          <th style={{ padding: "10px" }}>CANTIDADES</th>
                          <th style={{ padding: "10px" }}>LARGO (mm)</th>
                          <th style={{ padding: "10px" }}>ANCHO (mm)</th>
                          <th style={{ padding: "10px" }}>ESPESOR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {despieceCocina.map((item, index) => (
                          <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px", fontWeight: "500" }}>{item.nombre}</td>
                            <td style={{ padding: "10px" }}>{item.cantidad}</td>
                            <td style={{ padding: "10px" }}>{item.largo}</td>
                            <td style={{ padding: "10px" }}>{item.ancho}</td>
                            <td style={{ padding: "10px", color: "#666" }}>{item.espesor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {mostrarGaleria && (
                    <div 
                      className="galeria-planos-derecha" 
                      style={{ 
                        flex: "1", 
                        minWidth: "320px", 
                        backgroundColor: "#fafafa", 
                        padding: "15px", 
                        borderRadius: "8px", 
                        border: "1px solid #e8e8e8",
                        animation: "fadeIn 0.4s ease-in-out" 
                      }}
                    >
                      <h4 style={{ marginBottom: "15px", color: "#333", fontSize: "15px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
                        Imágenes de Referencia del Espacio:
                      </h4>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "12px", color: "#555", fontWeight: "bold", marginBottom: "6px" }}>Vista Render 3D Lineal</p>
                          <img 
                            src={cocinaImg} 
                            alt="Render Cocina" 
                            style={{ width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }} 
                          />
                        </div>
                        
                        <div style={{ textAlign: "center" }}>
                          <p style={{ fontSize: "12px", color: "#555", fontWeight: "bold", marginBottom: "6px" }}>Plano de Distribución en Planta</p>
                          <img 
                            src={planoImg} 
                            alt="Plano Distribucion" 
                            style={{ width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  );
};

export default SolicitudNicolas;