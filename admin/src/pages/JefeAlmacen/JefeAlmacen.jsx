import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch, FaWarehouse, FaSyncAlt, FaImages, FaChevronDown, FaChevronUp, FaHistory } from "react-icons/fa";
import "../../styles/pages/JefeAlmacen/JefeAlmacen.css"; 

import cocina1a from "../../img/cocina1a.jpg";
import cocina2a from "../../img/cocina2a.jpg";
import cocina3a from "../../img/cocina3a.jpg";
import cocina4a from "../../img/cocina4a.jpg";
import muebles1 from "../../img/Muebles/muebles1.jpg";
import muebles1a from "../../img/Muebles/muebles1a.jpg";
import muebles2 from "../../img/Muebles/muebles2.jpg";
import Vestidores1 from "../../img/Vestidores/Vestidores1.jpg";
import Vestidores1a from "../../img/Vestidores/Vestidores1a.jpg";
import Vestidores2 from "../../img/Vestidores/Vestidores2.jpg";
import Vestidores2a from "../../img/Vestidores/Vestidores2a.jpg";

const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) { resolve(window.gsap); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => resolve(window.gsap);
    document.head.appendChild(script);
  });

const JefeAlmacen = () => {
  const [ventas, setVentas] = useState(() => {
    const vistaCongelada = localStorage.getItem("ventas_vista_congelada");
    if (vistaCongelada) return JSON.parse(vistaCongelada);
    const inicial = localStorage.getItem("ventas_registradas");
    return inicial ? JSON.parse(inicial) : [];
  });

  const [movimientos, setMovimientos] = useState(() => {
    const movs = localStorage.getItem("movimientos_almacen");
    return movs ? JSON.parse(movs) : [];
  });

  const [busqueda, setBusqueda] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const expandedRefs = useRef({});
  const gsapInstance = useRef(null);

  useEffect(() => {
    loadGSAP().then((g) => { gsapInstance.current = g; });
    
    const actualizarDesdeLocal = () => {
      const movs = localStorage.getItem("movimientos_almacen");
      if (movs) setMovimientos(JSON.parse(movs));
      const vnts = localStorage.getItem("ventas_vista_congelada") || localStorage.getItem("ventas_registradas");
      if (vnts) setVentas(JSON.parse(vnts));
    };
    window.addEventListener("storage", actualizarDesdeLocal);
    return () => window.removeEventListener("storage", actualizarDesdeLocal);
  }, []);

  const obtenerImagenFielLocal = (nombreProducto) => {
    const nombre = (nombreProducto || "").toLowerCase();
    if (nombre.includes("urbanbrew")) return cocina1a; 
    if (nombre.includes("moderna")) return cocina2a; 
    if (nombre.includes("empotrada")) return cocina3a; 
    if (nombre.includes("en u")) return cocina4a; 
    if (nombre.includes("alpha")) return muebles1; 
    if (nombre.includes("sigma")) return muebles1a; 
    if (nombre.includes("delta")) return muebles2; 
    if (nombre.includes("vestidor modular alpha")) return Vestidores1;
    if (nombre.includes("vestidor modular sigma")) return Vestidores1a;
    if (nombre.includes("vestidor modular delta")) return Vestidores2;
    if (nombre.includes("omega")) return Vestidores2a;
    return cocina1a;
  };

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
              fecha: "1/6/2026",
              imagen: obtenerImagenFielLocal(nombreFinal)
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
        console.error(e);
      }
    }
  }, []);

  const cargarVentasManualmente = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    setVentas(ventasGuardadas);
    localStorage.setItem("ventas_vista_congelada", JSON.stringify(ventasGuardadas));
    
    const movsGuardados = JSON.parse(localStorage.getItem("movimientos_almacen")) || [];
    setMovimientos(movsGuardados);
    setExpandedId(null);
  };

  const toggleExpand = useCallback((id) => {
    const g = gsapInstance.current;
    if (expandedId === id) {
      const el = expandedRefs.current[id];
      if (el && g) {
        g.to(el, {
          height: 0, opacity: 0, duration: 0.32, ease: "power2.inOut",
          onComplete: () => setExpandedId(null),
        });
      } else {
        setExpandedId(null);
      }
    } else {
      setExpandedId(id);
    }
  }, [expandedId]);

  useEffect(() => {
    if (expandedId !== null) {
      const el = expandedRefs.current[expandedId];
      if (el && gsapInstance.current) {
        gsapInstance.current.fromTo(
          el,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.38, ease: "power2.out" }
        );
      }
    }
  }, [expandedId]);

  const formatearMontoSeguro = (montoOriginal) => {
    if (!montoOriginal) return "S/ 0.00";
    if (typeof montoOriginal === "number") return `S/ ${montoOriginal.toFixed(2)}`;
    return `S/ ${parseFloat(montoOriginal.replace(/[^\d.]/g, "") || 0).toFixed(2)}`;
  };

  const limpiarHistorialMovimientos = () => {
    if (window.confirm("¿Desea limpiar todo el historial de movimientos?")) {
      localStorage.removeItem("movimientos_almacen");
      setMovimientos([]);
    }
  };

  return (
    <div className="jefe-almacen-dashboard">
      <header className="almacen-header">
        <div className="header-brand">
          <div className="brand-icon"><FaWarehouse /></div>
          <div>
            <h1>Módulo de Supervisión de Almacén</h1>
            <p>Control de Gestión de Productos y Órdenes Validadas</p>
          </div>
        </div>
        <button className="btn-sync-data" onClick={cargarVentasManualmente}>
          <FaSyncAlt /> Sincronizar Pedidos
        </button>
      </header>

      <div className="search-section-center">
        <div className="search-bar-modern">
          <FaSearch color="#999" />
          <input type="text" placeholder="Buscar por nombre..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      <main className="almacen-main-content">
        <div className="tabla-responsive-container">
          <table className="almacen-tabla-datos tabular-productos">
            <thead>
              <tr>
                <th>#</th>
                <th>PRODUCTO</th>
                <th className="text-center">CANTIDAD</th>
                <th className="text-center">IMÁGENES</th>
                <th className="text-center">TOTAL</th>
                <th className="text-center">MÉTODO PAGO</th>
                <th className="text-center">ESTADO</th>
                <th className="text-center">FECHA</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length > 0 ? (
                ventas
                  .filter(v => (v.producto || "").toLowerCase().includes(busqueda.toLowerCase()))
                  .map((v, i) => (
                    <React.Fragment key={i}>
                      <tr className={expandedId === i ? "row-expanded-active" : ""}>
                        <td className="color-muted">{i + 1}</td>
                        <td className="prod-name-bold">{v.producto}</td>
                        <td className="text-center font-bold">{v.cantidad || 1}</td>
                        <td className="text-center">
                          <button className="btn-expand-imgs" onClick={() => toggleExpand(i)}>
                            <FaImages /> {expandedId === i ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="text-center total-destacado">{formatearMontoSeguro(v.venta)}</td>
                        <td className="text-center metodo-pago-text">{v.metodoPago}</td>
                        <td className="text-center">
                          <span className="estado-validador-badge">{v.estado}</span>
                        </td>
                        <td className="text-center fecha-tabla-text">{v.fecha}</td>
                      </tr>

                      {expandedId === i && (
                        <tr>
                          <td colSpan={8} style={{ padding: 0 }}>
                            <div ref={(el) => { expandedRefs.current[i] = el; }} style={{ overflow: "hidden", height: 0, opacity: 0, backgroundColor: "#f8fafc" }}>
                              <div style={{ padding: "15px" }}>
                                <div className="preview-thumbnail-card">
                                  <img src={v.imagen} alt={v.producto} />
                                  <span>{v.producto}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>No hay pedidos sincronizados en almacén.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <section className="almacen-main-content movimientos-seccion">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid #eef2f5" }}>
          <h2 style={{ fontSize: "15px", color: "#2c3e50", display: "flex", alignItems: "center", gap: "8px", margin: 0, fontWeight: "600" }}>
            <FaHistory color="#e74c3c" /> MOVIMIENTOS DE ALMACÉN (PRODUCTOS ELIMINADOS)
          </h2>
          {movimientos.length > 0 && (
            <button className="btn-limpiar-historial" onClick={limpiarHistorialMovimientos}>
              Limpiar Historial
            </button>
          )}
        </div>
        
        <div className="tabla-responsive-container">
          <table className="almacen-tabla-datos tabular-movimientos">
            <thead>
              <tr>
                <th>ID REGISTRO</th>
                <th>PRODUCTO AFECTADO</th>
                <th className="text-center">CANTIDAD</th>
                <th className="text-center">VALOR NETO</th>
                <th className="text-center">MOVIMIENTO</th>
                <th className="text-center">FECHA Y HORA DE SALIDA</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.length > 0 ? (
                movimientos.map((mov) => (
                  <tr key={mov.id} className="row-movimiento-item">
                    <td style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "monospace" }}>#{mov.id}</td>
                    <td style={{ fontWeight: "500", color: "#334155" }}>{mov.producto}</td>
                    <td className="text-center font-bold">{mov.cantidad}</td>
                    <td className="text-center" style={{ color: "#475569" }}>{formatearMontoSeguro(mov.total)}</td>
                    <td className="text-center">
                      <span className="badge-tipo-movimiento">{mov.tipo}</span>
                    </td>
                    <td className="text-center color-muted" style={{ fontSize: "12px" }}>{mov.fechaHora}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#94a3b8", fontSize: "13px" }}>
                    No se registran movimientos ni salidas recientes de mercadería.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default JefeAlmacen;