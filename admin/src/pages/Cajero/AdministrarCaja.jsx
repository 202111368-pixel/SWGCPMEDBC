import React, { useState, useEffect } from 'react';
import { 
  FaCashRegister, FaUnlock, FaChevronDown, FaTimes, 
  FaUndo, FaMoneyBillWave, FaHandHoldingUsd, FaFileInvoiceDollar,
  FaCheck, FaPowerOff, FaChartPie, FaListUl
} from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "../../styles/pages/Cajero/AdmintrarCaja.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdministrarCaja = () => {
  const [status, setStatus] = useState('CERRADA'); 
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showOpciones, setShowOpciones] = useState(false);
  const [showMovimientos, setShowMovimientos] = useState(false);
  const [showTimerCard, setShowTimerCard] = useState(false);

  // Datos exactos según image_2b70dd.png
  const datos = {
    montoInicial: 500.00,
    ingresos: 200.00,
    devoluciones: 0.00,
    prestamos: 0.00,
    gastos: 0.00,
    ingresosTotales: 200.00,
    egresosTotales: 0.00,
    saldo: 200.00,
    totalFinal: 700.00
  };

  useEffect(() => {
    let interval;
    if (status === 'ABIERTA') {
      const tick = () => {
        const now = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0); // Tiempo desde medianoche
        setElapsedTime(now - start);
      };
      tick();
      interval = setInterval(tick, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleAbrirCaja = () => setStatus('EXITOSO');
  
  const confirmarApertura = () => {
    setStatus('ABIERTA');
    setShowTimerCard(true);
  };

  // Limpieza total al cerrar
  const handleCerrarCaja = () => {
    setStatus('CERRADA');
    setElapsedTime(0);
    setShowTimerCard(false);
    setShowOpciones(false);
    setShowMovimientos(false);
  };

  const formatTime = () => {
    const ms = elapsedTime;
    const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const mil = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${h} : ${m} : ${s} : ${mil}`;
  };

  return (
    <div className="admin-caja-wrapper">
      {/* Modal de Éxito - image_2b1a0d.png */}
      {status === 'EXITOSO' && (
        <div className="caja-modal-overlay">
          <div className="caja-modal-content">
            <div className="caja-check-icon"><FaCheck /></div>
            <h2>Exito!</h2>
            <p>Caja Abierta con Exito!</p>
            <button className="caja-btn-ok" onClick={confirmarApertura}>OK</button>
          </div>
        </div>
      )}

      {/* Header - image_2af805.png */}
      <div className="caja-top-nav">
        <div className="caja-title-section">
          <h2>Administrar Caja - Movimientos de Caja</h2>
          <div className="caja-sub-info">
            <span>Fecha de Caja : 13/04/2026 - </span>
            <span className={`caja-badge ${status === 'ABIERTA' ? 'open' : 'closed'}`}>
              {status === 'ABIERTA' ? 'VIGENTE / ABIERTA' : 'CERRADA'}
            </span>
          </div>
        </div>

        {/* Notificación de Monitoreo - image_2b07bd.png */}
        <div className="caja-timer-center">
          {status === 'ABIERTA' && showTimerCard && (
            <div className="caja-notif-card">
              <div className="caja-notif-body">
                <div className="caja-timer-circle">
                  <span className="caja-24h-text">24h</span>
                  <span className="caja-clock-live">{formatTime()}</span>
                </div>
                <div className="caja-notif-text">
                  <p>Caja monitoreada 24h</p>
                  <div className="caja-notif-btns">
                    <button className="caja-btn-timer accept" onClick={() => setShowTimerCard(false)}>
                      <FaCheck /> Aceptar
                    </button>
                    <button className="caja-btn-timer cancel" onClick={handleCerrarCaja}>
                      <FaPowerOff /> Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="caja-actions-row">
          <div className="caja-dropdown">
            <button className="caja-btn opt-green" onClick={() => setShowOpciones(!showOpciones)}>
              <FaChartPie /> Opciones <FaChevronDown />
            </button>
            {showOpciones && (
              <div className="caja-menu">
                <div className="caja-menu-item red" onClick={handleCerrarCaja}>Cerrar Caja <FaPowerOff /></div>
              </div>
            )}
          </div>

          <button className="caja-btn opt-dark">
            <FaListUl /> Cortes de Caja <FaChevronDown />
          </button>

          <div className="caja-dropdown">
            <button className="caja-btn opt-blue" onClick={() => setShowMovimientos(!showMovimientos)}>
              <FaMoneyBillWave /> Movimientos de Caja <FaChevronDown />
            </button>
            {showMovimientos && (
              <div className="caja-menu">
                <div className="caja-menu-item">Devolución <FaUndo /></div>
                <div className="caja-menu-item">Préstamo <FaFileInvoiceDollar /></div>
                <div className="caja-menu-item">Gasto <FaHandHoldingUsd /></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid - image_2b70dd.png */}
      <div className="caja-grid-container">
        <div className="caja-table-box">
          <table className="caja-data-table">
            <tbody>
              <tr>
                <td><span className="caja-sq dark"></span> MONTO INICIAL</td>
                <td className="caja-val">$ {datos.montoInicial.toFixed(2)}</td>
              </tr>
              <tr>
                <td><span className="caja-sq green"></span> INGRESOS</td>
                <td className="caja-val">$ {datos.ingresos.toFixed(2)}</td>
              </tr>
              <tr>
                <td><span className="caja-sq orange"></span> DEVOLUCIONES</td>
                <td className="caja-val">$ {datos.devoluciones.toFixed(2)}</td>
              </tr>
              <tr>
                <td><span className="caja-sq yellow"></span> PRÉSTAMOS</td>
                <td className="caja-val">$ {datos.prestamos.toFixed(2)}</td>
              </tr>
              <tr>
                <td><span className="caja-sq cyan"></span> GASTOS</td>
                <td className="caja-val">$ {datos.gastos.toFixed(2)}</td>
              </tr>
              <tr className="caja-row-hl">
                <td className="caja-txt-green">INGRESOS TOTALES</td>
                <td className="caja-val caja-txt-green">$ {datos.ingresosTotales.toFixed(2)}</td>
              </tr>
              <tr className="caja-row-hl">
                <td className="caja-txt-red">EGRESOS TOTALES</td>
                <td className="caja-val caja-txt-red">$ {datos.egresosTotales.toFixed(2)}</td>
              </tr>
              <tr className="caja-row-hl">
                <td>SALDO</td>
                <td className="caja-val">$ {datos.saldo.toFixed(2)}</td>
              </tr>
              <tr className="caja-row-hl">
                <td className="caja-txt-blue">MONTO INICIAL + SALDO</td>
                <td className="caja-val caja-txt-blue">$ {datos.totalFinal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {status === 'CERRADA' && (
            <button className="caja-btn-open-big" onClick={handleAbrirCaja}>
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
            options={{
              plugins: { legend: { display: false } },
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdministrarCaja;