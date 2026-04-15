import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  const finalizarCompra = () => {
    if (carrito.length === 0) return;

    const nuevasVentas = carrito.map(item => ({
      id: Date.now() + Math.random(), 
      producto: item.nombre,
      imagen: item.imagen,
      venta: `S/ ${item.precio.toFixed(2)}`,
      estado: "PENDIENTE"
    }));

    const historial = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];
    localStorage.setItem("ventas_admin_3001", JSON.stringify([...historial, ...nuevasVentas]));

    localStorage.removeItem("carrito");
    
    window.location.href = "http://localhost:3000/admin/producto/gestionar";
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
          <button className="btn-finalizar" onClick={finalizarCompra}>Finalizar Compra</button>
        </div>
      </div>
    </>
  );
};

export default Carrito;