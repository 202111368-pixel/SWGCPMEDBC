import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./MueblesDetalle.css";

const MueblesDetalle = () => {
  return (
    <>
      <Navbar />

      <div className="filtros-container">

        <aside className="filtros-izquierda">

          <div className="grupo-filtro">
            <h3>Tipo de producto</h3>

            <label><input type="checkbox" /> Escritorios (7)</label>
            <label><input type="checkbox" /> Libreros y Estantes (3)</label>
            <label><input type="checkbox" /> Mesas (4)</label>
            <label><input type="checkbox" /> Sillas (6)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Color</h3>

            <label><input type="checkbox" /> Blanco (3)</label>
            <label><input type="checkbox" /> Negro (6)</label>
            <label><input type="checkbox" /> Negro/Azul (1)</label>
            <label><input type="checkbox" /> Madera (5)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Largo</h3>

            <label><input type="checkbox" /> 37 cm (1)</label>
            <label><input type="checkbox" /> 61 cm (2)</label>
            <label><input type="checkbox" /> 114 cm (2)</label>
            <label><input type="checkbox" /> 120 cm (3)</label>
            <label><input type="checkbox" /> 136 cm (2)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Altura</h3>

            <label><input type="checkbox" /> 75 cm (2)</label>
            <label><input type="checkbox" /> 76 cm (3)</label>
            <label><input type="checkbox" /> 77 cm (2)</label>
            <label><input type="checkbox" /> 140 cm (2)</label>
            <label><input type="checkbox" /> 204 cm (1)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Material</h3>

            <label><input type="checkbox" /> Melamina 18mm (10)</label>
            <label><input type="checkbox" /> MDF (4)</label>
            <label><input type="checkbox" /> MDP (2)</label>
            <label><input type="checkbox" /> Metal (5)</label>
          </div>

        </aside>

      </div>
    </>
  );
};

export default MueblesDetalle;
