import React, { useState, useEffect } from "react";
import { FaUsers, FaUserShield, FaUserCog, FaWarehouse } from "react-icons/fa";
import "../styles/pages/TabUsuarios.css";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div className="kpi-card-u" style={{ borderTop: `4px solid ${color}` }}>
    <div className="kpi-left-u">
      <span className="kpi-value-u">{value}</span>
      <span className="kpi-title-u">{title}</span>
      {subtitle && <span className="kpi-sub-u">{subtitle}</span>}
    </div>
    <div className="kpi-icon-u" style={{ background: color + "18" }}>
      <Icon style={{ color }} />
    </div>
  </div>
);

const HBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div className="hbar-chart-u">
      {data.map((d, i) => (
        <div className="hbar-row-u" key={i}>
          <span className="hbar-label-u">{d.label}</span>
          <div className="hbar-track-u">
            <div className="hbar-fill-u" style={{ width: `${(d.val / max) * 100}%`, background: d.color || "#2563eb" }}></div>
          </div>
          <span className="hbar-val-u">{d.val}</span>
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
    <div className="donut-wrap-u">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {arcs}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#1e293b">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#64748b">{label}</text>
      </svg>
      <div className="donut-legend-u">
        {segments.map((s, i) => (
          <div key={i} className="donut-legend-item-u">
            <span className="dot-u" style={{ background: s.color }}></span>
            <span>{s.label}</span>
            <strong>{s.val !== undefined ? s.val : `${s.pct}%`}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

const TabUsuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    setClientes(JSON.parse(localStorage.getItem("db_clientes")) || []);
    setAdmins(JSON.parse(localStorage.getItem("db_admins_v2")) || []);
  }, []);

  const activos = clientes.filter(c => (c.estado || "ACTIVO") === "ACTIVO").length;
  const inactivos = clientes.filter(c => c.estado === "INACTIVO").length;
  const carpinteros = clientes.filter(c => c.tipo === "CARPINTERO").length;
  const empresas = clientes.filter(c => c.tipo === "EMPRESA").length;
  const finales = clientes.filter(c => c.tipo === "FINAL").length;
  const pendientes = admins.filter(a => a.estado === "PENDIENTE").length;
  const confirmados = admins.filter(a => a.estado === "CONFIRMADO").length;

  return (
    <div className="tab-content-u fade-in-u">
      <div className="kpi-row-u">
        <KPICard title="Total Clientes" value={clientes.length} subtitle={`${activos} activos / ${inactivos} inactivos`} color="#ef4444" icon={FaUsers} />
        <KPICard title="Personal Admin" value={admins.length} subtitle={`${pendientes} pendientes`} color="#3b82f6" icon={FaUserShield} />
        <KPICard title="Carpinteros" value={carpinteros} subtitle="Clientes tipo carpintero" color="#10b981" icon={FaUserCog} />
        <KPICard title="Empresas" value={empresas} subtitle="Clientes tipo empresa" color="#f59e0b" icon={FaWarehouse} />
      </div>
      <div className="charts-row-u">
        <div className="chart-card-u wide-u">
          <h4 className="chart-title-u">Registro de clientes por tipo</h4>
          <HBarChart data={[
            { label: "Carpinteros", val: carpinteros, color: "#f59e0b" },
            { label: "Empresas", val: empresas, color: "#3b82f6" },
            { label: "Clientes Finales", val: finales, color: "#10b981" },
            { label: "Activos", val: activos, color: "#22c55e" },
            { label: "Inactivos", val: inactivos, color: "#ef4444" },
          ]} />
        </div>
        <div className="chart-card-u">
          <h4 className="chart-title-u">Distribución de clientes</h4>
          <DonutChart
            total={clientes.length} label="Clientes"
            segments={[
              { label: "Carpinteros", pct: clientes.length ? Math.round((carpinteros / clientes.length) * 100) : 0, val: carpinteros, color: "#f59e0b" },
              { label: "Empresas", pct: clientes.length ? Math.round((empresas / clientes.length) * 100) : 0, val: empresas, color: "#3b82f6" },
              { label: "Finales", pct: clientes.length ? Math.round((finales / clientes.length) * 100) : 0, val: finales, color: "#10b981" },
            ]}
          />
          <div className="gauge-section-u">
            <h4 className="chart-title-u">Estado del Personal Admin</h4>
            <div className="hbar-chart-u" style={{ marginTop: 8 }}>
              <div className="hbar-row-u">
                <span className="hbar-label-u">Pendientes</span>
                <div className="hbar-track-u"><div className="hbar-fill-u" style={{ width: admins.length ? `${(pendientes / admins.length) * 100}%` : "0%", background: "#f59e0b" }}></div></div>
                <span className="hbar-val-u">{pendientes}</span>
              </div>
              <div className="hbar-row-u">
                <span className="hbar-label-u">Confirmados</span>
                <div className="hbar-track-u"><div className="hbar-fill-u" style={{ width: admins.length ? `${(confirmados / admins.length) * 100}%` : "0%", background: "#10b981" }}></div></div>
                <span className="hbar-val-u">{confirmados}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabUsuarios;