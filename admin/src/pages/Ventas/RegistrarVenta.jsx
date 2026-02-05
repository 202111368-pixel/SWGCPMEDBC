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
      alert("Completa todos los campos del producto.");
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
    setItems(items.filter((it) => it.id !== id));
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
      alert("Completa cliente, fecha y agrega productos.");
      return;
    }

    const ventaCompleta = {
      id: editingVentaId || Date.now(),
      ...venta,
      items,
      totalBruto,
      igv,
      totalNeto,
    };

    if (editingVentaId) {
      setVentas(ventas.map((v) => (v.id === editingVentaId ? ventaCompleta : v)));
      alert("Venta actualizada");
    } else {
      setVentas([...ventas, ventaCompleta]);
      alert("Venta registrada");
    }

    resetVentaForm();
  };

  const handleEditarVenta = (v) => {
    setVenta(v);
    setItems(v.items);
    setEditingVentaId(v.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEliminarVenta = (id) => {
    if (!window.confirm("¿Eliminar venta?")) return;
    setVentas(ventas.filter((v) => v.id !== id));
    if (editingVentaId === id) resetVentaForm();
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Registrar Venta</h2>

      <div className="card">
        <div className="venta-form">
          <input name="cliente" placeholder="Cliente" value={venta.cliente} onChange={handleVentaChange} />
          <input name="documento" placeholder="DNI / RUC" value={venta.documento} onChange={handleVentaChange} />
          <input type="date" name="fecha" value={venta.fecha} onChange={handleVentaChange} />

          <select name="tipoComprobante" value={venta.tipoComprobante} onChange={handleVentaChange}>
            <option>Boleta</option>
            <option>Factura</option>
          </select>

          <select name="medioPago" value={venta.medioPago} onChange={handleVentaChange}>
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Yape</option>
          </select>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleAgregarItem} className="producto-form">
          <input name="descripcion" placeholder="Producto" value={itemForm.descripcion} onChange={handleItemChange} />
          <input type="number" name="cantidad" placeholder="Cantidad" value={itemForm.cantidad} onChange={handleItemChange} />
          <input type="number" name="precioUnit" placeholder="Precio" value={itemForm.precioUnit} onChange={handleItemChange} />
          <button className="btn">Agregar</button>
        </form>

        {items.map((it) => (
          <div key={it.id} className="item-card">
            {it.descripcion} — {it.cantidad} x S/ {it.precioUnit}
            <button className="btn btn-danger btn-small" onClick={() => handleEliminarItem(it.id)}>
              Quitar
            </button>
          </div>
        ))}

        <div className="totales-venta">
          <div>Subtotal: S/ {totalBruto.toFixed(2)}</div>
          <div>IGV: S/ {igv.toFixed(2)}</div>
          <strong>Total: S/ {totalNeto.toFixed(2)}</strong>
        </div>

        <div className="acciones-venta">
          <button className="btn btn-primary" onClick={handleRegistrarVenta}>
            {editingVentaId ? "Actualizar Venta" : "Registrar Venta"}
          </button>

          <button className="btn btn-secondary" onClick={resetVentaForm}>
            Limpiar
          </button>
        </div>
      </div>

      <div className="card table-wrapper">
        <h3>Historial de Ventas</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v, i) => (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>{v.cliente}</td>
                <td>{v.fecha}</td>
                <td>S/ {v.totalNeto.toFixed(2)}</td>
                <td>
                  <button className="btn btn-small btn-secondary" onClick={() => handleEditarVenta(v)}>
                    Editar
                  </button>
                  <button className="btn btn-small btn-danger" onClick={() => handleEliminarVenta(v.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrarVenta;
