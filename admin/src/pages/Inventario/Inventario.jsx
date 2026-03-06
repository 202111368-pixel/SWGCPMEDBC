import React, { useState, useMemo } from 'react';
import "../../styles/pages/Inventario/Inventario.css"; 
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaWarehouse, 
  FaExclamationTriangle, FaCheckCircle, FaShoppingCart, FaSearch, FaPhoneAlt 
} from "react-icons/fa";

const Inventario = () => {
  const [activeTab, setActiveTab] = useState('stock'); 
  const [searchTerm, setSearchTerm] = useState("");
  
  const [productos, setProductos] = useState([
    { id: 1, nombre: "MELAMINA BLANCO MATE 18MM", categoria: "TABLERO", stock: 15, stockMin: 10, proveedor: "PELIKANO", precio: 185.00 },
    { id: 2, nombre: "MELAMINA ROBLE SANTANA 18MM", categoria: "TABLERO", stock: 4, stockMin: 8, proveedor: "VESTO", precio: 215.00 },
    { id: 3, nombre: "TAPACANTO PVC DELGADO NEGRO", categoria: "TAPACANTO", stock: 120, stockMin: 50, proveedor: "REHAU", precio: 0.90 },
  ]);

  const [proveedores] = useState([
    { id: 1, empresa: "PELIKANO", ruc: "20100456781", contacto: "Ing. Carlos Ruiz", tel: "987-654-321", rubro: "Tableros" },
    { id: 2, empresa: "VESTO", ruc: "20556789123", contacto: "Lucía Méndez", tel: "912-345-678", rubro: "Tableros" },
    { id: 3, empresa: "REHAU", ruc: "20334455667", contacto: "Marcos Peña", tel: "955-443-221", rubro: "Tapacantos" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null, nombre: "", categoria: "TABLERO", stock: 0, stockMin: 0, proveedor: "", precio: 0
  });

  const abrirModal = (prod = null) => {
    if (prod) {
      setIsEditing(true);
      setFormData(prod);
    } else {
      setIsEditing(false);
      setFormData({ id: null, nombre: "", categoria: "TABLERO", stock: 0, stockMin: 0, proveedor: "", precio: 0 });
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

  const filtrados = useMemo(() => 
    productos.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())), 
  [productos, searchTerm]);

  return (
    <div className="inv-page fade-in">
      <header className="inv-page-header">
        <div className="inv-brand">
          <div className="inv-icon-box"><FaWarehouse /></div>
          <div>
            <h1>Gestión de Inventario</h1>
          </div>
        </div>
        <div className="inv-header-actions">
          <button className="btn-buy-order" onClick={() => alert("Registrando Orden de Compra...")}>
            <FaShoppingCart /> Registrar Compra
          </button>
          <button className="btn-add-inv" onClick={() => abrirModal()}>
            <FaPlus /> {activeTab === 'stock' ? 'Nuevo Material' : 'Nuevo Proveedor'}
          </button>
        </div>
      </header>

      <div className="inv-controls">
        <div className="inv-nav-tabs">
          <button className={activeTab === 'stock' ? 'active' : ''} onClick={() => setActiveTab('stock')}>Catálogo & Stock</button>
          <button className={activeTab === 'prov' ? 'active' : ''} onClick={() => setActiveTab('prov')}>Proveedores</button>
        </div>
        <div className="inv-search-wrap">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Buscar..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      <div className="inv-table-container">
        {activeTab === 'stock' ? (
          <table className="inv-table">
            <thead>
              <tr>
                <th>Material / Descripción</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th className="text-center">Stock Actual</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => (
                <tr key={p.id} className={p.stock <= p.stockMin ? "row-low-stock" : ""}>
                  <td className="cell-name"><strong>{p.nombre}</strong></td>
                  <td><span className="badge-cat">{p.categoria}</span></td>
                  <td>{p.proveedor}</td>
                  <td className="text-center">
                    <span className="stock-big">{p.stock}</span> <small>und.</small>
                  </td>
                  <td>
                    {p.stock <= p.stockMin ? (
                      <span className="label-alert critical"><FaExclamationTriangle /> REABASTECER</span>
                    ) : (
                      <span className="label-alert success"><FaCheckCircle /> SUFICIENTE</span>
                    )}
                  </td>
                  <td className="cell-actions">
                    <button className="btn-edit" onClick={() => abrirModal(p)}><FaEdit /></button>
                    <button className="btn-delete" onClick={() => setProductos(productos.filter(x => x.id !== p.id))}><FaTrash /></button>
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
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Rubro</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((pr) => (
                <tr key={pr.id}>
                  <td><strong>{pr.empresa}</strong></td>
                  <td>{pr.ruc}</td>
                  <td>{pr.contacto}</td>
                  <td><FaPhoneAlt style={{marginRight: '8px', color: '#3b82f6'}}/>{pr.tel}</td>
                  <td><span className="badge-cat">{pr.rubro}</span></td>
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
              <h3>{isEditing ? "Editar Registro" : "Nuevo Producto"}</h3>
              <button className="close-inv" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body-inv">
              <div className="form-full">
                <label>Nombre del Producto / Color</label>
                <input type="text" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})} />
              </div>
              <div className="form-split">
                <div className="form-group-inv">
                  <label>Categoría</label>
                  <select value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})}>
                    <option value="TABLERO">Tablero</option>
                    <option value="TAPACANTO">Tapacanto</option>
                    <option value="ACCESORIO">Accesorio</option>
                  </select>
                </div>
                <div className="form-group-inv">
                  <label>Proveedor</label>
                  <input type="text" value={formData.proveedor} onChange={(e) => setFormData({...formData, proveedor: e.target.value})} />
                </div>
              </div>
              <div className="form-split">
                <div className="form-group-inv">
                  <label>Stock Actual</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} />
                </div>
                <div className="form-group-inv">
                  <label>Mínimo Alerta</label>
                  <input type="number" value={formData.stockMin} onChange={(e) => setFormData({...formData, stockMin: parseInt(e.target.value)})} />
                </div>
              </div>
            </div>
            <div className="modal-footer-inv">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-save" onClick={guardarProducto}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventario;