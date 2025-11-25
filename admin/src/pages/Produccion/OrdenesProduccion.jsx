import React, { useState } from "react";
import "../../styles/pages/Produccion.css";

const estados = ["Creado", "En proceso", "Terminado", "Entregado"];

const OrdenesProduccion = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [formNumero, setFormNumero] = useState("");
  const [formCliente, setFormCliente] = useState("");
  const [formProducto, setFormProducto] = useState("");

  const agregarOrden = () => {
    if (!formNumero || !formCliente || !formProducto) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevaOrden = {
      id: Date.now(),
      numero: formNumero,
      cliente: formCliente,
      producto: formProducto,
      estadoIndex: 0,
    };

    setOrdenes([...ordenes, nuevaOrden]);

    setFormNumero("");
    setFormCliente("");
    setFormProducto("");
  };

  const avanzarEstado = (id) => {
    setOrdenes((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const nextIndex = Math.min(o.estadoIndex + 1, estados.length - 1);

          if (nextIndex === 3) {
            setTimeout(() => {
              alert("🎉 ¡Orden entregada con éxito! 👨‍🍳🚚");
            }, 200);
          }

          return { ...o, estadoIndex: nextIndex };
        }
        return o;
      })
    );
  };

  const eliminarOrden = (id) => {
    if (window.confirm("¿Eliminar orden?")) {
      setOrdenes(ordenes.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Órdenes de Producción</h2>
      <p className="page-description">
        Seguimiento visual del progreso de fabricación y entrega.
      </p>

      <div className="card form-card">
        <h3>Registrar nueva orden</h3>

        <div className="form-row">
          <input
            type="text"
            placeholder="N° Orden"
            value={formNumero}
            onChange={(e) => setFormNumero(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cliente"
            value={formCliente}
            onChange={(e) => setFormCliente(e.target.value)}
          />
          <input
            type="text"
            placeholder="Producto"
            value={formProducto}
            onChange={(e) => setFormProducto(e.target.value)}
          />

          <button className="btn" onClick={agregarOrden}>
            Agregar +
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Línea de tiempo de órdenes</h3>

        {ordenes.length === 0 ? (
          <p className="empty-state">No hay órdenes registradas.</p>
        ) : (
          <div className="timeline-list">
            {ordenes.map((orden) => (
              <div key={orden.id} className="timeline-card">
                <div className="timeline-header">
                  <h4>Orden #{orden.numero}</h4>
                  <button
                    className="btn-delete"
                    onClick={() => eliminarOrden(orden.id)}
                  >
                    ✖
                  </button>
                </div>

                <p><b>Cliente:</b> {orden.cliente}</p>
                <p><b>Producto:</b> {orden.producto}</p>

                <div className="timeline">
                  {estados.map((estado, index) => (
                    <div
                      key={index}
                      className={`timeline-step ${
                        index <= orden.estadoIndex ? "active" : ""
                      }`}
                    >
                      <span className="circle"></span>
                      <p>{estado}</p>
                    </div>
                  ))}
                </div>

                {orden.estadoIndex < estados.length - 1 ? (
                  <button
                    className="btn-next"
                    onClick={() => avanzarEstado(orden.id)}
                  >
                    Avanzar estado →
                  </button>
                ) : (
                  <p className="estado-final">✔ Orden entregada</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdenesProduccion;
