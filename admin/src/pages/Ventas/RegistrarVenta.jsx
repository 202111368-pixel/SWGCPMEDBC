import React, { useState } from "react";
import "../../styles/pages/Ventas/Ventas.css"; 
import { FaPlus, FaSearch, FaBars, FaTimes, FaEdit, FaTrash, FaFileInvoiceDollar, FaInfoCircle } from "react-icons/fa";

const RegistrarVenta = () => {
  const [ventas, setVentas] = useState([
    { id: 1, cliente: "CARPINTERÍA LOS ANDES", documento: "20541236541", fecha: "2026-02-27", tipoComprobante: "FACTURA", medioPago: "EFECTIVO", totalNeto: 350.50 },
    { id: 2, cliente: "JUAN PÉREZ", documento: "70123456", fecha: "2026-02-27", tipoComprobante: "BOLETA", medioPago: "YAPE", totalNeto: 85.00 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [menuOpcionesId, setMenuOpcionesId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    id: null, 
    cliente: "", 
    documento: "", 
    fecha: new Date().toISOString().split("T")[0], 
    tipoComprobante: "BOLE  TA", 
    medioPago: "EFECTIVO", 
    totalNeto: "" 
  });

  const abrirModal = (venta = null) => {
    if (venta) {
      setFormData(venta);
    } else {
      setFormData({ 
        id: null, 
        cliente: "", 
        documento: "", 
        fecha: new Date().toISOString().split("T")[0], 
        tipoComprobante: "BOLETA", 
        medioPago: "EFECTIVO", 
        totalNeto: "" 
      });
    }
    setShowModal(true);
    setMenuOpcionesId(null);
  };

  const cerrarModal = () => setShowModal(false);

  const guardarVenta = () => {
    if (!formData.cliente.trim() || !formData.fecha || !formData.totalNeto) {
      alert("Por favor ingrese el Cliente, la Fecha y el Total.");
      return;
    }

    const ventaGuardar = {
      ...formData,
      totalNeto: Number(formData.totalNeto)
    };

    if (formData.id) {
      setVentas(ventas.map(v => v.id === formData.id ? ventaGuardar : v));
    } else {
      ventaGuardar.id = Date.now();
      setVentas([ventaGuardar, ...ventas]);
    }
    cerrarModal();
  };

  const eliminarVenta = (id) => {
    if (window.confirm("¿Estás seguro de anular esta venta?")) {
      setVentas(ventas.filter(v => v.id !== id));
      setMenuOpcionesId(null);
    }
  };

  return (
    <div className="ventas-container fade-in-up">
      
      <div className="ventas-header">
        <h2>Gestión de Ventas</h2>
        <button className="btn-agregar pulse-hover" onClick={() => abrirModal()}>
          <FaPlus style={{ marginRight: "8px" }} /> Agregar Nueva
        </button>
      </div>

      <div className="ventas-toolbar">
        <div className="search-group">
          <label>Buscar:</label>
          <div className="input-with-icon">
            <input type="text" className="input-animado input-moderno" placeholder="Buscar por cliente o doc..." />
            <FaSearch className="icon-search" />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="ventas-table">
          <thead>
            <tr>
              <th>Cód. <span>↕</span></th>
              <th>Cliente <span>↕</span></th>
              <th>Fecha <span>↕</span></th>
              <th>Comprobante <span>↕</span></th>
              <th>Medio Pago <span>↕</span></th>
              <th>Total (S/) <span>↕</span></th>
              <th>Opciones <span>↕</span></th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr><td colSpan="7" style={{ textAlign:"center", padding:"20px" }}>No hay ventas registradas.</td></tr>
            ) : (
              ventas.map((v, index) => (
                <tr key={v.id} className="row-animada" style={{ animationDelay: `${index * 0.1}s` }}>
                  <td><strong>V-{v.id.toString().slice(-4)}</strong></td>
                  <td>{v.cliente}</td>
                  <td>{v.fecha}</td>
                  <td><span className="badge-comprobante">{v.tipoComprobante}</span></td>
                  <td>{v.medioPago}</td>
                  <td><strong>S/ {v.totalNeto.toFixed(2)}</strong></td>
                  <td style={{ position: "relative" }}>
                    <button 
                      className="btn-opciones" 
                      onClick={() => setMenuOpcionesId(menuOpcionesId === v.id ? null : v.id)}
                    >
                      <FaBars />
                    </button>
                    
                    {menuOpcionesId === v.id && (
                      <div className="dropdown-opciones slide-in">
                        <button onClick={() => abrirModal(v)}><FaEdit className="icon-blue" /> Editar</button>
                        <button onClick={() => eliminarVenta(v.id)} className="text-danger"><FaTrash /> Anular</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay fade-in">
          <div className="modal-content bounce-in" style={{ maxWidth: "550px" }}>
            
            <div className="modal-header">
              <h3><FaFileInvoiceDollar style={{ color: "#2196f3", marginRight:"8px" }}/> Datos de la Venta</h3>
              <button className="btn-cerrar-modal" onClick={cerrarModal}><FaTimes /></button>
            </div>

            <div className="modal-body">
              <div className="alert-info float-anim">
                <FaInfoCircle className="icon-info" />
                <span>Los campos con <span className="text-danger">*</span> son obligatorios.</span>
              </div>

              <div className="form-group">
                <label>Cliente / Empresa <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="input-moderno"
                  placeholder="Ej. Juan Pérez" 
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>DNI / RUC</label>
                  <input 
                    type="text" 
                    className="input-moderno"
                    placeholder="Número" 
                    value={formData.documento}
                    onChange={(e) => setFormData({...formData, documento: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha <span className="text-danger">*</span></label>
                  <input 
                    type="date" 
                    className="input-moderno"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Comprobante</label>
                  <select 
                    className="input-moderno"
                    value={formData.tipoComprobante}
                    onChange={(e) => setFormData({...formData, tipoComprobante: e.target.value})}
                  >
                    <option value="BOLETA">Boleta</option>
                    <option value="FACTURA">Factura</option>
                    <option value="NOTA DE VENTA">Nota de Venta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Medio de Pago</label>
                  <select 
                    className="input-moderno"
                    value={formData.medioPago}
                    onChange={(e) => setFormData({...formData, medioPago: e.target.value})}
                  >
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="TARJETA">Tarjeta</option>
                    <option value="YAPE">Yape / Plin</option>
                    <option value="TRANSFERENCIA">Transferencia</option>
                  </select>
                </div>
              </div>

             <div className="form-group" style={{ marginTop: "20px" }}>
                <label>Total de la Venta (S/) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  step="0.01"
                  className="input-moderno input-total pulse-hover"
                  placeholder="0.00" 
                  value={formData.totalNeto}
                  onChange={(e) => setFormData({...formData, totalNeto: e.target.value})}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-guardar btn-animado" onClick={guardarVenta}>Guardar Venta</button>
              <button className="btn-cerrar btn-animado" onClick={cerrarModal}>Cancelar</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default RegistrarVenta;