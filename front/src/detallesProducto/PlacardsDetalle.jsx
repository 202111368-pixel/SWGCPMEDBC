import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./PlacardsDetalle.css";

const PlacardsDetalle = () => {
  return (
    <>
      <Navbar />

      <div className="filtros-container">

        <aside className="filtros-izquierda">

          <div className="grupo-filtro">
            <h3>Tipo de producto</h3>

            <label><input type="checkbox" /> Placards (8)</label>
            <label><input type="checkbox" /> Vestidores (5)</label>
            <label><input type="checkbox" /> Zapateras (3)</label>
            <label><input type="checkbox" /> Cajoneras (4)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Color</h3>

            <label><input type="checkbox" /> Blanco (6)</label>
            <label><input type="checkbox" /> Wengue (4)</label>
            <label><input type="checkbox" /> Roble (3)</label>
            <label><input type="checkbox" /> Cedro (2)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Largo</h3>

            <label><input type="checkbox" /> 120 cm (3)</label>
            <label><input type="checkbox" /> 150 cm (4)</label>
            <label><input type="checkbox" /> 180 cm (2)</label>
            <label><input type="checkbox" /> 200 cm (4)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Altura</h3>

            <label><input type="checkbox" /> 180 cm (3)</label>
            <label><input type="checkbox" /> 200 cm (5)</label>
            <label><input type="checkbox" /> 220 cm (3)</label>
            <label><input type="checkbox" /> 240 cm (2)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Material</h3>

            <label><input type="checkbox" /> Melamina 18mm (10)</label>
            <label><input type="checkbox" /> MDF (4)</label>
            <label><input type="checkbox" /> MDP (2)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Distribución Interna</h3>

            <label><input type="checkbox" /> Con Cajones (7)</label>
            <label><input type="checkbox" /> Con Barral (9)</label>
            <label><input type="checkbox" /> Con Estantes (6)</label>
            <label><input type="checkbox" /> Mixto (5)</label>
          </div>

        </aside>

      </div>
    </>
  );
};

export default PlacardsDetalle;
