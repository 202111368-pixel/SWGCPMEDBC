import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaArrowLeft, FaFilePdf } from "react-icons/fa";
import "../../styles/Marca.css";

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombres: "",
    apellidos: "",
    producto: "",
    marcas: ""
  });

  const opcionesMarcas = [
    "Vesto",
    "Duratex",
    "Pelikano",
    "Masisa",
    "Duraplac",
    "Novopan",
    "SM"
  ];

  const handleAgregar = () => {
    setShowForm(true);
    setCategoriaEditando(null);
    setNuevaCategoria({
      nombres: "",
      apellidos: "",
      producto: "",
      marcas: ""
    });
  };

  const handleGuardar = () => {
    if (nuevaCategoria.nombres.trim() === "" || nuevaCategoria.apellidos.trim() === "" || nuevaCategoria.producto.trim() === "") {
      alert("Por favor complete los campos obligatorios");
      return;
    }

    if (categoriaEditando) {
      setCategorias(categorias.map(cat => 
        cat.id === categoriaEditando.id 
          ? { 
              ...cat, 
              nombres: nuevaCategoria.nombres,
              apellidos: nuevaCategoria.apellidos,
              producto: nuevaCategoria.producto,
              marcas: nuevaCategoria.marcas
            }
          : cat
      ));
    } else {
      const nuevaCat = {
        id: Date.now(),
        nombres: nuevaCategoria.nombres,
        apellidos: nuevaCategoria.apellidos,
        producto: nuevaCategoria.producto,
        marcas: nuevaCategoria.marcas,
        estado: "Activo"
      };
      setCategorias([...categorias, nuevaCat]);
    }

    setShowForm(false);
    setCategoriaEditando(null);
    setNuevaCategoria({
      nombres: "",
      apellidos: "",
      producto: "",
      marcas: ""
    });
  };

  const handleEditar = (categoria) => {
    setShowForm(true);
    setCategoriaEditando(categoria);
    setNuevaCategoria({
      nombres: categoria.nombres,
      apellidos: categoria.apellidos,
      producto: categoria.producto,
      marcas: categoria.marcas
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta categoría?")) {
      setCategorias(categorias.filter((cat) => cat.id !== id));
    }
  };

  const handleCancelar = () => {
    setShowForm(false);
    setCategoriaEditando(null);
    setNuevaCategoria({
      nombres: "",
      apellidos: "",
      producto: "",
      marcas: ""
    });
  };

  const handleInputChange = (e) => {
    setNuevaCategoria({
      ...nuevaCategoria,
      [e.target.name]: e.target.value
    });
  };

  const handleImprimirReporte = () => {
    if (categorias.length === 0) {
      alert("No hay datos para generar el reporte");
      return;
    }

    const ventanaImpresion = window.open('', '_blank');
    const contenidoHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reporte de Categorías</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; color: #2c3e50; }
          .subtitle { font-size: 14px; color: #666; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #34495e; color: white; font-weight: bold; }
          tr:nth-child(even) { background-color: #f8f9fa; }
          .total { font-weight: bold; margin-top: 20px; padding: 15px; background-color: #ecf0f1; border-radius: 5px; }
          .logo { font-size: 18px; font-weight: bold; color: #3498db; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">SISTEMA DE CATEGORÍAS</div>
          <div class="title">REPORTE DE CATEGORÍAS DE PROVEEDORES</div>
          <div class="subtitle">
            Fecha: ${new Date().toLocaleDateString()} | 
            Hora: ${new Date().toLocaleTimeString()} |
            Total: ${categorias.length} registros
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Producto</th>
              <th>Marcas</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${categorias.map((cat, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${cat.nombres}</td>
                <td>${cat.apellidos}</td>
                <td>${cat.producto}</td>
                <td>${cat.marcas}</td>
                <td>${cat.estado}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="total">
          Total de categorías registradas: ${categorias.length}
        </div>
        
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() {
              window.close();
            }, 1000);
          }
        </script>
      </body>
      </html>
    `;

    ventanaImpresion.document.write(contenidoHTML);
    ventanaImpresion.document.close();
  };

  if (showForm) {
    return (
      <div className="proveedor-page">
        <div className="proveedor-content">
          <div className="proveedor-header">
            <button className="btn-volver" onClick={handleCancelar}>
              <FaArrowLeft /> Volver
            </button>
            <h2>Gestion de Categoria</h2>
          </div>

          <div className="proveedor-form">
            <div className="form-section">
              <h3>Información de Categoría</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombres *</label>
                  <input
                    type="text"
                    name="nombres"
                    value={nuevaCategoria.nombres}
                    onChange={handleInputChange}
                    placeholder="Nombres completos"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Apellidos *</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={nuevaCategoria.apellidos}
                    onChange={handleInputChange}
                    placeholder="Apellidos completos"
                    className="input-field"
                  />
                </div>
                
                <div className="form-group">
                  <label>Producto *</label>
                  <input
                    type="text"
                    name="producto"
                    value={nuevaCategoria.producto}
                    onChange={handleInputChange}
                    placeholder="Nombre del producto"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label>Marcas</label>
                  <select
                    name="marcas"
                    value={nuevaCategoria.marcas}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Seleccione una marca</option>
                    {opcionesMarcas.map((marca, index) => (
                      <option key={index} value={marca}>
                        {marca}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-registrar" onClick={handleGuardar}>
                <FaSave /> Guardar Categoría
              </button>
              <button className="btn-cancelar" onClick={handleCancelar}>
                <FaTimes /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="categoria-page">
      <div className="categoria-content">
        <div className="categoria-header">
          <h2>Marca</h2>
          <div className="header-buttons">
            <button className="btn-agregar" onClick={handleAgregar}>
              <FaPlus /> Agregar Nueva
            </button>
            <button className="btn-imprimir" onClick={handleImprimirReporte}>
              <FaFilePdf /> Imprimir Reporte
            </button>
          </div>
        </div>

        <div className="categoria-busqueda">
          <input
            type="text"
            placeholder="Buscar categoría..."
            className="input-buscar"
          />
        </div>

        <div className="categoria-table-wrapper">
          <table className="categoria-table">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Producto</th>
                <th>Marcas</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                    No hay categorías registradas.
                  </td>
                </tr>
              ) : (
                categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.nombres}</td>
                    <td>{cat.apellidos}</td>
                    <td>{cat.producto}</td>
                    <td>{cat.marcas}</td>
                    <td className="opciones">
                      <button
                        className="btn-editar"
                        onClick={() => handleEditar(cat)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminar(cat.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="paginacion">
            <button>{"<"}</button>
            <button className="activo">1</button>
            <button>2</button>
            <button>3</button>
            <button>{">"}</button>
          </div>

          <p className="registro-info">
            Mostrando {categorias.length} categorías registradas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categoria;