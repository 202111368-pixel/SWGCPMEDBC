import React, { useState } from "react";
import { FaPlus, FaSave, FaTimes, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import "../../styles/Producto.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    producto: "",
    stock: 0,
    precio: 0,
    categoria: "",
    descripcion: "",
    portada: null, 
  });

  const handleAgregar = () => {
    setShowForm(true);
    setNuevoProducto({
      producto: "",
      stock: 0,
      precio: 0,
      categoria: "",
      descripcion: "",
      portada: null, 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleFileChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      portada: e.target.files[0], 
    });
  };

  const handleGuardar = () => {
    if (nuevoProducto.producto.trim() === "" || nuevoProducto.categoria.trim() === "") {
      alert("Por favor complete los campos obligatorios");
      return;
    }

    const nuevoProd = {
      id: Date.now(),
      ...nuevoProducto,
    };
    setProductos([...productos, nuevoProd]); 
    setShowForm(false);
  };

  const handleCancelar = () => {
    setShowForm(false);
  };

  const handleEditar = (producto) => {
    setShowForm(true);
    setNuevoProducto({
      ...producto,
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos(productos.filter((prod) => prod.id !== id));
    }
  };

  if (showForm) {
    return (
      <div className="form-container">
        <div className="form-content">
          <div className="form-header">
            <button className="btn-back" onClick={handleCancelar}>
              <FaArrowLeft /> Volver
            </button>
            <h2>Nuevo Producto</h2>
          </div>

          <div className="form-body">
            <div className="form-group">
              <label>Título de producto</label>
              <input
                type="text"
                name="producto"
                value={nuevoProducto.producto}
                onChange={handleInputChange}
                placeholder="Título de producto"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={nuevoProducto.stock}
                onChange={handleInputChange}
                placeholder="Cantidad inicial"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={nuevoProducto.precio}
                onChange={handleInputChange}
                placeholder="Precio"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select
                name="categoria"
                value={nuevoProducto.categoria}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Seleccione una categoría</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Accesorios">Accesorios</option>
                <option value="Hogar">Hogar</option>
                <option value="Oficina">Oficina</option>
              </select>
            </div>

            <div className="form-group">
              <label>Descripción corta</label>
              <textarea
                name="descripcion"
                value={nuevoProducto.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción corta"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Portada</label>
              <input
                type="file"
                name="portada"
                accept="image/*"
                onChange={handleFileChange}
                className="input-file"
              />
              {nuevoProducto.portada && (
                <img
                  src={URL.createObjectURL(nuevoProducto.portada)}
                  alt="Vista previa"
                  className="image-preview"
                />
              )}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save" onClick={handleGuardar}>
              <FaSave /> Guardar Producto
            </button>
            <button className="btn-cancel" onClick={handleCancelar}>
              <FaTimes /> Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productos-page">
      <div className="productos-header">
        <h2>Productos</h2>
        <button className="btn-agregar" onClick={handleAgregar}>
          <FaPlus /> Agregar Nuevo Producto
        </button>
      </div>

      <div className="productos-table">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Portada</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.producto}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.categoria}</td>
                  <td>
                    {producto.portada ? (
                      <img
                        src={URL.createObjectURL(producto.portada)}
                        alt="Vista previa"
                        className="image-preview"
                      />
                    ) : (
                      "Sin imagen"
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleEditar(producto)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleEliminar(producto.id)}>
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
  );
};

export default Productos;
