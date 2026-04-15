import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaCheckCircle, FaAward, FaCouch, FaBriefcase, FaUtensils } from "react-icons/fa";
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
      descripcion: "Líder en tendencia. Sus texturas sincronizadas son la opción número uno para frentes de Vestidores y Placards de lujo.",
      imagen: pelikanoImg,
      especialidad: "Placards y Vestidores",
      icono: <FaCouch />
    },
    {
      id: 2,
      nombre: "Novopan RH",
      tag: "Alta Resistencia",
      descripcion: "Tableros hidrófugos (RH) de máxima densidad. La marca más importante para tus Cocinas Integrales por su resistencia a la humedad.",
      imagen: novopanImg,
      especialidad: "Cocinas Integrales",
      icono: <FaUtensils />
    },
    {
      id: 3,
      nombre: "Masisa",
      tag: "Eco-Friendly",
      descripcion: "Calidad internacional con acabados sobrios y duraderos, ideales para Muebles de Oficina y espacios de alta productividad.",
      imagen: masisaImg,
      especialidad: "Muebles de Oficina",
      icono: <FaBriefcase />
    }
  ];

  return (
    <div className="marcas-page-wrapper">
      <Navbar />
      
      <main className="marcas-container">
        <header className="marcas-header">
          <div className="badge-ia">Calidad Certificada</div>
          <h1>Nuestras <span>Marcas Aliadas</span></h1>
          <p className="subtitulo">
            Estas son las marcas más importantes para tus <strong>Placards, Muebles de Oficina y Cocinas Integrales</strong>. 
            Elegimos solo lo mejor para garantizar durabilidad en cada proyecto.
          </p>
        </header>

        <div className="marcas-grid">
          {marcasMelamina.map((marca) => (
            <div key={marca.id} className="marca-card-ia">
              <div className="marca-status">
                <FaAward /> <span>Top Choice</span>
              </div>
              
              <div className="marca-logo-box-ia">
                <img src={marca.imagen} alt={marca.nombre} className="marca-img-ia" />
              </div>

              <div className="marca-content-ia">
                <div className="marca-tag">{marca.tag}</div>
                <h3>{marca.nombre}</h3>
                
                <div className="ia-recommendation">
                  {marca.icono}
                  <span>Ideal para: <strong>{marca.especialidad}</strong></span>
                </div>

                <p>{marca.descripcion}</p>
                
                <div className="marca-footer">
                  <FaCheckCircle /> Garantía de fábrica 100%
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