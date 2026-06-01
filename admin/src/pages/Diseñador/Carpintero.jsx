import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaEye, FaExternalLinkAlt, FaTools, FaArrowLeft } from "react-icons/fa";
import "../../styles/pages/Diseñador/Carpintero.css"; 

import cocinaImg from "../../img/DiseñadorImg/cocina.jpg";
import planoImg from "../../img/DiseñadorImg/plano.jpg";

const Carpintero = () => {
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const dataRaw = queryParams.get("data");
  
  let solicitud = { mueble: "No especificado", espacio: "No especificado" };

  if (dataRaw) {
    try {
      solicitud = JSON.parse(decodeURIComponent(dataRaw));
    } catch (error) {
      console.error("Error al decodificar los datos de la URL", error);
    }
  }

  const despieceCocina = [
    { nombre: "LATERALES", cantidad: 2, largo: 750, ancho: 580, thickness: "18MM" },
    { nombre: "PISO", cantidad: 1, largo: 864, ancho: 580, thickness: "18MM" },
    { nombre: "ZÓCALO", cantidad: 2, largo: 864, ancho: 100, thickness: "18MM" },
    { nombre: "LAZOS DE AMARRE (Techo)", cantidad: 2, largo: 864, ancho: 70, thickness: "18MM" },
    { nombre: "LATERAL CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 500, thickness: "18MM" },
    { nombre: "HORIZ. CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 806, thickness: "18MM" },
    { nombre: "TAPAS DE CAJÓN", cantidad: 3, largo: 247, ancho: 896, thickness: "18MM" },
  ];

  return (
    <div className="carpintero-container" style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      
      <div style={{ marginBottom: "20px" }}>
        <Link to={-1} style={{ textDecoration: "none", color: "#8B5A2B", display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "14px" }}>
          <FaArrowLeft size={12} /> Volver a la solicitud
        </Link>
      </div>

      <header style={{ borderBottom: "2px solid #8B5A2B", paddingBottom: "15px", marginBottom: "30px" }}>
        <h2 style={{ color: "#333", display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
          <FaTools color="#8B5A2B" /> Módulo de Carpintería - Panel de Producción
        </h2>
        <p style={{ color: "#666", marginTop: "5px" }}>Orden de fabricación asignada a taller.</p>
      </header>
      <div style={{ backgroundColor: "#fdf8f4", border: "1px solid #f1e2d3", borderRadius: "8px", padding: "20px", marginBottom: "30px" }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#8B5A2B" }}>Resumen de Requerimiento:</h4>
        <p style={{ margin: "5px 0" }}><strong>Estructura Solicitada:</strong> {solicitud.mueble}</p>
        <p style={{ margin: "5px 0" }}><strong>Lugar de Instalación:</strong> {solicitud.espacio}</p>
      </div>

      <div className="resultado-despiece-container" style={{ paddingTop: "10px" }}>
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
            onClick={() => setMostrarGaleria(!mostrarGaleria)}
            className="btn-ver-imagenes"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 15px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px", fontWeight: "bold" }}
          >
            <FaEye /> {mostrarGaleria ? "Ocultar Planos" : "Ver Planos e Imágenes"}
          </button>
        </div>

        <div className="layout-tecnico-split" style={{ display: "flex", gap: "25px", alignItems: "flex-start", flexWrap: "wrap" }}>
          
          <div className="tabla-responsiva" style={{ flex: "2", minWidth: "300px", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "12px 10px" }}>NOMBRES</th>
                  <th style={{ padding: "12px 10px" }}>CANTIDADES</th>
                  <th style={{ padding: "12px 10px" }}>LARGO (mm)</th>
                  <th style={{ padding: "12px 10px" }}>ANCHO (mm)</th>
                  <th style={{ padding: "12px 10px" }}>ESPESOR</th>
                </tr>
              </thead>
              <tbody>
                {despieceCocina.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px 10px", fontWeight: "500" }}>{item.nombre}</td>
                    <td style={{ padding: "12px 10px" }}>{item.cantidad}</td>
                    <td style={{ padding: "12px 10px" }}>{item.largo}</td>
                    <td style={{ padding: "12px 10px" }}>{item.ancho}</td>
                    <td style={{ padding: "12px 10px", color: "#666" }}>{item.thickness}</td>
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
                border: "1px solid #e8e8e8"
              }}
            >
              <h4 style={{ marginBottom: "15px", color: "#333", fontSize: "15px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
                Planos del Espacio ({solicitud.mueble}):
              </h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#555", fontWeight: "bold", marginBottom: "6px" }}>Vista Render 3D Lineal</p>
                  <img src={cocinaImg} alt="Render" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "12px", color: "#555", fontWeight: "bold", marginBottom: "6px" }}>Plano de Distribución en Planta</p>
                  <img src={planoImg} alt="Plano" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ccc" }} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Carpintero;