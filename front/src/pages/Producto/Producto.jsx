import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Producto.css";

import cocinas from "../../assets/cocinas.jpg";
import muebles from "../../assets/Muebles.jpg";
import placards from "../../assets/Placards.jpg";
import taller from "../../assets/Taller.jpg";

const Producto = () => {
  return (
    <>
      <Navbar />

      <div className="producto-container">

        <section className="producto-header">
          <h1 className="producto-title">Nuestros Productos</h1>
          <p className="producto-subtitle">
            Calidad, precisión y confianza en cada uno de nuestros trabajos.
          </p>
        </section>

        <section className="producto-grid">

          {/* COCINAS */}
          <div className="producto-card">
            <img src={cocinas} alt="Cocinas" />
            <h3>Cocinas Integrales</h3>
            <p>Diseños modernos y funcionales para tu cocina</p>

            <Link to="/detalles/cocina" className="btn-detalle">
              Ver Detalles
            </Link>
          </div>

          {/* MUEBLES */}
          <div className="producto-card">
            <img src={muebles} alt="Muebles" />
            <h3>Muebles de Oficina</h3>
            <p>Escritorios, bibliotecas y archivadores</p>

            <Link to="/detalles/muebles" className="btn-detalle">
              Ver Detalles
            </Link>
          </div>

          {/* PLACARDS */}
          <div className="producto-card">
            <img src={placards} alt="Placards" />
            <h3>Placards y Vestidores</h3>
            <p>Soluciones de almacenamiento personalizadas</p>

            <Link to="/detalles/placards" className="btn-detalle">
              Ver Detalles
            </Link>
          </div>

          {/* TALLER */}
          <div className="producto-card">
            <img src={taller} alt="Taller" />
            <h3>Taller de Fabricación</h3>
            <p>Proceso artesanal de fabricación</p>

            <Link to="/detalles/taller" className="btn-detalle">
              Ver Detalles
            </Link>
          </div>

        </section>

      </div>
    </>
  );
};

export default Producto;
