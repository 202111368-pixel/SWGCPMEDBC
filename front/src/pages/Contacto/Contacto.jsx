import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipo: "",
    presupuesto: "",
    mensaje: "",
    acepta: false
  });

  const [notificacion, setNotificacion] = useState({ visible: false, tipo: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.telefono || !formData.email || !formData.mensaje) {
      setNotificacion({ visible: true, tipo: "error" });
      setTimeout(() => setNotificacion({ visible: false, tipo: "" }), 4000);
      return;
    }

    setNotificacion({ visible: true, tipo: "exito" });
    setTimeout(() => setNotificacion({ visible: false, tipo: "" }), 4000);
  };

  return (
    <>
      <Navbar />

      {notificacion.visible && notificacion.tipo === "exito" && (
        <div className="notificacion-push exito">
          <div className="push-icon">D</div>
          <div className="push-content">
            <div className="push-header">
              <strong>DBARY COMPANY</strong>
              <span>ahora</span>
            </div>
            <p>Se envió la solicitud a nuestra empresa exitosamente.</p>
          </div>
        </div>
      )}

      {notificacion.visible && notificacion.tipo === "error" && (
        <div className="notificacion-push error">
          <div className="push-icon">!</div>
          <div className="push-content">
            <div className="push-header">
              <strong>Error de Envío</strong>
              <span>ahora</span>
            </div>
            <p>Por favor, completa los campos obligatorios antes de enviar.</p>
          </div>
        </div>
      )}

      <div className="contacto-container">
        <h1>Contáctanos</h1>
        <p className="subtitulo">
          ¿Tienes un proyecto en mente? Trabajemos juntos para hacerlo realidad.
        </p>

        <div className="contacto-grid">
          <div className="info-contacto">
            <h2>Información de Contacto</h2>
            
            <div className="info-item">
              <FaPhone className="react-icon" />
              <div>
                <p className="info-label">TELÉFONO</p>
                <p className="info-text">(+51) 962 219 340</p>
              </div>
            </div>

            <div className="info-item">
              <FaEnvelope className="react-icon" />
              <div>
                <p className="info-label">EMAIL</p>
                <p className="info-text">vidu@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <FaMapMarkerAlt className="react-icon" />
              <div>
                <p className="info-label">UBICACIÓN</p>
                <p className="info-text">Ate - Lima, Perú</p>
              </div>
            </div>

            <div className="info-item">
              <FaClock className="react-icon" />
              <div>
                <p className="info-label">HORARIOS DE ATENCIÓN</p>
                <p className="info-text">Lunes a Viernes: 8:00 - 18:00</p>
                <p className="info-text">Sábados: 9:00 - 13:00</p>
              </div>
            </div>
          </div>

          <form className="formulario" onSubmit={handleSubmit} noValidate>
            <h2>Solicitar Cotización</h2>
            <p>Completa el formulario y te contactaremos dentro de las próximas 24 horas.</p>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre completo" />
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Tu número de teléfono" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" />
              </div>
              <div className="form-group">
                <label>Tipo de Proyecto</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange}>
                  <option value="">Selecciona el tipo</option>
                  <option value="cocina">Cocina Integral</option>
                  <option value="oficina">Muebles de Oficina</option>
                  <option value="comedor">Comedor</option>
                  <option value="mueble">Muebles en General</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Presupuesto Estimado</label>
              <select name="presupuesto" value={formData.presupuesto} onChange={handleChange}>
                <option value="">Rango de presupuesto</option>
                <option value="500-1000">S/ 500 - S/ 1000</option>
                <option value="1000-2000">S/ 1000 - S/ 2000</option>
                <option value="2000-5000">S/ 2000 - S/ 5000</option>
                <option value="5000+">Más de S/ 5000</option>
              </select>
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Describe tu proyecto *</label>
              <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos medidas, estilo, etc."></textarea>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" name="acepta" checked={formData.acepta} onChange={handleChange} />
              <label>Acepto recibir comunicaciones comerciales.</label>
            </div>

            <button className="btn-enviar" type="submit">Enviar Consulta</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contacto;