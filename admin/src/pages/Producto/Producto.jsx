import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTrash, FaSearch, FaBoxOpen, FaSyncAlt, FaImages, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../styles/pages/Producto/Producto.css"; 
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

const Producto = () => {
  const [ventas, setVentas] = useState(() => {
    const vistaCongelada = localStorage.getItem("ventas_vista_congelada");
    if (vistaCongelada) return JSON.parse(vistaCongelada);
    const inicial = localStorage.getItem("ventas_registradas");
    return inicial ? JSON.parse(inicial) : [];
  });

  const [busqueda, setBusqueda] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const expandedRefs = useRef({});
  const gsapInstance = useRef(null);

  useEffect(() => {
    loadGSAP().then((g) => { gsapInstance.current = g; });
  }, []);

  const obtenerImagenFielLocal = (nombreProducto) => {
    const nombre = (nombreProducto || "").toLowerCase();

    // Cocinas Integrales
    if (nombre.includes("urbanbrew")) return cocina1a; 
    if (nombre.includes("moderna")) return cocina2a; 
    if (nombre.includes("empotrada")) return cocina3a; 
    if (nombre.includes("en u")) return cocina4a; 

    // Escritorios (Muebles de Oficina)
    if (nombre.includes("alpha")) return muebles1; 
    if (nombre.includes("sigma")) return muebles1a; 
    if (nombre.includes("delta")) return muebles2; 

    // Vestidores Modulares
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
        console.error("Error al decodificar la data:", e);
      }
    }
  }, []);

  const cargarVentasManualmente = () => {
    const ventasGuardadas = JSON.parse(localStorage.getItem("ventas_registradas")) || [];
    setVentas(ventasGuardadas);
    localStorage.setItem("ventas_vista_congelada", JSON.stringify(ventasGuardadas));
    setExpandedId(null);
  };

  const eliminarVenta = (index) => {
    const nuevaLista = [...ventas];
    nuevaLista.splice(index, 1);
    localStorage.setItem("ventas_registradas", JSON.stringify(nuevaLista));
    localStorage.setItem("ventas_vista_congelada", JSON.stringify(nuevaLista));
    setVentas(nuevaLista);
    if (expandedId === index) setExpandedId(null);
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

  return (
    <div className="admin-producto-page">
      <header className="table-header-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
        <div className="header-text">
          <h1><FaBoxOpen /> Gestión de Productos</h1>
          <p>Datos sincronizados en tiempo real</p>
        </div>
        <button className="btn-sync-data" onClick={cargarVentasManualmente} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#003366", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
          <FaSyncAlt /> Sincronizar Pedidos
        </button>
      </header>

      <div className="search-section-center">
        <div className="search-bar-modern">
          <FaSearch color="#999" />
          <input type="text" placeholder="Buscar por nombre..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>#</th><th>PRODUCTO</th><th>CANTIDAD</th><th>IMÁGENES</th><th>TOTAL</th><th>MÉTODO PAGO</th><th>ESTADO</th><th>FECHA</th><th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas
                .filter(v => (v.producto || "").toLowerCase().includes(busqueda.toLowerCase()))
                .map((v, i) => (
                  <React.Fragment key={i}>
                    <tr className={expandedId === i ? "row-expanded-active" : ""}>
                      <td>{i + 1}</td>
                      <td className="prod-name-bold">{v.producto}</td>
                      <td style={{ textAlign: "center", fontWeight: "bold" }}>{v.cantidad || 1}</td>
                      <td>
                        <button className="btn-expand-imgs" onClick={() => toggleExpand(i)} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", padding: "6px 12px" }}>
                          <FaImages /> {expandedId === i ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>
                      <td style={{ color: "#2ecc71", fontWeight: "bold" }}>{formatearMontoSeguro(v.venta)}</td>
                      <td>{v.metodoPago}</td>
                      <td>
                        <span style={{ background: "#f1c40f", color: "white", padding: "5px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>{v.estado}</span>
                      </td>
                      <td>{v.fecha}</td>
                      <td>
                        <button onClick={() => eliminarVenta(i)} className="btn-delete-red"><FaTrash /></button>
                      </td>
                    </tr>

                    {expandedId === i && (
                      <tr>
                        <td colSpan={9} style={{ padding: 0 }}>
                          <div ref={(el) => { expandedRefs.current[i] = el; }} style={{ overflow: "hidden", height: 0, opacity: 0, backgroundColor: "#f8fafc" }}>
                            <div style={{ padding: "15px" }}>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#fff", padding: "10px", borderRadius: "8px", width: "140px", border: "1px solid #e2e8f0" }}>
                                <img 
                                  src={v.imagen} 
                                  alt={v.producto} 
                                  style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "6px" }}
                                />
                                <span style={{ fontSize: "11px", color: "#64748b", marginTop: "6px", textAlign: "center" }}>{v.producto}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
            ) : (
              <tr><td colSpan="9" style={{ textAlign: "center", padding: "40px" }}>No hay ventas registradas.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producto;