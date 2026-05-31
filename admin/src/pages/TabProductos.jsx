import React, { useState, useEffect } from "react";
import { FaBox, FaCheckCircle, FaExclamationTriangle, FaClipboardList, FaFilePdf, FaFilter } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div style={{ background: "white", borderRadius: 12, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderTop: `4px solid ${color}` }}>
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.4px" }}>{title}</span>
      {subtitle && <span style={{ fontSize: 11, color: "#94a3b8" }}>{subtitle}</span>}
    </div>
    <div style={{ width: 46, height: 46, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
      <Icon style={{ color }} />
    </div>
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

const TabProductos = () => {
  const [catalogo, setCatalogo]           = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("TODAS");
  const [filtroAlerta, setFiltroAlerta]   = useState("TODAS");
  const [filtroProducto, setFiltroProducto] = useState("");

  const productosBase = [
    { id: 1, nombre: "MELAMINA BLANCO MATE 18MM",   categoria: "TABLERO",   stock: 15, stockMin: 10, proveedor: "PELIKANO" },
    { id: 2, nombre: "MELAMINA ROBLE SANTANA 18MM",  categoria: "TABLERO",   stock: 4,  stockMin: 8,  proveedor: "VESTO"   },
    { id: 3, nombre: "TAPACANTO PVC DELGADO NEGRO",  categoria: "TAPACANTO", stock: 120,stockMin: 50, proveedor: "REHAU"   },
    { id: 4, nombre: "TAPACANTO GRUESO CEDRO 3MM",   categoria: "TAPACANTO", stock: 15, stockMin: 30, proveedor: "REHAU"   },
  ];

  const [productos] = useState(() => JSON.parse(localStorage.getItem("db_almacen")) || productosBase);

  useEffect(() => {
    setCatalogo(JSON.parse(localStorage.getItem("ventas_admin_3001")) || []);
  }, []);

  const getAlerta = (p) => {
    if (p.stock === 0) return "SIN_STOCK";
    if (p.stock <= p.stockMin) return "BAJO_STOCK";
    return "OPTIMO";
  };

  const categorias = [...new Set(productos.map(p => p.categoria))];

  const productosFiltrados = productos.filter(p => {
    if (filtroCategoria !== "TODAS" && p.categoria !== filtroCategoria) return false;
    if (filtroAlerta !== "TODAS" && getAlerta(p) !== filtroAlerta) return false;
    if (filtroProducto && !p.nombre.toLowerCase().includes(filtroProducto.toLowerCase())) return false;
    return true;
  });

  const sinStock  = productosFiltrados.filter(p => p.stock === 0).length;
  const bajoStock = productosFiltrados.filter(p => p.stock > 0 && p.stock <= p.stockMin).length;
  const optimo    = productosFiltrados.filter(p => p.stock > p.stockMin).length;

  const exportarCatalogoPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Catálogo de Productos — D'Bary Company", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleString("es-PE")}`, 14, 26);
    autoTable(doc, {
      head: [["#", "Material", "Categoría", "Proveedor", "Stock", "Alerta"]],
      body: productosFiltrados.map((p, i) => [
        i + 1, p.nombre, p.categoria, p.proveedor, p.stock,
        getAlerta(p) === "SIN_STOCK" ? "Sin Stock" : getAlerta(p) === "BAJO_STOCK" ? "Bajo Stock" : "Óptimo"
      ]),
      startY: 32,
      theme: "grid",
      headStyles: { fillColor: [30, 41, 59] },
    });
    doc.save("catalogo-productos-dbary.pdf");
  };

  const selectStyle = { padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#1e293b", outline: "none", background: "white", width: "100%" };
  const inputStyle  = { ...selectStyle };
  const labelStyle  = { fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 5, display: "block" };

  const alertaBadge = (p) => {
    const a = getAlerta(p);
    if (a === "SIN_STOCK")  return <span style={{ background: "#fef2f2", color: "#ef4444", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Sin Stock</span>;
    if (a === "BAJO_STOCK") return <span style={{ background: "#fffbeb", color: "#f59e0b", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Bajo Stock</span>;
    return <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Óptimo</span>;
  };

  return (
    <div className="tab-content fade-in" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
            <FaFilter style={{ color: "#d35400" }} /> Filtros
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Categorías</label>
            <select style={selectStyle} value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
              <option value="TODAS">Todas las categorías</option>
              {categorias.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Tipo de Alerta</label>
            <select style={selectStyle} value={filtroAlerta} onChange={e => setFiltroAlerta(e.target.value)}>
              <option value="TODAS">Todas</option>
              <option value="OPTIMO">Óptimo</option>
              <option value="BAJO_STOCK">Bajo Stock</option>
              <option value="SIN_STOCK">Sin Stock</option>
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Filtrar Productos</label>
            <input style={inputStyle} placeholder="Buscar producto..." value={filtroProducto} onChange={e => setFiltroProducto(e.target.value)} />
          </div>
          <button onClick={exportarCatalogoPDF} style={{ width: "100%", padding: "10px", background: "#0d9488", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13 }}>
            <FaFilePdf /> Exportar Catálogo PDF
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          <KPICard title="Materiales totales" value={productosFiltrados.length} subtitle="En almacén"            color="#3b82f6" icon={FaBox} />
          <KPICard title="Stock Óptimo"        value={optimo}                    subtitle="Nivel correcto"         color="#10b981" icon={FaCheckCircle} />
          <KPICard title="Bajo Stock"    value={bajoStock}                 subtitle="Requieren atención"    color="#f59e0b" icon={FaExclamationTriangle} />
          <KPICard title="Catálogo"            value={catalogo.length}           subtitle="Productos en catálogo" color="#8b5cf6" icon={FaClipboardList} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>Stock de productos según Categorías</div>
            {productosFiltrados.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: 13 }}>No hay productos con los filtros seleccionados.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {productosFiltrados.map(p => {
                  const max = Math.max(...productosFiltrados.map(x => x.stock), 1);
                  const color = p.stock === 0 ? "#ef4444" : p.stock <= p.stockMin ? "#f59e0b" : "#10b981";
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                      <span style={{ width: 200, flexShrink: 0, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nombre}</span>
                      <div style={{ flex: 1, height: 10, background: "#f1f5f9", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(p.stock / max) * 100}%`, background: color, borderRadius: 10 }} />
                      </div>
                      <span style={{ fontWeight: 700, color: "#1e293b", width: 32, textAlign: "right" }}>{p.stock}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", margin: "22px 0 14px" }}>
              Productos Críticos (Sin Stock o Bajo Stock)
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Producto</th>
                  <th style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Categoría</th>
                  <th style={{ padding: "10px 12px", textAlign: "center", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Stock</th>
                  <th style={{ padding: "10px 12px", textAlign: "center", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Tipo de Alerta</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.filter(p => getAlerta(p) !== "OPTIMO").map(p => (
                  <tr key={p.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 12px" }}>{p.nombre}</td>
                    <td style={{ padding: "10px 12px", color: "#64748b" }}>{p.categoria}</td>
                    <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700 }}>{p.stock}</td>
                    <td style={{ padding: "10px 12px", textAlign: "center" }}>{alertaBadge(p)}</td>
                  </tr>
                ))}
                {productosFiltrados.filter(p => getAlerta(p) !== "OPTIMO").length === 0 && (
                  <tr><td colSpan={4} style={{ padding: 20, textAlign: "center", color: "#94a3b8" }}>Sin productos críticos.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ background: "white", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 14 }}>Distribución de alertas según el Stock</div>
            <DonutChart
              total={productosFiltrados.length} label="Materiales"
              segments={[
                { label: "Activos/Óptimo", pct: productosFiltrados.length ? Math.round((optimo / productosFiltrados.length) * 100) : 0,    val: optimo,    color: "#3b82f6" },
                { label: "Bajo Stock",pct: productosFiltrados.length ? Math.round((bajoStock / productosFiltrados.length) * 100) : 0, val: bajoStock, color: "#f59e0b" },
                { label: "Sin Stock", pct: productosFiltrados.length ? Math.round((sinStock / productosFiltrados.length) * 100) : 0, val: sinStock, color: "#ef4444" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabProductos;
