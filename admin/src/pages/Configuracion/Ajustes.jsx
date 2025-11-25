import React, { useState } from "react";
import "../../styles/pages/Configuracion.css";

const Ajustes = () => {
  const categorias = ["Ropa", "Cocina", "Baño", "Melamina", "Otros"];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const [pedido, setPedido] = useState({
    producto: "",
    cantidad: "",
    fecha: "",
    proveedor: "",
    comentario: "",
  });

  const [listaPedidos, setListaPedidos] = useState([]);

  const abrirModal = (cat) => {
    setCategoriaSeleccionada(cat);
  };

  const cerrarModal = () => {
    setCategoriaSeleccionada(null);
    setPedido({
      producto: "",
      cantidad: "",
      fecha: "",
      proveedor: "",
      comentario: "",
    });
  };

  const guardarPedido = () => {
    if (!pedido.producto || !pedido.cantidad || !pedido.fecha) return;

    const nuevo = {
      id: Date.now(),
      categoria: categoriaSeleccionada,
      ...pedido,
    };

    setListaPedidos([...listaPedidos, nuevo]);

    // Simulación de enviar correo
    alert(
      `Pedido registrado y enviado a: toroaldo@empresa.com\n\nCategoría: ${categoriaSeleccionada}\nProducto: ${pedido.producto}`
    );

    cerrarModal();
  };

  const eliminar = (id) => {
    setListaPedidos(listaPedidos.filter((p) => p.id !== id));
  };

  return (
    <div className="page-container ajustes-container">

      <h2 className="page-title">Ajustes del Sistema</h2>
      <p className="page-description">
        Gestión de categorías y registro de llegadas de camión para D’Bary Company.
      </p>

      <div className="categorias-grid">
        {categorias.map((cat) => (
          <div className="categoria-card" key={cat} onClick={() => abrirModal(cat)}>
            {cat}
          </div>
        ))}
      </div>

      <div className="card pedidos-table">
        <h3>Pedidos Registrados</h3>

        {listaPedidos.length === 0 ? (
          <p className="empty-state">Aún no hay pedidos registrados.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaPedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.categoria}</td>
                  <td>{p.producto}</td>
                  <td>{p.cantidad}</td>
                  <td>{p.fecha}</td>
                  <td>{p.proveedor || "—"}</td>
                  <td>
                    <button className="btn-small btn-danger" onClick={() => eliminar(p.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {categoriaSeleccionada && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Registrar llegada — {categoriaSeleccionada}</h3>

            <input
              type="text"
              placeholder="Producto"
              value={pedido.producto}
              onChange={(e) => setPedido({ ...pedido, producto: e.target.value })}
            />

            <input
              type="number"
              placeholder="Cantidad"
              value={pedido.cantidad}
              onChange={(e) => setPedido({ ...pedido, cantidad: e.target.value })}
            />

            <input
              type="date"
              value={pedido.fecha}
              onChange={(e) => setPedido({ ...pedido, fecha: e.target.value })}
            />

            <input
              type="text"
              placeholder="Proveedor (opcional)"
              value={pedido.proveedor}
              onChange={(e) => setPedido({ ...pedido, proveedor: e.target.value })}
            />

            <textarea
              placeholder="Comentario (opcional)"
              value={pedido.comentario}
              onChange={(e) => setPedido({ ...pedido, comentario: e.target.value })}
            />

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={guardarPedido}>
                Guardar
              </button>
              <button className="btn btn-danger" onClick={cerrarModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Ajustes;
