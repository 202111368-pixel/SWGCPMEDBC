import React, { useState, useMemo } from "react";
import "../../styles/pages/Compras.css";

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoNombre(file.name);
      setForm({
        ...form,
        adjuntoNombre: file.name,
      });
    } else {
      setArchivoNombre("");
      setForm({
        ...form,
        adjuntoNombre: "",
      });
    }
  };

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
    setEditingId(null);
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (mostrarFormulario) {
      resetForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.numeroOrden || !form.proveedor || !form.fecha) {
      alert("Completa al menos N° de orden, proveedor y fecha.");
      return;
    }

    if (editingId === null) {
      const nueva = {
        id: ordenes.length > 0 ? ordenes[ordenes.length - 1].id + 1 : 1,
        ...form,
        montoEstimado: form.montoEstimado ? Number(form.montoEstimado) : 0,
      };
      setOrdenes([...ordenes, nueva]);
    } else {
      const actualizadas = ordenes.map((o) =>
        o.id === editingId
          ? {
              ...o,
              ...form,
              montoEstimado: form.montoEstimado ? Number(form.montoEstimado) : 0,
            }
          : o
      );
      setOrdenes(actualizadas);
    }

    resetForm();
  };

  const handleEdit = (orden) => {
    setMostrarFormulario(true);
    setEditingId(orden.id);
    setArchivoNombre(orden.adjuntoNombre || "");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta orden de compra?")) return;
    const filtradas = ordenes.filter((o) => o.id !== id);
    setOrdenes(filtradas);

    if (editingId === id) {
      resetForm();
    }
  };

  const ordenesFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return ordenes;
    return ordenes.filter((o) => {
      return (
        o.numeroOrden.toLowerCase().includes(q) ||
        o.proveedor.toLowerCase().includes(q) ||
        (o.estado && o.estado.toLowerCase().includes(q))
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
      <h2 className="page-title">Órdenes de Compra</h2>
      <p className="page-description">
        Registro y control de órdenes de compra de melamina y otros insumos para D’Bary Company.
      </p>

      <div className="card">
        <div className="card-header">
          <h3>{editingId ? "Editar orden de compra" : "Gestión de órdenes de compra"}</h3>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Buscar por N° de orden, proveedor o estado..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
            <button type="button" className="btn" onClick={toggleFormulario}>
              {mostrarFormulario ? "Cerrar" : "Nueva orden +"}
            </button>
          </div>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="orden-form">
            <div className="form-group">
              <label>N° de Orden</label>
              <input
                type="text"
                name="numeroOrden"
                value={form.numeroOrden}
                onChange={handleChange}
                placeholder="Ej. OC-2025-0012"
              />
            </div>

            <div className="form-group">
              <label>Proveedor</label>
              <input
                type="text"
                name="proveedor"
                value={form.proveedor}
                onChange={handleChange}
                placeholder="Ej. Maderas y Tableros del Sur SAC"
              />
            </div>

            <div className="form-group">
              <label>Fecha de emisión</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
              >
                <option value="Borrador">Borrador</option>
                <option value="Enviada">Enviada al proveedor</option>
                <option value="Recibida">Mercadería recibida</option>
                <option value="Cerrada">Cerrada</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de compra</label>
              <select
                name="tipoCompra"
                value={form.tipoCompra}
                onChange={handleChange}
              >
                <option value="Melamina">Solo melamina</option>
                <option value="Herrajes">Herrajes / accesorios</option>
                <option value="Mixto">Mixto (melamina + herrajes)</option>
                <option value="Servicio">Servicio externo</option>
              </select>
            </div>

            <div className="form-group">
              <label>Monto estimado (S/)</label>
              <input
                type="number"
                name="montoEstimado"
                value={form.montoEstimado}
                onChange={handleChange}
                placeholder="Ej. 3500.00"
              />
            </div>

            <div className="form-group form-group-full">
              <label>Adjuntar cotización / imagen (opcional)</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleArchivoChange}
              />
              {archivoNombre && (
                <small className="archivo-info">
                  Archivo seleccionado: <strong>{archivoNombre}</strong>
                </small>
              )}
            </div>

            <div className="form-group form-group-full">
              <label>Notas / Detalles</label>
              <textarea
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Ej. Incluye flete hasta almacén. Solicitar color específico de melamina."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Actualizar orden" : "Guardar orden"}
              </button>
            </div>
          </form>
        )}
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
                <th>Adjunto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No hay órdenes registradas o no coinciden con la búsqueda.
                  </td>
                </tr>
              ) : (
                ordenesFiltradas.map((o, index) => (
                  <tr key={o.id}>
                    <td>{index + 1}</td>
                    <td>{o.numeroOrden}</td>
                    <td>{o.proveedor}</td>
                    <td>
                      {o.fecha ? new Date(o.fecha).toLocaleDateString("es-PE") : "-"}
                    </td>
                    <td>
                      <span className={getEstadoClase(o.estado)}>
                        {o.estado}
                      </span>
                    </td>
                    <td>{o.tipoCompra}</td>
                    <td>
                      S/{" "}
                      {(o.montoEstimado || 0).toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      {o.adjuntoNombre ? (
                        <span className="archivo-badge">📎 {o.adjuntoNombre}</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        onClick={() => handleEdit(o)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(o.id)}
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

export default OrdenesCompra;
