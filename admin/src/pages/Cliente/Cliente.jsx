import React, { useState } from "react";
import "../../styles/pages/Cliente/Cliente.css"; 
import { 
  FaUserPlus, FaSearch, FaEdit, FaTrash, 
  FaPhone, FaTimes, FaUserCog 
} from "react-icons/fa";

const Cliente = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "MUEBLES EL ROBLE S.A.C.", documento: "20601234567", tipo: "EMPRESA", celular: "987654321" },
    { id: 2, nombre: "JUAN CARLOS RIVERA", documento: "45789632", tipo: "CARPINTERO", celular: "912345678" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    id: null, nombre: "", documento: "", tipo: "CARPINTERO", celular: ""
  });

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.documento.includes(searchTerm)
  );

  const manejarModal = (cliente = null) => {
    if (cliente) {
      setIsEditing(true);
      setFormData(cliente);
    } else {
      setIsEditing(false);
      setFormData({ id: null, nombre: "", documento: "", tipo: "CARPINTERO", celular: "" });
    }
    setShowModal(true);
  };

  const guardarCliente = () => {
    if (!formData.nombre.trim() || !formData.documento.trim()) {
      alert("Nombre y Documento son obligatorios");
      return;
    }

    if (isEditing) {
      setClientes(clientes.map(c => c.id === formData.id ? formData : c));
    } else {
      const nuevoCliente = { ...formData, id: Date.now() };
      setClientes([...clientes, nuevoCliente]);
    }
    setShowModal(false);
  };

  const eliminarCliente = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cliente?")) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  return (
    <div className="clientes-container fade-in">
      <div className="clientes-header">
        <div className="header-title">
          <FaUserCog className="header-icon" />
          <div>
            <h1>Directorio de Clientes</h1>
            <p>Gestión de Clientes y Maestros Carpinteros</p>
          </div>
        </div>
        <button className="btn-nuevo-cliente" onClick={() => manejarModal()}>
          <FaUserPlus /> Nuevo Cliente
        </button>
      </div>

      <div className="clientes-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o RUC..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="clientes-table">
          <thead>
            <tr>
              <th>Cliente / Razón Social</th>
              <th>Documento</th>
              <th>Tipo</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.nombre}</strong></td>
                <td><span className="doc-badge">{c.documento}</span></td>
                <td><span className={`type-badge ${c.tipo.toLowerCase().replace(" ", "-")}`}>{c.tipo}</span></td>
                <td><FaPhone className="icon-green" /> {c.celular}</td>
                <td className="actions-cell">
                  <button className="btn-action edit" onClick={() => manejarModal(c)}><FaEdit /></button>
                  <button className="btn-action delete" onClick={() => eliminarCliente(c.id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card bounce-in">
            <div className="modal-header">
              <h3>{isEditing ? "Editar Cliente" : "Registrar Nuevo Cliente"}</h3>
              <button className="close-btn-x" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre Completo / Razón Social</label>
                <input 
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>DNI / RUC</label>
                  <input 
                    type="text" 
                    value={formData.documento}
                    onChange={(e) => setFormData({...formData, documento: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Celular</label>
                  <input 
                    type="text" 
                    value={formData.celular}
                    onChange={(e) => setFormData({...formData, celular: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select value={formData.tipo} onChange={(e) => setFormData({...formData, tipo: e.target.value})}>
                  <option value="CARPINTERO">Carpintero</option>
                  <option value="EMPRESA">Empresa</option>
                  <option value="FINAL">Cliente Final</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-save" onClick={guardarCliente}>
                {isEditing ? "Guardar Cambios" : "Registrar Cliente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cliente;