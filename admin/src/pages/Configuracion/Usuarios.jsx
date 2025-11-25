import React, { useState } from "react";
import "../../styles/pages/Configuracion.css";

const Usuarios = () => {
  const [rolSeleccionado, setRolSeleccionado] = useState("Administrador");

  const roles = ["Administrador", "Ventas", "Almacén", "Producción", "Contabilidad"];

  const [usuarios, setUsuarios] = useState({
    Administrador: [
      { id: 1, nombre: "Juan Pérez", email: "juan@empresa.com", estado: "Activo" },
    ],
    Ventas: [
      { id: 2, nombre: "Carla Gómez", email: "carla@empresa.com", estado: "Inactivo" },
    ],
    Almacén: [],
    Producción: [],
    Contabilidad: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [nuevoUser, setNuevoUser] = useState({ nombre: "", email: "", estado: "Activo" });

  const agregarUsuario = () => {
    if (!nuevoUser.nombre || !nuevoUser.email) return;

    const nuevo = {
      id: Date.now(),
      ...nuevoUser,
    };

    setUsuarios({
      ...usuarios,
      [rolSeleccionado]: [...usuarios[rolSeleccionado], nuevo],
    });

    setNuevoUser({ nombre: "", email: "", estado: "Activo" });
    setShowModal(false);
  };

  const eliminarUsuario = (rol, id) => {
    setUsuarios({
      ...usuarios,
      [rol]: usuarios[rol].filter((u) => u.id !== id),
    });
  };

  return (
    <div className="page-container roles-layout">

      <aside className="roles-sidebar">
        <h3>Roles del Sistema</h3>
        {roles.map((rol) => (
          <button
            key={rol}
            className={`rol-btn ${rolSeleccionado === rol ? "active" : ""}`}
            onClick={() => setRolSeleccionado(rol)}
          >
            {rol}
          </button>
        ))}
      </aside>

      <section className="usuarios-panel">
        <div className="usuarios-header">
          <h2 className="page-title">{rolSeleccionado}</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Agregar Usuario
          </button>
        </div>

        <div className="usuarios-list">
          {usuarios[rolSeleccionado].length === 0 ? (
            <p className="empty-state">No hay usuarios en este rol aún.</p>
          ) : (
            usuarios[rolSeleccionado].map((u) => (
              <div className="user-card" key={u.id}>
                <div className="avatar">{u.nombre.charAt(0)}</div>

                <div className="user-info">
                  <h4>{u.nombre}</h4>
                  <p>{u.email}</p>
                  <span className={`estado ${u.estado.toLowerCase()}`}>{u.estado}</span>
                </div>

                <div className="user-actions">
                  <button className="btn-small btn-secondary">Editar</button>
                  <button
                    className="btn-small btn-danger"
                    onClick={() => eliminarUsuario(rolSeleccionado, u.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Agregar Usuario a {rolSeleccionado}</h3>

            <input
              type="text"
              placeholder="Nombre"
              value={nuevoUser.nombre}
              onChange={(e) => setNuevoUser({ ...nuevoUser, nombre: e.target.value })}
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              value={nuevoUser.email}
              onChange={(e) => setNuevoUser({ ...nuevoUser, email: e.target.value })}
            />

            <select
              value={nuevoUser.estado}
              onChange={(e) => setNuevoUser({ ...nuevoUser, estado: e.target.value })}
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={agregarUsuario}>
                Guardar
              </button>
              <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
