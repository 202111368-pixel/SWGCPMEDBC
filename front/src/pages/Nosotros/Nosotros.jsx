import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Nosotros.css";
import Taller from "../../assets/Taller.jpg";

const Nosotros = () => {
  return (
    <>
      <Navbar />

      <div className="nosotros-container">
        <section className="nosotros-content">
          <div className="nosotros-text">
            <h1>Sobre <span>C R E A</span></h1>

            <p>
              Somos una empresa familiar con más de 15 años de experiencia en el diseño y 
              fabricación de muebles de melamina. Nuestra pasión por crear espacios únicos 
              nos ha llevado a convertirnos en líderes del sector.
            </p>

            <p>
              Desde nuestro inicio, nos hemos dedicado a brindar soluciones integrales 
              que combinan funcionalidad, diseño y calidad. Trabajamos de cerca con cada 
              cliente para entender sus necesidades y crear muebles que superen sus expectativas.
            </p>

            <h3>¿Por qué elegirnos?</h3>

            <div className="nosotros-list">
              <ul>
                <li>✔ 15+ años de experiencia en el mercado</li>
                <li>✔ Equipo de diseñadores profesionales</li>
                <li>✔ Materiales de primera calidad</li>
              </ul>

              <ul>
                <li>✔ Más de 500 clientes satisfechos</li>
                <li>✔ Taller equipado con maquinaria moderna</li>
                <li>✔ Servicio integral de diseño a instalación</li>
              </ul>
            </div>

            <h3>Nuestros Valores</h3>

            <div className="valores-list">

              <div className="valor-card">
                <div>
                  <h4>Pasión por la Calidad</h4>
                  <p>Cada mueble es creado con dedicación y atención a los detalles.</p>
                </div>
              </div>

              <div className="valor-card">
                <div>
                  <h4>Garantía y Confianza</h4>
                  <p>Ofrecemos garantía en nuestros productos y servicio post-venta.</p>
                </div>
              </div>

              <div className="valor-card">
                <div>
                  <h4>Innovación Constante</h4>
                  <p>Aplicamos las últimas tendencias en diseño y tecnología.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="nosotros-img">
            <img src={Taller} alt="Taller de fabricación" />
            <div className="anos-box">
              <strong>15+</strong>
              <span>Años</span>
            </div>
          </div>

        </section>

        <section className="nosotros-metricas">
          <div className="metric-card">
            <h2>500+</h2>
            <p>Proyectos Completados</p>
          </div>

          <div className="metric-card">
            <h2>100%</h2>
            <p>Satisfacción Cliente</p>
          </div>
        </section>

        <section className="nosotros-testimonio">
          <p>
            <em>
              "El equipo de C R E A transformó completamente nuestra cocina. 
              El diseño es hermoso y la calidad excepcional. ¡Recomendamos 100%!"
            </em>
          </p>
          <span>- María González, Cliente Satisfecha</span>
        </section>

      </div>
    </>
  );
};

export default Nosotros;
