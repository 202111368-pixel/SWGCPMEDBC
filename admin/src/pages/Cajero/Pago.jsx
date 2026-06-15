import React, { useState } from 'react'; 
import emailjs from '@emailjs/browser';
import "../../styles/pages/Cajero/Pago.css";
import qrYape from '../../assets/yape.png';

const QR_YAPE = qrYape; 

const Pago = ({ itemAPagar, totalCalculado, productsList }) => {
  const [metodoSeleccionado, setMetodoSeleccionado] = useState('tarjeta');
  const [pagoAprobado, setPagoAprobado] = useState(false);
  const [emailGlobal, setEmailGlobal] = useState('');
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    vencimiento: '',
    cvv: '',
    nombre: '',
    cuotas: '1',
    terminos: false,
  });

  const handleTarjeta = (e) => {
    const { name, value, type, checked } = e.target;
    setTarjeta(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const formatNumero = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const obtenerMontoTotal = () => {
    if (productsList && productsList.length > 0) {
      return productsList.reduce((acc, item) => acc + ((item.precio || item.total || 0) * (item.cantidad || 1)), 0);
    }
    if (itemAPagar) {
      return (itemAPagar.precio || itemAPagar.total || 0) * (itemAPagar.cantidad || 1);
    }
    return totalCalculado || 0;
  };

  const enviarCorreoBoleta = (productosProcesados, totalFinal, emailCliente) => {
    emailjs.init('TU_PUBLIC_KEY_AQUI');

    const listaProductosHTML = productosProcesados.map(item => 
      `<li style="margin-bottom: 8px;"><strong>${item.producto}</strong> (x${item.cantidad}) - S/ ${(item.total).toFixed(2)}</li>`
    ).join('');

    const templateParams = {
      to_email: emailCliente.trim(),
      to_name: tarjeta.nombre.trim() || "Cliente Registrado",
      nro_comprobante: "CV001",
      fecha_venta: new Date().toLocaleString("es-PE"),
      metodo_pago: metodoSeleccionado.toUpperCase(),
      total_pago: `S/ ${totalFinal.toFixed(2)}`,
      productos_lista: `<ul style="padding-left: 20px; color: #333;">${listaProductosHTML}</ul>`
    };

    emailjs.send(
      'TU_SERVICE_ID_AQUI', 
      'template_7ib4w45', 
      templateParams
    )
    .then((response) => {
      console.log(response.status, response.text);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const confirmarPago = () => {
    const listaAProcesar = productsList && productsList.length > 0 
      ? productsList 
      : (itemAPagar ? [itemAPagar] : []);

    const ventasRegistradas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    const nuevosProductosVenta = [];
    let sumaTotalCalculada = 0;

    listaAProcesar.forEach((item, index) => {
      const cantidadUnidades = item.cantidad || 1;
      const precioBase = item.precio || (item.total ? (item.total / cantidadUnidades) : 0) || (totalCalculado / listaAProcesar.length) || 0;
      const precioTotalItem = precioBase * cantidadUnidades;
      sumaTotalCalculada += precioTotalItem;

      const datosVenta = {
        id: Date.now() + index, 
        producto: item.nombre || item.producto || "Producto General",
        venta: `S/ ${precioTotalItem.toFixed(2)}`,
        cantidad: cantidadUnidades, 
        total: precioTotalItem,
        metodoPago: metodoSeleccionado.charAt(0).toUpperCase() + metodoSeleccionado.slice(1),
        estado: "VALIDADO",
        fecha: new Date().toLocaleDateString("es-PE"),
        imagen: item.imagen || item.imagenUrl || "https://via.placeholder.com/80x60?text=Producto"
      };

      nuevosProductosVenta.push(datosVenta);
      ventasRegistradas.push(datosVenta);
    });

    localStorage.setItem("ventas_registradas", JSON.stringify(ventasRegistradas));
    window.dispatchEvent(new Event("ventaRegistrada"));
    
    const emailDestino = emailGlobal ? emailGlobal : "tu-correo-personal@gmail.com";
    
    enviarCorreoBoleta(nuevosProductosVenta, sumaTotalCalculada, emailDestino);
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    setPagoAprobado(true);
  };

  const totalFinalDeVenta = obtenerMontoTotal();

  if (pagoAprobado) {
    const fechaVenta = new Date().toLocaleString("es-PE");
    return (
      <div className="seccion-paso fade-in">
        <div className="pago-aprobado-card">
          <div className="pago-aprobado-icono">✓</div>
          <h2 className="pago-aprobado-titulo">¡Pago Aprobado!</h2>
          <p className="pago-aprobado-sub">
            Tu compra se ha procesado exitosamente.<br />
            Se ha enviado un comprobante a tu correo electrónico.
          </p>
          <div className="pago-aprobado-detalle">
            <h4>Detalles de la Compra</h4>
            <div className="pago-detalle-grid">
              <div><span className="pago-detalle-label">Fecha de venta</span><span>{fechaVenta}</span></div>
              <div><span className="pago-detalle-label">Tipo de venta</span><span>V001</span></div>
              <div><span className="pago-detalle-label">Tipo de Comprobante</span><span>Boleta</span></div>
              <div><span className="pago-detalle-label">N° de Comprobante</span><span>CV001</span></div>
              <div><span className="pago-detalle-label">Método de Pago</span><span>{metodoSeleccionado.toUpperCase()}</span></div>
            </div>
            <div className="pago-aprobado-total">S/ {totalFinalDeVenta.toFixed(2)}</div>
            <div className="pago-orden-aviso">
              📦 <strong>Orden de Compra</strong><br />
              <span>No se requiere orden de compra — Stock suficiente.</span>
            </div>
          </div>
          <button className="btn-continuar-comprando" onClick={() => { setPagoAprobado(false); setMetodoSeleccionado('tarjeta'); setEmailGlobal(''); }}>
            CONTINUAR COMPRANDO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="seccion-paso fade-in">
      <h3 className="pago-titulo">Pago con Mercado Pago</h3>

      <div className="pago-layout">
        <div className="pago-card">
          <p className="pago-label">Medios de pago</p>

          <div className="pago-tabs">
            <button
              className={`pago-tab ${metodoSeleccionado === 'tarjeta' ? 'active' : ''}`}
              onClick={() => setMetodoSeleccionado('tarjeta')}
            >
              💳 Tarjeta de crédito
            </button>
            <div className="pago-tab-iconos">
              <button
                className={`pago-tab-icono ${metodoSeleccionado === 'yape' ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado('yape')}
                title="Yape"
              >
                💜 Yape
              </button>
              <button
                className={`pago-tab-icono ${metodoSeleccionado === 'bcp' ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado('bcp')}
                title="BCP"
              >
                🏦 BCP
              </button>
              <button
                className={`pago-tab-icono ${metodoSeleccionado === 'bn' ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado('bn')}
                title="Banco de la Nación"
              >
                🏛️ BN
              </button>
            </div>
          </div>

          {metodoSeleccionado === 'yape' && (
            <div className="yape-qr-section fade-in">
              <p className="yape-instruccion">Escanea el QR con tu app de Yape para completar el pago.</p>
              <img src={QR_YAPE} alt="QR Yape" className="yape-qr-img" />  
              <p className="yape-numero">📱 Número Yape: <strong>999 888 777</strong></p>
              
              <div className="form-group-pago" style={{ marginTop: '20px' }}>
                <label className="pago-input-label">Email obligatorio para envío de boleta</label>
                <input
                  value={emailGlobal}
                  onChange={(e) => setEmailGlobal(e.target.value)}
                  placeholder="ejemplo@mail.com"
                  type="email"
                  className="modal-input"
                />
              </div>
              
              <button 
                className="btn-pagar" 
                onClick={confirmarPago} 
                style={{ marginTop: '15px' }}
                disabled={!emailGlobal.includes('@')}
              >
                Pagar con Yape
              </button>
            </div>
          )}

          {['tarjeta', 'bcp', 'bn'].includes(metodoSeleccionado) && (
            <div className="tarjeta-form fade-in">
              {metodoSeleccionado !== 'tarjeta' && (
                <p className="pago-banco-info">
                  {metodoSeleccionado === 'bcp' ? '🏦 BCP — ' : '🏛️ Banco de la Nación — '}
                  Ingresa los datos de tu tarjeta débito/crédito
                </p>
              )}

              <div className="form-group-pago">
                <label className="pago-input-label">Número de la tarjeta</label>
                <input
                  name="numero"
                  value={formatNumero(tarjeta.numero)}
                  onChange={(e) => setTarjeta(prev => ({ ...prev, numero: e.target.value.replace(/\s/g, '') }))}
                  placeholder="1234 1234 1234 1234"
                  className="modal-input"
                  maxLength={19}
                />
              </div>

              <div className="pago-row-2">
                <div className="form-group-pago">
                  <label className="pago-input-label">Vencimiento</label>
                  <input
                    name="vencimiento"
                    value={tarjeta.vencimiento}
                    onChange={handleTarjeta}
                    placeholder="MM/AA"
                    className="modal-input"
                    maxLength={5}
                  />
                </div>
                <div className="form-group-pago">
                  <label className="pago-input-label">Código de seguridad</label>
                  <div className="cvv-wrapper">
                    <input
                      name="cvv"
                      value={tarjeta.cvv}
                      onChange={handleTarjeta}
                      placeholder="S/ 0.0"
                      className="modal-input"
                      maxLength={4}
                    />
                    <span className="cvv-icono">🛡️</span>
                  </div>
                </div>
              </div>

              <div className="form-group-pago">
                <label className="pago-input-label">Nombre como aparece en la tarjeta</label>
                <input
                  name="nombre"
                  value={tarjeta.nombre}
                  onChange={handleTarjeta}
                  placeholder="Titular"
                  className="modal-input"
                />
              </div>

              <div className="form-group-pago">
                <label className="pago-input-label">Cuotas</label>
                <select name="cuotas" value={tarjeta.cuotas} onChange={handleTarjeta} className="modal-input">
                  <option value="1">1 cuota</option>
                  <option value="3">3 cuotas</option>
                  <option value="6">6 cuotas</option>
                  <option value="12">12 cuotas</option>
                </select>
              </div>

              <p className="pago-seccion-sub">Completa la información</p>

              <div className="form-group-pago">
                <label className="pago-input-label">Email</label>
                <input
                  value={emailGlobal}
                  onChange={(e) => setEmailGlobal(e.target.value)}
                  placeholder="ejemplo@mail.com"
                  type="email"
                  className="modal-input"
                />
              </div>

              <label className="pago-terminos">
                <input
                  type="checkbox"
                  name="terminos"
                  checked={tarjeta.terminos}
                  onChange={handleTarjeta}
                />
                <span>Términos y condiciones</span>
              </label>

              <button
                className="btn-pagar"
                onClick={confirmarPago}
                disabled={!tarjeta.terminos || !emailGlobal.includes('@')}
              >
                Pagar S/ {totalFinalDeVenta.toFixed(2)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pago;