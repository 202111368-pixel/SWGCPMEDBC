import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../../styles/Cotizacion.css";

const VerCotizacion = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const guardado = localStorage.getItem("cotizacion");
    if (guardado) setItems(JSON.parse(guardado));
  }, []);

  const total = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  const exportarExcel = () => {
    const hoja = XLSX.utils.json_to_sheet(
      items.map((item) => ({
        Descripción: item.descripcion,
        Cantidad: item.cantidad,
        Precio: item.precio,
        Total: item.cantidad * item.precio,
      }))
    );

    // Agregar total al final
    XLSX.utils.sheet_add_aoa(hoja, [["", "", "TOTAL GENERAL", total]], { origin: -1 });

    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Cotización");
    XLSX.writeFile(libro, "Cotizacion.xlsx");
  };

  return (
    <div className="cotizacion-container">
      <div className="cotizacion-header">
        <h2>Ver Cotización Guardada</h2>
        <button className="btn-excel" onClick={exportarExcel}>
          📊 Exportar a Excel
        </button>
      </div>

      <table className="cotizacion-tabla">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio (S/)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No hay cotizaciones guardadas.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index}>
                <td>{item.descripcion}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio}</td>
                <td>S/ {item.cantidad * item.precio}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="cotizacion-total">
        <strong>Total General: S/ {total}</strong>
      </div>
    </div>
  );
};

export default VerCotizacion;
