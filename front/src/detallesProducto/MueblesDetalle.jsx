import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaShoppingCart, FaShieldAlt, FaLock, FaTruck, FaTools, FaStar } from "react-icons/fa";
import "./MueblesDetalle.css";

import muebles1 from "../img/Muebles/muebles1.jpg";
import muebles1a from "../img/Muebles/muebles1a.jpg";
import muebles2 from "../img/Muebles/muebles2.jpg";
import muebles2b from "../img/Muebles/muebles2b.jpg";
import muebles2a from "../img/Muebles/muebles2a.jpg";

const MueblesDetalle = () => {
  const navigate = useNavigate();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [productos] = useState([
    { id: 1, name: "Escritorio Gerencial Alpha", price: 850, imgActual: muebles1, variantes: [muebles1, muebles2, muebles1a], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 2, name: "Escritorio Gerencial Sigma", price: 920, imgActual: muebles1a, variantes: [muebles1a, muebles2b, muebles2], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 3, name: "Escritorio Gerencial Delta", price: 780, imgActual: muebles2a, variantes: [muebles2a, muebles2b, muebles1], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] }
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
    <div className="muebles-ia-root">
      <Navbar />
      <div className="muebles-container-ia">
        <header className="muebles-ia-header">
          <button className="btn-back-ia" onClick={() => productoSeleccionado ? setProductoSeleccionado(null) : navigate(-1)}>
            <FaArrowLeft /> REGRESAR
          </button>
          {!productoSeleccionado && (
            <div className="ia-header-text">
              <h1>Muebles de <span>Oficina</span></h1>
              <p>Mobiliario de alta calidad para tu espacio corporativo.</p>
            </div>
          )}
        </header>

        {!productoSeleccionado ? (
          <main className="productos-grid-ia">
            {productos.map((prod) => (
              <div className="card-ia-modern" key={prod.id}>
                <div className="ia-img-wrapper">
                  <img src={prod.imgActual} alt={prod.name} />
                </div>
                <div className="ia-card-content">
                  <h4>{prod.name}</h4>
                  <div className="ia-pricing">
                    <span className="new-price">S/ {prod.price.toFixed(2)}</span>
                  </div>
                  <button className="btn-ver-completo" onClick={() => setProductoSeleccionado(prod)}>
                    VER COMPLETO
                  </button>
                </div>
              </div>
            ))}
          </main>
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
                <span className="m-precio">S/ {productoSeleccionado.price.toFixed(2)}</span>
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
                <span className="m-precio">S/ {productoSeleccionado.price.toFixed(2)}</span>
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

                <button className="btn-ia-action" onClick={() => añadirCarrito(productoSeleccionado)}>
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

export default MueblesDetalle;