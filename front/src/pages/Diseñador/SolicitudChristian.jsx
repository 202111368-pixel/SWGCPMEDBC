import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FaDraftingCompass, FaLaptopCode, FaArrowLeft, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import "./SolicitudChristian.css"; 
import img1Img from "../../assets/christian.jpg"; 

// IMPORTAMOS TUS IMÁGENES DESDE LA CARPETA DiseñadorImg
import plano2Img from "../../img/DiseñadorImg/plano2.jpg";
import plano3Img from "../../img/DiseñadorImg/plano3.jpg";

const SolicitudChristian = () => {
  const [proyectoEstructura, setProyectoEstructura] = useState("");
  const [tipoInmuebleCivil, setTipoInmuebleCivil] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);

  // Tabla técnica con los mismos componentes estructurales para la base del diseño
  const despieceCocina = [
    { nombre: "LATERALES", cantidad: 2, largo: 750, ancho: 580, espesor: "18MM" },
    { nombre: "PISO", cantidad: 1, largo: 864, ancho: 580, espesor: "18MM" },
    { nombre: "ZÓCALO", cantidad: 2, largo: 864, ancho: 100, espesor: "18MM" },
    { nombre: "LAZOS DE AMARRE (Techo)", cantidad: 2, largo: 864, ancho: 70, espesor: "18MM" },
    { nombre: "LATERAL CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 500, espesor: "18MM" },
    { nombre: "HORIZ. CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 806, espesor: "18MM" },
    { nombre: "TAPAS DE CAJÓN", cantidad: 3, largo: 247, ancho: 896, espesor: "18MM" },
  ];

  const handleSubmitChristian = (e) => {
    e.preventDefault();
    setMostrarResultado(true);
    setMostrarGaleria(false); // Reseteamos la galería al recalcular
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
                      onClick={() => {
                        setProyectoEstructura(opcion);
                        setMostrarResultado(false);
                        setMostrarGaleria(false);
                      }}
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
                      onClick={() => {
                        setTipoInmuebleCivil(espacio);
                        setMostrarResultado(false);
                        setMostrarGaleria(false);
                      }}
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

            {/* SECCIÓN INTERACTIVA TRAS EL CLICK */}
            {mostrarResultado && (
              <div className="resultado-despiece-container">
                <h3 className="titulo-seccion-resultado">Optimización y Modelado de Planos</h3>
                
                <div className="acciones-resultado">
                  <a 
                    href="https://www.coohom.com/pub/modelo/viewer/preview/3FO3EK2RJXIU?hl=es_ES" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-ver-coohom"
                  >
                    <FaExternalLinkAlt /> Ver Vista Previa 3D
                  </a>
                  
                  <button 
                    type="button"
                    onClick={() => setMostrarGaleria(true)}
                    className="btn-ver-imagenes"
                  >
                    <FaEye /> Ver Planos Desarrollados
                  </button>
                </div>

                <div className="layout-tecnico-split">
                  
                  {/* Tabla de Despiece */}
                  <div className="tabla-responsiva">
                    <table>
                      <thead>
                        <tr>
                          <th>NOMBRES</th>
                          <th>CANTIDADES</th>
                          <th>LARGO (mm)</th>
                          <th>ANCHO (mm)</th>
                          <th>ESPESOR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {despieceCocina.map((item, index) => (
                          <tr key={index}>
                            <td className="celda-nombre">{item.nombre}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.largo}</td>
                            <td>{item.ancho}</td>
                            <td className="celda-espesor">{item.espesor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Galería a la derecha: Plano 2 y Plano 3 */}
                  {mostrarGaleria && (
                    <div className="galeria-planos-derecha">
                      <h4>Planos y Elevaciones del Proyecto:</h4>
                      
                      <div className="contenedor-imagenes-apiladas">
                        <div className="caja-imagen-item">
                          <p>Elevación Detallada (Plano 2)</p>
                          <img src={plano2Img} alt="Plano 2" />
                        </div>
                        
                        <div className="caja-imagen-item">
                          <p>Plano de Planta Técnico (Plano 3)</p>
                          <img src={plano3Img} alt="Plano 3" />
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

export default SolicitudChristian;