import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaTruck, FaSearch, FaFilter, FaFilePdf, FaShoppingCart } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const KPICard = ({ title, value, subtitle, color, icon: Icon, big }) => (
  <div style={{ background: "white", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderTop: `4px solid ${color}` }}>
    <div>
      <div style={{ fontSize: big ? 36 : 26, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color, marginTop: 4 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{subtitle}</div>}
    </div>
    <div style={{ width: 50, height: 50, borderRadius: 12, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>
      <Icon style={{ color }} />
    </div>
  </div>
);

const TabInventarioProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [filtroRubro, setFiltroRubro] = useState("TODOS");
  const [filtroEmpresa, setFiltroEmpresa] = useState("");
  const [filtroRuc, setFiltroRuc] = useState("");

  const productosBase = [
    { id: 1, nombre: "MELAMINA BLANCO MATE 18MM",   categoria: "TABLERO",   stock: 15, stockMin: 10, proveedor: "PELIKANO" },
    { id: 2, nombre: "MELAMINA ROBLE SANTANA 18MM",  categoria: "TABLERO",   stock: 4,  stockMin: 8,  proveedor: "VESTO"   },
    { id: 3, nombre: "TAPACANTO PVC DELGADO NEGRO",  categoria: "TAPACANTO", stock: 120,stockMin: 50, proveedor: "REHAU"   },
    { id: 4, nombre: "TAPACANTO GRUESO CEDRO 3MM",   categoria: "TAPACANTO", stock: 15, stockMin: 30, proveedor: "REHAU"   },
  ];

  const [productos] = useState(() => JSON.parse(localStorage.getItem("db_almacen")) || productosBase);

  useEffect(() => {
    setProveedores(JSON.parse(localStorage.getItem("db_proveedores")) || [
      { id: 1, empresa: "Melaminas del Centro S.A.", ruc: "20456789121", contacto: "Carlos Mendoza", telefono: "987654321", correo: "ventas@melacentro.com", insumo: "Tableros de Melamina" },
      { id: 2, empresa: "Distribuidora PVC Premium",  ruc: "20123456789", contacto: "Ana López",      telefono: "912345678", correo: "alopez@pvcpremium.pe",  insumo: "Tapacantos y Cantos PVC" },
      { id: 3, empresa: "Herrajes y Accesorios D'Bary",ruc: "20987654321",contacto: "Luis Arce",      telefono: "934567890", correo: "larce@herrajesdbary.com",insumo: "Tornillos y Bisagras" },
    ]);
  }, []);

  const alertasCriticas = productos.filter(p => p.stock <= p.stockMin);
  const reabastecerCount = alertasCriticas.length;

  const rubros = [...new Set(proveedores.map(p => p.insumo))];

  const proveedoresFiltrados = proveedores.filter(p => {
    if (filtroRubro !== "TODOS" && p.insumo !== filtroRubro) return false;
    if (filtroEmpresa && !p.empresa.toLowerCase().includes(filtroEmpresa.toLowerCase())) return false;
    if (filtroRuc && !p.ruc.includes(filtroRuc)) return false;
    return true;
  });

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Reporte de Inventario y Proveedores — D'Bary", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleString("es-PE")}`, 14, 26);
    doc.setFontSize(13);
    doc.text("Materiales Críticos", 14, 38);
    autoTable(doc, {
      head: [["Material", "Categoría", "Stock Actual", "Stock Mínimo", "Proveedor"]],
      body: alertasCriticas.map(p => [p.nombre, p.categoria, p.stock, p.stockMin, p.proveedor]),
      startY: 44,
      theme: "grid",
      headStyles: { fillColor: [239, 68, 68] },
    });
    const y2 = doc.lastAutoTable.finalY + 14;
    doc.setFontSize(13);
    doc.text("Directorio de Proveedores", 14, y2);
    autoTable(doc, {
      head: [["Empresa", "RUC", "Contacto", "Teléfono", "Insumo"]],
      body: proveedoresFiltrados.map(p => [p.empresa, p.ruc, p.contacto, p.telefono, p.insumo]),
      startY: y2 + 6,
      theme: "grid",
      headStyles: { fillColor: [30, 41, 59] },
    });
    doc.save("inventario-proveedores-dbary.pdf");
  };

  const selectStyle = { padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, color: "#1e293b", outline: "none", background: "white", width: "100%" };
  const inputStyle  = { ...selectStyle };
  const labelStyle  = { fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 5, display: "block" };

  return (
    <div className="tab-content fade-in" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
            <FaFilter style={{ color: "#8e44ad" }} /> Filtros
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Rubro / Insumo</label>
            <select style={selectStyle} value={filtroRubro} onChange={e => setFiltroRubro(e.target.value)}>
              <option value="TODOS">Todos los rubros</option>
              {rubros.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Empresa</label>
            <div style={{ position: "relative" }}>
              <FaSearch style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 12 }} />
              <input style={{ ...inputStyle, paddingLeft: 30 }} placeholder="Buscar empresa..." value={filtroEmpresa} onChange={e => setFiltroEmpresa(e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>RUC</label>
            <div style={{ position: "relative" }}>
              <FaSearch style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 12 }} />
              <input style={{ ...inputStyle, paddingLeft: 30 }} placeholder="Buscar RUC..." value={filtroRuc} onChange={e => setFiltroRuc(e.target.value)} />
            </div>
          </div>
          <button onClick={exportarPDF} style={{ width: "100%", padding: "10px", background: "#0d9488", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13 }}>
            <FaFilePdf /> Exportar Reporte PDF
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <KPICard title="Alertas de Reabastecimiento" value={reabastecerCount} subtitle="Materiales críticos"      color="#f59e0b" icon={FaExclamationTriangle} big />
          <KPICard title="Órdenes de Restock"          value={`${reabastecerCount > 0 ? 1 : 0} Pendiente`} subtitle="Con proveedores externos" color="#8b5cf6" icon={FaTruck} big />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 14 }}>Resumen de Materiales Críticos (Necesitan Pedido)</div>
            {alertasCriticas.length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: 13 }}>Todos los materiales tienen stock óptimo.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {alertasCriticas.map(p => {
                  const max = Math.max(...alertasCriticas.map(x => x.stock), 1);
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12 }}>
                      <span style={{ width: 200, flexShrink: 0, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.nombre}</span>
                      <div style={{ flex: 1, height: 10, background: "#f1f5f9", borderRadius: 10, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(p.stock / max) * 100}%`, background: "#ef4444", borderRadius: 10 }} />
                      </div>
                      <span style={{ fontWeight: 700, color: "#1e293b", width: 28, textAlign: "right" }}>{p.stock}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ background: "white", borderRadius: 14, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 14 }}>Logística y Proveedores</div>
            {reabastecerCount > 0 && (
              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#92400e" }}>
                <FaShoppingCart style={{ color: "#f59e0b" }} />
                <span>{reabastecerCount} materiales listos para reabastecer</span>
              </div>
            )}
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>Proveedores disponibles: <strong style={{ color: "#1e293b" }}>{proveedoresFiltrados.length}</strong></div>
            {proveedoresFiltrados.slice(0, 3).map(p => (
              <div key={p.id} style={{ padding: "10px 0", borderTop: "1px solid #f1f5f9", fontSize: 12 }}>
                <div style={{ fontWeight: 700, color: "#1e293b" }}>{p.empresa}</div>
                <div style={{ color: "#64748b", marginTop: 2 }}>{p.insumo} · {p.telefono}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
            Directorio de Proveedores
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Empresa / RUC</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Insumo Principal</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Contacto Directo</th>
                <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: "#64748b", textTransform: "uppercase" }}>Canales</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.length === 0 ? (
                <tr><td colSpan={4} style={{ padding: 20, textAlign: "center", color: "#94a3b8" }}>No se encontraron proveedores.</td></tr>
              ) : proveedoresFiltrados.map(p => (
                <tr key={p.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontWeight: 700, color: "#1e293b" }}>{p.empresa}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>RUC: {p.ruc}</div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: "#eff6ff", color: "#2563eb", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{p.insumo}</span>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>{p.contacto || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, fontSize: 12, color: "#475569" }}>
                      {p.telefono && <span>📞 {p.telefono}</span>}
                      {p.correo && <span>✉ {p.correo}</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TabInventarioProveedor;
