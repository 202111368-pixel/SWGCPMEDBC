import React, { useEffect, useState } from "react";
import "../styles/pages/Inicio.css";
import DonutChart from "../components/DonutChart";

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
};

const Card = ({ title, value, unit, children, onClick }) => (
  <div className="dash-card" onClick={onClick}>
    <div className="card-top">
      <h4>{title}</h4>
      <div className="card-value">{value}{unit ? <small className="unit">{unit}</small> : null}</div>
    </div>

    <div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
      {children}
    </div>
  </div>
);

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
    setSummary((s) => ({ ...s, ventas: s.ventas + 1 }));
  };

  const simulateReceipt = () => {
    setSummary((s) => ({ ...s, compras: s.compras + 1, inventario: s.inventario + 10 }));
  };

  return (
    <div className="page-container">

      <h2 className="page-title">Dashboard General</h2>
      <p className="page-description">
        Indicadores visuales principales del sistema.
      </p>

      <div className="cards-grid">

        <Card title="Ventas" value={summary.ventas} onClick={()=>openModule("Ventas")}>
          <DonutChart value={summary.ventas} color="#D9544F" />
          <button className="btn" onClick={(e)=>{e.stopPropagation(); simulateSale();}}>
            Registrar venta
          </button>
        </Card>

        <Card title="Compras" value={summary.compras} onClick={()=>openModule("Compras")}>
          <DonutChart value={summary.compras} color="#8e6c34" />
          <button className="btn" onClick={(e)=>{e.stopPropagation(); simulateReceipt();}}>
            Simular llegada
          </button>
        </Card>

        <Card title="Inventario" value={summary.inventario} unit="ud" onClick={()=>openModule("Inventario")}>
          <DonutChart value={summary.inventario/10} color="#3867A3" total={100}/>
        </Card>

        <Card title="Almacén" value={summary.almacen} unit="SKU" onClick={()=>openModule("Almacén")}>
          <DonutChart value={summary.almacen/2} color="#6052aa" total={100}/>
        </Card>

        <Card title="Producción" value={summary.produccion} onClick={()=>openModule("Producción")}>
          <DonutChart value={summary.produccion} color="#c27c2f" />
        </Card>

        <Card title="Cotizaciones" value={summary.cotizaciones} onClick={()=>openModule("Cotizaciones")}>
          <DonutChart value={summary.cotizaciones} color="#B55E87" />
        </Card>

        <Card title="Personal" value={summary.personal} onClick={()=>openModule("Personal")}>
          <DonutChart value={summary.personal} color="#2F7E69" />
        </Card>

        <Card title="Configuración" value={summary.configuracion} onClick={()=>openModule("Configuración")}>
          <DonutChart value={summary.configuracion} color="#949494" />
        </Card>
      </div>
    </div>
  );
};

export default Inicio;
