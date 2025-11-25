import React, { useEffect, useState } from "react";
import "../../styles/pages/Ventas.css";

const ReportesVenta = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ventasRegistradas") || "[]");
    setVentas(data);
  }, []);

  const ventasPorMes = ventas.reduce((acc, v) => {
    const fecha = v.fecha ? new Date(v.fecha) : new Date(v.fechaRegistro);
    if (isNaN(fecha)) return acc;
    const mes = fecha.toLocaleString("es-PE", { month: "short", year: "numeric" });
    acc[mes] = (acc[mes] || 0) + (v.totalNeto || 0);
    return acc;
  }, {});
  const dataMes = Object.keys(ventasPorMes).map((mes) => ({
    mes,
    total: ventasPorMes[mes],
  }));

  const ventasPorMedio = ventas.reduce((acc, v) => {
    const medio = v.medioPago || "Otro";
    acc[medio] = (acc[medio] || 0) + (v.totalNeto || 0);
    return acc;
  }, {});
  const dataMedio = Object.keys(ventasPorMedio).map((medio) => ({
    medio,
    total: ventasPorMedio[medio],
  }));

  const totalGeneral = ventas.reduce((acc, v) => acc + (v.totalNeto || 0), 0);
  const totalMes = dataMes.length > 0 ? dataMes[dataMes.length - 1].total : 0;

  return (
    <div className="page-container">
      <h2 className="page-title">Reportes de Venta</h2>
      <p className="page-description">
        Resumen de ventas de melamina por mes, medio de pago y últimas ventas registradas.
      </p>

      <div className="card resumen-grid">
        <div className="kpi-card">
          <h4>💰 Total general</h4>
          <p className="kpi-value">
            S/ {totalGeneral.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="kpi-card">
          <h4>📆 Último mes</h4>
          <p className="kpi-value">
            S/ {totalMes.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="kpi-card">
          <h4>🧾 Ventas registradas</h4>
          <p className="kpi-value">{ventas.length}</p>
        </div>
      </div>

      <div className="card charts-grid">
        <div className="chart-box">
          <h3>Resumen por mes</h3>
          {dataMes.length === 0 ? (
            <p className="empty-state">Aún no hay ventas registradas.</p>
          ) : (
            <div className="table-container mini-table">
              <table>
                <thead>
                  <tr>
                    <th>Mes</th>
                    <th>Total (S/)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMes.map((m) => (
                    <tr key={m.mes}>
                      <td>{m.mes}</td>
                      <td>{m.total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="chart-box">
          <h3>Resumen por medio de pago</h3>
          {dataMedio.length === 0 ? (
            <p className="empty-state">Aún no hay ventas registradas.</p>
          ) : (
            <div className="table-container mini-table">
              <table>
                <thead>
                  <tr>
                    <th>Medio de pago</th>
                    <th>Total (S/)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataMedio.map((m) => (
                    <tr key={m.medio}>
                      <td>{m.medio}</td>
                      <td>{m.total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="card table-wrapper">
        <div className="card-header">
          <h3>Últimas ventas registradas</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Comprobante</th>
                <th>Medio de pago</th>
                <th>Total (S/)</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No hay registros aún.
                  </td>
                </tr>
              ) : (
                ventas
                  .slice(-10)
                  .reverse()
                  .map((v, i) => (
                    <tr key={v.id}>
                      <td>{i + 1}</td>
                      <td>{v.cliente}</td>
                      <td>
                        {v.fecha
                          ? new Date(v.fecha).toLocaleDateString("es-PE")
                          : "-"}
                      </td>
                      <td>{v.tipoComprobante}</td>
                      <td>{v.medioPago}</td>
                      <td>{(v.totalNeto || 0).toFixed(2)}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportesVenta;
