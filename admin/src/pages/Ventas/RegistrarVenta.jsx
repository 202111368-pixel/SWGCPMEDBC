import React, { useState, useMemo, useCallback } from "react";
import "../../styles/pages/Ventas/Ventas.css"; 
import { 
  FaPlus, FaSearch, FaBars, FaTimes, FaEdit, FaTrash, 
  FaFileInvoiceDollar, FaCalculator, FaPercent, FaTools 
} from "react-icons/fa";

const RegistrarVenta = () => {
  const [ventas, setVentas] = useState([
    { id: 1, cliente: "CARPINTERÍA LOS ANDES", documento: "20541236541", fecha: "2026-02-27", total: 350.50, descuento: 0 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [menuOpcionesId, setMenuOpcionesId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [piezas, setPiezas] = useState([]);
  const [nuevaPieza, setNuevaPieza] = useState({ largo: "", ancho: "", cant: "" });

  const [formData, setFormData] = useState({ 
    id: null, cliente: "", documento: "", fecha: new Date().toISOString().split("T")[0], 
    tipoComprobante: "BOLETA", medioPago: "EFECTIVO", total: 0, descuento: 0 
  });

  const ventasFiltradas = useMemo(() => {
    return ventas.filter(v => 
      v.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
      v.documento.includes(searchTerm)
    );
  }, [ventas, searchTerm]);

  const agregarPieza = useCallback(() => {
    const L = Math.abs(Number(nuevaPieza.largo));
    const A = Math.abs(Number(nuevaPieza.ancho));
    const C = Math.abs(Number(nuevaPieza.cant));

    if (L <= 0 || A <= 0 || C <= 0) return;

    const aream2 = (L * A * C) / 1000000;
    const precioSugerido = aream2 * 85; 
    
    setPiezas(prev => [...prev, { largo: L, ancho: A, cant: C, id: Date.now(), subtotal: precioSugerido }]);
    setFormData(prev => ({ ...prev, total: prev.total + precioSugerido }));
    setNuevaPieza({ largo: "", ancho: "", cant: "" });
  }, [nuevaPieza]);

  const handleDescuento = (val) => {
    const num = Math.abs(Number(val));
    const valorFinal = num > formData.total ? formData.total : num;
    setFormData({ ...formData, descuento: valorFinal });
  };

  const guardarVenta = () => {
    if (!formData.cliente.trim() || formData.total <= 0) return;
    
    setVentas(prev => {
      const ventaFinal = { ...formData, total: formData.total - formData.descuento };
      if (formData.id) {
        return prev.map(v => v.id === formData.id ? ventaFinal : v);
      }
      return [{ ...ventaFinal, id: Date.now() }, ...prev];
    });
    setShowModal(false);
  };

  return (
    <div className="ventas-container fade-in-up">
      <div className="ventas-header">
        <div className="branding-ventas">
          <FaFileInvoiceDollar className="icon-main" />
          <h1>Gestión de Ventas</h1>
        </div>
        <button className="btn-agregar" onClick={() => { setShowModal(true); setPiezas([]); setFormData(f => ({...f, id: null, total: 0, descuento: 0})); }}>
          <FaPlus /> Nueva Venta
        </button>
      </div>

      <div className="ventas-toolbar">
        <div className="input-with-icon">
          <input type="text" placeholder="Buscar cliente o documento..." onChange={(e) => setSearchTerm(e.target.value)} />
          <FaSearch className="icon-search" />
        </div>
      </div>

      <div className="ia-card">
        <table className="ventas-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cliente</th>
              <th>Total Final</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltradas.map((v) => (
              <tr key={v.id} className="row-ia">
                <td><strong>#V-{v.id.toString().slice(-4)}</strong></td>
                <td>{v.cliente}</td>
                <td><span className="monto-ia">S/ {v.total.toFixed(2)}</span></td>
                <td style={{ position: "relative" }}>
                  <button className="btn-opciones" onClick={() => setMenuOpcionesId(menuOpcionesId === v.id ? null : v.id)}>
                    <FaBars />
                  </button>
                  {menuOpcionesId === v.id && (
                    <div className="dropdown-ventas">
                      <button onClick={() => { setFormData(v); setShowModal(true); }}><FaEdit /> Editar</button>
                      <button onClick={() => setVentas(ventas.filter(x => x.id !== v.id))} className="text-danger"><FaTrash /> Anular</button>
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
          <div className="modal-content-ventas bounce-in">
            <div className="modal-header-ventas">
              <h3><FaCalculator /> Detalle Técnico de Venta</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            
            <div className="modal-body-ventas">
              <div className="form-group">
                <label>Cliente / Razón Social</label>
                <input className="input-ia" value={formData.cliente} onChange={e => setFormData({...formData, cliente: e.target.value.toUpperCase()})} />
              </div>

              <div className="despiece-container">
                <h5><FaTools /> Optimizador de Cortes (m²)</h5>
                <div className="grid-despiece">
                  <input type="number" placeholder="Largo" value={nuevaPieza.largo} onChange={e => setNuevaPieza({...nuevaPieza, largo: e.target.value})} />
                  <input type="number" placeholder="Ancho" value={nuevaPieza.ancho} onChange={e => setNuevaPieza({...nuevaPieza, ancho: e.target.value})} />
                  <input type="number" placeholder="Cant" value={nuevaPieza.cant} onChange={e => setNuevaPieza({...nuevaPieza, cant: e.target.value})} />
                  <button className="btn-add-pieza" onClick={agregarPieza}>+</button>
                </div>
                <div className="lista-piezas">
                  {piezas.map(p => (
                    <div key={p.id} className="pieza-item">
                      <span>{p.cant} unid. {p.largo}x{p.ancho}mm</span>
                      <strong>S/ {p.subtotal.toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="promo-box">
                <span><FaPercent /> Descuento Especial:</span>
                <input type="number" min="0" value={formData.descuento} onChange={e => handleDescuento(e.target.value)} />
              </div>

              <div className="total-display">
                 <span className="label-total">Total a Pagar:</span>
                 <h1>S/ {(formData.total - formData.descuento).toFixed(2)}</h1>
              </div>
            </div>
            
            <div className="modal-footer-ventas">
              <button className="btn-save-v" onClick={guardarVenta}>Guardar y Finalizar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarVenta;