import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  FaUserShield, FaSearch, FaEdit, FaTrash, FaTimes,
  FaCheckCircle, FaImages, FaDownload, FaTrashAlt,
  FaPrint, FaCloudUploadAlt, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import "../../styles/pages/Administrador/Administrador.css";

/* ─────────────────────────────────────────────────────────────────
   GSAP — carga dinámica desde CDN.
───────────────────────────────────────────────────────────────── */
const loadGSAP = () =>
  new Promise((resolve) => {
    if (window.gsap) { resolve(window.gsap); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => resolve(window.gsap);
    document.head.appendChild(script);
  });

/* ─────────────────────────────────────────────────────────────────
   UTILIDADES
───────────────────────────────────────────────────────────────── */
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const triggerDownload = (base64, filename) => {
  const a = document.createElement("a");
  a.href = base64;
  a.download = filename;
  a.click();
};

// Función para quitar tildes y hacer las búsquedas más exactas
const normalizarTexto = (texto) => {
  if (!texto) return "";
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

/* ─────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────────────────────────── */
const Administrador = () => {

  /* ── Estado principal ─────────────────────────────────────────── */
  const [admins, setAdmins] = useState(() => {
    const guardado = localStorage.getItem("db_admins_v2");
    return guardado ? JSON.parse(guardado) : [
      {
        id: 3256,
        cliente: "CARPINTERÍA LOS ANDES",
        monto: 350.50,
        estado: "PENDIENTE",
        nombres: "CARPINTERÍA",
        apellidos: "LOS ANDES",
        email: "",
        dni: "",
        telefono: "",
        imagenes: [], 
      },
    ];
  });

  /* ── Estado de UI ─────────────────────────────────────────────── */
  const [expandedId, setExpandedId]     = useState(null);
  const [showModal, setShowModal]       = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm]     = useState("");
  const [alert, setAlert]               = useState({ show: false, msg: "", title: "", type: "" });
  const [formData, setFormData]         = useState(emptyForm());
  const [isDragging, setIsDragging]     = useState(false);

  /* ── Estado Modal Contraseña ──────────────────────────────────── */
  const [showPwdModal, setShowPwdModal]   = useState(false);
  const [pwdInput, setPwdInput]           = useState("");
  const [pwdError, setPwdError]           = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  /* ── Refs para GSAP ───────────────────────────────────────────── */
  const gsap         = useRef(null);
  const modalRef     = useRef(null);
  const expandedRefs = useRef({});

  /* ── Persistencia ─────────────────────────────────────────────── */
  useEffect(() => {
    localStorage.setItem("db_admins_v2", JSON.stringify(admins));
  }, [admins]);

  /* ── Carga GSAP ───────────────────────────────────────────────── */
  useEffect(() => {
    loadGSAP().then((g) => { gsap.current = g; });
  }, []);

  function emptyForm() {
    return { nombres: "", apellidos: "", email: "", dni: "", telefono: "", monto: "", imagenes: [] };
  }

  /* ── Toast ────────────────────────────────────────────────────── */
  const showToast = (title, msg, type = "success") => {
    setAlert({ show: true, title, msg, type });
    setTimeout(() => setAlert({ show: false, title: "", msg: "", type: "" }), 4500);
  };

  /* ── SISTEMA DE SEGURIDAD (CONTRASEÑA) ────────────────────────── */
  const requirePassword = (actionType, adminData) => {
    setPendingAction({ type: actionType, payload: adminData });
    setPwdInput("");
    setPwdError(false);
    setShowPwdModal(true);
  };

  const verifyPassword = () => {
    if (pwdInput === "123456") {
      setShowPwdModal(false);
      
      if (pendingAction.type === 'EDIT') {
        ejecutarAbrirEditar(pendingAction.payload);
      } else if (pendingAction.type === 'DELETE') {
        ejecutarEliminarAdmin(pendingAction.payload.id);
      } else if (pendingAction.type === 'PRINT') {
        imprimirPDF(pendingAction.payload);
      }
      
      setPendingAction(null);
    } else {
      setPwdError(true);
      setPwdInput("");
    }
  };

  /* ── Acciones protegidas (se llaman tras validación exitosa) ──── */
  const abrirAgregar = () => {
    setEditingAdmin(null);
    setFormData(emptyForm());
    setShowModal(true);
  };

  const ejecutarAbrirEditar = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      nombres:   admin.nombres   || "",
      apellidos: admin.apellidos || "",
      email:     admin.email     || "",
      dni:       admin.dni       || "",
      telefono:  admin.telefono  || "",
      monto:     admin.monto     !== undefined ? admin.monto : "",
      imagenes:  admin.imagenes  || [],
    });
    setShowModal(true);
  };

  const ejecutarEliminarAdmin = (id) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
    if (expandedId === id) setExpandedId(null);
    showToast("ELIMINADO", "Registro eliminado del sistema.", "error");
  };

  /* ── Animar modal al abrirse ──────────────────────────────────── */
  useEffect(() => {
    if (showModal && modalRef.current && gsap.current) {
      gsap.current.fromTo(
        modalRef.current,
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }
      );
    }
  }, [showModal]);

  /* ── Toggle expansión de imágenes ────────────────────────────── */
  const toggleExpand = useCallback((id) => {
    const g = gsap.current;
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

  /* ── Animar apertura de fila expandida ───────────────────────── */
  useEffect(() => {
    if (expandedId !== null) {
      const el = expandedRefs.current[expandedId];
      if (el && gsap.current) {
        gsap.current.fromTo(
          el,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.38, ease: "power2.out" }
        );
      }
    }
  }, [expandedId]);

  /* ── Guardar (Nuevo o Editado) ────────────────────────────────── */
  const guardarEdicion = () => {
    if (!formData.nombres.trim()) {
      showToast("VALIDACIÓN", "El nombre es obligatorio.", "error");
      return;
    }

    const montoNumerico = parseFloat(formData.monto) || 0;

    if (editingAdmin) {
      setAdmins(prev =>
        prev.map(a =>
          a.id === editingAdmin.id
            ? {
                ...a,
                ...formData,
                monto: montoNumerico,
                cliente: `${formData.nombres} ${formData.apellidos}`.trim().toUpperCase(),
              }
            : a
        )
      );
      showToast("ACTUALIZACIÓN", "Perfil actualizado correctamente.", "success");
    } else {
      const nuevoRegistro = {
        id: Math.floor(Math.random() * 9000) + 1000,
        estado: "PENDIENTE",
        ...formData,
        monto: montoNumerico,
        cliente: `${formData.nombres} ${formData.apellidos}`.trim().toUpperCase()
      };
      setAdmins(prev => [nuevoRegistro, ...prev]);
      showToast("REGISTRO", "Nuevo cliente agregado correctamente.", "success");
    }
    cerrarModal();
  };

  /* ── Subir imágenes en Modal ──────────────────────────────────── */
  const handleSubirImagenesModal = async (files) => {
    const totalActual = formData.imagenes?.length || 0;

    if (totalActual + files.length > 10) {
      showToast("LÍMITE", "Máximo 10 imágenes por registro.", "error");
      return;
    }

    const nuevas = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      const base64 = await fileToBase64(file);
      nuevas.push({
        nombre: file.name,
        data: base64,
        fecha: new Date().toLocaleDateString("es-PE"),
      });
    }

    setFormData(prev => ({
      ...prev,
      imagenes: [...(prev.imagenes || []), ...nuevas]
    }));
    showToast("IMÁGENES", `${nuevas.length} imagen(es) subida(s).`, "success");
  };

  /* ── Eliminar imagen en Modal ─────────────────────────────────── */
  const eliminarImagenModal = (imgIndex) => {
    setFormData(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== imgIndex)
    }));
  };

  /* ── Eliminar imagen desde la Tabla directamente ──────────────── */
  const eliminarImagenTabla = (adminId, imgIndex) => {
    setAdmins(prev =>
      prev.map(a =>
        a.id === adminId
          ? { ...a, imagenes: a.imagenes.filter((_, i) => i !== imgIndex) }
          : a
      )
    );
  };

  /* ── Imprimir PDF ─────────────────────────────────────────────── */
  const imprimirPDF = (admin) => {
    const imagenesHTML = (admin.imagenes || [])
      .map((img) => `
        <div style="margin-bottom:20px;">
          <p style="font-size:11px;color:#64748b;margin-bottom:6px;">${img.nombre} — ${img.fecha || ""}</p>
          <img src="${img.data}" style="max-width:100%;border-radius:8px;border:1px solid #e2e8f0;" />
        </div>
      `)
      .join("");

    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <!DOCTYPE html><html>
      <head>
        <meta charset="UTF-8"/>
        <title>Perfil — ${admin.cliente}</title>
        <style>
          *{margin:0;padding:0;box-sizing:border-box;}
          body{font-family:'Segoe UI',sans-serif;padding:40px;color:#1e293b;}
          .header{border-bottom:3px solid #2563eb;padding-bottom:20px;margin-bottom:30px;}
          .logo-ph{font-size:11px;color:#94a3b8;margin-bottom:10px;font-style:italic;}
          h1{font-size:22px;font-weight:800;}
          .badge{display:inline-block;background:#eff6ff;color:#2563eb;
            padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-top:6px;}
          .badge.red{background:#fff7ed;color:#c2410c;margin-left:6px;}
          .section{margin-bottom:28px;}
          .section h2{font-size:12px;text-transform:uppercase;color:#64748b;
            letter-spacing:1px;margin-bottom:14px;border-bottom:1px solid #f1f5f9;padding-bottom:6px;}
          .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .field label{font-size:11px;color:#94a3b8;text-transform:uppercase;display:block;margin-bottom:3px;}
          .field p{font-size:14px;font-weight:600;}
          @media print{body{padding:20px;}}
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-ph">[ Logo empresa — se añade en fase 2 ]</div>
          <h1>${admin.cliente}</h1>
          <span class="badge">#ID-${admin.id}</span>
          <span class="badge red">${admin.estado}</span>
        </div>
        <div class="section">
          <h2>Información del Perfil</h2>
          <div class="grid">
            <div class="field"><label>Nombres</label><p>${admin.nombres || "—"}</p></div>
            <div class="field"><label>Apellidos</label><p>${admin.apellidos || "—"}</p></div>
            <div class="field"><label>DNI</label><p>${admin.dni || "—"}</p></div>
            <div class="field"><label>Teléfono</label><p>${admin.telefono || "—"}</p></div>
            <div class="field"><label>Email</label><p>${admin.email || "—"}</p></div>
            <div class="field"><label>Monto</label><p>S/ ${admin.monto?.toFixed(2) || "0.00"}</p></div>
          </div>
        </div>
        ${imagenesHTML ? `
        <div class="section">
          <h2>Documentos / Imágenes Adjuntas</h2>
          ${imagenesHTML}
        </div>` : ""}
        <script>window.onload=()=>window.print();</script>
      </body></html>
    `);
    ventana.document.close();
  };

  /* ── Cerrar modal ─────────────────────────────────────────────── */
  const cerrarModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
    setFormData(emptyForm());
  };

  /* ── Filtrado Inteligente (Ignora tildes y mayúsculas) ────────── */
  const filtrados = useMemo(() => {
    if (!searchTerm) return admins;
    const busqueda = normalizarTexto(searchTerm);
    return admins.filter(a => normalizarTexto(a.cliente).includes(busqueda));
  }, [admins, searchTerm]);

  /* ─────────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────────── */
  return (
    <div className="admin-main-wrapper">

      {/* Toast */}
      {alert.show && (
        <div className={`toast-notification ${alert.type}`}>
          <div className="toast-icon-circle">
            {alert.type === "error" ? "!" : <FaCheckCircle />}
          </div>
          <div className="toast-body">
            <div className="toast-header">
              <span className="toast-title">{alert.title}</span>
              <span className="toast-time">ahora</span>
            </div>
            <p className="toast-message">{alert.msg}</p>
          </div>
        </div>
      )}

      {/* MODAL DE CONTRASEÑA */}
      {showPwdModal && (
        <div 
          className="modal-overlay pwd-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowPwdModal(false)}
        >
          <div className="modal-pwd-card">
            <div className="modal-pwd-head">
              <div className="pwd-icon-circle"><FaUserShield /></div>
              <h3 className="modal-pwd-title">Acceso Restringido</h3>
              <p className="modal-pwd-sub">Ingresa la clave para continuar</p>
            </div>
            <div className="modal-pwd-body">
              <input
                type="password"
                className={`input-modern ${pwdError ? "input-err" : ""}`}
                placeholder="••••••"
                value={pwdInput}
                onChange={(e) => { setPwdInput(e.target.value); setPwdError(false); }}
                onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                autoFocus
              />
              {pwdError && <p className="pwd-error-msg">Clave incorrecta</p>}
              <div className="pwd-btn-row">
                <button className="btn-pwd-cancel" onClick={() => setShowPwdModal(false)}>Cancelar</button>
                <button className="btn-pwd-confirm" onClick={verifyPassword}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="brand-section">
        <div className="brand-logo-bg"><FaUserShield /></div>
        <h1 className="brand-title">Gestión de Administrador</h1>
      </header>

      {/* Buscador y Botón Agregar */}
      <div className="action-row">
        <div className="search-box">
          <FaSearch />
          <input
            placeholder="Filtrar por nombre..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary-blue" onClick={abrirAgregar}>
          + Agregar Nuevo
        </button>
      </div>

      {/* Tabla */}
      <div className="data-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>CLIENTE</th>
              <th>MONTO</th>
              <th>ESTADO</th>
              <th>IMÁGENES</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((admin) => (
              <React.Fragment key={admin.id}>

                {/* Fila principal */}
                <tr className={expandedId === admin.id ? "row-expanded-active" : ""}>
                  <td className="td-code">#ID-{admin.id}</td>
                  <td><strong className="td-nombre">{admin.cliente}</strong></td>
                  <td className="td-monto">S/ {admin.monto?.toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${admin.estado?.toLowerCase()}`}>
                      {admin.estado}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn-expand-imgs ${expandedId === admin.id ? "active" : ""}`}
                      onClick={() => toggleExpand(admin.id)}
                      title="Ver imágenes adjuntas"
                    >
                      <FaImages />
                      {(admin.imagenes?.length > 0) && (
                        <span className="img-count-badge">{admin.imagenes.length}</span>
                      )}
                      {expandedId === admin.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </td>
                  <td className="td-acciones">
                    {/* Botón Imprimir protegido */}
                    <button className="act-btn-print" onClick={() => requirePassword('PRINT', admin)} title="Imprimir">
                      <FaPrint />
                    </button>
                    {/* Botón Editar protegido */}
                    <button className="act-btn-edit" onClick={() => requirePassword('EDIT', admin)} title="Editar">
                      <FaEdit />
                    </button>
                    {/* Botón Eliminar protegido */}
                    <button className="act-btn-delete" onClick={() => requirePassword('DELETE', admin)} title="Eliminar">
                      <FaTrash />
                    </button>
                  </td>
                </tr>

                {/* Fila expandida con imágenes */}
                {expandedId === admin.id && (
                  <tr className="tr-expand-row">
                    <td colSpan={6} style={{ padding: 0 }}>
                      <div
                        ref={(el) => { expandedRefs.current[admin.id] = el; }}
                        className="expand-imgs-panel"
                        style={{ overflow: "hidden" }}
                      >
                        <div className="expand-imgs-inner">
                          {(!admin.imagenes || admin.imagenes.length === 0) ? (
                            <div className="no-imgs-msg">
                              <FaImages />
                              <span>Sin imágenes adjuntas. Haz clic en Editar para subir.</span>
                            </div>
                          ) : (
                            <div className="imgs-grid-preview">
                              {admin.imagenes.map((img, i) => (
                                <div key={i} className="img-thumb-card">
                                  <img src={img.data} alt={img.nombre} />
                                  <div className="img-thumb-overlay">
                                    <button
                                      className="thumb-btn download"
                                      onClick={() => triggerDownload(img.data, img.nombre)}
                                      title="Descargar"
                                    >
                                      <FaDownload />
                                    </button>
                                    <button
                                      className="thumb-btn delete"
                                      onClick={() => eliminarImagenTabla(admin.id, i)}
                                      title="Eliminar imagen"
                                    >
                                      <FaTrashAlt />
                                    </button>
                                  </div>
                                  <p className="img-thumb-name">{img.nombre}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MODAL DE EDICIÓN Y CREACIÓN
      ══════════════════════════════════════════════════════════ */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && cerrarModal()}
        >
          <div className="modal-admin-card" ref={modalRef}>

            {/* Cabecera del modal */}
            <div className="modal-admin-head">
              <h3 className="modal-admin-title">
                {editingAdmin ? "Editar Perfil" : "Agregar Nuevo"}
              </h3>
              <button className="close-x-btn" onClick={cerrarModal}><FaTimes /></button>
            </div>

            {/* Cuerpo */}
            <div className="modal-admin-body">

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Nombres <span className="req">*</span></label>
                  <input
                    className="input-modern"
                    value={formData.nombres}
                    placeholder="EJ. JUAN CARLOS"
                    /* RESTRICCIÓN: Solo letras, acentos y espacios */
                    onChange={(e) => {
                      const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                      setFormData({ ...formData, nombres: valor.toUpperCase() });
                    }}
                  />
                </div>
                <div className="modal-field">
                  <label>Apellidos</label>
                  <input
                    className="input-modern"
                    value={formData.apellidos}
                    placeholder="EJ. RIVERA LÓPEZ"
                    /* RESTRICCIÓN: Solo letras, acentos y espacios */
                    onChange={(e) => {
                      const valor = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                      setFormData({ ...formData, apellidos: valor.toUpperCase() });
                    }}
                  />
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>DNI</label>
                  <input
                    className="input-modern"
                    value={formData.dni}
                    placeholder="EJ. 46591170"
                    maxLength={8}
                    /* RESTRICCIÓN: Solo números */
                    onChange={(e) => {
                      const valor = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, dni: valor });
                    }}
                  />
                </div>
                <div className="modal-field">
                  <label>Teléfono</label>
                  <input
                    className="input-modern"
                    value={formData.telefono}
                    placeholder="EJ. 987654321"
                    maxLength={9}
                    /* RESTRICCIÓN: Solo números */
                    onChange={(e) => {
                      const valor = e.target.value.replace(/\D/g, "");
                      setFormData({ ...formData, telefono: valor });
                    }}
                  />
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Email</label>
                  <input
                    className="input-modern"
                    type="email"
                    value={formData.email}
                    placeholder="EJ. admin@empresa.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="modal-field">
                  <label>Monto</label>
                  <input
                    className="input-modern"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.monto}
                    placeholder="EJ. 150.00"
                    /* RESTRICCIÓN: Input tipo number evita letras (salvo la 'e' matemática) */
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                  />
                </div>
              </div>

              {/* Divisor */}
              <div className="modal-divider"><span>Documentos adjuntos</span></div>

              {/* Zona drag & drop para subir imágenes */}
              <div
                className={`upload-zone ${isDragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  handleSubirImagenesModal(Array.from(e.dataTransfer.files));
                }}
                onClick={() => document.getElementById("file-input-admin").click()}
              >
                <FaCloudUploadAlt className="upload-icon" />
                <p className="upload-text">
                  Arrastra imágenes aquí o <span>haz clic para seleccionar</span>
                </p>
                <p className="upload-subtext">PNG, JPG, WEBP — máx. 10 imágenes</p>
                <input
                  id="file-input-admin"
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => handleSubirImagenesModal(Array.from(e.target.files))}
                />
              </div>

              {/* Lista de imágenes subidas en el modal */}
              {formData.imagenes?.length > 0 && (
                <div className="modal-imgs-list">
                  {formData.imagenes.map((img, i) => (
                    <div key={i} className="modal-img-row">
                      <img src={img.data} alt={img.nombre} className="modal-img-thumb" />
                      <div className="modal-img-info">
                        <span className="modal-img-name">{img.nombre}</span>
                        <span className="modal-img-date">{img.fecha}</span>
                      </div>
                      <div className="modal-img-actions">
                        <button
                          className="img-action-btn download"
                          onClick={() => triggerDownload(img.data, img.nombre)}
                          title="Descargar"
                        >
                          <FaDownload />
                        </button>
                        <button
                          className="img-action-btn delete"
                          onClick={() => eliminarImagenModal(i)}
                          title="Eliminar"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Guardar */}
              <button className="btn-confirmar-blue" onClick={guardarEdicion}>
                {editingAdmin ? "Guardar Cambios" : "Agregar Registro"}
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Administrador;