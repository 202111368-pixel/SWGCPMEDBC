import React, { useState, useMemo, useEffect } from "react";
import { FaUserShield, FaSearch, FaBars, FaEdit, FaTrash, FaTimes, FaCheckCircle } from "react-icons/fa";
import "../../styles/pages/Administrador/Administrador.css"; 

const Administrador = () => {
  const [pagos, setPagos] = useState(() => {
    const save = localStorage.getItem("db_admin_pagos");
    return save ? JSON.parse(save) : [
      { id: 3256, cliente: "CARPINTERÍA LOS ANDES", monto: 350.50, estado: "PENDIENTE", voucherUrl: "https://i.imgur.com/8n9Xp8p.png" }
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingPago, setEditingPago] = useState(null);
  const [menuOpcionesId, setMenuOpcionesId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ monto: "", cliente: "" });
  const [alert, setAlert] = useState({ show: false, msg: "", title: "", type: "" });

  useEffect(() => {
    localStorage.setItem("db_admin_pagos", JSON.stringify(pagos));
  }, [pagos]);

  const showAlert = (title, msg, type = "success") => {
    setAlert({ show: true, title, msg, type });
    setTimeout(() => setAlert({ show: false, title: "", msg: "", type: "" }), 5000);
  };

  const cerrarModales = () => {
    setShowModal(false);
    setEditingPago(null);
    setMenuOpcionesId(null);
    setFormData({ monto: "", cliente: "" });
  };

  const guardarPago = () => {
    const nombre = formData.cliente.trim();
    const tieneEspacio = nombre.includes(" ");
    const esSoloNumeros = /^\d+$/.test(nombre);
    const soloLetrasYEspacios = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(nombre);

    if (!nombre || !tieneEspacio || esSoloNumeros || !soloLetrasYEspacios || nombre.length < 6) {
      showAlert("SISTEMA DE SEGURIDAD", "Error: Debe ingresar nombres y apellidos completos.", "error");
      return;
    }

    if (!formData.monto || formData.monto <= 0) {
      showAlert("SISTEMA DE SEGURIDAD", "Error: Faltan parámetros obligatorios en el reporte.", "error");
      return;
    }
    
    if (editingPago) {
      setPagos(pagos.map(p => p.id === editingPago.id ? { ...p, cliente: nombre.toUpperCase(), monto: parseFloat(formData.monto) } : p));
      showAlert("SISTEMA", "Cambios guardados con éxito.", "success");
    } else {
      const nuevo = { 
        id: Math.floor(1000 + Math.random() * 9000), 
        cliente: nombre.toUpperCase(), 
        monto: parseFloat(formData.monto), 
        estado: "PENDIENTE",
        voucherUrl: "https://i.imgur.com/8n9Xp8p.png" 
      };
      setPagos([nuevo, ...pagos]);
      showAlert("SISTEMA", "Cliente registrado correctamente.", "success");
    }
    cerrarModales();
  };

  const filtrados = useMemo(() => 
    pagos.filter(p => p.cliente.toLowerCase().includes(searchTerm.toLowerCase())), 
  [pagos, searchTerm]);

  return (
    <div className="admin-main-wrapper">
      {alert.show && (
        <div className={`toast-notification ${alert.type}`}>
          <div className="toast-icon-circle">
            {alert.type === "error" ? "!" : <FaCheckCircle />}
          </div>
          <div className="toast-body">
            <div className="toast-header">
              <span className="toast-title">{alert.title}</span>
              <span className="toast-time">ahora</span>
            </div>
            <p className="toast-message">{alert.msg}</p>
          </div>
        </div>
      )}

      <header className="brand-section">
        <div className="brand-logo-bg"><FaUserShield /></div>
        <h1 style={{fontSize: '22px', fontWeight: '800', color: '#1e293b'}}>Gestión de Administrador</h1>
      </header>

      <div className="action-row">
        <div className="search-box">
          <FaSearch />
          <input placeholder="Filtrar por nombre..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <button className="btn-primary-blue" onClick={() => setShowModal(true)}>Nuevo Registro</button>
      </div>

      <div className="data-card">
        <table className="modern-table">
          <thead>
            <tr><th>CÓDIGO</th><th>CLIENTE</th><th>MONTO</th><th>ESTADO</th><th>ACCIONES</th></tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td style={{color: '#64748b', fontWeight: '600'}}>#ID-{p.id}</td>
                <td><strong style={{color: '#1e293b'}}>{p.cliente}</strong></td>
                <td style={{fontWeight: '700'}}>S/ {p.monto.toFixed(2)}</td>
                <td><span className={`status-pill ${p.estado.toLowerCase()}`}>{p.estado}</span></td>
                <td>
                  <button className="dot-btn" onClick={() => setMenuOpcionesId(menuOpcionesId === p.id ? null : p.id)}><FaBars /></button>
                  {menuOpcionesId === p.id && (
                    <div className="action-menu">
                      <button onClick={() => { setEditingPago(p); setFormData({cliente: p.cliente, monto: p.monto}); setShowModal(true); }}><FaEdit /> Editar</button>
                      <button onClick={() => { if(window.confirm("¿Eliminar?")) setPagos(pagos.filter(x => x.id !== p.id)); }} style={{color: '#ef4444'}}><FaTrash /> Borrar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container-small">
            <div className="modal-top">
              <h3 style={{fontWeight: '800', margin: 0}}>Nuevo Perfil de Cliente</h3>
              <button className="close-x-btn" onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div style={{padding: '20px'}}>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '5px'}}>Nombre Completo</label>
                <input className="input-modern" type="text" value={formData.cliente} onChange={(e) => setFormData({...formData, cliente: e.target.value})} placeholder="EJ: MUEBLES D'BARY" />
              </div>
              <div style={{marginBottom: '20px'}}>
                <label style={{display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '5px'}}>Monto del Pago (S/)</label>
                <input className="input-modern" type="number" value={formData.monto} onChange={(e) => setFormData({...formData, monto: e.target.value})} placeholder="0.00" />
              </div>
              <button className="btn-confirmar-blue" onClick={guardarPago}>Registrar Cliente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;