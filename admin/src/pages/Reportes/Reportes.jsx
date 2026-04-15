import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSyncAlt, FaSearch, FaChartPie, FaFilePdf, FaMoneyBillWave 
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "../../styles/pages/Reportes/Reportes.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reportes = () => {
  const navigate = useNavigate();
  const [ventasReales, setVentasReales] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState("Abril");
  const [anioSeleccionado, setAnioSeleccionado] = useState("2026");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];
    setVentasReales(datos);
  }, []);

  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const obtenerDatosGrafico = () => {
    const conteo = {};
    ventasReales.forEach(v => {
      conteo[v.producto] = (conteo[v.producto] || 0) + 1;
    });

    return {
      labels: Object.keys(conteo),
      datasets: [
        {
          data: Object.values(conteo),
          backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6610f2'],
          borderWidth: 1,
        },
      ],
    };
  };

  const totalVentasMonto = ventasReales.reduce((acc, v) => {
    const precio = parseFloat(v.venta.replace("S/ ", "").replace(",", ""));
    return acc + (isNaN(precio) ? 0 : precio);
  }, 0);

  // FUNCIÓN PARA REDIRIGIR A CAJA
  const irAPagar = (venta) => {
    console.log("Redirigiendo pago de:", venta.producto);
    navigate("/admin/caja/administrar");
  };

  return (
    <div className="reportes-main-container">
      <div className="reportes-content-wrapper">
        
        <div className="reportes-header-box">
          <h2>Reporte de productos más vendidos - {mesSeleccionado} del {anioSeleccionado}</h2>
          <button className="btn-refresh" onClick={() => window.location.reload()}>
            <FaSyncAlt /> Actualizar
          </button>
        </div>

        <div className="filter-section-reporte">
          <div className="filter-group">
            <label>Mes</label>
            <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
              {meses.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Año</label>
            <select value={anioSeleccionado} onChange={(e) => setAnioSeleccionado(e.target.value)}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <button className="btn-consultar">
            <FaSearch /> Consultar
          </button>

          <button className="btn-generar-pdf">
            <FaFilePdf /> Generar Reporte General
          </button>
        </div>

        <div className="reporte-content-grid">
          <div className="table-side">
            <div className="search-bar-reporte">
              <div className="input-search-wrapper">
                <label>Buscar por producto:</label>
                <input 
                  type="text" 
                  placeholder="Ej: Escritorio..."
                  value={filtroBusqueda} 
                  onChange={(e) => setFiltroBusqueda(e.target.value)} 
                />
              </div>
            </div>

            <table className="tabla-reporte-ventas">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Productos</th>
                  <th>Total Ventas</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventasReales.length > 0 ? (
                  ventasReales
                    .filter(v => v.producto.toLowerCase().includes(filtroBusqueda.toLowerCase()))
                    .map((v, i) => (
                    <tr key={v.id || i}>
                      <td>{i + 1}</td>
                      <td className="product-name-cell">{v.producto}</td>
                      <td>{v.venta}</td>
                      <td>
                        <button className="btn-pagar-amarillo" onClick={() => irAPagar(v)}>
                          <FaMoneyBillWave /> Pagar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" style={{textAlign: 'center'}}>No hay datos de ventas</td></tr>
                )}
              </tbody>
            </table>
            
            <div className="monto-total-reporte">
              <strong>Monto Total Recaudado: S/ {totalVentasMonto.toLocaleString()}</strong>
            </div>
          </div>

          <div className="chart-side">
            <h4 style={{marginBottom: '20px'}}><FaChartPie /> Distribución</h4>
            <div className="pie-container">
              {ventasReales.length > 0 ? (
                <Pie data={obtenerDatosGrafico()} />
              ) : (
                <p>Sin datos para graficar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;