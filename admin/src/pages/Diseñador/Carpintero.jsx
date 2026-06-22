import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaEye, FaExternalLinkAlt, FaTools, FaArrowLeft, FaClipboardList } from "react-icons/fa";
import "../../styles/pages/Diseñador/Carpintero.css"; 

import cocinaImg from "../../img/DiseñadorImg/cocina.jpg";
import planoImg from "../../img/DiseñadorImg/plano.jpg";

const Carpintero = () => {
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  
  const [respuestas, setRespuestas] = useState({
    servicioAnterior: "",
    calidadAcabados: "",
    instalacionMueble: "",
    solicitarPresupuesto: "",
    carpinteroEspecializado: "",
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
    { nombre: "LATERALES", cantidad: 2, largo: 750, ancho: 580, thickness: "18MM" },
    { nombre: "PISO", cantidad: 1, largo: 864, ancho: 580, thickness: "18MM" },
    { nombre: "ZÓCALO", cantidad: 2, largo: 864, ancho: 100, thickness: "18MM" },
    { nombre: "LAZOS DE AMARRE (Techo)", cantidad: 2, largo: 864, ancho: 70, thickness: "18MM" },
    { nombre: "LATERAL CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 500, thickness: "18MM" },
    { nombre: "HORIZ. CAJÓN OLLERO", cantidad: 4, largo: 200, ancho: 806, thickness: "18MM" },
    { nombre: "TAPAS DE CAJÓN", cantidad: 3, largo: 247, ancho: 896, thickness: "18MM" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRespuestas({ ...respuestas, [name]: value });
  };

  const handleEnviarEncuesta = (e) => {
    e.preventDefault();
    setModalAbierto(false);
  };

  return (
    <div className="carpintero-main-container">
      <div className="carpintero-content-wrapper">
        
        <div className="contenedor-volver-solicitud">
          <Link to={-1} className="back-link-action">
            <FaArrowLeft size={12} /> Volver a la solicitud
          </Link>
        </div>

        <div className="tarjeta-resumen-proyecto">
          <header className="carpintero-header-box">
            <h2>
              <FaTools /> Módulo de Carpintería - Panel de Producción
            </h2>
            <p>Orden de fabricación asignada a taller.</p>
          </header>

          <div className="box-especificaciones-taller">
            <h4>Resumen de Requerimiento de Melamina:</h4>
            <div className="grid-especificaciones-valores">
              <p><strong>Estructura a Fabricar:</strong> {solicitud.mueble}</p>
              <p><strong>Lugar de Instalación:</strong> {solicitud.espacio}</p>
            </div>
          </div>

          <div className="acciones-resultado">
            <a 
              href="https://www.coohom.com/pub/tool/bim/cloud?redirecturl=/pub/saas/workbench&designid=3FO3EK2RJXIU&newproject=Design&em=0&cfloorplan=1&locale=es_ES" 
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

          <div className="carpintero-content-grid">
            
            <div className="table-side">
              <table className="tabla-reporte-ventas">
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
                      <td className="product-name-cell">{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.largo}</td>
                      <td>{item.ancho}</td>
                      <td className="celda-espesor-texto">{item.thickness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {mostrarGaleria && (
              <div className="chart-side">
                <h4>Planos del Espacio ({solicitud.mueble}):</h4>
                <div className="galeria-vertical-planos">
                  <div className="item-plano-galeria">
                    <p>Vista Render 3D Lineal</p>
                    <img src={cocinaImg} alt="Render" />
                  </div>
                  <div className="item-plano-galeria">
                    <p>Plano de Distribución en Planta</p>
                    <img src={planoImg} alt="Plano" />
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
            <h3>📋 Encuesta Técnica de Carpintería</h3>
            
            <form onSubmit={handleEnviarEncuesta}>
              
              <div className="seccion-pregunta-modal">
                <p>1. ¿Ha contratado anteriormente un servicio de carpintería en melamina?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="servicioAnterior" value="Si" checked={respuestas.servicioAnterior === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="servicioAnterior" value="No" checked={respuestas.servicioAnterior === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>2. ¿Considera importante la calidad de los acabados del mueble?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="calidadAcabados" value="Si" checked={respuestas.calidadAcabados === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="calidadAcabados" value="No" checked={respuestas.calidadAcabados === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>3. ¿Desea que el carpintero realice la instalación del mueble?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="instalacionMueble" value="Si" checked={respuestas.instalacionMueble === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="instalacionMueble" value="No" checked={respuestas.instalacionMueble === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>4. ¿Solicitaría un presupuesto antes de contratar el servicio?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="solicitarPresupuesto" value="Si" checked={respuestas.solicitarPresupuesto === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="solicitarPresupuesto" value="No" checked={respuestas.solicitarPresupuesto === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>5. ¿Contrataría un carpintero especializado en muebles de melamina?</p>
                <div className="contenedor-radios-flex">
                  <label><input type="radio" name="carpinteroEspecializado" value="Si" checked={respuestas.carpinteroEspecializado === "Si"} onChange={handleInputChange} /> Sí</label>
                  <label><input type="radio" name="carpinteroEspecializado" value="No" checked={respuestas.carpinteroEspecializado === "No"} onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <div className="seccion-pregunta-modal">
                <p>6. Observaciones o comentario:</p>
                <input 
                  type="text" 
                  name="comentario" 
                  maxLength={150}
                  placeholder="Escriba un comentario o respuesta adicional..."
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

export default Carpintero;