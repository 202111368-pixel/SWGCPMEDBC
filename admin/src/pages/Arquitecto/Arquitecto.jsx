import React, { useState } from 'react';
import "../../styles/pages/Arquitecto/Arquitecto.css"; 
import { 
  FaDraftingCompass, FaPlus, FaEdit, FaTrash, 
  FaTimes, FaLayerGroup, FaExclamationTriangle 
} from "react-icons/fa";

const Arquitecto = () => {
  const [proyectos, setProyectos] = useState([
    { id: 1, nombre: "CLOSET DORMITORIO PRINCIPAL", cliente: "Muebles El Roble", material: "Melamina 18mm Gris", estado: "Pendiente" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: null, nombre: "", cliente: "", material: "", estado: "Pendiente"
  });

  const abrirModal = (proyecto = null) => {
    if (proyecto) {
      setIsEditing(true);
      setFormData(proyecto);
    } else {
      setIsEditing(false);
      setFormData({ id: null, nombre: "", cliente: "", material: "", estado: "Pendiente" });
    }
    setShowModal(true);
  };

  const manejarGuardado = () => {
    if (!formData.nombre || !formData.cliente) {
      alert("Por favor, completa el nombre del proyecto y el cliente.");
      return;
    }

    if (formData.estado === "En Corte") {
      setShowModal(false);
      setIsLoading(true);
      setTimeout(() => {
        ejecutarGuardado();
        setIsLoading(false);
        alert("¡Optimización de despiece completada con éxito!");
      }, 3500);
    } else {
      ejecutarGuardado();
      setShowModal(false);
    }
  };

  const ejecutarGuardado = () => {
    if (isEditing) {
      setProyectos(proyectos.map(p => p.id === formData.id ? formData : p));
    } else {
      setProyectos([...proyectos, { ...formData, id: Date.now() }]);
    }
  };

  const eliminarProyecto = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este plano? Esta acción no se puede deshacer.")) {
      setProyectos(proyectos.filter(p => p.id !== id));
    }
  };

  return (
    <div className="arquitecto-container fade-in">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader-content">
            <div className="loading-spinner"></div>
            <h2 className="loading-text">D'BARY OPTIMIZER</h2>
            <div className="loader-box">
              <div className="loader-bar"></div>
            </div>
            <p className="loading-subtext">Calculando medidas de precisión y optimizando cortes...</p>
          </div>
        </div>
      )}

      <header className="arquitecto-header">
        <div className="header-title">
          <FaDraftingCompass className="header-icon" />
          <div>
            <h1>Gestión de Planos</h1>
            <p>D’Bary Company - Área de Diseño e Ingeniería</p>
          </div>
        </div>
        <button className="btn-nuevo-plan" onClick={() => abrirModal()}>
          <FaPlus /> Nuevo Plano / Despiece
        </button>
      </header>

      <div className="table-wrapper">
        <table className="arquitecto-table">
          <thead>
            <tr>
              <th>Proyecto / Diseño</th>
              <th>Cliente</th>
              <th>Material Sugerido</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.nombre}</strong></td>
                <td>{p.cliente}</td>
                <td><FaLayerGroup style={{marginRight: '8px', color: '#64748b'}} /> {p.material}</td>
                <td>
                  <span className={`status-pill ${p.estado.toLowerCase().replace(" ", "-")}`}>
                    {p.estado}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-edit" onClick={() => abrirModal(p)} title="Editar"><FaEdit /></button>
                  <button className="btn-delete" onClick={() => eliminarProyecto(p.id)} title="Eliminar"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay-ark">
          <div className="modal-card-ark bounce-in">
            <div className="modal-header">
              <h3>{isEditing ? "Editar Plano" : "Nuevo Despiece de Melamina"}</h3>
              <button className="close-x" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del Proyecto</label>
                <input 
                  type="text" 
                  placeholder="Ej: MUEBLE DE TV"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cliente</label>
                  <input 
                    type="text" 
                    value={formData.cliente}
                    onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Estado del Plano</label>
                  <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="En Corte">En Corte (Optimizar)</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Especificación de Material</label>
                <input 
                  type="text" 
                  placeholder="Ej: Pelikano Sincro 18mm"
                  value={formData.material}
                  onChange={(e) => setFormData({...formData, material: e.target.value})}
                />
              </div>
              {formData.estado === "En Corte" && (
                <div className="alert-info">
                  <FaExclamationTriangle /> Al guardar "En Corte", el sistema optimizará el despiece automáticamente.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-save" onClick={manejarGuardado}>
                {isEditing ? "Actualizar Proyecto" : "Guardar y Procesar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Arquitecto;