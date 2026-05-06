import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBox, FaUsers, FaTools, FaChartBar, FaUserShield,
  FaClipboardList, FaArrowCircleRight, FaChartLine,
  FaUserCog, FaCashRegister, FaWarehouse, FaExclamationTriangle,
  FaCheckCircle, FaShoppingCart,
  FaTruck
} from "react-icons/fa";
import "../styles/pages/Inicio.css";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div className="kpi-card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="kpi-left">
      <span className="kpi-value">{value}</span>
      <span className="kpi-title">{title}</span>
      {subtitle && <span className="kpi-sub">{subtitle}</span>}
    </div>
    <div className="kpi-icon" style={{ background: color + "18" }}>
      <Icon style={{ color }} />
    </div>
  </div>
);

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
    <div className="donut-wrap">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {arcs}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#1e293b">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#64748b">{label}</text>
      </svg>
      <div className="donut-legend">
        {segments.map((s, i) => (
          <div key={i} className="donut-legend-item">
            <span className="dot" style={{ background: s.color }}></span>
            <span>{s.label}</span>
            <strong>{s.val !== undefined ? s.val : `${s.pct}%`}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

const HBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div className="hbar-chart">
      {data.map((d, i) => (
        <div className="hbar-row" key={i}>
          <span className="hbar-label">{d.label}</span>
          <div className="hbar-track">
            <div className="hbar-fill" style={{ width: `${(d.val / max) * 100}%`, background: d.color || "#2563eb" }}></div>
          </div>
          <span className="hbar-val">{d.val}</span>
        </div>
      ))}
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

  const activos    = clientes.filter(c => (c.estado || "ACTIVO") === "ACTIVO").length;
  const inactivos  = clientes.filter(c => c.estado === "INACTIVO").length;
  const carpinteros = clientes.filter(c => c.tipo === "CARPINTERO").length;
  const empresas   = clientes.filter(c => c.tipo === "EMPRESA").length;
  const finales    = clientes.filter(c => c.tipo === "FINAL").length;
  const pendientes = admins.filter(a => a.estado === "PENDIENTE").length;
  const confirmados = admins.filter(a => a.estado === "CONFIRMADO").length;

  return (
    <div className="tab-content fade-in">
      <div className="kpi-row">
        <KPICard title="Total Clientes"  value={clientes.length} subtitle={`${activos} activos / ${inactivos} inactivos`} color="#ef4444" icon={FaUsers} />
        <KPICard title="Personal Admin"  value={admins.length}   subtitle={`${pendientes} pendientes`}                    color="#3b82f6" icon={FaUserShield} />
        <KPICard title="Carpinteros"     value={carpinteros}     subtitle="Clientes tipo carpintero"                      color="#10b981" icon={FaUserCog} />
        <KPICard title="Empresas"        value={empresas}        subtitle="Clientes tipo empresa"                         color="#f59e0b" icon={FaWarehouse} />
      </div>
      <div className="charts-row">
        <div className="chart-card wide">
          <h4 className="chart-title">Registro de clientes por tipo</h4>
          <HBarChart data={[
            { label: "Carpinteros",      val: carpinteros, color: "#f59e0b" },
            { label: "Empresas",         val: empresas,    color: "#3b82f6" },
            { label: "Clientes Finales", val: finales,     color: "#10b981" },
            { label: "Activos",          val: activos,     color: "#22c55e" },
            { label: "Inactivos",        val: inactivos,   color: "#ef4444" },
          ]} />
        </div>
        <div className="chart-card">
          <h4 className="chart-title">Distribución de clientes</h4>
          <DonutChart
            total={clientes.length} label="Clientes"
            segments={[
              { label: "Carpinteros", pct: clientes.length ? Math.round((carpinteros / clientes.length) * 100) : 0, val: carpinteros, color: "#f59e0b" },
              { label: "Empresas",    pct: clientes.length ? Math.round((empresas / clientes.length) * 100) : 0,    val: empresas,    color: "#3b82f6" },
              { label: "Finales",     pct: clientes.length ? Math.round((finales / clientes.length) * 100) : 0,     val: finales,     color: "#10b981" },
            ]}
          />
          <div className="gauge-section">
            <h4 className="chart-title">Estado del Personal Admin</h4>
            <div className="hbar-chart" style={{ marginTop: 8 }}>
              <div className="hbar-row">
                <span className="hbar-label">Pendientes</span>
                <div className="hbar-track"><div className="hbar-fill" style={{ width: admins.length ? `${(pendientes / admins.length) * 100}%` : "0%", background: "#f59e0b" }}></div></div>
                <span className="hbar-val">{pendientes}</span>
              </div>
              <div className="hbar-row">
                <span className="hbar-label">Confirmados</span>
                <div className="hbar-track"><div className="hbar-fill" style={{ width: admins.length ? `${(confirmados / admins.length) * 100}%` : "0%", background: "#10b981" }}></div></div>
                <span className="hbar-val">{confirmados}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabProductos = () => {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    setCatalogo(JSON.parse(localStorage.getItem("ventas_admin_3001")) || []);
  }, []);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const jefeDefault = [
      { nombre: "MELAMINA BLANCO MATE 18MM",   categoria: "TABLERO",   stock: 15, stockMin: 10 },
      { nombre: "MELAMINA ROBLE SANTANA 18MM", categoria: "TABLERO",   stock: 4,  stockMin: 8  },
      { nombre: "TAPACANTO PVC DELGADO NEGRO", categoria: "TAPACANTO", stock: 120,stockMin: 50 },
      { nombre: "TAPACANTO GRUESO CEDRO 3MM",  categoria: "TAPACANTO", stock: 15, stockMin: 30 },
    ];
    setProductos(JSON.parse(localStorage.getItem("db_almacen")) || jefeDefault);
  }, []);

  const sinStock  = productos.filter(p => p.stock === 0).length;
  const bajoStock = productos.filter(p => p.stock > 0 && p.stock <= p.stockMin).length;
  const optimo    = productos.filter(p => p.stock > p.stockMin).length;

  return (
    <div className="tab-content fade-in">
      <div className="kpi-row">
        <KPICard title="Total Materiales" value={productos.length} subtitle="En almacén"            color="#3b82f6" icon={FaBox} />
        <KPICard title="Stock Óptimo"     value={optimo}           subtitle="Nivel correcto"         color="#10b981" icon={FaCheckCircle} />
        <KPICard title="Bajo Stock"       value={bajoStock}        subtitle="Requieren atención"     color="#f59e0b" icon={FaExclamationTriangle} />
        <KPICard title="Catálogo"         value={catalogo.length}  subtitle="Productos en catálogo"  color="#8b5cf6" icon={FaClipboardList} />
      </div>
      <div className="charts-row">
        <div className="chart-card wide">
          <h4 className="chart-title">Stock por material</h4>
          <HBarChart data={productos.map(p => ({
            label: p.nombre.length > 30 ? p.nombre.slice(0, 30) + "…" : p.nombre,
            val: p.stock,
            color: p.stock <= p.stockMin ? "#ef4444" : "#10b981"
          }))} />
          <h4 className="chart-title" style={{ marginTop: 24 }}>Productos en catálogo</h4>
          <HBarChart data={catalogo.slice(0, 6).map(v => ({
            label: (v.producto || "Producto").slice(0, 28),
            val: parseFloat((v.venta || "0").toString().replace(/[^0-9.]/g, "")) || 0,
            color: "#8b5cf6"
          }))} />
        </div>
        <div className="chart-card">
          <h4 className="chart-title">Estado de stock</h4>
          <DonutChart
            total={productos.length} label="Materiales"
            segments={[
              { label: "Óptimo",     pct: Math.round((optimo / productos.length) * 100),    val: optimo,    color: "#10b981" },
              { label: "Bajo Stock", pct: Math.round((bajoStock / productos.length) * 100), val: bajoStock, color: "#f59e0b" },
              { label: "Sin Stock",  pct: Math.round((sinStock / productos.length) * 100),  val: sinStock,  color: "#ef4444" },
            ]}
          />
          <div className="restock-section">
            <h4 className="chart-title">Para Restock</h4>
            <div className="restock-badge">
              <FaTruck />
              <span>{bajoStock + sinStock} material(es) para reabastecer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabVentas = () => {
  const [admins, setAdmins] = useState([]);

  const [operaciones, setOperaciones] = useState([]);

  useEffect(() => {
    setAdmins(JSON.parse(localStorage.getItem("db_admins_v2")) || []);
    setOperaciones(JSON.parse(localStorage.getItem("db_cajero")) || [
      { id: 101, cliente: "INDUSTRIAL HUANCAYO", monto: 1550.00, estado: "PENDIENTE"  },
      { id: 102, cliente: "MUEBLES LIMA S.A.",   monto: 420.50,  estado: "CONFIRMADO" },
    ]);
  }, []);

  const confirmadas      = operaciones.filter(o => o.estado === "CONFIRMADO");
  const montoTotal       = confirmadas.reduce((acc, o) => acc + o.monto, 0);
  const pendientesCaja   = operaciones.filter(o => o.estado === "PENDIENTE").length;
  const adminsPendientes = admins.filter(a => a.estado === "PENDIENTE");
  const adminsConfirm    = admins.filter(a => a.estado === "CONFIRMADO");
  const montoAdmins      = admins.reduce((acc, a) => acc + (a.monto || 0), 0);

  return (
    <div className="tab-content fade-in">
      <div className="kpi-row">
        <KPICard title="Ventas Confirmadas" value={confirmadas.length}             subtitle={`${pendientesCaja} pendientes`}         color="#10b981" icon={FaShoppingCart} />
        <KPICard title="Efectivo en Caja"   value={`S/ ${montoTotal.toFixed(2)}`} subtitle="Pagos confirmados"                      color="#3b82f6" icon={FaChartLine} />
        <KPICard title="Registros Admin"    value={admins.length}                 subtitle={`${adminsPendientes.length} pendientes`} color="#f59e0b" icon={FaUserShield} />
        <KPICard title="Monto Admin"        value={`S/ ${montoAdmins.toFixed(2)}`} subtitle="Total registrado"                      color="#8b5cf6" icon={FaClipboardList} />
      </div>
      <div className="charts-row">
        <div className="chart-card wide">
          <h4 className="chart-title">Operaciones en caja</h4>
          <HBarChart data={operaciones.map(o => ({
            label: o.cliente,
            val: o.monto,
            color: o.estado === "CONFIRMADO" ? "#10b981" : "#f59e0b"
          }))} />
          <h4 className="chart-title" style={{ marginTop: 24 }}>Montos por registro administrativo</h4>
          <HBarChart data={admins.slice(0, 8).map(a => ({
            label: (`${a.nombres || ""} ${a.apellidos || ""}`).trim().slice(0, 22) || "Sin nombre",
            val: a.monto || 0,
            color: a.estado === "CONFIRMADO" ? "#10b981" : "#f59e0b"
          }))} />
        </div>
        <div className="chart-card">
          <h4 className="chart-title">Estado operaciones en caja</h4>
          <DonutChart
            total={operaciones.length} label="Operaciones"
            segments={[
              { label: "Confirmadas", pct: Math.round((confirmadas.length / operaciones.length) * 100), val: confirmadas.length, color: "#10b981" },
              { label: "Pendientes",  pct: Math.round((pendientesCaja / operaciones.length) * 100),     val: pendientesCaja,     color: "#f59e0b" },
            ]}
          />
          <div className="gauge-section">
            <h4 className="chart-title">Estado registros admin</h4>
            <DonutChart
              total={admins.length || 1} label="Registros"
              segments={[
                { label: "Confirmados", pct: admins.length ? Math.round((adminsConfirm.length / admins.length) * 100) : 0,    val: adminsConfirm.length,    color: "#10b981" },
                { label: "Pendientes",  pct: admins.length ? Math.round((adminsPendientes.length / admins.length) * 100) : 0, val: adminsPendientes.length, color: "#f59e0b" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TabPanel = () => {
  const navigate = useNavigate();
  const [clientes, setClientes]   = useState([]);
  const [admins, setAdmins]       = useState([]);
  const [catalogo, setCatalogo]   = useState([]);

  useEffect(() => {
    setClientes(JSON.parse(localStorage.getItem("db_clientes"))      || []);
    setAdmins(JSON.parse(localStorage.getItem("db_admins_v2"))      || []);
    setCatalogo(JSON.parse(localStorage.getItem("ventas_admin_3001")) || []);
  }, []);

  const montoAdmins = admins.filter(a => a.estado === "CONFIRMADO").reduce((acc, a) => acc + (a.monto || 0), 0);

  const modulos = [
    { title: "Administrador", val: admins.length > 0 ? `${admins.length} reg.` : "Activo", icon: FaUserShield,   col: "#795548", path: "/admin/administrador"    },
    { title: "Clientes",      val: clientes.length,                                         icon: FaUsers,         col: "#f0ad4e", path: "/admin/clientes"         },
    { title: "Catálogo",      val: catalogo.length,                                         icon: FaBox,           col: "#d9534f", path: "/admin/producto/gestionar"},
    { title: "Reportes",      val: "Ver",                                                   icon: FaChartBar,      col: "#5cb85c", path: "/admin/reportes"         },
    { title: "Caja / Ventas", val: `S/ ${montoAdmins.toFixed(0)}`,                         icon: FaCashRegister,  col: "#4eb4e1", path: "/admin/caja/administrar" },
    { title: "Jefe Almacén",  val: "4 mat.",                                                icon: FaWarehouse,     col: "#6052aa", path: "/admin/jefeAlmacen"      },
    { title: "Inventario",    val: "Stock",                                                 icon: FaClipboardList, col: "#8e44ad", path: "/admin/inventario"       },
    { title: "Configuración", val: "Sistema",                                               icon: FaTools,         col: "#475569", path: "/admin/configuración"    }
  ];

  return (
    <div className="tab-content fade-in">
      <div className="dashboard-header">
        <h2 className="page-title">Panel de Control D'Bary</h2>
        <p className="page-subtitle">Bienvenido al sistema de gestión de melamina</p>
      </div>
      <div className="cards-grid-reference">
        {modulos.map(m => (
          <div key={m.title} className="card-stat" style={{ backgroundColor: m.col }} onClick={() => navigate(m.path)}>
            <div className="inner-content">
              <div className="stat-info"><h3>{m.val}</h3><p>{m.title}</p></div>
              <div className="stat-icon"><m.icon /></div>
            </div>
            <div className="more-info">Ir al módulo <FaArrowCircleRight /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TABS = [
  { key: "usuarios",  label: "CLIENTE Y ADMINISTRADOR", icon: FaUsers,     color: "#3b82f6" },
  { key: "productos", label: "PRODUCTOS Y STOCK",    icon: FaBox,          color: "#d35400" },
  { key: "ventas",    label: "VENTAS Y PEDIDOS",     icon: FaShoppingCart, color: "#e67e22" },
  { key: "config",    label: "CONFIGURACIÓN",         icon: FaTools,        color: "#7f8c8d" },
];

const Inicio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("usuarios");

  const renderTab = () => {
    if (activeTab === "usuarios")  return <TabUsuarios />;
    if (activeTab === "productos") return <TabProductos />;
    if (activeTab === "ventas")    return <TabVentas />;
    if (activeTab === "config")    return null;
    return null;
  };

  return (
    <div className="page-container">
      <div className="dashboard-content-limit">
        <div className="dashboard-tabs-container">
          {TABS.map(t => (
            <div key={t.key} className={`tab-item ${activeTab === t.key ? "active" : ""}`}
              onClick={() => { setActiveTab(t.key); if (t.key === "config") { navigate("/admin/configuración"); return; } }}
              style={activeTab === t.key ? { color: t.color } : {}}
            >
              <t.icon className="tab-icon" style={{ color: t.color }} />
              {t.label}
              {activeTab === t.key && <div className="tab-underline" style={{ background: t.color }}></div>}
            </div>
          ))}
        </div>
        {renderTab()}
      </div>
    </div>
  );
};

export default Inicio;