import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "./TallerDetalle.css";

const TallerDetalle = () => {
  return (
    <>
      <Navbar />

      <div className="filtros-container">

        <aside className="filtros-izquierda">

          <div className="grupo-filtro">
            <h3>Servicios</h3>

            <label><input type="checkbox" /> Corte de Melamina (12)</label>
            <label><input type="checkbox" /> Enchapado / Tapacantos (9)</label>
            <label><input type="checkbox" /> Perforaciones CNC (4)</label>
            <label><input type="checkbox" /> Armado de Muebles (7)</label>
            <label><input type="checkbox" /> Diseño Personalizado (3)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Tipo de Corte</h3>

            <label><input type="checkbox" /> Recto (10)</label>
            <label><input type="checkbox" /> Angular (5)</label>
            <label><input type="checkbox" /> Curvo CNC (2)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Material</h3>

            <label><input type="checkbox" /> Melamina 18mm (14)</label>
            <label><input type="checkbox" /> MDF (6)</label>
            <label><input type="checkbox" /> MDP (4)</label>
          </div>

          <div className="grupo-filtro">
            <h3>Acabado</h3>

            <label><input type="checkbox" /> Liso (8)</label>
            <label><input type="checkbox" /> Texturado (5)</label>
            <label><input type="checkbox" /> Alto Brillo (2)</label>
          </div>

        </aside>

      </div>
    </>
  );
};

export default TallerDetalle;
