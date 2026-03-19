import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Nosotros.css";
import Taller from "../../assets/nicolas.jpg"; 

const Nosotros = () => {
  return (
    <div className="nosotros-page-wrapper">
      <Navbar />

      <div className="nosotros-container">
        <section className="nosotros-content">
          <div className="nosotros-text">
            <span className="badge-ia">Trayectoria Tecnológica</span>
            <h1>Sobre <span>D’Bary Company</span></h1>

            <p>
              Somos una empresa líder con más de 15 años de experiencia en la fusión de 
              diseño arquitectónico y fabricación avanzada de muebles de melamina.
            </p>

            <p>
              Nuestra infraestructura combina la precisión de la maquinaria moderna con 
              el detalle artesanal, garantizando espacios que elevan tu estilo de vida.
            </p>

            <h3>¿Por qué elegir nuestra ingeniería?</h3>

            <div className="nosotros-list">
              <ul>
                <li>✔ 15+ Años de Innovación</li>
                <li>✔ Diseño Paramétrico 3D</li>
                <li>✔ Melaminas de Alta Densidad</li>
              </ul>

              <ul>
                <li>✔ +500 Proyectos Inteligentes</li>
                <li>✔ Taller de Corte Automatizado</li>
                <li>✔ Instalación de Precisión</li>
              </ul>
            </div>

            <div className="valores-grid">
              <div className="valor-card-ia">
                <h4>Calidad Certificada</h4>
                <p>Cada pieza pasa por un control de calidad riguroso antes del ensamblaje.</p>
              </div>

              <div className="valor-card-ia">
                <h4>Garantía Real</h4>
                <p>Protección extendida y soporte técnico post-instalación de por vida.</p>
              </div>

              <div className="valor-card-ia">
                <h4>Tendencia 2026</h4>
                <p>Modelos actualizados según las ferias de diseño internacionales.</p>
              </div>
            </div>
          </div>

          <div className="nosotros-img-container">
            <div className="img-frame">
              <img src={Taller} alt="Taller D’Bary" />
              <div className="anos-experience">
                <strong>15+</strong>
                <span>Años</span>
              </div>
            </div>
          </div>
        </section>

        <section className="nosotros-stats-ia">
          <div className="stat-box">
            <h2>500+</h2>
            <p>Estructuras Creadas</p>
          </div>
          <div className="stat-box">
            <h2>100%</h2>
            <p>Efectividad IA</p>
          </div>
        </section>

        <section className="nosotros-quote">
          <div className="quote-icon">"</div>
          <p>
            Transformamos tableros de melamina en experiencias de vida. 
            La precisión es nuestra firma.
          </p>
          <span className="quote-author">- Dirección General, D’Bary Company</span>
        </section>
      </div>
    </div>
  );
};

export default Nosotros;