import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import { 
  FaTools, FaEye, FaExternalLinkAlt, FaArrowLeft, FaBuilding 
} from "react-icons/fa";
import "../../styles/pages/Taller/carpinteria.css"; 

import cocinaImg from "../../img/DiseñadorImg/cocina.jpg";
import planoImg from "../../img/DiseñadorImg/plano.jpg";

const Taller = () => {
  const [mostrarGaleriaCarpintero, setMostrarGaleriaCarpintero] = useState(false);
  const [tipoMuebleMelamina, setTipoMuebleMelamina] = useState("Mueble para Oficina");

  const queryParams = new URLSearchParams(window.location.search);
  const dataRaw = queryParams.get("data");
  
  let solicitud = { mueble: "No especificado", espacio: "No especificado" };

  if (dataRaw) {
    try {
      solicitud = JSON.parse(decodeURIComponent(dataRaw));
    } catch (error) {
      console.error(error);
    }
  }

  const despieceCocina = [
    { nombre: "LATERALES ESCRITORIO", cantidad: 2, largo: 750, ancho: 600, espesor: "18MM" },
    { nombre: "TABLERO PRINCIPAL MELAMINA", cantidad: 1, largo: 1200, ancho: 600, espesor: "18MM" },
    { nombre: "FALDÓN REFUERZO", cantidad: 1, largo: 1164, ancho: 400, espesor: "18MM" },
    { nombre: "LAZOS DE AMARRE", cantidad: 2, largo: 1164, ancho: 70, espesor: "18MM" },
    { nombre: "LATERAL CAJONERA", cantidad: 4, largo: 150, ancho: 450, espesor: "18MM" },
    { nombre: "CONTRA FRENTE CAJÓN", cantidad: 4, largo: 150, ancho: 350, espesor: "18MM" },
    { nombre: "TAPAS DE REGISTRO / CAJÓN", cantidad: 3, largo: 180, ancho: 396, espesor: "18MM" },
  ];

  const cambiarEstructuraMelamina = () => {
    if (tipoMuebleMelamina === "Mueble para Oficina") {
      setTipoMuebleMelamina("Mueble Modular de Melamina");
    } else {
      setTipoMuebleMelamina("Mueble para Oficina");
    }
  };

  return (
    <div className="inv-page fade-in" style={{ fontFamily: 'sans-serif' }}>
      
      <div className="inv-back-container">
        <Link to={-1} className="inv-back-link">
          <FaArrowLeft size={12} /> Volver a la solicitud
        </Link>
      </div>

      <header className="inv-page-header">
        <div className="inv-brand">
          <div className="inv-icon-box"><FaBuilding /></div>
          <div>
            <h1>Panel Integrado de Diseño y Manufactura</h1>
            <p className="inv-subtitle">Módulo Especializado de Carpintería</p>
          </div>
        </div>
      </header>

      <div className="inv-table-container">
        <div className="module-padding">
          <header className="module-header-border text-center">
            <h2><FaTools color="#8B5A2B" /> Módulo de Carpintería - Panel de Production</h2>
            <p>Orden de fabricación y armado en melamina asignada a taller.</p>
          </header>

          <div className="module-summary-box-carpinteria">
            <h4>Resumen de Requerimiento de Melamina:</h4>
            <p><strong>Estructura a Fabricar:</strong> {solicitud.mueble}</p>
            <p><strong>Tipo de Configuración Establecida:</strong> {tipoMuebleMelamina}</p>
            <p><strong>Lugar de Instalación:</strong> {solicitud.espacio}</p>
          </div>

          <div className="module-actions-wrap">
            <button type="button" onClick={cambiarEstructuraMelamina} className="btn-structure">
              Definir Estructura: {tipoMuebleMelamina === "Mueble para Oficina" ? "Mueble de Oficina" : "Todo Melamina"}
            </button>
            
            <a href="https://www.coohom.com/pub/tool/bim/cloud?redirecturl=/pub/saas/workbench&designid=3FO3EK2RJXIU&newproject=Design&em=0&cfloorplan=1&locale=es_ES" target="_blank" rel="noopener noreferrer" className="btn-coohom">
              <FaExternalLinkAlt /> Ver en Coohom 3D
            </a>
            
            <button type="button" onClick={() => setMostrarGaleriaCarpintero(!mostrarGaleriaCarpintero)} className="btn-gallery">
              <FaEye /> {mostrarGaleriaCarpintero ? "Ocultar Planos" : "Ver Planos de Despiece"}
            </button>
          </div>

          <div className="module-flex-layout">
            <div className="table-responsive-box">
              <table className="module-table">
                <thead>
                  <tr>
                    <th>NOMBRES DE PIEZAS MELAMINA</th>
                    <th>CANTIDADES</th>
                    <th>LARGO (mm)</th>
                    <th>ANCHO (mm)</th>
                    <th>ESPESOR</th>
                  </tr>
                </thead>
                <tbody>
                  {despieceCocina.map((item, index) => (
                    <tr key={index}>
                      <td className="font-weight-500">{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.largo}</td>
                      <td>{item.ancho}</td>
                      <td className="color-muted">{item.espesor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {mostrarGaleriaCarpintero && (
              <div className="module-gallery-box">
                <h4>Planos del Espacio ({solicitud.mueble}):</h4>
                <div className="gallery-flex">
                  <div className="gallery-item">
                    <p>Vista Render 3D Lineal</p>
                    <img src={cocinaImg} alt="Render" />
                  </div>
                  <div className="gallery-item">
                    <p>Plano de Distribución en Planta</p>
                    <img src={planoImg} alt="Plano" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taller;