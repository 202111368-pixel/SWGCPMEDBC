import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./MueblesDetalle.css";
import muebles1 from "../img/Muebles/muebles1.jpg";
import muebles1a from "../img/Muebles/muebles1a.jpg";
import muebles2 from "../img/Muebles/muebles2.jpg";
import muebles2b from "../img/Muebles/muebles2b.jpg";
import muebles2a from "../img/Muebles/muebles2a.jpg";

// Componente para el cronómetro individual
const CountdownTimer = ({ horasIniciales }) => {
  const [tiempo, setTiempo] = useState(horasIniciales * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempo((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dias = Math.floor(tiempo / (3600 * 24));
  const horas = Math.floor((tiempo % (3600 * 24)) / 3600);
  const minutos = Math.floor((tiempo % 3600) / 60);
  const segundos = tiempo % 60;

  return (
    <div className="timer-grid">
      <div className="timer-item"><span>{dias.toString().padStart(2, '0')}</span><small>días</small></div>
      <div className="timer-item"><span>{horas.toString().padStart(2, '0')}</span><small>horas</small></div>
      <div className="timer-item"><span>{minutos.toString().padStart(2, '0')}</span><small>min</small></div>
      <div className="timer-item"><span>{segundos.toString().padStart(2, '0')}</span><small>seg</small></div>
    </div>
  );
};

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
              <div className="badge-oferta">20% OFF</div>
              <img src={img1} alt="Mueble 1" />
              <h4>Mueble Modelo 1</h4>
              <p className="precio-antes">S/ 1,060.00</p>
              <p className="precio">S/ 850.00</p>
              
              <div className="oferta-info">
                <p>La oferta termina en:</p>
                <CountdownTimer horasIniciales={22} />
              </div>

              <div className="colores">
                <span className="color-circle" style={{ background: "#c2a47e" }} onClick={() => setImg1(muebles1)}></span>
                <span className="color-circle" style={{ background: "#8d6e63" }} onClick={() => setImg1(muebles2)}></span>
              </div>
              <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Mueble Modelo 1", precio: 850, imagen: img1 })}>
                Añadir al carrito
              </button>
            </div>

            {/* PRODUCTO 2 */}
            <div className="producto-card">
              <div className="badge-oferta">10% OFF</div>
              <img src={img2} alt="Mueble 2" />
              <h4>Mueble Modelo 2</h4>
              <p className="precio-antes">S/ 1,022.00</p>
              <p className="precio">S/ 920.00</p>

              <div className="oferta-info">
                <p>La oferta termina en:</p>
                <CountdownTimer horasIniciales={94} /> 
              </div>

              <div className="colores">
                <span className="color-circle" style={{ background: "#d7ccc8" }} onClick={() => setImg2(muebles1a)}></span>
                <span className="color-circle" style={{ background: "#5d4037" }} onClick={() => setImg2(muebles2b)}></span>
              </div>
              <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Mueble Modelo 2", precio: 920, imagen: img2 })}>
                Añadir al carrito
              </button>
            </div>

            {/* PRODUCTO 3 */}
            <div className="producto-card">
              <div className="badge-oferta">15% OFF</div>
              <img src={img3} alt="Mueble 3" />
              <h4>Mueble Modelo 3</h4>
              <p className="precio-antes">S/ 917.00</p>
              <p className="precio">S/ 780.00</p>

              <div className="oferta-info">
                <p>La oferta termina en:</p>
                <CountdownTimer horasIniciales={46} />
              </div>

              <div className="colores">
                <span className="color-circle" style={{ background: "#bcaaa4" }} onClick={() => setImg3(muebles2a)}></span>
                <span className="color-circle" style={{ background: "#4e342e" }} onClick={() => setImg3(muebles2b)}></span>
              </div>
              <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Mueble Modelo 3", precio: 780, imagen: img3 })}>
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