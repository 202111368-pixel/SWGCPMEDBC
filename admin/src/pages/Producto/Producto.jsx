import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTrash, FaSearch, FaBoxOpen, FaSyncAlt, FaImages, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../styles/pages/Producto/Producto.css"; 

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
    loadGSAP().then((g) => { 
      gsapInstance.current = g; 
    });
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
    const soloNumeros = montoOriginal.replace(/[^\d.]/g, "");
    const numeroParseado = parseFloat(soloNumeros);
    return isNaN(numeroParseado) ? "S/ 0.00" : `S/ ${numeroParseado.toFixed(2)}`;
  };

  return (
    <div className="admin-producto-page">
      <header className="table-header-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0" }}>
        <div className="header-text">
          <h1><FaBoxOpen /> Gestión de Productos</h1>
          <p>Datos sincronizados desde el Carrito (Localhost:3000)</p>
        </div>
        <button 
          className="btn-sync-data" 
          onClick={cargarVentasManualmente}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          <FaSyncAlt /> Sincronizar Pedidos
        </button>
      </header>

      <div className="search-section-center">
        <div className="search-bar-modern">
          <FaSearch color="#999" />
          <input 
            type="text" 
            placeholder="Buscar por nombre de producto..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} 
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>PRODUCTO</th>
              <th>CANTIDAD</th>
              <th>IMÁGENES</th>
              <th>TOTAL</th>
              <th>MÉTODO PAGO</th>
              <th>ESTADO</th>
              <th>FECHA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length > 0 ? (
              ventas
                .filter(v => (v.producto || "").toLowerCase().includes(busqueda.toLowerCase()))
                .map((v, i) => {
                  const cantidadRender = v.cantidad || v.cantidadTotal || 1;
                  
                  return (
                    <React.Fragment key={i}>
                      <tr className={expandedId === i ? "row-expanded-active" : ""}>
                        <td>{i + 1}</td>
                        <td className="prod-name-bold">{v.producto || "Producto General"}</td>
                        <td style={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
                          {cantidadRender}
                        </td>
                        <td>
                          <button
                            className={`btn-expand-imgs ${expandedId === i ? "active" : ""}`}
                            onClick={() => toggleExpand(i)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              backgroundColor: "#f4f4f4",
                              border: "1px solid #ccc",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              cursor: "pointer"
                            }}
                          >
                            <FaImages /> 
                            {expandedId === i ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </td>
                        <td className="prod-price-green" style={{ color: "#2ecc71", fontWeight: "bold" }}>
                          {formatearMontoSeguro(v.venta || v.precio)}
                        </td>
                        <td className="method-text">{v.metodoPago || "Yape"}</td>
                        <td>
                          <span className="badge-status-validated" style={{ background: "#f1c40f", color: "white", padding: "5px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>
                            {v.estado || "VALIDADO"}
                          </span>
                        </td>
                        <td className="date-text">{v.fecha || new Date().toLocaleDateString("es-PE")}</td>
                        <td>
                          <button onClick={() => eliminarVenta(i)} className="btn-delete-red">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>

                      {expandedId === i && (
                        <tr className="tr-expand-row">
                          <td colSpan={9} style={{ padding: 0 }}>
                            <div
                              ref={(el) => { expandedRefs.current[i] = el; }}
                              className="expand-imgs-panel"
                              style={{ overflow: "hidden", height: 0, opacity: 0, backgroundColor: "#f8fafc" }}
                            >
                              <div style={{ padding: "15px", display: "flex", gap: "15px", justifyContent: "flex-start" }}>
                                <div style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  backgroundColor: "#fff",
                                  padding: "10px",
                                  borderRadius: "8px",
                                  border: "1px solid #e2e8f0",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                                }}>
                                  <img 
                                    src={v.imagen || v.imgActual} 
                                    alt={v.producto} 
                                    style={{
                                      width: "120px",
                                      height: "90px",
                                      objectFit: "cover",
                                      borderRadius: "6px"
                                    }}
                                    onError={(e) => { 
                                      e.target.src = "https://via.placeholder.com/120x90?text=Mueble"; 
                                    }}
                                  />
                                  <span style={{ fontSize: "11px", color: "#64748b", marginTop: "6px", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {v.producto || "Imagen única"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
            ) : (
              <tr>
                <td colSpan="9" className="no-data" style={{ textAlign: "center", padding: "40px", color: "#999" }}>
                  No hay ventas del carrito. Esperando que realices un pago en el carrito y presiones Sincronizar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Producto;