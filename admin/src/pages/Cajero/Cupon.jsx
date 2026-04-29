import React, { useState } from 'react';
import "../../styles/pages/Cajero/Cupon.css";

const Cupon = () => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cuponAplicado, setCuponAplicado] = useState(null);

  // ✅ IDs de 6 dígitos que vienen de la tabla del Administrador
  const cuponesValidos = {
    'HID-101': { descuento: 1000, tipo: 'fijo',       cliente: 'Juan Quiroz',          descripcion: 'S/ 1000.00 de descuento' },
    'HID-629': { descuento: 2000, tipo: 'fijo',       cliente: 'Geral Osorio',         descripcion: 'S/ 2000.00 de descuento' },
    'HID-704': { descuento: 2000, tipo: 'fijo',       cliente: 'Geral Osorio',         descripcion: 'S/ 2000.00 de descuento' },
    'HID-104': { descuento: 350,  tipo: 'fijo',       cliente: 'Carpintería Los Andes', descripcion: 'S/ 350.50 de descuento' },
  };

  const handleChange = (e) => {
    // Acepta letras, números y guión — máximo 7 caracteres (ej: HID-101)
    const valor = e.target.value.toUpperCase().slice(0, 7);
    setCodigo(valor);
    setMensaje(null);
    setCuponAplicado(null);
  };

  const aplicarCupon = () => {
    if (codigo.length < 6) {
      setMensaje({ tipo: 'error', texto: 'El código debe tener al menos 6 caracteres.' });
      return;
    }

    const cupon = cuponesValidos[codigo];
    if (cupon) {
      setCuponAplicado(cupon);
      setMensaje({ tipo: 'exito', texto: `¡Cupón aplicado! ${cupon.descripcion} — Cliente: ${cupon.cliente}` });
    } else {
      setMensaje({ tipo: 'error', texto: 'Código inválido o no encontrado en el sistema.' });
    }
  };

  const eliminarCupon = () => {
    setCodigo('');
    setCuponAplicado(null);
    setMensaje(null);
  };

  return (
    <div className="seccion-paso fade-in">
      <h3 className="cupon-titulo">Aplicar Cupón de Descuento</h3>

      <div className="cupon-card">
        <div className="cupon-header">
          <div className="cupon-icono">🏷️</div>
          <p className="cupon-pregunta">¿Tienes un cupón de descuento?</p>
          <p className="cupon-subtexto">Ingresa el código del cupón para aplicar el descuento a tu compra</p>
        </div>

        <div className="cupon-input-row">
          <div className="cupon-input-wrapper">
            <input
              type="text"
              value={codigo}
              onChange={handleChange}
              placeholder="Ej: HID-101"
              className={`modal-input cupon-input ${cuponAplicado ? 'input-success' : ''}`}
              maxLength={7}
              disabled={!!cuponAplicado}
            />
            <span className="cupon-counter">{codigo.length}/7</span>
          </div>

          {cuponAplicado ? (
            <button className="btn-eliminar-cupon" onClick={eliminarCupon}>
              ✕ QUITAR
            </button>
          ) : (
            <button
              className="btn-aplicar"
              onClick={aplicarCupon}
              disabled={codigo.length === 0}
            >
              APLICAR
            </button>
          )}
        </div>

        {mensaje && (
          <div className={`cupon-mensaje ${mensaje.tipo}`}>
            {mensaje.tipo === 'exito' ? '✓' : '✕'} {mensaje.texto}
          </div>
        )}

        {cuponAplicado && (
          <div className="cupon-aplicado-detalle">
            <span className="cupon-tag-badge">#{codigo}</span>
            <span className="cupon-descuento-texto">{cuponAplicado.descripcion}</span>
          </div>
        )}

        <p className="cupon-tip">
          💡 <strong>Tip:</strong> Los cupones pueden ofrecerte descuentos en el total de tu compra o envío gratuito.
        </p>
      </div>
    </div>
  );
};

export default Cupon;