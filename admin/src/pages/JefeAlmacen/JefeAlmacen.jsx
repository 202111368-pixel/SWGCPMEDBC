import React, { useState, useMemo } from 'react';
import "../../styles/pages/JefeAlmacen/JefeAlmacen.css"; 
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaWarehouse, 
  FaExclamationTriangle, FaCheckCircle, FaShoppingCart, FaSearch, FaPhoneAlt, FaLayerGroup 
} from "react-icons/fa";

const JefeAlmacen = () => {
  const [activeTab, setActiveTab] = useState('stock'); 
  const [searchTerm, setSearchTerm] = useState("");
  
  const [productos, setProductos] = useState([
    { id: 1, nombre: "MELAMINA BLANCO MATE 18MM", categoria: "TABLERO", stock: 15, stockMin: 10, proveedor: "PELIKANO", precio: 185.00, medida: "Plancha" },
    { id: 2, nombre: "MELAMINA ROBLE SANTANA 18MM", categoria: "TABLERO", stock: 4, stockMin: 8, proveedor: "VESTO", precio: 215.00, medida: "Plancha" },
    { id: 3, nombre: "TAPACANTO PVC DELGADO NEGRO", categoria: "TAPACANTO", stock: 120, stockMin: 50, proveedor: "REHAU", precio: 0.90, medida: "Metros" },
    { id: 4, nombre: "TAPACANTO GRUESO CEDRO 3MM", categoria: "TAPACANTO", stock: 15, stockMin: 30, proveedor: "REHAU", precio: 2.50, medida: "Metros" },
  ]);

  const [proveedores] = useState([
    { id: 1, empresa: "PELIKANO", ruc: "20100456781", contacto: "Ing. Carlos Ruiz", tel: "987-654-321", rubro: "Tableros" },
    { id: 2, empresa: "VESTO", ruc: "20556789123", contacto: "Lucía Méndez", tel: "912-345-678", rubro: "Tableros" },
    { id: 3, empresa: "REHAU", ruc: "20334455667", contacto: "Marcos Peña", tel: "955-443-221", rubro: "Tapacantos" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null, nombre: "", categoria: "TABLERO", stock: 0, stockMin: 0, proveedor: "", precio: 0, medida: "Plancha"
  });

  const abrirModal = (prod = null) => {
    if (prod) {
      setIsEditing(true);
      setFormData(prod);
    } else {
      setIsEditing(false);
      setFormData({ id: null, nombre: "", categoria: "TABLERO", stock: 0, stockMin: 0, proveedor: "", precio: 0, medida: "Plancha" });
    }
    setShowModal(true);
  };

  const guardarProducto = () => {
    if (isEditing) {
      setProductos(productos.map(p => p.id === formData.id ? formData : p));
    } else {
      setProductos([...productos, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const eliminarProducto = (id) => {
    if(window.confirm("¿Desea eliminar este material del inventario?")) {
        setProductos(productos.filter(x => x.id !== id));
    }
  };

  const filtrados = useMemo(() => 
    productos.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || p.categoria.toLowerCase().includes(searchTerm.toLowerCase())), 
  [productos, searchTerm]);

  return (
    <div className="inv-page fade-in">
      <header className="inv-page-header">
        <div className="inv-brand">
          <div className="inv-icon-box"><FaWarehouse /></div>
          <div>
            <h1>Panel de Control de Almacén</h1>
            <p className="inv-subtitle">Tableros, Tapacantos y Suministros</p>
          </div>
        </div>
        <div className="inv-header-actions">
          <button className="btn-buy-order" onClick={() => alert("Generando Orden de Compra Automática...")}>
            <FaShoppingCart /> Reponer Stock Crítico
          </button>
          <button className="btn-add-inv" onClick={() => abrirModal()}>
            <FaPlus /> {activeTab === 'stock' ? 'Agregar Material' : 'Nuevo Proveedor'}
          </button>
        </div>
      </header>

      <div className="inv-stats-mini">
        <div className="stat-card">
            <span className="stat-label">Total Materiales</span>
            <span className="stat-value">{productos.length}</span>
        </div>
        <div className="stat-card warning">
            <span className="stat-label">Alertas de Stock</span>
            <span className="stat-value">{productos.filter(p => p.stock <= p.stockMin).length}</span>
        </div>
      </div>

      <div className="inv-controls">
        <div className="inv-nav-tabs">
          <button className={activeTab === 'stock' ? 'active' : ''} onClick={() => setActiveTab('stock')}>
            <FaLayerGroup /> Stock de Materiales
          </button>
          <button className={activeTab === 'prov' ? 'active' : ''} onClick={() => setActiveTab('prov')}>
            <FaPhoneAlt /> Directorio Proveedores
          </button>
        </div>
        <div className="inv-search-wrap">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="inv-table-container">
        {activeTab === 'stock' ? (
          <table className="inv-table">
            <thead>
              <tr>
                <th>Material / Color</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th className="text-center">Stock Actual</th>
                <th>Nivel / Alerta</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <tr key={p.id} className={p.stock <= p.stockMin ? "row-low-stock" : ""}>
                  <td className="cell-name">
                    <strong>{p.nombre}</strong>
                    <span className="sub-text">{p.medida}</span>
                  </td>
                  <td><span className={`badge-cat ${p.categoria.toLowerCase()}`}>{p.categoria}</span></td>
                  <td>{p.proveedor}</td>
                  <td className="text-center">
                    <span className={`stock-big ${p.stock <= p.stockMin ? "text-danger" : ""}`}>{p.stock}</span>
                  </td>
                  <td>
                    {p.stock <= p.stockMin ? (
                      <span className="label-alert critical"><FaExclamationTriangle /> REABASTECER</span>
                    ) : (
                      <span className="label-alert success"><FaCheckCircle /> ÓPTIMO</span>
                    )}
                  </td>
                  <td className="cell-actions">
                    <button className="btn-edit" title="Editar" onClick={() => abrirModal(p)}><FaEdit /></button>
                    <button className="btn-delete" title="Eliminar" onClick={() => eliminarProducto(p.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="inv-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>RUC</th>
                <th>Contacto Directo</th>
                <th>Teléfono</th>
                <th>Especialidad</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((pr) => (
                <tr key={pr.id}>
                  <td><strong>{pr.empresa}</strong></td>
                  <td>{pr.ruc}</td>
                  <td>{pr.contacto}</td>
                  <td><div className="phone-box"><FaPhoneAlt /> {pr.tel}</div></td>
                  <td><span className="badge-cat prov">{pr.rubro}</span></td>
                  <td className="cell-actions">
                    <button className="btn-edit"><FaEdit /></button>
                    <button className="btn-delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="inv-modal-overlay">
          <div className="inv-modal-content bounce-in">
            <div className="modal-header-inv">
              <h3>{isEditing ? "Modificar Material" : "Registrar Nuevo Material"}</h3>
              <button className="close-inv" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body-inv">
              <div className="form-full">
                <label>Descripción del Material (Nombre y Color)</label>
                <input 
                    type="text" 
                    placeholder="Ej: MELAMINA GRIS HUMO 18MM"
                    value={formData.nombre} 
                    onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})} 
                />
              </div>
              <div className="form-split">
                <div className="form-group-inv">
                  <label>Categoría</label>
                  <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})}>
                    <option value="TABLERO">Tablero</option>
                    <option value="TAPACANTO">Tapacanto</option>
                    <option value="ACCESORIO">Accesorio / Herraje</option>
                  </select>
                </div>
                <div className="form-group-inv">
                  <label>Unidad de Medida</label>
                  <select value={formData.medida} onChange={(e) => setFormData({...formData, medida: e.target.value})}>
                    <option value="Plancha">Plancha</option>
                    <option value="Metros">Metros</option>
                    <option value="Unidad">Unidad</option>
                  </select>
                </div>
              </div>
              <div className="form-split">
                <div className="form-group-inv">
                  <label>Stock Actual</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})} />
                </div>
                <div className="form-group-inv">
                  <label>Alerta Mínima</label>
                  <input type="number" value={formData.stockMin} onChange={(e) => setFormData({...formData, stockMin: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className="form-full">
                <label>Proveedor Sugerido</label>
                <input type="text" value={formData.proveedor} onChange={(e) => setFormData({...formData, proveedor: e.target.value.toUpperCase()})} />
              </div>
            </div>
            <div className="modal-footer-inv">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cerrar</button>
              <button className="btn-save" onClick={guardarProducto}>Confirmar Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JefeAlmacen;