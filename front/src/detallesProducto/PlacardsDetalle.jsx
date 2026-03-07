import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./PlacardsDetalle.css";
import Vestidores1 from "../img/Vestidores/Vestidores1.jpg";
import Vestidores2 from "../img/Vestidores/Vestidores2.jpg";
import Vestidores1a from "../img/Vestidores/Vestidores1a.jpg";
import Vestidores1b from "../img/Vestidores/Vestidores1b.jpg";
import Vestidores2a from "../img/Vestidores/Vestidores2a.jpg";
import Vestidores2b from "../img/Vestidores/Vestidores2b.jpg";
import Vestidores3a from "../img/Vestidores/Vestidores3a.jpg";
import Vestidores3b from "../img/Vestidores/Vestidores3b.jpg";

const RelojOferta = ({ segundosTotales }) => {
  const [tiempo, setTiempo] = useState(segundosTotales);

  useEffect(() => {
    const cuenta = setInterval(() => {
      setTiempo((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(cuenta);
  }, []);

  const d = Math.floor(tiempo / (3600 * 24));
  const h = Math.floor((tiempo % (3600 * 24)) / 3600);
  const m = Math.floor((tiempo % 3600) / 60);
  const s = tiempo % 60;

  return (
    <div className="cronometro-contenedor">
      <div className="tiempo-bloque"><span>{d}</span><small>Días</small></div>
      <div className="tiempo-bloque"><span>{h}</span><small>Hrs</small></div>
      <div className="tiempo-bloque"><span>{m}</span><small>Min</small></div>
      <div className="tiempo-bloque"><span>{s}</span><small>Seg</small></div>
    </div>
  );
};

const VestidoresDetalle = () => {
  const [img1, setImg1] = useState(Vestidores1);
  const [img2, setImg2] = useState(Vestidores1a);
  const [img3, setImg3] = useState(Vestidores2a);
  const [img4, setImg4] = useState(Vestidores3a);

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
        <div className="productos-grid">

          <div className="producto-card">
            <div className="etiqueta-descuento">15% OFF</div>
            <img src={img1} alt="Vestidor 1" />
            <h4>Vestidor Modelo 1</h4>
            <p className="precio-tachado">S/ 1765</p>
            <p className="precio">S/ 1500</p>
            
            <div className="seccion-reloj">
              <p className="oferta-titulo">La oferta termina en:</p>
              <RelojOferta segundosTotales={172800} />
            </div>

            <div className="colores">
              <span className="color-circle" style={{ background: "#d7ccc8" }} onClick={() => setImg1(Vestidores1)}></span>
              <span className="color-circle" style={{ background: "#5d4037" }} onClick={() => setImg1(Vestidores2)}></span>
            </div>

            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Vestidor Modelo 1", precio: 1500, imagen: img1 })}>
              Añadir al carrito
            </button>
          </div>

          <div className="producto-card">
            <div className="etiqueta-descuento">20% OFF</div>
            <img src={img2} alt="Vestidor 2" />
            <h4>Vestidor Modelo 2</h4>
            <p className="precio-tachado">S/ 2060</p>
            <p className="precio">S/ 1650</p>

            <div className="seccion-reloj">
              <p className="oferta-titulo">La oferta termina en:</p>
              <RelojOferta segundosTotales={86400} />
            </div>

            <div className="colores">
              <span className="color-circle" style={{ background: "#bcaaa4" }} onClick={() => setImg2(Vestidores1a)}></span>
              <span className="color-circle" style={{ background: "#4e342e" }} onClick={() => setImg2(Vestidores1b)}></span>
            </div>

            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Vestidor Modelo 2", precio: 1650, imagen: img2 })}>
              Añadir al carrito
            </button>
          </div>

          <div className="producto-card">
            <div className="etiqueta-descuento">10% OFF</div>
            <img src={img3} alt="Vestidor 3" />
            <h4>Vestidor Modelo 3</h4>
            <p className="precio-tachado">S/ 1978</p>
            <p className="precio">S/ 1780</p>

            <div className="seccion-reloj">
              <p className="oferta-titulo">La oferta termina en:</p>
              <RelojOferta segundosTotales={259200} />
            </div>

            <div className="colores">
              <span className="color-circle" style={{ background: "#eeeeee" }} onClick={() => setImg3(Vestidores2a)}></span>
              <span className="color-circle" style={{ background: "#3e2723" }} onClick={() => setImg3(Vestidores2b)}></span>
            </div>

            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Vestidor Modelo 3", precio: 1780, imagen: img3 })}>
              Añadir al carrito
            </button>
          </div>

          <div className="producto-card">
            <div className="etiqueta-descuento">25% OFF</div>
            <img src={img4} alt="Vestidor 4" />
            <h4>Vestidor Modelo 4</h4>
            <p className="precio-tachado">S/ 2533</p>
            <p className="precio">S/ 1900</p>

            <div className="seccion-reloj">
              <p className="oferta-titulo">La oferta termina en:</p>
              <RelojOferta segundosTotales={43200} />
            </div>

            <div className="colores">
              <span className="color-circle" style={{ background: "#f5f5f5" }} onClick={() => setImg4(Vestidores3a)}></span>
              <span className="color-circle" style={{ background: "#6d4c41" }} onClick={() => setImg4(Vestidores3b)}></span>
            </div>

            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Vestidor Modelo 4", precio: 1900, imagen: img4 })}>
              Añadir al carrito
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default VestidoresDetalle;