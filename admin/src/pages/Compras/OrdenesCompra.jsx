import React, { useState, useMemo } from "react";
import "../../styles/pages/Compras.css";

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDrawer, setMostrarDrawer] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [archivoNombre, setArchivoNombre] = useState("");

  const [form, setForm] = useState({
    numeroOrden: "",
    proveedor: "",
    fecha: "",
    estado: "Borrador",
    tipoCompra: "Melamina",
    montoEstimado: "",
    notas: "",
    adjuntoNombre: "",
  });

  const [items, setItems] = useState([]);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [itemTemp, setItemTemp] = useState({
    cantidad: "",
    itemProveedor: "",
    descripcion: "",
    costoUnitario: "",
    importe: "0.00",
    notas: "",
  });

  const resetForm = () => {
    setForm({
      numeroOrden: "",
      proveedor: "",
      fecha: "",
      estado: "Borrador",
      tipoCompra: "Melamina",
      montoEstimado: "",
      notas: "",
      adjuntoNombre: "",
    });
    setArchivoNombre("");
    setItems([]);
    setEditingId(null);
    setEditingItemIndex(null);
    setItemTemp({
      cantidad: "",
      itemProveedor: "",
      descripcion: "",
      costoUnitario: "",
      importe: "0.00",
      notas: "",
    });
  };

  const toggleDrawer = () => {
    setMostrarDrawer((v) => !v);
    if (mostrarDrawer) resetForm();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoNombre(file.name);
      setForm((prev) => ({ ...prev, adjuntoNombre: file.name }));
    } else {
      setArchivoNombre("");
      setForm((prev) => ({ ...prev, adjuntoNombre: "" }));
    }
  };

  const handleItemTempChange = (e) => {
    const { name, value } = e.target;
    let next = { ...itemTemp, [name]: value };

    const cantidadNum = Number(next.cantidad) || 0;
    const costoNum = Number(next.costoUnitario) || 0;
    next.importe = (cantidadNum * costoNum).toFixed(2);

    setItemTemp(next);
  };

  const addOrUpdateItem = (e) => {
    e.preventDefault();
    if (!itemTemp.cantidad || !itemTemp.descripcion) {
      alert("Completa al menos cantidad y descripción del ítem.");
      return;
    }

    if (editingItemIndex === null) {
      setItems((prev) => [...prev, { ...itemTemp, id: Date.now() }]);
    } else {
      setItems((prev) =>
        prev.map((it, idx) => (idx === editingItemIndex ? { ...itemTemp, id: it.id } : it))
      );
    }

    setItemTemp({
      cantidad: "",
      itemProveedor: "",
      descripcion: "",
      costoUnitario: "",
      importe: "0.00",
      notas: "",
    });
    setEditingItemIndex(null);
  };

  const handleEditItem = (index) => {
    const it = items[index];
    setItemTemp({
      cantidad: it.cantidad,
      itemProveedor: it.itemProveedor,
      descripcion: it.descripcion,
      costoUnitario: it.costoUnitario,
      importe: it.importe,
      notas: it.notas || "",
    });
    setEditingItemIndex(index);
  };

  const handleDeleteItem = (index) => {
    if (!window.confirm("Eliminar este ítem?")) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
    setEditingItemIndex(null);
    setItemTemp({
      cantidad: "",
      itemProveedor: "",
      descripcion: "",
      costoUnitario: "",
      importe: "0.00",
      notas: "",
    });
  };

  const handleSubmitOrden = (e) => {
    e.preventDefault();

    if (!form.numeroOrden || !form.proveedor || !form.fecha) {
      alert("Completa N° de orden, proveedor y fecha.");
      return;
    }

    const ordenData = {
      id: editingId === null ? (ordenes.length > 0 ? ordenes[ordenes.length - 1].id + 1 : 1) : editingId,
      ...form,
      montoEstimado: form.montoEstimado ? Number(form.montoEstimado) : calculateTotalItems(items),
      items: items.map((it) => ({ ...it })),
      creadoEn: new Date().toISOString(),
    };

    if (editingId === null) {
      setOrdenes((prev) => [...prev, ordenData]);
    } else {
      setOrdenes((prev) => prev.map((o) => (o.id === editingId ? ordenData : o)));
    }

    setMostrarDrawer(false);
    resetForm();
  };

  const calculateTotalItems = (itemsList) => {
    return itemsList.reduce((acc, it) => acc + Number(it.importe || 0), 0);
  };

  const handleEditOrden = (orden) => {
    setMostrarDrawer(true);
    setEditingId(orden.id);
    setForm({
      numeroOrden: orden.numeroOrden,
      proveedor: orden.proveedor,
      fecha: orden.fecha,
      estado: orden.estado || "Borrador",
      tipoCompra: orden.tipoCompra || "Melamina",
      montoEstimado: orden.montoEstimado?.toString() || "",
      notas: orden.notas || "",
      adjuntoNombre: orden.adjuntoNombre || "",
    });
    setArchivoNombre(orden.adjuntoNombre || "");
    setItems(orden.items ? orden.items.map((it) => ({ ...it })) : []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteOrden = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta orden de compra?")) return;
    setOrdenes((prev) => prev.filter((o) => o.id !== id));
    if (editingId === id) resetForm();
  };

  const ordenesFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return ordenes;
    return ordenes.filter((o) => {
      return (
        (o.numeroOrden || "").toLowerCase().includes(q) ||
        (o.proveedor || "").toLowerCase().includes(q) ||
        (o.estado || "").toLowerCase().includes(q)
      );
    });
  }, [ordenes, busqueda]);

  const getEstadoClase = (estado) => {
    switch (estado) {
      case "Borrador":
        return "badge-estado borrador";
      case "Enviada":
        return "badge-estado enviada";
      case "Recibida":
        return "badge-estado recibida";
      case "Cerrada":
        return "badge-estado cerrada";
      default:
        return "badge-estado";
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Órdenes de Compra - D’Bary Company</h2>
      <p className="page-description">
        Gestión y comercialización de productos de melamina — registro de órdenes y control de ítems.
      </p>

      <div className="card-header">
  <h3>{editingId ? "Editar orden de compra" : "Gestión de órdenes de compra"}</h3>

  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>

    <input
      type="text"
      placeholder="Buscar por N° de orden, proveedor o estado..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      className="input-busqueda"
    />

    <button
      type="button"
      className="btn btn-primary"
      onClick={() => setMostrarDrawer(!mostrarDrawer)}
    >
      Nueva orden +
    </button>

    <button
      type="button"
      className="btn btn-success"
      onClick={() => alert("Exportar Excel pronto disponible")}
    >
      Excel
    </button>

    <button
      type="button"
      className="btn btn-danger"
      onClick={() => alert("Exportar PDF pronto disponible")}
    >
      PDF
    </button>

  </div>
</div>


      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Listado de órdenes de compra</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>N° Orden</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Monto (S/)</th>
                <th>Items</th>
                <th>Adjunto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="10" className="empty-state">
                    No hay órdenes registradas o no coinciden con la búsqueda.
                  </td>
                </tr>
              ) : (
                ordenesFiltradas.map((o, index) => (
                  <tr key={o.id}>
                    <td>{index + 1}</td>
                    <td>{o.numeroOrden}</td>
                    <td>{o.proveedor}</td>
                    <td>{o.fecha ? new Date(o.fecha).toLocaleDateString("es-PE") : "-"}</td>
                    <td><span className={getEstadoClase(o.estado)}>{o.estado}</span></td>
                    <td>{o.tipoCompra}</td>
                    <td>S/ {(o.montoEstimado || 0).toLocaleString("es-PE", { minimumFractionDigits: 2 })}</td>
                    <td>{o.items ? o.items.length : 0}</td>
                    <td>{o.adjuntoNombre ? <span className="archivo-badge">📎 {o.adjuntoNombre}</span> : "-"}</td>
                    <td className="actions-cell">
                      <button className="btn btn-secondary btn-small" onClick={() => handleEditOrden(o)}>Editar</button>
                      <button className="btn btn-danger btn-small" onClick={() => handleDeleteOrden(o.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`drawer ${mostrarDrawer ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>{editingId ? `Editar orden: ${form.numeroOrden || editingId}` : "Nueva orden de compra"}</h3>
          <div>
            <button className="btn" onClick={() => { resetForm(); setMostrarDrawer(false); }}>Cerrar</button>
          </div>
        </div>

        <div className="drawer-body">
          <form onSubmit={handleSubmitOrden} className="orden-form drawer-form">
            <div className="form-grid">
              <div className="form-group">
                <label>N° de Orden</label>
                <input type="text" name="numeroOrden" value={form.numeroOrden} onChange={handleFormChange} placeholder="Ej. OC-2025-0012" />
              </div>

              <div className="form-group">
                <label>Proveedor</label>
                <input type="text" name="proveedor" value={form.proveedor} onChange={handleFormChange} placeholder="Ej. Maderas y Tableros del Sur SAC" />
              </div>

              <div className="form-group">
                <label>Fecha de emisión</label>
                <input type="date" name="fecha" value={form.fecha} onChange={handleFormChange} />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select name="estado" value={form.estado} onChange={handleFormChange}>
                  <option value="Borrador">Borrador</option>
                  <option value="Enviada">Enviada al proveedor</option>
                  <option value="Recibida">Mercadería recibida</option>
                  <option value="Cerrada">Cerrada</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de compra</label>
                <select name="tipoCompra" value={form.tipoCompra} onChange={handleFormChange}>
                  <option value="Melamina">Solo melamina</option>
                  <option value="Herrajes">Herrajes / accesorios</option>
                  <option value="Mixto">Mixto (melamina + herrajes)</option>
                  <option value="Servicio">Servicio externo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Monto estimado (S/)</label>
                <input type="number" name="montoEstimado" value={form.montoEstimado} onChange={handleFormChange} placeholder="Ej. 3500.00" />
              </div>

              <div className="form-group full">
                <label>Adjuntar cotización / imagen (opcional)</label>
                <input type="file" accept="image/*,.pdf" onChange={handleArchivoChange} />
                {archivoNombre && <small className="archivo-info">Archivo: <strong>{archivoNombre}</strong></small>}
              </div>

              <div className="form-group full">
                <label>Notas / Detalles</label>
                <textarea name="notas" value={form.notas} onChange={handleFormChange} placeholder="Ej. Incluye flete hasta almacén."></textarea>
              </div>
            </div>

            <hr />

            <div className="items-section">
              <h4>Ítems de la orden</h4>

              <form onSubmit={addOrUpdateItem} className="item-form">
                <div className="item-row">
                  <input type="number" name="cantidad" value={itemTemp.cantidad} onChange={handleItemTempChange} placeholder="Cantidad" />
                  <input type="text" name="itemProveedor" value={itemTemp.itemProveedor} onChange={handleItemTempChange} placeholder="Item proveedor (código)" />
                  <input type="text" name="descripcion" value={itemTemp.descripcion} onChange={handleItemTempChange} placeholder="Descripción" />
                  <input type="number" step="0.01" name="costoUnitario" value={itemTemp.costoUnitario} onChange={handleItemTempChange} placeholder="Costo unitario" />
                  <input type="text" readOnly name="importe" value={itemTemp.importe} placeholder="Importe" />
                  <input type="text" name="notas" value={itemTemp.notas} onChange={handleItemTempChange} placeholder="Notas" />
                  <button className="btn btn-primary btn-small" type="submit">{editingItemIndex === null ? "Agregar ítem" : "Actualizar ítem"}</button>
                </div>
              </form>

              <div className="items-table">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cantidad</th>
                      <th>Item Proveedor</th>
                      <th>Descripción</th>
                      <th>Costo Unit.</th>
                      <th>Importe</th>
                      <th>Notas</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr><td colSpan="8" className="empty-state">No hay ítems. Agrega productos o servicios.</td></tr>
                    ) : items.map((it, idx) => (
                      <tr key={it.id}>
                        <td>{idx + 1}</td>
                        <td>{it.cantidad}</td>
                        <td>{it.itemProveedor}</td>
                        <td style={{maxWidth: 260}}>{it.descripcion}</td>
                        <td>S/ {Number(it.costoUnitario || 0).toLocaleString("es-PE", {minimumFractionDigits: 2})}</td>
                        <td>S/ {Number(it.importe || 0).toLocaleString("es-PE", {minimumFractionDigits: 2})}</td>
                        <td>{it.notas || "-"}</td>
                        <td>
                          <button className="btn btn-secondary btn-small" onClick={() => handleEditItem(idx)}>Editar</button>
                          <button className="btn btn-danger btn-small" onClick={() => handleDeleteItem(idx)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" style={{ textAlign: "right" }}><strong>Total items:</strong></td>
                      <td colSpan="3"><strong>S/ {calculateTotalItems(items).toLocaleString("es-PE", {minimumFractionDigits: 2})}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="form-actions drawer-actions">
              <button type="submit" className="btn btn-primary">{editingId ? "Actualizar orden" : "Guardar orden"}</button>
              <button type="button" className="btn" onClick={() => { resetForm(); }}>Limpiar</button>
              <button type="button" className="btn btn-danger" onClick={() => { resetForm(); setMostrarDrawer(false); }}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>

      {mostrarDrawer && <div className="drawer-overlay" onClick={() => { setMostrarDrawer(false); resetForm(); }}></div>}
    </div>
  );
};

export default OrdenesCompra;
