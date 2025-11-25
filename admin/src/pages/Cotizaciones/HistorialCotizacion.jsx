import React, { useEffect, useState } from "react";
import "../../styles/pages/Cotizaciones.css";

const HistorialCotizacion = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const almacenadas =
      JSON.parse(localStorage.getItem("cotizaciones") || "[]");
    setCotizaciones(almacenadas);

    const movs =
      JSON.parse(localStorage.getItem("cotizacionesMovimientos") || "[]");
    setMovimientos(movs.slice(-10).reverse());
  }, []);

  const handleEliminar = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cotización?")) return;

    const actualizadas = cotizaciones.filter((c) => c.id !== id);
    setCotizaciones(actualizadas);
    localStorage.setItem("cotizaciones", JSON.stringify(actualizadas));

    const movs =
      JSON.parse(localStorage.getItem("cotizacionesMovimientos") || "[]");
    movs.push({
      id: Date.now(),
      tipo: "ELIMINACIÓN",
      mensaje: `Se eliminó la cotización con ID ${id}`,
      fecha: new Date().toISOString(),
    });
    localStorage.setItem(
      "cotizacionesMovimientos",
      JSON.stringify(movs)
    );
    setMovimientos(movs.slice(-10).reverse());
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Historial de Cotizaciones</h2>
      <p className="page-description">
        Revisa las cotizaciones generadas y los últimos movimientos
        (creaciones y eliminaciones).
      </p>

      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Cotizaciones registradas</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Proyecto</th>
                <th>Fecha</th>
                <th>Moneda</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cotizaciones.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Aún no hay cotizaciones registradas desde "Nueva Cotización".
                  </td>
                </tr>
              ) : (
                cotizaciones.map((c) => (
                  <tr key={c.id}>
                    <td>{c.cliente}</td>
                    <td>{c.proyecto}</td>
                    <td>
                      {c.fecha
                        ? new Date(c.fecha).toLocaleDateString("es-PE")
                        : "-"}
                    </td>
                    <td>{c.moneda}</td>
                    <td>
                      {Number(c.total || 0).toLocaleString("es-PE", {
                        style: "currency",
                        currency: c.moneda === "USD" ? "USD" : "PEN",
                      })}
                    </td>
                    <td className="actions-cell">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleEliminar(c.id)}
                      >
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

      <div className="card">
        <h3>Últimos movimientos</h3>
        {movimientos.length === 0 ? (
          <p className="empty-state">
            Aún no hay movimientos registrados en cotizaciones.
          </p>
        ) : (
          <ul className="movimientos-list">
            {movimientos.map((m) => (
              <li key={m.id}>
                <span className={`badge-mov ${m.tipo === "CREACIÓN" ? "creacion" : "eliminacion"}`}>
                  {m.tipo}
                </span>
                <span className="mov-mensaje">{m.mensaje}</span>
                <span className="mov-fecha">
                  {new Date(m.fecha).toLocaleString("es-PE")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistorialCotizacion;
