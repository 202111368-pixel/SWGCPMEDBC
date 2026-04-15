import React, { useState, useEffect } from 'react';
import { 
  FaUnlock, FaChevronDown, FaMoneyBillWave, 
  FaCheck, FaChartPie, FaWallet, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt 
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "../../styles/pages/Cajero/AdmintrarCaja.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdministrarCaja = () => {
  const [status, setStatus] = useState('CERRADA'); 
  const [showOpciones, setShowOpciones] = useState(false);
  const [showMovimientos, setShowMovimientos] = useState(false);
  
  const [itemAPagar, setItemAPagar] = useState(null);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("");
  const [pasoPago, setPasoPago] = useState(1); 
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", email: "", telefono: "", direccion: ""
  });

  const [datos, setDatos] = useState({
    montoInicial: 500.00,
    ingresos: 200.00,
    totalFinal: 700.00
  });

  useEffect(() => {
    const pendingItem = JSON.parse(localStorage.getItem("item_a_pagar_temporal"));
    if (pendingItem) {
      setItemAPagar(pendingItem);
      setStatus('ABIERTA'); 
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const confirmarApertura = () => setStatus('ABIERTA');

  const procesarPagoFinal = () => {
    if (Object.values(formData).some(val => val === "")) {
      alert("Por favor, complete todos los campos de facturación.");
      return;
    }

    const ventas = JSON.parse(localStorage.getItem("ventas_admin_3001")) || [];
    const ventasActualizadas = ventas.map(v => 
      v.id === itemAPagar.id ? { ...v, estado: "PAGADO", metodo: metodoSeleccionado, cliente: formData.nombre } : v
    );
    localStorage.setItem("ventas_admin_3001", JSON.stringify(ventasActualizadas));

    const montoVenta = parseFloat(itemAPagar.venta.replace(/[^\d.-]/g, ''));
    
    setDatos(prev => ({
      ...prev,
      ingresos: prev.ingresos + montoVenta,
      totalFinal: prev.totalFinal + montoVenta
    }));

    localStorage.removeItem("item_a_pagar_temporal");
    setItemAPagar(null);
    setPasoPago(1);
    setMetodoSeleccionado("");
    alert("¡Pago procesado con éxito!");
  };

  return (
    <div className="admin-caja-wrapper">
      {/* MODAL ÉXITO APERTURA */}
      {status === 'EXITOSO' && (
        <div className="caja-modal-overlay">
          <div className="caja-modal-content">
            <div className="caja-check-icon"><FaCheck /></div>
            <h2>¡Éxito!</h2>
            <p>Caja Abierta con Éxito</p>
            <button className="caja-btn-ok" onClick={confirmarApertura}>OK</button>
          </div>
        </div>
      )}

      {/* MODAL DE PAGO PASO A PASO */}
      {itemAPagar && (
        <div className="caja-modal-overlay">
          <div className="caja-pay-card wide">
            <header className="pay-header">
              <h3>{pasoPago === 1 ? "Método de Pago" : "Datos de Facturación"}</h3>
              <span className="pay-badge-amount">{itemAPagar.venta}</span>
            </header>

            {pasoPago === 1 ? (
              <div className="pay-step-1">
                <div className="pay-methods-grid">
                  <div className={`pay-method ${metodoSeleccionado === 'Yape' ? 'active' : ''}`} onClick={() => setMetodoSeleccionado('Yape')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Yape_logo.png" alt="Yape" />
                    <span>Yape</span>
                  </div>
                  <div className={`pay-method ${metodoSeleccionado === 'BCP' ? 'active' : ''}`} onClick={() => setMetodoSeleccionado('BCP')}>
                    <img src="https://logodownload.org/wp-content/uploads/2022/03/bcp-logo.png" alt="BCP" />
                    <span>BCP</span>
                  </div>
                  <div className={`pay-method ${metodoSeleccionado === 'BN' ? 'active' : ''}`} onClick={() => setMetodoSeleccionado('BN')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Banco_de_la_Naci%C3%B3n_del_Per%C3%BA_logo.svg/2560px-Banco_de_la_Naci%C3%B3n_del_Per%C3%BA_logo.svg.png" alt="BN" />
                    <span>Nación</span>
                  </div>
                </div>
                <button className="btn-next-pay" disabled={!metodoSeleccionado} onClick={() => setPasoPago(2)}>
                  Continuar con {metodoSeleccionado || "Seleccione uno"}
                </button>
              </div>
            ) : (
              <div className="pay-step-2">
                <div className="pay-form-grid">
                  <div className="input-group">
                    <label><FaUser /> Nombre</label>
                    <input name="nombre" placeholder="Ej. Jose" onChange={handleInputChange} />
                  </div>
                  <div className="input-group">
                    <label><FaUser /> Apellido</label>
                    <input name="apellido" placeholder="Ej. Yalta" onChange={handleInputChange} />
                  </div>
                  <div className="input-group">
                    <label><FaEnvelope /> Email</label>
                    <input name="email" type="email" placeholder="correo@ejemplo.com" onChange={handleInputChange} />
                  </div>
                  <div className="input-group">
                    <label><FaPhone /> Teléfono</label>
                    <input name="telefono" placeholder="987654321" onChange={handleInputChange} />
                  </div>
                  <div className="input-group full">
                    <label><FaMapMarkerAlt /> Dirección completa</label>
                    <input name="direccion" placeholder="Calle, Distrito, Número..." onChange={handleInputChange} />
                  </div>
                </div>
                <div className="pay-actions-final">
                  <button className="btn-confirm-pay" onClick={procesarPagoFinal}>
                    <FaWallet /> CONFIRMAR Y PAGAR
                  </button>
                  <button className="btn-back" onClick={() => setPasoPago(1)}>Regresar a métodos</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="caja-top-nav">
        <div className="caja-title-section">
          <h2>Administrar Caja - Movimientos</h2>
          <div className="caja-sub-info">
            <span>Fecha: 13/04/2026 - </span>
            <span className={`caja-badge ${status === 'ABIERTA' ? 'open' : 'closed'}`}>
              {status === 'ABIERTA' ? 'VIGENTE / ABIERTA' : 'CERRADA'}
            </span>
          </div>
        </div>

        <div className="caja-actions-row">
          <button className="caja-btn opt-green" onClick={() => setShowOpciones(!showOpciones)}>
            <FaChartPie /> Opciones <FaChevronDown />
          </button>
          <button className="caja-btn opt-blue" onClick={() => setShowMovimientos(!showMovimientos)}>
            <FaMoneyBillWave /> Movimientos <FaChevronDown />
          </button>
        </div>
      </div>

      <div className="caja-grid-container">
        <div className="caja-table-box">
          <table className="caja-data-table">
            <tbody>
              <tr><td><span className="caja-sq dark"></span> MONTO INICIAL</td><td className="caja-val">S/ {datos.montoInicial.toFixed(2)}</td></tr>
              <tr><td><span className="caja-sq green"></span> INGRESOS</td><td className="caja-val">S/ {datos.ingresos.toFixed(2)}</td></tr>
              <tr className="caja-row-hl"><td className="caja-txt-blue">TOTAL FINAL</td><td className="caja-val caja-txt-blue">S/ {datos.totalFinal.toFixed(2)}</td></tr>
            </tbody>
          </table>

          {status === 'CERRADA' && (
            <button className="caja-btn-open-big" onClick={() => setStatus('EXITOSO')}>
              <FaUnlock /> ABRIR CAJA
            </button>
          )}
        </div>

        <div className="caja-chart-box">
          <Pie 
            data={{
              labels: ['Inicial', 'Ingresos'],
              datasets: [{
                data: [datos.montoInicial, datos.ingresos],
                backgroundColor: ['#374151', '#4ade80'],
                borderWidth: 0
              }]
            }}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdministrarCaja;