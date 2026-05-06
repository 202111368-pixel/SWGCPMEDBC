import React, { useState, useEffect } from "react";
import { FaTrash, FaFilePdf, FaSearch, FaBoxOpen } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/pages/Producto/Producto.css"; 

const Producto = () => {
  const [ventas, setVentas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarVentas();
    
    window.addEventListener("storage", (e) => {
      if (e.key === "ventas_registradas") {
        cargarVentas();
      }
    });

    window.addEventListener("ventaRegistrada", cargarVentas);

    return () => {
      window.removeEventListener("storage", cargarVentas);
      window.removeEventListener("ventaRegistrada", cargarVentas);
    };
  }, []);

  const cargarVentas = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    setVentas(ventasGuardadas);
  };

  const eliminarVenta = (index) => {
    const nuevaLista = [...ventas];
    nuevaLista.splice(index, 1);
    localStorage.setItem("ventas_registradas", JSON.stringify(nuevaLista));
    setVentas(nuevaLista);
    window.dispatchEvent(new Event("ventaRegistrada"));
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Gestión de Productos", 14, 15);
    
    const tablaData = ventas.map((v, i) => [
      i + 1, 
      v.producto || "Sin nombre", 
      v.venta || "S/ 0.00", 
      v.metodoPago || "Yape",
      v.estado || "VALIDADO",
      v.fecha || ""
    ]);

    autoTable(doc, {
      head: [['#', 'Producto', 'Total', 'Método', 'Estado', 'Fecha']],
      body: tablaData,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [39, 174, 96] }
    });

    doc.save("reporte-productos-dbary.pdf");
  };

  return (
    <div className="admin-producto-page">
      <header className="table-header-container">
        <div className="header-text">
          <h1><FaBoxOpen /> Gestión de Productos</h1>
          <p>Datos sincronizados desde el Carrito (Localhost:3000)</p>
        </div>
        <button className="btn-export-pdf" onClick={exportarPDF}>
          <FaFilePdf /> Exportar PDF
        </button>
      </header>

      <div className="search-section-center">
        <div className="search-bar-modern">
          <FaSearch color="#999" />
          <input 
            type="text" 
            placeholder="Buscar por nombre de producto..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} 
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-data-table">
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
            {ventas.length > 0 ? (
              ventas
                .filter(v => (v.producto || "").toLowerCase().includes(busqueda.toLowerCase()))
                .map((v, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td className="prod-name-bold">{v.producto}</td>
                  <td>
                    <div className="container-img-tabla">
                      <img 
                        src={v.imagen} 
                        alt={v.producto} 
                        className="img-tabla-fixed" 
                        onError={(e) => { 
                          e.target.src = "https://via.placeholder.com/80x60?text=Error+Img"; 
                        }}
                      />
                    </div>
                  </td>
                  <td className="prod-price-green">{v.venta || v.total}</td>
                  <td className="method-text">{v.metodoPago || "Yape"}</td>
                  <td>
                    <span className="badge-status-validated">
                      {v.estado || "VALIDADO"}
                    </span>
                  </td>
                  <td className="date-text">{v.fecha || new Date().toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => eliminarVenta(i)} className="btn-delete-red">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  No hay ventas del carrito. Esperando datos de http://localhost:3000/carrito
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producto;