import React, { useState } from "react";
import "../../styles/pages/Ventas.css";

const RegistrarVenta = () => {
  const [venta, setVenta] = useState({
    cliente: "",
    documento: "",
    fecha: "",
    tipoComprobante: "Boleta",
    medioPago: "Efectivo",
    notas: "",
  });

  const [items, setItems] = useState([]);

  const [itemForm, setItemForm] = useState({
    descripcion: "",
    cantidad: "",
    precioUnit: "",
  });

  const [ventas, setVentas] = useState([]);
  const [editingVentaId, setEditingVentaId] = useState(null);

  const handleVentaChange = (e) => {
    const { name, value } = e.target;
    setVenta({ ...venta, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemForm({ ...itemForm, [name]: value });
  };

  const handleAgregarItem = (e) => {
    e.preventDefault();

    if (!itemForm.descripcion || !itemForm.cantidad || !itemForm.precioUnit) {
      alert("Completa descripción, cantidad y precio unitario.");
      return;
    }

    const cantidad = Number(itemForm.cantidad);
    const precioUnit = Number(itemForm.precioUnit);

    if (cantidad <= 0 || precioUnit <= 0) {
      alert("Cantidad y precio deben ser mayores a 0.");
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      descripcion: itemForm.descripcion,
      cantidad,
      precioUnit,
      subtotal: cantidad * precioUnit,
    };

    setItems([...items, nuevoItem]);

    setItemForm({
      descripcion: "",
      cantidad: "",
      precioUnit: "",
    });
  };

  const handleEliminarItem = (id) => {
    const filtrados = items.filter((it) => it.id !== id);
    setItems(filtrados);
  };

  const totalBruto = items.reduce((acc, it) => acc + it.subtotal, 0);
  const igv = totalBruto * 0.18;
  const totalNeto = totalBruto + igv;

  const resetVentaForm = () => {
    setVenta({
      cliente: "",
      documento: "",
      fecha: "",
      tipoComprobante: "Boleta",
      medioPago: "Efectivo",
      notas: "",
    });
    setItems([]);
    setEditingVentaId(null);
  };

  const handleRegistrarVenta = () => {
    if (!venta.cliente || !venta.fecha || items.length === 0) {
      alert("Completa cliente, fecha y agrega al menos un producto.");
      return;
    }

    const ventaCompleta = {
      id: editingVentaId || Date.now(),
      ...venta,
      items,
      totalBruto,
      igv,
      totalNeto,
      fechaRegistro: new Date().toISOString(),
    };

    if (editingVentaId) {
      const actualizadas = ventas.map((v) =>
        v.id === editingVentaId ? ventaCompleta : v
      );
      setVentas(actualizadas);
      alert("Venta actualizada (demo, solo en frontend).");
    } else {
      setVentas([...ventas, ventaCompleta]);
      alert("Venta registrada (demo, solo en frontend).");
    }

    resetVentaForm();
  };

  const handleEditarVenta = (ventaSel) => {
    setVenta({
      cliente: ventaSel.cliente,
      documento: ventaSel.documento,
      fecha: ventaSel.fecha,
      tipoComprobante: ventaSel.tipoComprobante,
      medioPago: ventaSel.medioPago,
      notas: ventaSel.notas || "",
    });
    setItems(ventaSel.items || []);
    setEditingVentaId(ventaSel.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminarVenta = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta venta?")) return;

    const filtradas = ventas.filter((v) => v.id !== id);
    setVentas(filtradas);

    if (editingVentaId === id) {
      resetVentaForm();
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Registrar Venta</h2>
      <p className="page-description">
        Registra ventas de productos de melamina y servicios asociados para D’Bary Company.
      </p>

      <div className="venta-layout">
        <div className="card">
          <h3>Datos de la venta</h3>

          <div className="venta-form">
            <div className="form-group">
              <label>Cliente</label>
              <input
                type="text"
                name="cliente"
                value={venta.cliente}
                onChange={handleVentaChange}
                placeholder="Ej. Carpintería Los Cedros"
              />
            </div>

            <div className="form-group">
              <label>DNI / RUC</label>
              <input
                type="text"
                name="documento"
                value={venta.documento}
                onChange={handleVentaChange}
                placeholder="Ej. 10456789012"
              />
            </div>

            <div className="form-group">
              <label>Fecha de venta</label>
              <input
                type="date"
                name="fecha"
                value={venta.fecha}
                onChange={handleVentaChange}
              />
            </div>

            <div className="form-group">
              <label>Tipo de comprobante</label>
              <select
                name="tipoComprobante"
                value={venta.tipoComprobante}
                onChange={handleVentaChange}
              >
                <option value="Boleta">Boleta</option>
                <option value="Factura">Factura</option>
                <option value="Ticket interno">Ticket interno</option>
              </select>
            </div>

            <div className="form-group">
              <label>Medio de pago</label>
              <select
                name="medioPago"
                value={venta.medioPago}
                onChange={handleVentaChange}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Yape/Plin">Yape / Plin</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label>Notas / Observaciones</label>
              <textarea
                name="notas"
                value={venta.notas}
                onChange={handleVentaChange}
                placeholder="Ej. Incluye corte de melamina y bordeado. Entrega en 48 horas."
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Productos y servicios</h3>

          <form className="producto-form" onSubmit={handleAgregarItem}>
            <div className="form-group form-group-full">
              <label>Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={itemForm.descripcion}
                onChange={handleItemChange}
                placeholder="Ej. Melamina MDF 18mm Blanco x plancha"
              />
            </div>

            <div className="form-group">
              <label>Cantidad</label>
              <input
                type="number"
                name="cantidad"
                value={itemForm.cantidad}
                onChange={handleItemChange}
                placeholder="Ej. 3"
              />
            </div>

            <div className="form-group">
              <label>Precio unitario (S/)</label>
              <input
                type="number"
                name="precioUnit"
                value={itemForm.precioUnit}
                onChange={handleItemChange}
                placeholder="Ej. 180.00"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn">
                Agregar a la venta
              </button>
            </div>
          </form>

          {items.length === 0 ? (
            <p className="empty-state">
              Aún no hay productos en la venta. Agrega al menos un producto o servicio.
            </p>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-header">
                    <h4>{item.descripcion}</h4>
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      onClick={() => handleEliminarItem(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                  <div className="item-body">
                    <span>Cant.: {item.cantidad}</span>
                    <span>PU: S/ {item.precioUnit.toFixed(2)}</span>
                  </div>
                  <div className="item-footer">
                    <span>Subtotal</span>
                    <strong>S/ {item.subtotal.toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="totales-venta">
            <div className="total-row">
              <span>Subtotal</span>
              <span>S/ {totalBruto.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>IGV (18%)</span>
              <span>S/ {igv.toFixed(2)}</span>
            </div>
            <div className="total-row total-final">
              <span>Total a cobrar</span>
              <span>S/ {totalNeto.toFixed(2)}</span>
            </div>
          </div>

          <div className="acciones-venta">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegistrarVenta}
            >
              {editingVentaId ? "Actualizar venta" : "Registrar venta"}
            </button>
          </div>
        </div>
      </div>

      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Historial de ventas (sesión actual)</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Comprobante</th>
                <th>Medio de pago</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    Aún no se han registrado ventas en esta sesión.
                  </td>
                </tr>
              ) : (
                ventas.map((v, index) => (
                  <tr key={v.id}>
                    <td>{index + 1}</td>
                    <td>{v.cliente}</td>
                    <td>
                      {v.fecha
                        ? new Date(v.fecha).toLocaleDateString("es-PE")
                        : "-"}
                    </td>
                    <td>{v.tipoComprobante}</td>
                    <td>{v.medioPago}</td>
                    <td>S/ {v.totalNeto.toFixed(2)}</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        onClick={() => handleEditarVenta(v)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-small"
                        onClick={() => handleEliminarVenta(v.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrarVenta;
