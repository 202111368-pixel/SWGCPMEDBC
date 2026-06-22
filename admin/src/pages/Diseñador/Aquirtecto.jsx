import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { FaEye, FaExternalLinkAlt, FaDraftingCompass, FaArrowLeft, FaClipboardList } from "react-icons/fa";
import "../../styles/pages/Diseñador/Arquitecto.css"; 
import plano2Img from "../../img/DiseñadorImg/plano2.jpg";
import plano3Img from "../../img/DiseñadorImg/plano3.jpg";

const Arquitecto = () => {
  const navigate = useNavigate();
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  
  const [respuestas, setRespuestas] = useState({
    ropaLarga: "",
    planoPersonalizado: "",
    importanciaPlano: "",
    servicioProfesional: "",
    comentario: ""
  });

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
    { nombre: "LATERALES", cantidad: 2, largo: 750, ancho: 580, thickness: "18MM", espesor: "18MM" },
    { nombre: "PISO", cantidad: 1, largo: 864, ancho: 580, thickness: "18MM", espesor: "18MM" },
    { nombre: "ZÓCALO", cantidad: 2, largo: 864, ancho: 100, thickness: "18MM", espesor: "18MM" },
    { nombre: "LAZOS DE AMARRE (Techo)", cantidad: 2, largo: 864, ancho: 70, thickness: "18MM", espesor: "18MM" },
    { nombre: "LATERAL CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 500, thickness: "18MM", espesor: "18MM" },
    { nombre: "HORIZ. CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 806, thickness: "18MM", espesor: "18MM" },
    { nombre: "TAPAS DE CAJÓN", cantidad: 3, largo: 247, ancho: 896, thickness: "18MM", espesor: "18MM" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({ ...respuestas, [name]: value });
  };

  const handleEnviarEncuesta = (e) => {
    e.preventDefault();
    setModalAbierto(false);

    const rutaActual = window.location.pathname;

    if (rutaActual.includes("/taller")) {
      navigate(`/admin/disenador/arquitecto`);
    } else {
      navigate(`/admin/taller/arquitecto`);
    }
  };

  return (
    <div className="reportes-main-container">
      <div className="reportes-content-wrapper">
        
        <div className="contenedor-volver-solicitud">
          <Link to={-1} className="back-link-action">
            <FaArrowLeft size={12} /> Volver a la solicitud
          </Link>
        </div>

        <div className="tarjeta-resumen-proyecto">
          <header className="reportes-header-box">
            <h2>
              <FaDraftingCompass /> Módulo de Arquitectura - Panel Técnico de Control
            </h2>
            <p>Modelado y despiece de estructuras civiles.</p>
          </header>

          <div className="box-especificaciones-regulador">
            <h4>Resumen de Requerimiento de Estructura:</h4>
            <div className="grid-especificaciones-valores">
              <p><strong>Estructura a Fabricar:</strong> {solicitud.mueble}</p>
              <p><strong>Lugar de Instalación / Destino:</strong> {solicitud.espacio}</p>
            </div>
          </div>

          <div className="acciones-resultado">
            <a 
              href="https://www.coohom.com/pub/modelo/viewer/preview/3FO3EK2RJXIU?hl=es_ES" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-ver-coohom-azul"
            >
              <FaExternalLinkAlt /> Ver en Coohom 3D
            </a>
            
            <button 
              type="button"
              onClick={() => setMostrarGaleria(!mostrarGaleria)}
              className="btn-ver-planos-verde"
            >
              <FaEye /> {mostrarGaleria ? "Ocultar Planos de Despiece" : "Ver Planos de Despiece"}
            </button>

            <button 
              type="button"
              onClick={() => setModalAbierto(true)}
              className="btn-encuesta-amarillo"
            >
              <FaClipboardList /> Encuesta Técnica
            </button>
          </div>

          <div className="reporte-content-grid">
            
            <div className="table-side">
              <table className="tabla-reporte-ventas">
                <thead>
                  <tr>
                    <th>NOMBRES DE PIEZAS</th>
                    <th>CANTIDADES</th>
                    <th>LARGO (mm)</th>
                    <th>ANCHO (mm)</th>
                    <th>ESPESOR</th>
                  </tr>
                </thead>
                <tbody>
                  {despieceCocina.map((item, index) => (
                    <tr key={index}>
                      <td className="product-name-cell">{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.largo}</td>
                      <td>{item.ancho}</td>
                      <td className="celda-espesor-texto">{item.espesor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {mostrarGaleria && (
              <div className="chart-side">
                <h4>Planos y Elevaciones:</h4>
                <div className="galeria-vertical-planos">
                  <div className="item-plano-galeria">
                    <p>Elevación Detallada (Plano 2)</p>
                    <img src={plano2Img} alt="Plano 2" />
                  </div>
                  <div className="item-plano-galeria">
                    <p>Plano de Planta Técnico (Plano 3)</p>
                    <img src={plano3Img} alt="Plano 3" />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {modalAbierto && (
        <div className="modal-formulario-overlay">
          <div className="modal-formulario-contenedor">
            <h3>📋 Encuesta Técnica de Arquitectura</h3>
            
            <form onSubmit={handleEnviarEncuesta}>
              
              <div className="seccion-pregunta-modal">
                <p>1. ¿Desea incluir un espacio para colgar ropa larga?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="ropaLarga" value="Si" checked={respuestas.ropaLarga === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="ropaLarga" value="No" checked={respuestas.ropaLarga === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>2. ¿Está dispuesto(a) a pagar por un design personalizado?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="planoPersonalizado" value="Si" checked={respuestas.planoPersonalizado === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="planoPersonalizado" value="No" checked={respuestas.planoPersonalizado === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>3. ¿Considera importante contar con un plano?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="importanciaPlano" value="Si" checked={respuestas.importanciaPlano === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="importanciaPlano" value="No" checked={respuestas.importanciaPlano === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>4. ¿Contrataría un servicio profesional?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="servicioProfesional" value="Si" checked={respuestas.servicioProfesional === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="servicioProfesional" value="No" checked={respuestas.servicioProfesional === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>5. Observaciones o comentario:</p>
                <input 
                  type="text" 
                  name="comentario" 
                  maxLength={150}
                  placeholder="Escriba un comentario o nota técnica aquí..."
                  value={respuestas.comentario} 
                  onChange={handleInputChange} 
                  className="input-comentario-modal"
                />
              </div>

              <div className="botones-acciones-modal">
                <button type="button" onClick={() => setModalAbierto(false)} className="btn-cerrar-modal">
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar-modal">
                  Guardar Formato
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Arquitecto;