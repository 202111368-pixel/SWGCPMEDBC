import { useState } from 'react';
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

  const correosAutorizados = [
    "202111368@urp.edu.pe",
    "202212094@urp.edu.pe",
    "202212089@urp.edu.pe",
    "202211306@urp.edu.pe",
    "202210071@urp.edu.pe",
    "202312207@urp.edu.pe",
    "202512097@urp.edu.pe",
    "202310524@urp.edu.pe",
    "202110238@urp.edu.pe",
    "202210064@urp.edu.pe"
  ];

  const handleTarjeta = (e) => {
    const { name, value, type, checked } = e.target;
    setTarjeta(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const formatNumero = (val) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const obtenerMontoTotal = () => {
    if (totalCalculado && totalCalculado > 0) {
      return totalCalculado;
    }
    if (productsList && productsList.length > 0) {
      return productsList.reduce((acc, item) => acc + ((item.precio || item.total || 0) * (item.cantidad || 1)), 0);
    }
    if (itemAPagar) {
      return (itemAPagar.precio || itemAPagar.total || 0) * (itemAPagar.cantidad || 1);
    }
    return 0;
  };

  const enviarCorreoBoleta = (productosProcesados, totalFinal, emailCliente, metodoUtilizado) => {
    const emailLimpio = emailCliente.trim().toLowerCase().replace(/,/g, '.');
    
    if (!correosAutorizados.map(c => c.toLowerCase()).includes(emailLimpio)) {
      console.log("El correo electrónico no pertenece a la lista autorizada institucional.");
      return;
    }

    // Se fuerza la conversión a minúsculas para evitar fallas con 'BCP', 'YAPE', etc.
    const mPago = metodoUtilizado.toLowerCase();
    if (mPago !== 'yape' && mPago !== 'bcp' && mPago !== 'bn') {
      console.log("Método de pago no apto para notificación automatizada de boleta.");
      return;
    }

    // ⚠️ REEMPLAZA CON TU PUBLIC KEY REAL DE EMAILJS
    emailjs.init('TU_PUBLIC_KEY_AQUI');

    const listaProductosHTML = productosProcesados.map(item => 
      `<li style="margin-bottom: 8px;"><strong>${item.producto}</strong> (x${item.cantidad}) - S/ ${(item.total).toFixed(2)}</li>`
    ).join('');

    const templateParams = {
      to_email: emailLimpio,
      to_name: tarjeta.nombre.trim() || "Cliente Registrado",
      nro_comprobante: "CV001",
      fecha_venta: new Date().toLocaleString("es-PE"),
      metodo_pago: mPago.toUpperCase(),
      total_pago: `S/ ${totalFinal.toFixed(2)}`,
      productos_lista: `<ul style="padding-left: 20px; color: #333;">${listaProductosHTML}</ul>`
    };

    // ⚠️ REEMPLAZA CON TU SERVICE ID REAL DE EMAILJS
    emailjs.send(
      'TU_SERVICE_ID_AQUI', 
      'template_7ib4w45', 
      templateParams
    )
    .then((response) => {
      console.log("Boleta enviada con éxito:", response.status, response.text);
    })
    .catch((err) => {
      console.error("Fallo al enviar correo por EmailJS:", err);
    });
  };

  const confirmarPago = () => {
    const listaAProcesar = productsList && productsList.length > 0 
      ? productsList 
      : (itemAPagar ? [itemAPagar] : []);

    const ventasRegistradas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    const nuevosProductosVenta = [];
    const totalFinalDeVenta = obtenerMontoTotal();

    listaAProcesar.forEach((item, index) => {
      const cantidadUnidades = item.cantidad || 1;
      const precioBase = item.precio || (item.total ? (item.total / cantidadUnidades) : 0) || (totalFinalDeVenta / listaAProcesar.length) || 0;
      const precioTotalItem = precioBase * cantidadUnidades;

      const datosVenta = {
        id: Date.now() + index, 
        producto: item.nombre || item.producto || "Producto General",
        venta: `S/ ${precioTotalItem.toFixed(2)}`,
        cantidad: cantidadUnidades, 
        total: precioTotalItem,
        metodoPago: metodoSeleccionado.toUpperCase(),
        estado: "VALIDADO",
        fecha: new Date().toLocaleDateString("es-PE"),
        imagen: item.imagen || item.imagenUrl || "https://via.placeholder.com/80x60?text=Producto"
      };

      nuevosProductosVenta.push(datosVenta);
      ventasRegistradas.push(datosVenta);
    });

    localStorage.setItem("ventas_registradas", JSON.stringify(ventasRegistradas));
    window.dispatchEvent(new Event("ventaRegistrada"));
    
    enviarCorreoBoleta(nuevosProductosVenta, totalFinalDeVenta, emailGlobal, metodoSeleccionado);
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    setPagoAprobado(true);
  };

  const totalFinalDeVenta = obtenerMontoTotal();

  if (pagoAprobado) {
    const fechaVenta = new Date().toLocaleString("es-PE");
    return (
      <div className="seccion-paso fade-in">
        <div className="pago-aprobado-card">
          <div className="pago-aprobado-icono">&#10003;</div>
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
              &#128230; <strong>Orden de Compra</strong><br />
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
              &#128179; Tarjeta de crédito
            </button>
            <div className="pago-tab-iconos">
              <button
                className={`pago-tab-icono ${metodoSeleccionado === 'yape' ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado('yape')}
                title="Yape"
              >
                &#128188; Yape
              </button>
              <button
                className={`pago-tab-icono ${metodoSeleccionado === 'bcp' ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado('bcp')}
                title="BCP"
              >
                &#127974; BCP
              </button>
              <button
                className={`pago-tab-icono ${metodoSeleccionado === 'bn' ? 'active' : ''}`}
                onClick={() => setMetodoSeleccionado('bn')}
                title="Banco de la Nación"
              >
                &#127979; BN
              </button>
            </div>
          </div>

          {metodoSeleccionado === 'yape' && (
            <div className="yape-qr-section fade-in">
              <p className="yape-instruccion">Escanea el QR con tu app de Yape para completar el pago.</p>
              <img src={QR_YAPE} alt="QR Yape" className="yape-qr-img" />
              <p className="yape-numero">&#128241; Número Yape: <strong>999 888 777</strong></p>
              
              <div className="form-group-pago" style={{ marginTop: '15px' }}>
                <label className="pago-input-label">Email de confirmación</label>
                <input
                  value={emailGlobal}
                  onChange={(e) => setEmailGlobal(e.target.value)}
                  placeholder="ejemplo@urp.edu.pe"
                  type="email"
                  className="modal-input"
                />
              </div>

              <button 
                className="btn-pagar" 
                onClick={confirmarPago} 
                disabled={!emailGlobal.includes('@')}
                style={{ marginTop: '25px' }}
              >
                Pagar con Yape
              </button>
            </div>
          )}

          {['tarjeta', 'bcp', 'bn'].includes(metodoSeleccionado) && (
            <div className="tarjeta-form fade-in">
              <p className="pago-banco-info">
                {metodoSeleccionado === 'tarjeta' && 'Tarjeta de crédito — '}
                {metodoSeleccionado === 'bcp' && 'BCP — '}
                {metodoSeleccionado === 'bn' && 'Banco de la Nación — '}
                Ingresa los datos correspondientes
              </p>

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
                      placeholder="CVV"
                      className="modal-input"
                      maxLength={4}
                    />
                    <span className="cvv-icono">&#128737;</span>
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

              {metodoSeleccionado === 'tarjeta' && (
                <div className="form-group-pago">
                  <label className="pago-input-label">Cuotas</label>
                  <select name="cuotas" value={tarjeta.cuotas} onChange={handleTarjeta} className="modal-input">
                    <option value="1">1 cuota</option>
                    <option value="3">3 cuotas</option>
                    <option value="6">6 cuotas</option>
                    <option value="12">12 cuotas</option>
                  </select>
                </div>
              )}

              <p className="pago-seccion-sub">Completa la información</p>

              <div className="form-group-pago">
                <label className="pago-input-label">Email</label>
                <input
                  value={emailGlobal}
                  onChange={(e) => setEmailGlobal(e.target.value)}
                  placeholder="ejemplo@urp.edu.pe"
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