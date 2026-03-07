import React, { useState, useEffect } from "react";
import "../../styles/pages/Producto/Producto.css";

const Producto = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // 1. Obtener ventas que ya existían en este puerto
    const ventasLocales = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];

    // 2. Revisar si vienen datos nuevos por la URL (desde el puerto 3000)
    const params = new URLSearchParams(window.location.search);
    const nuevaCompraData = params.get("data");

    if (nuevaCompraData) {
      try {
        // Decodificamos los datos recibidos
        const nuevosItems = JSON.parse(atob(nuevaCompraData));
        
        // Formateamos para la tabla
        const formateados = nuevosItems.map(item => ({
          id: Date.now() + Math.random(),
          producto: item.nombre,
          imagen: item.imagen,
          venta: `S/ ${item.precio.toLocaleString()}`,
          metodo: "GRATIS"
        }));

        const listaActualizada = [...ventasLocales, ...formateados];
        
        // Guardamos en el localStorage propio del puerto 3001
        localStorage.setItem("ventas_admin_3001", JSON.stringify(listaActualizada));
        setVentas(listaActualizada);

        // Limpiamos la URL para que no se dupliquen al recargar
        window.history.replaceState({}, document.title, "/admin/producto");
      } catch (error) {
        setVentas(ventasLocales);
      }
    } else {
      setVentas(ventasLocales);
    }
  }, []);

  return (
    <div className="admin-producto-page">
      <div className="table-header">
        <h2>Listado de Compras Finalizadas</h2>
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
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas.map((v, i) => (
                <tr key={v.id || i}>
                  <td>{i + 1}</td>
                  <td className="text-blue">{v.producto}</td>
                  <td>
                    <img src={v.imagen} alt="prod" className="img-table-comprado" />
                  </td>
                  <td className="text-bold">{v.venta}</td>
                  <td><span className="badge-metodo">{v.metodo}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No hay registros de compras.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producto;