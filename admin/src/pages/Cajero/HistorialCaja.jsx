import React from 'react';
import { FaHistory, FaFilePdf, FaSearch } from "react-icons/fa";
import "../../styles/pages/Cajero/HistorialCaja.css"; 

const HistorialCaja = () => {
  return (
    <div className="historial-caja-container">
      <div className="header-box">
        <h2><FaHistory /> Historial de Movimientos</h2>
        <button className="btn-pdf"><FaFilePdf /> Exportar PDF</button>
      </div>

      <div className="search-section">
        <input type="date" className="input-date" />
        <button className="btn-search"><FaSearch /> Buscar</button>
      </div>

      <table className="tabla-historial">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Monto Apertura</th>
            <th>Monto Cierre</th>
            <th>Cajero</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>13/04/2026</td>
            <td>S/ 500.00</td>
            <td>S/ 1,450.00</td>
            <td>Nicolas Osorio</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistorialCaja;