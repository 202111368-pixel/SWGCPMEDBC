import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Denuncia.css";

const Denuncia = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
  });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notificacion, setNotificacion] = useState({ visible: false, tipo: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.tipo || !formData.descripcion) {
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
            <p>Se envió la denuncia a nuestra empresa exitosamente.</p>
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

      <div className="denuncia-container">
        <h1>Denuncia</h1>
        <p className="subtitulo">
          Si deseas reportar algún incidente o irregularidad, completa el formulario.
        </p>

        <div className="denuncia-box">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Nombre Completo *</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo" 
              />
            </div>

            <div className="form-group">
              <label>Tipo de Incidente *</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="">Seleccionar</option>
                <option value="Robo">Robo</option>
                <option value="Acoso">Acoso</option>
                <option value="Vandalismo">Vandalismo</option>
                <option value="Accidente">Accidente</option>
                <option value="Otros">Otros</option>
              </select>
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <textarea 
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe el incidente (lugar, fecha, detalles)"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Evidencia (Imagen)</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />

              {preview && (
                <div className="preview-box">
                  <img src={preview} alt="Vista previa" />
                </div>
              )}
            </div>

            <button type="submit" className="btn-denunciar">
              Enviar Denuncia
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Denuncia;