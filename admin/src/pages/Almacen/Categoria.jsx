import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import "../../styles/Categoria.css";

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    email: "",
    ruc: "",
    producto: ""
  });

  const handleAgregar = () => {
    setShowForm(true);
    setCategoriaEditando(null);
    setNuevoProveedor({
      nombres: "",
      apellidos: "",
      telefono: "",
      direccion: "",
      email: "",
      ruc: "",
      producto: ""
    });
  };

  const handleGuardar = () => {
    if (nuevoProveedor.nombres.trim() === "" || nuevoProveedor.ruc.trim() === "") {
      alert("Por favor complete los campos obligatorios");
      return;
    }

    if (categoriaEditando) {
      setCategorias(categorias.map(cat => 
        cat.id === categoriaEditando.id 
          ? { 
              ...cat, 
              nombres: nuevoProveedor.nombres,
              apellidos: nuevoProveedor.apellidos,
              producto: nuevoProveedor.producto,
              ruc: nuevoProveedor.ruc,
              email: nuevoProveedor.email,
              telefono: nuevoProveedor.telefono
            }
          : cat
      ));
    } else {
      const nuevoProv = {
        id: Date.now(),
        nombres: nuevoProveedor.nombres,
        apellidos: nuevoProveedor.apellidos,
        producto: nuevoProveedor.producto,
        ruc: nuevoProveedor.ruc,
        email: nuevoProveedor.email,
        telefono: nuevoProveedor.telefono,
        estado: "Activo"
      };
      setCategorias([...categorias, nuevoProv]);
    }

    setShowForm(false);
    setCategoriaEditando(null);
    setNuevoProveedor({
      nombres: "",
      apellidos: "",
      telefono: "",
      direccion: "",
      email: "",
      ruc: "",
      producto: ""
    });
  };

  const handleEditar = (categoria) => {
    setShowForm(true);
    setCategoriaEditando(categoria);
    setNuevoProveedor({
      nombres: categoria.nombres,
      apellidos: categoria.apellidos,
      telefono: categoria.telefono,
      direccion: categoria.direccion || "",
      email: categoria.email,
      ruc: categoria.ruc,
      producto: categoria.producto
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este categoria?")) {
      setCategorias(categorias.filter((cat) => cat.id !== id));
    }
  };

  const handleCancelar = () => {
    setShowForm(false);
    setCategoriaEditando(null);
    setNuevoProveedor({
      nombres: "",
      apellidos: "",
      telefono: "",
      direccion: "",
      email: "",
      ruc: "",
      producto: ""
    });
  };

  const handleInputChange = (e) => {
    setNuevoProveedor({
      ...nuevoProveedor,
      [e.target.name]: e.target.value
    });
  };

  if (showForm) {
    return (
      <div className="proveedor-page">
        <div className="proveedor-content">
          <div className="proveedor-header">
            <button className="btn-volver" onClick={handleCancelar}>
              <FaArrowLeft /> Volver
            </button>
            <h2>Categoria de Proveedor</h2>
          </div>

          <div className="proveedor-form">
            <div className="form-section">
              <h3>Nombres</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombres completos *</label>
                  <input
                    type="text"
                    name="nombres"
                    value={nuevoProveedor.nombres}
                    onChange={handleInputChange}
                    placeholder="Nombres completos"
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={nuevoProveedor.telefono}
                    onChange={handleInputChange}
                    placeholder="Teléfono"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={nuevoProveedor.direccion}
                    onChange={handleInputChange}
                    placeholder="Dirección"
                    className="input-field"
                  />
                </div>
                
              </div>
            </div>

            <div className="form-section">
              <h3>Apellidos</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Apellidos completos</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={nuevoProveedor.apellidos}
                    onChange={handleInputChange}
                    placeholder="Apellidos completos"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Nombres de bumperas</label>
                  <input
                    type="text"
                    name="producto"
                    value={nuevoProveedor.producto}
                    onChange={handleInputChange}
                    placeholder="Nombres de bumperas"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Correo electrónico</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={nuevoProveedor.email}
                    onChange={handleInputChange}
                    placeholder="Correo electrónico"
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>RUC *</label>
                  <input
                    type="text"
                    name="ruc"
                    value={nuevoProveedor.ruc}
                    onChange={handleInputChange}
                    placeholder="RUC"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-registrar" onClick={handleGuardar}>
                <FaSave /> Categoria Proveedor
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                <FaTimes /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categoria-page">
      <div className="categoria-content">
        <div className="categoria-header">
          <h2>Categoria</h2>
          <button className="btn-agregar" onClick={handleAgregar}>
            <FaPlus /> Agregar Nueva
          </button>
        </div>

        <div className="categoria-busqueda">
          <input
            type="text"
            placeholder="Buscar proveedor..."
            className="input-buscar"
          />
        </div>

        <div className="categoria-table-wrapper">
          <table className="categoria-table">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Producto</th>
                <th>RUC</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", color: "#888" }}>
                    No hay proveedores registrados.
                  </td>
                </tr>
              ) : (
                categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.nombres}</td>
                    <td>{cat.apellidos}</td>
                    <td>{cat.producto}</td>
                    <td>{cat.ruc}</td>
                    <td>{cat.email}</td>
                    <td>{cat.telefono}</td>
                    <td className="opciones">
                      <button
                        className="btn-editar"
                        onClick={() => handleEditar(cat)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminar(cat.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="paginacion">
            <button>{"<"}</button>
            <button className="activo">1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
          </div>

          <p className="registro-info">
            Mostrando {categorias.length} categoria registrados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categoria;