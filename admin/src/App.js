import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/Sidebar.css';
import './styles/Login.css'; 
import Login from "./pages/Login";

// Almacén
import Categoria from './pages/Almacen/Categoria';
import Marca from './pages/Almacen/Marca';
import Producto from './pages/Almacen/Producto';

// Cotizaciones
import GenerarCotizacion from './pages/Cotizaciones/GenerarCotizacion';
import VerCotizacion from './pages/Cotizaciones/VerCotizacion';

// Compras
import Proveedores from './pages/Compras/Proveedores';
import RealizarCompra from './pages/Compras/RealizarCompra';

// Caja
import AdministrarCaja from './pages/Caja/AdministrarCaja';

// Configuración
import Configuracion from './pages/Configuracion/Configuracion';

// Inventario
import NuevoInventario from './pages/Inventario/NuevoInventario';

// Ventas
import Clientes from './pages/Ventas/Clientes';

// ⛔ Quité esto porque causa error y no existe el archivo
// import Productos from './pages/Productos/Producto';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Routes>
                  {/* Almacén */}
                  <Route path="almacen/categoria" element={<Categoria />} />
                  <Route path="almacen/marca" element={<Marca />} />
                  <Route path="almacen/producto" element={<Producto />} />

                  {/* Cotizaciones */}
                  <Route path="cotizaciones/generar" element={<GenerarCotizacion />} />
                  <Route path="cotizaciones/ver" element={<VerCotizacion />} />

                  {/* Compras */}
                  <Route path="compras/proveedores" element={<Proveedores />} />
                  <Route path="compras/realizar" element={<RealizarCompra />} />

                  {/* Caja */}
                  <Route path="caja/administrar" element={<AdministrarCaja />} />

                  {/* Configuración */}
                  <Route path="configuracion" element={<Configuracion />} />

                  {/* Inventario */}
                  <Route path="inventario/nuevo" element={<NuevoInventario />} />

                  {/* Ventas */}
                  <Route path="ventas/clientes" element={<Clientes />} />

                  {/* Productos */}
                  {/* ⛔ Comentado hasta que exista el componente
                  <Route path="productos/productos" element={<Productos />} />
                  */}
                 
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
