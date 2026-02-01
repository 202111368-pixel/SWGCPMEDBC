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

  // convertir productos del carrito en items de orden
  const itemsOrden = carrito.map((item) => ({
    cantidad: 1,
    itemProveedor: "-",
    descripcion: item.nombre,
    costoUnitario: item.precio,
    importe: item.precio,
    imagen: item.imagen,
    notas: "Desde carrito de compras"
  }));

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // nueva orden de compra
  const nuevaOrden = {
    id: Date.now(),
    numeroOrden: `OC-${Date.now()}`,
    proveedor: "Cliente Web",
    fecha: new Date().toISOString().split("T")[0],
    estado: "Recibida",
    tipoCompra: "Venta",
    montoEstimado: total,
    items: itemsOrden,
    creadoEn: new Date().toISOString()
  };

  // guardar en ordenesCompra
  const ordenesGuardadas =
    JSON.parse(localStorage.getItem("ordenesCompra")) || [];

  ordenesGuardadas.push(nuevaOrden);
  localStorage.setItem("ordenesCompra", JSON.stringify(ordenesGuardadas));

  // limpiar carrito
  localStorage.removeItem("carrito");
  window.dispatchEvent(new Event("carritoActualizado"));

  // redirigir al sistema admin
  window.location.href = "http://localhost:3000/admin/compras/ordenes";
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

                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarProducto(index)}
                  >
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
