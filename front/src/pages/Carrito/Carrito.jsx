import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Obtenemos el carrito actual de este puerto
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  const finalizarCompra = () => {
    if (carrito.length === 0) return;

    const datosVenta = carrito.map(item => ({
      id: Date.now() + Math.random(), // ID único para cada venta
      producto: item.nombre,
      imagen: item.imagen, 
      venta: `S/ ${item.precio.toFixed(2)}`,
      estado: "PENDIENTE"
    }));

    const datosVentaString = encodeURIComponent(JSON.stringify(datosVenta));

    const urlDestino = `http://localhost:3000/admin/producto/gestionar?data=${datosVentaString}`;

    localStorage.removeItem("carrito");

    window.location.href = urlDestino;
  };

  const eliminarProducto = (index) => {
    const nuevo = carrito.filter((_, i) => i !== index);
    setCarrito(nuevo);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <h1>Carrito de Compras</h1>
        <div className="carrito-lista">
          {carrito.map((item, index) => (
            <div className="carrito-item" key={index}>
              {/* Mostramos la imagen en el carrito */}
              <img src={item.imagen} alt={item.nombre} className="img-cart" />
              <div className="carrito-info">
                <h4>{item.nombre}</h4>
                <p>S/ {item.precio.toFixed(2)}</p>
              </div>
              <button className="btn-eliminar" onClick={() => eliminarProducto(index)}>Eliminar</button>
            </div>
          ))}
        </div>
        <div className="carrito-resumen">
          <h3>Total: S/ {total.toFixed(2)}</h3>
          {/* Botón que activa la función finalizarCompra */}
          <button className="btn-finalizar" onClick={finalizarCompra}>Finalizar Compra</button>
        </div>
      </div>
    </>
  );
};

export default Carrito;