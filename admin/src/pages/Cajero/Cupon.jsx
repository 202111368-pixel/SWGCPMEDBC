import { useState } from 'react';
import "../../styles/pages/Cajero/Cupon.css";

const Cupon = ({ alSiguientePaso, onAplicarDescuento, totalActual }) => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [mostrarBotonAceptar, setMostrarBotonAceptar] = useState(false);
  const [cuponConfirmado, setCuponConfirmado] = useState(false);

  const handleChange = (e) => {
    const valor = e.target.value.toUpperCase().slice(0, 7);
    setCodigo(valor);
    setMensaje(null);
    setMostrarBotonAceptar(false);
    setCuponConfirmado(false);
  };

  const aplicarCupon = () => {
    if (codigo.length < 3) {
      setMensaje({ tipo: 'error', texto: 'El código debe tener al menos 3 caracteres.' });
      return;
    }

    const montoDescuento = 50;

    if (onAplicarDescuento) {
      onAplicarDescuento(montoDescuento);
    }

    setMostrarBotonAceptar(true);
    setMensaje({ 
      tipo: 'exito', 
      texto: `¡Felicidades! Tienes un descuento aplicado para el código ${codigo}.` 
    });
  };

  const aceptarCuponYContinuar = () => {
    setCuponConfirmado(true);
    setMostrarBotonAceptar(false);
    setMensaje({ tipo: 'exito', texto: 'Cupón aceptado correctamente. Procediendo al siguiente paso...' });
    
    if (alSiguientePaso) {
      setTimeout(() => {
        alSiguientePaso();
      }, 1500);
    }
  };

  const eliminarCupon = () => {
    setCodigo('');
    setCuponConfirmado(false);
    setMostrarBotonAceptar(false);
    setMensaje(null);
    
    if (onAplicarDescuento) {
      onAplicarDescuento(0);
    }
  };

  return (
    <div className="seccion-paso fade-in">
      <h3 className="cupon-titulo">Aplicar Cupón de Descuento</h3>

      <div className="cupon-card">
        <div className="cupon-header">
          <div className="cupon-icono">&#127991;</div>
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
              className={`modal-input cupon-input ${mostrarBotonAceptar || cuponConfirmado ? 'input-success' : ''}`}
              maxLength={7}
              disabled={cuponConfirmado || mostrarBotonAceptar}
            />
            <span className="cupon-counter">{codigo.length}/7</span>
          </div>

          {cuponConfirmado ? (
            <button className="btn-eliminar-cupon" onClick={eliminarCupon}>
              &#10005; QUITAR
            </button>
          ) : (
            <button
              className="btn-aplicar"
              onClick={aplicarCupon}
              disabled={codigo.length === 0 || mostrarBotonAceptar}
            >
              APLICAR
            </button>
          )}
        </div>

        {mensaje && (
          <div className={`cupon-mensaje ${mensaje.tipo}`}>
            {mensaje.tipo === 'exito' ? '&#10003;' : '&#10005;'} {mensaje.texto}
          </div>
        )}

        {mostrarBotonAceptar && (
          <div className="contenedor-accion-aceptar">
            <button className="btn-aceptar-cupon" onClick={aceptarCuponYContinuar}>
              &#10003; ACEPTAR Y CONTINUAR
            </button>
          </div>
        )}

        {cuponConfirmado && (
          <div className="cupon-aplicado-detalle">
            <span className="cupon-tag-badge">#{codigo}</span>
            <span className="cupon-descuento-texto">Descuento Especial — listo</span>
          </div>
        )}

        <p className="cupon-tip">
          &#128161; <strong>Tip:</strong> Los cupones válidos te permiten reducir costes operativos de fabricación al instante.
        </p>
      </div>
    </div>
  );
};

export default Cupon;