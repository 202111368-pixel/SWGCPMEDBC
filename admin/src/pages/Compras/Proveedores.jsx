import React, { useState, useMemo } from "react";
import "../../styles/pages/Compras.css";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    razonSocial: "",
    ruc: "",
    tipoProveedor: "Tableros de melamina",
    rubro: "",
    telefono: "",
    email: "",
    direccion: "",
    contacto: "",
    condicionesPago: "Contado",
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setForm({
      razonSocial: "",
      ruc: "",
      tipoProveedor: "Tableros de melamina",
      rubro: "",
      telefono: "",
      email: "",
      direccion: "",
      contacto: "",
      condicionesPago: "Contado",
      notas: "",
    });
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

    if (!form.razonSocial || !form.ruc) {
      alert("Completa al menos Razón Social y RUC.");
      return;
    }

    if (editingId === null) {
      const nuevo = {
        id: proveedores.length > 0 ? proveedores[proveedores.length - 1].id + 1 : 1,
        ...form,
      };
      setProveedores([...proveedores, nuevo]);
    } else {
      const actualizados = proveedores.map((p) =>
        p.id === editingId ? { ...p, ...form } : p
      );
      setProveedores(actualizados);
    }

    resetForm();
  };

  const handleEdit = (proveedor) => {
    setMostrarFormulario(true);
    setEditingId(proveedor.id);
    setForm({
      razonSocial: proveedor.razonSocial,
      ruc: proveedor.ruc,
      tipoProveedor: proveedor.tipoProveedor || "Tableros de melamina",
      rubro: proveedor.rubro || "",
      telefono: proveedor.telefono || "",
      email: proveedor.email || "",
      direccion: proveedor.direccion || "",
      contacto: proveedor.contacto || "",
      condicionesPago: proveedor.condicionesPago || "Contado",
      notas: proveedor.notas || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este proveedor?")) return;
    const filtrados = proveedores.filter((p) => p.id !== id);
    setProveedores(filtrados);

    if (editingId === id) {
      resetForm();
    }
  };

  const proveedoresFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return proveedores;
    return proveedores.filter((p) => {
      return (
        p.razonSocial.toLowerCase().includes(q) ||
        (p.ruc && p.ruc.toLowerCase().includes(q)) ||
        (p.contacto && p.contacto.toLowerCase().includes(q))
      );
    });
  }, [proveedores, busqueda]);

  return (
    <div className="page-container">
      <h2 className="page-title">Proveedores</h2>
      <p className="page-description">
        Registro y gestión de proveedores de tableros de melamina, cantos y herrajes para D’Bary Company.
      </p>

      <div className="card">
        <div className="card-header">
          <h3>{editingId ? "Editar proveedor" : "Gestión de proveedores"}</h3>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Buscar por razón social, RUC o contacto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-busqueda"
            />
            <button type="button" className="btn" onClick={toggleFormulario}>
              {mostrarFormulario ? "Cerrar" : "Nuevo proveedor +"}
            </button>
          </div>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="proveedor-form">
            <div className="form-group">
              <label>Razón Social</label>
              <input
                type="text"
                name="razonSocial"
                value={form.razonSocial}
                onChange={handleChange}
                placeholder="Ej. Maderas y Tableros del Sur SAC"
              />
            </div>

            <div className="form-group">
              <label>RUC</label>
              <input
                type="text"
                name="ruc"
                value={form.ruc}
                onChange={handleChange}
                placeholder="Ej. 20123456789"
              />
            </div>

            <div className="form-group">
              <label>Tipo de proveedor</label>
              <select
                name="tipoProveedor"
                value={form.tipoProveedor}
                onChange={handleChange}
              >
                <option value="Tableros de melamina">Tableros de melamina</option>
                <option value="Cantos y tapacantos">Cantos y tapacantos</option>
                <option value="Herrajes">Herrajes y accesorios</option>
                <option value="Servicios externos">Servicios externos</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rubro / Línea</label>
              <input
                type="text"
                name="rubro"
                value={form.rubro}
                onChange={handleChange}
                placeholder="Ej. Melamina alto tránsito, línea premium"
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej. 987 654 321"
              />
            </div>

            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ej. ventas@proveedor.com"
              />
            </div>

            <div className="form-group form-group-full">
              <label>Dirección</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Ej. Av. Industrial 123, Ate"
              />
            </div>

            <div className="form-group">
              <label>Contacto principal</label>
              <input
                type="text"
                name="contacto"
                value={form.contacto}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez - Ejecutivo comercial"
              />
            </div>

            <div className="form-group">
              <label>Condiciones de pago</label>
              <select
                name="condicionesPago"
                value={form.condicionesPago}
                onChange={handleChange}
              >
                <option value="Contado">Contado</option>
                <option value="Crédito 15 días">Crédito 15 días</option>
                <option value="Crédito 30 días">Crédito 30 días</option>
                <option value="Crédito 45 días">Crédito 45 días</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label>Notas / acuerdos</label>
              <textarea
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Ej. Descuento especial por volumen, entrega sin costo en Lima."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Actualizar proveedor" : "Guardar proveedor"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Listado de proveedores</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Razón Social</th>
                <th>RUC</th>
                <th>Tipo</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Condición de pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No hay proveedores registrados o no coinciden con la búsqueda.
                  </td>
                </tr>
              ) : (
                proveedoresFiltrados.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.razonSocial}</td>
                    <td>{p.ruc}</td>
                    <td>{p.tipoProveedor}</td>
                    <td>{p.contacto || "-"}</td>
                    <td>{p.telefono || "-"}</td>
                    <td>{p.condicionesPago || "-"}</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        onClick={() => handleEdit(p)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(p.id)}
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

export default Proveedores;
