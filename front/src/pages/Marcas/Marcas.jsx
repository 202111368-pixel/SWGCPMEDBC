import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Marcas.css";
import pelikanoImg from "../../img/Marccas/Pelíkano1.jpg";
import novopanImg from "../../img/Marccas/Novopan.jpg";
import masisaImg from "../../img/Marccas/Masisa.jpg";

const Marcas = () => {
  const marcasMelamina = [
    {
      id: 1,
      nombre: "Pelíkano",
      descripcion: "Líder en diseño con texturas sincronizadas y protección antibacterial de cobre.",
      imagen: pelikanoImg
    },
    {
      id: 2,
      nombre: "Novopan RH",
      descripcion: "Especialistas en tableros de alta resistencia a la humedad, ideales para cocinas y baños.",
      imagen: novopanImg
    },
    {
      id: 3,
      nombre: "Masisa",
      descripcion: "Tableros con altos estándares de calidad y compromiso con la sostenibilidad ambiental.",
      imagen: masisaImg
    }
  ];

  return (
    <div className="marcas-page">
      <Navbar />
      
      <main className="marcas-container">
        <header className="marcas-header fade-in-up">
          <h1>Nuestras Marcas de Melamina</h1>
          <p>Utilizamos materiales de primera calidad para garantizar la durabilidad de tus muebles.</p>
        </header>

        <div className="marcas-grid">
          {marcasMelamina.map((marca) => (
            <div key={marca.id} className="marca-card fade-in-up">
              <div className="marca-logo-box">
                <img 
                  src={marca.imagen} 
                  alt={`Logo de ${marca.nombre}`} 
                  className="marca-img" 
                />
              </div>
              <div className="marca-content">
                <h3>{marca.nombre}</h3>
                <p>{marca.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marcas;