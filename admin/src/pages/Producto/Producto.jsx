import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "../../styles/pages/Producto/Producto.css";

const Producto = () => {
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
        window.history.replaceState({}, document.title, "/admin/producto");
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
    doc.text("LISTADO DE COMPRAS FINALIZADAS", 14, 20);
    
    const tableColumn = ["#", "Producto", "Imagen", "Precio", "Envío"];
    const tableRows = ventas.map((v, i) => [i + 1, v.producto, "", v.venta, v.metodo]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { 
        minCellHeight: 25, 
        verticalAlign: 'middle', 
        halign: 'center',
        fontSize: 10 
      },
      headStyles: { fillStyle: [44, 62, 80], textColor: [255, 255, 255] },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 2) {
          const v = ventas[data.row.index];
          if (v.imagen) {
            try {
              doc.addImage(v.imagen, 'JPEG', data.cell.x + 2, data.cell.y + 2, 21, 21);
            } catch (e) {
              console.error("No se pudo renderizar la imagen en el PDF", e);
            }
          }
        }
      },
    });

    doc.save("Reporte_Ventas_DaryCompany.pdf");
  };

  const eliminarVenta = (id) => {
    if (window.confirm("¿Deseas eliminar este registro?")) {
      const nuevaLista = ventas.filter(v => v.id !== id);
      setVentas(nuevaLista);
      localStorage.setItem("ventas_admin_3001", JSON.stringify(nuevaLista));
    }
  };

  return (
    <div className="admin-producto-page">
      <div className="table-header-container">
        <div className="header-text">
          <h1>Gestión de Productos</h1>
          <p>Listado de Compras Finalizadas</p>
        </div>
        <button className="btn-export-pdf" onClick={exportarPDF}>
          <FaFilePdf style={{ marginRight: "8px" }} /> Exportar PDF
        </button>
      </div>

      <div className="table-wrapper">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Imagen Producto</th>
              <th>Precio de Venta</th>
              <th>Método de Envío</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((v, i) => (
                <tr key={v.id}>
                  <td>{i + 1}</td>
                  <td className="text-blue">{v.producto}</td>
                  <td>
                    <img 
                      src={v.imagen} 
                      alt="prod" 
                      className="img-table-comprado" 
                      crossOrigin="anonymous"
                    />
                  </td>
                  <td className="text-bold">{v.venta}</td>
                  <td><span className="badge-metodo">{v.metodo}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-action edit"><FaEdit /></button>
                      <button onClick={() => eliminarVenta(v.id)} className="btn-action delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="no-data">No hay registros.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producto;

//para el pdf npm install jspdf jspdf-autotable