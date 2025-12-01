import React, { useState, useEffect } from "react";
import "../../styles/pages/Cotizaciones.css";

const NuevaCotizacion = () => {

  const [form, setForm] = useState({
    cliente: "",
    ruc: "",
    proyecto: "",
    fecha: "",
    proceso: "",
    validez: "7 días",
  });

  const [cotizaciones, setCotizaciones] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const almacenadas = JSON.parse(localStorage.getItem("cotizacionesSimple") || "[]");
    setCotizaciones(almacenadas);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.cliente || !form.proyecto || !form.fecha) {
      alert("Completa cliente, proyecto y fecha.");
      return;
    }

    let actualizadas = [];

    if (editId) {
      actualizadas = cotizaciones.map((c) =>
        c.id === editId ? { ...c, ...form } : c
      );

      alert("Cotización actualizada.");
      setEditId(null);

    } else {
      const nueva = {
        id: Date.now(),
        ...form,
        fechaRegistro: new Date().toISOString(),
      };

      actualizadas = [...cotizaciones, nueva];
      alert("Cotización guardada correctamente.");
    }

    localStorage.setItem("cotizacionesSimple", JSON.stringify(actualizadas));
    setCotizaciones(actualizadas);

    setForm({
      cliente: "",
      ruc: "",
      proyecto: "",
      fecha: "",
      proceso: "",
      validez: "7 días",
    });

    // ❌ Se quitó el navigate, ahora NO te envia a otro lado
    // navigate("/historial-cotizaciones");
  };

  const handleEditar = (item) => {
    setForm({
      cliente: item.cliente,
      ruc: item.ruc,
      proyecto: item.proyecto,
      fecha: item.fecha,
      proceso: item.proceso,
      validez: item.validez,
    });
    setEditId(item.id);
  };

  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cotización?")) return;

    const actualizadas = cotizaciones.filter((c) => c.id !== id);

    localStorage.setItem("cotizacionesSimple", JSON.stringify(actualizadas));
    setCotizaciones(actualizadas);

    alert("Cotización eliminada.");
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Nueva Cotización</h2>

      <div className="card">
        <h3>Datos de la cotización</h3>

        <form onSubmit={handleSubmit} className="cotizacion-form">
          <div className="form-group">
            <label>Cliente</label>
            <input
              type="text"
              name="cliente"
              value={form.cliente}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>RUC / DNI</label>
            <input
              type="text"
              name="ruc"
              value={form.ruc}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Proyecto</label>
            <input
              type="text"
              name="proyecto"
              value={form.proyecto}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fecha de emisión</label>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Proceso</label>
            <select name="proceso" value={form.proceso} onChange={handleChange}>
              <option value="">Seleccione un proceso</option>
              <option value="Corte">Corte</option>
              <option value="Construcción / Armado">Construcción / Armado</option>
              <option value="Medición en campo">Medición en campo</option>
              <option value="Sellado y Lijado">Sellado y Lijado</option>
              <option value="Pintura">Pintura</option>
              <option value="Transporte">Transporte</option>
            </select>
          </div>

          <div className="form-group">
            <label>Validez de la oferta</label>
            <select name="validez" value={form.validez} onChange={handleChange}>
              <option value="7 días">7 días</option>
              <option value="15 días">15 días</option>
              <option value="30 días">30 días</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editId ? "Actualizar" : "Guardar cotización"}
            </button>
          </div>
        </form>
      </div>

      <div className="card table-wrapper">
        <h3>Cotizaciones registradas</h3>

        <table className="tabla-mejorada">
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
            {cotizaciones.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  No hay cotizaciones registradas.
                </td>
              </tr>
            ) : (
              cotizaciones.map((c) => (
                <tr key={c.id}>
                  <td>{c.cliente}</td>
                  <td>{c.proyecto}</td>
                  <td>{new Date(c.fecha).toLocaleDateString("es-PE")}</td>
                  <td>{c.proceso}</td>
                  <td>{c.validez}</td>
                  <td>
                    <button className="btn-small edit" onClick={() => handleEditar(c)}>
                      Editar
                    </button>
                    <button className="btn-small delete" onClick={() => handleEliminar(c.id)}>
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

export default NuevaCotizacion;
