import React, { useState } from 'react';
import { FaBell, FaTruck, FaShoppingCart, FaSave, FaTrash, FaPlus, FaFileInvoice } from "react-icons/fa";
import "../../styles/pages/Configuración/Configuración.css"; 

const Configuración = () => {
  const [umbrales] = useState([
    { id: 1, material: "Blanco Humo", minimo: 5 },
    { id: 2, material: "Roble Canteado", minimo: 3 },
    { id: 3, material: "Tapacanto Delgado", minimo: 10 }
  ]);

  const [proveedores] = useState([
    { id: 1, nombre: "Pelikano", ruc: "20123456789", contacto: "987654321" },
    { id: 2, nombre: "Novopan", ruc: "20987654321", contacto: "912345678" },
    { id: 3, nombre: "Vesto", ruc: "20556677889", contacto: "955443322" }
  ]);

  const generarRequerimiento = () => {
    alert("Generando requerimiento formal de compra basado en stock faltante...");
  };

  return (
    <div className="config-container">
      <div className="config-header">
        <h1>Configuración General</h1>
        <p>Ajustes de almacén y gestión de compras</p>
      </div>

      <div className="config-grid">
        <section className="config-section">
          <div className="section-title">
            <FaBell /> <h3>Alertas de Stock Mínimo</h3>
          </div>
          <div className="config-card">
            {umbrales.map(u => (
              <div key={u.id} className="config-item">
                <span className="item-name">{u.material}</span>
                <div className="item-input">
                  <input type="number" defaultValue={u.minimo} />
                  <small>unid.</small>
                </div>
              </div>
            ))}
            <button className="btn-primary"><FaSave /> Guardar Cambios</button>
          </div>
        </section>

        <section className="config-section">
          <div className="section-title">
            <FaTruck /> <h3>Proveedores de Melamina</h3>
          </div>
          <div className="config-card">
            <div className="table-responsive">
              <table className="config-table">
                <thead>
                  <tr>
                    <th>Empresa</th>
                    <th>Contacto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedores.map(p => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{p.contacto}</td>
                      <td>
                        <button className="btn-delete"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn-secondary"><FaPlus /> Nuevo Proveedor</button>
          </div>
        </section>

        <section className="config-section full-width">
          <div className="section-title">
            <FaShoppingCart /> <h3>Solicitudes de Compra</h3>
          </div>
          <div className="config-card requisition-card">
            <div className="requisition-content">
              <FaFileInvoice className="req-icon" />
              <div>
                <h4>Requerimiento Automático</h4>
                <p>El sistema detectó <strong>2 materiales</strong> por debajo del stock mínimo.</p>
              </div>
            </div>
            <button className="btn-order" onClick={generarRequerimiento}>
              Generar Orden de Compra
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Configuración;