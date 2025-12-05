import React from "react";
import Navbar from "../components/Navbar/Navbar";
import muebles from "../assets/Muebles.jpg";
import "./Detalles.css";

const MueblesDetalle = () => {
  return (
    <>
      <Navbar />

      <div className="detalle-container">
        <h1>Muebles de Oficina</h1>

        <img src={muebles} alt="Muebles" />

        <p>
          Muebles robustos, funcionales y ergonómicos diseñados para tu espacio laboral.
        </p>
      </div>
    </>
  );
};

export default MueblesDetalle;
