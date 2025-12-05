import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Denuncia.css";

const Denuncia = () => {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);

    setTimeout(() => {
      setEnviado(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />

      <div className="denuncia-container">
        <h1>Denuncia</h1>
        <p className="subtitulo">
          Si deseas reportar algún incidente o irregularidad, completa el formulario.
        </p>

        <div className="denuncia-box">

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Nombre Completo *</label>
              <input type="text" required placeholder="Tu nombre completo" />
            </div>

            <div className="form-group">
              <label>Tipo de Incidente *</label>
              <select required>
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
              <textarea required placeholder="Describe el incidente (lugar, fecha, detalles)"></textarea>
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

            {enviado && (
              <div className="mensaje-exito">
                ✔ Denuncia enviada exitosamente
              </div>
            )}

          </form>

        </div>
      </div>
    </>
  );
};

export default Denuncia;
