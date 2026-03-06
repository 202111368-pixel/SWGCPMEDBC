import React, { useState, useMemo, useCallback } from "react";
import "../../styles/pages/Cliente/Cliente.css"; 
import { 
  FaUserPlus, FaSearch, FaEdit, FaTrash, FaPhone, 
  FaTimes, FaUserCog, FaStore, FaHistory, 
  FaTools, FaFileInvoiceDollar, FaCheckCircle
} from "react-icons/fa";

const DB_HISTORIAL = [
  { id: 501, clienteId: 1, fecha: "2026-02-15", items: "5 Planchas Roble", total: 1250.00, estado: "Entregado" },
  { id: 502, clienteId: 2, fecha: "2026-03-01", items: "Corte Cocina Integral", total: 450.50, estado: "En Proceso" },
  { id: 503, clienteId: 1, fecha: "2026-01-10", items: "Accesorios Blum", total: 890.00, estado: "Entregado" },
];

const Cliente = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: "MUEBLES EL ROBLE S.A.C.", documento: "20601234567", tipo: "EMPRESA", celular: "987654321" },
    { id: 2, nombre: "JUAN CARLOS RIVERA", documento: "45789632", tipo: "CARPINTERO", celular: "912345678" },
    { id: 3, nombre: "NICOLAS TORRES", documento: "72908451", tipo: "FINAL", celular: "962219340" },
  ]);

  const [ui, setUi] = useState({ modal: false, history: false, scanning: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [pedidosEncontrados, setPedidosEncontrados] = useState([]);
  const [formData, setFormData] = useState({ id: null, nombre: "", documento: "", tipo: "CARPINTERO", celular: "" });

  const filteredData = useMemo(() => {
    return clientes.filter(c => 
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.documento.includes(searchTerm)
    );
  }, [clientes, searchTerm]);

  const toggleModal = useCallback((cliente = null) => {
    if (cliente) {
      setIsEditing(true);
      setFormData(cliente);
    } else {
      setIsEditing(false);
      setFormData({ id: null, nombre: "", documento: "", tipo: "CARPINTERO", celular: "" });
    }
    setUi(prev => ({ ...prev, modal: !prev.modal }));
  }, []);

  const handleViewHistory = (cliente) => {
    setSelectedCliente(cliente);
    setUi(prev => ({ ...prev, history: true, scanning: true }));
    
    setTimeout(() => {
      const logs = DB_HISTORIAL.filter(p => p.clienteId === cliente.id);
      setPedidosEncontrados(logs);
      setUi(prev => ({ ...prev, scanning: false }));
    }, 1500);
  };

  const processForm = () => {
    if (!formData.nombre || !formData.documento) return;
    if (isEditing) {
      setClientes(clientes.map(c => c.id === formData.id ? formData : c));
    } else {
      setClientes([...clientes, { ...formData, id: Date.now() }]);
    }
    setUi(prev => ({ ...prev, modal: false }));
  };

  return (
    <div className="hub-container fade-in">
      <div className="hub-header">
        <div className="hub-branding">
          <div className="hub-logo-anim"><FaUserCog /></div>
          <div>
            <h1>Gestión de Cliente</h1>
          </div>
        </div>
        <button className="hub-btn-add" onClick={() => toggleModal()}>
          <FaUserPlus /> Nuevo Registro
        </button>
      </div>

      <div className="hub-controls">
        <div className="hub-search-bar">
          <FaSearch />
          <input 
            placeholder="Buscar por identidad o documento..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="hub-table-frame">
        <table className="hub-table">
          <thead>
            <tr>
              <th>Identidad</th>
              <th>Documento</th>
              <th>Perfil</th>
              <th>Contacto</th>
              <th className="txt-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((c) => (
              <tr key={c.id} className="row-ia">
                <td><strong>{c.nombre}</strong></td>
                <td><span className="hub-badge-doc">{c.documento}</span></td>
                <td>
                    <span className={`hub-tag ${c.tipo.toLowerCase()}`}>
                        {c.tipo === 'CARPINTERO' ? <FaTools/> : <FaStore/>} {c.tipo}
                    </span>
                </td>
                <td><FaPhone className="clr-green" /> {c.celular}</td>
                <td className="txt-right">
                  <button className="ia-btn hist" onClick={() => handleViewHistory(c)}><FaHistory /></button>
                  <button className="ia-btn edit" onClick={() => toggleModal(c)}><FaEdit /></button>
                  <button className="ia-btn deli" onClick={() => setClientes(clientes.filter(x => x.id !== c.id))}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ui.modal && (
        <div className="ia-modal-overlay">
          <div className="ia-modal-card">
            <div className="ia-modal-head">
              <h3>{isEditing ? "Actualizar Ficha" : "Nuevo Perfil de Cliente"}</h3>
              <button onClick={() => setUi({...ui, modal: false})}><FaTimes /></button>
            </div>
            <div className="ia-modal-body">
              <div className="ia-input-group">
                <label>Nombre Completo / Razón Social</label>
                <input value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value.toUpperCase()})} />
              </div>
              <div className="ia-grid">
                <div className="ia-input-group">
                    <label>DNI / RUC</label>
                    <input value={formData.documento} onChange={e => setFormData({...formData, documento: e.target.value})} />
                </div>
                <div className="ia-input-group">
                    <label>WhatsApp / Celular</label>
                    <input value={formData.celular} onChange={e => setFormData({...formData, celular: e.target.value})} />
                </div>
              </div>
              <div className="ia-input-group">
                <label>Categorización de Cliente</label>
                <select value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                  <option value="CARPINTERO">Maestro Carpintero</option>
                  <option value="EMPRESA">Empresa / Razón Social</option>
                  <option value="FINAL">Cliente Final</option>
                </select>
              </div>
            </div>
            <div className="ia-modal-foot">
              <button className="btn-save-ia" onClick={processForm}>Confirmar Datos</button>
            </div>
          </div>
        </div>
      )}

      {ui.history && (
        <div className="ia-modal-overlay">
          <div className="ia-modal-card history-view">
            <div className="ia-modal-head">
              <h3><FaFileInvoiceDollar /> Historial: {selectedCliente?.nombre}</h3>
              <button onClick={() => setUi({...ui, history: false})}><FaTimes /></button>
            </div>
            <div className="ia-modal-body">
               {ui.scanning ? (
                 <div className="ia-scanning-zone">
                    <div className="scanner-line"></div>
                    <p>Sincronizando con base de datos...</p>
                 </div>
               ) : pedidosEncontrados.length > 0 ? (
                 <table className="history-table">
                    <thead><tr><th>Fecha</th><th>Descripción</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>
                        {pedidosEncontrados.map(p => (
                            <tr key={p.id}>
                                <td>{p.fecha}</td>
                                <td>{p.items}</td>
                                <td>S/ {p.total.toFixed(2)}</td>
                                <td><span className="st-pill"><FaCheckCircle/> {p.estado}</span></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
               ) : (
                 <div className="ia-empty-msg">No se detectan pedidos registrados.</div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cliente;