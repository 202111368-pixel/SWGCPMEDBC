import React, { useState, useEffect } from 'react';
import { 
  FaUnlock, FaChevronDown, FaMoneyBillWave, 
  FaCheck, FaChartPie, FaWallet, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard
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
  const [formData, setFormData] = useState({
    nombre: "Jose", apellido: "Fabricio", email: "prueba.anaya.30@gmail.com", telefono: "986735706", direccion: "comas"
  });

  const [datos, setDatos] = useState({
    montoInicial: 500.00, ingresos: 200.00, totalFinal: 700.00
  });

  useEffect(() => {
    const pendingItem = JSON.parse(localStorage.getItem("item_a_pagar_temporal"));
    if (pendingItem) setItemAPagar(pendingItem);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Solución Line 36:9: Uso de confirmarApertura
  const confirmarApertura = () => setStatus('ABIERTA');

  const procesarPagoFinal = () => {
    if (!formData.nombre || !formData.email || !formData.direccion) {
      alert("Por favor, complete los campos obligatorios.");
      return;
    }
    
    // Solución Line 23:17: Uso de setDatos para actualizar el total tras el pago
    const montoVenta = parseFloat(itemAPagar.venta.replace(/[^\d.-]/g, ''));
    setDatos(prev => ({
      ...prev,
      ingresos: prev.ingresos + montoVenta,
      totalFinal: prev.totalFinal + montoVenta
    }));

    alert(`¡Pago procesado con ${metodoSeleccionado} con éxito!`);
    setItemAPagar(null);
    setMetodoSeleccionado("");
  };

  return (
    <div className="admin-caja-wrapper">
      {/* Solución Line 4:3: FaCheck implementado en el modal de éxito */}
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
          <button className="caja-btn opt-green" onClick={() => setShowOpciones(!showOpciones)}><FaChartPie /> Opciones <FaChevronDown /></button>
          <button className="caja-btn opt-blue" onClick={() => setShowMovimientos(!showMovimientos)}><FaMoneyBillWave /> Movimientos <FaChevronDown /></button>
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
              datasets: [{ data: [datos.montoInicial, datos.ingresos], backgroundColor: ['#374151', '#4ade80'], borderWidth: 0 }] 
            }} 
            options={{ maintainAspectRatio: false }} 
          />
        </div>
      </div>

      <div className="caja-ventas-pendientes">
        <h3>Ventas Pendientes de Pago</h3>
        
        {itemAPagar ? (
          <div className="pasarela-integrada-box">
            <div className="pasarela-grid">
              <div className="pasarela-form-side">
                <h2 className="pasarela-title">2. Dirección de Envío y Facturación</h2>
                <div className="pasarela-form">
                  <div className="pasarela-row">
                    <div className="pasarela-group">
                      <label><FaUser /> Nombre</label>
                      <input name="nombre" value={formData.nombre} onChange={handleInputChange} />
                    </div>
                    <div className="pasarela-group">
                      <label><FaUser /> Apellido</label>
                      <input name="apellido" value={formData.apellido} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="pasarela-row">
                    <div className="pasarela-group">
                      <label><FaEnvelope /> Email</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="pasarela-group">
                      <label><FaPhone /> Teléfono</label>
                      <input name="telefono" value={formData.telefono} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="pasarela-group full">
                    <label><FaMapMarkerAlt /> Dirección completa</label>
                    <input name="direccion" value={formData.direccion} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <div className="pasarela-summary-side">
                <h2 className="pasarela-title">Método de Pago</h2>
                <div className="metodos-lista">
                  {/* Solución Line 4:79: FaCreditCard usado en opción de tarjeta */}
                  <label className={`metodo-item ${metodoSeleccionado === 'Tarjeta' ? 'selected' : ''}`}>
                    <input type="radio" name="pay" onClick={() => setMetodoSeleccionado("Tarjeta")} />
                    <FaCreditCard className="logo-banco-icon" />
                    <span>Tarjeta débito/crédito</span>
                  </label>
                  <label className={`metodo-item ${metodoSeleccionado === 'Yape' ? 'selected' : ''}`}>
                    <input type="radio" name="pay" onClick={() => setMetodoSeleccionado("Yape")} />
                    <img src="https://vignette.wikia.nocookie.net/logopedia/images/b/b3/Yape_logo.png" alt="Yape" className="logo-banco" />
                    <span>Yape</span>
                  </label>
                  <label className={`metodo-item ${metodoSeleccionado === 'BCP' ? 'selected' : ''}`}>
                    <input type="radio" name="pay" onClick={() => setMetodoSeleccionado("BCP")} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/BCP_logo.svg" alt="BCP" className="logo-banco" />
                    <span>BCP</span>
                  </label>
                </div>

                <div className="pasarela-totals">
                  <div className="total-line bold"><span>Total:</span> <span>S/ 2,385.00</span></div>
                </div>

                <button className="btn-pagar-final" onClick={procesarPagoFinal}>
                  <FaWallet /> Pagar con {metodoSeleccionado || '...'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-pendientes">No hay ventas seleccionadas.</div>
        )}
      </div>
    </div>
  );
};

export default AdministrarCaja;