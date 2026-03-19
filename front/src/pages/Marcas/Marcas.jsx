import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaCheckCircle, FaAward } from "react-icons/fa";
import "./Marcas.css";
import pelikanoImg from "../../img/Marccas/Pelíkano1.jpg";
import novopanImg from "../../img/Marccas/Novopan.jpg";
import masisaImg from "../../img/Marccas/Masisa.jpg";

const Marcas = () => {
  const marcasMelamina = [
    {
      id: 1,
      nombre: "Pelíkano",
      tag: "Premium Design",
      descripcion: "Líder en diseño con texturas sincronizadas y protección antibacterial de cobre incorporada.",
      imagen: pelikanoImg
    },
    {
      id: 2,
      nombre: "Novopan RH",
      tag: "Alta Resistencia",
      descripcion: "Especialistas en tableros hidrófugos de alta densidad, ideales para zonas de humedad como cocinas.",
      imagen: novopanImg
    },
    {
      id: 3,
      nombre: "Masisa",
      tag: "Eco-Friendly",
      descripcion: "Tableros con estándares internacionales de calidad y un firme compromiso con la sostenibilidad.",
      imagen: masisaImg
    }
  ];

  return (
    <div className="marcas-page-wrapper">
      <Navbar />
      
      <main className="marcas-container">
        <header className="marcas-header">
          <h1>Marcas de <span>Melamina</span></h1>
          <p className="subtitulo">
            La excelencia de nuestros muebles nace en la selección de los mejores tableros del mercado.
          </p>
        </header>

        <div className="marcas-grid">
          {marcasMelamina.map((marca) => (
            <div key={marca.id} className="marca-card-ia">
              <div className="marca-status">
                <FaAward /> <span>Certificado</span>
              </div>
              
              <div className="marca-logo-box-ia">
                <img 
                  src={marca.imagen} 
                  alt={marca.nombre} 
                  className="marca-img-ia" 
                />
              </div>

              <div className="marca-content-ia">
                <div className="marca-tag">{marca.tag}</div>
                <h3>{marca.nombre}</h3>
                <p>{marca.descripcion}</p>
                <div className="marca-footer">
                  <FaCheckCircle /> Garantía de Origen
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marcas;