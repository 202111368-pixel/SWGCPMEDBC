import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Producto.css";

import cocinas from "../../assets/cocinas.jpg";
import muebles from "../../assets/Muebles.jpg";
import placards from "../../assets/Placards.jpg";

const Producto = () => {
  return (
    <div className="producto-page-wrapper">
      <Navbar />

      <div className="producto-container">
        <header className="producto-header">
          <h1 className="producto-title">Nuestros <span>Productos</span></h1>
          <p className="producto-subtitle">
            Calidad, precisión y confianza en cada uno de nuestros trabajos
          </p>
        </header>

        <section className="producto-grid">
          <div className="producto-card">
            <div className="card-glass"></div>
            <div className="image-wrapper">
              <img src={cocinas} alt="Cocinas" />
            </div>
            <div className="card-content">
              <p>Cocinas Integrales</p>
              <Link to="/detalles/cocina" className="btn-detalle-ia">
                Analizar Diseño <span>→</span>
              </Link>
            </div>
          </div>

          <div className="producto-card">
            <div className="card-glass"></div>
            <div className="image-wrapper">
              <img src={muebles} alt="Muebles" />
            </div>
            <div className="card-content">
              <p>Muebles de Oficina</p>
              <Link to="/detalles/muebles" className="btn-detalle-ia">
                Analizar Diseño <span>→</span>
              </Link>
            </div>
          </div>

          <div className="producto-card">
            <div className="card-glass"></div>
            <div className="image-wrapper">
              <img src={placards} alt="Placards" />
            </div>
            <div className="card-content">
              <p>Placards y Vestidores</p>
              <Link to="/detalles/placards" className="btn-detalle-ia">
                Analizar Diseño <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Producto;