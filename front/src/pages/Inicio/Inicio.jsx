import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import nicolasImg from "../../assets/nicolas.jpg";
import "./Inicio.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaStar, FaFacebookF, FaLinkedinIn, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import persona1 from "../../assets/persona1.jpg";
import persona2 from "../../assets/persona2.jpg";
import persona3 from "../../assets/persona3.jpg";
import persona4 from "../../assets/persona4.jpg";
import persona5 from "../../assets/persona5.jpg";
import persona6 from "../../assets/persona6.jpg";
import persona7 from "../../assets/persona7.jpg";
import persona8 from "../../assets/persona8.jpg";

const Inicio = () => {
  const [furniture, setFurniture] = useState(0);
  const [custom, setCustom] = useState(0);
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    const animateValue = (setter, target, step, delay) => {
      let value = 0;
      const interval = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(interval);
        }
        setter(value);
      }, delay);
    };

    animateValue(setFurniture, 768, 8, 40);
    animateValue(setCustom, 654, 6, 40);
    animateValue(setExperience, 30, 1, 100);
  }, []);

  const clients = [
    { img: persona1, name: "Nicolás Vega", text: "Excelente trabajo y puntualidad." },
    { img: persona2, name: "María López", text: "Muy profesionales y detallistas." },
    { img: persona3, name: "Carlos Pérez", text: "Mis muebles quedaron perfectos." },
    { img: persona4, name: "Ana Torres", text: "Recomiendo al 100% su servicio." },
    { img: persona5, name: "Javier Ramos", text: "Gran calidad y atención personalizada." },
    { img: persona6, name: "Lucía Díaz", text: "Los acabados fueron impecables." },
    { img: persona7, name: "Pedro Silva", text: "Diseños modernos y funcionales." },
    { img: persona8, name: "Rosa Méndez", text: "Cumplieron todo lo acordado a tiempo." },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="overlay">
          <h3>Calidad en Melamina</h3>
          <h1>Proveemos los mejores servicios en carpintería</h1>
          <p>
            Contamos con materiales de alta calidad y un servicio profesional para tus proyectos.
          </p>
          <button>Ver más</button>
        </div>
      </section>

      <section className="about-section">
        <div className="about-image">
          <img src={nicolasImg} alt="Carpintería en melamina" />

          <div className="experience-overlay">
            <h2>{experience}+</h2>
            <p>Años de Experiencia</p>
          </div>
        </div>

        <div className="about-content">
          <h4>Sobre Nosotros</h4>
          <h1>Ofrecemos soluciones rentables para ti</h1>
          <p>
            Nuestro equipo está comprometido con ofrecer los mejores acabados
            en melamina, combinando experiencia, calidad y puntualidad.
          </p>

          <div className="stats">
            <div>
              <h2>{furniture}+</h2>
              <p>Muebles para el hogar</p>
            </div>
            <div>
              <h2>{custom}+</h2>
              <p>Trabajos personalizados</p>
            </div>
          </div>

          <p className="description">
            Creamos proyectos únicos y personalizados según tus necesidades.
          </p>
          <button>Ver más</button>
        </div>
      </section>

      <section className="clientes-slider">
        <h2 className="clientes-titulo">Lo Que Dicen Nuestros Clientes</h2>
        <Slider {...settings}>
          {clients.map((c, i) => (
            <div className="cliente-card" key={i}>
              <img src={c.img} alt={c.name} />
              <h3>{c.name}</h3>

              <div className="estrellas">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} color="#fbc02d" size={20} />
                ))}
              </div>

              <p>{c.text}</p>
            </div>
          ))}
        </Slider>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h2 className="footer-logo">Melamine crafts</h2>
            <p>
              Nos especializamos en ofrecer muebles de melamina de alta calidad,
              combinando diseño, durabilidad y elegancia para tu hogar o negocio.
            </p>
            <div className="footer-socials">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>



          <div className="footer-column">
            <h3>Información de Contacto</h3>
            <ul className="contact-info">
              <li><FaMapMarkerAlt /> Villa Salvador</li>
              <li><FaPhoneAlt /> +51 962 352 000</li>
              <li><FaEnvelope /> dbary@gmail.com</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Horario de Atención</h3>
            <ul className="contact-info">
              <li>Lunes a Sábado: 7:00 AM - 5:00 PM</li>
              <li> Nuestro equipo de soporte y ventas está disponible las 24 horas para atenderte.</li>
            </ul>
            <button className="footer-button">Llámanos</button>
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © {new Date().getFullYear()} Wood Crafx. Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
};

export default Inicio;
