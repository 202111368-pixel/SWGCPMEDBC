import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaRobot } from 'react-icons/fa';
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
    <div className="contacto-page-wrapper">
      <Navbar />

      {notificacion.visible && (
        <div className={`notificacion-push ${notificacion.tipo}`}>
          <div className="push-icon">{notificacion.tipo === "exito" ? <FaRobot /> : "!"}</div>
          <div className="push-content">
            <div className="push-header">
              <strong>{notificacion.tipo === "exito" ? "DBARY AI" : "Error de Envío"}</strong>
              <span>ahora</span>
            </div>
            <p>{notificacion.tipo === "exito" ? "Solicitud de diseño procesada con éxito." : "Completa los campos obligatorios."}</p>
          </div>
        </div>
      )}

      <div className="contacto-container">
        <header className="contacto-header">
          <span className="badge-ia">Asistencia Inmediata</span>
          <h1>Inicia tu <span>Proyecto</span></h1>
        </header>

        <div className="contacto-grid">
          <div className="info-contacto-ia">
            <h2>Canales Directos</h2>
            
            <div className="info-item-ia">
              <FaPhone className="react-icon-ia" />
              <div>
                <p className="info-label">CENTRAL TELEFÓNICA</p>
                <p className="info-text">(+51) 962 219 340</p>
              </div>
            </div>

            <div className="info-item-ia">
              <FaEnvelope className="react-icon-ia" />
              <div>
                <p className="info-label">CORREO CORPORATIVO</p>
                <p className="info-text">dbary@gmail.com</p>
              </div>
            </div>

            <div className="info-item-ia">
              <FaMapMarkerAlt className="react-icon-ia" />
              <div>
                <p className="info-label">SHOWROOM CENTRAL</p>
                <p className="info-text">Ate - Lima, Perú</p>
              </div>
            </div>

            <div className="info-item-ia">
              <FaClock className="react-icon-ia" />
              <div>
                <p className="info-label">OPERACIONES</p>
                <p className="info-text">Lun - Vie: 8:00 - 18:00</p>
                <p className="info-text">Sáb: 9:00 - 13:00</p>
              </div>
            </div>
          </div>

          <form className="formulario-ia" onSubmit={handleSubmit} noValidate>
            <div className="form-header-ia">
              <h2>Solicitar Cotización Digital</h2>
              <p>Análisis de materiales y presupuesto estimado en 24h.</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez" />
              </div>
              <div className="form-group">
                <label>Teléfono Movil</label>
                <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="999 999 999" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email de contacto</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="nombre@correo.com" />
              </div>
              <div className="form-group">
                <label>Estructura Principal</label>
                <select name="tipo" value={formData.tipo} onChange={handleChange}>
                  <option value="">Selecciona tipo</option>
                  <option value="cocina">Cocina Integral</option>
                  <option value="oficina">Muebles de Oficina</option>
                  <option value="comedor">Comedor</option>
                  <option value="mueble">Muebles en General</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Rango de Inversión (S/)</label>
              <select name="presupuesto" value={formData.presupuesto} onChange={handleChange}>
                <option value="">Selecciona un rango</option>
                <option value="1000-2000">1,000 - 2,000</option>
                <option value="2000-5000">2,000 - 5,000</option>
                <option value="5000+">Más de 5,000</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Especificaciones Técnicas</label>
              <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Indica medidas aproximadas o colores de melamina preferidos..."></textarea>
            </div>

            <div className="checkbox-ia">
              <input type="checkbox" name="acepta" checked={formData.acepta} onChange={handleChange} id="acepta" />
              <label htmlFor="acepta">Acepto el procesamiento de mis datos para el diseño.</label>
            </div>

            <button className="btn-enviar-ia" type="submit">Generar Solicitud →</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;