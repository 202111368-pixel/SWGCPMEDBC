import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaShoppingCart, FaClock, FaTag, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
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
  const navigate = useNavigate();
  const [modalImg, setModalImg] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ horas: 22, minutos: 32, segundos: 15 });
  const [itemsEnCarrito, setItemsEnCarrito] = useState([]);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });

  const [productos, setProductos] = useState([
    { id: 1, nombre: "UrbanBrew", precio: 1500, off: "20% OFF", imgActual: cocina1a, variantes: [cocina1a, cocina1b], colores: ["#9db8a0", "#c8c2b8"] },
    { id: 2, nombre: "Moderna", precio: 1450, off: "10% OFF", imgActual: cocina2a, variantes: [cocina2a, cocina2b], colores: ["#d9c9b2", "#9fa1a3"] },
    { id: 3, nombre: "Empotrada", precio: 1700, off: "15% OFF", imgActual: cocina3a, variantes: [cocina3a, cocina3b], colores: ["#caa574", "#e0c39a"] },
    { id: 4, nombre: "Cocina en U", precio: 2000, off: "20% OFF", imgActual: cocina4a, variantes: [cocina4a, cocina4b], colores: ["#e6e6e6", "#b5b5b5"] },
  ]);

  useEffect(() => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    setItemsEnCarrito(carritoActual.map(item => item.id));
  }, []);

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

  const cambiarColor = (id, nuevaImg) => {
    setProductos(productos.map(p => p.id === id ? { ...p, imgActual: nuevaImg } : p));
  };

  const lanzarNotificacion = (msj, tipo) => {
    setNotificacion({ visible: true, mensaje: msj, tipo });
    setTimeout(() => setNotificacion({ visible: false, mensaje: "", tipo: "" }), 3000);
  };

  const añadirCarrito = (p) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carritoActual.find(item => item.id === p.id)) {
      lanzarNotificacion("Este mueble ya fue comprado y no se puede comprar otra vez", "error");
      return;
    }

    const nuevoProducto = { id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imgActual };
    carritoActual.push(nuevoProducto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    setItemsEnCarrito([...itemsEnCarrito, p.id]);
    window.dispatchEvent(new Event("carritoActualizado"));
    lanzarNotificacion("Mueble añadido con éxito", "success");
  };

  return (
    <div className="detalle-page-root">
      <Navbar />

      {notificacion.visible && (
        <div className={`notificacion-toast ${notificacion.tipo}`}>
          {notificacion.tipo === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
          <span>{notificacion.mensaje}</span>
        </div>
      )}

      <div className="catalogo-wrapper">
        <header className="detalle-header">
          <button className="btn-regresar" onClick={() => navigate(-1)}>
            <FaArrowLeft /> REGRESAR
          </button> 
          <div className="detalle-title">
            <h1>Cocinas <span>Integrales</span></h1>
            <p>Diseños exclusivos con acabados de alta resistencia</p>
          </div>
        </header>

        <div className="productos-grid-modern">
          {productos.map((p) => {
            const yaComprado = itemsEnCarrito.includes(p.id);
            return (
              <div key={p.id} className="producto-card-ia">
                <div className="card-badge"><FaTag /> {p.off}</div>
                <div className="img-container-ia" onClick={() => setModalImg(p.imgActual)}>
                  <img src={p.imgActual} alt={p.nombre} className="img-ia-main" />
                  <div className="img-hover-overlay">Click para ampliar</div>
                </div>
                <div className="timer-ia-box">
                  <div className="timer-label">La oferta termina en:</div>
                  <div className="timer-numbers">
                    {String(timeLeft.horas).padStart(2, '0')}h : {String(timeLeft.minutos).padStart(2, '0')}m : {String(timeLeft.segundos).padStart(2, '0')}s
                  </div>
                </div>
                <div className="card-info-ia">
                  <h4>{p.nombre}</h4>
                  <p className="ia-price">S/ {p.precio}.00</p>
                  <div className="colores-ia">
                    {p.colores.map((color, index) => (
                      <span 
                        key={index} 
                        className="color-dot" 
                        style={{ background: color }} 
                        onClick={() => !yaComprado && cambiarColor(p.id, p.variantes[index])}
                      />
                    ))}
                  </div>
                  <button 
                    className={`btn-ia-cart ${yaComprado ? 'btn-added' : ''}`} 
                    onClick={() => añadirCarrito(p)}
                  >
                    {yaComprado ? <><FaCheckCircle /> COMPRADO</> : <><FaShoppingCart /> AÑADIR AL CARRITO</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modalImg && (
        <div className="modal-ia-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-ia-box">
            <img src={modalImg} alt="Preview" />
            <button className="modal-ia-close">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CocinaDetalle;