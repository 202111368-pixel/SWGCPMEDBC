import React from "react";
import Navbar from "../components/Navbar/Navbar";
import placards from "../assets/Placards.jpg";
import "./Detalles.css";

const PlacardsDetalle = () => {
  return (
    <>
      <Navbar />

      <div className="detalle-container">
        <h1>Placards y Vestidores</h1>

        <img src={placards} alt="Placards" />

        <p>
          Soluciones de almacenamiento modernas, personalizadas y con acabados de calidad.
        </p>
      </div>
    </>
  );
};

export default PlacardsDetalle;
