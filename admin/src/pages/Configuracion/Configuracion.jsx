import React, { useState, useEffect } from "react";
import "../../styles/Configuracion.css";

const Configuracion = () => {
  const [clientesGuardados, setClientesGuardados] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("clientesConfiguracion");
    if (data) {
      try {
        setClientesGuardados(JSON.parse(data));
      } catch (e) {
        console.error("Error parseando clientesConfiguracion", e);
      }
    }
  }, []);

  return (
    <div className="configuracion-page">

      <div className="config-tabla-container">
        <h2>Configuracion Registrados</h2>
        <table className="config-tabla-clientes">
          <thead>
            <tr>
              <th>Nombre / Empresa</th>
              <th>DNI</th>
              <th>RUC</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Giro</th>
              <th>Límite Crediticio (S/)</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clientesGuardados.length === 0 ? (
              <tr>
                <td colSpan="8" className="config-sin-clientes">
                  No hay clientes guardados todavía.
                </td>
              </tr>
            ) : (
              clientesGuardados.map((c) => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.dni}</td>
                  <td>{c.ruc}</td>
                  <td>{c.telefono}</td>
                  <td>{c.email}</td>
                  <td>{c.giro}</td>
                  <td>{c.limite.toFixed(2)}</td>
                  <td>{c.direccion}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Configuracion;
