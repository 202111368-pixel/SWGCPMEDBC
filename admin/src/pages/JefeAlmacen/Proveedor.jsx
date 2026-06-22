import React, { useState, useEffect } from "react";
import { FaTruck, FaSearch, FaTrashAlt, FaEdit, FaPhone, FaEnvelope } from "react-icons/fa";
import "../../styles/pages/JefeAlmacen/Proveedor.css"; 

const Proveedor = () => {
  const [proveedores, setProveedores] = useState(() => {
    const localData = localStorage.getItem("db_proveedores");
    return localData ? JSON.parse(localData) : [
      { id: 1, empresa: "Melaminas del Centro S.A.", ruc: "20456789121", contacto: "Carlos Mendoza", telefono: "987654321", correo: "ventas@melacentro.com", insumo: "Tableros de Melamina" },
      { id: 2, empresa: "Distribuidora PVC Premium", ruc: "20123456789", contacto: "Ana López", telefono: "912345678", correo: "alopez@pvcpremium.pe", insumo: "Tapacantos y Cantos PVC" },
      { id: 3, empresa: "Herrajes y Accesorios D'Bary", ruc: "20987654321", contacto: "Luis Arce", telefono: "934567890", correo: "larce@herrajesdbary.com", insumo: "Tornillos y Bisagras" }
    ];
  });

  const [form, setForm] = useState({ id: null, empresa: "", ruc: "", contacto: "", telefono: "", correo: "", insumo: "" });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("db_proveedores", JSON.stringify(proveedores));
  }, [proveedores]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.empresa || !form.ruc || !form.insumo) {
      alert("Por favor, rellena los campos obligatorios (Empresa, RUC e Insumo Principal).");
      return;
    }

    if (isEditing) {
      setProveedores(proveedores.map(p => p.id === form.id ? form : p));
      setIsEditing(false);
    } else {
      const nuevoProveedor = { ...form, id: Date.now() };
      setProveedores([...proveedores, nuevoProveedor]);
    }

    setForm({ id: null, empresa: "", ruc: "", contacto: "", telefono: "", correo: "", insumo: "" });
  };

  const handleEdit = (p) => {
    setForm(p);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este proveedor?")) {
      setProveedores(proveedores.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setForm({ id: null, empresa: "", ruc: "", contacto: "", telefono: "", correo: "", insumo: "" });
    setIsEditing(false);
  };

  const filteredProveedores = proveedores.filter(p =>
    p.empresa.toLowerCase().includes(search.toLowerCase()) ||
    p.ruc.includes(search) ||
    p.insumo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="prov-container fade-in-prov">
      <div className="prov-header-box">
        <div className="prov-title-side">
          <div className="prov-icon-circle">
            <FaTruck />
          </div>
          <div>
            <h2>Gestión de Proveedores</h2>
            <p>Administra las entidades encargadas del reabastecimiento de materias primas e insumos.</p>
          </div>
        </div>
      </div>

      <div className="prov-grid-layout">
        <div className="prov-card-form">
          <h3>{isEditing ? "Editar Proveedor" : "Registrar Nuevo Proveedor"}</h3>
          <form onSubmit={handleSubmit} className="prov-form">
            <div className="prov-field">
              <label>Razón Social / Empresa *</label>
              <input type="text" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Ej. Melaminas S.A.C." required />
            </div>

            <div className="prov-field">
              <label>RUC *</label>
              <input type="text" name="ruc" value={form.ruc} onChange={handleChange} placeholder="Número de RUC (11 dígitos)" maxLength="11" required />
            </div>

            <div className="prov-field">
              <label>Insumo Principal *</label>
              <input type="text" name="insumo" value={form.insumo} onChange={handleChange} placeholder="Ej. Tableros, Cantos, Cerraduras" required />
            </div>

            <div className="prov-field">
              <label>Persona de Contacto</label>
              <input type="text" name="contacto" value={form.contacto} onChange={handleChange} placeholder="Nombre del asesor" />
            </div>

            <div className="prov-field">
              <label>Teléfono</label>
              <input type="text" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ej. 987654321" />
            </div>

            <div className="prov-field">
              <label>Correo Electrónico</label>
              <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="correo@proveedor.com" />
            </div>

            <div className="prov-form-actions">
              <button type="submit" className="prov-btn-submit">
                {isEditing ? "Guardar Cambios" : "Agregar Proveedor"}
              </button>
              {isEditing && (
                <button type="button" className="prov-btn-cancel" onClick={handleCancel}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="prov-card-table">
          <div className="prov-table-header">
            <div className="prov-search-wrapper">
              <FaSearch className="search-icon-inside" />
              <input 
                type="text" 
                placeholder="Buscar por empresa, RUC o insumo..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span className="prov-counter">Total: <b>{filteredProveedores.length}</b></span>
          </div>

          <div className="prov-table-responsive">
            <table className="prov-table">
              <thead>
                <tr>
                  <th>Empresa / RUC</th>
                  <th style={{ textAlign: "center" }}>Insumo Principal</th>
                  <th style={{ textAlign: "center" }}>Contacto</th>
                  <th style={{ textAlign: "center" }}>Canales de comunicación</th>
                  <th style={{ textAlign: "center" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProveedores.length > 0 ? (
                  filteredProveedores.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="prov-cell-empresa">{p.empresa}</div>
                        <div className="prov-cell-ruc">RUC: {p.ruc}</div>
                      </td>
                      {/* Alineación al centro aplicada en las celdas */}
                      <td style={{ textAlign: "center" }}>
                        <span className="prov-tag-insumo">{p.insumo}</span>
                      </td>
                      <td className="prov-cell-txt" style={{ textAlign: "center" }}>
                        {p.contacto || "—"}
                      </td>
                      <td>
                        <div className="prov-contact-center-wrapper">
                          {p.telefono && <div className="prov-contact-item"><FaPhone size={11} /> {p.telefono}</div>}
                          {p.correo && <div className="prov-contact-item"><FaEnvelope size={11} /> {p.correo}</div>}
                          {!p.telefono && !p.correo && <span className="prov-empty">—</span>}
                        </div>
                      </td>
                      <td>
                        <div className="prov-actions-btns">
                          <button className="prov-action-btn edit" title="Editar" onClick={() => handleEdit(p)}>
                            <FaEdit />
                          </button>
                          <button className="prov-action-btn delete" title="Eliminar" onClick={() => handleDelete(p)}>
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="prov-no-data">
                      No se encontraron proveedores que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proveedor;