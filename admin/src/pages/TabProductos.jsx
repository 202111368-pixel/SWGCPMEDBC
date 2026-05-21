import React, { useState, useEffect } from "react";
import { FaBox, FaCheckCircle, FaExclamationTriangle, FaClipboardList } from "react-icons/fa";
import "../styles/pages/TabProductos.css";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div className="kpi-card-p" style={{ borderTop: `4px solid ${color}` }}>
    <div className="kpi-left-p">
      <span className="kpi-value-p">{value}</span>
      <span className="kpi-title-p">{title}</span>
      {subtitle && <span className="kpi-sub-p">{subtitle}</span>}
    </div>
    <div className="kpi-icon-p" style={{ background: color + "18" }}>
      <Icon style={{ color }} />
    </div>
  </div>
);

const HBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div className="hbar-chart-p">
      {data.map((d, i) => (
        <div className="hbar-row-p" key={i}>
          <span className="hbar-label-p">{d.label}</span>
          <div className="hbar-track-p">
            <div className="hbar-fill-p" style={{ width: `${(d.val / max) * 100}%`, background: d.color || "#2563eb" }}></div>
          </div>
          <span className="hbar-val-p">{d.val}</span>
        </div>
      ))}
    </div>
  );
};

const DonutChart = ({ segments, total, label }) => {
  const size = 160;
  const cx = 80;
  const cy = 80;
  const r = 60;
  const circ = 2 * Math.PI * r;

  const arcs = [];
  let cumulative = 0;
  segments.forEach((seg, i) => {
    const pct = seg.pct || 0;
    const dash = (pct / 100) * circ;
    const gap = circ - dash;
    const rotation = (cumulative / 100) * 360 - 90;
    arcs.push(
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth="22"
        strokeDasharray={`${dash} ${gap}`}
        transform={`rotate(${rotation}, ${cx}, ${cy})`}
      />
    );
    cumulative += pct;
  });

  return (
    <div className="donut-wrap-p">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {arcs}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#1e293b">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#64748b">{label}</text>
      </svg>
      <div className="donut-legend-p">
        {segments.map((s, i) => (
          <div key={i} className="donut-legend-item-p">
            <span className="dot-p" style={{ background: s.color }}></span>
            <span>{s.label}</span>
            <strong>{s.val !== undefined ? s.val : `${s.pct}%`}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

const TabProductos = () => {
  const [catalogo, setCatalogo] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setCatalogo(JSON.parse(localStorage.getItem("ventas_admin_3001")) || []);
    const jefeDefault = [
      { nombre: "MELAMINA BLANCO MATE 18MM", categoria: "TABLERO", stock: 15, stockMin: 10 },
      { nombre: "MELAMINA ROBLE SANTANA 18MM", categoria: "TABLERO", stock: 4, stockMin: 8 },
      { nombre: "TAPACANTO PVC DELGADO NEGRO", categoria: "TAPACANTO", stock: 120, stockMin: 50 },
      { nombre: "TAPACANTO GRUESO CEDRO 3MM", categoria: "TAPACANTO", stock: 15, stockMin: 30 },
    ];
    setProductos(JSON.parse(localStorage.getItem("db_almacen")) || jefeDefault);
  }, []);

  const sinStock = productos.filter(p => p.stock === 0).length;
  const bajoStock = productos.filter(p => p.stock > 0 && p.stock <= p.stockMin).length;
  const optimo = productos.filter(p => p.stock > p.stockMin).length;

  return (
    <div className="tab-content-p fade-in-p">
      <div className="kpi-row-p">
        <KPICard title="Total Materiales" value={productos.length} subtitle="En almacén" color="#3b82f6" icon={FaBox} />
        <KPICard title="Stock Óptimo" value={optimo} subtitle="Nivel correcto" color="#10b981" icon={FaCheckCircle} />
        <KPICard title="Bajo Stock" value={bajoStock} subtitle="Requieren atención" color="#f59e0b" icon={FaExclamationTriangle} />
        <KPICard title="Catálogo" value={catalogo.length} subtitle="Productos en catálogo" color="#8b5cf6" icon={FaClipboardList} />
      </div>
      <div className="charts-row-p">
        <div className="chart-card-p wide-p">
          <h4 className="chart-title-p">Stock por material</h4>
          <HBarChart data={productos.map(p => ({
            label: p.nombre.length > 30 ? p.nombre.slice(0, 30) + "…" : p.nombre,
            val: p.stock,
            color: p.stock <= p.stockMin ? "#ef4444" : "#10b981"
          }))} />
        </div>
        <div className="chart-card-p">
          <h4 className="chart-title-p">Estado de stock</h4>
          <DonutChart
            total={productos.length} label="Materiales"
            segments={[
              { label: "Óptimo", pct: productos.length ? Math.round((optimo / productos.length) * 100) : 0, val: optimo, color: "#10b981" },
              { label: "Bajo Stock", pct: productos.length ? Math.round((bajoStock / productos.length) * 100) : 0, val: bajoStock, color: "#f59e0b" },
              { label: "Sin Stock", pct: productos.length ? Math.round((sinStock / productos.length) * 100) : 0, val: sinStock, color: "#ef4444" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TabProductos;