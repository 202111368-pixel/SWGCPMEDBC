import React, { useEffect, useState } from 'react';
import '../../styles/pages/Cajero/MovimientoCaja.css';

const MovimientoCaja = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const cargarMov = () => {
      const guardadas = JSON.parse(localStorage.getItem('movimientos_caja')) || [];
      setMovimientos(guardadas.reverse());
    };

    cargarMov();

    window.addEventListener('movimientoRegistrado', cargarMov);

    return () => {
      window.removeEventListener('movimientoRegistrado', cargarMov);
    };
  }, []);

  const guardarMovimientos = (lista) => {
    localStorage.setItem('movimientos_caja', JSON.stringify(lista));
    window.dispatchEvent(new Event('movimientoRegistrado'));
  };


  return (
    <div className="movimiento-caja-container">
      <div className="movimiento-header">
        <h2>Movimiento de Caja</h2>
      </div>

      <div className="movimiento-list">
        <h3>Historial de Movimientos</h3>
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.length === 0 ? (
                <tr><td colSpan="6" className="vacio">No hay movimientos registrados.</td></tr>
              ) : (
                movimientos.map(m => (
                  <tr key={m.id}>
                    <td>{m.fecha}</td>
                    <td>{m.descripcion}</td>
                    <td>{m.tipo}</td>
                    <td>S/ {Number(m.monto).toFixed(2)}</td>
                    <td>{m.metodo}</td>
                    <td><span className="muted">Registro</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovimientoCaja;
