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
  FaTimes,
  FaInfoCircle,
  FaCheckCircle,
  FaEdit,
  FaLock,
  FaUnlock,
  FaUpload,
  FaTrash,
} from "react-icons/fa";
import "../../styles/AdministrarCaja.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdministrarCaja = () => {
  const [showOpciones, setShowOpciones] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalCerrar, setShowModalCerrar] = useState(false);
  const [showModalAbrir, setShowModalAbrir] = useState(false);
  const [showExito, setShowExito] = useState(false);
  const [cajaCerrada, setCajaCerrada] = useState(false);

  const [monto, setMonto] = useState(100000.0);
  const [montoAnterior, setMontoAnterior] = useState(100000.0);

  const [mensajeMovimiento, setMensajeMovimiento] = useState("");

  const [movimientos, setMovimientos] = useState([]);

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

  const handleGuardarMontoInicial = () => {
    if (monto !== montoAnterior) {
      const fechaHoy = new Date().toLocaleDateString("es-PE");
      const nuevoMovimiento = {
        id: Date.now(),
        tipo: `Ajuste Monto Inicial (S/ ${montoAnterior.toFixed(
          2
        )} → S/ ${monto.toFixed(2)})`,
        monto: monto,
        fecha: fechaHoy,
      };

      setMovimientos((prev) => [nuevoMovimiento, ...prev]);
      setMensajeMovimiento(
        `Se registró un movimiento: ajuste de monto inicial de S/ ${montoAnterior.toFixed(
          2
        )} a S/ ${monto.toFixed(2)}.`
      );
      setMontoAnterior(monto);
    }
    setShowModalEditar(false);
  };

  const handleEliminarMovimiento = (id) => {
    if (cajaCerrada) return; // bloqueado si caja cerrada

    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este movimiento?"
    );
    if (confirmar) {
      setMovimientos(movimientos.filter((m) => m.id !== id));
    }
  };

  const handleEditarMovimiento = (id) => {
    if (cajaCerrada) return; // bloqueado si caja cerrada

    const nuevoMonto = prompt("Ingrese el nuevo monto en soles:");
    if (nuevoMonto && !isNaN(parseFloat(nuevoMonto))) {
      setMovimientos(
        movimientos.map((m) =>
          m.id === id ? { ...m, monto: parseFloat(nuevoMonto) } : m
        )
      );
    }
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
                onClick={() => setShowOpciones((prev) => !prev)}
                className="btn-opciones verde"
              >
                <FaMoneyBillWave />
                <span>Opciones</span>
                <FaChevronDown className="text-sm" />
              </button>

              {showOpciones && (
                <div className="dropdown">
                  {!cajaCerrada ? (
                    <>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setMontoAnterior(monto);
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

        {mensajeMovimiento && (
          <div className="alerta-movimiento">
            <FaCheckCircle className="alerta-icono" />
            <span>{mensajeMovimiento}</span>
            <FaTimes
              className="alerta-cerrar"
              onClick={() => setMensajeMovimiento("")}
            />
          </div>
        )}

        <div className="contenido-caja">
          <div className="tabla-container">
            <table className="tabla-caja">
              <tbody>
                <tr>
                  <td>Monto Inicial</td>
                  <td>S/ {monto.toFixed(2)}</td>
                </tr>
                <tr className="verde-texto">
                  <td>Ingresos</td>
                  <td>S/ {ingresos.toFixed(2)}</td>
                </tr>
                <tr className="naranja-texto">
                  <td>Devoluciones</td>
                  <td>S/ {devoluciones.toFixed(2)}</td>
                </tr>
                <tr className="amarillo-texto">
                  <td>Préstamos</td>
                  <td>S/ {prestamos.toFixed(2)}</td>
                </tr>
                <tr className="celeste-texto">
                  <td>Gastos</td>
                  <td>S/ {gastos.toFixed(2)}</td>
                </tr>
                <tr className="verde-texto negrita">
                  <td>Ingresos Totales</td>
                  <td>S/ {ingresosTotales.toFixed(2)}</td>
                </tr>
                <tr className="rojo-texto negrita">
                  <td>Egresos Totales</td>
                  <td>S/ {egresosTotales.toFixed(2)}</td>
                </tr>
                <tr className="negrita">
                  <td>Saldo</td>
                  <td>S/ {saldo.toFixed(2)}</td>
                </tr>
                <tr className="celeste-texto negrita fondo-gris">
                  <td>Monto Inicial + Saldo</td>
                  <td>S/ {montoFinal.toFixed(2)}</td>
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

      {showModalEditar && (
        <div className="modal-overlay">
          <div className="modal-caja editar">
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
              <p>
                Estimado usuario: Los campos remarcados con <b>*</b> son
                necesarios.
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
                <span>S/</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                />
                <button onClick={() => setMonto((prev) => prev + 100)}>
                  +
                </button>
              </div>
              <div className="mensaje-correcto">
                <FaCheckCircle /> Correcto.
              </div>
            </div>
            <div className="botones-modal">
              <button
                className="btn-cerrar"
                onClick={() => setShowModalEditar(false)}
              >
                Cerrar
              </button>
              <button
                className="btn-guardar"
                onClick={handleGuardarMontoInicial}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalCerrar && (
        <div className="modal-overlay">
          <div className="modal-caja cerrar">
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
                <span>S/</span>
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

      {showModalAbrir && (
        <div className="modal-overlay">
          <div className="modal-caja abrir">
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
                <span>S/</span>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                />
                <button onClick={() => setMonto((prev) => prev + 100)}>
                  +
                </button>
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

      <div className="movimientos-container">
        <h3>Historial de Movimientos</h3>
        <table className="tabla-movimientos">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto (S/)</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#6b7280" }}>
                  No hay movimientos registrados.
                </td>
              </tr>
            )}
            {movimientos.map((m) => (
              <tr key={m.id}>
                <td>{m.tipo}</td>
                <td>{m.monto.toFixed(2)}</td>
                <td>{m.fecha}</td>
                <td className="acciones">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditarMovimiento(m.id)}
                    disabled={cajaCerrada}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminarMovimiento(m.id)}
                    disabled={cajaCerrada}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdministrarCaja;
