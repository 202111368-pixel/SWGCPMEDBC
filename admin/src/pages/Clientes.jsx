import React, { useState } from 'react';
import '../styles/Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState(() => {
    const guardados = localStorage.getItem('clientes');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(null); // ID del cliente con menú abierto

  const [nuevo, setNuevo] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    dni: '',
    genero: 'Femenino',
  });

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const guardarEnLocalStorage = (lista) => {
    setClientes(lista);
    localStorage.setItem('clientes', JSON.stringify(lista));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modoEditar && clienteEditando !== null) {
      const actualizados = clientes.map((c) =>
        c.id === clienteEditando ? { ...c, ...nuevo } : c
      );
      guardarEnLocalStorage(actualizados);
    } else {
      const nuevoCliente = { id: Date.now(), ...nuevo };
      const actualizados = [...clientes, nuevoCliente];
      guardarEnLocalStorage(actualizados);
    }

    setNuevo({
      nombres: '',
      apellidos: '',
      correo: '',
      telefono: '',
      fechaNacimiento: '',
      dni: '',
      genero: 'Femenino',
    });
    setMostrarForm(false);
    setModoEditar(false);
    setClienteEditando(null);
  };

  const handleEliminar = (id) => {
    const actualizados = clientes.filter((c) => c.id !== id);
    guardarEnLocalStorage(actualizados);
    setMenuAbierto(null);
  };

  const handleEditar = (cliente) => {
    setNuevo(cliente);
    setMostrarForm(true);
    setModoEditar(true);
    setClienteEditando(cliente.id);
    setMenuAbierto(null);
  };

  const toggleMenu = (id) => {
    setMenuAbierto(menuAbierto === id ? null : id);
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>Clientes</h1>
        <p>Este módulo lista todos los clientes de la tienda.</p>
        <button
          className="btn-registrar"
          onClick={() => {
            setMostrarForm(!mostrarForm);
            setModoEditar(false);
            setNuevo({
              nombres: '',
              apellidos: '',
              correo: '',
              telefono: '',
              fechaNacimiento: '',
              dni: '',
              genero: 'Femenino',
            });
          }}
        >
          {mostrarForm ? 'Regresar' : 'Registrar nuevo'}
        </button>
      </div>

      {mostrarForm ? (
        <form onSubmit={handleSubmit} className="formulario-cliente">
          <h3>{modoEditar ? 'Actualizar cliente' : 'Registrar cliente'}</h3>

          <div className="form-grid">
            <div>
              <label>Nombres</label>
              <input
                type="text"
                name="nombres"
                value={nuevo.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={nuevo.apellidos}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Correo</label>
              <input
                type="email"
                name="correo"
                value={nuevo.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={nuevo.telefono}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Fecha nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={nuevo.fechaNacimiento}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>DNI</label>
              <input
                type="text"
                name="dni"
                value={nuevo.dni}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Género</label>
              <select
                name="genero"
                value={nuevo.genero}
                onChange={handleChange}
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
            </div>
          </div>

          <div className="botones-form">
            <button type="submit" className="btn-actualizar">
              {modoEditar ? 'Actualizar cliente' : 'Guardar cliente'}
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
          <table className="tabla-clientes">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Fecha Nac.</th>
                <th>DNI</th>
                <th>Género</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', color: '#777' }}>
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                clientes.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td>{c.nombres}</td>
                    <td>{c.apellidos}</td>
                    <td>{c.correo}</td>
                    <td>{c.telefono}</td>
                    <td>{c.fechaNacimiento}</td>
                    <td>{c.dni}</td>
                    <td>{c.genero}</td>
                    <td className="celda-opciones">
                      <button
                        className="btn-opciones"
                        onClick={() => toggleMenu(c.id)}
                      >
                        Opciones ⬇
                      </button>

                      {menuAbierto === c.id && (
                        <div className="menu-opciones">
                          <button
                            className="btn-opcion actualizar"
                            onClick={() => handleEditar(c)}
                          >
                            ✏️ Actualizar
                          </button>
                          <button
                            className="btn-opcion eliminar"
                            onClick={() => handleEliminar(c.id)}
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

export default Clientes;
