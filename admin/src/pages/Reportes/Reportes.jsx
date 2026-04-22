import React, { useState, useEffect } from 'react';
import { 
  FaSyncAlt, FaSearch, FaChartPie, FaFilePdf, FaBoxes, FaRulerCombined, FaClipboardList 
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import "../../styles/pages/Reportes/Reportes.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ReportesMelamina = () => {
  const [ventasMelamina, setVentasMelamina] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState("Abril");
  const [anioSeleccionado, setAnioSeleccionado] = useState("2026");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  useEffect(() => {
    // Simulando carga de datos orientados a melamina (Tableros, cantos, servicios de corte)
    const datos = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];
    setVentasMelamina(datos);
  }, []);

  const years = ["2024", "2025", "2026"];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Datos para gráfico de tipos de tablero (Texturas/Colores)
  const datosDistribucion = () => {
    const conteo = {};
    ventasMelamina.forEach(v => {
      conteo[v.producto] = (conteo[v.producto] || 0) + 1;
    });

    return {
      labels: Object.keys(conteo),
      datasets: [{
        data: Object.values(conteo),
        backgroundColor: ['#4b3621', '#8b4513', '#d2b48c', '#deb887', '#5d4037', '#a1887f'],
        borderWidth: 0,
      }],
    };
  };

  // Cálculo de metros o planchas estimadas (Lógica de negocio de melamina)
  const totalPlanchasVendidas = ventasMelamina.length; 

  return (
    <div className="reportes-main-container">
      <div className="reportes-content-wrapper">
        
        <div className="reportes-header-box">
          <h2><FaClipboardList /> Gestión de Ventas de Melamina y Tableros</h2>
          <div className="header-actions">
            <span className="last-update">Última carga: {new Date().toLocaleTimeString()}</span>
            <button className="btn-refresh" onClick={() => window.location.reload()}>
              <FaSyncAlt /> Refrescar Datos
            </button>
          </div>
        </div>

        <div className="stats-cards-melamina">
          <div className="stat-card">
            <FaBoxes className="icon-blue" />
            <div className="stat-info">
              <span>Planchas Despachadas</span>
              <strong>{totalPlanchasVendidas} und.</strong>
            </div>
          </div>
          <div className="stat-card">
            <FaRulerCombined className="icon-orange" />
            <div className="stat-info">
              <span>Servicios de Corte</span>
              <strong>{ventasMelamina.length > 0 ? (ventasMelamina.length * 4) : 0} m.l.</strong>
            </div>
          </div>
        </div>

        <div className="filter-section-reporte">
          <div className="filter-group">
            <label>Período Mensual</label>
            <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
              {meses.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Ejercicio Fiscal</label>
            <select value={anioSeleccionado} onChange={(e) => setAnioSeleccionado(e.target.value)}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <button className="btn-consultar">
            <FaSearch /> Filtrar Catálogo
          </button>

          <button className="btn-generar-pdf">
            <FaFilePdf /> Exportar Kardex PDF
          </button>
        </div>

        <div className="reporte-content-grid">
          <div className="table-side">
            <div className="search-bar-reporte">
              <div className="input-search-wrapper">
                <label>Filtrar por Color o Espesor:</label>
                <input 
                  type="text" 
                  placeholder="Ej: Roble 18mm, Blanco Frost..."
                  value={filtroBusqueda} 
                  onChange={(e) => setFiltroBusqueda(e.target.value)} 
                />
              </div>
            </div>

            <table className="tabla-reporte-ventas">
              <thead>
                <tr>
                  <th>Cod.</th>
                  <th>Descripción del Tablero</th>
                  <th>Medida</th>
                  <th>Estado Entrega</th>
                </tr>
              </thead>
              <tbody>
                {ventasMelamina.length > 0 ? (
                  ventasMelamina
                    .filter(v => v.producto.toLowerCase().includes(filtroBusqueda.toLowerCase()))
                    .map((v, i) => (
                    <tr key={v.id || i}>
                      <td>#ML-{100 + i}</td>
                      <td className="product-name-cell">{v.producto}</td>
                      <td>2.44 x 2.14 m</td>
                      <td>
                        <span className="status-badge-despacho">LISTO PARA CORTE</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="no-data">No se encontraron registros de melamina</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="chart-side">
            <h4 className="chart-title"><FaChartPie /> Popularidad de Diseños</h4>
            <div className="pie-container">
              {ventasMelamina.length > 0 ? (
                <Pie 
                  data={datosDistribucion()} 
                  options={{
                    plugins: {
                      legend: { position: 'bottom' }
                    }
                  }}
                />
              ) : (
                <div className="empty-chart">Esperando datos...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportesMelamina;