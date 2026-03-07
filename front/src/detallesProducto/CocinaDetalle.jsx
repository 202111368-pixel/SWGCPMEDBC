import React, { useState, useEffect } from "react";
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
  const [modalImg, setModalImg] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ horas: 22, minutos: 32, segundos: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { horas, minutos, segundos } = prev;
        if (segundos > 0) segundos--;
        else {
          segundos = 59;
          if (minutos > 0) minutos--;
          else {
            minutos = 59;
            if (horas > 0) horas--;
          }
        }
        return { horas, minutos, segundos };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const añadirCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoActual.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const abrirImagen = (img) => setModalImg(img);
  const cerrarImagen = () => setModalImg(null);

  return (
    <>
      <Navbar />

      <div className="catalogo-container">
        <div className="productos-grid">

          <div className="producto-card">
            <div className="oferta-header-black">¡OFERTA ESPECIAL EN MUEBLE MODELO!</div>
            <div className="contenedor-img-oferta">
                <img src={img1} className="img-principal" alt="Cocina 1" onClick={() => abrirImagen(img1)} />
                <div className="overlay-off">%20 OFF</div>
            </div>
            
            <div className="timer-section">
                <p>La oferta termina hoy</p>
                <div className="timer-grid">
                    <div><span>00</span><small>días</small></div>
                    <div><span>{String(timeLeft.horas).padStart(2, '0')}</span><small>horas</small></div>
                    <div><span>{String(timeLeft.minutos).padStart(2, '0')}</span><small>minutos</small></div>
                    <div><span>{String(timeLeft.segundos).padStart(2, '0')}</span><small>segundos</small></div>
                </div>
            </div>

            <h4>Mueble UrbanBrew</h4>
            <div className="colores">
              <span className="color-circle" style={{ background: "#9db8a0" }} onClick={() => setImg1(cocina1a)} />
              <span className="color-circle" style={{ background: "#c8c2b8" }} onClick={() => setImg1(cocina1b)} />
            </div>
            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "UrbanBrew", precio: 1500, imagen: img1 })}>
              Añadir al carrito
            </button>
          </div>

          <div className="producto-card">
            <div className="oferta-header-black">¡OFERTA ESPECIAL EN MUEBLE MODELO!</div>
            <div className="contenedor-img-oferta">
                <img src={img2} className="img-principal" alt="Cocina 2" onClick={() => abrirImagen(img2)} />
                <div className="overlay-off">%10 OFF</div>
            </div>
            <div className="timer-section">
                <p>La oferta termina hoy</p>
                <div className="timer-grid">
                    <div><span>00</span><small>días</small></div>
                    <div><span>{String(timeLeft.horas).padStart(2, '0')}</span><small>horas</small></div>
                    <div><span>{String(timeLeft.minutos).padStart(2, '0')}</span><small>minutos</small></div>
                    <div><span>{String(timeLeft.segundos).padStart(2, '0')}</span><small>segundos</small></div>
                </div>
            </div>
            <h4>Cocina Moderna</h4>
            <div className="colores">
              <span className="color-circle" style={{ background: "#d9c9b2" }} onClick={() => setImg2(cocina2a)} />
              <span className="color-circle" style={{ background: "#9fa1a3" }} onClick={() => setImg2(cocina2b)} />
            </div>
            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Moderna", precio: 1450, imagen: img2 })}>
              Añadir al carrito
            </button>
          </div>

          <div className="producto-card">
            <div className="oferta-header-black">¡OFERTA ESPECIAL EN MUEBLE MODELO!</div>
            <div className="contenedor-img-oferta">
                <img src={img3} className="img-principal" alt="Cocina 3" onClick={() => abrirImagen(img3)} />
                <div className="overlay-off">%10 OFF</div>
            </div>
            <div className="timer-section">
                <p>La oferta termina hoy</p>
                <div className="timer-grid">
                    <div><span>00</span><small>días</small></div>
                    <div><span>{String(timeLeft.horas).padStart(2, '0')}</span><small>horas</small></div>
                    <div><span>{String(timeLeft.minutos).padStart(2, '0')}</span><small>minutos</small></div>
                    <div><span>{String(timeLeft.segundos).padStart(2, '0')}</span><small>segundos</small></div>
                </div>
            </div>
            <h4>Cocina Empotrada</h4>
            <div className="colores">
              <span className="color-circle" style={{ background: "#caa574" }} onClick={() => setImg3(cocina3a)} />
              <span className="color-circle" style={{ background: "#e0c39a" }} onClick={() => setImg3(cocina3b)} />
            </div>
            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Empotrada", precio: 1700, imagen: img3 })}>
              Añadir al carrito
            </button>
          </div>

          <div className="producto-card">
            <div className="oferta-header-black">¡OFERTA ESPECIAL EN MUEBLE MODELO!</div>
            <div className="contenedor-img-oferta">
                <img src={img4} className="img-principal" alt="Cocina 4" onClick={() => abrirImagen(img4)} />
                <div className="overlay-off">%20 OFF</div>
            </div>
            <div className="timer-section">
                <p>La oferta termina hoy</p>
                <div className="timer-grid">
                    <div><span>00</span><small>días</small></div>
                    <div><span>{String(timeLeft.horas).padStart(2, '0')}</span><small>horas</small></div>
                    <div><span>{String(timeLeft.minutos).padStart(2, '0')}</span><small>minutos</small></div>
                    <div><span>{String(timeLeft.segundos).padStart(2, '0')}</span><small>segundos</small></div>
                </div>
            </div>
            <h4>Cocina en U</h4>
            <div className="colores">
              <span className="color-circle" style={{ background: "#e6e6e6" }} onClick={() => setImg4(cocina4a)} />
              <span className="color-circle" style={{ background: "#b5b5b5" }} onClick={() => setImg4(cocina4b)} />
            </div>
            <button className="btn-producto" onClick={() => añadirCarrito({ nombre: "Cocina U", precio: 2000, imagen: img4 })}>
              Añadir al carrito
            </button>
          </div>

        </div>
      </div>

      {modalImg && (
        <div className="modal-overlay" onClick={cerrarImagen}>
          <div className="modal-content">
            <img src={modalImg} alt="Vista ampliada" />
            <button className="modal-close">×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CocinaDetalle;