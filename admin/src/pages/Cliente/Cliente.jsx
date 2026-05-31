import React, { useState, useMemo, useCallback, useEffect } from "react";
import "../../styles/pages/Cliente/Cliente.css";
import {
  FaUserPlus, FaSearch, FaPhone,
  FaTimes, FaUserCog, FaStore,
  FaTools, FaCheckCircle,
  FaEdit, FaTrashAlt, FaLock,
  FaEye, FaEyeSlash, FaPrint,
  FaChevronLeft, FaChevronRight,
  FaEnvelope, FaMapMarkerAlt,
  FaIdCard, FaBuilding, FaChevronDown
} from "react-icons/fa";

const ITEMS_POR_PAGINA = 3;
const PASSWORD_EDICION = "admin123";

const Cliente = () => {
  const [clientes, setClientes] = useState(() => {
    const savedData = localStorage.getItem("db_clientes");
    return savedData ? JSON.parse(savedData) : [
      { id: 1, nombre: "MUEBLES EL ROBLE", apellido: "S.A.C.", documento: "20601234567", tipo: "EMPRESA", celular: "987654321", email: "elroble@empresa.com", direccion: "Av. Industrial 234, Lima", giro: "VENTA DE MUEBLES", limiteCrediticio: "5000", estado: "ACTIVO" },
      { id: 2, nombre: "JUAN CARLOS", apellido: "RIVERA LÓPEZ", documento: "45789632", tipo: "CARPINTERO", celular: "912345678", email: "jcrivera@gmail.com", direccion: "Jr. Los Pinos 456, Miraflores", giro: "CARPINTERÍA", limiteCrediticio: "2000", estado: "ACTIVO" },
      { id: 3, nombre: "DISTRIBUIDORA", apellido: "NORTE S.R.L.", documento: "20512398741", tipo: "EMPRESA", celular: "945123678", email: "dnorte@dist.com", direccion: "Av. Zarumilla 890, Callao", giro: "DISTRIBUCIÓN", limiteCrediticio: "8000", estado: "INACTIVO" },
      { id: 4, nombre: "PEDRO", apellido: "MAMANI QUISPE", documento: "70234891", tipo: "CARPINTERO", celular: "923456789", email: "pmamani@gmail.com", direccion: "Calle Los Álamos 12, SJL", giro: "CARPINTERÍA FINA", limiteCrediticio: "1500", estado: "ACTIVO" },
    ];
  });

  const [ui, setUi] = useState({ modal: false, passwordModal: false, reporteMenu: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [formData, setFormData] = useState({ id: null, nombre: "", apellido: "", documento: "", tipo: "CARPINTERO", celular: "", email: "", direccion: "", giro: "", limiteCrediticio: "", estado: "ACTIVO" });
  const [notification, setNotification] = useState({ show: false, title: "", message: "", type: "" });
  const [errors, setErrors] = useState({});
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [clienteAEditar, setClienteAEditar] = useState(null);

  useEffect(() => {
    localStorage.setItem("db_clientes", JSON.stringify(clientes));
  }, [clientes]);

  useEffect(() => {
    const handleClickOutside = () => {
      if (ui.reporteMenu) setUi(prev => ({ ...prev, reporteMenu: false }));
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ui.reporteMenu]);

  const showToast = (title, msg, type = "success") => {
    setNotification({ show: true, title, message: msg, type });
    setTimeout(() => setNotification({ show: false, title: "", message: "", type: "" }), 4000);
  };

  const esNombreValido = (valor) => {
    const texto = valor.trim();
    if (!texto) return false;
    if (/\d/.test(texto)) return false;
    if (/(.)\1{2,}/.test(texto)) return false;
    const soloLetras = texto.replace(/\s/g, "");
    const letrasUnicas = new Set(soloLetras.toUpperCase());
    if (letrasUnicas.size < 3) return false;
    return true;
  };

  const validate = () => {
    let newErrors = {};
    if (!esNombreValido(formData.nombre)) newErrors.nombre = true;
    if (!esNombreValido(formData.apellido)) newErrors.apellido = true;
    if (!formData.documento.trim()) newErrors.documento = true;
    if (!formData.celular.trim()) newErrors.celular = true;
    if (!formData.email.trim()) newErrors.email = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processForm = () => {
    if (!validate()) {
      showToast("SISTEMA DE SEGURIDAD", "Error: Faltan parámetros obligatorios.", "error");
      return;
    }
    if (formData.id) {
      setClientes(clientes.map(c => c.id === formData.id ? formData : c));
      showToast("ACTUALIZACIÓN", `${formData.nombre} ha sido actualizado.`, "success");
    } else {
      const nuevo = { ...formData, id: Date.now() };
      setClientes([...clientes, nuevo]);
      showToast("REGISTRO EXITOSO", `${formData.nombre} se guardó correctamente.`, "success");
    }
    setUi(prev => ({ ...prev, modal: false }));
  };

  const handleEditClick = (cliente) => {
    setClienteAEditar(cliente);
    setPasswordInput("");
    setPasswordError("");
    setShowPassword(false);
    setUi(prev => ({ ...prev, passwordModal: true }));
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === PASSWORD_EDICION) {
      setErrors({});
      setFormData(clienteAEditar);
      setUi({ modal: true, passwordModal: false, reporteMenu: false });
      setPasswordInput("");
      setPasswordError("");
    } else {
      setPasswordError("Contraseña incorrecta. Intente de nuevo.");
    }
  };

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${nombre}?`)) {
      setClientes(clientes.filter(c => c.id !== id));
      showToast("SISTEMA", "El registro ha sido eliminado correctamente.", "error");
    }
  };

  const filteredData = useMemo(() => {
    return clientes.filter(c =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.apellido && c.apellido.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.documento.includes(searchTerm)
    );
  }, [clientes, searchTerm]);

  const totalPaginas = Math.ceil(filteredData.length / ITEMS_POR_PAGINA);

  const clientesPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    return filteredData.slice(inicio, inicio + ITEMS_POR_PAGINA);
  }, [filteredData, paginaActual]);

  useEffect(() => {
    setPaginaActual(1);
  }, [searchTerm]);

  const toggleModal = useCallback(() => {
    setErrors({});
    setFormData({ id: null, nombre: "", apellido: "", documento: "", tipo: "CARPINTERO", celular: "", email: "", direccion: "", giro: "", limiteCrediticio: "", estado: "ACTIVO" });
    setUi(prev => ({ ...prev, modal: !prev.modal }));
  }, []);

  const imprimirReporte = (tipo) => {
    const lista = clientes.filter(c => c.estado === tipo);
    const titulo = tipo === "ACTIVO" ? "Clientes Activos" : "Clientes Inactivos";
    const contenido = `
      <html><head>
        <title>${titulo}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; color: #1e293b; }
          h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          p.meta { color: #64748b; font-size: 13px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th { background: #1e293b; color: white; padding: 10px 12px; text-align: left; }
          td { padding: 9px 12px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) { background: #f8fafc; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; }
          .activo { background: #dcfce7; color: #166534; }
          .inactivo { background: #fef2f2; color: #991b1b; }
        </style>
      </head><body>
        <h1>📋 ${titulo}</h1>
        <p class="meta">D'Bary Company · Sistema de Melamina · Generado: ${new Date().toLocaleString("es-PE")}</p>
        <table>
          <thead><tr>
            <th>#</th><th>Nombre</th><th>Apellido</th><th>Documento</th>
            <th>Tipo</th><th>Teléfono</th><th>Email</th>
            <th>Dirección</th><th>Giro</th><th>Límite Cred.</th><th>Estado</th>
          </tr></thead>
          <tbody>
            ${lista.map((c, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><strong>${c.nombre}</strong></td>
                <td>${c.apellido || "-"}</td>
                <td>${c.documento}</td>
                <td>${c.tipo}</td>
                <td>${c.celular}</td>
                <td>${c.email || "-"}</td>
                <td>${c.direccion || "-"}</td>
                <td>${c.giro || "-"}</td>
                <td>S/ ${c.limiteCrediticio || "0"}</td>
                <td><span class="badge ${c.estado?.toLowerCase()}">${c.estado}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
        <p style="margin-top:20px; color:#94a3b8; font-size:12px;">Total: ${lista.length} cliente(s)</p>
      </body></html>
    `;
    const ventana = window.open("", "_blank");
    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();
    setUi(prev => ({ ...prev, reporteMenu: false }));
  };

  return (
    <div className="hub-container">
      {notification.show && (
        <div className={`toast-card ${notification.type}`}>
          <div className="toast-left-border"></div>
          <div className="toast-icon-circle">{notification.type === "success" ? <FaCheckCircle /> : "!"}</div>
          <div className="toast-content">
            <div className="toast-header-row">
              <span className="toast-title">{notification.title}</span>
              <span className="toast-time">ahora</span>
            </div>
            <p className="toast-msg">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="hub-header">
        <div className="hub-branding">
          <div className="hub-logo-anim"><FaUserCog /></div>
          <h1>Gestión de Cliente</h1>
        </div>
        <div className="hub-header-actions">
          <div className="reporte-wrapper" onClick={e => e.stopPropagation()}>
            <button className="hub-btn-reporte" onClick={() => setUi(prev => ({ ...prev, reporteMenu: !prev.reporteMenu }))}>
              <FaPrint /> Imprimir Reporte <FaChevronDown className={`chevron ${ui.reporteMenu ? "open" : ""}`} />
            </button>
            {ui.reporteMenu && (
              <div className="reporte-dropdown">
                <button onClick={() => imprimirReporte("ACTIVO")}>
                  <span className="reporte-icon">📄</span> Clientes Activos
                </button>
                <button onClick={() => imprimirReporte("INACTIVO")}>
                  <span className="reporte-icon">📄</span> Clientes Inactivos
                </button>
              </div>
            )}
          </div>
          <button className="hub-btn-add" onClick={toggleModal}><FaUserPlus /> Nuevo Registro</button>
        </div>
      </div>

      <div className="hub-search-bar">
        <FaSearch />
        <input placeholder="Buscar por nombre o documento..." onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="hub-table-frame">
        <table className="hub-table">
          <thead>
            <tr>
              <th>Identidad</th>
              <th>Documento</th>
              <th>Perfil</th>
              <th>Contacto</th>
              <th>Estado</th>
              <th className="txt-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesPagina.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>No se encontraron clientes.</td></tr>
            ) : (
              clientesPagina.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.nombre}</strong>
                    {c.apellido && <div style={{ fontSize: "12px", color: "#64748b" }}>{c.apellido}</div>}
                  </td>
                  <td><span className="hub-badge-doc">{c.documento}</span></td>
                  <td>
                    <span className={`hub-tag ${c.tipo.toLowerCase()}`}>
                      {c.tipo === "CARPINTERO" ? <FaTools /> : <FaStore />} {c.tipo}
                    </span>
                  </td>
                  <td><FaPhone className="clr-green" /> {c.celular}</td>
                  <td>
                    <span className={`estado-badge ${c.estado === "ACTIVO" ? "activo" : "inactivo"}`}>
                      {c.estado || "ACTIVO"}
                    </span>
                  </td>
                  <td className="txt-center">
                    <button className="act-btn edit" onClick={() => handleEditClick(c)}><FaEdit /></button>
                    <button className="act-btn delete" onClick={() => handleDelete(c.id, c.nombre)}><FaTrashAlt /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPaginas > 1 && (
          <div className="paginacion">
            <span className="pag-info">
              Mostrando {Math.min((paginaActual - 1) * ITEMS_POR_PAGINA + 1, filteredData.length)}–{Math.min(paginaActual * ITEMS_POR_PAGINA, filteredData.length)} de {filteredData.length}
            </span>
            <div className="pag-controles">
              <button className="pag-btn" onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1}>
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button key={i + 1} className={`pag-btn ${paginaActual === i + 1 ? "active" : ""}`} onClick={() => setPaginaActual(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="pag-btn" onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {ui.passwordModal && (
        <div className="ia-modal-overlay">
          <div className="ia-modal-card password-modal">
            <div className="ia-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="lock-icon-circle"><FaLock /></div>
                <div>
                  <h3 style={{ margin: 0 }}>Acceso Restringido</h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Ingrese la contraseña para editar</p>
                </div>
              </div>
              <button onClick={() => setUi(prev => ({ ...prev, passwordModal: false }))} className="close-x"><FaTimes /></button>
            </div>
            <div className="ia-modal-body">
              <div className="ia-input-group">
                <label>Contraseña de Edición <span style={{ color: "#ef4444" }}>*</span></label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={e => { setPasswordInput(e.target.value); setPasswordError(""); }}
                    onKeyDown={e => e.key === "Enter" && handlePasswordSubmit()}
                    placeholder="Ingrese la contraseña..."
                    className={passwordError ? "input-err" : ""}
                    autoFocus
                  />
                  <button className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError && <span className="error-msg"><span>⚠</span> {passwordError}</span>}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn-cancel-ia" onClick={() => setUi(prev => ({ ...prev, passwordModal: false }))}>Cancelar</button>
                <button className="btn-save-ia" onClick={handlePasswordSubmit}><FaLock /> Verificar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {ui.modal && (
        <div className="ia-modal-overlay">
          <div className="ia-modal-card ia-modal-wide">
            <div className="ia-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="hub-logo-anim" style={{ width: 36, height: 36, fontSize: "1rem" }}>
                  {formData.id ? <FaEdit /> : <FaUserPlus />}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{formData.id ? "Editar Cliente" : "Ingresar Cliente"}</h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                    {formData.id ? "Modifique los datos del cliente" : "Complete los campos requeridos *"}
                  </p>
                </div>
              </div>
              <button onClick={() => setUi(prev => ({ ...prev, modal: false }))} className="close-x"><FaTimes /></button>
            </div>

            <div className="ia-modal-body">
              <div className="form-aviso">
                <span className="aviso-icon">i</span>
                Estimado usuario: Los campos remarcados con <strong>*</strong> son necesarios.
              </div>

              <div className="ia-input-group">
                <label><FaIdCard className="label-icon" /> Código</label>
                <input value={formData.id ? `CLI-${formData.id}` : "AUTOGENERADO"} disabled className="input-disabled" />
              </div>

              <div className="ia-grid">
                <div className="ia-input-group">
                  <label>Nombre <span className="req">*</span></label>
                  <input
                    className={errors.nombre ? "input-err" : ""}
                    value={formData.nombre}
                    placeholder="EJ. JUAN / MUEBLES EL ROBLE"
                    onChange={e => setFormData({ ...formData, nombre: e.target.value.toUpperCase() })}
                  />
                  {errors.nombre && <span className="field-error-msg">Ingrese un nombre válido, sin caracteres repetidos.</span>}
                </div>
                <div className="ia-input-group">
                  <label>Apellido / Razón Social <span className="req">*</span></label>
                  <input
                    className={errors.apellido ? "input-err" : ""}
                    value={formData.apellido}
                    placeholder="EJ. RIVERA LÓPEZ / S.A.C."
                    onChange={e => setFormData({ ...formData, apellido: e.target.value.toUpperCase() })}
                  />
                  {errors.apellido && <span className="field-error-msg">Ingrese un apellido válido, sin caracteres repetidos.</span>}
                </div>
              </div>

              <div className="ia-grid">
                <div className="ia-input-group">
                  <label>DNI <span className="req">*</span></label>
                  <input
                    className={errors.documento ? "input-err" : ""}
                    value={formData.documento}
                    placeholder="EJ. 46591170"
                    onChange={e => setFormData({ ...formData, documento: e.target.value })}
                  />
                </div>
                <div className="ia-input-group">
                  <label>RUC</label>
                  <input value={formData.ruc || ""} placeholder="EJ. 10465911706"
                    onChange={e => setFormData({ ...formData, ruc: e.target.value })} />
                </div>
              </div>

              <div className="ia-grid">
                <div className="ia-input-group">
                  <label><FaPhone className="label-icon" /> Teléfono / WhatsApp <span className="req">*</span></label>
                  <input
                    className={errors.celular ? "input-err" : ""}
                    value={formData.celular}
                    placeholder="EJ. 987654321"
                    onChange={e => setFormData({ ...formData, celular: e.target.value })}
                  />
                </div>
                <div className="ia-input-group">
                  <label><FaEnvelope className="label-icon" /> Email <span className="req">*</span></label>
                  <input
                    className={errors.email ? "input-err" : ""}
                    value={formData.email}
                    placeholder="EJ. cliente@empresa.com"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="ia-grid">
                <div className="ia-input-group">
                  <label><FaBuilding className="label-icon" /> Giro</label>
                  <input value={formData.giro || ""} placeholder="EJ. VENTA DE SUMINISTROS"
                    onChange={e => setFormData({ ...formData, giro: e.target.value.toUpperCase() })} />
                </div>
                <div className="ia-input-group">
                  <label>Límite Crediticio</label>
                  <div className="credito-input">
                    <button onClick={() => setFormData({ ...formData, limiteCrediticio: String(Math.max(0, Number(formData.limiteCrediticio || 0) - 100)) })}>−</button>
                    <span className="credito-symbol">S/</span>
                    <input
                      type="number"
                      value={formData.limiteCrediticio || ""}
                      placeholder="EJ. 2500.00"
                      onChange={e => setFormData({ ...formData, limiteCrediticio: e.target.value })}
                    />
                    <button onClick={() => setFormData({ ...formData, limiteCrediticio: String(Number(formData.limiteCrediticio || 0) + 100) })}>+</button>
                  </div>
                </div>
              </div>

              <div className="ia-input-group">
                <label><FaMapMarkerAlt className="label-icon" /> Dirección</label>
                <input value={formData.direccion || ""} placeholder="EJ. CALLE MALECÓN IQUIQUE 406, MIRAFLORES - LIMA"
                  onChange={e => setFormData({ ...formData, direccion: e.target.value.toUpperCase() })} />
              </div>

              <div className="ia-grid">
                <div className="ia-input-group">
                  <label>Categoría</label>
                  <select value={formData.tipo} onChange={e => setFormData({ ...formData, tipo: e.target.value })}>
                    <option value="CARPINTERO">MAESTRO CARPINTERO</option>
                    <option value="EMPRESA">EMPRESA / R. SOCIAL</option>
                    <option value="FINAL">CLIENTE FINAL</option>
                  </select>
                </div>
                <div className="ia-input-group">
                  <label>Estado</label>
                  <select value={formData.estado || "ACTIVO"} onChange={e => setFormData({ ...formData, estado: e.target.value })}>
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                  </select>
                </div>
              </div>

              <button className="btn-save-ia" onClick={processForm}>
                {formData.id ? "✔ Actualizar Cliente" : "✔ Registrar Cliente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cliente;
