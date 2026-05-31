import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaFilePdf, FaBoxOpen, FaTruckLoading } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "../../styles/pages/Producto/Catalogo.css";

const Catalogo = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const ventasLocales = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];
    const params = new URLSearchParams(window.location.search);
    const nuevaCompraData = params.get("data");

    if (nuevaCompraData) {
      try {
        const nuevosItems = JSON.parse(atob(nuevaCompraData));
        const formateados = nuevosItems.map(item => ({
          id: Date.now() + Math.random(),
          producto: item.nombre,
          imagen: item.imagen, 
          venta: `S/ ${item.precio.toLocaleString()}`,
          metodo: "GRATIS"
        }));
        const listaActualizada = [...ventasLocales, ...formateados];
        localStorage.setItem("ventas_admin_3001", JSON.stringify(listaActualizada));
        setVentas(listaActualizada);
        window.history.replaceState({}, document.title, "/admin/producto/catalogo");
      } catch (error) {
        setVentas(ventasLocales);
      }
    } else {
      setVentas(ventasLocales);
    }
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("CATÁLOGO DE PRODUCTOS - D'BARY", 14, 20);
    
    const tableColumn = ["#", "Producto", "Precio", "Envío"];
    const tableRows = ventas.map((v, i) => [i + 1, v.producto, v.venta, v.metodo]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'striped',
      headStyles: { fillStyle: [44, 62, 80] }
    });
    doc.save("Catalogo_Melamina.pdf");
  };

  const eliminarVenta = (id) => {
    if (window.confirm("¿Deseas eliminar este producto del catálogo?")) {
      const nuevaLista = ventas.filter(v => v.id !== id);
      setVentas(nuevaLista);
      localStorage.setItem("ventas_admin_3001", JSON.stringify(nuevaLista));
    }
  };

  return (
    <div className="catalogo-container">
      <header className="catalogo-header">
        <div className="header-info">
          <h1>Catálogo de Ventas</h1>
          <p><FaBoxOpen /> {ventas.length} Productos registrados</p>
        </div>
        <button className="btn-pdf-moderno" onClick={exportarPDF}>
          <FaFilePdf /> Generar Reporte
        </button>
      </header>

      <div className="catalogo-grid">
        {ventas.length > 0 ? (
          ventas.map((v) => (
            <div key={v.id} className="producto-card">
              <div className="card-image">
                <img src={v.imagen} alt={v.producto} crossOrigin="anonymous" />
                <span className="metodo-tag">{v.metodo}</span>
              </div>
              <div className="card-content">
                <h3>{v.producto}</h3>
                <div className="price-tag">{v.venta}</div>
                <div className="card-footer">
                  <div className="envio-info">
                    <FaTruckLoading /> Entrega Inmediata
                  </div>
                  <div className="card-actions">
                    <button className="btn-edit-small"><FaEdit /></button>
                    <button className="btn-delete-small" onClick={() => eliminarVenta(v.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-catalogo">
            <h2>No hay productos en el catálogo</h2>
            <p>Los productos aparecerán aquí una vez finalizada la compra.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogo;