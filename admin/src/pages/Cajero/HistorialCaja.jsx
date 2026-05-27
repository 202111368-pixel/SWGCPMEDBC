import React, { useEffect, useMemo, useState } from 'react';
import { FaHistory, FaSearch } from "react-icons/fa";
import "../../styles/pages/Cajero/HistorialCaja.css"; 

const ESTADO_LABELS = {
  PENDIENTE: "Pendiente",
  VALIDADO: "Validado",
  RECHAZADO: "Rechazado",
};

const formatFecha = (fecha) => {
  if (!fecha) return "-";

  const valor = new Date(fecha);

  if (!Number.isNaN(valor.getTime())) {
    return valor.toLocaleDateString("es-PE");
  }

  return String(fecha);
};

const formatTotal = (total, venta) => {
  if (typeof total === "number" && !Number.isNaN(total)) {
    return `S/ ${total.toFixed(2)}`;
  }

  if (venta) {
    return venta;
  }

  return "S/ 0.00";
};

const HistorialCaja = () => {
  const [ventas, setVentas] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    const cargarVentas = () => {
      const guardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
      setVentas([...guardadas].reverse());
    };

    cargarVentas();

    window.addEventListener("storage", cargarVentas);
    window.addEventListener("ventaRegistrada", cargarVentas);

    return () => {
      window.removeEventListener("storage", cargarVentas);
      window.removeEventListener("ventaRegistrada", cargarVentas);
    };
  }, []);

  const filas = useMemo(() => ventas, [ventas]);

  return (
    <div className="historial-caja-container">
      <div className="header-box">
        <h2><FaHistory /> Historial de Ventas</h2>
      </div>

      <div className="search-section">
        <input type="date" className="input-date" />
        <button className="btn-search"><FaSearch /> Buscar</button>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla-historial">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Total</th>
              <th>Método</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filas.length > 0 ? (
              filas.map((venta) => (
                <tr key={venta.id}>
                  <td>{formatFecha(venta.fecha)}</td>
                  <td>{venta.producto || "Producto"}</td>
                  <td>{formatTotal(venta.total, venta.venta)}</td>
                  <td>{venta.metodoPago || "-"}</td>
                  <td>
                    <span className={`estado-pill estado-${String(venta.estado || "").toLowerCase()}`}>
                      {ESTADO_LABELS[venta.estado] || venta.estado || "-"}
                    </span>
                  </td>
                  <td>
                    {confirmId === venta.id ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-confirm" onClick={() => {
                          // confirmar y mover
                          try {
                            const ventasActuales = JSON.parse(localStorage.getItem('ventas_registradas')) || [];
                            const nuevasVentas = ventasActuales.filter(v => v.id !== venta.id);
                            localStorage.setItem('ventas_registradas', JSON.stringify(nuevasVentas));

                            const montoNum = (typeof venta.total === 'number' && !Number.isNaN(venta.total))
                              ? venta.total
                              : (venta.venta ? parseFloat(String(venta.venta).replace(/[^0-9.-]+/g, '')) : 0);

                            const nuevoMovimiento = {
                              id: Date.now(),
                              fecha: venta.fecha || new Date().toISOString().slice(0,10),
                              descripcion: `Venta: ${venta.producto || ''}`,
                              tipo: 'Ajuste',
                              monto: montoNum || 0,
                              metodo: venta.metodoPago || venta.metodo || '-',
                              estado: 'Registrado'
                            };

                            const mov = JSON.parse(localStorage.getItem('movimientos_caja')) || [];
                            mov.push(nuevoMovimiento);
                            localStorage.setItem('movimientos_caja', JSON.stringify(mov));

                            window.dispatchEvent(new Event('ventaRegistrada'));
                            window.dispatchEvent(new Event('movimientoRegistrado'));
                            setVentas([...nuevasVentas].reverse());
                            setConfirmId(null);
                          } catch (e) {
                            console.error('Error moviendo venta:', e);
                            setConfirmId(null);
                          }
                        }}>Eliminar</button>

                        <button className="btn-cancel" onClick={() => setConfirmId(null)}>Cancelar</button>
                      </div>
                    ) : (
                      <button className="btn-mover" onClick={() => setConfirmId(venta.id)}>Editar</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="tabla-vacia">
                  No hay ventas registradas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialCaja;