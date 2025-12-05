import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
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

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);

    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <>
      <Navbar />

      <div className="contacto-container">

        <h1>Contáctanos</h1>
        <p className="subtitulo">
          ¿Tienes un proyecto en mente? Trabajemos juntos para hacerlo realidad.
        </p>

        <div className="contacto-grid">

          <div className="info-contacto">
            <h2>Información de Contacto</h2>

            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <p><strong>Teléfono</strong></p>
                <p>(+51) 962 219 340</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">✉️</span>
              <div>
                <p><strong>Email</strong></p>
                <p>vidu@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">📍</span>
              <div>
                <p><strong>Ubicación</strong></p>
                <p>Ate - Lima, Perú</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">⏰</span>
              <div>
                <p><strong>Horarios</strong></p>
                <p>Lun - Vie: 8:00 - 18:00</p>
                <p>Sáb: 9:00 - 13:00</p>
              </div>
            </div>

            <div className="whatsapp-box">
              <p>💬 WhatsApp Directo</p>
              <a className="btn-whatsapp" href="#" target="_blank">
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          <form className="formulario" onSubmit={handleSubmit}>
            <h2>Solicitar Cotización</h2>
            <p>Completa el formulario y te contactaremos dentro de las próximas 24 horas.</p>

            <div className="form-row">
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label>Teléfono *</label>
                <input 
                  type="text" 
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  placeholder="Tu número de teléfono"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label>Tipo de Proyecto</label>
                <select 
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="">Selecciona el tipo</option>
                  <option value="cocina">Cocina Integral</option>
                  <option value="oficina">Muebles de Oficina</option>
                  <option value="comedor">Comedor</option>
                  <option value="mueble">Muebles en General</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Presupuesto Estimado</label>
                <select 
                  name="presupuesto"
                  value={formData.presupuesto}
                  onChange={handleChange}
                >
                  <option value="">Rango de presupuesto</option>
                  <option value="500-1000">S/ 500 - S/ 1000</option>
                  <option value="1000-2000">S/ 1000 - S/ 2000</option>
                  <option value="2000-5000">S/ 2000 - S/ 5000</option>
                  <option value="5000+">Más de S/ 5000</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Describe tu proyecto *</label>
              <textarea 
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                placeholder="Cuéntanos medidas, estilo, etc."
              ></textarea>
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                name="acepta"
                checked={formData.acepta}
                onChange={handleChange}
              />
              <label>Acepto recibir comunicaciones comerciales.</label>
            </div>

            <button className="btn-enviar" type="submit">
              ✈️ Enviar Consulta
            </button>

            {enviado && (
              <div className="mensaje-exito">
                ✔ Consulta enviada exitosamente
              </div>
            )}
          </form>

        </div>
      </div>
    </>
  );
};

export default Contacto;
