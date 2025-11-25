import React, { useState } from "react";
import "../../styles/pages/Almacen.css";

const Ubicacion = () => {
  const [ubicaciones, setUbicaciones] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    ubicacionMadre: "",
    ubicacionReserva: "",
    tipoUbicacion: "",
    prioridad: "",
    comentario: "",
    ubicacionExterna: "",
    segmentacion: "",
    esReserva: false,
  });

  const [editingId, setEditingId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.codigo) {
      alert("Completa al menos el nombre y el código de ubicación.");
      return;
    }

    if (editingId === null) {
      // CREAR
      const nueva = {
        id: ubicaciones.length > 0 ? ubicaciones[ubicaciones.length - 1].id + 1 : 1,
        ...form,
      };
      setUbicaciones([...ubicaciones, nueva]);
    } else {
      // EDITAR
      const actualizadas = ubicaciones.map((u) =>
        u.id === editingId ? { ...u, ...form } : u
      );
      setUbicaciones(actualizadas);
    }

    // Reset
    setForm({
      nombre: "",
      codigo: "",
      ubicacionMadre: "",
      ubicacionReserva: "",
      tipoUbicacion: "",
      prioridad: "",
      comentario: "",
      ubicacionExterna: "",
      segmentacion: "",
      esReserva: false,
    });
    setEditingId(null);
  };

  const handleEdit = (u) => {
    setMostrarFormulario(true);
    setEditingId(u.id);
    setForm({
      nombre: u.nombre,
      codigo: u.codigo,
      ubicacionMadre: u.ubicacionMadre || "",
      ubicacionReserva: u.ubicacionReserva || "",
      tipoUbicacion: u.tipoUbicacion || "",
      prioridad: u.prioridad || "",
      comentario: u.comentario || "",
      ubicacionExterna: u.ubicacionExterna || "",
      segmentacion: u.segmentacion || "",
      esReserva: !!u.esReserva,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta ubicación?")) {
      const filtradas = ubicaciones.filter((u) => u.id !== id);
      setUbicaciones(filtradas);
      if (editingId === id) {
        setEditingId(null);
        setForm({
          nombre: "",
          codigo: "",
          ubicacionMadre: "",
          ubicacionReserva: "",
          tipoUbicacion: "",
          prioridad: "",
          comentario: "",
          ubicacionExterna: "",
          segmentacion: "",
          esReserva: false,
        });
      }
    }
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (mostrarFormulario) {
      // si lo cierro, limpio edición
      setEditingId(null);
      setForm({
        nombre: "",
        codigo: "",
        ubicacionMadre: "",
        ubicacionReserva: "",
        tipoUbicacion: "",
        prioridad: "",
        comentario: "",
        ubicacionExterna: "",
        segmentacion: "",
        esReserva: false,
      });
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Ubicación de Stock</h2>
      <p className="page-description">
        Define en qué almacén, zona o depósito se encuentra el stock de melamina
        (tableros, cantos, accesorios, etc.).
      </p>

      {/* CARD FORMULARIO + BOTÓN NUEVA UBICACIÓN */}
      <div className="card">
        <div className="card-header">
          <h3>{editingId ? "Editar ubicación de stock" : "Gestión de ubicaciones de stock"}</h3>
          <button type="button" className="btn" onClick={toggleFormulario}>
            {mostrarFormulario ? "Cerrar" : "Nueva ubicación +"}
          </button>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="ubicacion-form">
            <div className="form-row">
              <label className="field-label">Nombre</label>
              <div className="field-input">
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej. POS, Depósito central, Corte melamina"
                />
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Código</label>
              <div className="field-input">
                <input
                  type="text"
                  name="codigo"
                  value={form.codigo}
                  onChange={handleChange}
                  placeholder="Ej. POS-01, ALM-CENTRAL"
                />
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Ubicación madre</label>
              <div className="field-input">
                <select
                  name="ubicacionMadre"
                  value={form.ubicacionMadre}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="almacen-principal">Almacén principal</option>
                  <option value="almacen-tableros">Almacén de tableros</option>
                  <option value="almacen-accesorios">Almacén de accesorios</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Ubicación de reserva</label>
              <div className="field-input">
                <select
                  name="ubicacionReserva"
                  value={form.ubicacionReserva}
                  onChange={handleChange}
                >
                  <option value="">Sin ubicación de reserva</option>
                  <option value="reserva-tableros">Reserva tableros</option>
                  <option value="reserva-accesorios">Reserva accesorios</option>
                  <option value="reserva-proyectos">
                    Reserva proyectos especiales
                  </option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Tipo de ubicación</label>
              <div className="field-input">
                <select
                  name="tipoUbicacion"
                  value={form.tipoUbicacion}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="baja-rotacion">Baja rotación</option>
                  <option value="deposito-central">Depósito central melamina</option>
                  <option value="diferencias-stock">Diferencias de stock</option>
                  <option value="en-transito">En tránsito</option>
                  <option value="reserva">Reserva</option>
                  <option value="sala-exhibicion">Sala de exhibición</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Prioridad</label>
              <div className="field-input">
                <select
                  name="prioridad"
                  value={form.prioridad}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="alta">Alta (picking rápido)</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Comentario</label>
              <div className="field-input">
                <input
                  type="text"
                  name="comentario"
                  value={form.comentario}
                  onChange={handleChange}
                  placeholder="Ej. Solo tableros 18mm blanco, alta rotación"
                />
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Ubicación externa</label>
              <div className="field-input">
                <select
                  name="ubicacionExterna"
                  value={form.ubicacionExterna}
                  onChange={handleChange}
                >
                  <option value="">No aplica</option>
                  <option value="proveedor">Depósito de proveedor</option>
                  <option value="obra">En obra / instalación</option>
                  <option value="tienda-externa">Tienda externa / showroom</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="field-label">Segmentación</label>
              <div className="field-input">
                <input
                  type="text"
                  name="segmentacion"
                  value={form.segmentacion}
                  onChange={handleChange}
                  placeholder="Ej. Línea premium, proyectos corporativos"
                />
              </div>
            </div>

            <div className="form-row checkbox-row">
              <label className="field-label">Es ubicación de reserva</label>
              <div className="field-input">
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    name="esReserva"
                    checked={form.esReserva}
                    onChange={handleChange}
                  />
                  <span>Marcala si esta ubicación se usa solo como reserva.</span>
                </label>
              </div>
            </div>

            <div className="form-row submit-row">
              <div className="field-label" />
              <div className="field-input">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Actualizar ubicación" : "Crear ubicación"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* TABLA: aparece siempre, pero solo muestra filas cuando creas ubicaciones */}
      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Listado de ubicaciones de stock</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Ubicación madre</th>
                <th>Tipo</th>
                <th>Prioridad</th>
                <th>Reserva</th>
                <th>Comentario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ubicaciones.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No hay ubicaciones registradas aún.
                  </td>
                </tr>
              ) : (
                ubicaciones.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.codigo}</td>
                    <td>{u.ubicacionMadre || "-"}</td>
                    <td>{u.tipoUbicacion || "-"}</td>
                    <td>{u.prioridad || "-"}</td>
                    <td>{u.esReserva ? "Sí" : "No"}</td>
                    <td>{u.comentario || "-"}</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleEdit(u)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(u.id)}
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

export default Ubicacion;
