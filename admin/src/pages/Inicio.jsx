import React, { useEffect, useState } from "react";
import "../styles/pages/Inicio.css";

const LOCAL_KEY_SUMMARY = "dashboard_summary_v1";

const defaultSummary = {
  almacen: 128,
  compras: 21,
  configuracion: 5,
  cotizaciones: 7,
  inventario: 351,
  personal: 12,
  produccion: 9,
  ventas: 24,
  ventasTrend: [6, 8, 7, 9, 12, 11, 10],
  comprasTrend: [2, 3, 4, 6, 5, 7, 4],
};

const Card = ({ title, value, unit, children, onClick }) => (
  <div className="dash-card" onClick={onClick}>
    <div className="card-top">
      <h4>{title}</h4>
      <div className="card-value">{value}{unit ? <small className="unit">{unit}</small> : null}</div>
    </div>
    <div className="card-body">{children}</div>
  </div>
);

const Sparkline = ({ data = [], color = "#b78b50" }) => {
  if (!data || data.length === 0) return null;
  const w = 120, h = 30;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / Math.max(1, max - min)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="sparkline">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Inicio = () => {
  const [summary, setSummary] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY_SUMMARY);
      return raw ? JSON.parse(raw) : defaultSummary;
    } catch {
      return defaultSummary;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_SUMMARY, JSON.stringify(summary));
  }, [summary]);

  const openModule = (moduleName) => {
    alert(`Abrir módulo: ${moduleName}\n(Navegación no implementada aquí)`);
  };

  const simulateSale = () => {
    setSummary((s) => {
      const newSales = s.ventas + 1;
      const newTrend = s.ventasTrend.slice(1).concat([newSales]);
      return { ...s, ventas: newSales, ventasTrend: newTrend };
    });
  };

  const simulateReceipt = () => {
    setSummary((s) => {
      const newCompras = s.compras + 1;
      const newTrend = s.comprasTrend.slice(1).concat([newCompras]);
      return { ...s, compras: newCompras, comprasTrend: newTrend, inventario: s.inventario + 10 };
    });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Panel General</h2>
      <p className="page-description">Resumen rápido de las áreas clave — Almacén, Compras, Inventario, Producción y Ventas.</p>

      <div className="top-row">
        <div className="cards-grid">
          <Card title="Almacén" value={summary.almacen} unit="SKU" onClick={() => openModule("Almacén")}>
            <small>Stock total de SKU</small>
          </Card>

          <Card title="Compras" value={summary.compras} unit="" onClick={() => openModule("Compras")}>
            <Sparkline data={summary.comprasTrend} color="#7a5a28" />
            <div className="card-actions">
              <button className="btn" onClick={(e)=>{e.stopPropagation(); simulateReceipt();}}>Simular llegada</button>
            </div>
          </Card>

          <Card title="Inventario" value={summary.inventario} unit="ud" onClick={() => openModule("Inventario")}>
            <small>Stock disponible</small>
          </Card>

          <Card title="Producción" value={summary.produccion} onClick={() => openModule("Producción")}>
            <small>Órdenes activas</small>
          </Card>

          <Card title="Ventas" value={summary.ventas} onClick={() => openModule("Ventas")}>
            <Sparkline data={summary.ventasTrend} color="#b2452f" />
            <div className="card-actions">
              <button className="btn" onClick={(e)=>{e.stopPropagation(); simulateSale();}}>Registrar venta</button>
            </div>
          </Card>

          <Card title="Cotizaciones" value={summary.cotizaciones} onClick={() => openModule("Cotizaciones")}>
            <small>Pendientes</small>
          </Card>

          <Card title="Personal" value={summary.personal} onClick={() => openModule("Personal")}>
            <small>Usuarios activos</small>
          </Card>

          <Card title="Configuración" value={summary.configuracion} onClick={() => openModule("Configuración")}>
            <small>Parámetros</small>
          </Card>
        </div>

        <div className="reference-card">
          <h4>Vista previa UI</h4>
          <img src="/mnt/data/A_digital_screenshot_of_an_order_management_web_ap.png" alt="UI referencia" />
          <small className="caption">Captura de ejemplo (referencia visual).</small>
        </div>
      </div>

      <div className="bottom-row">
        <div className="card activity-card">
          <h3>Actividad reciente</h3>
          <ul className="activity-list">
            <li>Entrada a inventario — +50 ud (OC-2025-012)</li>
            <li>Venta procesada — OC-2025-009</li>
            <li>Orden producción cambiada a "En proceso"</li>
            <li>Cotización enviada a cliente ACME</li>
          </ul>
        </div>

        <div className="card quick-actions">
          <h3>Acciones rápidas</h3>
          <div className="quick-grid">
            <button className="btn-primary" onClick={()=>openModule("Compras")}>Nueva orden de compra</button>
            <button className="btn-primary" onClick={()=>openModule("Producción")}>Nueva orden producción</button>
            <button className="btn" onClick={()=>openModule("Inventario")}>Ajustar stock</button>
            <button className="btn" onClick={()=>openModule("Cotizaciones")}>Crear cotización</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Inicio;
