import React, { useState, useMemo, useCallback, useEffect } from "react";
import "../../styles/pages/Cliente/Cliente.css"; 
import { 
  FaUserPlus, FaSearch, FaPhone, 
  FaTimes, FaUserCog, FaStore,
  FaTools, FaCheckCircle,
  FaEdit, FaTrashAlt
} from "react-icons/fa";

const Cliente = () => {
  const [clientes, setClientes] = useState(() => {
    const savedData = localStorage.getItem("db_clientes");
    return savedData ? JSON.parse(savedData) : [
      { id: 1, nombre: "MUEBLES EL ROBLE S.A.C.", documento: "20601234567", tipo: "EMPRESA", celular: "987654321" },
      { id: 2, nombre: "JUAN CARLOS RIVERA", documento: "45789632", tipo: "CARPINTERO", celular: "912345678" },
    ];
  });

  const [ui, setUi] = useState({ modal: false });
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ id: null, nombre: "", documento: "", tipo: "CARPINTERO", celular: "" });
  const [notification, setNotification] = useState({ show: false, title: "", message: "", type: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("db_clientes", JSON.stringify(clientes));
  }, [clientes]);

  const showToast = (title, msg, type = "success") => {
    setNotification({ show: true, title, message: msg, type });
    setTimeout(() => setNotification({ show: false, title: "", message: "", type: "" }), 4000);
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = true;
    if (!formData.documento.trim()) newErrors.documento = true;
    if (!formData.celular.trim()) newErrors.celular = true;
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
      showToast("REGISTRO EXITOSO", `${formData.nombre} se guardó en la tabla.`, "success");
    }
    setUi({ modal: false });
  };

  const handleEdit = (cliente) => {
    setErrors({});
    setFormData(cliente);
    setUi({ modal: true });
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
      c.documento.includes(searchTerm)
    );
  }, [clientes, searchTerm]);

  const toggleModal = useCallback(() => {
    setErrors({});
    setFormData({ id: null, nombre: "", documento: "", tipo: "CARPINTERO", celular: "" });
    setUi(prev => ({ ...prev, modal: !prev.modal }));
  }, []);

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
        <button className="hub-btn-add" onClick={toggleModal}><FaUserPlus /> Nuevo Registro</button>
      </div>

      <div className="hub-search-bar">
        <FaSearch />
        <input placeholder="Buscar..." onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="hub-table-frame">
        <table className="hub-table">
          <thead>
            <tr>
              <th>Identidad</th>
              <th>Documento</th>
              <th>Perfil</th>
              <th>Contacto</th>
              <th className="txt-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.nombre}</strong></td>
                <td><span className="hub-badge-doc">{c.documento}</span></td>
                <td>
                  <span className={`hub-tag ${c.tipo.toLowerCase()}`}>
                    {c.tipo === 'CARPINTERO' ? <FaTools/> : <FaStore/>} {c.tipo}
                  </span>
                </td>
                <td><FaPhone className="clr-green" /> {c.celular}</td>
                <td className="txt-center">
                  <button className="act-btn edit" onClick={() => handleEdit(c)}><FaEdit /></button>
                  <button className="act-btn delete" onClick={() => handleDelete(c.id, c.nombre)}><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ui.modal && (
        <div className="ia-modal-overlay">
          <div className="ia-modal-card">
            <div className="ia-modal-head">
              <h3>{formData.id ? "Editar Perfil" : "Nuevo Registro"}</h3>
              <button onClick={() => setUi({modal: false})} className="close-x"><FaTimes /></button>
            </div>
            <div className="ia-modal-body">
              <div className="ia-input-group">
                <label>Nombre Completo</label>
                <input className={errors.nombre ? "input-err" : ""} value={formData.nombre} 
                       onChange={e => setFormData({...formData, nombre: e.target.value.toUpperCase()})} />
              </div>
              <div className="ia-grid">
                <div className="ia-input-group">
                  <label>DNI / RUC</label>
                  <input className={errors.documento ? "input-err" : ""} value={formData.documento} 
                         onChange={e => setFormData({...formData, documento: e.target.value})} />
                </div>
                <div className="ia-input-group">
                  <label>WhatsApp</label>
                  <input className={errors.celular ? "input-err" : ""} value={formData.celular} 
                         onChange={e => setFormData({...formData, celular: e.target.value})} />
                </div>
              </div>
              <div className="ia-input-group">
                <label>Categoría</label>
                <select value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                  <option value="CARPINTERO">MAESTRO CARPINTERO</option>
                  <option value="EMPRESA">EMPRESA / R. SOCIAL</option>
                  <option value="FINAL">CLIENTE FINAL</option>
                </select>
              </div>
              <button className="btn-save-ia" onClick={processForm}>{formData.id ? "Actualizar" : "Registrar"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cliente;