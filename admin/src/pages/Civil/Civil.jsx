import React, { useState } from 'react';
import "../../styles/pages/Civil/Civil.css"; 
import { 
  FaHardHat, FaRulerCombined, FaCheckDouble, FaExclamationCircle, 
  FaPlus, FaEdit, FaTrash, FaBuilding, FaTools 
} from "react-icons/fa";

const Civil = () => {
  const [inspecciones, setInspecciones] = useState([
    { id: 1, ubicacion: "Dpto 402 - Edificio Sky", tipo: "Departamento", estado: "Apto", nivelacion: "100%", observaciones: "Paredes secas" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null, ubicacion: "", tipo: "Departamento", estado: "Pendiente", nivelacion: "", observaciones: ""
  });

  const abrirModal = (inspeccion = null) => {
    if (inspeccion) {
      setIsEditing(true);
      setFormData(inspeccion);
    } else {
      setIsEditing(false);
      setFormData({ id: null, ubicacion: "", tipo: "Departamento", estado: "Pendiente", nivelacion: "", observaciones: "" });
    }
    setShowModal(true);
  };

  const guardarInspeccion = () => {
    if (!formData.ubicacion) return alert("Ingrese la ubicación de la obra");
    
    if (isEditing) {
      setInspecciones(inspecciones.map(i => i.id === formData.id ? formData : i));
    } else {
      setInspecciones([...inspecciones, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const eliminarInspeccion = (id) => {
    if (window.confirm("¿Eliminar registro de supervisión?")) {
      setInspecciones(inspecciones.filter(i => i.id !== id));
    }
  };

  return (
    <div className="civil-container fade-in">
      <header className="civil-header">
        <div className="header-title">
          <FaHardHat className="header-icon-civil" />
          <div>
            <h1>Supervisión Civil</h1>
            <p>D’Bary Company - Verificación de Estructuras y Metrados</p>
          </div>
        </div>
        <button className="btn-nueva-obra" onClick={() => abrirModal()}>
          <FaPlus /> Registrar Supervisión
        </button>
      </header>

      <div className="table-wrapper">
        <table className="civil-table">
          <thead>
            <tr>
              <th>Ubicación / Proyecto</th>
              <th>Tipo</th>
              <th>Nivelación</th>
              <th>Estado de Obra</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inspecciones.map((i) => (
              <tr key={i.id}>
                <td><strong>{i.ubicacion}</strong></td>
                <td><FaBuilding /> {i.tipo}</td>
                <td><FaRulerCombined /> {i.nivelacion}</td>
                <td>
                  <span className={`status-civil ${i.estado.toLowerCase()}`}>
                    {i.estado === "Apto" ? <FaCheckDouble /> : <FaExclamationCircle />} {i.estado}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-edit-c" onClick={() => abrirModal(i)}><FaEdit /></button>
                  <button className="btn-delete-c" onClick={() => eliminarInspeccion(i.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay-civil">
          <div className="modal-card-civil bounce-in">
            <div className="modal-header">
              <h3>{isEditing ? "Editar Informe" : "Nueva Inspección Técnica"}</h3>
              <button className="close-x" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Ubicación de la Casa / Dpto</label>
                <input type="text" value={formData.ubicacion} onChange={(e) => setFormData({...formData, ubicacion: e.target.value.toUpperCase()})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Vivienda</label>
                  <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})}>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Oficina">Oficina</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>% Nivelación de Paredes</label>
                  <input type="text" placeholder="Ej: 95%" value={formData.nivelacion} onChange={(e) => setFormData({...formData, nivelacion: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Estado Técnico</label>
                <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Apto">Apto para Instalación</option>
                  <option value="No Apto">No Apto (Requiere Arreglo)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Observaciones (Metales, Humedad, Vigas)</label>
                <textarea rows="3" value={formData.observaciones} onChange={(e) => setFormData({...formData, observaciones: e.target.value})} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cerrar</button>
              <button className="btn-save-civil" onClick={guardarInspeccion}><FaTools /> Guardar Informe</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Civil;