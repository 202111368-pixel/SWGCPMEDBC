import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaShoppingCart, FaShieldAlt, FaLock, FaTruck, FaTools, FaStar } from "react-icons/fa";
import "./PlacardsDetalle.css";

import Vestidores1 from "../img/Vestidores/Vestidores1.jpg";
import Vestidores2 from "../img/Vestidores/Vestidores2.jpg";
import Vestidores1a from "../img/Vestidores/Vestidores1a.jpg";
import Vestidores1b from "../img/Vestidores/Vestidores1b.jpg";
import Vestidores2a from "../img/Vestidores/Vestidores2a.jpg";
import Vestidores2b from "../img/Vestidores/Vestidores2b.jpg";
import Vestidores3a from "../img/Vestidores/Vestidores3a.jpg";
import Vestidores3b from "../img/Vestidores/Vestidores3b.jpg";

const VestidoresDetalle = () => {
  const navigate = useNavigate();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [productos] = useState([
    { id: 1, name: "Vestidor Modular Alpha", price: 1500, imgActual: Vestidores1, variantes: [Vestidores1, Vestidores2, Vestidores1a], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 2, name: "Vestidor Modular Sigma", price: 1650, imgActual: Vestidores1a, variantes: [Vestidores1a, Vestidores1b, Vestidores2b], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 3, name: "Vestidor Modular Delta", price: 1780, imgActual: Vestidores2a, variantes: [Vestidores2a, Vestidores2b, Vestidores3a], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 4, name: "Vestidor Modular Omega", price: 1900, imgActual: Vestidores3a, variantes: [Vestidores3a, Vestidores3b, Vestidores1b], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] }
  ]);

  const cambiarImagenPrincipal = (nuevaImg) => {
    setProductoSeleccionado({ ...productoSeleccionado, imgActual: nuevaImg });
  };

  const añadirCarrito = (p) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoProducto = { id: p.id, nombre: p.name, precio: p.price, imagen: p.imgActual };
    carritoActual.push(nuevoProducto);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  return (
    <div className="placards-ia-page">
      <Navbar />
      <div className="placards-wrapper">
        <header className="placards-header">
          <button className="btn-back-nav" onClick={() => productoSeleccionado ? setProductoSeleccionado(null) : navigate(-1)}>
            <FaArrowLeft /> REGRESAR
          </button>
          {!productoSeleccionado && (
            <div className="placards-title-box">
              <h1>Placards y <span>Vestidores</span></h1>
              <p>Diseño de interiores elegante para tu organización personal.</p>
            </div>
          )}
        </header>

        {!productoSeleccionado ? (
          <div className="placards-grid-modern">
            {productos.map((p) => (
              <div className="placard-card-ia" key={p.id}>
                <div className="placard-img-container">
                  <img src={p.imgActual} alt={p.name} />
                </div>
                <div className="placard-info-ia">
                  <h4>{p.name}</h4>
                  <div className="placard-pricing">
                    <span className="current">S/ {p.price}</span>
                  </div>
                  <button className="btn-ver-completo" onClick={() => setProductoSeleccionado(p)}>
                    VER COMPLETO
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="vista-producto-modelo">
            <div className="modelo-col-izquierda">
              <img src={productoSeleccionado.imgActual} alt={productoSeleccionado.name} className="modelo-img-principal" />
            </div>

            <div className="modelo-col-miniaturas">
              {productoSeleccionado.variantes.map((img, index) => (
                <div key={index} className={`modelo-mini-box ${productoSeleccionado.imgActual === img ? 'activa' : ''}`} onClick={() => cambiarImagenPrincipal(img)}>
                  <img src={img} alt={`Miniatura ${index}`} />
                </div>
              ))}
            </div>

            <div className="modelo-col-derecha">
              <h1 className="modelo-titulo">{productoSeleccionado.name.toUpperCase()}</h1>
              
              <div className="modelo-estrellas">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>

              <div className="modelo-badges-container">
                <span className="m-badge"><FaShieldAlt /> Garantía</span>
                <span className="m-badge"><FaLock /> Pago Seguro</span>
                <span className="m-badge"><FaTruck /> Transporte</span>
                <span className="m-badge"><FaTools /> Instalación</span>
              </div>

              <div className="modelo-precio-box">
                <span className="m-desde">Desde:</span>
                <span className="m-precio">S/ {productoSeleccionado.price}.00</span>
                <span className="m-igv">Incluye IGV</span>
              </div>

              <p className="modelo-entrega">🚚 Fecha de entrega a la medida: 1. junio</p>

              <div className="modelo-medidas-seccion">
                <span className="m-medidas-label">MEDIDAS TABLERO</span>
                <div className="m-medidas-opciones">
                  {productoSeleccionado.medidas.map((medida, idx) => (
                    <div key={idx} className="m-medida-item">
                      Mesa: {medida} x 75 cm Alto
                    </div>
                  ))}
                </div>
              </div>

              <div className="modelo-precio-box replica">
                <span className="m-desde">Desde:</span>
                <span className="m-precio">S/ {productoSeleccionado.price}.00</span>
                <span className="m-igv">Incluye IGV</span>
              </div>

              <div className="modelo-acciones">
                <div className="m-cantidad-selector">
                  <span className="cant-label">CANT.</span>
                  <div className="cant-control">
                    <button className="btn-cant">-</button>
                    <span className="cant-num">1</span>
                    <button className="btn-cant">+</button>
                  </div>
                </div>

                <button className="btn-buy-ia" onClick={() => añadirCarrito(productoSeleccionado)}>
                  <FaShoppingCart /> AÑADIR AL CARRITO
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VestidoresDetalle;