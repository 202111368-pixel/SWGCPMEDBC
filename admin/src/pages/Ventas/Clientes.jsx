import React, { useState, useEffect } from "react";
import "../../styles/Clientes.css";
import {
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null); 

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    dni: "",
    ruc: "",
    telefono: "",
    email: "",
    giro: "",
    limite: 0,
    direccion: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("clientesConfiguracion");
    if (data) {
      try {
        setClientes(JSON.parse(data));
      } catch (e) {
        console.error("Error parseando clientesConfiguracion", e);
      }
    }
  }, []);

  const guardarEnLocalStorage = (lista) => {
    localStorage.setItem("clientesConfiguracion", JSON.stringify(lista));
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleNuevoCliente = () => {
    setEditingId(null);
    setNuevoCliente({
      nombre: "",
      dni: "",
      ruc: "",
      telefono: "",
      email: "",
      giro: "",
      limite: 0,
      direccion: "",
    });
    setShowModal(true);
  };

  const handleEditarCliente = (cliente) => {
    setEditingId(cliente.id);
    setNuevoCliente({
      nombre: cliente.nombre,
      dni: cliente.dni,
      ruc: cliente.ruc,
      telefono: cliente.telefono,
      email: cliente.email,
      giro: cliente.giro,
      limite: cliente.limite,
      direccion: cliente.direccion,
    });
    setShowModal(true);
  };

  const handleGuardarCliente = () => {
    if (nuevoCliente.nombre.trim() === "") {
      alert("El nombre del cliente es obligatorio");
      return;
    }

    let listaActualizada = [];

    if (editingId === null) {
      const nuevo = { id: Date.now(), ...nuevoCliente };
      listaActualizada = [...clientes, nuevo];
    } else {
      listaActualizada = clientes.map((c) =>
        c.id === editingId ? { ...c, ...nuevoCliente } : c
      );
    }

    setClientes(listaActualizada);
    guardarEnLocalStorage(listaActualizada);

    setShowModal(false);
    setEditingId(null);
  };

  const handleEliminarCliente = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      const listaActualizada = clientes.filter((c) => c.id !== id);
      setClientes(listaActualizada);
      guardarEnLocalStorage(listaActualizada); 
    }
  };

  return (
    <div className="clientes-page">
      <div className="clientes-header">
        <h2>Gestión de Clientes</h2>
        <button className="btn-agregar" onClick={handleNuevoCliente}>
          <FaUserPlus /> Nuevo Cliente
        </button>
      </div>

      <div className="clientes-buscador">
        <FaSearch className="icono-buscar" />
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Nombre / Empresa</th>
            <th>DNI</th>
            <th>RUC</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Giro</th>
            <th>Límite Crediticio</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.dni}</td>
                <td>{c.ruc}</td>
                <td>{c.telefono}</td>
                <td>{c.email}</td>
                <td>{c.giro}</td>
                <td>S/ {c.limite.toFixed(2)}</td>
                <td>{c.direccion}</td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditarCliente(c)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminarCliente(c.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="sin-clientes">
                No se encontraron clientes.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-cliente">
            <div className="modal-header">
              <h3>{editingId ? "Editar Cliente" : "Nuevo Cliente"}</h3>
              <FaTimes
                className="cerrar-modal"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
              />
            </div>

            <div className="form-grid">
              <div className="campo">
                <label>Nombre Cliente / Empresa *</label>
                <input
                  type="text"
                  placeholder="EJ. ABEL ALVARADO / DATA TRAVEL"
                  value={nuevoCliente.nombre}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>

              <div className="campo">
                <label>DNI</label>
                <input
                  type="text"
                  placeholder="EJ. 46591170"
                  value={nuevoCliente.dni}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      dni: e.target.value,
                    })
                  }
                />
              </div>

              <div className="campo">
                <label>RUC</label>
                <input
                  type="text"
                  placeholder="EJ. 10465911706"
                  value={nuevoCliente.ruc}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      ruc: e.target.value,
                    })
                  }
                />
              </div>

              <div className="campo">
                <label>Teléfono</label>
                <input
                  type="text"
                  placeholder="EJ. 051944039646"
                  value={nuevoCliente.telefono}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      telefono: e.target.value,
                    })
                  }
                />
              </div>

              <div className="campo">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="EJ. sistemas@doctorpcarequipa.com"
                  value={nuevoCliente.email}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="campo">
                <label>Giro</label>
                <input
                  type="text"
                  placeholder="EJ. VENTA DE SUMINISTROS"
                  value={nuevoCliente.giro}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      giro: e.target.value,
                    })
                  }
                />
              </div>

              <div className="campo limite">
                <label>Límite Crediticio *</label>
                <div className="input-limite">
                  <button
                    onClick={() =>
                      setNuevoCliente((prev) => ({
                        ...prev,
                        limite: Math.max(prev.limite - 0.05, 0),
                      }))
                    }
                  >
                    -
                  </button>
                  <span>S/</span>
                  <input
                    type="number"
                    step="0.01"
                    value={nuevoCliente.limite}
                    onChange={(e) =>
                      setNuevoCliente({
                        ...nuevoCliente,
                        limite: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                  <button
                    onClick={() =>
                      setNuevoCliente((prev) => ({
                        ...prev,
                        limite: prev.limite + 0.05,
                      }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="campo direccion">
                <label>Dirección</label>
                <textarea
                  placeholder="EJ. CALLE MALECÓN IQUIQUE 406 MIRAFLORES, AREQUIPA - PERÚ"
                  value={nuevoCliente.direccion}
                  onChange={(e) =>
                    setNuevoCliente({
                      ...nuevoCliente,
                      direccion: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            <div className="modal-botones">
              <button
                className="btn-cancelar"
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                }}
              >
                Cancelar
              </button>
              <button className="btn-guardar" onClick={handleGuardarCliente}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
