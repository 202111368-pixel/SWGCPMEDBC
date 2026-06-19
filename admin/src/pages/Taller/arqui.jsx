import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import { 
  FaDraftingCompass, FaEye, FaExternalLinkAlt, FaArrowLeft, FaBuilding 
} from "react-icons/fa";
import "../../styles/pages/Taller/arqui.css"; 

import plano2Img from "../../img/DiseñadorImg/plano2.jpg";
import plano3Img from "../../img/DiseñadorImg/plano3.jpg";

const Taller = () => {
  const [mostrarGaleriaArquitecto, setMostrarGaleriaArquitecto] = useState(false);

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

  // Lista de despiece optimizada y calculada milimétricamente por el arquitecto
  const despieceArquitectura = [
    { nombre: "LATERALES ESCRITORIO", cantidad: 2, largo: 750, ancho: 600, espesor: "18MM" },
    { nombre: "TABLERO PRINCIPAL MELAMINA", cantidad: 1, largo: 1200, ancho: 600, espesor: "18MM" },
    { nombre: "FALDÓN REFUERZO", cantidad: 1, largo: 1164, ancho: 400, espesor: "18MM" },
    { nombre: "LAZOS DE AMARRE", cantidad: 2, largo: 1164, ancho: 70, espesor: "18MM" },
    { nombre: "LATERAL CAJONERA", cantidad: 4, largo: 150, ancho: 450, espesor: "18MM" },
    { nombre: "CONTRA FRENTE CAJÓN", cantidad: 4, largo: 150, ancho: 350, espesor: "18MM" },
    { nombre: "TAPAS DE REGISTRO / CAJÓN", cantidad: 3, largo: 180, ancho: 396, espesor: "18MM" },
  ];

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
            <h1>Panel de Control del Arquitecto en Taller</h1>
            <p className="inv-subtitle">Ingeniería del Mueble, Optimización y Ajuste Técnico</p>
          </div>
        </div>
      </header>

      <div className="inv-table-container">
        <div className="module-padding">
          <header className="module-header-border text-center-blue">
            <h2><FaDraftingCompass color="#007bff" /> Módulo de Arquitectura - Supervisión y Ajustes</h2>
            <p>Monitoreo técnico antes del proceso de corte y armado por carpintería.</p>
          </header>

          {/* SECCIONES REFLEJANDO LOS PUNTOS 1, 3 Y 5 */}
          <div className="module-summary-box-arquitectura" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <h4>1. Medidas Reales de Obra:</h4>
              <p><strong>Estructura / Mueble:</strong> {solicitud.mueble}</p>
              <p><strong>Espacio Destino:</strong> {solicitud.espacio}</p>
              <p style={{ fontSize: '12px', color: '#555' }}>* Verificado en campo con escáner láser para prever falsas escuadras.</p>
            </div>
            
            <div>
              <h4>3. Optimización de Planchas:</h4>
              <p><strong>Espesor Base:</strong> 18 mm</p>
              <p><strong>Eficiencia del Tetris:</strong> 92% de aprovechamiento</p>
              <p style={{ fontSize: '12px', color: '#555' }}>* Distribución calculada por software para minimizar mermas de melamina.</p>
            </div>

            <div>
              <h4>5. Integración de Redes:</h4>
              <p><strong>Puntos Críticos:</strong> Cajas de luz e instalaciones</p>
              <p><strong>Pasacables / Ductos:</strong> Incorporados en despiece</p>
              <p style={{ fontSize: '12px', color: '#555' }}>* Perforaciones planificadas para evitar colisiones con agua, gas o electricidad.</p>
            </div>
          </div>

          <div className="module-actions-wrap">
            <a href="https://www.coohom.com/pub/modelo/viewer/preview/3FO3EK2RJXIU?hl=es_ES" target="_blank" rel="noopener noreferrer" className="btn-coohom">
              <FaExternalLinkAlt /> Ver Plano de Optimización 3D
            </a>
            <button type="button" onClick={() => setMostrarGaleriaArquitecto(!mostrarGaleriaArquitecto)} className="btn-gallery-blue">
              <FaEye /> {mostrarGaleriaArquitecto ? "Ocultar Planos Técnicos" : "Ver Planos de Redes y Medidas"}
            </button>
          </div>

          <div className="module-flex-layout">
            <div className="table-responsive-box">
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Lista de Despiece Final (Ajustada en Milímetros)</h3>
              <table className="module-table">
                <thead>
                  <tr>
                    <th>NOMBRES DE PIEZAS (CÁLCULO ARQUITECTURA)</th>
                    <th>CANTIDADES</th>
                    <th>LARGO (mm)</th>
                    <th>ANCHO (mm)</th>
                    <th>ESPESOR</th>
                  </tr>
                </thead>
                <tbody>
                  {despieceArquitectura.map((item, index) => (
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

            {mostrarGaleriaArquitecto && (
              <div className="module-gallery-box">
                <h4>Planos Técnicos (Control de Campo y Redes):</h4>
                <div className="gallery-flex">
                  <div className="gallery-item">
                    <p>Elevación y Descuentos Técnicos (Plano 2)</p>
                    <img src={plano2Img} alt="Plano Medidas" />
                  </div>
                  <div className="gallery-item">
                    <p>Planta de Instalaciones y Redes (Plano 3)</p>
                    <img src={plano3Img} alt="Plano Redes" />
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