import React, { useState } from "react";
import "../../styles/pages/Almacen.css";

const Tipos = () => {
  const [tipos, setTipos] = useState([]);

  const [nuevoTipo, setNuevoTipo] = useState({
    nombre: "",
    espesor: "",
    uso: "",
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setNuevoTipo({
      ...nuevoTipo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nuevoTipo.nombre || !nuevoTipo.espesor) {
      alert("Completa al menos el nombre y el espesor.");
      return;
    }

    if (editingId === null) {
      const nuevo = {
        id: tipos.length > 0 ? tipos[tipos.length - 1].id + 1 : 1,
        ...nuevoTipo,
      };
      setTipos([...tipos, nuevo]);
    } else {
      const tiposActualizados = tipos.map((tipo) =>
        tipo.id === editingId ? { ...tipo, ...nuevoTipo } : tipo
      );
      setTipos(tiposActualizados);
    }

    setNuevoTipo({ nombre: "", espesor: "", uso: "" });
    setEditingId(null);
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (mostrarFormulario) {
      setEditingId(null);
      setNuevoTipo({ nombre: "", espesor: "", uso: "" });
    }
  };

  const handleEdit = (tipo) => {
    setMostrarFormulario(true);
    setEditingId(tipo.id);
    setNuevoTipo({
      nombre: tipo.nombre,
      espesor: tipo.espesor,
      uso: tipo.uso || "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este tipo de melamina?")) {
      const filtrados = tipos.filter((tipo) => tipo.id !== id);
      setTipos(filtrados);

      if (editingId === id) {
        setEditingId(null);
        setNuevoTipo({ nombre: "", espesor: "", uso: "" });
      }
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Tipos de Melamina</h2>
      <p className="page-description">
        Administra el catálogo de tipos de melamina utilizados por D’Bary Company.
      </p>

      <div className="card">
        <div className="card-header">
          <h3>{editingId ? "Editar tipo de melamina" : "Gestión de tipos de melamina"}</h3>
          <button type="button" className="btn" onClick={toggleFormulario}>
            {mostrarFormulario
              ? "Cerrar formulario"
              : "Registrar nuevo tipo de melamina"}
          </button>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nombre del tipo</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej. Melamina MDF 18mm Blanco"
                value={nuevoTipo.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Espesor</label>
              <input
                type="text"
                name="espesor"
                placeholder="Ej. 18 mm"
                value={nuevoTipo.espesor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Uso recomendado</label>
              <input
                type="text"
                name="uso"
                placeholder="Ej. Muebles de cocina, closet, etc."
                value={nuevoTipo.uso}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Actualizar tipo de melamina" : "Guardar tipo de melamina"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* CARD TABLA */}
      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Listado de tipos de melamina</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del tipo</th>
                <th>Espesor</th>
                <th>Uso recomendado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tipos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No hay tipos de melamina registrados aún.
                  </td>
                </tr>
              ) : (
                tipos.map((tipo) => (
                  <tr key={tipo.id}>
                    <td>{tipo.id}</td>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.espesor}</td>
                    <td>{tipo.uso || "-"}</td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => handleEdit(tipo)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(tipo.id)}
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

export default Tipos;
