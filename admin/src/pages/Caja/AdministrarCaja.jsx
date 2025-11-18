import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  FaMoneyBillWave,
  FaChevronDown,
  FaExchangeAlt,
  FaTimes,
  FaInfoCircle,
  FaCheckCircle,
  FaEdit,
  FaLock,
  FaUnlock,
  FaUpload,
} from "react-icons/fa";
import "../../styles/AdministrarCaja.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdministrarCaja = () => {
  const [showOpciones, setShowOpciones] = useState(false);
  const [showMovimientos, setShowMovimientos] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalCerrar, setShowModalCerrar] = useState(false);
  const [showModalAbrir, setShowModalAbrir] = useState(false);
  const [showExito, setShowExito] = useState(false);
  const [cajaCerrada, setCajaCerrada] = useState(false);
  const [monto, setMonto] = useState(100000.0);

  const ingresos = 630.21;
  const devoluciones = 0.0;
  const prestamos = 0.0;
  const gastos = 400.0;

  const ingresosTotales = ingresos;
  const egresosTotales = gastos + devoluciones + prestamos;
  const saldo = ingresosTotales - egresosTotales;
  const montoFinal = monto + saldo;

  const data = {
    labels: ["Monto Inicial", "Ingresos", "Devoluciones", "Préstamos", "Gastos"],
    datasets: [
      {
        data: [monto, ingresos, devoluciones, prestamos, gastos],
        backgroundColor: [
          "#1e293b",
          "#16a34a",
          "#f97316",
          "#facc15",
          "#0ea5e9",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#374151", usePointStyle: true, boxWidth: 10 },
      },
    },
  };

  // Funciones de control
  const handleCerrarCaja = () => {
    setCajaCerrada(true);
    setShowModalCerrar(false);
    setShowExito(true);
  };

  const handleAbrirCaja = () => {
    setCajaCerrada(false);
    setShowExito(false);
    setShowModalAbrir(false);
  };

  return (
    <div className="pagina-caja">
      <div className="caja-container">
        <div className="header-caja">
          <h2 className="titulo-caja">
            Administrar Caja - Movimientos de Caja{" "}
            {cajaCerrada ? (
              <span className="estado-caja cerrada">CERRADA</span>
            ) : (
              <span className="estado-caja abierta">ABIERTA</span>
            )}
          </h2>

          <div className="botones-caja">
            <div className="relative">
              <button
                onClick={() => setShowOpciones(!showOpciones)}
                className="btn-opciones verde"
              >
                <FaMoneyBillWave />
                <span>Opciones</span>
                <FaChevronDown className="text-sm" />
              </button>

              {/* MENÚ OPCIONES */}
              {showOpciones && (
                <div className="dropdown">
                  {!cajaCerrada ? (
                    <>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowModalEditar(true);
                          setShowOpciones(false);
                        }}
                      >
                        Editar Monto Inicial
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowModalCerrar(true);
                          setShowOpciones(false);
                        }}
                      >
                        Cerrar Caja
                      </button>
                    </>
                  ) : (
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowModalAbrir(true);
                        setShowOpciones(false);
                      }}
                    >
                      Abrir Caja <FaUpload style={{ marginLeft: "6px" }} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="contenido-caja">
          <div className="tabla-container">
            <table className="tabla-caja">
              <tbody>
                <tr><td>Monto Inicial</td><td>${monto.toFixed(2)}</td></tr>
                <tr className="verde-texto"><td>Ingresos</td><td>${ingresos.toFixed(2)}</td></tr>
                <tr className="naranja-texto"><td>Devoluciones</td><td>${devoluciones.toFixed(2)}</td></tr>
                <tr className="amarillo-texto"><td>Préstamos</td><td>${prestamos.toFixed(2)}</td></tr>
                <tr className="celeste-texto"><td>Gastos</td><td>${gastos.toFixed(2)}</td></tr>
                <tr className="verde-texto negrita"><td>Ingresos Totales</td><td>${ingresosTotales.toFixed(2)}</td></tr>
                <tr className="rojo-texto negrita"><td>Egresos Totales</td><td>${egresosTotales.toFixed(2)}</td></tr>
                <tr className="negrita"><td>Saldo</td><td>${saldo.toFixed(2)}</td></tr>
                <tr className="celeste-texto negrita fondo-gris">
                  <td>Monto Inicial + Saldo</td><td>${montoFinal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grafico-container">
            <div className="grafico-wrapper">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDITAR MONTO INICIAL */}
      {showModalEditar && (
        <div className="modal-overlay">
          <div className="modal-caja">
            <div className="modal-header">
              <FaEdit />
              <h3>Editar Monto Inicial de Caja</h3>
              <FaTimes
                className="cerrar-modal"
                onClick={() => setShowModalEditar(false)}
              />
            </div>
            <div className="modal-alerta">
              <FaInfoCircle className="icono-info" />
              <p>Estimado usuario: Los campos remarcados con * son necesarios.</p>
              <FaTimes className="cerrar-alerta" />
            </div>
            <div className="campo-monto">
              <label>Monto *</label>
              <div className="input-monto">
                <button onClick={() => setMonto((prev) => Math.max(prev - 100, 0))}>-</button>
                <span>$</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                />
                <button onClick={() => setMonto((prev) => prev + 100)}>+</button>
              </div>
              <div className="mensaje-correcto"><FaCheckCircle /> Correcto.</div>
            </div>
            <div className="botones-modal">
              <button className="btn-cerrar" onClick={() => setShowModalEditar(false)}>Cerrar</button>
              <button className="btn-guardar" onClick={() => setShowModalEditar(false)}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CERRAR CAJA */}
      {showModalCerrar && (
        <div className="modal-overlay">
          <div className="modal-caja">
            <div className="modal-header">
              <FaLock />
              <h3>Cerrar Caja</h3>
              <FaTimes
                className="cerrar-modal"
                onClick={() => setShowModalCerrar(false)}
              />
            </div>

            <div className="modal-alerta">
              <FaInfoCircle className="icono-info" />
              <p>
                Estimado usuario: Los campos remarcados con <b>*</b> son
                necesarios.
              </p>
              <FaTimes className="cerrar-alerta" />
            </div>

            <div className="campo-monto">
              <label>Monto *</label>
              <div className="input-monto">
                <button disabled>-</button>
                <span>$</span>
                <input type="number" readOnly value={montoFinal.toFixed(2)} />
                <button disabled>+</button>
              </div>
              <div className="mensaje-correcto">
                <FaCheckCircle /> Correcto.
              </div>
            </div>

            <div className="botones-modal">
              <button
                className="btn-cerrar"
                onClick={() => setShowModalCerrar(false)}
              >
                Cerrar
              </button>
              <button className="btn-guardar" onClick={handleCerrarCaja}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ÉXITO */}
      {showExito && (
        <div className="modal-overlay">
          <div className="modal-exito-caja">
            <div className="circulo-exito">
              <FaCheckCircle className="icono-exito-grande" />
            </div>
            <h3>Éxito!</h3>
            <p>Caja cerrada con éxito</p>
            <button className="btn-ok" onClick={() => setShowExito(false)}>
              OK
            </button>
          </div>
        </div>
      )}

      {/* MODAL ABRIR CAJA */}
      {showModalAbrir && (
        <div className="modal-overlay">
          <div className="modal-caja">
            <div className="modal-header">
              <FaUnlock />
              <h3>Abrir Caja</h3>
              <FaTimes
                className="cerrar-modal"
                onClick={() => setShowModalAbrir(false)}
              />
            </div>

            <div className="modal-alerta">
              <FaInfoCircle className="icono-info" />
              <p>
                Estimado usuario: Ingrese el nuevo monto inicial para abrir la
                caja.
              </p>
              <FaTimes className="cerrar-alerta" />
            </div>

            <div className="campo-monto">
              <label>Monto *</label>
              <div className="input-monto">
                <button
                  onClick={() => setMonto((prev) => Math.max(prev - 100, 0))}
                >
                  -
                </button>
                <span>$</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                />
                <button onClick={() => setMonto((prev) => prev + 100)}>+</button>
              </div>
              <div className="mensaje-correcto">
                <FaCheckCircle /> Correcto.
              </div>
            </div>

            <div className="botones-modal">
              <button
                className="btn-cerrar"
                onClick={() => setShowModalAbrir(false)}
              >
                Cancelar
              </button>
              <button className="btn-guardar" onClick={handleAbrirCaja}>
                Abrir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrarCaja;
