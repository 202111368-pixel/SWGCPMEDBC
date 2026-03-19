import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaShoppingCart, FaBolt } from "react-icons/fa";
import "./MueblesDetalle.css";
import muebles1 from "../img/Muebles/muebles1.jpg";
import muebles1a from "../img/Muebles/muebles1a.jpg";
import muebles2 from "../img/Muebles/muebles2.jpg";
import muebles2b from "../img/Muebles/muebles2b.jpg";
import muebles2a from "../img/Muebles/muebles2a.jpg";

const CountdownTimer = ({ horasIniciales }) => {
  const [tiempo, setTiempo] = useState(horasIniciales * 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTiempo((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const horas = Math.floor((tiempo % (3600 * 24)) / 3600);
  const minutos = Math.floor((tiempo % 3600) / 60);
  const segundos = tiempo % 60;

  return (
    <div className="ia-timer-display">
      <div className="timer-block"><span>{horas.toString().padStart(2, '0')}</span><small>HRS</small></div>
      <span className="timer-sep">:</span>
      <div className="timer-block"><span>{minutos.toString().padStart(2, '0')}</span><small>MIN</small></div>
      <span className="timer-sep">:</span>
      <div className="timer-block"><span>{segundos.toString().padStart(2, '0')}</span><small>SEG</small></div>
    </div>
  );
};

const MueblesDetalle = () => {
  const navigate = useNavigate();
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
    <div className="muebles-ia-root">
      <Navbar />
      <div className="muebles-container-ia">
        <header className="muebles-ia-header">
          <button className="btn-back-ia" onClick={() => navigate(-1)}>
            <FaArrowLeft /> REGRESAR
          </button>
          <div className="ia-header-text">
            <h1>Muebles de <span>Oficina</span></h1>
            <p>Mobiliario optimizado por algoritmos de diseño ergonómico.</p>
          </div>
        </header>

        <main className="productos-grid-ia">
          {[
            { id: 1, name: "Modelo Alpha", price: 850, old: "1,060", off: "20%", img: img1, set: setImg1, opt1: muebles1, opt2: muebles2, time: 22 },
            { id: 2, name: "Modelo Sigma", price: 920, old: "1,022", off: "10%", img: img2, set: setImg2, opt1: muebles1a, opt2: muebles2b, time: 94 },
            { id: 3, name: "Modelo Delta", price: 780, old: "917", off: "15%", img: img3, set: setImg3, opt1: muebles2a, opt2: muebles2b, time: 46 }
          ].map((prod) => (
            <div className="card-ia-modern" key={prod.id}>
              <div className="ia-badge-off"><FaBolt /> {prod.off} OFF</div>
              <div className="ia-img-wrapper"><img src={prod.img} alt={prod.name} /></div>
              <div className="ia-card-content">
                <h4>{prod.name}</h4>
                <div className="ia-pricing">
                  <span className="old-price">S/ {prod.old}</span>
                  <span className="new-price">S/ {prod.price.toFixed(2)}</span>
                </div>
                <div className="ia-timer-box">
                  <p>OFERTA FLASH ACTIVA</p>
                  <CountdownTimer horasIniciales={prod.time} />
                </div>
                <div className="ia-color-selector">
                  <span className="dot-ia" style={{ background: "#c2a47e" }} onClick={() => prod.set(prod.opt1)}></span>
                  <span className="dot-ia" style={{ background: "#8d6e63" }} onClick={() => prod.set(prod.opt2)}></span>
                </div>
                <button className="btn-ia-action" onClick={() => añadirCarrito({ nombre: prod.name, precio: prod.price, imagen: prod.img })}>
                  <FaShoppingCart /> PROCESAR COMPRA
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default MueblesDetalle;