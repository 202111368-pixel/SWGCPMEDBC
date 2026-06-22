import React, { useState } from 'react';
import { Link } from "react-router-dom"; 
import { 
  FaArrowLeft, FaBuilding, FaTools, FaBoxes, FaClock, FaExclamationTriangle, FaCheckCircle, FaChartPie, FaFileAlt
} from "react-icons/fa";
import "../../styles/pages/Taller/carpinteria.css"; 

const Taller = () => {
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

  const [herramientasCheck, setHerramientasCheck] = useState({
    h1: false, h2: false, h3: false, h4: false, h5: false, h6: false, h7: false, h8: false, h9: false, h10: false, h11: false
  });

  const [materialesCheck, setMaterialesCheck] = useState({
    m1: false, m2: false, m3: false, m4: false, m5: false, m6: false, m7: false, m8: false, m9: false, m10: false, m11: false
  });

  const [encuestaActiva, setEncuestaActiva] = useState(null); 
  const [datosReporte, setDatosReporte] = useState({
    estatus: "En Proceso Regular",
    diasRetraso: 0,
    motivoEspecifico: "Operando bajo el cronograma estándar en taller.",
    detalleAdicional: "Ninguno."
  });

  const [formularioFaltaMaterial, setFormularioFaltaMaterial] = useState({
    materialFaltante: "Planchas de Melamina 18mm",
    proveedorAviso: "Aglomerados Express",
    diasEspera: 2
  });

  const [formularioOtroCliente, setFormularioOtroCliente] = useState({
    nombreClienteBloqueo: "",
    muebleEnCorte: "",
    diasEspera: 3
  });

  const herramientasLista = [
    { id: "h1", nombre: "Sierra circular o sierra escuadradora" },
    { id: "h2", nombre: "Cortadora de melamina" },
    { id: "h3", nombre: "Taladro y atornillador eléctrico" },
    { id: "h4", nombre: "Brocas para madera y melamina" },
    { id: "h5", nombre: "Fresadora (router)" },
    { id: "h6", nombre: "Prensas o sargentos" },
    { id: "h7", nombre: "Escuadra metálica" },
    { id: "h8", nombre: "Cinta métrica" },
    { id: "h9", nombre: "Nivel" },
    { id: "h10", nombre: "Lijadora (si es necesaria)" },
    { id: "h11", nombre: "Máquina canteadora o plancha para tapacanto" }
  ];

  const materialesLista = [
    { id: "m1", nombre: "Planchas de melamina" },
    { id: "m2", nombre: "Tapacanto PVC" },
    { id: "m3", nombre: "Tornillos para melamina (confirmat o aglomerado)" },
    { id: "m4", nombre: "Bisagras cazoleta" },
    { id: "m5", nombre: "Correderas para cajones" },
    { id: "m6", nombre: "Chapas o cerraduras" },
    { id: "m7", nombre: "Tiradores o jaladeras" },
    { id: "m8", nombre: "Tarugos de madera" },
    { id: "m9", nombre: "Minifix o sistemas de unión" },
    { id: "m10", nombre: "Tapatornillos" },
    { id: "m11", nombre: "Silicona o adhesivo de contacto" }
  ];

  const seleccionarTodasHerramientas = (valor) => {
    const actualizado = {};
    herramientasLista.forEach(h => actualizado[h.id] = valor);
    setHerramientasCheck(actualizado);
  };

  const seleccionarTodosMateriales = (valor) => {
    const actualizado = {};
    materialesLista.forEach(m => actualizado[m.id] = valor);
    setMaterialesCheck(actualizado);
  };

  const guardarEncuestaMateriales = (e) => {
    e.preventDefault();
    setDatosReporte({
      estatus: "Retraso: Falta Comprar Materiales",
      diasRetraso: Number(formularioFaltaMaterial.diasEspera),
      motivoEspecifico: `Falta adquirir: ${formularioFaltaMaterial.materialFaltante}.`,
      detalleAdicional: `Pedido solicitado al proveedor: ${formularioFaltaMaterial.proveedorAviso}.`
    });
    setEncuestaActiva(null);
  };

  const guardarEncuestaOtroCliente = (e) => {
    e.preventDefault();
    setDatosReporte({
      estatus: "Retraso: Atendiendo Otro Cliente",
      diasRetraso: Number(formularioOtroCliente.diasEspera),
      motivoEspecifico: `Escuadradora ocupada con el cliente: ${formularioOtroCliente.nombreClienteBloqueo || "No especificado"}.`,
      detalleAdicional: `Estructura en corte actual: ${formularioOtroCliente.muebleEnCorte || "Mobiliario Externo"}.`
    });
    setEncuestaActiva(null);
  };

  const restablecerFlujoNormal = () => {
    setDatosReporte({
      estatus: "En Proceso Regular",
      diasRetraso: 0,
      motivoEspecifico: "Operando bajo el cronograma estándar en taller.",
      detalleAdicional: "Ninguno."
    });
    setEncuestaActiva(null);
  };

  const totalDiasProyecto = 5 + datosReporte.diasRetraso;
  
  const porcentajeRetraso = Math.min(Math.round((datosReporte.diasRetraso / totalDiasProyecto) * 100), 100);
  const porcentajeProduccion = 100 - porcentajeRetraso;

  const colorGrafico = datosReporte.diasRetraso === 2 ? '#ef4444' : datosReporte.diasRetraso === 3 ? '#f59e0b' : '#10b981';

  return (
    <div className="inv-page fade-in">
      
      <div className="inv-back-container">
        <Link to={-1} className="inv-back-link">
          <FaArrowLeft size={12} /> Volver a la solicitud
        </Link>
      </div>

      <header className="inv-page-header">
        <div className="inv-brand">
          <div className="inv-icon-box">
            <FaBuilding size={26} />
          </div>
          <div>
            <h1>Panel de Manufactura en Carpintería</h1>
            <p className="inv-subtitle">Control de Suministros, Herramientas y Cola de Espera de Corte</p>
          </div>
        </div>
      </header>

      <div className="summary-info-box">
        <h4>Mueble Asignado: {solicitud.mueble}</h4>
        <p><strong>Área de instalación:</strong> {solicitud.espacio}</p>
      </div>

      <div className="grid-checklists">
        
        <div className="checklist-card">
          <div className="checklist-header">
            <h4><FaTools color="#8b5a2b" /> Herramientas de Taller</h4>
            <div className="action-buttons-small">
              <button type="button" onClick={() => seleccionarTodasHerramientas(true)}>Marcar Todo</button>
              <button type="button" onClick={() => seleccionarTodasHerramientas(false)}>Limpiar</button>
            </div>
          </div>
          <div className="checklist-scroll">
            {herramientasLista.map(h => (
              <label key={h.id} className="checklist-item-label">
                <input 
                  type="checkbox" 
                  checked={herramientasCheck[h.id] || false} 
                  onChange={(e) => setHerramientasCheck({ ...herramientasCheck, [h.id]: e.target.checked })}
                />
                <span>{h.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="checklist-card">
          <div className="checklist-header">
            <h4><FaBoxes color="#8b5a2b" /> Materiales Asignados</h4>
            <div className="action-buttons-small">
              <button type="button" onClick={() => seleccionarTodosMateriales(true)}>Marcar Todo</button>
              <button type="button" onClick={() => seleccionarTodosMateriales(false)}>Limpiar</button>
            </div>
          </div>
          <div className="checklist-scroll">
            {materialesLista.map(m => (
              <label key={m.id} className="checklist-item-label">
                <input 
                  type="checkbox" 
                  checked={materialesCheck[m.id] || false} 
                  onChange={(e) => setMaterialesCheck({ ...materialesCheck, [m.id]: e.target.checked })}
                />
                <span>{m.nombre}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      <div className="logistic-section-card">
        <h3>
          <FaClock color="#d97706" /> Cola de Espera y Logística de Corte (Encuestas y Gráfico Circular)
        </h3>
        <p className="section-instruction-text">
          Si existen complicaciones con los suministros o se requiere priorizar a otro cliente técnico en las escuadradoras, registre la contingencia y estime los días de demora.
        </p>

        <div className="logistic-action-bar">
          <button type="button" onClick={() => setEncuestaActiva("materiales")} className="btn-delay-red">
            <FaExclamationTriangle /> Llenar Demora: Falta Comprar Materiales (2 días)
          </button>

          <button type="button" onClick={() => setEncuestaActiva("otroCliente")} className="btn-delay-orange">
            <FaClock /> Llenar Demora: Atendiendo Otro Cliente (3 días)
          </button>

          <button type="button" onClick={restablecerFlujoNormal} className="btn-delay-green">
            <FaCheckCircle /> Restablecer Flujo Regular (0 días)
          </button>
        </div>

        <div className="report-split-layout">
          
          <div className="form-survey-container">
            {encuestaActiva === "materiales" && (
              <form onSubmit={guardarEncuestaMateriales}>
                <h5 className="form-survey-title title-red"><FaFileAlt /> Formato Interno: Falta Adquisición de Suministros</h5>
                
                <div className="form-group-item">
                  <label>¿Qué material o accesorio hace falta comprar?</label>
                  <input 
                    type="text" 
                    value={formularioFaltaMaterial.materialFaltante}
                    onChange={(e) => setFormularioFaltaMaterial({...formularioFaltaMaterial, materialFaltante: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>Proveedor encargado del despacho:</label>
                  <input 
                    type="text" 
                    value={formularioFaltaMaterial.proveedorAviso}
                    onChange={(e) => setFormularioFaltaMaterial({...formularioFaltaMaterial, proveedorAviso: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>Días estimados para la compra y arribo:</label>
                  <input 
                    type="number" 
                    min="1"
                    max="10"
                    value={formularioFaltaMaterial.diasEspera}
                    onChange={(e) => setFormularioFaltaMaterial({...formularioFaltaMaterial, diasEspera: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className="btn-submit-survey bg-red">
                  Aplicar Retraso por Materiales al Reporte
                </button>
              </form>
            )}

            {encuestaActiva === "otroCliente" && (
              <form onSubmit={guardarEncuestaOtroCliente}>
                <h5 className="form-survey-title title-orange"><FaFileAlt /> Formato Interno: Cola de Clientes en Escuadradora</h5>
                
                <div className="form-group-item">
                  <label>Nombre del Cliente que ocupa la línea actualmente:</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Carlos Mendoza"
                    value={formularioOtroCliente.nombreClienteBloqueo}
                    onChange={(e) => setFormularioOtroCliente({...formularioOtroCliente, nombreClienteBloqueo: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>Mueble de melamina que está siendo cortado:</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Centro de Entretenimiento RH"
                    value={formularioOtroCliente.muebleEnCorte}
                    onChange={(e) => setFormularioOtroCliente({...formularioOtroCliente, muebleEnCorte: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>Días de espera para liberar maquinaria:</label>
                  <input 
                    type="number" 
                    min="1"
                    max="10"
                    value={formularioOtroCliente.diasEspera}
                    onChange={(e) => setFormularioOtroCliente({...formularioOtroCliente, diasEspera: e.target.value})}
                    required
                  />
                </div>

                <button type="submit" className="btn-submit-survey bg-orange">
                  Aplicar Bloqueo de Línea al Reporte
                </button>
              </form>
            )}

            {!encuestaActiva && (
              <div className="empty-survey-box">
                <FaFileAlt size={32} />
                <p className="empty-title">Ninguna encuesta de retraso abierta.</p>
                <p className="empty-subtitle">Haga clic en los botones superiores si desea ingresar datos de demora técnica.</p>
              </div>
            )}
          </div>

          <div className="graphic-report-container">
            <div>
              <h5 className="graphic-container-title">
                <FaChartPie color="#8b5a2b" /> Reporte Técnico Circular de Taller
              </h5>
              
              <div className="chart-wrapper-box">
                <div 
                  className="pie-chart-circle" 
                  style={{ 
                    background: `conic-gradient(${colorGrafico} 0% ${porcentajeRetraso}%, #10b981 ${porcentajeRetraso}% 100%)` 
                  }}
                >
                  <div className="pie-chart-inner-hole">
                    <span className="pie-percentage-text">{porcentajeRetraso}%</span>
                    <span className="pie-sub-text">De Demora</span>
                  </div>
                </div>

                <div className="chart-legend-box">
                  <div className="legend-item">
                    <span className="legend-dot bg-green-dot"></span>
                    <span className="legend-label">Producción Activa ({porcentajeProduccion}%)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: colorGrafico }}></span>
                    <span className="legend-label">Retraso Estimado ({porcentajeRetraso}%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-data-summary-footer">
              <p><strong>Estatus del Flujo:</strong> <span className="status-badge" style={{ color: colorGrafico }}>{datosReporte.estatus}</span></p>
              <p><strong>Criterio Técnico:</strong> <span className="text-muted-dark">{datosReporte.motivoEspecifico}</span></p>
              <p><strong>Logística:</strong> <span className="text-muted-light">{datosReporte.detalleAdicional}</span></p>
              <p className="total-days-highlight">
                Plazo Estimado Total de Entrega: <span>{totalDiasProyecto} días hábiles</span>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Taller;