import React, { useState, useEffect } from "react";
import { FaTrash, FaFilePdf, FaSearch, FaBoxOpen } from "react-icons/fa";
import "jspdf-autotable";
import "../../styles/pages/Producto/Producto.css"; 

const Producto = () => {
  const [ventas, setVentas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];
    setVentas(datos); 
  }, []);

  const eliminarVenta = (id) => {
    const nuevaLista = ventas.filter(v => v.id !== id);
    setVentas(nuevaLista);
    localStorage.setItem("ventas_admin_3001", JSON.stringify(nuevaLista));
  };

  return (
    <div className="admin-producto-page">
      <header className="table-header-container">
        <div className="header-text">
          <h1><FaBoxOpen /> Gestión de Productos</h1>
          <p>Listado de compras y estados de pago</p>
        </div>
        <button className="btn-export-pdf"><FaFilePdf /> Exportar PDF</button>
      </header>

      <div className="search-section-center">
        <div className="search-bar-modern">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Buscar producto..." 
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
              <th>PRECIO VENTA</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas
                .filter(v => v.producto.toLowerCase().includes(busqueda.toLowerCase()))
                .map((v, i) => (
                <tr key={v.id || i}>
                  <td>{i + 1}</td>
                  <td className="prod-name">{v.producto}</td>
                  <td>
                    <img src={v.imagen} alt="prod" className="img-tabla" />
                  </td>
                  <td className="prod-price">{v.venta}</td>
                  <td><span className="badge-status">{v.estado}</span></td>
                  <td>
                    <button onClick={() => eliminarVenta(v.id)} className="btn-delete"><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No hay compras para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producto;
//para el pdf npm install jspdf jspdf-autotable