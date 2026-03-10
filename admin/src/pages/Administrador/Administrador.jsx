import React, { useState, useMemo } from "react";
import { 
  FaUserShield, FaUsers, FaCog, FaSearch, FaBars, FaCheckCircle, FaEdit, FaTrash,
  FaTimesCircle, FaCloudUploadAlt, FaWallet, FaReceipt, FaImage, FaSave, FaTimes 
} from "react-icons/fa";
import "../../styles/pages/Administrador/Administrador.css"; 

const Administrador = () => {
  const [pagos, setPagos] = useState([
    { id: 314, cliente: "CARPINTERÍA LOS ANDES", monto: 350.50, metodo: "TRANSFERENCIA", estado: "PENDIENTE", voucherUrl: "https://i.imgur.com/8n9Xp8p.png" },
    { id: 1, cliente: "MUEBLES EL ROBLE S.A.C.", monto: 1250.00, metodo: "BCP", estado: "VALIDADO", voucherUrl: "https://i.imgur.com/8n9Xp8p.png" },
  ]);

  const [activeTab, setActiveTab] = useState("pagos");
  const [isAdmin, setIsAdmin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showNotaModal, setShowNotaModal] = useState(false);
  const [showVoucher, setShowVoucher] = useState(null);
  const [editingPago, setEditingPago] = useState(null);
  const [menuOpcionesId, setMenuOpcionesId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ monto: "", cliente: "" });

  const cerrarModales = () => {
    setShowModal(false);
    setShowNotaModal(false);
    setShowVoucher(null);
    setEditingPago(null);
    setMenuOpcionesId(null);
  };

  const guardarPago = () => {
    if (!formData.cliente || !formData.monto) return;
    
    if (editingPago) {
      setPagos(pagos.map(p => p.id === editingPago.id ? { ...p, monto: parseFloat(formData.monto), cliente: formData.cliente } : p));
    } else {
      const nuevo = { 
        id: Date.now(), 
        cliente: formData.cliente, 
        monto: parseFloat(formData.monto), 
        metodo: "YAPE", 
        estado: "PENDIENTE", 
        voucherUrl: "https://i.imgur.com/8n9Xp8p.png" 
      };
      setPagos([nuevo, ...pagos]);
    }
    cerrarModales();
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setPagos(pagos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    cerrarModales();
  };

  const eliminarRegistro = (id) => {
    if (window.confirm("¿Confirmar eliminación?")) {
      setPagos(pagos.filter(p => p.id !== id));
      setMenuOpcionesId(null);
    }
  };

  const filtrados = useMemo(() => 
    pagos.filter(p => p.cliente.toLowerCase().includes(searchTerm.toLowerCase())), 
  [pagos, searchTerm]);

  return (
    <div className="admin-main-wrapper fade-in">
      <header className="admin-top-bar">
        <div className="brand-section">
          <div className="brand-logo-bg"><FaUserShield /></div>
          <div>
            <h1>Gestión de Admintrador</h1>
          </div>
        </div>
        <div className="admin-user-pills">
          <button className={`role-pill ${isAdmin ? 'active-admin' : ''}`} onClick={() => setIsAdmin(!isAdmin)}>
            {isAdmin ? "Acceso Total" : "Vista Limitada"}
          </button>
        </div>
      </header>

      <nav className="admin-tabs">
        <button className={activeTab === "pagos" ? "tab-active" : ""} onClick={() => setActiveTab("pagos")}>
          <FaWallet /> Finanzas
        </button>
        <button className={activeTab === "usuarios" ? "tab-active" : ""} onClick={() => setActiveTab("usuarios")}>
          <FaUsers /> Roles
        </button>
        <button className={activeTab === "sistema" ? "tab-active" : ""} onClick={() => setActiveTab("sistema")}>
          <FaCog /> Sistema
        </button>
      </nav>

      {activeTab === "pagos" ? (
        <main className="admin-content">
          <div className="action-row">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Filtrar por cliente..." onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="button-group">
              {isAdmin && (
                <button className="btn-secondary-dark" onClick={() => setShowNotaModal(true)}>
                  <FaReceipt /> Nota de Crédito
                </button>
              )}
              <button className="btn-primary-blue" onClick={() => { setEditingPago(null); setFormData({monto:"", cliente:""}); setShowModal(true); }}>
                <FaCloudUploadAlt /> Nuevo Registro
              </button>
            </div>
          </div>

          <div className="data-card">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) => (
                  <tr key={p.id}>
                    <td className="col-id">#ID-{p.id}</td>
                    <td className="col-user"><strong>{p.cliente}</strong></td>
                    <td className="col-price">S/ {p.monto.toFixed(2)}</td>
                    <td><span className={`status-pill ${p.estado.toLowerCase()}`}>{p.estado}</span></td>
                    <td className="col-actions">
                      <button className="dot-btn" onClick={() => setMenuOpcionesId(menuOpcionesId === p.id ? null : p.id)}>
                        <FaBars />
                      </button>
                      {menuOpcionesId === p.id && (
                        <div className="action-menu pop-in">
                          <button onClick={() => setShowVoucher(p)}><FaImage /> Voucher</button>
                          <button onClick={() => { setEditingPago(p); setFormData({monto: p.monto, cliente: p.cliente}); setShowModal(true); setMenuOpcionesId(null); }}><FaEdit /> Editar</button>
                          {isAdmin && p.estado === "PENDIENTE" && (
                            <>
                              <button onClick={() => cambiarEstado(p.id, "VALIDADO")} className="text-success"><FaCheckCircle /> Validar</button>
                              <button onClick={() => cambiarEstado(p.id, "RECHAZADO")} className="text-danger"><FaTimesCircle /> Rechazar</button>
                            </>
                          )}
                          <button onClick={() => eliminarRegistro(p.id)} className="text-muted"><FaTrash /> Borrar</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      ) : (
        <div className="placeholder-view">
          <FaCog className="icon-spin" />
          <h2>Módulo en desarrollo</h2>
          <p>La pestaña {activeTab} estará disponible pronto.</p>
        </div>
      )}

      {showVoucher && (
        <div className="modal-overlay" onClick={cerrarModales}>
          <div className="modal-container-large bounce-in" onClick={e => e.stopPropagation()}>
            <div className="modal-top">
              <h3>Comprobante Digital</h3>
              <button className="close-btn" onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div className="modal-view-img">
              <img src={showVoucher.voucherUrl} alt="Documento" />
            </div>
            <div className="modal-bottom">
              <div className="price-tag"><span>Importe:</span> <h3>S/ {showVoucher.monto.toFixed(2)}</h3></div>
              {isAdmin && showVoucher.estado === "PENDIENTE" && (
                <div className="modal-btn-row">
                   <button className="btn-reject" onClick={() => cambiarEstado(showVoucher.id, "RECHAZADO")}>Rechazar</button>
                   <button className="btn-approve" onClick={() => cambiarEstado(showVoucher.id, "VALIDADO")}>Validar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container-small scale-in">
            <div className="modal-top">
              <h3>{editingPago ? "Editar Operación" : "Registrar Pago"}</h3>
              <button className="close-btn" onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div className="modal-form">
              <div className="field">
                <label>Nombre del Cliente</label>
                <input type="text" value={formData.cliente} onChange={(e) => setFormData({...formData, cliente: e.target.value.toUpperCase()})} />
              </div>
              <div className="field">
                <label>Monto Total (S/)</label>
                <input type="number" value={formData.monto} onChange={(e) => setFormData({...formData, monto: e.target.value})} />
              </div>
            </div>
            <div className="modal-footer-full">
              <button className="btn-save-all" onClick={guardarPago}><FaSave /> Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {showNotaModal && (
        <div className="modal-overlay">
          <div className="modal-container-small scale-in">
            <div className="modal-top dark-head">
              <h3>Nota de Crédito</h3>
              <button className="close-btn" onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div className="modal-form">
              <div className="info-box">Generación de documento para devolución o ajuste.</div>
              <div className="field">
                <label>Monto</label>
                <input type="number" placeholder="0.00" />
              </div>
              <div className="field">
                <label>Motivo</label>
                <textarea rows="3" placeholder="Descripción..."></textarea>
              </div>
            </div>
            <div className="modal-footer-full">
              <button className="btn-dark-confirm" onClick={cerrarModales}>Confirmar Nota</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;