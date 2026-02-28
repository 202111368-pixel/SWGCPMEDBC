import React, { useState } from "react";
import "../../styles/pages/Almacen/Categoria.css"; 
import { FaPlus, FaSearch, FaBars, FaTimes, FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";

const Categoria = () => {
  const [categorias, setCategorias] = useState([
    { id: 1, codigo: "TAB", nombre: "TABLEROS DE MELAMINA", descripcion: "Tableros de 18mm, 15mm y fondos", estado: "VIGENTE" },
    { id: 2, codigo: "TAP", nombre: "TAPACANTOS (PVC / GRUESO)", descripcion: "Rollos de tapacanto delgado y grueso", estado: "VIGENTE" },
    { id: 3, codigo: "BIS", nombre: "BISAGRAS Y RETENES", descripcion: "Bisagras parche, semiparche, interiores", estado: "VIGENTE" },
    { id: 4, codigo: "COR", nombre: "CORREDERAS", descripcion: "Telescópicas, pesadas y cierre suave", estado: "VIGENTE" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [menuOpcionesId, setMenuOpcionesId] = useState(null);
  const [formData, setFormData] = useState({ id: null, codigo: "", nombre: "", descripcion: "", estado: "VIGENTE" });

  const abrirModal = (categoria = null) => {
    if (categoria) {
      setFormData(categoria);
    } else {
      setFormData({ id: null, codigo: "", nombre: "", descripcion: "", estado: "VIGENTE" });
    }
    setShowModal(true);
    setMenuOpcionesId(null);
  };

  const cerrarModal = () => setShowModal(false);

  const guardarCategoria = () => {
    if (!formData.nombre.trim()) {
      alert("Por favor ingrese el nombre de la categoría.");
      return;
    }

    if (formData.id) {
      setCategorias(categorias.map(cat => cat.id === formData.id ? formData : cat));
    } else {
      const nuevaCategoria = { ...formData, id: Date.now() };
      setCategorias([...categorias, nuevaCategoria]);
    }
    cerrarModal();
  };

  const eliminarCategoria = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      setCategorias(categorias.filter(cat => cat.id !== id));
      setMenuOpcionesId(null);
    }
  };

  const toggleEstado = () => {
    setFormData({
      ...formData,
      estado: formData.estado === "VIGENTE" ? "DESCONTINUADA" : "VIGENTE"
    });
  };

  return (
    <div className="categoria-container fade-in-up">
      
      <div className="categoria-header">
        <h2>Gestión de Categorías</h2>
        <button className="btn-agregar pulse-hover" onClick={() => abrirModal()}>
          <FaPlus style={{ marginRight: "8px" }} /> Agregar Nuevo
        </button>
      </div>

      <div className="categoria-toolbar">
        <div className="search-group">
          <label>Buscar:</label>
          <div className="input-with-icon">
            <input type="text" className="input-animado" placeholder="Escriba para filtrar..." />
            <FaSearch className="icon-search" />
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="categoria-table">
          <thead>
            <tr>
              <th>Cód. <span>↕</span></th>
              <th>Categoria <span>↕</span></th>
              <th>Descripción <span>↕</span></th>
              <th>Estado <span>↕</span></th>
              <th>Opciones <span>↕</span></th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat, index) => (
              <tr key={cat.id} className="row-animada" style={{ animationDelay: `${index * 0.1}s` }}>
                <td><strong>{cat.codigo || "-"}</strong></td>
                <td>{cat.nombre}</td>
                <td style={{ color: "#777", fontSize: "0.85rem" }}>{cat.descripcion || "Sin descripción"}</td>
                <td>
                  <span className={`badge ${cat.estado === 'VIGENTE' ? 'badge-vigente' : 'badge-descontinuada'}`}>
                    {cat.estado}
                  </span>
                </td>
                <td style={{ position: "relative" }}>
                  <button 
                    className="btn-opciones" 
                    onClick={() => setMenuOpcionesId(menuOpcionesId === cat.id ? null : cat.id)}
                  >
                    <FaBars />
                  </button>
                  
                  {menuOpcionesId === cat.id && (
                    <div className="dropdown-opciones slide-in">
                      <button onClick={() => abrirModal(cat)}><FaEdit className="icon-blue" /> Editar</button>
                      <button onClick={() => eliminarCategoria(cat.id)} className="text-danger"><FaTrash /> Eliminar</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content bounce-in">
            
            <div className="modal-header">
              <h3><FaEdit style={{ color: "#2196f3" }}/> Ingresar Categoria</h3>
              <button className="btn-cerrar-modal" onClick={cerrarModal}><FaTimes /></button>
            </div>

            <div className="modal-body">
              <div className="alert-info float-anim">
                <FaInfoCircle className="icon-info" />
                <span>Los campos con <span className="text-danger">*</span> son necesarios.</span>
              </div>

              <div className="form-group">
                <label>Código / Prefijo</label>
                <input 
                  type="text" 
                  className="input-moderno"
                  placeholder="EJ. TAB" 
                  maxLength="5"
                  value={formData.codigo}
                  onChange={(e) => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="form-group">
                <label>Categoria <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  className="input-moderno"
                  placeholder="EJ. TABLEROS DE MELAMINA" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea 
                  className="input-moderno textarea-moderno"
                  placeholder="Detalles de lo que incluye esta categoría..." 
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  rows="2"
                />
              </div>

              <div className="form-group switch-group">
                <div className={`toggle-switch ${formData.estado === 'VIGENTE' ? 'active' : ''}`} onClick={toggleEstado}>
                  <div className="toggle-circle"></div>
                </div>
                <span className={formData.estado === 'VIGENTE' ? 'text-vigente' : 'text-descontinuada'}>
                  {formData.estado}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-guardar btn-animado" onClick={guardarCategoria}>Guardar Datos</button>
              <button className="btn-cerrar btn-animado" onClick={cerrarModal}>Cancelar</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Categoria;