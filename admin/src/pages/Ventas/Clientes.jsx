import React, { useState, useMemo } from "react";
import "../../styles/pages/Ventas.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    tipoCliente: "Empresa",
    documento: "",
    telefono: "",
    email: "",
    direccion: "",
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
      nombre: "",
      tipoCliente: "Empresa",
      documento: "",
      telefono: "",
      email: "",
      direccion: "",
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

    if (!form.nombre || !form.tipoCliente) {
      alert("Completa al menos el nombre y el tipo de cliente.");
      return;
    }

    if (editingId === null) {
      const nuevo = {
        id: clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1,
        ...form,
      };
      setClientes([...clientes, nuevo]);
    } else {
      const actualizados = clientes.map((c) =>
        c.id === editingId ? { ...c, ...form } : c
      );
      setClientes(actualizados);
    }

    resetForm();
  };

  const handleEdit = (cliente) => {
    setMostrarFormulario(true);
    setEditingId(cliente.id);
    setForm({
      nombre: cliente.nombre,
      tipoCliente: cliente.tipoCliente,
      documento: cliente.documento || "",
      telefono: cliente.telefono || "",
      email: cliente.email || "",
      direccion: cliente.direccion || "",
      notas: cliente.notas || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    const filtrados = clientes.filter((c) => c.id !== id);
    setClientes(filtrados);

    if (editingId === id) {
      resetForm();
    }
  };

  const clientesFiltrados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (!q) return clientes;
    return clientes.filter((c) => {
      return (
        c.nombre.toLowerCase().includes(q) ||
        (c.documento && c.documento.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q))
      );
    });
  }, [clientes, busqueda]);

  return (
    <div className="page-container">
      <h2 className="page-title">Clientes</h2>
      <p className="page-description">
        Registro y gestión de clientes para proyectos y ventas de melamina.
      </p>

      <div className="card">
        <div className="card-header">
          <h3>{editingId ? "Editar cliente" : "Gestión de clientes"}</h3>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Buscar por nombre, RUC/DNI o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #d4a76a",
                fontSize: "13px",
                backgroundColor: "#fefaf2",
              }}
            />
            <button type="button" className="btn" onClick={toggleFormulario}>
              {mostrarFormulario ? "Cerrar" : "Nuevo cliente +"}
            </button>
          </div>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="venta-form">
            <div className="form-group">
              <label>Nombre / Razón social</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. Carpintería Los Cedros / Constructora ABC SAC"
              />
            </div>

            <div className="form-group">
              <label>Tipo de cliente</label>
              <select
                name="tipoCliente"
                value={form.tipoCliente}
                onChange={handleChange}
              >
                <option value="Empresa">Empresa</option>
                <option value="Carpintero">Carpintero / Taller</option>
                <option value="Cliente final">Cliente final</option>
                <option value="Arquitecto">Arquitecto / Diseñador</option>
              </select>
            </div>

            <div className="form-group">
              <label>DNI / RUC</label>
              <input
                type="text"
                name="documento"
                value={form.documento}
                onChange={handleChange}
                placeholder="Ej. 10456789012 / 20123456789"
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
                placeholder="Ej. ventas@cliente.com"
              />
            </div>

            <div className="form-group form-group-full">
              <label>Dirección</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Ej. Av. Principal 123, Urb. Las Flores"
              />
            </div>

            <div className="form-group form-group-full">
              <label>Notas</label>
              <textarea
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Ej. Cliente de proyectos corporativos, prioridad alta, paga con crédito."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Actualizar cliente" : "Guardar cliente"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Listado de clientes</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre / Razón social</th>
                <th>Tipo</th>
                <th>DNI / RUC</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Notas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-state">
                    No hay clientes registrados o no coinciden con la búsqueda.
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.nombre}</td>
                    <td>{c.tipoCliente}</td>
                    <td>{c.documento || "-"}</td>
                    <td>{c.telefono || "-"}</td>
                    <td>{c.email || "-"}</td>
                    <td style={{ maxWidth: "220px" }}>
                      {c.notas || "-"}
                    </td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary btn-small"
                        onClick={() => handleEdit(c)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-small"
                        onClick={() => handleDelete(c.id)}
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

export default Clientes;
