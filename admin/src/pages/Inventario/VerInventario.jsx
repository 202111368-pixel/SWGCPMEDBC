import React, { useEffect, useState } from "react";
import "../../styles/pages/Inventario.css";

const LOCAL_KEY = "inventario_records_v1";
const LOCAL_CAPACITY = "inventario_capacity_v1";

const VerInventario = () => {
  const [registros, setRegistros] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [capacidad, setCapacidad] = useState(() => {
    try {
      const c = localStorage.getItem(LOCAL_CAPACITY);
      return c ? Number(c) : 500; 
    } catch {
      return 500;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    producto: "",
    categoria: "Tablero",
    cantidad: "",
    tipo: "Ingreso",
    fecha: new Date().toISOString().slice(0, 10),
    usuario: "",
    notas: "",
  });

  const totalStock = registros.reduce((acc, r) => acc + Number(r.cantidad || 0), 0);
  const percent = Math.max(0, Math.min(100, Math.round((totalStock / (Number(capacidad) || 1)) * 100)));

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(registros));
  }, [registros]);

  useEffect(() => {
    localStorage.setItem(LOCAL_CAPACITY, String(capacidad));
  }, [capacidad]);

  const resetForm = () => {
    setForm({
      producto: "",
      categoria: "Tablero",
      cantidad: "",
      tipo: "Ingreso",
      fecha: new Date().toISOString().slice(0, 10),
      usuario: "",
      notas: "",
    });
    setEditingId(null);
  };

  const openNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleCapacityChange = (e) => {
    const v = Number(e.target.value || 0);
    setCapacidad(v > 0 ? v : 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.producto.trim()) return alert("Ingrese el nombre del producto.");
    const cantidadNum = Number(form.cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) return alert("Ingrese una cantidad válida (>0).");

    if (!["Ingreso", "Salida"].includes(form.tipo)) {
      return alert("Tipo inválido.");
    }

   
    const nuevo = {
      id: editingId ?? Date.now(),
      producto: form.producto.trim(),
      categoria: form.categoria,
      cantidad: cantidadNum,
      tipo: form.tipo,
      fecha: form.fecha,
      usuario: form.usuario.trim(),
      notas: form.notas.trim(),
    };

    if (editingId === null) {
      setRegistros((prev) => [...prev, nuevo]);
    } else {
      setRegistros((prev) => prev.map((r) => (r.id === editingId ? nuevo : r)));
    }

    resetForm();
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const r = registros.find((x) => x.id === id);
    if (!r) return;
    setForm({
      producto: r.producto,
      categoria: r.categoria,
      cantidad: String(r.cantidad),
      tipo: r.tipo,
      fecha: r.fecha,
      usuario: r.usuario,
      notas: r.notas,
    });
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Eliminar registro?")) return;
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  };

  const clearAll = () => {
    if (!window.confirm("Borrar todos los registros?")) return;
    setRegistros([]);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Inventario General</h2>
      <p className="page-description">
        Visualiza y gestiona el stock actual de tableros, cantos y accesorios de melamina.
      </p>

      <div className="card" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
       
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="circular-chart small">
              <svg viewBox="0 0 36 36" className="donut">
                <path
                  className="circle-bg"
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${percent}, 100`}
                  d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{percent}%</div>
                <div style={{ fontSize: 12, color: "#7a5a28" }}>Uso de capacidad</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 220 }}>
            <label style={{ display: "block", fontSize: 14, marginBottom: 6, color: "#3a2303", fontWeight: 600 }}>
              Capacidad total (unidades)
            </label>
            <input
              type="number"
              value={capacidad}
              onChange={handleCapacityChange}
              className="input-busqueda"
              style={{ width: 180 }}
              min={1}
            />
            <div style={{ marginTop: 8, color: "#7a5a28", fontSize: 13 }}>
              Stock total: <strong>{totalStock}</strong> unidades
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" }}>
            <button className="btn" onClick={openNew}>Agregar registro</button>
            <button className="btn btn-secondary" onClick={() => { setShowForm(false); resetForm(); }}>Cerrar formulario</button>
            <button className="btn btn-danger" onClick={clearAll}>Borrar todo</button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>{editingId ? "Editar registro" : "Nuevo registro"}</h3>
          <form onSubmit={handleSubmit} className="proveedor-form">
            <div className="form-group">
              <label>Producto</label>
              <input name="producto" value={form.producto} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={handleChange}>
                <option>Tablero</option>
                <option>Canto</option>
                <option>Accesorio</option>
                <option>Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cantidad</label>
              <input name="cantidad" type="number" min="0" value={form.cantidad} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Tipo</label>
              <select name="tipo" value={form.tipo} onChange={handleChange}>
                <option>Ingreso</option>
                <option>Salida</option>
              </select>
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Usuario</label>
              <input name="usuario" value={form.usuario} onChange={handleChange} placeholder="Ej. Juan Pérez" />
            </div>

            <div className="form-group form-group-full">
              <label>Notas</label>
              <textarea name="notas" value={form.notas} onChange={handleChange} placeholder="Observaciones..." />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">{editingId ? "Actualizar" : "Guardar"}</button>
              <button type="button" className="btn" onClick={() => { resetForm(); setShowForm(false); }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="card table-wrapper" style={{ marginTop: 14 }}>
        <div className="card-header">
          <h3>Detalle de movimientos</h3>
          <div style={{ color: "#7a5a28", fontSize: 13 }}>{registros.length} registros</div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Notas</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {registros.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">No hay registros.</td>
                </tr>
              ) : (
                registros.map((r) => (
                  <tr key={r.id}>
                    <td>{r.producto}</td>
                    <td>{r.categoria}</td>
                    <td>{r.tipo === "Ingreso" ? `+${r.cantidad}` : `-${r.cantidad}`}</td>
                    <td>{r.tipo}</td>
                    <td>{r.fecha}</td>
                    <td>{r.usuario || "-"}</td>
                    <td style={{ maxWidth: 240 }}>{r.notas || "-"}</td>
                    <td className="actions-cell">
                      <button className="btn btn-secondary btn-small" onClick={() => handleEdit(r.id)}>Editar</button>
                      <button className="btn btn-danger btn-small" onClick={() => handleDelete(r.id)}>Eliminar</button>
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

export default VerInventario;
