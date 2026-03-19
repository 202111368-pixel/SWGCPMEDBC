import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaShoppingCart, FaBolt, FaHistory } from "react-icons/fa";
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
    <div className="ia-cronometro">
      <div className="ia-tiempo-item"><span>{d}</span><small>DÍAS</small></div>
      <div className="ia-tiempo-item"><span>{h.toString().padStart(2, '0')}</span><small>HRS</small></div>
      <div className="ia-tiempo-item"><span>{m.toString().padStart(2, '0')}</span><small>MIN</small></div>
      <div className="ia-tiempo-item"><span>{s.toString().padStart(2, '0')}</span><small>SEG</small></div>
    </div>
  );
};

const VestidoresDetalle = () => {
  const navigate = useNavigate();
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
    <div className="placards-ia-page">
      <Navbar />
      <div className="placards-wrapper">
        <header className="placards-header">
          <button className="btn-back-nav" onClick={() => navigate(-1)}>
            <FaArrowLeft /> REGRESAR
          </button>
          <div className="placards-title-box">
            <h1>Placards y <span>Vestidores</span></h1>
            <p>Diseño de interiores optimizado con IA.</p>
          </div>
        </header>

        <div className="placards-grid-modern">
          {[
            { id: 1, name: "Vestidor Alpha", price: 1500, old: 1765, img: img1, set: setImg1, v1: Vestidores1, v2: Vestidores2, time: 172800 },
            { id: 2, name: "Vestidor Sigma", price: 1650, old: 2060, img: img2, set: setImg2, v1: Vestidores1a, v2: Vestidores1b, time: 86400 },
            { id: 3, name: "Vestidor Delta", price: 1780, old: 1978, img: img3, set: setImg3, v1: Vestidores2a, v2: Vestidores2b, time: 259200 },
            { id: 4, name: "Vestidor Omega", price: 1900, old: 2533, img: img4, set: setImg4, v1: Vestidores3a, v2: Vestidores3b, time: 43200 }
          ].map(p => (
            <div className="placard-card-ia" key={p.id}>
              <div className="badge-promo"><FaBolt /> OFERTA</div>
              <div className="placard-img-container"><img src={p.img} alt={p.name} /></div>
              <div className="placard-info-ia">
                <h4>{p.name}</h4>
                <div className="placard-pricing">
                  <span className="old">S/ {p.old}</span>
                  <span className="current">S/ {p.price}</span>
                </div>
                <div className="ia-countdown-container">
                  <p><FaHistory /> FINALIZA EN:</p>
                  <RelojOferta segundosTotales={p.time} />
                </div>
                <div className="placard-colors">
                  <span className="dot" style={{ background: "#d7ccc8" }} onClick={() => p.set(p.v1)}></span>
                  <span className="dot" style={{ background: "#5d4037" }} onClick={() => p.set(p.v2)}></span>
                </div>
                <button className="btn-buy-ia" onClick={() => añadirCarrito({ nombre: p.name, precio: p.price, imagen: p.img })}>
                  <FaShoppingCart /> AÑADIR AL PEDIDO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VestidoresDetalle;