import React, { useState, useEffect } from "react";
import { 
  FaExclamationTriangle, FaTruck, FaSearch, 
  FaBoxOpen, FaSyncAlt, FaCheckCircle, FaTimes, FaCalendarAlt, FaMapMarkerAlt
} from "react-icons/fa";
import "../../styles/pages/Producto/Proveedor.css";

const KPICard = ({ title, value, subtitle, color, icon: Icon }) => (
  <div className="kpi-card" style={{ borderTop: `4px solid ${color}` }}>
    <div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-title" style={{ color }}>{title}</div>
      {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
    </div>
    <div className="kpi-icon-container" style={{ background: color + "15" }}>
      <Icon style={{ color }} />
    </div>
  </div>
);

const Proveedor = () => {
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  // Estado para controlar si se muestra la segunda tabla debajo
  const [mostrarTablaEntregas, setMostrarTablaEntregas] = useState(false);

  const [entregasProgramadas, setEntregasProgramadas] = useState(() => {
    const guardadas = localStorage.getItem("entregas_programadas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [formulario, setFormulario] = useState({
    tipoVehiculo: "Taxi",
    telefono: "",
    correo: "",
    direccion: "",
    referencia: "",
    fechaEntrega: ""
  });

  const [ventas, setVentas] = useState(() => {
    const vistaCongelada = localStorage.getItem("ventas_vista_congelada");
    if (vistaCongelada) return JSON.parse(vistaCongelada);
    const inicial = localStorage.getItem("ventas_registradas");
    return inicial ? JSON.parse(inicial) : [];
  });

  const [productos] = useState(() => {
    const productosBase = [
      { id: 1, nombre: "MELAMINA BLANCO MATE 18MM",   categoria: "TABLERO",   stock: 15, stockMin: 10, proveedor: "PELIKANO" },
      { id: 2, nombre: "MELAMINA ROBLE SANTANA 18MM",  categoria: "TABLERO",   stock: 4,  stockMin: 8,  proveedor: "VESTO"   },
      { id: 3, nombre: "TAPACANTO PVC DELGADO NEGRO",  categoria: "TAPACANTO", stock: 120,stockMin: 50, proveedor: "REHAU"   },
      { id: 4, nombre: "TAPACANTO GRUESO CEDRO 3MM",   categoria: "TAPACANTO", stock: 15, stockMin: 30, proveedor: "REHAU"   },
    ];
    return JSON.parse(localStorage.getItem("db_almacen")) || productosBase;
  });

  // Si al recargar la página ya existen entregas previas en localStorage, mostramos la tabla
  useEffect(() => {
    if (entregasProgramadas.length > 0) {
      setMostrarTablaEntregas(true);
    }
  }, [entregasProgramadas]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataString = params.get("data");
    if (dataString) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataString));
        if (decodedData && decodedData.items) {
          const nuevasVentas = decodedData.items.map((item, index) => {
            const nombreFinal = item.producto || item.nombre || "Producto General";
            return {
              id: item.id || Date.now() + index,
              producto: nombreFinal,
              cantidad: item.cantidad || 1,
              venta: item.precio ? item.precio * (item.cantidad || 1) : decodedData.subtotal,
              metodoPago: "TARJETA",
              estado: "VALIDADO",
              fecha: "1/6/2026"
            };
          });

          const existentes = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
          const filtradosExistentes = existentes.filter(
            ext => !nuevasVentas.some(nuev => nuev.producto === ext.producto)
          );

          const listaActualizada = [...nuevasVentas, ...filtradosExistentes];
          localStorage.setItem("ventas_registradas", JSON.stringify(listaActualizada));
          localStorage.setItem("ventas_vista_congelada", JSON.stringify(listaActualizada));
          setVentas(listaActualizada);
        }
      } catch (e) {
        console.error("Error al decodificar la data:", e);
      }
    }
  }, []);

  const cargarVentasManualmente = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    setVentas(ventasGuardadas);
    localStorage.setItem("ventas_vista_congelada", JSON.stringify(ventasGuardadas));
  };

  const elegirProducto = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const manejarCambioFormulario = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const guardarProgramacion = (e) => {
    e.preventDefault();
    const nuevaEntrega = {
      id: Date.now(),
      producto: productoSeleccionado.producto,
      cantidad: productoSeleccionado.cantidad || 1,
      ...formulario
    };

    const listaActualizada = [nuevaEntrega, ...entregasProgramadas];
    setEntregasProgramadas(listaActualizada);
    localStorage.setItem("entregas_programadas", JSON.stringify(listaActualizada));
    
    setModalAbierto(false);
    setFormulario({
      tipoVehiculo: "Taxi",
      telefono: "",
      correo: "",
      direccion: "",
      referencia: "",
      fechaEntrega: ""
    });

    // Activa de inmediato la visualización de la tabla inferior
    setMostrarTablaEntregas(true);
  };

  const formatearMontoSeguro = (montoOriginal) => {
    if (!montoOriginal) return "S/ 0.00";
    if (typeof montoOriginal === "number") return `S/ ${montoOriginal.toFixed(2)}`;
    return `S/ ${parseFloat(montoOriginal.replace(/[^\d.]/g, "") || 0).toFixed(2)}`;
  };

  const alertasCriticas = productos.filter(p => p.stock <= p.stockMin);
  const reabastecerCount = alertasCriticas.length;

  return (
    <div className="proveedor-container">
      <div className="main-panel">
        
        <div className="kpi-grid">
          <KPICard title="Alertas de Reabastecimiento" value={reabastecerCount} subtitle="Materiales críticos" color="#f59e0b" icon={FaExclamationTriangle} />
          <KPICard title="Órdenes de Restock" value={`${reabastecerCount > 0 ? 1 : 0} Pendiente`} subtitle="Con proveedores externos" color="#4f46e5" icon={FaTruck} />
        </div>

        {/* TABLA 1: SIEMPRE VISIBLE */}
        <div className="data-card">
          <div className="data-card-header">
            <div>
              <h3 className="data-card-title-main"><FaBoxOpen /> Catálogo de Productos y Sincronizaciones</h3>
              <p className="data-card-subtitle">Lista limpia sin elementos multimedia obsoletos</p>
            </div>
            <div className="table-controls">
              <div className="table-search-wrapper">
                <FaSearch />
                <input className="form-control form-control-icon" style={{ height: "38px" }} placeholder="Filtrar por nombre..." value={busquedaProducto} onChange={(e) => setBusquedaProducto(e.target.value)} />
              </div>
              <button onClick={cargarVentasManualmente} className="btn-sync">
                <FaSyncAlt /> Sincronizar
              </button>
            </div>
          </div>

          <div className="responsive-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto Mapeado</th>
                  <th style={{ textAlign: "center" }}>Cantidad</th>
                  <th>Total Interno</th>
                  <th>Estado</th>
                  <th style={{ textAlign: "center" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {ventas.length > 0 ? (
                  ventas
                    .filter(v => (v.producto || "").toLowerCase().includes(busquedaProducto.toLowerCase()))
                    .map((v, i) => (
                      <tr key={i}>
                        <td style={{ color: "#64748b" }}>{i + 1}</td>
                        <td style={{ fontWeight: "600", color: "#0f172a" }}>{v.producto}</td>
                        <td style={{ textAlign: "center", fontWeight: "700", color: "#334155" }}>{v.cantidad || 1}</td>
                        <td style={{ color: "#16a34a", fontWeight: "700" }}>{formatearMontoSeguro(v.venta)}</td>
                        <td>
                          <span className="badge-status">{v.estado}</span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button onClick={() => elegirProducto(v)} className="btn-select">
                            <FaCheckCircle size={12} /> Seleccionar
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#94a3b8", fontWeight: 500 }}>
                      No hay registros de catálogo o pedidos sincronizados en este momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TABLA 2: SE ACTIVA ABAJO CUANDO GUARDAS LA INFORMACIÓN */}
        {mostrarTablaEntregas && (
          <div className="data-card animate-fade-in">
            <div className="data-card-header">
              <div>
                <h3 className="data-card-title-main"><FaTruck /> Programación de Entregas</h3>
                <p className="data-card-subtitle">Despachos programados almacenados en el sistema</p>
              </div>
            </div>

            <div className="responsive-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th style={{ textAlign: "center" }}>Cant.</th>
                    <th>Vehículo</th>
                    <th>Contacto</th>
                    <th>Dirección (Google Maps)</th>
                    <th>Fecha Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {entregasProgramadas.map((e) => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: "600", color: "#0f172a" }}>{e.producto}</td>
                      <td style={{ textAlign: "center", fontWeight: "700" }}>{e.cantidad}</td>
                      <td>
                        <span className={`badge-vehicle ${e.tipoVehiculo.toLowerCase()}`}>
                          {e.tipoVehiculo}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: "500", color: "#334155" }}>{e.telefono}</div>
                        <div style={{ fontSize: "11px", color: "#64748b" }}>{e.correo}</div>
                      </td>
                      <td>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.direccion)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="maps-link"
                          title="Haga clic para ver en Google Maps"
                        >
                          <FaMapMarkerAlt size={12} style={{ color: "#ef4444" }} /> {e.direccion}
                        </a>
                        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>Ref: {e.referencia}</div>
                      </td>
                      <td style={{ fontWeight: "600", color: "#4f46e5" }}>
                        <FaCalendarAlt size={11} style={{ marginRight: "4px" }} /> {e.fechaEntrega}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* MODAL DE DESPACHO */}
      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Programar Entrega</h3>
              <button className="btn-close-modal" onClick={() => setModalAbierto(false)}>
                <FaTimes />
              </button>
            </div>
            <p className="modal-target-product"><strong>Item:</strong> {productoSeleccionado?.producto}</p>
            
            <form onSubmit={guardarProgramacion}>
              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label-text">Tipo de Vehículo</label>
                  <select className="form-control" name="tipoVehiculo" value={formulario.tipoVehiculo} onChange={manejarCambioFormulario}>
                    <option value="Taxi">🚕 Taxi</option>
                    <option value="Camioneta">🛻 Camioneta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label-text">Fecha de Entrega</label>
                  <input type="date" required className="form-control" name="fechaEntrega" value={formulario.fechaEntrega} onChange={manejarCambioFormulario} />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label-text">Teléfono</label>
                  <input type="tel" required className="form-control" name="telefono" placeholder="987654321" value={formulario.telefono} onChange={manejarCambioFormulario} />
                </div>
                <div className="form-group">
                  <label className="form-label-text">Correo Electrónico</label>
                  <input type="email" required className="form-control" name="correo" placeholder="cliente@correo.com" value={formulario.correo} onChange={manejarCambioFormulario} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-text">Dirección de Entrega</label>
                <input type="text" required className="form-control" name="direccion" placeholder="Ej: Av. Javier Prado Este 2465, San Borja" value={formulario.direccion} onChange={manejarCambioFormulario} />
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label-text">Referencia</label>
                <input type="text" required className="form-control" name="referencia" placeholder="Frente al centro comercial o color de reja" value={formulario.referencia} onChange={manejarCambioFormulario} />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={() => setModalAbierto(false)}>Cancelar</button>
                <button type="submit" className="btn-confirmar">Confirmar y Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proveedor;