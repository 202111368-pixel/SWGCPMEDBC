import React, { useState, useMemo } from "react";
import "../../styles/pages/Pagos/Pagos.css"; 
import { 
  FaSearch, FaBars, FaTimes, FaCheckCircle, FaEdit, FaTrash,
  FaTimesCircle, FaCloudUploadAlt, FaWallet, FaReceipt, FaImage, FaSave 
} from "react-icons/fa";

const Pagos = () => {
  const [pagos, setPagos] = useState([
    { id: 314, cliente: "CARPINTERÍA LOS ANDES", monto: 350.50, metodo: "TRANSFERENCIA", estado: "PENDIENTE", voucherUrl: "https://i.imgur.com/8n9Xp8p.png" },
    { id: 1, cliente: "MUEBLES EL ROBLE S.A.C.", monto: 1250.00, metodo: "BCP", estado: "VALIDADO", voucherUrl: "https://i.imgur.com/8n9Xp8p.png" },
  ]);

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

  const handleEliminar = (id) => {
    if(window.confirm("¿Está seguro de eliminar este registro de pago?")) {
      setPagos(pagos.filter(p => p.id !== id));
      setMenuOpcionesId(null);
    }
  };

  const guardarPago = () => {
    if (editingPago) {
      setPagos(pagos.map(p => p.id === editingPago.id ? { ...p, monto: parseFloat(formData.monto), cliente: formData.cliente } : p));
    } else {
      const nuevo = { id: Date.now(), cliente: formData.cliente, monto: parseFloat(formData.monto), metodo: "YAPE", estado: "PENDIENTE", voucherUrl: "https://i.imgur.com/8n9Xp8p.png" };
      setPagos([nuevo, ...pagos]);
    }
    cerrarModales();
  };

  const abrirEditar = (pago) => {
    setEditingPago(pago);
    setFormData({ monto: pago.monto, cliente: pago.cliente });
    setShowModal(true);
    setMenuOpcionesId(null);
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setPagos(pagos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
    cerrarModales();
  };

  const filtrados = useMemo(() => 
    pagos.filter(p => p.cliente.toLowerCase().includes(searchTerm.toLowerCase())), 
  [pagos, searchTerm]);

  return (
    <div className="p-container fade-in">
      <div className="p-header">
        <div className="p-brand">
          <div className="p-icon-main"><FaWallet /></div>
          <div>
            <h2>Gestión de Pagos</h2>
          </div>
        </div>
        <div className="p-header-btns">
          <button className={`btn-mode ${isAdmin ? 'admin' : 'user'}`} onClick={() => setIsAdmin(!isAdmin)}>
            Modo: {isAdmin ? "Administrador" : "Cliente"}
          </button>
          {!isAdmin && (
            <button className="btn-add pulse" onClick={() => { setEditingPago(null); setShowModal(true); }}>
              <FaCloudUploadAlt /> Nuevo Pago
            </button>
          )}
        </div>
      </div>

      <div className="p-toolbar">
        <div className="p-search">
          <FaSearch />
          <input type="text" placeholder="Buscar por cliente..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {isAdmin && (
          <button className="btn-nota" onClick={() => setShowNotaModal(true)}>
            <FaReceipt /> Emitir Nota de Crédito
          </button>
        )}
      </div>

      <div className="p-card-table">
        <table className="p-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Monto Total</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td className="p-id">#TRX-{p.id}</td>
                <td className="p-name"><strong>{p.cliente}</strong></td>
                <td className="p-amount">S/ {p.monto.toFixed(2)}</td>
                <td><span className={`p-badge ${p.estado.toLowerCase()}`}>{p.estado}</span></td>
                <td className="text-center" style={{position: 'relative'}}>
                  <button className="btn-dots" onClick={() => setMenuOpcionesId(menuOpcionesId === p.id ? null : p.id)}>
                    <FaBars />
                  </button>
                  {menuOpcionesId === p.id && (
                    <div className="p-dropdown pop-in">
                      <button onClick={() => setShowVoucher(p)} className="opt-view"><FaImage /> Ver Voucher</button>
                      <button onClick={() => abrirEditar(p)} className="opt-edit"><FaEdit /> Editar</button>
                      {isAdmin && p.estado === "PENDIENTE" && (
                        <>
                          <button onClick={() => cambiarEstado(p.id, "VALIDADO")} className="opt-valid"><FaCheckCircle /> Validar</button>
                          <button onClick={() => cambiarEstado(p.id, "RECHAZADO")} className="opt-reject"><FaTimesCircle /> Rechazar</button>
                        </>
                      )}
                      <button onClick={() => handleEliminar(p.id)} className="opt-del"><FaTrash /> Eliminar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showVoucher && (
        <div className="v-overlay" onClick={cerrarModales}>
          <div className="v-modal bounce-in" onClick={e => e.stopPropagation()}>
            <div className="v-header">
              <h3>Comprobante: {showVoucher.cliente}</h3>
              <button onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div className="v-img-container">
              <img src={showVoucher.voucherUrl} alt="Voucher Full" />
            </div>
            <div className="v-footer">
              <div className="v-price"><span>Total a Validar:</span> <h3>S/ {showVoucher.monto.toFixed(2)}</h3></div>
              {isAdmin && showVoucher.estado === "PENDIENTE" && (
                <div className="v-actions">
                   <button className="btn-v-reject" onClick={() => cambiarEstado(showVoucher.id, "RECHAZADO")}>Rechazar</button>
                   <button className="btn-v-approve" onClick={() => cambiarEstado(showVoucher.id, "VALIDADO")}>Aprobar Ahora</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="v-overlay">
          <div className="v-modal-small scale-in">
            <div className="v-header">
              <h3>{editingPago ? "Editar Registro" : "Nuevo Comprobante"}</h3>
              <button onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div className="v-body">
              <label>Cliente / Razón Social</label>
              <input type="text" className="v-input" value={formData.cliente} onChange={(e) => setFormData({...formData, cliente: e.target.value})} />
              <label>Monto del Pago (S/)</label>
              <input type="number" className="v-input" value={formData.monto} onChange={(e) => setFormData({...formData, monto: e.target.value})} />
              {!editingPago && <><label>Adjuntar Imagen</label><input type="file" className="v-input" /></>}
            </div>
            <div className="v-footer">
              <button className="btn-v-approve w-100" onClick={guardarPago}><FaSave /> Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}

      {showNotaModal && (
        <div className="v-overlay">
          <div className="v-modal-small scale-in">
            <div className="v-header nota-head">
              <h3><FaReceipt /> Emitir Nota de Crédito</h3>
              <button onClick={cerrarModales}><FaTimes /></button>
            </div>
            <div className="v-body">
              <div className="nota-info">Generar devolución para cliente.</div>
              <label>Monto a Devolver</label>
              <input type="number" className="v-input" placeholder="0.00" />
              <label>Motivo de la Devolución</label>
              <textarea className="v-input" rows="3" placeholder="Ej: Error en el cálculo de m²..."></textarea>
            </div>
            <div className="v-footer">
              <button className="btn-nota-final" onClick={cerrarModales}>Generar Nota</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagos;