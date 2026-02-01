import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Detalles.css";

import cocina1a from "../img/cocina1a.jpg";
import cocina1b from "../img/cocina1b.jpg";
import cocina2a from "../img/cocina2a.jpg";
import cocina2b from "../img/cocina2b.jpg";
import cocina3a from "../img/cocina3a.jpg";
import cocina3b from "../img/cocina3b.jpg";
import cocina4a from "../img/cocina4a.jpg";
import cocina4b from "../img/cocina4b.jpg";

const CocinaDetalle = () => {
  const [img1, setImg1] = useState(cocina1a);
  const [img2, setImg2] = useState(cocina2a);
  const [img3, setImg3] = useState(cocina3a);
  const [img4, setImg4] = useState(cocina4a);

  const añadirCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    window.dispatchEvent(new Event("carritoActualizado"));
  };
  const agregarAlCarrito = (nombre, precio, imagen) => {
  const producto = {
    nombre,
    precio,
    imagen,
  };

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  window.dispatchEvent(new Event("carritoActualizado"));
};

  return (
    <>
      <Navbar />

      <div className="catalogo-container">
        <div className="productos-grid">

          {/* PRODUCTO 1 */}
          <div className="producto-card">
            <img src={img1} className="img-principal" alt="Cocina 1" />
            <h4>Mueble de cocina UrbanBrew</h4>
            <p className="precio">S/ 1,500.00</p>

            <div className="colores">
              <span className="color-circle" style={{ background: "#9db8a0" }} onClick={() => setImg1(cocina1a)} />
              <span className="color-circle" style={{ background: "#c8c2b8" }} onClick={() => setImg1(cocina1b)} />
            </div>

            <button
              className="btn-producto"
              onClick={() =>
                añadirCarrito({
                  nombre: "Mueble de cocina UrbanBrew",
                  precio: 1500,
                  imagen: img1
                })
              }
            >
              Añadir al carrito
            </button>
          </div>

          {/* PRODUCTO 2 */}
          <div className="producto-card">
            <img src={img2} className="img-principal" alt="Cocina 2" />
            <h4>Cocina Moderna</h4>
            <p className="precio">S/ 1,450.00</p>

            <div className="colores">
              <span className="color-circle" style={{ background: "#d9c9b2" }} onClick={() => setImg2(cocina2a)} />
              <span className="color-circle" style={{ background: "#9fa1a3" }} onClick={() => setImg2(cocina2b)} />
            </div>

            <button
              className="btn-producto"
              onClick={() =>
                añadirCarrito({
                  nombre: "Cocina Moderna",
                  precio: 1450,
                  imagen: img2
                })
              }
            >
              Añadir al carrito
            </button>
          </div>

          {/* PRODUCTO 3 */}
          <div className="producto-card">
            <img src={img3} className="img-principal" alt="Cocina 3" />
            <h4>Cocina Empotrada</h4>
            <p className="precio">S/ 1,700.00</p>

            <div className="colores">
              <span className="color-circle" style={{ background: "#caa574" }} onClick={() => setImg3(cocina3a)} />
              <span className="color-circle" style={{ background: "#e0c39a" }} onClick={() => setImg3(cocina3b)} />
            </div>

            <button
              className="btn-producto"
              onClick={() =>
                añadirCarrito({
                  nombre: "Cocina Empotrada",
                  precio: 1700,
                  imagen: img3
                })
              }
            >
              Añadir al carrito
            </button>
          </div>

          {/* PRODUCTO 4 */}
          <div className="producto-card">
            <img src={img4} className="img-principal" alt="Cocina 4" />
            <h4>Cocina en U</h4>
            <p className="precio">S/ 2,000.00</p>

            <div className="colores">
              <span className="color-circle" style={{ background: "#e6e6e6" }} onClick={() => setImg4(cocina4a)} />
              <span className="color-circle" style={{ background: "#b5b5b5" }} onClick={() => setImg4(cocina4b)} />
            </div>

            <button
              className="btn-producto"
              onClick={() =>
                añadirCarrito({
                  nombre: "Cocina en U",
                  precio: 2000,
                  imagen: img4
                })
              }
            >
              Añadir al carrito
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default CocinaDetalle;
