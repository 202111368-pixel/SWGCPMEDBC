import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./MueblesDetalle.css";
import muebles1 from "../img/Muebles/muebles1.jpg";
import muebles1a from "../img/Muebles/muebles1a.jpg";
import muebles2 from "../img/Muebles/muebles2.jpg";
import muebles2b from "../img/Muebles/muebles2b.jpg";
import muebles2a from "../img/Muebles/muebles2a.jpg";

const MueblesDetalle = () => {

  const [img1, setImg1] = useState(muebles1);
  const [img2, setImg2] = useState(muebles1a);
  const [img3, setImg3] = useState(muebles2a);

  const añadirCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    window.dispatchEvent(new Event("carritoActualizado"));
  };

  return (
    <>
      <Navbar />

      <div className="filtros-container">

        <section className="productos-derecha">

          <div className="productos-grid">

            {/* PRODUCTO 1 */}
            <div className="producto-card">
              <img src={img1} alt="Mueble 1" />
              <h4>Mueble Modelo 1</h4>
              <p className="precio">S/ 850.00</p>

              <div className="colores">
                <span
                  className="color-circle"
                  style={{ background: "#c2a47e" }}
                  onClick={() => setImg1(muebles1)}
                ></span>

                <span
                  className="color-circle"
                  style={{ background: "#8d6e63" }}
                  onClick={() => setImg1(muebles2)}
                ></span>
              </div>

              <button
                className="btn-producto"
                onClick={() =>
                  añadirCarrito({
                    nombre: "Mueble Modelo 1",
                    precio: 850,
                    imagen: img1
                  })
                }
              >
                Añadir al carrito
              </button>
            </div>

            {/* PRODUCTO 2 */}
            <div className="producto-card">
              <img src={img2} alt="Mueble 2" />
              <h4>Mueble Modelo 2</h4>
              <p className="precio">S/ 920.00</p>

              <div className="colores">
                <span
                  className="color-circle"
                  style={{ background: "#d7ccc8" }}
                  onClick={() => setImg2(muebles1a)}
                ></span>

                <span
                  className="color-circle"
                  style={{ background: "#5d4037" }}
                  onClick={() => setImg2(muebles2b)}
                ></span>
              </div>

              <button
                className="btn-producto"
                onClick={() =>
                  añadirCarrito({
                    nombre: "Mueble Modelo 2",
                    precio: 920,
                    imagen: img2
                  })
                }
              >
                Añadir al carrito
              </button>
            </div>

            {/* PRODUCTO 3 */}
            <div className="producto-card">
              <img src={img3} alt="Mueble 3" />
              <h4>Mueble Modelo 3</h4>
              <p className="precio">S/ 780.00</p>

              <div className="colores">
                <span
                  className="color-circle"
                  style={{ background: "#bcaaa4" }}
                  onClick={() => setImg3(muebles2a)}
                ></span>

                <span
                  className="color-circle"
                  style={{ background: "#4e342e" }}
                  onClick={() => setImg3(muebles2b)}
                ></span>
              </div>

              <button
                className="btn-producto"
                onClick={() =>
                  añadirCarrito({
                    nombre: "Mueble Modelo 3",
                    precio: 780,
                    imagen: img3
                  })
                }
              >
                Añadir al carrito
              </button>
            </div>

          </div>

        </section>

      </div>
    </>
  );
};

export default MueblesDetalle;