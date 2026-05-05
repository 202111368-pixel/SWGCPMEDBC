import React, { useState, useEffect } from "react";
import { FaTrash, FaFilePdf, FaSearch, FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/pages/Producto/Producto.css"; 

const Producto = () => {
  const [ventas, setVentas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [alert, setAlert] = useState({ show: false, msg: "", title: "", type: "" });

  useEffect(() => {
    cargarVentas();
    
    // Escuchar cambios de storage y eventos de venta registrada
    window.addEventListener("storage", cargarVentas);
    window.addEventListener("ventaRegistrada", cargarVentas);
    
    return () => {
      window.removeEventListener("storage", cargarVentas);
      window.removeEventListener("ventaRegistrada", cargarVentas);
    };
  }, []);

  const cargarVentas = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    setVentas(ventasGuardadas);
    setCargando(false);
  };

  const showToast = (title, msg, type = "success") => {
    setAlert({ show: true, title, msg, type });
    setTimeout(() => setAlert({ show: false, title: "", msg: "", type: "" }), 4500);
  };

  const exportarPDF = () => {
    if (ventasFiltradas.length === 0) {
      showToast("SIN DATOS", "No hay ventas para exportar", "error");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Ventas Registradas", 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 28);
    
    const tablaData = ventasFiltradas.map((v, i) => [
      i + 1, 
      v.producto || "Sin nombre", 
      v.venta || "S/ 0.00", 
      v.metodoPago || "No especificado",
      v.estado || "PENDIENTE",
      v.fecha || ""
    ]);

    autoTable(doc, {
      head: [['#', 'Producto', 'Total', 'Método Pago', 'Estado', 'Fecha']],
      body: tablaData,
      startY: 35,
      theme: 'grid',
      headStyles: { 
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [241, 245, 249] }
    });

    doc.save("reporte-ventas.pdf");
    showToast("ÉXITO", "Reporte exportado correctamente", "success");
  };

  const eliminarVenta = (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta venta?")) return;
    
    const nuevaLista = ventas.filter((v) => v.id !== id);
    setVentas(nuevaLista);
    localStorage.setItem("ventas_registradas", JSON.stringify(nuevaLista));
    showToast("ELIMINADO", "Venta eliminada del sistema", "error");
  };

  const ventasFiltradas = ventas.filter(v => 
    (v.producto || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  const getEstadoColor = (estado) => {
    switch(estado) {
      case "VALIDADO": return "#10b981";
      case "PENDIENTE": return "#f59e0b";
      case "CANCELADO": return "#ef4444";
      default: return "#6b7280";
    }
  };

  return (
    <div className="admin-main-wrapper">

      {alert.show && (
        <div className={`toast-notification ${alert.type}`}>
          <div className="toast-icon-circle">
            {alert.type === "error" ? "!" : <FaCheckCircle />}
          </div>
          <div className="toast-body">
            <div className="toast-header">
              <span className="toast-title">{alert.title}</span>
              <span className="toast-time">ahora</span>
            </div>
            <p className="toast-message">{alert.msg}</p>
          </div>
        </div>
      )}

      <div className="admin-content-container">
        <header className="brand-section">
          <div className="brand-logo-bg"><FaBoxOpen /></div>
          <h1 className="brand-title">Gestión de Productos</h1>
        </header>

        <div className="action-row">
          <div className="search-box">
            <FaSearch />
            <input 
              placeholder="Filtrar por producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)} 
            />
          </div>
          <button className="btn-primary-blue" onClick={exportarPDF}>
            <FaFilePdf /> Exportar PDF
          </button>
        </div>

        <div className="data-card">
          {cargando ? (
            <div className="loading-state">
              <p>Cargando ventas...</p>
            </div>
          ) : (
            <>
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>PRODUCTO</th>
                    <th>IMAGEN</th>
                    <th>TOTAL</th>
                    <th>MÉTODO PAGO</th>
                    <th>ESTADO</th>
                    <th>FECHA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {ventasFiltradas.length > 0 ? (
                    ventasFiltradas.map((v, i) => (
                      <tr key={v.id}>
                        <td className="td-code">{i + 1}</td>
                        <td className="td-nombre">{v.producto}</td>
                        <td className="td-imagen">
                          <img 
                            src={v.imagen} 
                            alt={v.producto} 
                            className="venta-thumb" 
                            onError={(e) => { e.target.src = "https://via.placeholder.com/80x60?text=Producto"; }}
                          />
                        </td>
                        <td className="td-monto">{v.venta}</td>
                        <td className="td-metodo">{v.metodoPago || "No especificado"}</td>
                        <td>
                          <span 
                            className="status-pill"
                            style={{ backgroundColor: getEstadoColor(v.estado) + "20", color: getEstadoColor(v.estado) }}
                          >
                            {v.estado}
                          </span>
                        </td>
                        <td className="td-fecha">{v.fecha || new Date().toLocaleDateString()}</td>
                        <td className="td-acciones">
                          <button 
                            onClick={() => eliminarVenta(v.id)} 
                            className="act-btn-delete"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="no-data-msg">
                        No hay compras registradas. Los clientes deben completar el pago en el carrito.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="table-footer">
                <p className="footer-text">
                  Mostrando {ventasFiltradas.length} de {ventas.length} ventas registradas
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Producto;