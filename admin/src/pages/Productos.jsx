import React, { useState } from 'react';
import '../styles/Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(null);

  const [nuevo, setNuevo] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
  });

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarEnLocalStorage = (lista) => {
    setProductos(lista);
    localStorage.setItem('productos', JSON.stringify(lista));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoEditar && productoEditando !== null) {
      const actualizados = productos.map((p) =>
        p.id === productoEditando ? { ...p, ...nuevo } : p
      );
      guardarEnLocalStorage(actualizados);
    } else {
      const nuevoProducto = { id: Date.now(), ...nuevo };
      guardarEnLocalStorage([...productos, nuevoProducto]);
    }

    setNuevo({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      categoria: '',
    });
    setMostrarForm(false);
    setModoEditar(false);
    setProductoEditando(null);
  };

  const handleEliminar = (id) => {
    const actualizados = productos.filter((p) => p.id !== id);
    guardarEnLocalStorage(actualizados);
    setMenuAbierto(null);
  };

  const handleEditar = (producto) => {
    setNuevo(producto);
    setMostrarForm(true);
    setModoEditar(true);
    setProductoEditando(producto.id);
    setMenuAbierto(null);
  };

  const toggleMenu = (id) => {
    setMenuAbierto(menuAbierto === id ? null : id);
  };

  return (
    <div className="productos-container">
      <div className="productos-header">
        <h1>Gestión de Productos</h1>
        <p>Aquí podrás administrar los productos de melamina.</p>
        <button
          className="btn-registrar"
          onClick={() => {
            setMostrarForm(!mostrarForm);
            setModoEditar(false);
            setNuevo({
              nombre: '',
              descripcion: '',
              precio: '',
              stock: '',
              categoria: '',
            });
          }}
        >
          {mostrarForm ? 'Regresar' : 'Registrar nuevo'}
        </button>
      </div>

      {mostrarForm ? (
        <form onSubmit={handleSubmit} className="formulario-producto">
          <h3>{modoEditar ? 'Actualizar producto' : 'Registrar producto'}</h3>

          <div className="form-grid">
            <div>
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={nuevo.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Descripción</label>
              <input
                type="text"
                name="descripcion"
                value={nuevo.descripcion}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                value={nuevo.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={nuevo.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div>
              <label>Categoría</label>
              <input
                type="text"
                name="categoria"
                value={nuevo.categoria}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="botones-form">
            <button type="submit" className="btn-actualizar">
              {modoEditar ? 'Actualizar producto' : 'Guardar producto'}
            </button>
            <button
              type="button"
              className="btn-regresar"
              onClick={() => setMostrarForm(false)}
            >
              Regresar
            </button>
          </div>
        </form>
      ) : (
        <div className="tabla-container">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: '#777' }}>
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                productos.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>{p.nombre}</td>
                    <td>{p.descripcion}</td>
                    <td>${parseFloat(p.precio).toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>{p.categoria}</td>
                    <td className="celda-opciones">
                      <button
                        className="btn-opciones"
                        onClick={() => toggleMenu(p.id)}
                      >
                        Opciones ⬇
                      </button>

                      {menuAbierto === p.id && (
                        <div className="menu-opciones">
                          <button
                            className="btn-opcion actualizar"
                            onClick={() => handleEditar(p)}
                          >
                            ✏️ Actualizar
                          </button>
                          <button
                            className="btn-opcion eliminar"
                            onClick={() => handleEliminar(p.id)}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Productos;
