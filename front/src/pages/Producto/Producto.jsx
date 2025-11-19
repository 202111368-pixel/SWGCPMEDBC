import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Producto.css";

import pelikano from "../../img/pelikano.jpg";
import masisa from "../../img/masisa.jpg";
import arcilla from "../../img/arcilla.jpg";
import oak from "../../img/oak.jpg";

import engrosado from "../../img/engrosado.jpg";
import curvo from "../../img/curvo.jpg";
import angulo from "../../img/angulo.jpg";


const MelaminaIcon = () => (
  <svg width="40" height="40" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

const AcabadosIcon = () => (
  <svg width="40" height="40" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16v6H4z" />
    <path d="M4 14h16v6H4z" />
  </svg>
);

const DrywallIcon = () => (
  <svg width="40" height="40" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="8" height="16" />
    <rect x="13" y="4" width="8" height="16" />
  </svg>
);

const MaderaIcon = () => (
  <svg width="40" height="40" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 20V4h10l6 6v10H4z" />
    <line x1="14" y1="4" x2="14" y2="10" />
  </svg>
);

const FerreteriaIcon = () => (
  <svg width="40" height="40" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 21l6-6" />
    <path d="M14 3l7 7l-4 4l-7-7" />
    <circle cx="5" cy="19" r="2" />
  </svg>
);

const AltaGamaIcon = () => (
  <svg width="40" height="40" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 17l9-14l9 14H3z" />
  </svg>
);

const productos = [
  { nombre: "Pelíkano Mamba", img: pelikano },
  { nombre: "Masisa Uyuni", img: masisa },
  { nombre: "Vesto Arcilla", img: arcilla },
  { nombre: "Hipanos Garden Oak", img: oak },
];

const servicios = [
  { nombre: "ENGROSADO DE TABLEROS", img: engrosado },
  { nombre: "CORTE CURVO", img: curvo },
  { nombre: "CORTE EN ÁNGULO", img: angulo },
];


const Producto = () => {
  return (
    <>
      <Navbar />

      <div className="producto-page">

        <h1 className="titulo-principal">Productos Destacados</h1>

        <div className="categorias">
          <div className="categoria active"><MelaminaIcon /><span>Melamina</span></div>
          <div className="categoria"><AcabadosIcon /><span>Acabados</span></div>
          <div className="categoria"><DrywallIcon /><span>Drywall y Techos</span></div>
          <div className="categoria"><MaderaIcon /><span>Madera y tableros</span></div>
          <div className="categoria"><FerreteriaIcon /><span>Ferretería y Accesorios</span></div>
          <div className="categoria"><AltaGamaIcon /><span>Tableros Alta Gama</span></div>
        </div>

        <h2 className="titulo-seccion">Nuestros Productos</h2>

        <div className="productos-lista">
          {productos.map((p, i) => (
            <div key={i} className="producto-card">
              <img src={p.img} className="producto-img" />
              <div className="producto-info">
                <p>{p.nombre}</p>
                <button className="btn-mas">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="servicio-card-grande">
          <img src={engrosado} className="servicio-img-grande" />

          <div className="servicio-info-grande">
            <h3>Nuestros Servicios</h3>
            <p>
              Te ofrecemos un amplio portafolio de servicios realizados en maquinaria de primera 
              tecnología y personal calificado para facilitar el desarrollo de tus proyectos.
            </p>
          </div>
        </div>

        <div className="servicios-lista">
          {servicios.map((s, i) => (
            <div key={i} className="servicio-card">
              <img src={s.img} className="servicio-img" />
              <div className="servicio-footer">
                <p>{s.nombre}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Producto;
