import React, { useState, useEffect } from "react";
import "../../styles/pages/Cotizaciones.css";

const CrearCotizacion = () => {
  const [cliente, setCliente] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [proceso, setProceso] = useState("");
  const [fecha, setFecha] = useState("");
  const [validez, setValidez] = useState("");

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const almacenadas =
      JSON.parse(localStorage.getItem("cotizaciones") || "[]");
    setLista(almacenadas);
  }, []);

  const guardarCotizacion = () => {
    if (!cliente || !proyecto || !proceso || !fecha || !validez) {
      alert("Completa todos los campos.");
      return;
    }

    let almacenadas =
      JSON.parse(localStorage.getItem("cotizaciones") || "[]");

    if (editId) {
      almacenadas = almacenadas.map((c) =>
        c.id === editId
          ? {
              ...c,
              cliente,
              proyecto,
              proceso,
              fecha,
              validez,
            }
          : c
      );

      registrarMovimiento("EDICIÓN", `Se editó la cotización del cliente "${cliente}"`);
    } else {
      const nueva = {
        id: Date.now(),
        cliente,
        proyecto,
        proceso,
        fecha,
        validez,
      };

      almacenadas.push(nueva);

      registrarMovimiento("CREACIÓN", `Se creó la cotización del cliente "${cliente}"`);
    }

    localStorage.setItem("cotizaciones", JSON.stringify(almacenadas));
    setLista(almacenadas);

    limpiarFormulario();
  };

  const registrarMovimiento = (tipo, mensaje) => {
    const movs =
      JSON.parse(localStorage.getItem("cotizacionesMovimientos") || "[]");

    movs.push({
      id: Date.now(),
      tipo,
      mensaje,
      fecha: new Date().toISOString(),
    });

    localStorage.setItem("cotizacionesMovimientos", JSON.stringify(movs));
  };

  const editarCotizacion = (c) => {
    setEditId(c.id);
    setCliente(c.cliente);
    setProyecto(c.proyecto);
    setProceso(c.proceso);
    setFecha(c.fecha);
    setValidez(c.validez);
  };

 
  const eliminarCotizacion = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cotización?")) return;

    const almacenadas =
      JSON.parse(localStorage.getItem("cotizaciones") || "[]");

    const eliminada = almacenadas.find((c) => c.id === id);

    const nuevas = almacenadas.filter((c) => c.id !== id);
    localStorage.setItem("cotizaciones", JSON.stringify(nuevas));
    setLista(nuevas);

    registrarMovimiento("ELIMINACIÓN", `Se eliminó la cotización del cliente "${eliminada?.cliente}"`);
  };

  const limpiarFormulario = () => {
    setCliente("");
    setProyecto("");
    setProceso("");
    setFecha("");
    setValidez("");
    setEditId(null);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Nueva Cotización</h2>

      <div className="card form-wrapper">
        <div className="form-grid">

          <div className="form-group">
            <label>Cliente</label>
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ej. Constructora Los Olivos"
            />
          </div>

          <div className="form-group">
            <label>Proyecto</label>
            <input
              value={proyecto}
              onChange={(e) => setProyecto(e.target.value)}
              placeholder="Ej. Mobiliario de oficina"
            />
          </div>

          <div className="form-group">
            <label>Proceso</label>
            <select value={proceso} onChange={(e) => setProceso(e.target.value)}>
              <option value="">Seleccione...</option>
              <option value="Corte">Corte</option>
              <option value="Construcción / Armado">Construcción / Armado</option>
              <option value="Medición en campo">Medición en campo</option>
              <option value="Sellado y Lijado">Sellado y Lijado</option>
              <option value="Pintura">Pintura</option>
              <option value="Transporte">Transporte</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha de emisión</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Validez</label>
            <input
              value={validez}
              onChange={(e) => setValidez(e.target.value)}
              placeholder="Ej. 7 días"
            />
          </div>
        </div>

        <button className="btn btn-primary" onClick={guardarCotizacion}>
          {editId ? "Actualizar Cotización" : "Guardar Cotización"}
        </button>

        {editId && (
          <button className="btn btn-secondary" onClick={limpiarFormulario}>
            Cancelar edición
          </button>
        )}
      </div>

    
      <div className="card table-wrapper">
        <h3>Lista</h3>

        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Proyecto</th>
              <th>Fecha</th>
              <th>Proceso</th>
              <th>Validez</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  Aún no has registrado ninguna cotización.
                </td>
              </tr>
            ) : (
              lista.map((c) => (
                <tr key={c.id}>
                  <td>{c.cliente}</td>
                  <td>{c.proyecto}</td>
                  <td>{new Date(c.fecha).toLocaleDateString("es-PE")}</td>
                  <td>{c.proceso}</td>
                  <td>{c.validez}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => editarCotizacion(c)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => eliminarCotizacion(c.id)}>
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
  );
};

export default CrearCotizacion;
