import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import { 
  FaArrowLeft, FaBuilding, FaClipboardCheck, FaUserCheck, FaTools, FaTruckLoading, FaCheckCircle, FaChevronRight 
} from "react-icons/fa";
import "../../styles/pages/Taller/arqui.css"; 

const Taller = () => {
  const navigate = useNavigate();
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

  const [entregables, setEntregables] = useState([
    {
      id: 1,
      fase: "Verificación de medidas finales",
      detalle: `Ajuste milimétrico en ${solicitud.espacio || "Obra"}. Control de falsas escuadras, desplome de muros y niveles de piso para asegurar que la estructura ensamble de forma exacta.`,
      estado: "Pendiente",
      responsable: "Arquitecto Supervisor",
      nota: ""
    },
    {
      id: 2,
      fase: "Aprobación de muestras y acabados",
      detalle: "Validación física y técnica del tipo de melamina (18mm), texturas, color seleccionado por el cliente, combinación de tapacantos (delgado/grueso) y calidad de herrajes.",
      estado: "Pendiente",
      responsable: "Arquitecto Supervisor",
      nota: ""
    },
    {
      id: 3,
      fase: "Control de calidad del mobiliario fabricado",
      detalle: `Inspección de pre-armado en taller para el mueble: ${solicitud.mueble || "Mobiliario Planificado"}. Verificación de escuadres modulares, holguras de cajones y resistencia estructural.`,
      estado: "Pendiente",
      responsable: "Arquitecto Supervisor",
      nota: ""
    },
    {
      id: 4,
      fase: "Conformidad para despacho e instalación en la vivienda",
      detalle: "Firma del acta técnica aprobada. Liberación de módulos embalados adecuadamente y supervisión del plano de replanteo para el equipo de instalación en destino.",
      estado: "Pendiente",
      responsable: "Arquitecto Supervisor",
      nota: ""
    }
  ]);

  const [mensajeExito, setMensajeExito] = useState(false);

  const cambiarEstado = (id, nuevoEstado) => {
    const actualizados = entregables.map(item => {
      if (item.id === id) {
        return { ...item, estado: nuevoEstado };
      }
      return item;
    });
    setEntregables(actualizados);
  };

  const manejarNota = (id, texto) => {
    const actualizados = entregables.map(item => {
      if (item.id === id) {
        return { ...item, nota: texto };
      }
      return item;
    });
    setEntregables(actualizados);
  };

  const guardarControlCalidad = (e) => {
    e.preventDefault();
    setMensajeExito(true);
    
    setTimeout(() => {
      setMensajeExito(false);
      navigate(`/admin/taller/carpinteria?data=${encodeURIComponent(JSON.stringify(solicitud))}`);
    }, 1500);
  };

  return (
    <div className="inv-page fade-in" style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', padding: '25px', minHeight: '100vh' }}>
      
      <div className="inv-back-container" style={{ marginBottom: '20px' }}>
        <Link to={-1} className="inv-back-link" style={{ textDecoration: 'none', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500', fontSize: '14px' }}>
          <FaArrowLeft size={12} /> Volver a la solicitud
        </Link>
      </div>

      <header className="inv-page-header" style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '30px', borderLeft: '6px solid #1e40af' }}>
        <div className="inv-brand" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div className="inv-icon-box" style={{ background: '#eff6ff', padding: '16px', borderRadius: '12px', color: '#1e40af' }}>
            <FaBuilding size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#0f172a', fontWeight: '700' }}>Panel Técnico de Control - Arquitecto</h1>
            <p className="inv-subtitle" style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '14px' }}>
              Validación, Gestión de Calidad y Entregables del Proyecto de Melamina
            </p>
          </div>
        </div>
      </header>

      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Proyecto Activo</span>
          <FaChevronRight size={10} color="#94a3b8" />
          <span style={{ color: '#475569', fontSize: '13px' }}><strong>Mueble:</strong> {solicitud.mueble}</span>
          <span style={{ color: '#94a3b8' }}>|</span>
          <span style={{ color: '#475569', fontSize: '13px' }}><strong>Espacio:</strong> {solicitud.espacio}</span>
        </div>
        <p style={{ margin: 0, color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
          Como arquitecto responsable, complete el estatus de cada entregable obligatorio, añada las observaciones técnicas de control de obra pertinentes y guarde el formato para autorizar el flujo de trabajo del equipo de carpintería.
        </p>
      </div>

      <form onSubmit={guardarControlCalidad}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0f172a', color: '#fff' }}>
                <th style={{ padding: '16px 20px', fontWeight: '600', width: '25%' }}>Entregable del Arquitecto</th>
                <th style={{ padding: '16px 20px', fontWeight: '600', width: '35%' }}>Criterio de Control Técnico</th>
                <th style={{ padding: '16px 20px', fontWeight: '600', width: '20%' }}>Estatus de Validación</th>
                <th style={{ padding: '16px 20px', fontWeight: '600', width: '20%' }}>Observaciones de Campo</th>
              </tr>
            </thead>
            <tbody>
              {entregables.map((item, index) => {
                let iconoFase = <FaClipboardCheck color="#1e40af" />;
                if (index === 1) iconoFase = <FaUserCheck color="#1e40af" />;
                if (index === 2) iconoFase = <FaTools color="#1e40af" />;
                if (index === 3) iconoFase = <FaTruckLoading color="#1e40af" />;

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: index % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '20px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600', color: '#1e293b', marginBottom: '5px' }}>
                        {iconoFase}
                        <span>{item.fase}</span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>Responsable: {item.responsable}</span>
                    </td>
                    <td style={{ padding: '20px', color: '#475569', lineHeight: '1.5', verticalAlign: 'top', fontSize: '13px' }}>
                      {item.detalle}
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: item.estado === 'Pendiente' ? '#0f172a' : '#64748b', fontWeight: item.estado === 'Pendiente' ? '600' : '400' }}>
                          <input 
                            type="radio" 
                            name={`estado-${item.id}`} 
                            value="Pendiente" 
                            checked={item.estado === "Pendiente"} 
                            onChange={() => cambiarEstado(item.id, "Pendiente")}
                            style={{ accentColor: '#64748b' }}
                          />
                          <span>⏳ Pendiente</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: item.estado === 'En Proceso' ? '#d97706' : '#64748b', fontWeight: item.estado === 'En Proceso' ? '600' : '400' }}>
                          <input 
                            type="radio" 
                            name={`estado-${item.id}`} 
                            value="En Proceso" 
                            checked={item.estado === "En Proceso"} 
                            onChange={() => cambiarEstado(item.id, "En Proceso")}
                            style={{ accentColor: '#d97706' }}
                          />
                          <span>🛠️ En Proceso</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: item.estado === 'Aprobado' ? '#16a34a' : '#64748b', fontWeight: item.estado === 'Aprobado' ? '600' : '400' }}>
                          <input 
                            type="radio" 
                            name={`estado-${item.id}`} 
                            value="Aprobado" 
                            checked={item.estado === "Aprobado"} 
                            onChange={() => cambiarEstado(item.id, "Aprobado")}
                            style={{ accentColor: '#16a34a' }}
                          />
                          <span>✅ Aprobado</span>
                        </label>
                      </div>
                    </td>
                    <td style={{ padding: '20px', verticalAlign: 'top' }}>
                      <textarea
                        value={item.nota}
                        onChange={(e) => manejarNota(item.id, e.target.value)}
                        placeholder="Escriba especificaciones técnicas o apuntes aquí..."
                        style={{ width: '100%', height: '80px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'none', fontSize: '12px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {mensajeExito && (
          <div style={{ marginTop: '20px', padding: '15px 20px', backgroundColor: '#ecfdf5', borderLeft: '5px solid #10b981', borderRadius: '8px', color: '#065f46', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCheckCircle /> Guardando control de calidad. Redirigiendo al panel de carpintería...
          </div>
        )}

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            type="submit" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(22, 163, 74, 0.25)', transition: 'background-color 0.2s' }}
          >
            <FaCheckCircle /> Guardar Formato Técnico y Enviar a Carpintería
          </button>
        </div>
      </form>
    </div>
  );
};

export default Taller;