import React, { useState } from "react";
import { FaPlus, FaTrash, FaSave, FaEdit } from "react-icons/fa";
import "../../styles/Cotizacion.css";

const GenerarCotizacion = () => {
  const [items, setItems] = useState([]);
  const [nuevoItem, setNuevoItem] = useState({ descripcion: "", cantidad: 1, precio: 0 });
  const [editIndex, setEditIndex] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleAgregar = () => {
    if (!nuevoItem.descripcion.trim()) return alert("Debe ingresar una descripción");
    if (editIndex !== null) {
      const actualizados = [...items];
      actualizados[editIndex] = nuevoItem;
      setItems(actualizados);
      setEditIndex(null);
    } else {
      setItems([...items, nuevoItem]);
    }
    setNuevoItem({ descripcion: "", cantidad: 1, precio: 0 });
    setMostrarModal(false);
  };

  const handleEliminar = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleEditar = (index) => {
    setNuevoItem(items[index]);
    setEditIndex(index);
    setMostrarModal(true);
  };

  const handleGuardar = () => {
    localStorage.setItem("cotizacion", JSON.stringify(items));
    alert("Cotización guardada correctamente.");
  };

  const total = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  return (
    <div className="cotizacion-container">
      <h2>Generar Cotización</h2>

      <button className="btn-nuevo" onClick={() => setMostrarModal(true)}>
        <FaPlus /> Agregar Nueva Cotización
      </button>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editIndex !== null ? "Editar Cotización" : "Agregar Cotización"}</h3>
            <input
              type="text"
              placeholder="Descripción"
              value={nuevoItem.descripcion}
              onChange={(e) => setNuevoItem({ ...nuevoItem, descripcion: e.target.value })}
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={nuevoItem.cantidad}
              onChange={(e) => setNuevoItem({ ...nuevoItem, cantidad: e.target.value })}
            />
            <input
              type="number"
              placeholder="Precio"
              value={nuevoItem.precio}
              onChange={(e) => setNuevoItem({ ...nuevoItem, precio: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="btn-guardar" onClick={handleAgregar}>
                <FaSave /> Guardar
              </button>
              <button className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="cotizacion-tabla">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio (S/)</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No hay cotizaciones agregadas.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index}>
                <td>{item.descripcion}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio}</td>
                <td>S/ {item.cantidad * item.precio}</td>
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

      <div className="cotizacion-total">
        <strong>Total General: S/ {total}</strong>
      </div>

      <button className="btn-guardar-final" onClick={handleGuardar}>
        <FaSave /> Guardar Cotización
      </button>
    </div>
  );
};

export default GenerarCotizacion;
