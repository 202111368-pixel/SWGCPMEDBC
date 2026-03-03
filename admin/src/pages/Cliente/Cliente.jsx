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
  const [formData, setFormData] = useState({
    nombre: "", documento: "", tipo: "CARPINTERO", celular: ""
  });

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.documento.includes(searchTerm)
  );

  const eliminarCliente = (id) => {
    if (window.confirm("¿Deseas eliminar este cliente del sistema?")) {
      setClientes(clientes.filter(c => c.id !== id));
    }
  };

  const guardarCliente = () => {
    if (formData.nombre.trim() === "" || formData.documento.trim() === "") {
      alert("Por favor, ingresa el nombre y el documento.");
      return;
    }
    const nuevoCliente = { ...formData, id: Date.now() };
    setClientes([...clientes, nuevoCliente]);
    setShowModal(false);
    setFormData({ nombre: "", documento: "", tipo: "CARPINTERO", celular: "" });
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <div className="header-title">
          <FaUserCog className="header-icon" />
          <div>
            <h1>Clientes</h1>
            <p>D’Bary Company - Gestión de Profesionales</p>
          </div>
        </div>
        <button className="btn-nuevo-cliente" onClick={() => setShowModal(true)}>
          <FaUserPlus /> Nuevo Cliente
        </button>
      </div>

      <div className="clientes-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, DNI o RUC..." 
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
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.nombre}</strong></td>
                  <td><span className="doc-badge">{c.documento}</span></td>
                  <td><span className={`type-badge ${c.tipo.toLowerCase()}`}>{c.tipo}</span></td>
                  <td><FaPhone style={{color: '#10b981', marginRight: '8px'}} />{c.celular}</td>
                  <td>
                    <button className="btn-action edit" title="Editar"><FaEdit /></button>
                    <button 
                      className="btn-action delete" 
                      onClick={() => eliminarCliente(c.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Registrar Nuevo Cliente</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Nombre Completo / Razón Social</label>
                <input 
                  type="text" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})}
                  placeholder="Ej. Juan Perez o Carpintería SAC"
                />
              </div>
              <div className="input-group">
                <label>Número de Documento (DNI/RUC)</label>
                <input 
                  type="text" 
                  value={formData.documento}
                  onChange={(e) => setFormData({...formData, documento: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Tipo de Cliente</label>
                <select 
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                >
                  <option value="CARPINTERO">Carpintero</option>
                  <option value="EMPRESA">Empresa</option>
                  <option value="FINAL">Cliente Final</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-save" onClick={guardarCliente}>Guardar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cliente;