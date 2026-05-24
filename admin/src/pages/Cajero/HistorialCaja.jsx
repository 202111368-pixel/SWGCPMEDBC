import React, { useEffect, useMemo, useState } from 'react';
import { FaHistory, FaFilePdf, FaSearch } from "react-icons/fa";
import "../../styles/pages/Cajero/HistorialCaja.css"; 

const ESTADO_LABELS = {
  PENDIENTE: "Pendiente",
  VALIDADO: "Validado",
  RECHAZADO: "Rechazado",
};

const formatFecha = (fecha) => {
  if (!fecha) return "-";

  const valor = new Date(fecha);

  if (!Number.isNaN(valor.getTime())) {
    return valor.toLocaleDateString("es-PE");
  }

  return String(fecha);
};

const formatTotal = (total, venta) => {
  if (typeof total === "number" && !Number.isNaN(total)) {
    return `S/ ${total.toFixed(2)}`;
  }

  if (venta) {
    return venta;
  }

  return "S/ 0.00";
};

const HistorialCaja = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const cargarVentas = () => {
      const guardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
      setVentas([...guardadas].reverse());
    };

    cargarVentas();

    window.addEventListener("storage", cargarVentas);
    window.addEventListener("ventaRegistrada", cargarVentas);

    return () => {
      window.removeEventListener("storage", cargarVentas);
      window.removeEventListener("ventaRegistrada", cargarVentas);
    };
  }, []);

  const filas = useMemo(() => ventas, [ventas]);

  return (
    <div className="historial-caja-container">
      <div className="header-box">
        <h2><FaHistory /> Historial de Ventas</h2>
        <button className="btn-pdf"><FaFilePdf /> Exportar PDF</button>
      </div>

      <div className="search-section">
        <input type="date" className="input-date" />
        <button className="btn-search"><FaSearch /> Buscar</button>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla-historial">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Total</th>
              <th>Método</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filas.length > 0 ? (
              filas.map((venta) => (
                <tr key={venta.id}>
                  <td>{formatFecha(venta.fecha)}</td>
                  <td>{venta.producto || "Producto"}</td>
                  <td>{formatTotal(venta.total, venta.venta)}</td>
                  <td>{venta.metodoPago || "-"}</td>
                  <td>
                    <span className={`estado-pill estado-${String(venta.estado || "").toLowerCase()}`}>
                      {ESTADO_LABELS[venta.estado] || venta.estado || "-"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="tabla-vacia">
                  No hay ventas registradas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialCaja;