import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { FaArrowLeft, FaShoppingCart, FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaLock, FaTruck, FaTools, FaStar } from "react-icons/fa";
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
  const [itemsEnCarrito, setItemsEnCarrito] = useState([]);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: "", tipo: "" });
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [productos] = useState([
    { id: 1, nombre: "Cocina Integral UrbanBrew", precio: 1500, imgActual: cocina1a, variantes: [cocina1a, cocina1b], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 2, nombre: "Cocina Integral Moderna", precio: 1450, imgActual: cocina2a, variantes: [cocina2a, cocina2b], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 3, nombre: "Cocina Integral Empotrada", precio: 1700, imgActual: cocina3a, variantes: [cocina3a, cocina3b], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
    { id: 4, nombre: "Cocina Integral en U", precio: 2000, imgActual: cocina4a, variantes: [cocina4a, cocina4b], medidas: ["180 cm Largo x 80 cm Ancho", "200 cm Largo x 80 cm Ancho"] },
  ]);

  useEffect(() => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    setItemsEnCarrito(carritoActual.map(item => item.id));
  }, []);

  const cambiarImagenPrincipal = (nuevaImg) => {
    setProductoSeleccionado({ ...productoSeleccionado, imgActual: nuevaImg });
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
          <button 
            className="btn-regresar" 
            onClick={() => productoSeleccionado ? setProductoSeleccionado(null) : navigate(-1)}
          >
            <FaArrowLeft /> REGRESAR
          </button> 
          {!productoSeleccionado && (
            <div className="detalle-title">
              <h1>NUESTRAS <span>COCINAS INTEGRALES</span></h1>
            </div>
          )}
        </header>

        {/* VISTA 1: GRILLA GENERAL DEL CATÁLOGO */}
        {!productoSeleccionado ? (
          <div className="productos-grid-modern">
            {productos.map((p) => (
              <div key={p.id} className="producto-card-ia">
                <div className="img-container-ia">
                  <img src={p.imgActual} alt={p.nombre} className="img-ia-main" />
                </div>
                <div className="card-info-ia">
                  <h4>{p.nombre}</h4>
                  <p className="ia-price">S/ {p.precio}.00</p>
                  <button 
                    className="btn-ver-completo" 
                    onClick={() => setProductoSeleccionado(p)}
                  >
                    VER COMPLETO
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VISTA 2: INTERFAZ DETALLADA BASADA EN EL MODELO */
          <div className="vista-producto-modelo">
            
            {/* Columna Izquierda: Imagen del producto */}
            <div className="modelo-col-izquierda">
              <img src={productoSeleccionado.imgActual} alt={productoSeleccionado.nombre} className="modelo-img-principal" />
            </div>

            {/* Columna Central: Carrusel Vertical de Miniaturas */}
            <div className="modelo-col-miniaturas">
              {productoSeleccionado.variantes.map((img, index) => (
                <div 
                  key={index} 
                  className={`modelo-mini-box ${productoSeleccionado.imgActual === img ? 'activa' : ''}`}
                  onClick={() => cambiarImagenPrincipal(img)}
                >
                  <img src={img} alt={`Miniatura ${index}`} />
                </div>
              ))}
            </div>

            {/* Columna Derecha: Panel Técnico y de Compra */}
            <div className="modelo-col-derecha">
              <h1 className="modelo-titulo">{productoSeleccionado.nombre.toUpperCase()}</h1>
              
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
                <span className="m-precio">S/ {productoSeleccionado.precio}.00</span>
                <span className="m-igv">Incluye IGV</span>
              </div>

              <p className="modelo-entrega">
                <span className="icono-camion">🚚</span> Fecha de entrega a la medida: 1. junio
              </p>

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
                <span className="m-precio">S/ {productoSeleccionado.precio}.00</span>
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

                <button 
                  className={`btn-ia-cart ${itemsEnCarrito.includes(productoSeleccionado.id) ? 'btn-added' : ''}`} 
                  onClick={() => añadirCarrito(productoSeleccionado)}
                >
                  {itemsEnCarrito.includes(productoSeleccionado.id) ? (
                    <><FaCheckCircle /> COMPRADO</>
                  ) : (
                    <><FaShoppingCart /> AÑADIR AL CARRITO</>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CocinaDetalle;