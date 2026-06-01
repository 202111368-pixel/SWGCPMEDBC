import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Carrito.css";

const Carrito = () => {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setProductosEnCarrito(carritoGuardado);
  }, []);

  const eliminarProducto = (indexAEliminar) => {
    const carritoFiltrado = productosEnCarrito.filter((_, index) => index !== indexAEliminar);
    setProductosEnCarrito(carritoFiltrado);
    localStorage.setItem("carrito", JSON.stringify(carritoFiltrado));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const calcularSubtotal = () => {
    return productosEnCarrito.reduce((acumulador, item) => {
      const cant = item.cantidad || 1;
      return acumulador + (item.precio * cant);
    }, 0);
  };

  const calcularCantidadTotal = () => {
    return productosEnCarrito.reduce((acumulador, item) => acumulador + (item.cantidad || 1), 0);
  };

  const irAPagar = () => {
    if (productosEnCarrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const datosCaja = {
      items: productosEnCarrito,
      subtotal: calcularSubtotal(),
      cantidadTotal: calcularCantidadTotal()
    };

    const dataString = encodeURIComponent(JSON.stringify(datosCaja));
    window.location.href = `http://localhost:3001/admin/caja/administrar?data=${dataString}`;
  };

  return (
    <div className="carrito-page-wrapper">
      <Navbar />
      
      <div className="carrito-container">
        <h1>Tu Carrito ({calcularCantidadTotal()} productos)</h1>

        {productosEnCarrito.length === 0 ? (
          <p className="carrito-vacio">No hay productos en el carrito actualmente.</p>
        ) : (
          <div className="carrito-lista">
            {productosEnCarrito.map((item, index) => {
              const cantidadItem = item.cantidad || 1;
              return (
                <div className="carrito-item" key={index}>
                  <img src={item.imagen} alt={item.nombre} className="img-cart" />
                  
                  <div className="carrito-info">
                    <h4>{item.nombre}</h4>
                    <p className="item-precio">
                      S/ {item.precio.toFixed(2)} <span className="item-multiplicador">x {cantidadItem}</span>
                    </p>
                    <span className="item-subtotal-parcial">
                      Total: S/ {(item.precio * cantidadItem).toFixed(2)}
                    </span>
                  </div>

                  <button className="btn-eliminar" onClick={() => eliminarProducto(index)}>
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="carrito-footer">
          <div className="subtotal-container">
            <span>Subtotal:</span>
            <span>S/. {calcularSubtotal().toFixed(2)}</span>
          </div>

          <div className="acciones-carrito">
            <button className="btn-azul" onClick={irAPagar}>
              Ver Detalle y Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;