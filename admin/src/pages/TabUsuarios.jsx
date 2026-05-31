import React, { useState, useEffect } from "react";
import { FaUsers, FaUserShield, FaUserCog, FaWarehouse, FaFilter, FaSearch, FaCalendarAlt } from "react-icons/fa";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div style={{ background: color, borderRadius: 12, padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.12)", color: "white", position: "relative", overflow: "hidden" }}>
    <div>
      <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, opacity: 0.95 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 11, marginTop: 2, opacity: 0.75 }}>{subtitle}</div>}
    </div>
    <Icon style={{ fontSize: 52, opacity: 0.2, position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)" }} />
  </div>
);

const HBar = ({ label, val, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
    <span style={{ width: 140, flexShrink: 0, fontSize: 12, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
    <div style={{ flex: 1, height: 10, background: "#f1f5f9", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${max ? (val / max) * 100 : 0}%`, background: color, borderRadius: 10, transition: "width 0.5s" }} />
    </div>
    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b", width: 28, textAlign: "right" }}>{val}</span>
  </div>
);

const DonutChart = ({ segments, total, label }) => {
  const r = 60, cx = 80, cy = 80;
  const circ = 2 * Math.PI * r;
  const arcs = [];
  let cum = 0;
  segments.forEach((seg, i) => {
    const pct = seg.pct || 0;
    const dash = (pct / 100) * circ;
    const gap = circ - dash;
    const rot = (cum / 100) * 360 - 90;
    arcs.push(<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth="22" strokeDasharray={`${dash} ${gap}`} transform={`rotate(${rot}, ${cx}, ${cy})`} />);
    cum += pct;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg viewBox="0 0 160 160" width="160" height="160">
        {arcs}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#1e293b">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#64748b">{label}</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#475569" }}>
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{s.label}</span>
            <strong style={{ color: "#1e293b" }}>{s.val}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

const TabUsuarios = () => {
  const [clientes, setClientes] = useState([]);
  const [admins, setAdmins]     = useState([]);
  const [filtroTipo, setFiltroTipo]   = useState("TODOS");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [filtroCorreo, setFiltroCorreo] = useState("");
  const [filtroDoc, setFiltroDoc]     = useState("");
  const [filtroFecha, setFiltroFecha] = useState("TODAS");

  useEffect(() => {
    setClientes(JSON.parse(localStorage.getItem("db_clientes")) || []);
    setAdmins(JSON.parse(localStorage.getItem("db_admins_v2")) || []);
  }, []);

  const clientesFiltrados = clientes.filter(c => {
    if (filtroTipo !== "TODOS" && c.tipo !== filtroTipo) return false;
    if (filtroEstado !== "TODOS" && (c.estado || "ACTIVO") !== filtroEstado) return false;
    if (filtroCorreo && !(c.email || "").toLowerCase().includes(filtroCorreo.toLowerCase())) return false;
    if (filtroDoc && !(c.documento || "").includes(filtroDoc)) return false;
    return true;
  });

  const activos     = clientesFiltrados.filter(c => (c.estado || "ACTIVO") === "ACTIVO").length;
  const inactivos   = clientesFiltrados.filter(c => c.estado === "INACTIVO").length;
  const carpinteros = clientesFiltrados.filter(c => c.tipo === "CARPINTERO").length;
  const empresas    = clientesFiltrados.filter(c => c.tipo === "EMPRESA").length;
  const finales     = clientesFiltrados.filter(c => c.tipo === "FINAL").length;
  const pendientes  = admins.filter(a => a.estado === "PENDIENTE").length;
  const confirmados = admins.filter(a => a.estado === "CONFIRMADO").length;
  const maxVal      = Math.max(carpinteros, empresas, finales, activos, inactivos, 1);

  const selectStyle = { padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#1e293b", outline: "none", background: "white", width: "100%" };
  const inputStyle  = { ...selectStyle };
  const labelStyle  = { fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 5, display: "block" };

  return (
    <div className="tab-content fade-in" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
            <FaFilter style={{ color: "#2563eb" }} /> Filtros
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}><FaCalendarAlt style={{ marginRight: 5 }} />Fecha</label>
            <select style={selectStyle} value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)}>
              <option value="TODAS">Todas las fechas</option>
              <option value="HOY">Hoy</option>
              <option value="MES">Este mes</option>
              <option value="AÑO">Este año</option>
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Tipo de Cliente</label>
            <select style={selectStyle} value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
              <option value="TODOS">Todos los tipos</option>
              <option value="CARPINTERO">Carpintero</option>
              <option value="EMPRESA">Empresa</option>
              <option value="FINAL">Cliente Final</option>
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Estado</label>
            <select style={selectStyle} value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
              <option value="TODOS">Todos</option>
              <option value="ACTIVO">Activo</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Correo</label>
            <div style={{ position: "relative" }}>
              <FaSearch style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 12 }} />
              <input style={{ ...inputStyle, paddingLeft: 30 }} placeholder="Ingresar correo(s)..." value={filtroCorreo} onChange={e => setFiltroCorreo(e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Nro Documento</label>
            <div style={{ position: "relative" }}>
              <FaSearch style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 12 }} />
              <input style={{ ...inputStyle, paddingLeft: 30 }} placeholder="Ingresar documento(s)..." value={filtroDoc} onChange={e => setFiltroDoc(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          <KPICard title="Clientes totales"       value={clientesFiltrados.length} subtitle={`${activos} activos / ${inactivos} inactivos`} color="#ef4444" icon={FaUsers} />
          <KPICard title="Administración personal" value={admins.length}            subtitle={`${pendientes} pendientes`}                    color="#3b82f6" icon={FaUserShield} />
          <KPICard title="Carpinteros"             value={carpinteros}              subtitle="Clientes tipo carpintero"                      color="#10b981" icon={FaUserCog} />
          <KPICard title="Empresas"                value={empresas}                 subtitle="Clientes tipo empresa"                         color="#f59e0b" icon={FaWarehouse} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Registro mensual de clientes y visitantes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <HBar label="Carpinteros"      val={carpinteros} max={maxVal} color="#f59e0b" />
              <HBar label="Empresas"         val={empresas}    max={maxVal} color="#3b82f6" />
              <HBar label="Clientes Finales" val={finales}     max={maxVal} color="#10b981" />
              <HBar label="Activos"          val={activos}     max={maxVal} color="#22c55e" />
              <HBar label="Inactivos"        val={inactivos}   max={maxVal} color="#ef4444" />
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 12 }}>Distribución de tipo de Personal</div>
              <DonutChart
                total={clientesFiltrados.length} label="Clientes"
                segments={[
                  { label: "Carpinteros", pct: clientesFiltrados.length ? Math.round((carpinteros / clientesFiltrados.length) * 100) : 0, val: carpinteros, color: "#f59e0b" },
                  { label: "Empresas",    pct: clientesFiltrados.length ? Math.round((empresas / clientesFiltrados.length) * 100) : 0,    val: empresas,    color: "#3b82f6" },
                  { label: "Finales",     pct: clientesFiltrados.length ? Math.round((finales / clientesFiltrados.length) * 100) : 0,     val: finales,     color: "#10b981" },
                ]}
              />
            </div>
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>Estado del Personal Admin</div>
              <HBar label="Pendientes"  val={pendientes}  max={Math.max(pendientes, confirmados, 1)} color="#f59e0b" />
              <div style={{ marginTop: 8 }}>
                <HBar label="Confirmados" val={confirmados} max={Math.max(pendientes, confirmados, 1)} color="#10b981" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabUsuarios;
