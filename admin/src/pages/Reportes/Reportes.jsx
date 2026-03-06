import "../../styles/pages/Reportes/Reportes.css"; 
import React, { useState } from 'react';
import { 
  FaChartLine, FaChartPie, FaFileExcel, FaClipboardList, 
  FaPlus, FaEdit, FaTrash, FaCheckCircle, FaExclamationTriangle, FaTruck 
} from "react-icons/fa";

const Reportes = () => {
  const [reportes, setReportes] = useState([
    { id: 1, proyecto: "MUEBLE COCINA - FAMILIA ROJAS", cliente: "Luis Rojas", estado: "Producción", merma: "15%", total: 1500.00 },
    { id: 2, proyecto: "CLOSET EMPOTRADO - SURCO", cliente: "Maria Paz", estado: "Entregado", merma: "5%", total: 2800.00 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null, proyecto: "", cliente: "", estado: "Corte", merma: "", total: 0
  });

  const abrirModal = (reporte = null) => {
    if (reporte) {
      setIsEditing(true);
      setFormData(reporte);
    } else {
      setIsEditing(false);
      setFormData({ id: null, proyecto: "", cliente: "", estado: "Corte", merma: "", total: 0 });
    }
    setShowModal(true);
  };

  const guardarReporte = () => {
    if (!formData.proyecto) return alert("Ingrese el nombre del proyecto");
    if (isEditing) {
      setReportes(reportes.map(r => r.id === formData.id ? formData : r));
    } else {
      setReportes([...reportes, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const exportarExcel = () => {
    if (reportes.length === 0) return alert("No hay datos para exportar");

    const encabezados = "Proyecto,Cliente,Merma,Estado,Total\n";
    const filas = reportes.map(r => 
      `${r.proyecto},${r.cliente},${r.merma},${r.estado},${r.total}`
    ).join("\n");

    const blob = new Blob([encabezados + filas], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Reporte_General_Ventas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="civil-container fade-in">
      <header className="civil-header">
        <div className="header-title">
          <FaChartLine className="header-icon-civil" />
          <div>
            <h1>Panel de Reportes</h1>
            <p>Gestión de métricas y rendimiento de proyectos</p>
          </div>
        </div>
        <div className="header-actions-top">
          <button className="btn-excel" onClick={exportarExcel}>
            <FaFileExcel /> Exportar a Excel
          </button>
          <button className="btn-nueva-obra" onClick={() => abrirModal()}>
            <FaPlus /> Nuevo Proyecto
          </button>
        </div>
      </header>

      <div className="stats-row">
        <div className="stat-card">
          <FaChartPie /> 
          <span>Ventas Totales</span>
          <h3>S/ {reportes.reduce((acc, r) => acc + parseFloat(r.total), 0).toLocaleString()}</h3>
        </div>
        <div className="stat-card">
          <FaExclamationTriangle /> 
          <span>Merma Promedio</span>
          <h3>10%</h3>
        </div>
        <div className="stat-card">
          <FaTruck /> 
          <span>Proyectos Activos</span>
          <h3>{reportes.filter(r => r.estado !== "Entregado").length}</h3>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="civil-table">
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Cliente</th>
              <th>Merma (%)</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.proyecto}</strong></td>
                <td>{r.cliente}</td>
                <td>{r.merma}</td>
                <td>
                  <span className={`status-civil ${r.estado.toLowerCase().replace("ó","o")}`}>
                    {r.estado === "Entregado" ? <FaCheckCircle /> : <FaClipboardList />} {r.estado}
                  </span>
                </td>
                <td>S/ {parseFloat(r.total).toFixed(2)}</td>
                <td className="actions">
                  <button className="btn-edit-c" onClick={() => abrirModal(r)}><FaEdit /></button>
                  <button className="btn-delete-c" onClick={() => setReportes(reportes.filter(x => x.id !== r.id))}><FaTrash /></button>
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
              <h3>{isEditing ? "Modificar Datos" : "Registrar Nuevo Proyecto"}</h3>
              <button className="close-x" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del Proyecto</label>
                <input type="text" value={formData.proyecto} onChange={(e) => setFormData({...formData, proyecto: e.target.value.toUpperCase()})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cliente</label>
                  <input type="text" value={formData.cliente} onChange={(e) => setFormData({...formData, cliente: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>% Merma</label>
                  <input type="text" placeholder="Ej: 10%" value={formData.merma} onChange={(e) => setFormData({...formData, merma: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Estado del Proyecto</label>
                <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})}>
                  <option value="Corte">En Corte</option>
                  <option value="Producción">En Producción</option>
                  <option value="Entregado">Entregado</option>
                </select>
              </div>
              <div className="form-group">
                <label>Monto Total (S/)</label>
                <input type="number" value={formData.total} onChange={(e) => setFormData({...formData, total: e.target.value})} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cerrar</button>
              <button className="btn-save-civil" onClick={guardarReporte}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportes;