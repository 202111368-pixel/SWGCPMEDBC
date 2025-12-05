import React from "react";
import Navbar from "../components/Navbar/Navbar";
import taller from "../assets/Taller.jpg";
import "./Detalles.css";

const TallerDetalle = () => {
  return (
    <>
      <Navbar />

      <div className="detalle-container">
        <h1>Taller de Fabricación</h1>

        <img src={taller} alt="Taller" />

        <p>
          Nuestro taller equipado con maquinaria moderna garantiza precisión y calidad.
        </p>
      </div>
    </>
  );
};

export default TallerDetalle;
