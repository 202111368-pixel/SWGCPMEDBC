import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Carrito.css";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const finalizarCompra = () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  const datosCodificados = btoa(JSON.stringify(carrito));

  localStorage.removeItem("carrito");
  window.dispatchEvent(new Event("carritoActualizado"));

  window.location.href = `http://localhost:3001/admin/producto?data=${datosCodificados}`;
};

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <>
      <Navbar />
      <div className="carrito-container">
        <h1>🛒 Carrito de Compras</h1>
        {carrito.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="carrito-lista">
              {carrito.map((item, index) => (
                <div className="carrito-item" key={index}>
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="carrito-info">
                    <h4>{item.nombre}</h4>
                    <p>S/ {item.precio.toFixed(2)}</p>
                  </div>
                  <button className="btn-eliminar" onClick={() => eliminarProducto(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <div className="carrito-total">
              <h3>Total: S/ {total.toFixed(2)}</h3>
              <button className="btn-comprar" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Carrito;