import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaShieldAlt, FaUpload } from "react-icons/fa";
import "./Denuncia.css";

const Denuncia = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
  });
  
  const [preview, setPreview] = useState(null);
  const [notificacion, setNotificacion] = useState({ visible: false, tipo: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
    <div className="denuncia-page-wrapper">
      <Navbar />

      {notificacion.visible && (
        <div className={`notificacion-push ${notificacion.tipo}`}>
          <div className="push-icon">
            {notificacion.tipo === "exito" ? "✓" : "!"}
          </div>
          <div className="push-content">
            <div className="push-header">
              <strong>SISTEMA DE SEGURIDAD</strong>
              <span>ahora</span>
            </div>
            <p>
              {notificacion.tipo === "exito" 
                ? "Registro completado bajo protocolo de encriptación." 
                : "Error: Faltan parámetros obligatorios en el reporte."}
            </p>
          </div>
        </div>
      )}

      <div className="denuncia-container">
        <header className="denuncia-header">
          <h1>Canal de <span>Denuncias</span></h1>
          <p className="subtitulo">
            Reporta incidentes de forma segura. Tu información será procesada con total confidencialidad.
          </p>
        </header>

        <div className="denuncia-box-ia">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group-ia">
              <label>Identificación del Reportante</label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre completo o 'Anónimo'" 
              />
            </div>

            <div className="form-group-ia">
              <label>Categoría del Incidente</label>
              <select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="">Seleccionar categoría...</option>
                <option value="Servicio">Falla en Servicio</option>
                <option value="Producto">Defecto de Fabricación</option>
                <option value="Conducta">Conducta Inapropiada</option>
                <option value="Otros">Otros Incidentes</option>
              </select>
            </div>

            <div className="form-group-ia">
              <label>Descripción Detallada</label>
              <textarea 
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Explique los hechos con precisión..."
              ></textarea>
            </div>

            <div className="form-group-ia">
              <label className="upload-label">
                <FaUpload /> Adjuntar Evidencia Digital
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
              </label>

              {preview && (
                <div className="preview-box-ia">
                  <img src={preview} alt="Vista previa" />
                  <div className="scan-line"></div>
                </div>
              )}
            </div>

            <button type="submit" className="btn-denunciar-ia">
              <FaShieldAlt /> Procesar Reporte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Denuncia;