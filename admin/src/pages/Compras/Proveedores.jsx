import React, { useState } from "react";
import { FaPlus, FaSave, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Proveedores.css";

const Proveedores = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [editarIndex, setEditarIndex] = useState(null);

  const [proveedor, setProveedor] = useState({
    nombre: "",
    dni: "",
    ruc: "",
    telefono: "",
    contacto: "",
    telefonoContacto: "",
  });

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const abrirNuevo = () => {
    setProveedor({
      nombre: "",
      dni: "",
      ruc: "",
      telefono: "",
      contacto: "",
      telefonoContacto: "",
    });
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const handleGuardar = () => {
    if (modoEdicion) {
      const listaActualizada = [...proveedores];
      listaActualizada[editarIndex] = proveedor;
      setProveedores(listaActualizada);
    } else {
      setProveedores([...proveedores, proveedor]);
    }
    setMostrarModal(false);
  };

  const handleEditar = (index) => {
    setProveedor(proveedores[index]);
    setEditarIndex(index);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const handleEliminar = (index) => {
    const nuevaLista = proveedores.filter((_, i) => i !== index);
    setProveedores(nuevaLista);
  };

  return (
    <div className="proveedores-container">

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Proveedores</h2>
        <button className="btn-nuevo" onClick={abrirNuevo}>
          <FaPlus /> Agregar Nuevo Proveedor
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "25px" }}>
        <div style={{ width: "80%" }}>

          <div className="buscador">
            <label><b>Buscar:</b></label>
            <input type="text" placeholder="Escriba para filtrar..." />
          </div>

          <table className="tabla-proveedores">
            <thead>
              <tr>
                <th>No</th>
                <th>Proveedor</th>
                <th>RUC</th>
                <th>Teléfono</th>
                <th>Contacto</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {proveedores.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No hay proveedores registrados.
                  </td>
                </tr>
              ) : (
                proveedores.map((p, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{p.nombre}</td>
                    <td>{p.ruc}</td>
                    <td>{p.telefono}</td>
                    <td>{p.contacto}</td>
                    <td>
                      <button className="btn-editar" onClick={() => handleEditar(index)}>
                        <FaEdit />
                      </button>
                      <button className="btn-eliminar" onClick={() => handleEliminar(index)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-proveedor">

            <div className="modal-header">
              <h3>{modoEdicion ? "Editar Proveedor" : "Ingresar Proveedor"}</h3>
              <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="alert-info">
              <strong>Estimado usuario: </strong> Los campos marcados con * son obligatorios.
            </div>

            <div className="form-grid">

              <div className="form-group full">
                <label>Proveedor *</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="EJ. DISTRIBUIDORA BONILLA"
                  value={proveedor.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>DNI *</label>
                <input
                  type="text"
                  name="dni"
                  placeholder="EJ. 46591170"
                  value={proveedor.dni}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>RUC *</label>
                <input
                  type="text"
                  name="ruc"
                  placeholder="EJ. 10465911706"
                  value={proveedor.ruc}
                  onChange={handleChange}
                />
              </div>

              <div class="form-group">
                <label>Teléfono *</label>
                <input
                  type="text"
                  name="telefono"
                  placeholder="EJ. 051944039646"
                  value={proveedor.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  placeholder="EJ. ABEL ALVARADO"
                  value={proveedor.contacto}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Teléfono Contacto</label>
                <input
                  type="text"
                  name="telefonoContacto"
                  placeholder="EJ. 054628824"
                  value={proveedor.telefonoContacto}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="modal-footer">
              <button className="btn-guardar" onClick={handleGuardar}>
                <FaSave /> Guardar
              </button>
              <button className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Proveedores;
