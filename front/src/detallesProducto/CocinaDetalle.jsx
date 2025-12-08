import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Detalles.css";

const CocinaDetalle = () => {
  const [filters, setFilters] = useState({
    tipoProducto: [],
    color: [],
    largo: [],
    altura: [],
    material: [],
    formato: [],
    cantidad: []
  });

  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => {
      const newCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter(item => item !== value)
        : [...prevFilters[category], value];
      return { ...prevFilters, [category]: newCategory };
    });
  };

  return (
    <>
      <Navbar />

      <div className="detalle-container">
        <div className="sidebar">
          <h2>Filtros</h2>
          <div>
            <h3>Tipo de productos</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.tipoProducto.includes("Cocinas integrales")}
                onChange={() => handleCheckboxChange("tipoProducto", "Cocinas integrales")}
              />
              Cocinas integrales
            </label>
          </div>

          <div>
            <h3>Color</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.color.includes("Blanco")}
                onChange={() => handleCheckboxChange("color", "Blanco")}
              />
              Blanco
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.color.includes("Negro")}
                onChange={() => handleCheckboxChange("color", "Negro")}
              />
              Negro
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.color.includes("Gris")}
                onChange={() => handleCheckboxChange("color", "Gris")}
              />
              Gris
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.color.includes("Marrón")}
                onChange={() => handleCheckboxChange("color", "Marrón")}
              />
              Marrón
            </label>
          </div>

          <div>
            <h3>Largo</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.largo.includes("120 cm")}
                onChange={() => handleCheckboxChange("largo", "120 cm")}
              />
              120 cm
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.largo.includes("150 cm")}
                onChange={() => handleCheckboxChange("largo", "150 cm")}
              />
              150 cm
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.largo.includes("180 cm")}
                onChange={() => handleCheckboxChange("largo", "180 cm")}
              />
              180 cm
            </label>
          </div>

          <div>
            <h3>Altura</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.altura.includes("80 cm")}
                onChange={() => handleCheckboxChange("altura", "80 cm")}
              />
              80 cm
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.altura.includes("90 cm")}
                onChange={() => handleCheckboxChange("altura", "90 cm")}
              />
              90 cm
            </label>
          </div>

          <div>
            <h3>Material</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.material.includes("MDF")}
                onChange={() => handleCheckboxChange("material", "MDF")}
              />
              MDF
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.material.includes("Madera")}
                onChange={() => handleCheckboxChange("material", "Madera")}
              />
              Madera
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.material.includes("Melamina")}
                onChange={() => handleCheckboxChange("material", "Melamina")}
              />
              Melamina
            </label>
          </div>

          <div>
            <h3>Formato</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.formato.includes("Esquinas")}
                onChange={() => handleCheckboxChange("formato", "Esquinas")}
              />
              Esquinas
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.formato.includes("Lineal")}
                onChange={() => handleCheckboxChange("formato", "Lineal")}
              />
              Lineal
            </label>
          </div>

          <div>
            <h3>Cantidad de opciones</h3>
            <label>
              <input
                type="checkbox"
                checked={filters.cantidad.includes("1")}
                onChange={() => handleCheckboxChange("cantidad", "1")}
              />
              1
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.cantidad.includes("2")}
                onChange={() => handleCheckboxChange("cantidad", "2")}
              />
              2
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.cantidad.includes("3")}
                onChange={() => handleCheckboxChange("cantidad", "3")}
              />
              3
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.cantidad.includes("4")}
                onChange={() => handleCheckboxChange("cantidad", "4")}
              />
              4
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CocinaDetalle;
