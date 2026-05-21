import React, { useState, useEffect } from "react";
import { FaExclamationTriangle, FaTruck } from "react-icons/fa";
import "../styles/pages/TabInventarioProveedor.css";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div className="kpi-card-i" style={{ borderTop: `4px solid ${color}` }}>
    <div className="kpi-left-i">
      <span className="kpi-value-i">{value}</span>
      <span className="kpi-title-i">{title}</span>
      {subtitle && <span className="kpi-sub-i">{subtitle}</span>}
    </div>
    <div className="kpi-icon-i" style={{ background: color + "18" }}>
      <Icon style={{ color }} />
    </div>
  </div>
);

const HBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.val), 1);
  return (
    <div className="hbar-chart-i">
      {data.map((d, i) => (
        <div className="hbar-row-i" key={i}>
          <span className="hbar-label-i">{d.label}</span>
          <div className="hbar-track-i">
            <div className="hbar-fill-i" style={{ width: `${(d.val / max) * 100}%`, background: d.color || "#2563eb" }}></div>
          </div>
          <span className="hbar-val-i">{d.val}</span>
        </div>
      ))}
    </div>
  );
};

const TabInventarioProveedor = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const jefeDefault = [
      { nombre: "MELAMINA BLANCO MATE 18MM", categoria: "TABLERO", stock: 15, stockMin: 10 },
      { nombre: "MELAMINA ROBLE SANTANA 18MM", categoria: "TABLERO", stock: 4, stockMin: 8 },
      { nombre: "TAPACANTO PVC DELGADO NEGRO", categoria: "TAPACANTO", stock: 120, stockMin: 50 },
      { nombre: "TAPACANTO GRUESO CEDRO 3MM", categoria: "TAPACANTO", stock: 15, stockMin: 30 },
    ];
    setProductos(JSON.parse(localStorage.getItem("db_almacen")) || jefeDefault);
  }, []);

  const bajoStock = productos.filter(p => p.stock > 0 && p.stock <= p.stockMin).length;
  const sinStock = productos.filter(p => p.stock === 0).length;

  return (
    <div className="tab-content-i fade-in-i">
      <div className="kpi-row-i">
        <KPICard title="Alertas de Reabastecimiento" value={bajoStock + sinStock} subtitle="Materiales críticos" color="#e67e22" icon={FaExclamationTriangle} />
        <KPICard title="Órdenes de Restock" value={bajoStock > 0 ? "1 Pendiente" : "0 Pendientes"} subtitle="Con proveedores externos" color="#8e44ad" icon={FaTruck} />
      </div>
      <div className="charts-row-i">
        <div className="chart-card-i wide-i">
          <h4 className="chart-title-i">Resumen de Materiales Críticos (Necesitan Pedido)</h4>
          <HBarChart data={productos.filter(p => p.stock <= p.stockMin).map(p => ({
            label: p.nombre,
            val: p.stock,
            color: "#ef4444"
          }))} />
        </div>
        <div className="chart-card-i">
          <div className="restock-section-i">
            <h4 className="chart-title-i">Logística y Proveedores</h4>
            <div className="restock-badge-i">
              <FaTruck />
              <span>{bajoStock + sinStock} material(es) listos para reabastecer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabInventarioProveedor;