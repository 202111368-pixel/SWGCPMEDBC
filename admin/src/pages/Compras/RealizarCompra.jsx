import React, { useState } from "react";
import "../../styles/RealizarCompras.css";

const RealizarCompra = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [compras, setCompras] = useState([]);

  const [proveedor, setProveedor] = useState("");
  const [comprobante, setComprobante] = useState("TICKET");
  const [fecha, setFecha] = useState("");
  const [pago, setPago] = useState("CONTADO");

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  const guardarCompra = () => {
    if (!proveedor || !fecha) {
      alert("Complete los campos obligatorios");
      return;
    }

    const nuevaCompra = {
      proveedor,
      comprobante,
      fecha,
      pago,
    };

    setCompras([...compras, nuevaCompra]);

    cerrarModal();

    setProveedor("");
    setComprobante("TICKET");
    setFecha("");
    setPago("CONTADO");
  };

  return (
    <div className="realizar-compra-container">

      <div className="header-section">
        <h2>Compras</h2>
        <button className="btn-agregar" onClick={abrirModal}>
          Agregar Nueva Compra
        </button>
      </div>

      <div className="tabla-wrapper">
        <div className="tabla-container">
          <h3>Compras Registradas</h3>

          <table className="tabla-compras">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Forma Pago</th>
              </tr>
            </thead>

            <tbody>
              {compras.map((c, index) => (
                <tr key={index}>
                  <td>{c.proveedor}</td>
                  <td>{c.comprobante}</td>
                  <td>{c.fecha}</td>
                  <td>{c.pago}</td>
                </tr>
              ))}

              {compras.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "12px" }}>
                    No hay compras registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h2>Registrar Compra</h2>

            <div className="total-box">
              <h1>S/ 0.00</h1>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Proveedor</label>
                <select
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  <option>Melamina Perú</option>
                  <option>Maderas & Melamina SAC</option>
                  <option>Melaminas Andinas</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo Comprobante</label>
                <select
                  value={comprobante}
                  onChange={(e) => setComprobante(e.target.value)}
                >
                  <option>TICKET</option>
                  <option>FACTURA</option>
                  <option>BOLETA</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fecha Comprobante</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Forma de Pago</label>
                <select value={pago} onChange={(e) => setPago(e.target.value)}>
                  <option>CONTADO</option>
                  <option>CREDITO</option>
                </select>
              </div>
            </div>

            <div className="modal-buttons">
              <button className="btn-guardar" onClick={guardarCompra}>
                Guardar
              </button>
              <button className="btn-cerrar" onClick={cerrarModal}>
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default RealizarCompra;
