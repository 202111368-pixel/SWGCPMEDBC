import React, { useState, useMemo } from "react";
import { 
  FaCashRegister, FaSearch, FaBars, FaTimes, FaCheckDouble, 
  FaTrash, FaWallet, FaReceipt, FaHistory, FaCheckCircle, FaBan 
} from "react-icons/fa";
import "../../styles/pages/Cajero/Cajero.css"; 

const Cajero = () => {
  const [operaciones, setOperaciones] = useState([
    { id: 101, cliente: "INDUSTRIAL HUANCAYO", monto: 1550.00, metodo: "TRANSFERENCIA", estado: "PENDIENTE", comprobante: "B001-0023" },
    { id: 102, cliente: "MUEBLES LIMA S.A.", monto: 420.50, metodo: "EFECTIVO", estado: "CONFIRMADO", comprobante: "F001-0892" },
  ]);

  const [showValidar, setShowValidar] = useState(false);
  const [opSeleccionada, setOpSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuId, setMenuId] = useState(null);

  const filtrados = useMemo(() => {
    return operaciones.filter(o => 
      o.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.comprobante.includes(searchTerm)
    );
  }, [operaciones, searchTerm]);

  const procesarPago = (id, nuevoEstado) => {
    setOperaciones(operaciones.map(op => 
      op.id === id ? { ...op, estado: nuevoEstado } : op
    ));
    setShowValidar(false);
    setOpSeleccionada(null);
  };

  const balanceCaja = useMemo(() => {
    return operaciones
      .filter(o => o.estado === "CONFIRMADO")
      .reduce((acc, curr) => acc + curr.monto, 0);
  }, [operaciones]);

  return (
    <div className="caja-wrapper fade-in">
      <header className="caja-header">
        <div className="caja-title">
          <div className="caja-icon-box"><FaCashRegister /></div>
          <div>
            <h1>Control de Tesorería</h1>
            <p>Validación y Flujo de Caja</p>
          </div>
        </div>
        <div className="caja-balance-card">
          <span className="balance-label">EFECTIVO EN CAJA</span>
          <h2 className="balance-amount">S/ {balanceCaja.toFixed(2)}</h2>
        </div>
      </header>

      <div className="caja-controls">
        <div className="search-wrapper">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Buscar por cliente o factura..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="caja-stats">
          <div className="stat-pill"><FaHistory /> Pendientes: {operaciones.filter(o => o.estado === "PENDIENTE").length}</div>
        </div>
      </div>

      <div className="caja-table-container">
        <table className="caja-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Documento</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((op) => (
              <tr key={op.id} className={op.estado === "PENDIENTE" ? "row-pending" : ""}>
                <td className="txt-id">#{op.id}</td>
                <td className="txt-doc">{op.comprobante}</td>
                <td className="txt-client"><strong>{op.cliente}</strong></td>
                <td className="txt-monto">S/ {op.monto.toFixed(2)}</td>
                <td><span className="method-tag">{op.metodo}</span></td>
                <td>
                  <span className={`state-tag ${op.estado.toLowerCase()}`}>
                    {op.estado}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-menu" onClick={() => setMenuId(menuId === op.id ? null : op.id)}>
                    <FaBars />
                  </button>
                  {menuId === op.id && (
                    <div className="caja-dropdown">
                      {op.estado === "PENDIENTE" && (
                        <button onClick={() => { setOpSeleccionada(op); setShowValidar(true); setMenuId(null); }} className="opt-confirm">
                          <FaCheckDouble /> Validar Pago
                        </button>
                      )}
                      <button className="opt-print"><FaReceipt /> Re-imprimir</button>
                      <button onClick={() => setOperaciones(operaciones.filter(x => x.id !== op.id))} className="opt-cancel">
                        <FaTrash /> Anular
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showValidar && opSeleccionada && (
        <div className="caja-overlay">
          <div className="caja-modal scale-in">
            <div className="modal-top">
              <h3>Confirmación de Cobro</h3>
              <button onClick={() => setShowValidar(false)}><FaTimes /></button>
            </div>
            <div className="modal-content">
              <div className="pay-summary">
                <div className="sum-item"><span>Cliente:</span> <strong>{opSeleccionada.cliente}</strong></div>
                <div className="sum-item"><span>Documento:</span> <strong>{opSeleccionada.comprobante}</strong></div>
                <div className="sum-item"><span>Medio de Pago:</span> <strong>{opSeleccionada.metodo}</strong></div>
              </div>
              <div className="pay-total">
                <FaWallet />
                <div>
                  <p>Monto a Confirmar</p>
                  <h1>S/ {opSeleccionada.monto.toFixed(2)}</h1>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-reject-p" onClick={() => procesarPago(opSeleccionada.id, "RECHAZADO")}>
                <FaBan /> Rechazar
              </button>
              <button className="btn-confirm-p" onClick={() => procesarPago(opSeleccionada.id, "CONFIRMADO")}>
                <FaCheckCircle /> Confirmar Ingreso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cajero;