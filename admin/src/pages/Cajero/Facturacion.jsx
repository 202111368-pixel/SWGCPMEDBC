import React, { useState } from 'react';
import "../../styles/pages/Cajero/Facturacion.css";

const Facturacion = () => {
  const [tipoComprobante, setTipoComprobante] = useState('boleta');
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    dni: '',
    ruc: '',
    razonSocial: '',
    direccion: '',
    telefono: '',
    email: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="seccion-paso fade-in">

      {/* Bloque principal */}
      <h3 className="factura-titulo">Datos de Facturación</h3>
      <div className="factura-card">

        {/* Tipo de comprobante */}
        <p className="factura-label">Tipo de comprobante</p>
        <div className="factura-radio-group">
          <label className="factura-radio-label">
            <input
              type="radio"
              name="comprobante"
              value="boleta"
              checked={tipoComprobante === 'boleta'}
              onChange={() => setTipoComprobante('boleta')}
            />
            <span className={tipoComprobante === 'boleta' ? 'radio-text active' : 'radio-text'}>
              Boleta
            </span>
          </label>
          <label className="factura-radio-label">
            <input
              type="radio"
              name="comprobante"
              value="factura"
              checked={tipoComprobante === 'factura'}
              onChange={() => setTipoComprobante('factura')}
            />
            <span className={tipoComprobante === 'factura' ? 'radio-text active' : 'radio-text'}>
              Factura
            </span>
          </label>
        </div>

        {/* Campos dinámicos según tipo */}
        <div className="factura-form-grid">
          {tipoComprobante === 'boleta' ? (
            <>
              <div className="factura-form-group">
                <input
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  className="modal-input"
                />
              </div>
              <div className="factura-form-group">
                <input
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="DNI"
                  maxLength={8}
                  className="modal-input"
                />
                <span className="factura-hint">8 dígitos</span>
              </div>
            </>
          ) : (
            <>
              <div className="factura-form-group">
                <input
                  name="ruc"
                  value={formData.ruc}
                  onChange={handleChange}
                  placeholder="RUC"
                  maxLength={11}
                  className="modal-input"
                />
                <span className="factura-hint">11 dígitos</span>
              </div>
              <div className="factura-form-group">
                <input
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleChange}
                  placeholder="Razón Social"
                  className="modal-input"
                />
              </div>
            </>
          )}

          <div className="factura-form-group">
            <input
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              placeholder="Dirección *"
              className="modal-input"
            />
          </div>

          <div className="factura-form-group">
            <input
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono *"
              maxLength={9}
              className="modal-input"
            />
            <span className="factura-hint">9 dígitos</span>
          </div>

          <div className="factura-form-group full-width">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              type="email"
              className="modal-input"
            />
          </div>
        </div>
      </div>

      {/* Observaciones */}
      <h3 className="factura-titulo" style={{ marginTop: '24px' }}>Detalles u Observaciones</h3>
      <div className="factura-card">
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          placeholder="Observaciones"
          rows={4}
          className="factura-textarea"
        />
      </div>

    </div>
  );
};

export default Facturacion;