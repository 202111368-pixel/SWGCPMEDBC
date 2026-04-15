import React, { useState, useEffect } from 'react';
import { 
  FaFilePdf, FaSyncAlt, FaSearch, FaChartPie, FaFileInvoice 
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/pages/Reportes/Reportes.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reportes = () => {
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

  const generarBoleta = (venta) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("OSORIO DEBARI, NICOLAS", 14, 15);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Av. SJM N154 - Lima - Lima", 14, 20);
    doc.text("Telf: 962219340", 14, 24);

    doc.setLineWidth(0.5);
    doc.rect(130, 10, 65, 25); 
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("R.U.C. N° 20395834584", 135, 17);
    doc.setTextColor(255, 0, 0); // Rojo para el título
    doc.text("BOLETA DE VENTA", 135, 24);
    doc.setTextColor(0, 0, 0);
    doc.text(`N° 001 - 0000003`, 135, 31);

    doc.rect(14, 38, 181, 20);
    doc.setFontSize(9);
    doc.text(`CLIENTE: ${venta.cliente || "LUIS SECLÉN SAMPÉN"}`, 16, 44);
    doc.text(`DIRECCIÓN: AV. MÉXICO`, 16, 50);
    doc.text(`FECHA EMISIÓN: ${new Date().toLocaleDateString()}`, 130, 44);
    doc.text(`CONDIC. PAGO: CONTADO`, 130, 50);

    // TABLA DE PRODUCTO
    const precioLimpio = parseFloat(venta.venta.replace("S/ ", "").replace(",", ""));
    autoTable(doc, {
      startY: 62,
      head: [['ITEM', 'CANT.', 'DESCRIPCIÓN', 'P. UNIT.', 'IMPORTE']],
      body: [['1', '1', venta.producto.toUpperCase(), precioLimpio.toFixed(2), precioLimpio.toFixed(2)]],
      theme: 'plain',
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
      styles: { cellPadding: 3, fontSize: 8, halign: 'center', lineWidth: 0.1, lineColor: [0, 0, 0] },
      columnStyles: { 2: { halign: 'left', cellWidth: 80 } }
    });

    const finalY = doc.lastAutoTable.finalY + 5;
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: S/ ${precioLimpio.toFixed(2)}`, 160, finalY + 5);

    doc.save(`Boleta_${venta.id}.pdf`);
  };

  return (
    <div className="reportes-main-container">
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
            <span>Mostrar 10 Elementos</span>
            <div className="input-search-wrapper">
              <label>Buscar por:</label>
              <input 
                type="text" 
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
                  <tr key={v.id}>
                    <td>{i + 1}</td>
                    <td className="product-name-cell">{v.producto}</td>
                    <td>{v.venta}</td>
                    <td>
                      <button className="btn-boleta-individual" onClick={() => generarBoleta(v)} title="Descargar Boleta">
                        <FaFileInvoice /> Boleta
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No hay datos de ventas de melamina</td></tr>
              )}
            </tbody>
          </table>
          
          <div className="monto-total-reporte">
            <strong>Monto Total Recaudado: S/ {totalVentasMonto.toLocaleString()}</strong>
          </div>
        </div>

        <div className="chart-side">
          <h4><FaChartPie /> Distribución de Productos</h4>
          <div className="pie-container">
            {ventasReales.length > 0 ? (
              <Pie data={obtenerDatosGrafico()} />
            ) : (
              <p>Cargando gráfico...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;